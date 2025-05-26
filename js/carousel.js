document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.logo-carousel');
    const logos = document.querySelectorAll('.client-logo');
    
    if (!carousel || logos.length === 0) return;
    
    const setupSeamlessScroll = () => {
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            carousel.appendChild(clone);
        });
        
        if (window.innerWidth > 1600) {
            logos.forEach(logo => {
                const clone = logo.cloneNode(true);
                carousel.appendChild(clone);
            });
        }
    };
    
    setupSeamlessScroll();
    
    if (carousel instanceof HTMLElement) {
        const speed = 2; // seconds per logo (adjust for faster/slower)
        const totalDuration = logos.length * speed;
        carousel.style.animationDuration = `${totalDuration}s`;
    }
    
    carousel.addEventListener('animationiteration', () => {
        if (carousel instanceof HTMLElement) {
            carousel.style.animationPlayState = 'running';
        }
    });

    const menuCheckbox = document.getElementById('mobile-menu-checkbox');
    const navLinks = document.querySelectorAll('.nav-container nav a');
    
    if (menuCheckbox) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (menuCheckbox instanceof HTMLInputElement) {
                    menuCheckbox.checked = false;
                }
            });
        });
    }
}); 