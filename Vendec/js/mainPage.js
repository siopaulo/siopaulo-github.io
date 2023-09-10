document.addEventListener("DOMContentLoaded", function() {
    // Function to handle the visibility of an element based on scroll position
    const handleVisibilityOnScroll = (element, className) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const triggerPosition = 100;

        if (rect.top <= windowHeight - triggerPosition) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    };

    // Handle the visibility of the recentDiv on scroll
    const recentDiv = document.querySelector(".recent");
    window.addEventListener("scroll", () => handleVisibilityOnScroll(recentDiv, "visible"));

    // Handle the visibility of the formSection on scroll
    const formSections = document.querySelectorAll(".contactForm");
    formSections.forEach(formSection => {
        window.addEventListener("scroll", () => handleVisibilityOnScroll(formSection, "visible"));
    });
    if (window.matchMedia("(min-width: 768px)").matches) {
    let heroImage = document.querySelector(".hero-image");
    let del = 3;
    let i = 1;
    const frameDealy = 3;
    let tl = gsap.timeline({repeat:-1, yoyo:true, ease:"expo.out"});

    gsap.set(["#hero-1 h2, #hero-1 h1"],{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"});gsap.set([`#hero-2 h2, #hero-3 h2, #hero-4 h2, #hero-5 h2,\n        #hero-2 h1, #hero-3 h1, #hero-4 h1, #hero-5 h1`],{clipPath:"polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"});while(i<5){tl.to(`#hero-${i} h2`,.9,{clipPath:"polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",delay:3}).to(`#hero-${i} h1`,.9,{clipPath:"polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"},"-=0.3").to(`#hero-${i} h2`,.9,{clipPath:"polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"},"-=0.3").to(`#hero-${i} .hi-${i}`,.7,{clipPath:"polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"},"-=1").to(`#hero-${i+1} h2`,.9,{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}).to(`#hero-${i+1} h1`,.9,{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"},"-=0.3").to(`#hero-${i+1} h2`,.9,{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"},"-=0.3");i++}}
    
    else {
        let currentHero = 1;
        const totalHeroes = 5;

        setInterval(() => {
            // Fade out current hero and its title
            document.querySelector(`#hero-${currentHero}`).style.opacity = 0;
            document.querySelector(`#hero-${currentHero} h1`).style.opacity = 0;
            document.querySelector(`#hero-${currentHero} h2`).style.opacity = 0;

            // Move to the next hero
            currentHero = (currentHero % totalHeroes) + 1;

            // Fade in the next hero and its title
            setTimeout(() => {
                document.querySelector(`#hero-${currentHero}`).style.opacity = 1;
                document.querySelector(`#hero-${currentHero} h1`).style.opacity = 1;
                document.querySelector(`#hero-${currentHero} h2`).style.opacity = 1;
            }, 4);  // Delay by 1 second to allow for the fade-out to complete

        }, 4000);  // Change every 5 seconds
    }}
);
