import authService from './auth.js';

function updateHeaderAuthButtons() {
    const authButtons = document.querySelector('.auth-buttons');
    if (!authButtons) return;
    authButtons.innerHTML = '';
    if (authService.isAuthenticated() || localStorage.getItem('currentUser')) {
        const cartBtn = document.createElement('a');
        cartBtn.href = 'cart.html';
        cartBtn.className = 'btn btn-primary';
        cartBtn.textContent = 'Cart';
        authButtons.appendChild(cartBtn);
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'btn btn-outline';
        logoutBtn.textContent = 'Log Out';
        logoutBtn.style.marginLeft = '0.5rem';
        logoutBtn.onclick = function() {
            authService.logout();
            window.location.href = 'index.html';
        };
        authButtons.appendChild(logoutBtn);
    } else {
        const signInBtn = document.createElement('a');
        signInBtn.href = 'login.html';
        signInBtn.className = 'btn btn-outline';
        signInBtn.textContent = 'Sign In';
        const signUpBtn = document.createElement('a');
        signUpBtn.href = 'signup.html';
        signUpBtn.className = 'btn btn-primary';
        signUpBtn.textContent = 'Sign Up';
        authButtons.appendChild(signInBtn);
        authButtons.appendChild(signUpBtn);
    }
}

function patchAuthService() {
    const origLogin = authService.login.bind(authService);
    authService.login = function(email, password) {
        const user = origLogin(email, password);
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateHeaderAuthButtons();
        return user;
    };
    const origRegister = authService.register.bind(authService);
    authService.register = function(email, password, name) {
        const user = origRegister(email, password, name);
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateHeaderAuthButtons();
        return user;
    };
    authService.logout = function() {
        localStorage.removeItem('currentUser');
        updateHeaderAuthButtons();
    };
}

patchAuthService();
updateHeaderAuthButtons();

window.addEventListener('storage', updateHeaderAuthButtons); 