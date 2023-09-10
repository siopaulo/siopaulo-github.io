document.addEventListener("DOMContentLoaded", function() {

    // Initialize testimonials carousel
    initTestimonialsCarousel();

    // Handle scroll effects for elements
    handleScrollEffect(".recent");
    handleScrollEffect(".testimonials-carousel");
    handleScrollEffect(".photo-section");

    // Event listener for the project links
    handleProjektyLink();

    // Image click events
    handleImageClickEvents();

});

// Function to initialize the testimonials carousel
function initTestimonialsCarousel() {
    $('.testimonials-carousel').slick({
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    });
}

// Function to handle the scroll effect for elements
function handleScrollEffect(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
        const showElement = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const triggerPosition = 100;
            if (rect.top <= windowHeight - triggerPosition) {
                element.classList.add("visible");
            } else {
                element.classList.remove("visible");
            }
        };
        window.addEventListener("scroll", showElement);
    });
}

// Function to handle image click events
function handleImageClickEvents() {
    window.onload = function() {
        $('.photo-wrapper img').on('click', function() {
            var modal = $(this).siblings('.carousel-modal');
            modal.css('display', 'flex');

            var carouselContainer = modal.find('.carousel-container');
            if (!carouselContainer.hasClass('slick-initialized')) {
                carouselContainer.slick({
                    dots: true,
                    infinite: true,
                    speed: 600,
                    slidesToShow: 1,
                    adaptiveHeight: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                });
            }
        });

        $(document).on('click', function(event) {
            if (!$(event.target).closest('.carousel-container').length && !$(event.target).closest('.photo-wrapper img').length) {
                $('.carousel-modal .carousel-container.slick-initialized').slick('unslick');
                $('.carousel-modal').css('display', 'none');
            }
        });
    };
}
