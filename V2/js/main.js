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

// Sorting functionality
let currentSort = 'default';

function sortProducts(sortBy) {
    const sortedProducts = [...products];
    
    switch(sortBy) {
        case 'price-asc':
            return sortedProducts.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sortedProducts.sort((a, b) => b.price - a.price);
        case 'name-asc':
            return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        case 'default':
        default:
            return sortedProducts; // Return in original order
    }
}

function setupSortingControls() {
    const sortSelect = document.getElementById('sortBy');
    const resetButton = document.getElementById('resetSort');
    
    if (!sortSelect || !resetButton) {
        return;
    }
    
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProductsPage();
    });
    
    resetButton.addEventListener('click', () => {
        currentSort = 'default';
        sortSelect.value = 'default';
        renderProductsPage();
    });
}
function customAlert(message) {
    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';

    const alertBox = document.createElement('div');
    alertBox.className = 'custom-alert';
    alertBox.innerHTML = `
        <p>${message}</p>
        <button id="customAlertBtn">OK</button>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(alertBox);

    alertBox.classList.remove('scroll-reveal', 'revealed');
    overlay.classList.remove('scroll-reveal', 'revealed');

    const closeAlert = () => {
        overlay.remove();
        alertBox.remove();
    };

    document.getElementById('customAlertBtn').addEventListener('click', closeAlert);
    overlay.addEventListener('click', closeAlert);
}

function customConfirm(message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';

    const alertBox = document.createElement('div');
    alertBox.className = 'custom-alert';
    alertBox.innerHTML = `
        <p>${message}</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button id="confirmYes" class="btn-primary">Yes</button>
            <button id="confirmNo" class="btn-secondary">Cancel</button>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(alertBox);

    alertBox.classList.remove('scroll-reveal', 'revealed');
    overlay.classList.remove('scroll-reveal', 'revealed');

    const closeDialog = () => {
        overlay.remove();
        alertBox.remove();
    };

    document.getElementById('confirmYes').addEventListener('click', () => {
        closeDialog();
        onConfirm();
    });

    document.getElementById('confirmNo').addEventListener('click', closeDialog);
    overlay.addEventListener('click', closeDialog);
}

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
    customAlert("Added to basket");
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

    // Get sorted products based on current sort option
    const productsToRender = sortProducts(currentSort);

    productsToRender.forEach(product => {
        const card = document.createElement("article");
        card.className = "card";

        card.innerHTML = `
            <div class="product-image-container ${product.id === 1 ? 'aurora-oud-image' : ''}">
                <img src="images/${product.id === 1 ? 'aurora-oud.png' : product.id === 2 ? 'citrus-dawn.png' : 'velvet-iris.png'}" alt="${product.name}" class="product-image">
            </div>
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

        applyScrollReveal(card);
        card.querySelectorAll('h3, p, .btn-primary').forEach(el => applyScrollReveal(el));
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

        // Add listeners directly to buttons
        row.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(btn.getAttribute('data-id'));
                const action = btn.getAttribute('data-action');
                if (action === 'increase') {
                    updateQuantity(id, 1);
                } else if (action === 'decrease') {
                    updateQuantity(id, -1);
                }
            });
        });
    });

    summary.innerHTML = `
        <p><strong>Total:</strong> £${total.toFixed(2)}</p>
        <button id="clearBasketBtn" class="btn-secondary" style="margin-right: 1rem;">Clear basket</button>
        <button id="mockCheckoutBtn" class="btn-primary">Proceed to checkout</button>
    `;

    const checkoutBtn = document.getElementById("mockCheckoutBtn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            customAlert("Checkout flow will be implemented in the full version. For MVP this is a demo only.");
        });
    }

    const clearBtn = document.getElementById("clearBasketBtn");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            customConfirm("Are you sure you want to clear your basket?", () => {
                localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify([]));
                renderBasketPage();
            });
        });
    }
}

// Scroll reveal helper function
function applyScrollReveal(element) {
    element.classList.add('scroll-reveal');
    observer.observe(element);
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

        // Custom validation with styled messages
        if (!email) {
            customAlert("Please enter your email address.");
            return;
        }

        if (!email.includes('@')) {
            customAlert("Please enter a valid email address with an '@' symbol.");
            return;
        }

        if (!password) {
            customAlert("Please enter a password.");
            return;
        }

        if (password.length < 6) {
            customAlert("Password must be at least 6 characters long.");
            return;
        }

        // Rest of the existing success logic...
        if (isNewUser.checked) {
            message.textContent = "Account created locally for MVP. In the full system this will be stored securely.";
        } else {
            message.textContent = "Login successful in this demo. Real authentication will be added later.";
        }
        message.style.color = "#ffffff";
        message.style.textShadow = "0 0 10px rgba(240, 194, 75, 0.6), 0 0 20px rgba(240, 194, 75, 0.3)";
        message.style.opacity = "0";
        message.classList.remove('scroll-reveal', 'revealed', 'show');
        setTimeout(() => {
            message.style.opacity = "1";
            message.classList.add('show');
        }, 10);

        localStorage.setItem("luminousScentsUserEmail", email);
    });
}

// Starfield canvas effect

function initStarfield() {
    const canvas = document.getElementById("starfield");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const stars = [];
    const starCount = 250;

    function createStars() {
        stars.length = 0;
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                size: Math.random() * 1.8 + 0.5,
                speed: Math.random() * 0.3 + 0.05,
                alpha: Math.random() * 0.5 + 0.5,
                isGold: true
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, w, h);

        for (let s of stars) {
            const parallaxX = mouseX * (s.size / 2);
            const parallaxY = mouseY * (s.size / 2);
            
            ctx.beginPath();
            ctx.arc(s.x + parallaxX, s.y + parallaxY, s.size, 0, Math.PI * 2);

            const gradient = ctx.createRadialGradient(
                s.x + parallaxX, s.y + parallaxY, 0,
                s.x + parallaxX, s.y + parallaxY, s.size * 4
            );

            gradient.addColorStop(0, `rgba(255, 220, 130, ${s.alpha})`);
            gradient.addColorStop(0.4, `rgba(245, 210, 120, ${s.alpha * 0.6})`);
            gradient.addColorStop(1, `rgba(240, 194, 75, 0)`);

            ctx.fillStyle = gradient;
            ctx.fill();

            s.x += s.speed * 0.2;
            if (s.x > w) s.x = 0;
        }
    }

    function twinkle() {
        for (let s of stars) {
            s.alpha += (Math.random() - 0.5) * 0.02;
            s.alpha = Math.min(Math.max(s.alpha, 0.15), 0.7);
        }
    }

    function loop() {
        drawStars();
        twinkle();
        requestAnimationFrame(loop);
    }

    window.addEventListener("resize", () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        createStars();
    });

    createStars();
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    });
    loop();
}

function createDummyOrders(userEmail) {
    // Create some dummy order data for demo purposes
    const orders = [
        {
            id: "ORD-2024-001",
            date: "2024-11-15T10:30:00Z",
            status: "delivered",
            total: 149.98,
            products: [
                { id: 1, name: "Aurora Oud", quantity: 1, price: 89.99 },
                { id: 2, name: "Citrus Dawn", quantity: 1, price: 59.99 }
            ]
        },
        {
            id: "ORD-2024-002",
            date: "2024-11-28T14:22:00Z",
            status: "shipped",
            total: 74.50,
            products: [
                { id: 3, name: "Velvet Iris", quantity: 1, price: 74.50 }
            ]
        },
        {
            id: "ORD-2024-003",
            date: "2024-12-01T09:15:00Z",
            status: "processing",
            total: 119.98,
            products: [
                { id: 1, name: "Aurora Oud", quantity: 1, price: 89.99 },
                { id: 2, name: "Citrus Dawn", quantity: 1, price: 59.99 }
            ]
        }
    ];
    
    // Store orders in localStorage with user email as key
    const userOrdersKey = `luminousScentsOrders_${userEmail}`;
    localStorage.setItem(userOrdersKey, JSON.stringify(orders));
    
    return orders;
}

function loadUserOrders(userEmail) {
    const userOrdersKey = `luminousScentsOrders_${userEmail}`;
    const stored = localStorage.getItem(userOrdersKey);
    
    if (!stored) {
        // If no orders exist, create dummy orders
        return createDummyOrders(userEmail);
    }
    
    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error("Could not parse stored orders", e);
        return createDummyOrders(userEmail);
    }
}

function formatOrderDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-GB', options);
}

function renderOrders(orders) {
    const container = document.getElementById('ordersContainer');
    if (!container) return;
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="no-orders">
                <p>You haven't placed any orders yet.</p>
                <a href="products.html" class="btn-primary">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = orders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <div class="order-info">
                    <h4>Order #${order.id}</h4>
                    <p class="order-date">${formatOrderDate(order.date)}</p>
                </div>
                <div class="order-status ${order.status}">${order.status}</div>
            </div>
            
            <div class="order-details">
                <ul class="order-products">
                    ${order.products.map(product => `
                        <li class="order-product">
                            <div>
                                <span class="product-name">${product.name}</span>
                                <span class="product-quantity">x${product.quantity}</span>
                            </div>
                            <span class="product-price">£${product.price.toFixed(2)}</span>
                        </li>
                    `).join('')}
                </ul>
                
                <div class="order-total">
                    <span class="order-total-label">Total:</span>
                    <span class="order-total-amount">£${order.total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function setupProfilePage() {
    const loginSection = document.getElementById('loginSection');
    const profileSection = document.getElementById('profileSection');
    const userEmailSpan = document.getElementById('userEmail');
    const authForm = document.getElementById('authForm');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (!loginSection || !profileSection || !userEmailSpan) {
        return;
    }
    
    // Check if user is already logged in
    const currentUser = localStorage.getItem('luminousScentsUserEmail');
    
    if (currentUser) {
        // User is logged in, show profile section
        loginSection.style.display = 'none';
        profileSection.style.display = 'block';
        userEmailSpan.textContent = `Welcome, ${currentUser}!`;
        
        // Load and display orders
        const orders = loadUserOrders(currentUser);
        renderOrders(orders);
    }
    
    // Handle login form submission
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('authEmail').value.trim();
            const password = document.getElementById('authPassword').value.trim();
            const message = document.getElementById('authMessage');
            
            // Basic validation
            if (!email || !password) {
                customAlert("Please enter both email and password.");
                return;
            }
            
            if (!email.includes('@')) {
                customAlert("Please enter a valid email address.");
                return;
            }
            
            if (password.length < 6) {
                customAlert("Password must be at least 6 characters long.");
                return;
            }
            
            // Simulate successful login
            localStorage.setItem('luminousScentsUserEmail', email);
            
            // Update UI
            loginSection.style.display = 'none';
            profileSection.style.display = 'block';
            userEmailSpan.textContent = `Welcome, ${email}!`;
            
            // Load and display orders
            const orders = loadUserOrders(email);
            renderOrders(orders);
            
            // Show success message
            message.textContent = "Login successful! Your order history is now available.";
            message.style.color = "#ffffff";
            message.style.textShadow = "0 0 10px rgba(240, 194, 75, 0.6), 0 0 20px rgba(240, 194, 75, 0.3)";
            message.style.opacity = "0";
            message.classList.remove('scroll-reveal', 'revealed', 'show');
            setTimeout(() => {
                message.style.opacity = "1";
                message.classList.add('show');
            }, 10);
        });
    }
    
    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            customConfirm("Are you sure you want to sign out?", () => {
                localStorage.removeItem('luminousScentsUserEmail');
                
                // Update UI
                loginSection.style.display = 'block';
                profileSection.style.display = 'none';
                document.getElementById('authForm').reset();
                
                customAlert("You have been signed out successfully.");
            });
        });
    }
}

// Page initialiser

document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.getAttribute("data-page");

    initStarfield();
    initMouseTrail();
    
    // Initialize chatbot on all pages
    initializeChatbot();

    // rest of the code...
    if (page === "home") {
        setupAuthForm();
    } else if (page === "products") {
        renderProductsPage();
        setupSortingControls();
    } else if (page === "contact") {
        setupContactForm();
    } else if (page === "basket") {
        renderBasketPage();
    } else if (page === "profile") {
        setupProfilePage();
    }
});
// Scroll reveal animations
const observerOptions = {
    threshold: 0,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        } else {
            entry.target.classList.remove('revealed');
        }
    });
}, observerOptions);

// Prevent observer from catching dynamically added elements
const originalObserve = observer.observe;
observer.observe = function(element) {
    if (element.classList.contains('custom-alert') || 
        element.classList.contains('custom-alert-overlay') ||
        element.closest('.custom-alert')) {
        return;
    }
    originalObserve.call(this, element);
};
document.querySelectorAll('.main-header, .site-footer, .hero-text, .hero-text h2, .hero-text p, .page-header, .page-header h2, .page-header p, .card, .card h3, .card p, .card .btn-primary, .feature-card, .feature-card h4, .feature-card p, .basket-section, .basket-item, .basket-summary, .basket-summary p, .basket-summary .btn-primary, .info-column, .info-column h3, .info-column p, .steps-list li, .step-number, .feature-section h3, .auth-section, .auth-form, .form-row, .form-row label, .form-row input, .form-row textarea').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// Contact form functionality
function setupContactForm() {
    const form = document.getElementById("contactForm");
    const message = document.getElementById("contactMessage");
    
    if (!form || !message) {
        return;
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        const productRequest = document.getElementById("productRequest").value.trim();
        const priceRange = document.getElementById("priceRange").value.trim();
        const ingredients = document.getElementById("ingredients").value.trim();
        const contactEmail = document.getElementById("contactEmail").value.trim();
        const notifyUpdates = document.getElementById("notifyUpdates").checked;

        // Validation
        if (!productRequest) {
            customAlert("Please describe what product you'd like to see.");
            return;
        }

        if (!priceRange || isNaN(priceRange) || priceRange < 10 || priceRange > 500) {
            customAlert("Please enter a valid price between £10 and £500.");
            return;
        }

        if (!ingredients) {
            customAlert("Please specify what ingredients should be included.");
            return;
        }

        if (!contactEmail) {
            customAlert("Please enter your email address.");
            return;
        }

        if (!contactEmail.includes('@')) {
            customAlert("Please enter a valid email address.");
            return;
        }

        // Simulate form submission
        const requestData = {
            productRequest,
            priceRange: parseFloat(priceRange),
            ingredients,
            contactEmail,
            notifyUpdates,
            additionalNotes: document.getElementById("additionalNotes").value.trim(),
            timestamp: new Date().toISOString()
        };

        // Store the request locally for demo purposes
        const existingRequests = JSON.parse(localStorage.getItem("luminousScentsRequests") || "[]");
        existingRequests.push(requestData);
        localStorage.setItem("luminousScentsRequests", JSON.stringify(existingRequests));

        // Show success message
        message.innerHTML = `
            <div style="background: linear-gradient(135deg, rgba(40, 180, 99, 0.2) 0%, rgba(30, 160, 80, 0.15) 50%, rgba(40, 180, 99, 0.2) 100%);
                        border: 1px solid rgba(40, 180, 99, 0.4);
                        border-radius: 4px;
                        padding: 1rem;
                        text-align: center;
                        color: #d4edda;">
                <strong>Thank you for your request!</strong><br>
                Your product suggestion has been submitted successfully.
                ${notifyUpdates ? 'You will be notified about updates.' : 'We appreciate your contribution.'}
            </div>
        `;
        message.style.opacity = "0";
        message.classList.remove('scroll-reveal', 'revealed', 'show');
        setTimeout(() => {
            message.style.opacity = "1";
            message.classList.add('show');
        }, 10);

        // Reset form
        form.reset();
        
        // Log for development (remove in production)
        console.log("Contact form submission:", requestData);
    });
}


function initMouseTrail() {
    const canvas = document.getElementById('trailCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function updateCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    updateCanvasSize();
    
    const points = [];
    const maxAge = 1000;
    
    window.addEventListener('mousemove', (e) => {
        points.push({
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        });
    });
    
    window.addEventListener('mouseleave', () => {
        points.length = 0;
    });
    
    window.addEventListener('resize', updateCanvasSize);
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        const now = Date.now();
    
        for (let i = points.length - 1; i >= 0; i--) {
            if (now - points[i].time > maxAge) {
                points.splice(i, 1);
            }
        }
    
        if (points.length > 1) {
            for (let i = 1; i < points.length; i++) {
                const point = points[i];
                const prevPoint = points[i - 1];
                const age = now - point.time;
                const life = 1 - (age / maxAge);
                const alpha = life * 0.6;
                const size = life * 2;
    
                ctx.beginPath();
                ctx.moveTo(prevPoint.x, prevPoint.y);
                ctx.lineTo(point.x, point.y);
                ctx.strokeStyle = `rgba(240, 194, 75, ${alpha})`;
                ctx.lineWidth = size;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
        }
    
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Chatbot Functionality
let chatbotOpen = false;
let conversationHistory = [];

const chatbotData = {
    ingredients: {
        'vanilla': ['vanilla', 'sweet', 'warm', 'cream', 'dessert'],
        'citrus': ['citrus', 'bergamot', 'lemon', 'lime', 'orange', 'grapefruit', 'fresh', 'bright'],
        'oud': ['oud', 'oudh', 'agarwood', 'wood', 'dark', 'rich', 'mysterious'],
        'iris': ['iris', 'violet', 'powdery', 'floral', 'soft', 'delicate'],
        'sandalwood': ['sandalwood', 'woody', 'cream', 'smooth', 'earthy'],
        'amber': ['amber', 'warm', 'golden', 'resin', 'sweet'],
        'rose': ['rose', 'floral', 'romantic', 'elegant', 'feminine'],
        'jasmine': ['jasmine', 'floral', 'intense', 'exotic', 'night'],
        'lavender': ['lavender', 'calming', 'herbal', 'purple', 'soothing'],
        'musk': ['musk', 'animalic', 'sensual', 'warm', 'intimate'],
        'pepper': ['pepper', 'spice', 'spicy', 'sharp', 'energetic'],
        'patchouli': ['patchouli', 'earthy', 'musky', 'woody', 'hippie'],
        'vetiver': ['vetiver', 'grass', 'green', 'earthy', 'fresh'],
        'bergamot': ['bergamot', 'citrus', 'earl grey', 'bright', ' uplifting'],
        'neroli': ['neroli', 'citrus', 'floral', 'orange blossom', 'delicate'],
        'ylang': ['ylang', 'ylang-ylang', 'floral', 'sweet', 'exotic']
    },
    
    moods: {
        'fresh': ['citrus', 'bergamot', 'neroli', 'vetiver', 'lavender'],
        'warm': ['vanilla', 'amber', 'sandalwood', 'musk'],
        'floral': ['rose', 'jasmine', 'iris', 'ylang', 'neroli'],
        'woody': ['sandalwood', 'oud', 'vetiver', 'patchouli'],
        'sweet': ['vanilla', 'amber', 'jasmine', 'rose'],
        'spicy': ['pepper', 'cinnamon', 'cardamom', 'nutmeg'],
        'earthy': ['vetiver', 'patchouli', 'sandalwood', 'oud'],
        'bright': ['citrus', 'bergamot', 'neroli', 'lavender']
    }
};

function initializeChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    
    if (!chatbotToggle || !chatbotWindow || !chatbotInput || !chatbotSend) {
        return;
    }
    
    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotOpen = !chatbotOpen;
        chatbotWindow.classList.toggle('active', chatbotOpen);
        
        if (chatbotOpen) {
            chatbotInput.focus();
        }
    });
    
    // Close chatbot
    chatbotClose.addEventListener('click', () => {
        chatbotOpen = false;
        chatbotWindow.classList.remove('active');
    });
    
    // Send message
    chatbotSend.addEventListener('click', () => sendChatbotMessage());
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatbotMessage();
        }
    });
    
    // Ingredient tags
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('ingredient-tag')) {
            const ingredient = e.target.getAttribute('data-ingredient');
            sendChatbotMessage(ingredient);
        }
        
        if (e.target.classList.contains('quick-action')) {
            const action = e.target.getAttribute('data-action');
            handleQuickAction(action);
        }
        
        if (e.target.classList.contains('add-to-basket-btn')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToBasket(productId);
            addBotMessage("Great choice! I've added that fragrance to your basket. You can continue exploring or close the chat when you're ready!");
        }
    });
}

function sendChatbotMessage(userInput = null) {
    const chatbotInput = document.getElementById('chatbot-input');
    const input = userInput || chatbotInput.value.trim();
    
    if (!input) return;
    
    // Add user message
    addUserMessage(input);
    chatbotInput.value = '';
    
    // Process input and generate response
    setTimeout(() => {
        processUserInput(input);
    }, 500);
}

function addUserMessage(message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chatbot-message user-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-content">
            <p>${escapeHtml(message)}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
    conversationHistory.push({ type: 'user', message });
}

function addBotMessage(content) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chatbot-message bot-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">✨</div>
        <div class="message-content">
            ${content}
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
    conversationHistory.push({ type: 'bot', message: content });
}

function scrollToBottom() {
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function processUserInput(input) {
    const lowerInput = input.toLowerCase();
    
    // Handle quick actions
    if (lowerInput.includes('surprise')) {
        giveRandomRecommendation();
        return;
    }
    
    if (lowerInput.includes('clear') || lowerInput.includes('reset')) {
        resetChatbot();
        return;
    }
    
    // Analyze input for ingredients
    const recommendations = findMatchingProducts(input);
    
    if (recommendations.length > 0) {
        let response = `<p>Based on your interest in ${input}, I found some perfect matches for you!</p>`;
        
        recommendations.slice(0, 3).forEach((rec, index) => {
            response += `
                <div class="product-recommendation">
                    <h5>${rec.product.name}</h5>
                    <p><strong>Notes:</strong> ${rec.product.notes}</p>
                    <p class="match-score">Match Score: ${Math.round(rec.score * 100)}%</p>
                    <p>${rec.product.description}</p>
                    <button class="add-to-basket-btn" data-product-id="${rec.product.id}">
                        Add to Basket (£${rec.product.price.toFixed(2)})
                    </button>
                </div>
            `;
        });
        
        if (recommendations.length > 3) {
            response += `<p>...and ${recommendations.length - 3} more great options!</p>`;
        }
        
        response += `<p>Would you like me to suggest some specific ingredient combinations or show you something completely different?</p>`;
        
    } else {
        // No direct matches, try mood-based suggestions
        const moodRecommendations = findByMood(input);
        
        if (moodRecommendations.length > 0) {
            let response = `<p>I understand you're looking for something with a ${input} vibe. Here are some fragrances that capture that mood:</p>`;
            
            moodRecommendations.slice(0, 2).forEach(rec => {
                response += `
                    <div class="product-recommendation">
                        <h5>${rec.product.name}</h5>
                        <p><strong>Notes:</strong> ${rec.product.notes}</p>
                        <p>${rec.product.description}</p>
                        <button class="add-to-basket-btn" data-product-id="${rec.product.id}">
                            Add to Basket (£${rec.product.price.toFixed(2)})
                        </button>
                    </div>
                `;
            });
        } else {
            response = `<p>I'm not sure I understand "${input}" completely. Could you try mentioning specific ingredients like "vanilla", "citrus", or "sandalwood"? Or tell me what mood you're in - fresh, warm, floral, or woody?</p>`;
            response += `<div class="suggested-ingredients">
                <p><strong>Try these popular searches:</strong></p>
                <button class="ingredient-tag" data-ingredient="fresh citrus">Fresh citrus</button>
                <button class="ingredient-tag" data-ingredient="warm vanilla">Warm vanilla</button>
                <button class="ingredient-tag" data-ingredient="woody">Woody scents</button>
            </div>`;
        }
    }
    
    addBotMessage(response);
}

