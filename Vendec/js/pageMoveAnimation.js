document.addEventListener("DOMContentLoaded", function () {
    const recent = document.querySelector('.recent');

// Add an event listener for when the user scrolls
window.addEventListener('scroll', () => {
  // Get the distance between the top of the page and the recent element
  const distance = recent.getBoundingClientRect().top;

  // Check if the distance is less than or equal to 500 (the height of the viewport)
  if (distance <= 500) {
    // If it is, add the 'visible' class to the recent element
    recent.classList.add('visible');
  }
});
});