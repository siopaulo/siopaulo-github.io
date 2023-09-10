document.addEventListener("DOMContentLoaded", function() {
    let burger = document.getElementById("burger");
    let overlay = document.querySelector(".custom-section");
    let showMenu = false;

    if (window.matchMedia("(min-width: 768px)").matches) {
        // Desktop animations and logic
        var section = document.querySelector('.custom-section');
        section.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";

        overlay.style.display = "none";

        burger.addEventListener("click", function() {
            showMenu = !showMenu;
            if(showMenu) {
                burger.classList.add("active");
                overlay.style.display = "block";
                gsap.to(overlay, 0.65, {clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease:"expo.in"});
            } else {
                burger.classList.remove("active");
                gsap.to(overlay, 0.65, {clipPath:"polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", ease:"expo.out", onComplete:() => overlay.style.display = "none"});
            }
        });

        const projektyLink = document.getElementById("projekty-link");
        const sublinks = document.querySelector(".sublinks");
        document.body.addEventListener('click', function(event) {
                if (event.target.id === 'projekty-link' || event.target.closest('#projekty-link')) {
                    event.preventDefault();
                    document.querySelector('.sublinks').classList.toggle('open');
                }
            });
     }
     else {
        // Mobile-specific logic

        overlay.style.display = "none";

        burger.addEventListener("click", function() {
            if(overlay.style.display === "none") {
                overlay.style.display = "block";
            } else {
                overlay.style.display = "none";
            }
        });

        const projektyLink = document.getElementById('projekty-link');
        const sublinks = document.querySelector('.sublinks');

        document.body.addEventListener('click', function(event) {
                if (event.target.id === 'projekty-link' || event.target.closest('#projekty-link')) {
                    event.preventDefault();
                    document.querySelector('.sublinks').classList.toggle('open');
                }
        });
    }
});