function findMatchingProducts(input) {
    const inputTerms = input.toLowerCase().split(/[,\s]+/);
    const matches = [];
    
    products.forEach(product => {
        let score = 0;
        const productNotes = product.notes.toLowerCase();
        const productDescription = product.description.toLowerCase();
        const combinedText = `${productNotes} ${productDescription}`;
        
        // Check direct ingredient matches
        Object.keys(chatbotData.ingredients).forEach(ingredient => {
            const synonyms = chatbotData.ingredients[ingredient];
            inputTerms.forEach(term => {
                if (synonyms.some(synonym => term.includes(synonym) || synonym.includes(term))) {
                    if (combinedText.includes(synonym)) {
                        score += 2; // High score for direct matches
                    }
                }
            });
        });
        
        // Check for mood-based matches
        Object.keys(chatbotData.moods).forEach(mood => {
            if (inputTerms.some(term => mood.includes(term) || term.includes(mood))) {
                chatbotData.moods[mood].forEach(ingredient => {
                    if (combinedText.includes(ingredient)) {
                        score += 1; // Lower score for mood-based matches
                    }
                });
            }
        });
        
        if (score > 0) {
            matches.push({ product, score });
        }
    });
    
    return matches.sort((a, b) => b.score - a.score);
}

function findByMood(input) {
    const lowerInput = input.toLowerCase();
    const matches = [];
    
    products.forEach(product => {
        const productText = `${product.notes} ${product.description}`.toLowerCase();
        
        Object.keys(chatbotData.moods).forEach(mood => {
            if (lowerInput.includes(mood)) {
                chatbotData.moods[mood].forEach(ingredient => {
                    if (productText.includes(ingredient)) {
                        matches.push({
                            product,
                            score: calculateMoodScore(mood, ingredient, productText)
                        });
                    }
                });
            }
        });
    });
    
    return matches.sort((a, b) => b.score - a.score);
}

