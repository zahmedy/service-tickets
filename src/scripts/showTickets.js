const welcomeButton = document.getElementById("welcome")

welcomeButton.addEventListener("click", async () => {
    window.location.href = "/"
});

async function displayTickets() {
    const response = await fetch("/api/tickets");
    const tickets = await response.json();

    const ticketList = document.getElementById("ticketList");
    ticketList.innerHTML = "";

    tickets.forEach((ticket) => {
        const ticketElement = document.createElement("div")
        ticketElement.classList.add("ticket-card");
        
        ticketElement.innerHTML = `
            <span class="ticket-id">Ticket #${ticket.id}</span>
            <h3 class="ticket-title">Title: ${ticket.title}</h3>
            <p class="ticket-description">Description: ${ticket.description}</p>
            <p class="ticket-status">Status: ${ticket.status}</p>
            <p class="ticket-priority">Priority: ${ticket.priority}</p>
            <p class="ticket-username">Username: ${ticket.username}</p>
            <button class="ticket-edit">Edit</button>
        `;

        const editButton = ticketElement.querySelector(".ticket-edit");

        editButton.addEventListener("click", () => {
            window.location.href = `/edit?id=${ticket.id}`;
        });

        ticketList.appendChild(ticketElement);
    });

}

displayTickets();