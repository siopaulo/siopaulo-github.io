document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.pageYOffset;
        const scrollPercentage = scrollPosition / totalHeight;

        // Define the colors you want to transition between
        const startColor = { r: 255, g: 255, b: 255 };  // White
        const endColor = { r: 50, g: 50, b: 50 };  // Dark grey

        const r = startColor.r + (endColor.r - startColor.r) * scrollPercentage;
        const g = startColor.g + (endColor.g - startColor.g) * scrollPercentage;
        const b = startColor.b + (endColor.b - startColor.b) * scrollPercentage;

        document.body.style.backgroundColor = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

        window.addEventListener("scroll", function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById("scrollIndicator").style.width = scrolled + "%";
        });
    });
});