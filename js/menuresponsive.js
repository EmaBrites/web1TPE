"use strict";
document.addEventListener("DOMContentLoaded",iniciarMenu);
function iniciarMenu(){
    // Menu desplegable
    let boton=document.querySelector("#btn-menu")
    boton.addEventListener("click", toggleMenu);
    function toggleMenu() {
        boton.classList.toggle("change");
        document.querySelector("nav ul").classList.toggle("show");
    }
}