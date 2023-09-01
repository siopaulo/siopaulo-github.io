document.addEventListener("DOMContentLoaded", function() {
    const burger = document.getElementById("burger");
    const overlay = document.querySelector(".overlay");  // Replace with the correct selector for your overlay
    
    if (burger && overlay) {
        burger.addEventListener("click", function() {
            overlay.style.display = (overlay.style.display === "block") ? "none" : "block";
        });
    }

    // Set hero section to display only one static image and text
    // Replace the selectors and logic according to your actual hero section structure
    const heroImages = document.querySelectorAll(".hero-image");
    const heroTexts = document.querySelectorAll(".hero-text");
    
    if (heroImages.length > 0 && heroTexts.length > 0) {
        heroImages.forEach((img, index) => {
            if (index > 0) img.style.display = "none";
        });
        heroTexts.forEach((text, index) => {
            if (index > 0) text.style.display = "none";
        });
    }

    // Load all slide-down content immediately
    // Replace the selectors and logic according to your actual slide-down section structure
    const slideDownContents = document.querySelectorAll(".slide-down-content");
    
    if (slideDownContents.length > 0) {
        slideDownContents.forEach((content) => {
            content.style.display = "block";
        });
    }
});
