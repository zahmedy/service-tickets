const welcomeButton = document.getElementById("welcome")

welcomeButton.addEventListener("click", async () => {
    window.location.href = "/"
});

const editButton = document.getElementById("edit-ticket")

editButton.addEventListener("click", async => () => {
    window.location.href = "/edit"
});

const saveButton = document.getElementById("saveTicket")

saveButton.addEventListener("click", async () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;
    const priority = document.getElementById("priority").value;
    const username = document.getElementById("username").value;

    const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description, status, priority, username })
    });

    if (!response.ok) {
        alert("Could not create ticket");
        return;
    }

    alert("Ticket created!");

    window.location.href = '/tickets';
    displayTickets();
});