const express = require("express");
const path = require("path");
const Database = require("better-sqlite3");
const { error } = require("console");

const app = express();
const db = new Database("tickets.db");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'New'
            CHECK (status IN ('New', 'In Progress', 'Done')),
        priority TEXT NOT NULL DEFAULT 'Low'
            CHECK (priority IN ('Low', 'Medium', 'High')),
        username TEXT NOT NULL,
        created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
`);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/home.html"));
});

app.get("/tickets", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/showTickets.html"));
});

app.get("/create", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/createTicket.html"));
});

app.get("/edit", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/editTicket.html"));
});


// API 

app.put("/api/tickets/:id", (req, res) => {
    const id = req.params.id;
    const { title, description, status, priority, username } = req.body;

    const result = db.prepare(`
        UPDATE tickets  
        SET title = ?, 
            description = ?, 
            status = ?, 
            priority = ?, 
            username = ?
        WHERE id = ?    
    `).run(title, description, status, priority, username, id);

    if (res.change === 0) {
        return res.status(404).json({ "success": false });
    }

    res.json({ success: true })
});

app.post("/api/tickets", (req, res) => {
    const { title, description, status, priority, username } = req.body;

    const result = db.prepare(`
        INSERT INTO tickets (title, description, status, priority, username)
        VALUES (? , ?, ?, ?, ?)    
    `).run(title, description, status, priority, username);

    res.json({ id: result.lastInsertRowid });
});

app.get("/api/tickets", (req, res) => {
    const tickets = db.prepare("SELECT * FROM tickets").all();
    res.json(tickets);
});

app.get("/api/ticket/:ticketId", (req, res) => {
    const ticketId = req.params.ticketId;

    const ticket = db
        .prepare("SELECT * FROM tickets WHERE id = ?")
        .get(ticketId);
    
    if (!ticket) {
        return res.status(404).json({ error: "Ticket not found"});
    }

    res.json(ticket);
});


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
