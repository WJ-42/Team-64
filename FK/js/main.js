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
const ORDERS_STORAGE_KEY = "luminousScentsOrders";

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

    products.forEach(product => {
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
            const basket = loadBasket();
            if (basket.length === 0) {
                customAlert("Your basket is empty!");
                return;
            }
            
            // Create order from basket
            const order = createOrder(basket, total);
            saveOrder(order);
            
            // Clear basket
            localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify([]));
            
            customAlert(`Order #${order.id} placed successfully! View your orders in the Account section.`);
            renderBasketPage();
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

// Scroll reveal helper function - adds revealed class immediately so content is visible
function applyScrollReveal(element) {
    element.classList.add('scroll-reveal', 'revealed');
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

            gradient.addColorStop(0, `rgba(255, 182, 193, ${s.alpha})`);
            gradient.addColorStop(0.4, `rgba(255, 105, 180, ${s.alpha * 0.6})`);
            gradient.addColorStop(1, `rgba(255, 20, 147, 0)`);

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

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const THEME_KEY = 'luminousScentsTheme';
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem(THEME_KEY, newTheme);
        });
    }
}

// Orders functionality
function loadOrders() {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!stored) {
        return [];
    }
    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error("Could not parse stored orders", e);
        return [];
    }
}

function saveOrder(order) {
    const orders = loadOrders();
    orders.unshift(order); // Add new order at the beginning
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

function createOrder(basket, total) {
    const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();
    const statuses = ['processing', 'shipped', 'delivered'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    const items = basket.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
            name: product ? product.name : 'Unknown Product',
            price: product ? product.price : 0,
            quantity: item.quantity
        };
    });
    
    return {
        id: orderId,
        date: new Date().toISOString(),
        items: items,
        total: total,
        status: randomStatus
    };
}

function renderOrdersPage() {
    const container = document.getElementById("ordersContainer");
    if (!container) return;
    
    const orders = loadOrders();
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="no-orders">
                <p>You haven't placed any orders yet.</p>
                <a href="products.html" class="btn-primary">Browse Fragrances</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = orders.map(order => {
        const orderDate = new Date(order.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const statusIcon = {
            'processing': '⏳',
            'shipped': '📦',
            'delivered': '✅'
        };
        
        const itemsHtml = order.items.map(item => `
            <div class="order-item">
                <span class="order-item-name">${item.name}</span>
                <span class="order-item-qty">x${item.quantity}</span>
                <span class="order-item-price">£${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
        
        return `
            <div class="order-card">
                <div class="order-header">
                    <span class="order-id">${order.id}</span>
                    <span class="order-date">${orderDate}</span>
                </div>
                <div class="order-items">
                    ${itemsHtml}
                </div>
                <div class="order-footer">
                    <span class="order-status ${order.status}">${statusIcon[order.status] || ''} ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    <span class="order-total">Total: £${order.total.toFixed(2)}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Page initialiser

document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.getAttribute("data-page");

    initThemeToggle();
    initStarfield();
    initMouseTrail();

    // rest of the code...
    if (page === "home") {
        setupAuthForm();
    } else if (page === "products") {
        renderProductsPage();
    } else if (page === "basket") {
        renderBasketPage();
    } else if (page === "account") {
        setupAuthForm();
        renderOrdersPage();
    }
});
// Scroll reveal animations - disabled, all content visible by default
const observerOptions = {
    threshold: 0,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Always keep elements visible
        entry.target.classList.add('revealed');
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
    // Add revealed class immediately so content is visible
    element.classList.add('revealed');
    originalObserve.call(this, element);
};

// Add scroll-reveal and revealed classes to all elements so they're visible immediately
document.querySelectorAll('.main-header, .site-footer, .hero-text, .hero-text h2, .hero-text p, .page-header, .page-header h2, .page-header p, .card, .card h3, .card p, .card .btn-primary, .feature-card, .feature-card h4, .feature-card p, .basket-section, .basket-item, .basket-summary, .basket-summary p, .basket-summary .btn-primary, .info-column, .info-column h3, .info-column p, .steps-list li, .step-number, .feature-section h3, .auth-section, .auth-form').forEach(el => {
    el.classList.add('scroll-reveal', 'revealed');
    observer.observe(el);
});


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
                ctx.strokeStyle = `rgba(255, 20, 147, ${alpha})`;
                ctx.lineWidth = size;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
        }
    
        requestAnimationFrame(animate);
    }
    
    animate();
}

