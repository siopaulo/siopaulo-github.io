document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
});

async function getAllCurrencies() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/CZK');
    const data = await response.json();
    return data.rates;
}

async function calculateTotal(name, product, price, quantity) {
    const total = price * quantity;
    const vat = total * 0.21;
    const totalWithVat = total + vat;

    document.getElementById('summaryName').textContent = sanitizeInput(name);
    document.getElementById('summaryProduct').textContent = sanitizeInput(product);
    document.getElementById('summaryPrice').textContent = price.toFixed(2);
    document.getElementById('summaryQuantity').textContent = quantity;
    document.getElementById('summaryTotal').textContent = total.toFixed(2);
    document.getElementById('summaryVat').textContent = vat.toFixed(2);
    document.getElementById('summaryTotalWithVat').textContent = totalWithVat.toFixed(2);

    const currencySelect = document.getElementById('convertedCurrency');
    const rates = await getAllCurrencies();

    currencySelect.innerHTML = '';
    Object.keys(rates).forEach((currency) => {
        const option = document.createElement('option');
        option.value = currency;
        option.textContent = currency;
        currencySelect.appendChild(option);
    });

    document.getElementById('summary').style.display = 'block';
    await recalculateCurrency();
}

async function recalculateCurrency() {
    const totalWithVat = parseFloat(document.getElementById('summaryTotalWithVat').textContent);
    const convertedCurrency = document.getElementById('convertedCurrency').value;
    const exchangeRate = await getExchangeRate(convertedCurrency);
    const convertedPrice = totalWithVat * exchangeRate;

    document.getElementById('summaryConverted').textContent = convertedPrice.toFixed(2);
    document.getElementById('summaryCurrency').textContent = convertedCurrency;
}

async function getExchangeRate(currency) {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/CZK');
    const data = await response.json();
    return data.rates[currency];
}

function validateAndSubmit() {
    let isValid = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const product = document.getElementById('product').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    resetErrors();

    if (name.length < 2) {
        displayError('nameError', 'Jméno musí obsahovat alespoň 2 znaky.');
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        displayError('emailError', 'Zadejte platný e-mail.');
        isValid = false;
    }

    if (product.length < 2) {
        displayError('productError', 'Název produktu musí obsahovat alespoň 2 znaky.');
        isValid = false;
    }

    if (isNaN(price) || price <= 0) {
        displayError('priceError', 'Cena musí být vyšší než 0.');
        isValid = false;
    }

    if (isNaN(quantity) || quantity <= 0) {
        displayError('quantityError', 'Počet kusů musí být alespoň 1.');
        isValid = false;
    }

    if (isValid) {
        calculateTotal(name, product, price, quantity);
    }
}

function resetErrors() {
    ['nameError', 'emailError', 'productError', 'priceError', 'quantityError'].forEach((id) => {
        document.getElementById(id).textContent = '';
    });
}

function displayError(id, message) {
    document.getElementById(id).textContent = message;
}

function sanitizeInput(input) {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
}
