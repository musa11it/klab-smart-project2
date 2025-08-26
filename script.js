// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && 
        !navLinks.contains(e.target) && 
        navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

// Stock management functionality
class StockManager {
    constructor() {
        this.stocks = JSON.parse(localStorage.getItem('stocks')) || [];
        this.form = document.getElementById('stockForm');
        this.tableBody = document.getElementById('stockTableBody');

        this.initializeEventListeners();
        this.renderStockTable();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addStock();
        });
    }

    addStock() {
        const itemName = document.getElementById('itemName').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const category = document.getElementById('category').value;

        const newStock = {
            id: Date.now(),
            itemName,
            quantity,
            category,
            lastUpdated: new Date().toLocaleString()
        };

        this.stocks.push(newStock);
        this.saveToLocalStorage();
        this.renderStockTable();
        this.form.reset();

        alert('Stock added successfully!');
    }

    renderStockTable() {
        this.tableBody.innerHTML = '';
        
        this.stocks.forEach(stock => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${stock.itemName}</td>
                <td>${stock.category}</td>
                <td>${stock.quantity}</td>
                <td>${stock.lastUpdated}</td>
            `;
            this.tableBody.appendChild(row);
        });
    }

    saveToLocalStorage() {
        localStorage.setItem('stocks', JSON.stringify(this.stocks));
    }
}

// Initialize the stock manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StockManager();
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent successfully! We will contact you soon.');
        contactForm.reset();
    });
}

// Register form handling
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        alert('Registration successful! You can now login.');
        registerForm.reset();
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});