// AI Chat Functionality
class AIChat {
    constructor() {
        this.chatContainer = document.getElementById('aiChat');
        this.chatBubble = document.getElementById('chatBubble');
        this.chatWindow = document.getElementById('chatWindow');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('sendMessage');
        this.minimizeBtn = document.getElementById('minimizeChat');
        this.isOpen = false;
        this.isTyping = false;
        
        this.initializeEventListeners();
        this.setupAIResponses();
    }

    initializeEventListeners() {
        this.chatBubble.addEventListener('click', () => this.toggleChat());
        this.minimizeBtn.addEventListener('click', () => this.toggleChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Quick replies
        document.querySelectorAll('.quick-reply').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const message = e.target.getAttribute('data-message');
                this.addUserMessage(message);
                this.simulateAIResponse(message);
            });
        });

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.chatContainer.contains(e.target)) {
                this.toggleChat();
            }
        });
    }

    setupAIResponses() {
        this.responses = {
            greetings: [
                "Hello! I'm here to help you find your perfect fragrance. What kind of scent are you in the mood for today?",
                "Welcome to Luminous Scents! I can help guide you through our collection. Are you looking for something fresh and citrusy or warm and mysterious?",
                "Hi there! Ready to discover your signature scent? Tell me about your style and I'll recommend the perfect fragrance."
            ],
            citrus: [
                "Citrus fragrances are perfect for a fresh, energizing start to your day! Our Citrus Dawn features bergamot, lemon, and neroli. It's bright, uplifting, and perfect for daytime wear. Would you like to add it to your basket?",
                "Citrus scents are wonderfully refreshing! Citrus Dawn is one of our most popular daytime fragrances with its vibrant blend of bergamot, lemon, and neroli. It's perfect for spring and summer. Are you interested in trying it?",
                "Citrus fragrances are like liquid sunshine! Citrus Dawn combines bergamot, lemon, and neroli for a bright, zesty experience that lasts all day. It's excellent for work or casual outings. Would you like to explore it further?"
            ],
            evening: [
                "For evening wear, I'd recommend our Aurora Oud. It features rich oud, amber, and vanilla - perfect for creating an aura of mystery and elegance. It's our most sophisticated scent for special occasions.",
                "Evening fragrances should be captivating! Aurora Oud offers warm, deep notes of oud, amber, and vanilla that unfold beautifully as the evening progresses. It's designed for those who want to make a lasting impression.",
                "For nighttime elegance, Aurora Oud is unmatched. With its complex oud base, warm amber, and creamy vanilla, it's a fragrance that tells a story. Perfect for dinner dates, events, or when you want to feel extraordinary."
            ],
            popular: [
                "Our most popular fragrances are Aurora Oud for evening wear, Citrus Dawn for everyday freshness, and Velvet Iris for soft, romantic occasions. Each has its own distinct personality!",
                "The favorites among our customers are definitely Aurora Oud (sophisticated evenings), Citrus Dawn (bright days), and Velvet Iris (gentle elegance). They're all unique in their own way.",
                "Our top three are Aurora Oud for luxury evenings, Citrus Dawn for energizing days, and Velvet Iris for intimate moments. Each is crafted to enhance different aspects of your personality."
            ],
            general: [
                "I'd be happy to help you choose a fragrance! Are you looking for something fresh, warm, floral, or perhaps woody? Each of our scents has its own character and is perfect for different occasions.",
                "Finding the right fragrance is like finding the perfect piece of art - it should speak to your soul. Our collection includes Aurora Oud for mysterious evenings, Citrus Dawn for bright days, and Velvet Iris for romantic moments.",
                "Every fragrance tells a story, and I want to help you find yours! Whether you prefer the bold complexity of Aurora Oud, the bright freshness of Citrus Dawn, or the soft elegance of Velvet Iris, there's a perfect match for you.",
                "I can help you discover a fragrance that matches your personality and lifestyle. What mood are you in today? Fresh and energetic, warm and mysterious, or soft and romantic?"
            ],
            product_info: {
                "aurora oud": "Aurora Oud is our signature evening fragrance featuring rich oud, amber, and vanilla. It costs £89.99 and is perfect for sophisticated occasions. The scent unfolds in layers, revealing its complexity throughout the evening.",
                "citrus dawn": "Citrus Dawn is our fresh daytime fragrance with bergamot, lemon, and neroli. It's priced at £59.99 and perfect for energizing your day. The bright, citrusy notes are uplifting and long-lasting.",
                "velvet iris": "Velvet Iris offers soft floral elegance with iris, violet, and sandalwood. At £74.50, it's perfect for romantic occasions or when you want to feel gentle and sophisticated. The creamy sandalwood base provides wonderful longevity."
            }
        };
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatWindow.classList.toggle('active', this.isOpen);
        this.chatIndicator = this.chatBubble.querySelector('.chat-indicator');
        
        if (this.isOpen) {
            this.chatIndicator.style.display = 'none';
            setTimeout(() => this.scrollToBottom(), 100);
        }
    }

    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message || this.isTyping) return;

        this.addUserMessage(message);
        this.chatInput.value = '';
        this.simulateAIResponse(message);
    }

    addUserMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'message user-message';
        messageEl.innerHTML = `
            <div class="message-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            </div>
            <div class="message-content">
                <div class="message-text">${this.escapeHtml(message)}</div>
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;
        
        this.chatMessages.appendChild(messageEl);
        this.scrollToBottom();
    }

    addAIMessage(message, delay = 1000) {
        setTimeout(() => {
            this.removeTypingIndicator();
            
            const messageEl = document.createElement('div');
            messageEl.className = 'message ai-message';
            messageEl.innerHTML = `
                <div class="message-avatar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
                <div class="message-content">
                    <div class="message-text">${message}</div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                </div>
            `;
            
            this.chatMessages.appendChild(messageEl);
            this.scrollToBottom();
            this.isTyping = false;
        }, delay);
    }

    showTypingIndicator() {
        const typingEl = document.createElement('div');
        typingEl.className = 'message ai-message';
        typingEl.id = 'typingIndicator';
        typingEl.innerHTML = `
            <div class="message-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        this.chatMessages.appendChild(typingEl);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const typingEl = document.getElementById('typingIndicator');
        if (typingEl) {
            typingEl.remove();
        }
    }

    simulateAIResponse(userMessage) {
        if (this.isTyping) return;
        
        this.isTyping = true;
        this.showTypingIndicator();

        const lowerMessage = userMessage.toLowerCase();
        let response = '';

        // Check for product-specific queries
        if (lowerMessage.includes('aurora') && lowerMessage.includes('oud')) {
            response = this.responses.product_info["aurora oud"];
        } else if (lowerMessage.includes('citrus') && (lowerMessage.includes('dawn') || lowerMessage.includes('citrus'))) {
            response = this.responses.product_info["citrus dawn"];
        } else if (lowerMessage.includes('velvet') && lowerMessage.includes('iris')) {
            response = this.responses.product_info["velvet iris"];
        } else if (lowerMessage.includes('citrus') || lowerMessage.includes('fresh') || lowerMessage.includes('bright') || lowerMessage.includes('daytime')) {
            response = this.getRandomResponse(this.responses.citrus);
        } else if (lowerMessage.includes('evening') || lowerMessage.includes('night') || lowerMessage.includes('warm') || lowerMessage.includes('oud')) {
            response = this.getRandomResponse(this.responses.evening);
        } else if (lowerMessage.includes('popular') || lowerMessage.includes('recommend') || lowerMessage.includes('best')) {
            response = this.getRandomResponse(this.responses.popular);
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            response = this.getRandomResponse(this.responses.greetings);
        } else {
            response = this.getRandomResponse(this.responses.general);
        }

        this.addAIMessage(response, Math.random() * 1000 + 500);
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getCurrentTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return timeStr;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AI Chat
    window.aiChat = new AIChat();
});
