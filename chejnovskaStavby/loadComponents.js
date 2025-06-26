document.addEventListener('DOMContentLoaded', () => {
  const insert = async (id, file) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = await fetch(file).then(r => r.text());
    if (id === 'header-placeholder') {
      const burger = document.getElementById('navbar-toggle');
      const mobileNavbar = document.getElementById('mobile-navbar');
      if (burger && mobileNavbar) {
        const hide = () => {
          mobileNavbar.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
          mobileNavbar.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto', 'slide-fade-down');
          burger.setAttribute('aria-expanded', 'false');
        };
        const show = () => {
          mobileNavbar.classList.remove('opacity-0', '-translate-y-4', 'pointer-events-none');
          mobileNavbar.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto', 'slide-fade-down');
          burger.setAttribute('aria-expanded', 'true');
        };
        burger.addEventListener('click', () =>
          mobileNavbar.classList.contains('opacity-100') ? hide() : show()
        );
        mobileNavbar.querySelectorAll('a').forEach(link => link.addEventListener('click', hide));
        hide();
      }
    }
  };
  insert('header-placeholder', 'header.html');
  insert('footer-placeholder', 'footer.html');
});