function calculateMoodScore(mood, ingredient, productText) {
    // Simple scoring based on ingredient frequency and mood relevance
    let score = 1;
    const ingredientCount = (productText.match(new RegExp(ingredient, 'g')) || []).length;
    score += ingredientCount * 0.5;
    
    // Bonus for exact mood matches
    if (productText.includes(mood)) {
        score += 1;
    }
    
    return score;
}

function giveRandomRecommendation() {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const response = `
        <p>Since you want to be surprised, let me suggest something special!</p>
        <div class="product-recommendation">
            <h5>${randomProduct.name}</h5>
            <p><strong>Notes:</strong> ${randomProduct.notes}</p>
            <p>${randomProduct.description}</p>
            <p><em>This is one of our most beloved fragrances - perfect for those who appreciate unique, sophisticated scents.</em></p>
            <button class="add-to-basket-btn" data-product-id="${randomProduct.id}">
                Add to Basket (£${randomProduct.price.toFixed(2)})
            </button>
        </div>
        <p>What did you think of that suggestion?</p>
    `;
    
    addBotMessage(response);
}

function handleQuickAction(action) {
    if (action === 'surprise') {
        giveRandomRecommendation();
    } else if (action === 'reset') {
        resetChatbot();
    }
}

function resetChatbot() {
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.innerHTML = `
        <div class="chatbot-message bot-message">
            <div class="message-avatar">✨</div>
            <div class="message-content">
                <p>Hello! I'm your personal fragrance assistant. I can help you discover new scents based on ingredients you love.</p>
                <p>What ingredients or notes would you like in your perfect fragrance? (e.g., "vanilla", "citrus", "sandalwood")</p>
                <div class="suggested-ingredients">
                    <p><strong>Popular ingredients:</strong></p>
                    <button class="ingredient-tag" data-ingredient="vanilla">Vanilla</button>
                    <button class="ingredient-tag" data-ingredient="citrus">Citrus</button>
                    <button class="ingredient-tag" data-ingredient="oud">Oud</button>
                    <button class="ingredient-tag" data-ingredient="iris">Iris</button>
                    <button class="ingredient-tag" data-ingredient="sandalwood">Sandalwood</button>
                </div>
            </div>
        </div>
    `;
    conversationHistory = [];
    scrollToBottom();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
