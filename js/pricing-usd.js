document.addEventListener('DOMContentLoaded', function (event) {
  fetch('https://api.frankfurter.app/latest?from=EUR&to=USD')
    .then(response => response.json())
    .then(data => {
      const rate = data.rates && data.rates.USD;
      if (rate) {
        const usdPrice = (29 * rate).toFixed(2);
        const usdSpan = document.getElementById('usd-price');
        if (usdSpan) {
          usdSpan.textContent = `(~$${usdPrice} USD)`;
        }
      } else {
        const usdSpan = document.getElementById('usd-price');
        if (usdSpan) {
          usdSpan.textContent = '(USD unavailable)';
        }
      }
    })
    .catch(function (err) {
      const usdSpan = document.getElementById('usd-price');
      if (usdSpan) {
        usdSpan.textContent = '';
      }
    });
}); 