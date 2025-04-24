const hamburgerMenu = document.querySelector('.hamburger-menu');
const navList = document.querySelector('.nav-list');

hamburgerMenu.addEventListener('click', () => {
    navList.classList.toggle('open');
    const isExpanded = hamburgerMenu.getAttribute('aria-expanded') === 'true' || false;
    hamburgerMenu.setAttribute('aria-expanded', !isExpanded);
});


