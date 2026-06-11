const welcomeButton = document.getElementById("welcome")

welcomeButton.addEventListener("click", async () => {
    window.location.href = "/"
});

async function displayTickets(tickets) {
    if (!tickets) {
        const response = await fetch("/api/tickets");

        if (!response.ok) {
            return;
        }

        tickets = await response.json();
    }

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

async function getTickets(searchText) {
    const response = await fetch("/api/tickets");

    if (!response.ok) {
        return [];
    }

    let tickets = await response.json();

    if (searchText) {
        tickets = tickets.filter((ticket) => 
            ticket.username.toLowerCase().includes(searchText.toLowerCase()) ||
            ticket.title.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    return tickets;
}
// Display searched results 
async function loadSearchTickets() {
    const params = new URLSearchParams(window.location.search);
    const searchText = params.get("search");

    const tickets = await getTickets(searchText);

    displayTickets(tickets);
}

loadSearchTickets();