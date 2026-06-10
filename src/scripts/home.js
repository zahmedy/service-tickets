const welcomeButton = document.getElementById("welcome")

welcomeButton.addEventListener("click", async () => {
    window.location.href = "/"
});

const createButton = document.getElementById("createPage")

createButton.addEventListener("click", async () => {
    window.location.href = "/create";
});

const showButton = document.getElementById("showPage")

showButton.addEventListener("click", async () => {
    window.location.href = "/tickets";
});

async function getTotal() {
    const response = await fetch("/api/tickets/");
    const tickets = await response.json();

    document.getElementById("totalTickets").textContent = tickets.length;
}

async function getOpenCount() {
    const response = await fetch("/api/tickets");
    const tickets = await response.json();

    total_open = 0

    tickets.forEach((ticket) => {
        if (['New', 'In progress'].includes(ticket.status)){
            total_open += 1;
        }
    });
    
    document.getElementById("totalOpen").textContent = total_open;
}

async function getHighTotal() {
    const response = await fetch("/api/tickets");
    const tickets = await response.json();

    high_total = 0

    tickets.forEach((ticket) => {
        if (ticket.priority === 'High') {
            high_total += 1;
        }
    });

    document.getElementById("totalHigh").textContent = high_total;
}

getTotal();
getOpenCount();
getHighTotal();