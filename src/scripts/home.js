const welcomeButton = document.getElementById("welcome")

welcomeButton.addEventListener("click", async () => {
    window.location.href = "/"
});


//SEACH

const searchButton = document.getElementById("searchSubmit");

searchButton.addEventListener("click", async () => {
    const query = document.getElementById("search").value;
    window.location.href = `/tickets?search=${encodeURIComponent(query)}`;
});

//

const createButton = document.getElementById("createPage");

createButton.addEventListener("click", async () => {
    window.location.href = "/create";
});

const showButton = document.getElementById("showPage");

showButton.addEventListener("click", async () => {
    window.location.href = "/tickets";
});

async function getTotal() {
    const response = await fetch("/api/tickets/");
    const tickets = await response.json();

    document.getElementById("totalTickets").textContent = tickets.length;
};

async function getOpenCount() {
    const response = await fetch("/api/tickets");
    const tickets = await response.json();

    let totalOpen = 0

    tickets.forEach((ticket) => {
        if (['New', 'In Progress'].includes(ticket.status)){
            totalOpen += 1;
        }
    });
    
    document.getElementById("totalOpen").textContent = totalOpen;
};

async function getHighTotal() {
    const response = await fetch("/api/tickets");
    const tickets = await response.json();

    let highTotal = 0

    tickets.forEach((ticket) => {
        if (ticket.priority === 'High') {
            highTotal += 1;
        }
    });

    document.getElementById("totalHigh").textContent = highTotal;
};

getTotal();
getOpenCount();
getHighTotal();