let tickets = []

function addTicket(title, customer) {
    const ticket = {
        id: Date.now(),
        title,
        customer,
        status: "New",
        priority: "Medium",
        createdAt: new Date().toISOString()
    };

    tickets.push(ticket);
    renderTickets();

}

const express = require("express");
const path = require("path");

const app = express()

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
})