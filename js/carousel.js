document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.logo-carousel');
    const logos = document.querySelectorAll('.client-logo');
    
    if (!carousel || logos.length === 0) return;
    
    // This function duplicates all logos to create a seamless scrolling effect
    const setupSeamlessScroll = () => {
        // Clone all logos and append them to create a continuous loop
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            carousel.appendChild(clone);
        });
        
        // Optional: Add more clones for very long screens
        if (window.innerWidth > 1600) {
            logos.forEach(logo => {
                const clone = logo.cloneNode(true);
                carousel.appendChild(clone);
            });
        }
    };
    
    // Initialize the carousel
    setupSeamlessScroll();
    
    // Adjust animation duration based on the number of logos
    if (carousel instanceof HTMLElement) {
        const speed = 2; // seconds per logo (adjust for faster/slower)
        const totalDuration = logos.length * speed;
        carousel.style.animationDuration = `${totalDuration}s`;
    }
    
    // Reset animation when it completes to avoid any potential issues
    carousel.addEventListener('animationiteration', () => {
        if (carousel instanceof HTMLElement) {
            carousel.style.animationPlayState = 'running';
        }
    });

    // Mobile menu functionality
    const menuCheckbox = document.getElementById('mobile-menu-checkbox');
    const navLinks = document.querySelectorAll('.nav-container nav a');
    
    // Close mobile menu when clicking on a nav link
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