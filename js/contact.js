document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    var recap = document.getElementById('contactRecap');

    if (form instanceof HTMLFormElement && recap instanceof HTMLElement) {
        var formEl = form;
        var recapEl = recap;
        formEl.addEventListener('submit', function (e) {
            e.preventDefault();

            var nameInput = formEl.elements.namedItem('name');
            var emailInput = formEl.elements.namedItem('email');
            var enterpriseInput = formEl.elements.namedItem('enterprise');
            var messageInput = formEl.elements.namedItem('message');
            var name = (nameInput && 'value' in nameInput) ? nameInput.value.trim() : '';
            var email = (emailInput && 'value' in emailInput) ? emailInput.value.trim() : '';
            var enterprise = (enterpriseInput && 'value' in enterpriseInput) ? enterpriseInput.value.trim() : '';
            var message = (messageInput && 'value' in messageInput) ? messageInput.value.trim() : '';

            if (!name || !email || !enterprise || !message) {
                alert('Please fill in all fields.');
                return;
            }
            var emailPattern = /^[^\s@]+@[^0-\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            recapEl.className = 'contact-recap';
            recapEl.innerHTML = `
                <div class="message-sent" style="font-weight:bold;color:#10b981;margin-bottom:10px;">Message sent!</div>
                <h3 style="margin-bottom:10px;">Recap</h3>
                <ul style="list-style:none;padding:0;">
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Enterprise:</strong> ${enterprise}</li>
                <li><strong>Message:</strong> <span style="white-space:pre-line;">${message}</span></li>
            </ul>
        `;
            recapEl.style.display = 'block';
            formEl.style.display = 'none';
        });
    }
}); 