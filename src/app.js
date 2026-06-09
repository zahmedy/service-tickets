const express = require("express");
const path = require("path");
const Database = require("better-sqlite3");

const app = express();
const db = new Database("tickets.db");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        username TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'New'
            CHECK (status IN ('New', 'In Progress', 'Done))
        priority TEXT NOT NULL DEFAULT 'Low'
            CHECK (priority IN ('Low', 'Medium', 'High'))
        created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
`);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/tickets", (req, res) => {
    const { title, description } = req.body;

    const result = db.prepare(`
        INSERT INTO tickets (title, description)
        VALUES (? , ?)    
    `).run(title, description);

    res.json({ id: result.lastInsertRowid });
});

app.get("/tickets", (req, res) => {
    const tickets = db.prepare("SELECT * FROM tickets").all();
    res.json(tickets);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
