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