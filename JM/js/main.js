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

// Legacy products array for backward compatibility with old functions
let products = [];
function updateProductsArray() {
    // Convert SQL products to legacy format for compatibility
    if (window.sqlProducts) {
        products = window.sqlProducts.map(product => ({
            id: product.id,
            name: product.product_name,
            brand: product.brand,
            price: product.price,
            notes: product.notes,
            description: product.description
        }));
    }
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

// New Products Page rendering with categories
function renderNewProductsPage() {
    const categories = [
        'Signature Eau de Parfum',
        'Luxury Eau de Toilette', 
        'Home Fragrance Collection',
        'Travel & Mini Sets',
        'Wellness Aromatics'
    ];

    categories.forEach(category => {
        const containerId = category.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9\-]/g, '') + '-content';
        const container = document.getElementById(containerId);
        
        if (container) {
            const categoryProducts = sqlProducts.filter(product => product.category === category);
            
            categoryProducts.forEach(product => {
                const card = createProductCard(product);
                container.appendChild(card);
                applyScrollReveal(card);
            });
        }
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id);
    
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image_url}" alt="${product.product_name}" class="product-image">
        </div>
        <h4>${product.product_name}</h4>
        <p class="brand">${product.brand}</p>
        <p class="notes">${product.notes}</p>
        <p class="price">£${product.price.toFixed(2)}</p>
        <p class="description">${product.description}</p>
        <button class="btn-primary" data-product-id="${product.id}">
            Add to basket
        </button>
    `;
    
    // Add click handler for add to basket button
    card.querySelector('.btn-primary').addEventListener('click', (e) => {
        e.stopPropagation();
        addToBasket(product.id);
    });
    
    return card;
}

// Horizontal scrolling is now handled by CSS
// No JavaScript scrolling functions needed for the new layout
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

            gradient.addColorStop(0, `rgba(255, 100, 100, ${s.alpha})`);
            gradient.addColorStop(0.4, `rgba(220, 50, 50, ${s.alpha * 0.6})`);
            gradient.addColorStop(1, `rgba(180, 30, 30, 0)`);

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

// SQL Products initialization function
async function initSQLProducts() {
    console.log('Initializing SQL products...');
    try {
        const parser = new SQLParser();
        const products = await parser.loadProducts();
        
        if (products.length > 0) {
            // Add fallback for products with missing/invalid image URLs
            const cleanedProducts = products.map(product => {
                if (!product.image_url || product.image_url.toUpperCase() === 'NULL' ||
                    product.image_url.includes("'") || product.image_url.includes('NULL')) {
                    // Use a default image or empty string for products without valid images
                    product.image_url = 'images/luminous-logo.png'; // fallback image
                }
                return product;
            });
            
            window.sqlProducts = cleanedProducts;
            updateProductsArray(); // Update legacy products array
            console.log(`Successfully loaded ${products.length} products from SQL file`);
            
            // Render the products page
            renderNewProductsPage();
        } else {
            console.error('No products loaded from SQL file');
            // Could add fallback here if needed
        }
    } catch (error) {
        console.error('Failed to initialize SQL products:', error);
        // Could add fallback here if needed
    }
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
    } else if (page === "newproducts") {
        // SQL products will be loaded and rendered in initSQLProducts
        initSQLProducts();
    } else if (page === "basket") {
        renderBasketPage();
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
// Async version that waits for SQL data to be loaded
async function renderNewProductsPageAsync() {
    console.log('renderNewProductsPageAsync called');
    console.log('window.sqlProducts exists:', !!window.sqlProducts);
    console.log('window.sqlProducts length:', window.sqlProducts ? window.sqlProducts.length : 'undefined');
    
    // Wait for SQL data to be loaded
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max wait
    
    while (!window.sqlProducts && attempts < maxAttempts) {
        console.log(`Waiting for SQL data... attempt ${attempts + 1}`);
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }
    
    if (!window.sqlProducts) {
        console.error('Failed to load SQL products after waiting');
        return;
    }
    
    console.log('SQL data loaded, proceeding to render products');
    renderNewProductsPage();
}

// Original synchronous version (now uses global sqlProducts)
function renderNewProductsPage() {
    console.log('renderNewProductsPage called');
    
    if (!window.sqlProducts) {
        console.error('SQL products not loaded');
        return;
    }
    
    console.log('Number of products available:', window.sqlProducts.length);
    console.log('Sample product:', window.sqlProducts[0]);
    
    const categories = [
        'Signature Eau de Parfum',
        'Luxury Eau de Toilette',
        'Home Fragrance Collection',
        'Travel & Mini Sets',
        'Wellness Aromatics'
    ];

    categories.forEach(category => {
        console.log(`Processing category: ${category}`);
        
        // Match the exact HTML container IDs
        let containerId;
        switch(category) {
            case 'Signature Eau de Parfum':
                containerId = 'signature-parfum-grid';
                break;
            case 'Luxury Eau de Toilette':
                containerId = 'luxury-toilette-grid';
                break;
            case 'Home Fragrance Collection':
                containerId = 'home-fragrance-grid';
                break;
            case 'Travel & Mini Sets':
                containerId = 'travel-sets-grid';
                break;
            case 'Wellness Aromatics':
                containerId = 'wellness-aromatics-grid';
                break;
            default:
                containerId = category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and').replace(/[^a-z0-9\-]/g, '') + '-grid';
        }
        
        const container = document.getElementById(containerId);
        console.log(`Container ID: ${containerId}, Found:`, !!container);
        
        if (container) {
            const categoryProducts = window.sqlProducts.filter(product => product.category === category);
            console.log(`Products in category ${category}:`, categoryProducts.length);
            
            categoryProducts.forEach(product => {
                const card = createProductCard(product);
                container.appendChild(card);
                applyScrollReveal(card);
            });
        }
    });
    
    console.log('renderNewProductsPage completed');
}

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
document.querySelectorAll('.main-header, .site-footer, .hero-text, .hero-text h2, .hero-text p, .page-header, .page-header h2, .page-header p, .card, .card h3, .card p, .card .btn-primary, .feature-card, .feature-card h4, .feature-card p, .basket-section, .basket-item, .basket-summary, .basket-summary p, .basket-summary .btn-primary, .info-column, .info-column h3, .info-column p, .steps-list li, .step-number, .feature-section h3, .auth-section, .auth-form, .category-section, .category-header').forEach(el => {
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
                ctx.strokeStyle = `rgba(220, 50, 50, ${alpha})`;
                ctx.lineWidth = size;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
        }
    
        requestAnimationFrame(animate);
    }
    
    animate();
}
