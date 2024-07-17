document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    const cardNumberInput = document.getElementById('card-number');
    const expiryDateInput = document.getElementById('expiry-date');
    const cvcInput = document.getElementById('cvc');

    const cardNumberError = document.getElementById('card-number-error');
    const expiryDateError = document.getElementById('expiry-date-error');
    const cvcError = document.getElementById('cvc-error');

    cardNumberInput.addEventListener('input', validateCardNumber);
    expiryDateInput.addEventListener('input', validateExpiryDate);
    cvcInput.addEventListener('input', validateCVC);

    form.addEventListener('submit', (event) => {
        if (!validateCardNumber() || !validateExpiryDate() || !validateCVC()) {
            event.preventDefault();
        }
    });

    function validateCardNumber() {
        const cardNumber = cardNumberInput.value.replace(/\s+/g, '');
        const isValid = /^\d{16}$/.test(cardNumber);
        if (!isValid) {
            cardNumberInput.classList.add('invalid');
            cardNumberError.textContent = 'Please enter a valid 16-digit card number.';
            cardNumberError.style.display = 'block';
        } else {
            cardNumberInput.classList.remove('invalid');
            cardNumberError.style.display = 'none';
        }
        formatCardNumber();
        return isValid;
    }

    function formatCardNumber() {
        const value = cardNumberInput.value.replace(/\D/g, '');
        const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        cardNumberInput.value = formattedValue;
    }

    function validateExpiryDate() {
        const expiryDate = expiryDateInput.value;
        const isValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate);
        if (!isValid) {
            expiryDateInput.classList.add('invalid');
            expiryDateError.textContent = 'Please enter a valid expiry date in MM/YY format.';
            expiryDateError.style.display = 'block';
        } else {
            expiryDateInput.classList.remove('invalid');
            expiryDateError.style.display = 'none';
        }
        return isValid;
    }

    function validateCVC() {
        const cvc = cvcInput.value;
        const isValid = /^\d{3,4}$/.test(cvc);
        if (!isValid) {
            cvcInput.classList.add('invalid');
            cvcError.textContent = 'Please enter a valid 3 or 4 digit CVC.';
            cvcError.style.display = 'block';
        } else {
            cvcInput.classList.remove('invalid');
            cvcError.style.display = 'none';
        }
        return isValid;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const paymentAmountElement = document.getElementById('payment-amount');

    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Get the amount from the URL parameter
    const amount = getUrlParameter('amount');

    // Update the payment amount text
    if (amount) {
        paymentAmountElement.textContent = `Amount: INR ${amount}`;
    }
});