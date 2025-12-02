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

// Contact form handler
function setupContactForm() {
    const form = document.getElementById("contactForm");
    const message = document.getElementById("contactFormMessage");
    
    if (!form || !message) {
        return;
    }
    
    form.addEventListener("submit", event => {
        event.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const messageText = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !messageText) {
            customAlert("Please fill in all fields.");
            return;
        }
        
        if (!email.includes('@')) {
            customAlert("Please enter a valid email address.");
            return;
        }
        
        // Simulate form submission
        message.textContent = "Thank you for your message! We'll get back to you within 24 hours.";
        message.style.color = "#ffffff";
        message.style.textShadow = "0 0 10px rgba(240, 194, 75, 0.6), 0 0 20px rgba(240, 194, 75, 0.3)";
        message.style.opacity = "0";
        message.classList.remove('scroll-reveal', 'revealed', 'show');
        
        setTimeout(() => {
            message.style.opacity = "1";
            message.classList.add('show');
        }, 10);
        
        // Reset form
        form.reset();
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

            gradient.addColorStop(0, `rgba(240, 194, 75, ${s.alpha})`);
            gradient.addColorStop(0.4, `rgba(240, 194, 75, ${s.alpha * 0.6})`);
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

// Page initialiser

document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.getAttribute("data-page");

    initStarfield();
    initMouseTrail();

    // rest of the code...
    if (page === "home") {
        setupAuthForm();
    } else if (page === "products") {
        renderProductsPage();
    } else if (page === "basket") {
        renderBasketPage();
    } else if (page === "contact") {
        setupContactForm();
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
document.querySelectorAll('.main-header, .site-footer, .hero-text, .hero-text h2, .hero-text p, .page-header, .page-header h2, .page-header p, .card, .card h3, .card p, .card .btn-primary, .feature-card, .feature-card h4, .feature-card p, .basket-section, .basket-item, .basket-summary, .basket-summary p, .basket-summary .btn-primary, .info-column, .info-column h3, .info-column p, .steps-list li, .step-number, .feature-section h3, .auth-section, .auth-form').forEach(el => {
    el.classList.add('scroll-reveal');
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

// AI Chatbot functionality
let chatbotOpen = false;
let conversationHistory = [];

// Initialize chatbot
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById('chatbot-toggle');
    const window = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const messages = document.getElementById('chatbot-messages');

    if (!toggle || !window || !closeBtn || !input || !sendBtn || !messages) return;

    // Toggle chatbot
    toggle.addEventListener('click', () => {
        chatbotOpen = !chatbotOpen;
        window.classList.toggle('hidden');
        if (chatbotOpen) {
            input.focus();
            toggle.style.transform = 'scale(0.8)';
        } else {
            toggle.style.transform = 'scale(1)';
        }
    });

    // Close chatbot
    closeBtn.addEventListener('click', () => {
        chatbotOpen = false;
        window.classList.add('hidden');
        toggle.style.transform = 'scale(1)';
    });

    // Send message
    function sendMessage() {
        const message = input.value.trim();
        if (!message) return;

        addMessage('user', message);
        input.value = '';
        
        // Show typing indicator
        addMessage('bot', '', true);
        
        // Generate AI response
        setTimeout(() => {
            const response = generateAIResponse(message);
            const typingMessage = messages.lastElementChild;
            typingMessage.remove();
            addMessage('bot', response);
        }, 1000 + Math.random() * 1000); // Random delay for realism
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add message to chat
    function addMessage(sender, content, isTyping = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message${isTyping ? ' typing' : ''}`;
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                ${sender === 'bot' ? `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm1-8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z" fill="currentColor"/>
                    </svg>
                ` : `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                    </svg>
                `}
            </div>
            <div class="message-content">
                ${isTyping ? '<span class="typing-dots">...</span>' : `<p>${content}</p>`}
            </div>
        `;

        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
        
        if (!isTyping) {
            conversationHistory.push({ sender, content });
        }
    }

    // Generate AI response based on input
    function generateAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Product recommendations
        if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('help me choose')) {
            return "I'd love to help you find the perfect fragrance! Our most popular scents are: " +
                   "🌟 Aurora Oud (warm, deep evening scent) for a sophisticated look, " +
                   "🌅 Citrus Dawn (fresh, bright daytime fragrance) for an uplifting energy, " +
                   "and 🌸 Velvet Iris (soft, floral scent) for a gentle, creamy presence. " +
                   "What's your preference - warm, fresh, or floral?";
        }
        
        // Price inquiries
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
            return "Our fragrances are carefully curated luxury scents: " +
                   "Aurora Oud at £89.99 for its premium oud and amber notes, " +
                   "Citrus Dawn at £59.99 for refreshing citrus blends, " +
                   "and Velvet Iris at £74.50 for its beautiful floral composition. " +
                   "All come with our signature quality and elegant presentation.";
        }
        
        // Scent descriptions
        if (lowerMessage.includes('aurora oud') || lowerMessage.includes('oud')) {
            return "Aurora Oud is our signature evening fragrance featuring rich oud, amber, and vanilla notes. " +
                   "It's perfect for special occasions and evening wear, creating a warm and captivating presence that develops beautifully on the skin.";
        }
        
        if (lowerMessage.includes('citrus dawn') || lowerMessage.includes('citrus') || lowerMessage.includes('fresh')) {
            return "Citrus Dawn is our bright and uplifting daytime fragrance with bergamot, lemon, and neroli notes. " +
                   "It's perfect for everyday wear, offering a fresh, energetic, and sophisticated scent that energizes your day.";
        }
        
        if (lowerMessage.includes('velvet iris') || lowerMessage.includes('iris') || lowerMessage.includes('floral')) {
            return "Velvet Iris is our soft, elegant floral fragrance featuring iris, violet, and sandalwood notes. " +
                   "It's ideal for those who prefer gentle, sophisticated scents with a creamy, comforting presence.";
        }
        
        // Usage occasions
        if (lowerMessage.includes('evening') || lowerMessage.includes('night') || lowerMessage.includes('date') || lowerMessage.includes('formal')) {
            return "For evening occasions, I highly recommend Aurora Oud. Its warm, sophisticated blend creates an enchanting presence " +
                   "perfect for dinner dates, formal events, or any evening when you want to make a lasting impression.";
        }
        
        if (lowerMessage.includes('day') || lowerMessage.includes('work') || lowerMessage.includes('office') || lowerMessage.includes('casual')) {
            return "For daily wear and casual occasions, Citrus Dawn is perfect. Its fresh, clean scent is office-friendly " +
                   "while still feeling elegant and uplifting for any casual setting.";
        }
        
        if (lowerMessage.includes('special') || lowerMessage.includes('gift') || lowerMessage.includes('romantic')) {
            return "For special gifts or romantic occasions, I recommend Velvet Iris. Its soft, romantic floral profile " +
                   "is universally flattering and creates a gentle, enchanting presence that feels both sophisticated and intimate.";
        }
        
        // Company information
        if (lowerMessage.includes('about') || lowerMessage.includes('company') || lowerMessage.includes('luminous scents')) {
            return "Luminous Scents is dedicated to bringing you meticulously curated fragrances that tell stories of elegance and luxury. " +
                   "We believe every scent should be a masterpiece, carefully selected to elevate your personal style and create unforgettable olfactory experiences.";
        }
        
        // Shipping/delivery
        if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery') || lowerMessage.includes('how long')) {
            return "We offer elegant packaging and careful delivery of your fragrance selections. " +
                   "For detailed shipping information and delivery options, please visit our Contact page or speak with our customer service team.";
        }
        
        // Account/basket
        if (lowerMessage.includes('account') || lowerMessage.includes('basket') || lowerMessage.includes('order') || lowerMessage.includes('purchase')) {
            return "You can create an account for a personalized experience, add fragrances to your basket, and manage your orders easily. " +
                   "Visit the Account section to sign up or log in, and check your Basket for current selections.";
        }
        
        // General help
        if (lowerMessage.includes('help') || lowerMessage.includes('what can you do') || lowerMessage.includes('how do you work')) {
            return "I'm here to help you discover the perfect fragrance! I can recommend scents based on your preferences, " +
                   "explain our products, suggest fragrances for different occasions, and answer questions about our company. " +
                   "What would you like to know about our fragrances?";
        }
        
        // Greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            const greetings = [
                "Hello! I'm here to help you find your perfect fragrance. What kind of scent experience are you looking for?",
                "Welcome to Luminous Scents! I can help you discover fragrances that match your style and preferences.",
                "Hi there! Ready to explore our collection? What type of scent appeals to you - fresh, warm, or floral?"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        // Goodbye
        if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
            const farewells = [
                "Thank you for visiting Luminous Scents! Feel free to ask if you have any other questions about our fragrances.",
                "Pleasure helping you! Remember, the perfect fragrance is waiting for you in our collection.",
                "Goodbye! I hope you find the perfect scent to illuminate your essence. Come back anytime!"
            ];
            return farewells[Math.floor(Math.random() * farewells.length)];
        }
        
        // Default response
        const defaultResponses = [
            "I'd be happy to help you with fragrance recommendations! Could you tell me what kind of scent experience you're looking for?",
            "That's an interesting question! I can help you explore our Aurora Oud, Citrus Dawn, and Velvet Iris fragrances. What interests you most?",
            "I'm here to guide you through our fragrance collection. Are you looking for something fresh, warm, or floral today?",
            "Let me help you discover the perfect scent! Our collection includes warm evening fragrances, fresh daytime scents, and soft floral blends."
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
});
