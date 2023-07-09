document.addEventListener("DOMContentLoaded", function () {
    const projektyLink = document.getElementById("projekty-link");
    const sublinks = document.querySelector(".sublinks");

    projektyLink.addEventListener("click", function (event) {
      event.preventDefault();
      sublinks.classList.toggle("open");
    });
  });