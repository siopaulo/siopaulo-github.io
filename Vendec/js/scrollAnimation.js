document.addEventListener('DOMContentLoaded', function () {
  const recentDiv = document.querySelector('.recent');

  const showRecentDiv = () => {
    const rect = recentDiv.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const triggerPosition = 100; // Adjust this value to set the specific scroll position

    if (rect.top <= windowHeight - triggerPosition) {
      recentDiv.classList.add('visible');
    } else {
      recentDiv.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', showRecentDiv);
});