document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle functionality
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset for fixed header
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Animate hero section elements on load
    const heroTitle = document.querySelector('#home h1');
    const heroSubtitle = document.querySelector('#home p');
    const heroButton = document.querySelector('#home a.inline-block');

    if (heroTitle) heroTitle.classList.add('animate-fade-in-down');
    if (heroSubtitle) heroSubtitle.classList.add('animate-fade-in-up');
    if (heroButton) heroButton.classList.add('animate-fade-in-up'); // Re-apply for consistent animation
});
