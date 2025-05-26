import authService from './auth.js';

function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return authService.getCurrentUser() || (userStr ? JSON.parse(userStr) : null);
}

function addToCart(plan) {
    localStorage.setItem('cart', JSON.stringify({ plan }));
}

document.addEventListener('DOMContentLoaded', function() {
    const selectButtons = document.querySelectorAll('.select-button');
    const plans = ['Starter', 'Pro', 'Enterprise'];
    selectButtons.forEach((btn, idx) => {
        btn.addEventListener('click', function(e) {
            if (plans[idx] === 'Enterprise') {
                window.location.href = 'mailto:contact@carvo.com';
                return;
            }
            if (!getCurrentUser()) {
                alert('Please sign in to select a plan.');
                window.location.href = 'login.html';
                return;
            }
            addToCart(plans[idx]);
            localStorage.setItem('cartConfetti', '1');
            setTimeout(() => {
                window.location.href = 'cart.html';
            }, 120);
        });
    });
}); 