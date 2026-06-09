const button = document.getElementById("createTicket")

async function displayTickets() {
    const response = await fetch("/tickets");
    const tickets = await response.json();

    const ticketList = document.getElementById("ticketList");
    ticketList.innerHTML = "";

    tickets.forEach((ticket) => {
        const ticketElement = document.createElement("div")
        ticketElement.classList.add("ticket-card");
        
        ticketElement.innerHTML = `
            <span class="ticket-id">Ticket #${ticket.id}</span>
            <h3 class="ticket-title">${ticket.title}</h3>
            <p class="ticket-description">${ticket.description}</p>
        `;

        ticketList.appendChild(ticketElement);
    });

}

displayTickets();

button.addEventListener("click", async () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    const response = await fetch("/tickets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description })
    });

    if (!response.ok) {
        alert("Could not create ticket");
        return;
    }

    alert("Ticket created!");
    displayTickets();
});
