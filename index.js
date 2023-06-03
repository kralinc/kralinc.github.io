window.addEventListener("DOMContentLoaded", ready);

function ready() {
    addEventListeners();
    addEmail();
}

function addEventListeners() {
    document.querySelector(".navbar-toggler").addEventListener("click", toggleNavButton);
}

function addEmail() {
    const sussy = [
        97,
100,
109,
105,
110,
64,
99,
97,
99,
116,
117,
115,
100,
97,
110,
46,
99,
111,
109,
      ];
    let sus = "";
    for (let c of sussy) {
        sus += String.fromCharCode(c);
    }
    document.querySelector("#sus").textContent = sus;
}

function toggleNavButton() {
    const content = document.querySelector(".navbar-collapse");
    if (content.classList.contains("show")) {
        content.classList.remove("show");
    }else {
        content.classList.add("show");
    }
}
