const welcomeButtonEdit = document.getElementById("welcome")

welcomeButtonEdit.addEventListener("click", async () => {
    window.location.href = "/"
});

const params = new URLSearchParams(window.location.search);
const ticketId = params.get("id");

const saveButton = document.getElementById("saveTicket")

saveButton.addEventListener("click", async () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;
    const priority = document.getElementById("priority").value;
    const username = document.getElementById("username").value;

    const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            title, 
            description, 
            status, 
            priority, 
            username })
    });

    if (!response.ok) {
        alert("Could not update ticket");
        return;
    }

    alert("Ticket updated!");

    window.location.href = '/tickets';
});

async function getTicket() {
    const response = await fetch(`/api/tickets/${ticketId}`);

    if (response.status === 404) {
        return { error: "couldn't load ticket "}
    }

    if (!response.ok) {
        return { error: "Something went wrong" };
    }

    const ticket = await response.json();

    document.getElementById("title").value = ticket.title;
    document.getElementById("description").value = ticket.description;
    document.getElementById("status").value = ticket.status;
    document.getElementById("priority").value = ticket.priority;
    document.getElementById("username").value = ticket.username;
}

getTicket();