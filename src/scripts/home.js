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