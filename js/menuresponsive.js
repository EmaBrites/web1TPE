"use strict";
document.addEventListener("DOMContentLoaded",iniciarMenu);
function iniciarMenu(){

    document.querySelector(".btn-menu").addEventListener("click", toggleMenu);
    
    function toggleMenu() {
        document.querySelector("nav ul").classList.toggle("show");
    }
}