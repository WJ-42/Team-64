// Simple product data for the MVP
const products = [
    {
        id: 1,
        name: "Aurora Oud",
        brand: "Luminous Scents",
        price: 89.99,
        notes: "Oud, amber, vanilla",
        description: "Warm and deep evening scent with a rich oud base."
    },
    {
        id: 2,
        name: "Citrus Dawn",
        brand: "Luminous Scents",
        price: 59.99,
        notes: "Bergamot, lemon, neroli",
        description: "Fresh daytime fragrance that is bright and uplifting."
    },
    {
        id: 3,
        name: "Velvet Iris",
        brand: "Luminous Scents",
        price: 74.50,
        notes: "Iris, violet, sandalwood",
        description: "Soft floral scent with a creamy sandalwood base."
    }
];

const BASKET_STORAGE_KEY = "luminousScentsBasket";

// Basket helpers

function loadBasket() {
    const stored = localStorage.getItem(BASKET_STORAGE_KEY);
    if (!stored) {
        return [];
    }
    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error("Could not parse stored basket", e);
        return [];
    }
}

function saveBasket(basket) {
    localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(basket));
}

function addToBasket(productId) {
    const basket = loadBasket();
    const existing = basket.find(item => item.productId === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        basket.push({ productId, quantity: 1 });
    }
    saveBasket(basket);
    alert("Added to basket");
}

function updateQuantity(productId, change) {
    const basket = loadBasket();
    const item = basket.find(i => i.productId === productId);
    if (!item) {
        return;
    }
    item.quantity += change;
    if (item.quantity <= 0) {
        const index = basket.indexOf(item);
        basket.splice(index, 1);
    }
    saveBasket(basket);
    renderBasketPage();
}

// Rendering functions

function renderProductsPage() {
    const container = document.getElementById("productsContainer");
    if (!container) {
        return;
    }

    container.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("article");
        card.className = "card";

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.brand}</p>
            <p><strong>Notes:</strong> ${product.notes}</p>
            <p class="price">£${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button class="btn-primary" data-product-id="${product.id}">
                Add to basket
            </button>
        `;

        container.appendChild(card);
    });

    container.addEventListener("click", event => {
        const button = event.target.closest("button[data-product-id]");
        if (button) {
            const id = Number(button.getAttribute("data-product-id"));
            addToBasket(id);
        }
    });
}

function renderBasketPage() {
    const container = document.getElementById("basketContainer");
    const summary = document.getElementById("basketSummary");
    if (!container || !summary) {
        return;
    }

    const basket = loadBasket();

    container.innerHTML = "";
    summary.innerHTML = "";

    if (basket.length === 0) {
        container.innerHTML = "<p>Your basket is empty.</p>";
        return;
    }

    let total = 0;

    basket.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) {
            return;
        }
        const lineTotal = product.price * item.quantity;
        total += lineTotal;

        const row = document.createElement("div");
        row.className = "basket-item";

        row.innerHTML = `
            <div class="basket-item-name">
                <p>${product.name}</p>
                <p class="small-text">£${product.price.toFixed(2)} each</p>
            </div>
            <div class="basket-item-controls">
                <button class="qty-btn" data-action="decrease" data-id="${product.id}">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" data-action="increase" data-id="${product.id}">+</button>
                <span>£${lineTotal.toFixed(2)}</span>
            </div>
        `;

        container.appendChild(row);
    });

    summary.innerHTML = `
        <p><strong>Total:</strong> £${total.toFixed(2)}</p>
        <button id="mockCheckoutBtn" class="btn-primary">Proceed to checkout</button>
    `;

    container.addEventListener("click", event => {
        const button = event.target.closest("button.qty-btn");
        if (!button) {
            return;
        }
        const id = Number(button.getAttribute("data-id"));
        const action = button.getAttribute("data-action");
        if (action === "increase") {
            updateQuantity(id, 1);
        } else if (action === "decrease") {
            updateQuantity(id, -1);
        }
    }, { once: true });

    const checkoutBtn = document.getElementById("mockCheckoutBtn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            alert("Checkout flow will be implemented in the full version. For MVP this is a demo only.");
        });
    }
}

// Simple front end auth validation

function setupAuthForm() {
    const form = document.getElementById("authForm");
    const emailInput = document.getElementById("authEmail");
    const passwordInput = document.getElementById("authPassword");
    const message = document.getElementById("authMessage");
    const isNewUser = document.getElementById("isNewUser");

    if (!form || !emailInput || !passwordInput || !message) {
        return;
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            message.textContent = "Please enter both email and password.";
            message.style.color = "#ff8080";
            return;
        }

        if (password.length < 6) {
            message.textContent = "Password must be at least 6 characters.";
            message.style.color = "#ff8080";
            return;
        }

        if (isNewUser.checked) {
            message.textContent = "Account created locally for MVP. In the full system this will be stored securely.";
        } else {
            message.textContent = "Login successful in this demo. Real authentication will be added later.";
        }
        message.style.color = "#a5ff9f";

        localStorage.setItem("luminousScentsUserEmail", email);
    });
}

// Page initialiser

document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.getAttribute("data-page");

    if (page === "home") {
        setupAuthForm();
    } else if (page === "products") {
        renderProductsPage();
    } else if (page === "basket") {
        renderBasketPage();
    }
});
