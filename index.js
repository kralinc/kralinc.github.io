window.addEventListener("DOMContentLoaded", addEventListeners);

function addEventListeners() {
    document.querySelector(".navbar-toggler").addEventListener("click", toggleNavButton);
}

function toggleNavButton() {
    const content = document.querySelector(".navbar-collapse");
    if (content.classList.contains("show")) {
        content.classList.remove("show");
    }else {
        content.classList.add("show");
    }
}