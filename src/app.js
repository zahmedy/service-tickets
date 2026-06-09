// let tickets = []

// function addTicket(title, customer) {
//     const ticket = {
//         id: Date.now(),
//         title,
//         customer,
//         status: "New",
//         priority: "Medium",
//         createdAt: new Date().toISOString()
//     };

//     tickets.push(ticket);
//     renderTickets();

// }

// Server setup
const express = require("express");
const path = require("path");

const app = express()

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
})

// Database setup
const Database = require("better-sqlite3");

const db = new Database("tickets.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL
    )
`);

// db.prepare(
//     "INSERT INTO tickets (title, description) VALUES (?, ?)"
// ).run("Computer issue","Computer will not start");

// const tickets = db.prepare("SELECT * FROM tickets").all();

// console.log(tickets);