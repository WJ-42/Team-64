// Complete product data organized by category
const products = [
    // === SIGNATURE PERFUMES ===
    {
        id: 1,
        name: "Aurora Oud",
        brand: "Luminous Scents",
        price: 89.99,
        notes: "Oud, amber, vanilla",
        description: "Warm and deep evening scent with a rich oud base.",
        image: "aurora-oud.png",
        category: "perfume"
    },
    {
        id: 2,
        name: "Citrus Dawn",
        brand: "Luminous Scents",
        price: 59.99,
        notes: "Bergamot, lemon, neroli",
        description: "Fresh daytime fragrance that is bright and uplifting.",
        image: "citrus-dawn.png",
        category: "perfume"
    },
    {
        id: 3,
        name: "Velvet Iris",
        brand: "Luminous Scents",
        price: 74.50,
        notes: "Iris, violet, sandalwood",
        description: "Soft floral scent with a creamy sandalwood base.",
        image: "velvet-iris.png",
        category: "perfume"
    },
    {
        id: 6,
        name: "Amber Eclipse",
        brand: "Luminous Scents",
        price: 84.99,
        notes: "Amber, benzoin, tonka bean",
        description: "A mysterious blend of warm amber and sweet tonka.",
        image: "amber-eclipse.png",
        category: "perfume"
    },
    {
        id: 7,
        name: "Citrus Bloom",
        brand: "Luminous Scents",
        price: 62.99,
        notes: "Orange blossom, grapefruit, jasmine",
        description: "Sparkling citrus meets delicate florals.",
        image: "citrus-bloom.png",
        category: "perfume"
    },
    {
        id: 8,
        name: "Fresh Horizon",
        brand: "Luminous Scents",
        price: 58.99,
        notes: "Sea salt, cucumber, mint",
        description: "Crisp and clean like an ocean breeze at dawn.",
        image: "fresh-horizon.png",
        category: "perfume"
    },
    {
        id: 9,
        name: "Golden Sandalwood",
        brand: "Luminous Scents",
        price: 92.99,
        notes: "Sandalwood, saffron, cardamom",
        description: "Luxurious sandalwood with warm spice notes.",
        image: "golden-sandalwood.png",
        category: "perfume"
    },
    {
        id: 10,
        name: "Jasmine Veil",
        brand: "Luminous Scents",
        price: 78.99,
        notes: "Jasmine, ylang-ylang, musk",
        description: "Intoxicating jasmine wrapped in soft musk.",
        image: "jasmine-veil.png",
        category: "perfume"
    },
    {
        id: 11,
        name: "Lavender Dream",
        brand: "Luminous Scents",
        price: 54.99,
        notes: "Lavender, vanilla, honey",
        description: "Soothing lavender with a sweet, dreamy finish.",
        image: "lavender-dream.png",
        category: "perfume"
    },
    {
        id: 12,
        name: "Midnight Rose",
        brand: "Luminous Scents",
        price: 82.99,
        notes: "Rose, patchouli, blackcurrant",
        description: "Dark and romantic rose for evening allure.",
        image: "midnight-rose.png",
        category: "perfume"
    },
    {
        id: 13,
        name: "Ocean Whisper",
        brand: "Luminous Scents",
        price: 64.99,
        notes: "Marine accord, driftwood, white tea",
        description: "Captures the serenity of waves on shore.",
        image: "ocean-whisper.png",
        category: "perfume"
    },
    {
        id: 14,
        name: "Spiced Cedar",
        brand: "Luminous Scents",
        price: 76.99,
        notes: "Cedarwood, black pepper, nutmeg",
        description: "Bold and woody with a spicy kick.",
        image: "spiced-cedar.png",
        category: "perfume"
    },
    {
        id: 15,
        name: "Velvet Oud",
        brand: "Luminous Scents",
        price: 98.99,
        notes: "Oud, velvet rose, smoky incense",
        description: "Our most luxurious oud, rich and velvety.",
        image: "velvet-oud.png",
        category: "perfume"
    },
    
    // === SOLARIS DUO ===
    {
        id: 4,
        name: "Solaris Femme",
        brand: "Luminous Scents",
        price: 79.99,
        notes: "Jasmine, rose, musk",
        description: "Elegant floral scent for her.",
        image: "solaris-femme.png",
        category: "solaris"
    },
    {
        id: 5,
        name: "Solaris Homme",
        brand: "Luminous Scents",
        price: 69.99,
        notes: "Cedar, vetiver, citrus",
        description: "Sophisticated woody scent for him.",
        image: "solaris-homme.png",
        category: "solaris"
    },
    
    // === HOME FRAGRANCES ===
    {
        id: 20,
        name: "Rosewood Candle",
        brand: "Luminous Scents",
        price: 38.99,
        notes: "Rosewood, geranium, warm amber",
        description: "Elegant ambiance for any room. Burns for 50+ hours.",
        image: "rosewood-candle.png",
        category: "home"
    },
    {
        id: 21,
        name: "Citrus Verbena Diffuser",
        brand: "Luminous Scents",
        price: 42.99,
        notes: "Verbena, lemon zest, green tea",
        description: "Continuous fragrance for up to 3 months.",
        image: "citrus-verbena-diffuser.png",
        category: "home"
    },
    {
        id: 22,
        name: "Midnight Garden Incense",
        brand: "Luminous Scents",
        price: 24.99,
        notes: "Night-blooming jasmine, sandalwood, musk",
        description: "Set of 30 hand-rolled incense sticks.",
        image: "midnight-garden-incense.png",
        category: "home"
    },
    {
        id: 23,
        name: "Vanilla Musk Wax Melts",
        brand: "Luminous Scents",
        price: 18.99,
        notes: "Vanilla bean, white musk, caramel",
        description: "Pack of 12 wax melts for electric warmers.",
        image: "vanilla-musk-wax-melts.png",
        category: "home"
    },
    {
        id: 24,
        name: "White Tea Linen Spray",
        brand: "Luminous Scents",
        price: 28.99,
        notes: "White tea, cotton flower, soft woods",
        description: "Refresh linens, curtains, and upholstery.",
        image: "white-tea-linen-spray.png",
        category: "home"
    },
    
    // === WELLNESS ===
    {
        id: 30,
        name: "Calming Lavender Mist",
        brand: "Luminous Scents",
        price: 26.99,
        notes: "French lavender, chamomile, bergamot",
        description: "Spritz on pillows or in the air for relaxation.",
        image: "calming-lavender-mist.png",
        category: "wellness"
    },
    {
        id: 31,
        name: "Energizing Citrus Oil Blend",
        brand: "Luminous Scents",
        price: 32.99,
        notes: "Sweet orange, lemon, grapefruit, peppermint",
        description: "Essential oil blend for diffusers. 30ml bottle.",
        image: "energizing-citrus-oil-blend.png",
        category: "wellness"
    },
    {
        id: 32,
        name: "Focus Eucalyptus Roller",
        brand: "Luminous Scents",
        price: 22.99,
        notes: "Eucalyptus, rosemary, spearmint",
        description: "Roll-on pulse point oil for mental clarity.",
        image: "focus-eucalyptus-roller.png",
        category: "wellness"
    },
    {
        id: 33,
        name: "Relaxing Chamomile Balm",
        brand: "Luminous Scents",
        price: 34.99,
        notes: "Roman chamomile, neroli, sweet almond",
        description: "Solid balm for temples and wrists. 15g tin.",
        image: "relaxing-chamomile-balm.png",
        category: "wellness"
    },
    {
        id: 34,
        name: "Sleep Serenity Pillow Spray",
        brand: "Luminous Scents",
        price: 29.99,
        notes: "Lavender, vetiver, cedarwood",
        description: "Promotes restful sleep. 100ml spray bottle.",
        image: "sleep-serenity-pillow-spray.png",
        category: "wellness"
    },
    
    // === TRAVEL & GIFT SETS ===
    {
        id: 40,
        name: "Discovery Sample Set",
        brand: "Luminous Scents",
        price: 48.99,
        notes: "8 × 2ml samples of our bestsellers",
        description: "Perfect introduction to our fragrance collection.",
        image: "discovery-sample-set.png",
        category: "gift"
    },
    {
        id: 41,
        name: "Duo Travel Set",
        brand: "Luminous Scents",
        price: 89.99,
        notes: "2 × 30ml travel sprays in leather case",
        description: "Choose any two fragrances. TSA-approved size.",
        image: "duo-travel-set.png",
        category: "gift"
    },
    {
        id: 42,
        name: "Mini Candle Trio",
        brand: "Luminous Scents",
        price: 44.99,
        notes: "3 × 70g candles in gift box",
        description: "Rosewood, Vanilla Musk, and White Tea scents.",
        image: "mini-candle-trio.png",
        category: "gift"
    },
    {
        id: 43,
        name: "Pocket Perfume Roll-Ons",
        brand: "Luminous Scents",
        price: 36.99,
        notes: "4 × 5ml roll-on bottles",
        description: "Portable favorites: Citrus Dawn, Velvet Iris, Ocean Whisper, Lavender Dream.",
        image: "pocket-perfume-roll-ons.png",
        category: "gift"
    },
    {
        id: 44,
        name: "Refillable Atomizer Kit",
        brand: "Luminous Scents",
        price: 28.99,
        notes: "2 × 10ml refillable atomizers",
        description: "Sleek metal design. Refill from any full-size bottle.",
        image: "refillable-atomizer-kit.png",
        category: "gift"
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
    // Get all section containers
    const perfumeContainer = document.getElementById("perfumeContainer");
    const solarisContainer = document.getElementById("solarisContainer");
    const homeContainer = document.getElementById("homeContainer");
    const wellnessContainer = document.getElementById("wellnessContainer");
    const giftContainer = document.getElementById("giftContainer");
    
    if (!perfumeContainer) return;

    // Filter products by category
    const perfumeProducts = products.filter(p => p.category === "perfume");
    const solarisProducts = products.filter(p => p.category === "solaris");
    const homeProducts = products.filter(p => p.category === "home");
    const wellnessProducts = products.filter(p => p.category === "wellness");
    const giftProducts = products.filter(p => p.category === "gift");

    // Helper function to create product card
    function createProductCard(product) {
        const card = document.createElement("article");
        card.className = "card";
        card.setAttribute("data-category", product.category);

        card.innerHTML = `
            <div class="product-image-container ${product.id === 1 ? 'aurora-oud-image' : ''}">
                <img src="images/${product.image}" alt="${product.name}" class="product-image">
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

        return card;
    }

    // Render products into their containers
    function renderToContainer(container, productList) {
        if (!container) return;
        container.innerHTML = "";
        productList.forEach(product => {
            const card = createProductCard(product);
            container.appendChild(card);
            applyScrollReveal(card);
        });
    }

    // Render all sections
    renderToContainer(perfumeContainer, perfumeProducts);
    renderToContainer(solarisContainer, solarisProducts);
    renderToContainer(homeContainer, homeProducts);
    renderToContainer(wellnessContainer, wellnessProducts);
    renderToContainer(giftContainer, giftProducts);

    // Add click handlers to all product sections
    document.querySelectorAll(".product-scroll-container, .cards-grid").forEach(container => {
        container.addEventListener("click", event => {
            const button = event.target.closest("button[data-product-id]");
            if (button) {
                const id = Number(button.getAttribute("data-product-id"));
                addToBasket(id);
            }
        });
    });

    // Initialize scroll functionality for scrollable sections
    initScrollableSections();
}

// Scroll navigation for product sections
function updateSectionUI(section) {
    const container = section.querySelector(".product-scroll-container");
    const leftBtn = section.querySelector(".scroll-btn-left");
    const rightBtn = section.querySelector(".scroll-btn-right");

    if (!container || !leftBtn || !rightBtn) return;

    // Count visible cards
    const visibleCards = Array.from(container.children).filter(
        card => card.style.display !== 'none'
    ).length;

    // Logic for centering content
    if (visibleCards <= 3) {
        container.style.justifyContent = 'center';
    } else {
        container.style.justifyContent = 'flex-start';
    }

    // Logic for button visibility based on card count
    const areButtonsNeeded = visibleCards > 3;
    if (!areButtonsNeeded) {
        // Hide both buttons if there aren't enough cards to scroll
        leftBtn.classList.add("hidden");
        rightBtn.classList.add("hidden");
        return; // Exit early
    }
    
    // If buttons ARE needed, determine their state based on scroll position
    leftBtn.classList.toggle("hidden", container.scrollLeft <= 10);
    const maxScroll = container.scrollWidth - container.clientWidth;
    rightBtn.classList.toggle("hidden", container.scrollLeft >= maxScroll - 10);
}

function initScrollableSections() {
    const scrollSections = document.querySelectorAll(".product-section-scrollable");
    
    scrollSections.forEach(section => {
        const container = section.querySelector(".product-scroll-container");
        const leftBtn = section.querySelector(".scroll-btn-left");
        const rightBtn = section.querySelector(".scroll-btn-right");
        
        if (!container) return;

        const cardWidth = 320; // Card width (300px) + gap (20px)
        const scrollAmount = cardWidth * 3; // Scroll 3 cards at a time

        // Scroll button click handlers
        if (leftBtn) {
            leftBtn.addEventListener("click", () => {
                container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            });
        }

        if (rightBtn) {
            rightBtn.addEventListener("click", () => {
                container.scrollBy({ left: scrollAmount, behavior: "smooth" });
            });
        }

        // Update UI on scroll
        container.addEventListener("scroll", () => updateSectionUI(section));
        
        // The initial UI update is now handled by the window.onload event
    });
}

// Track if a filter was previously active
let wasFiltered = false;

function filterProducts() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const allSections = document.querySelectorAll(".product-section");
    const allCards = document.querySelectorAll(".product-scroll-container .card, .cards-grid .card");
    
    const isFilterActive = searchTerm !== "";
    const filterJustRemoved = wasFiltered && !isFilterActive;

    // Track visible cards per section
    const sectionVisibility = {};

    // Filter all cards
    allCards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const notes = card.querySelector("p:nth-of-type(2)").textContent.toLowerCase();
        const description = card.querySelector("p:nth-of-type(4)").textContent.toLowerCase();
        const category = card.getAttribute("data-category") || "unknown";
        
        const matches = name.includes(searchTerm) || notes.includes(searchTerm) || description.includes(searchTerm);

        if (matches) {
            card.style.display = "block";
            sectionVisibility[category] = (sectionVisibility[category] || 0) + 1;
        } else {
            card.style.display = "none";
        }
    });

    // Update UI for each scrollable section (centering and buttons)
    document.querySelectorAll(".product-section-scrollable").forEach(section => {
        updateSectionUI(section);
    });

    // Hide/show sections based on visible products
    allSections.forEach(section => {
        const sectionCategory = section.getAttribute("data-section-category");
        if (sectionCategory) {
            const visibleCount = sectionVisibility[sectionCategory] || 0;
            if (searchTerm === "" || visibleCount > 0) {
                section.style.display = "block";
            } else {
                section.style.display = "none";
            }
        }
    });

    // Only animate when filter is REMOVED (going back to show all)
    if (filterJustRemoved) {
        // Remove animation class from all cards first
        allCards.forEach(card => {
            card.classList.remove('filter-animate');
        });
        
        // Force reflow to reset animation
        void document.body.offsetHeight;
        
        // Add animation class to trigger fade-in on ALL cards
        allCards.forEach(card => {
            card.classList.add('filter-animate');
        });
        
        // Remove filter-animate class after animation completes so scroll animations work again
        setTimeout(() => {
            allCards.forEach(card => {
                card.classList.remove('filter-animate');
                card.classList.add('revealed');
            });
        }, 550);
    }

    // Update filter state for next time
    wasFiltered = isFilterActive;
}

function initEnhancedSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchBox = document.querySelector(".search-box");
    const clearBtn = document.querySelector(".search-clear");
    const suggestionTags = document.querySelectorAll(".suggestion-tag");

    if (!searchInput || !searchBox) return;

    // Update has-value class on input
    function updateHasValue() {
        if (searchInput.value.length > 0) {
            searchBox.classList.add("has-value");
        } else {
            searchBox.classList.remove("has-value");
        }
    }

    // Filter products on input
    searchInput.addEventListener("input", () => {
        updateHasValue();
        filterProducts();
    });

    // Clear button functionality
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            searchInput.value = "";
            updateHasValue();
            filterProducts();
            searchInput.focus();
        });
    }

    // Suggestion tag click - fills search and filters
    suggestionTags.forEach(tag => {
        tag.addEventListener("click", () => {
            searchInput.value = tag.textContent;
            updateHasValue();
            filterProducts();
            
            // Add a nice pulse effect to the search box
            searchBox.style.transform = "scale(1.03)";
            setTimeout(() => {
                searchBox.style.transform = "";
            }, 150);
        });
    });

    // Initial state
    updateHasValue();
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
        <p class="basket-total"><strong>Total:</strong> £${total.toFixed(2)}</p>
        <div class="basket-actions">
            <button id="clearBasketBtn" class="btn-secondary">Clear basket</button>
            <button id="mockCheckoutBtn" class="btn-primary">Proceed to checkout</button>
        </div>
    `;

    const checkoutBtn = document.getElementById("mockCheckoutBtn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            window.location.href = "checkout.html";
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
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const passwordRequirements = document.getElementById("passwordRequirements");
    const successToast = document.getElementById("successToast");
    const toastMessage = document.getElementById("toastMessage");

    // Password requirement elements
    const reqLength = document.getElementById("reqLength");
    const reqUpper = document.getElementById("reqUpper");
    const reqLower = document.getElementById("reqLower");
    const reqNumber = document.getElementById("reqNumber");

    if (!form || !emailInput || !passwordInput) {
        return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Helper functions
    function showError(input, errorElement, message) {
        input.classList.add('input-error');
        input.classList.remove('input-success');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function clearError(input, errorElement) {
        input.classList.remove('input-error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    function showSuccess(input) {
        input.classList.remove('input-error');
        input.classList.add('input-success');
    }

    function showToast(msg) {
        toastMessage.textContent = msg;
        successToast.classList.add('show');
        setTimeout(() => {
            successToast.classList.remove('show');
        }, 4000);
    }

    // Validate password requirements
    function validatePasswordRequirements(password) {
        const hasLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        // Update requirement indicators
        reqLength.textContent = (hasLength ? '✓' : '✗') + ' At least 8 characters';
        reqLength.classList.toggle('valid', hasLength);
        
        reqUpper.textContent = (hasUpper ? '✓' : '✗') + ' One uppercase letter';
        reqUpper.classList.toggle('valid', hasUpper);
        
        reqLower.textContent = (hasLower ? '✓' : '✗') + ' One lowercase letter';
        reqLower.classList.toggle('valid', hasLower);
        
        reqNumber.textContent = (hasNumber ? '✓' : '✗') + ' One number';
        reqNumber.classList.toggle('valid', hasNumber);

        return hasLength && hasUpper && hasLower && hasNumber;
    }

    // Real-time email validation
    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        if (email === '') {
            clearError(emailInput, emailError);
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
        } else {
            clearError(emailInput, emailError);
            showSuccess(emailInput);
        }
    });

    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (email === '') {
            showError(emailInput, emailError, 'Email address is required');
        }
    });

    // Show password requirements when focused (only for new users)
    passwordInput.addEventListener('focus', () => {
        if (isNewUser.checked) {
            passwordRequirements.classList.add('show');
        }
    });

    // Real-time password validation
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        
        if (isNewUser.checked) {
            passwordRequirements.classList.add('show');
            const isValid = validatePasswordRequirements(password);
            
            if (password === '') {
                clearError(passwordInput, passwordError);
            } else if (!isValid) {
                passwordInput.classList.add('input-error');
                passwordInput.classList.remove('input-success');
            } else {
                clearError(passwordInput, passwordError);
                showSuccess(passwordInput);
            }
        } else {
            passwordRequirements.classList.remove('show');
            if (password === '') {
                clearError(passwordInput, passwordError);
            } else if (password.length < 6) {
                showError(passwordInput, passwordError, 'Password must be at least 6 characters');
            } else {
                clearError(passwordInput, passwordError);
                showSuccess(passwordInput);
            }
        }
    });

    // Toggle password requirements visibility based on checkbox
    isNewUser.addEventListener('change', () => {
        if (isNewUser.checked) {
            passwordRequirements.classList.add('show');
            if (passwordInput.value) {
                validatePasswordRequirements(passwordInput.value);
            }
        } else {
            passwordRequirements.classList.remove('show');
        }
        // Re-validate password on checkbox change
        const password = passwordInput.value;
        if (password !== '') {
            passwordInput.dispatchEvent(new Event('input'));
        }
    });

    // Form submission
    form.addEventListener("submit", event => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        let hasErrors = false;

        // Validate email
        if (!email) {
            showError(emailInput, emailError, 'Email address is required');
            hasErrors = true;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            hasErrors = true;
        }

        // Validate password
        if (!password) {
            showError(passwordInput, passwordError, 'Password is required');
            hasErrors = true;
        } else if (isNewUser.checked) {
            const isValidPassword = validatePasswordRequirements(password);
            if (!isValidPassword) {
                showError(passwordInput, passwordError, 'Password does not meet all requirements');
                hasErrors = true;
            }
        } else if (password.length < 6) {
            showError(passwordInput, passwordError, 'Password must be at least 6 characters');
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        // Success - show toast and clear form
        if (isNewUser.checked) {
            showToast('Account created successfully! Welcome to Luminous Scents.');
        } else {
            showToast('Welcome back! You have been logged in.');
        }

        // Clear form
        form.reset();
        clearError(emailInput, emailError);
        clearError(passwordInput, passwordError);
        emailInput.classList.remove('input-success');
        passwordInput.classList.remove('input-success');
        passwordRequirements.classList.remove('show');

        localStorage.setItem("luminousScentsUserEmail", email);
    });
}

// Contact form validation

function setupContactForm() {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const messageInput = document.getElementById("contactMessage");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("contactEmailError");
    const messageError = document.getElementById("messageError");
    const charCounter = document.getElementById("charCounter");

    if (!form || !nameInput || !emailInput || !messageInput) {
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    const MAX_MESSAGE_LENGTH = 500;
    const MIN_MESSAGE_LENGTH = 10;
    const MIN_NAME_LENGTH = 2;

    // Helper functions
    function showError(input, errorElement, message) {
        input.classList.add('input-error');
        input.classList.remove('input-success');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function clearError(input, errorElement) {
        input.classList.remove('input-error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    function showSuccess(input) {
        input.classList.remove('input-error');
        input.classList.add('input-success');
    }

    // Update character counter
    function updateCharCounter() {
        const length = messageInput.value.length;
        charCounter.textContent = `${length} / ${MAX_MESSAGE_LENGTH}`;
        
        if (length > MAX_MESSAGE_LENGTH * 0.9) {
            charCounter.classList.add('warning');
        } else {
            charCounter.classList.remove('warning');
        }
        
        if (length >= MAX_MESSAGE_LENGTH) {
            charCounter.classList.add('limit');
        } else {
            charCounter.classList.remove('limit');
        }
    }

    // Real-time name validation
    nameInput.addEventListener('input', () => {
        const name = nameInput.value.trim();
        if (name === '') {
            clearError(nameInput, nameError);
        } else if (name.length < MIN_NAME_LENGTH) {
            showError(nameInput, nameError, `Name must be at least ${MIN_NAME_LENGTH} characters`);
        } else if (!nameRegex.test(name)) {
            showError(nameInput, nameError, 'Name can only contain letters, spaces, hyphens and apostrophes');
        } else {
            clearError(nameInput, nameError);
            showSuccess(nameInput);
        }
    });

    nameInput.addEventListener('blur', () => {
        const name = nameInput.value.trim();
        if (name === '') {
            showError(nameInput, nameError, 'Name is required');
        }
    });

    // Real-time email validation
    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        if (email === '') {
            clearError(emailInput, emailError);
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
        } else {
            clearError(emailInput, emailError);
            showSuccess(emailInput);
        }
    });

    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (email === '') {
            showError(emailInput, emailError, 'Email address is required');
        }
    });

    // Real-time message validation with character counter
    messageInput.addEventListener('input', () => {
        updateCharCounter();
        const message = messageInput.value.trim();
        
        if (message === '') {
            clearError(messageInput, messageError);
        } else if (message.length < MIN_MESSAGE_LENGTH) {
            showError(messageInput, messageError, `Message must be at least ${MIN_MESSAGE_LENGTH} characters`);
        } else if (messageInput.value.length > MAX_MESSAGE_LENGTH) {
            showError(messageInput, messageError, `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`);
        } else {
            clearError(messageInput, messageError);
            showSuccess(messageInput);
        }
    });

    messageInput.addEventListener('blur', () => {
        const message = messageInput.value.trim();
        if (message === '') {
            showError(messageInput, messageError, 'Message is required');
        }
    });

    // Initialize character counter
    updateCharCounter();

    // Form submission
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        let hasErrors = false;

        // Validate name
        if (!name) {
            showError(nameInput, nameError, 'Name is required');
            hasErrors = true;
        } else if (name.length < MIN_NAME_LENGTH) {
            showError(nameInput, nameError, `Name must be at least ${MIN_NAME_LENGTH} characters`);
            hasErrors = true;
        } else if (!nameRegex.test(name)) {
            showError(nameInput, nameError, 'Name can only contain letters, spaces, hyphens and apostrophes');
            hasErrors = true;
        }

        // Validate email
        if (!email) {
            showError(emailInput, emailError, 'Email address is required');
            hasErrors = true;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            hasErrors = true;
        }

        // Validate message
        if (!message) {
            showError(messageInput, messageError, 'Message is required');
            hasErrors = true;
        } else if (message.length < MIN_MESSAGE_LENGTH) {
            showError(messageInput, messageError, `Message must be at least ${MIN_MESSAGE_LENGTH} characters`);
            hasErrors = true;
        } else if (messageInput.value.length > MAX_MESSAGE_LENGTH) {
            showError(messageInput, messageError, `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`);
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        // Success - show confirmation and clear form
        customAlert("Message sent! We will get back to you soon.");
        
        // Clear form
        form.reset();
        clearError(nameInput, nameError);
        clearError(emailInput, emailError);
        clearError(messageInput, messageError);
        nameInput.classList.remove('input-success');
        emailInput.classList.remove('input-success');
        messageInput.classList.remove('input-success');
        updateCharCounter();
    });
}

// Checkout page functions

function renderCheckoutSummary() {
    // Render to both step 1 and step 2 order summary containers
    const containers = [
        document.getElementById("orderSummary"),
        document.getElementById("orderSummary2")
    ].filter(c => c !== null);
    
    if (containers.length === 0) return;

    const basket = loadBasket();

    containers.forEach(container => {
        container.innerHTML = "";

        if (basket.length === 0) {
            container.innerHTML = `
                <div class="empty-order">
                    <p>Your basket is empty.</p>
                    <a href="products.html" class="btn-primary">Browse Fragrances</a>
                </div>
            `;
            return;
        }

        let total = 0;

        basket.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return;
            
            const lineTotal = product.price * item.quantity;
            total += lineTotal;

            const itemDiv = document.createElement("div");
            itemDiv.className = "order-item";
            itemDiv.innerHTML = `
                <div class="order-item-details">
                    <span class="order-item-name">${product.name}</span>
                    <span class="order-item-qty">Qty: ${item.quantity} × £${product.price.toFixed(2)}</span>
                </div>
                <span class="order-item-price">£${lineTotal.toFixed(2)}</span>
            `;
            container.appendChild(itemDiv);
        });

        // Add divider and total
        const divider = document.createElement("div");
        divider.className = "order-divider";
        container.appendChild(divider);

        const totalDiv = document.createElement("div");
        totalDiv.className = "order-total";
        totalDiv.innerHTML = `
            <span class="order-total-label">Total:</span>
            <span class="order-total-price">£${total.toFixed(2)}</span>
        `;
        container.appendChild(totalDiv);
    });
}

function setupCheckoutForm() {
    const form = document.getElementById("checkoutForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const addressInput = document.getElementById("address");
    const cardNameInput = document.getElementById("cardName");
    const cardNumberInput = document.getElementById("cardNumber");
    const expiryInput = document.getElementById("expiry");
    const cvvInput = document.getElementById("cvv");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const addressError = document.getElementById("addressError");
    const cardNameError = document.getElementById("cardNameError");
    const cardNumberError = document.getElementById("cardNumberError");
    const expiryError = document.getElementById("expiryError");
    const cvvError = document.getElementById("cvvError");

    const toast = document.getElementById("checkoutToast");
    const toastMessage = document.getElementById("checkoutToastMessage");

    // Step navigation elements
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const toStep2Btn = document.getElementById("toStep2");
    const toStep1Btn = document.getElementById("toStep1");
    const stepIndicators = document.querySelectorAll(".step");
    const stepLine = document.querySelector(".step-line");

    if (!form) return;

    // Validation patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    const cardNumberRegex = /^[\d\s]{13,19}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    const cvvRegex = /^[0-9]{3}$/;

    // Helper functions
    function showError(input, errorElement, message) {
        input.classList.add('input-error');
        input.classList.remove('input-success');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function clearError(input, errorElement) {
        input.classList.remove('input-error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    function showSuccess(input) {
        input.classList.remove('input-error');
        input.classList.add('input-success');
    }

    function showToast(msg) {
        toastMessage.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    // Format card number with spaces - ONLY allows digits
    function formatCardNumber(value) {
        // Strip ALL non-digit characters first
        const digitsOnly = value.replace(/\D/g, '');
        // Limit to 16 digits
        const limited = digitsOnly.substring(0, 16);
        // Add spaces every 4 digits
        const parts = [];
        for (let i = 0; i < limited.length; i += 4) {
            parts.push(limited.substring(i, i + 4));
        }
        return parts.join(' ');
    }

    // Format expiry date - ONLY allows digits
    function formatExpiry(value) {
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length >= 2) {
            return digitsOnly.substring(0, 2) + '/' + digitsOnly.substring(2, 4);
        }
        return digitsOnly;
    }

    // Step navigation functions
    function goToStep(stepNum) {
        if (stepNum === 1) {
            step1.classList.remove("hidden");
            step2.classList.add("hidden");
            stepIndicators[0].classList.add("active");
            stepIndicators[0].classList.remove("completed");
            stepIndicators[1].classList.remove("active");
            if (stepLine) stepLine.classList.remove("active");
        } else if (stepNum === 2) {
            step1.classList.add("hidden");
            step2.classList.remove("hidden");
            stepIndicators[0].classList.remove("active");
            stepIndicators[0].classList.add("completed");
            stepIndicators[1].classList.add("active");
            if (stepLine) stepLine.classList.add("active");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Step 1 to Step 2 button
    if (toStep2Btn) {
        toStep2Btn.addEventListener("click", () => {
            // Validate step 1 fields first
            let hasErrors = false;

            const name = nameInput.value.trim();
            if (!name) {
                showError(nameInput, nameError, 'Full name is required');
                hasErrors = true;
            } else if (name.length < 2 || !nameRegex.test(name)) {
                showError(nameInput, nameError, 'Please enter a valid name');
                hasErrors = true;
            }

            const email = emailInput.value.trim();
            if (!email) {
                showError(emailInput, emailError, 'Email address is required');
                hasErrors = true;
            } else if (!emailRegex.test(email)) {
                showError(emailInput, emailError, 'Please enter a valid email address');
                hasErrors = true;
            }

            const phone = phoneInput.value.trim();
            if (!phone) {
                showError(phoneInput, phoneError, 'Phone number is required');
                hasErrors = true;
            } else if (!phoneRegex.test(phone)) {
                showError(phoneInput, phoneError, 'Please enter a valid phone number');
                hasErrors = true;
            }

            const address = addressInput.value.trim();
            if (!address) {
                showError(addressInput, addressError, 'Shipping address is required');
                hasErrors = true;
            } else if (address.length < 10) {
                showError(addressInput, addressError, 'Please enter a complete address');
                hasErrors = true;
            }

            if (!hasErrors) {
                goToStep(2);
            }
        });
    }

    // Step 2 back to Step 1 button
    if (toStep1Btn) {
        toStep1Btn.addEventListener("click", () => {
            goToStep(1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Helper to check for at least two names
    function hasTwoNames(name) {
        const parts = name.trim().split(/\s+/).filter(part => part.length >= 2);
        return parts.length >= 2;
    }

    // Real-time name validation
    nameInput.addEventListener('input', () => {
        const name = nameInput.value.trim();
        if (name === '') {
            clearError(nameInput, nameError);
        } else if (!nameRegex.test(name)) {
            showError(nameInput, nameError, 'Please enter a valid name');
        } else if (!hasTwoNames(name)) {
            showError(nameInput, nameError, 'Please enter first and last name');
        } else {
            clearError(nameInput, nameError);
            showSuccess(nameInput);
        }
    });

    nameInput.addEventListener('blur', () => {
        const name = nameInput.value.trim();
        if (name === '') {
            showError(nameInput, nameError, 'Full name is required');
        } else if (!hasTwoNames(name)) {
            showError(nameInput, nameError, 'Please enter first and last name');
        }
    });

    // Real-time email validation
    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        if (email === '') {
            clearError(emailInput, emailError);
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
        } else {
            clearError(emailInput, emailError);
            showSuccess(emailInput);
        }
    });

    emailInput.addEventListener('blur', () => {
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Email address is required');
        }
    });

    // Real-time phone validation
    phoneInput.addEventListener('input', () => {
        const phone = phoneInput.value.trim();
        if (phone === '') {
            clearError(phoneInput, phoneError);
        } else if (!phoneRegex.test(phone)) {
            showError(phoneInput, phoneError, 'Please enter a valid phone number');
        } else {
            clearError(phoneInput, phoneError);
            showSuccess(phoneInput);
        }
    });

    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value.trim() === '') {
            showError(phoneInput, phoneError, 'Phone number is required');
        }
    });

    // Real-time address validation
    addressInput.addEventListener('input', () => {
        const address = addressInput.value.trim();
        if (address === '') {
            clearError(addressInput, addressError);
        } else if (address.length < 10) {
            showError(addressInput, addressError, 'Please enter a complete address');
        } else {
            clearError(addressInput, addressError);
            showSuccess(addressInput);
        }
    });

    addressInput.addEventListener('blur', () => {
        if (addressInput.value.trim() === '') {
            showError(addressInput, addressError, 'Shipping address is required');
        }
    });

    // Real-time card name validation
    cardNameInput.addEventListener('input', () => {
        cardNameInput.value = cardNameInput.value.toUpperCase();
        const cardName = cardNameInput.value.trim();
        if (cardName === '') {
            clearError(cardNameInput, cardNameError);
        } else if (!nameRegex.test(cardName)) {
            showError(cardNameInput, cardNameError, 'Please enter a valid name');
        } else if (!hasTwoNames(cardName)) {
            showError(cardNameInput, cardNameError, 'Please enter first and last name');
        } else {
            clearError(cardNameInput, cardNameError);
            showSuccess(cardNameInput);
        }
    });

    cardNameInput.addEventListener('blur', () => {
        const cardName = cardNameInput.value.trim();
        if (cardName === '') {
            showError(cardNameInput, cardNameError, 'Name on card is required');
        } else if (!hasTwoNames(cardName)) {
            showError(cardNameInput, cardNameError, 'Please enter first and last name');
        }
    });

    // Real-time card number validation with formatting
    cardNumberInput.addEventListener('input', (e) => {
        const formatted = formatCardNumber(e.target.value);
        e.target.value = formatted;
        
        const cardNum = formatted.replace(/\s/g, '');
        if (cardNum === '') {
            clearError(cardNumberInput, cardNumberError);
        } else if (cardNum.length < 13) {
            showError(cardNumberInput, cardNumberError, `Card number must be at least 13 digits (${cardNum.length}/13)`);
        } else {
            clearError(cardNumberInput, cardNumberError);
            showSuccess(cardNumberInput);
        }
    });

    // Block non-digit paste in card number
    cardNumberInput.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        const digitsOnly = pastedText.replace(/\D/g, '');
        const formatted = formatCardNumber(digitsOnly);
        cardNumberInput.value = formatted;
        cardNumberInput.dispatchEvent(new Event('input'));
    });

    // Block non-digit keypress in card number
    cardNumberInput.addEventListener('keypress', (e) => {
        if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
            e.preventDefault();
        }
    });

    cardNumberInput.addEventListener('blur', () => {
        const cardNum = cardNumberInput.value.replace(/\s/g, '');
        if (cardNum === '') {
            showError(cardNumberInput, cardNumberError, 'Card number is required');
        } else if (cardNum.length < 13) {
            showError(cardNumberInput, cardNumberError, `Card number must be at least 13 digits (${cardNum.length}/13)`);
        }
    });

    // Real-time expiry validation with formatting
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        // Validate month part (01-12)
        if (value.length >= 1) {
            const firstDigit = parseInt(value[0], 10);
            if (firstDigit > 1) {
                value = '0' + value; // Auto-prefix with 0 for months 2-9
            }
        }
        if (value.length >= 2) {
            const month = parseInt(value.substring(0, 2), 10);
            if (month > 12) {
                value = '12' + value.substring(2);
            } else if (month === 0) {
                value = '01' + value.substring(2);
            }
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
        
        if (value === '') {
            clearError(expiryInput, expiryError);
        } else if (!expiryRegex.test(value)) {
            showError(expiryInput, expiryError, 'Use format MM/YY');
        } else {
            // Check if card is expired
            const [month, year] = value.split('/');
            const expDate = new Date(2000 + parseInt(year), parseInt(month));
            const now = new Date();
            now.setDate(1); // First of current month for comparison
            if (expDate < now) {
                showError(expiryInput, expiryError, 'Card has expired');
            } else {
                clearError(expiryInput, expiryError);
                showSuccess(expiryInput);
            }
        }
    });

    // Block non-digit paste in expiry
    expiryInput.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        const digitsOnly = pastedText.replace(/\D/g, '');
        expiryInput.value = formatExpiry(digitsOnly);
        expiryInput.dispatchEvent(new Event('input'));
    });

    // Block non-digit keypress in expiry
    expiryInput.addEventListener('keypress', (e) => {
        if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
            e.preventDefault();
        }
    });

    expiryInput.addEventListener('blur', () => {
        if (expiryInput.value.trim() === '') {
            showError(expiryInput, expiryError, 'Expiry date is required');
        }
    });

    // Real-time CVV validation
    cvvInput.addEventListener('input', (e) => {
        // Only allow digits, max 3 characters
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
        const cvv = e.target.value;
        if (cvv === '') {
            clearError(cvvInput, cvvError);
        } else if (cvv.length < 3) {
            showError(cvvInput, cvvError, 'CVV must be 3 digits');
        } else {
            clearError(cvvInput, cvvError);
            showSuccess(cvvInput);
        }
    });

    // Block non-digit paste in CVV
    cvvInput.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        const digitsOnly = pastedText.replace(/\D/g, '').substring(0, 3);
        cvvInput.value = digitsOnly;
        cvvInput.dispatchEvent(new Event('input'));
    });

    // Block non-digit keypress in CVV
    cvvInput.addEventListener('keypress', (e) => {
        if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
            e.preventDefault();
        }
    });

    cvvInput.addEventListener('blur', () => {
        if (cvvInput.value.trim() === '') {
            showError(cvvInput, cvvError, 'CVV is required');
        }
    });

    // Form submission
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const basket = loadBasket();
        if (basket.length === 0) {
            customAlert("Your basket is empty. Please add items before checking out.");
            return;
        }

        let hasErrors = false;

        // Validate all fields
        const name = nameInput.value.trim();
        if (!name) {
            showError(nameInput, nameError, 'Full name is required');
            hasErrors = true;
        } else if (!nameRegex.test(name)) {
            showError(nameInput, nameError, 'Please enter a valid name');
            hasErrors = true;
        } else if (!hasTwoNames(name)) {
            showError(nameInput, nameError, 'Please enter first and last name');
            hasErrors = true;
        }

        const email = emailInput.value.trim();
        if (!email) {
            showError(emailInput, emailError, 'Email address is required');
            hasErrors = true;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            hasErrors = true;
        }

        const phone = phoneInput.value.trim();
        if (!phone) {
            showError(phoneInput, phoneError, 'Phone number is required');
            hasErrors = true;
        } else if (!phoneRegex.test(phone)) {
            showError(phoneInput, phoneError, 'Please enter a valid phone number');
            hasErrors = true;
        }

        const address = addressInput.value.trim();
        if (!address) {
            showError(addressInput, addressError, 'Shipping address is required');
            hasErrors = true;
        } else if (address.length < 10) {
            showError(addressInput, addressError, 'Please enter a complete address');
            hasErrors = true;
        }

        const cardName = cardNameInput.value.trim();
        if (!cardName) {
            showError(cardNameInput, cardNameError, 'Name on card is required');
            hasErrors = true;
        } else if (!nameRegex.test(cardName)) {
            showError(cardNameInput, cardNameError, 'Please enter a valid name');
            hasErrors = true;
        } else if (!hasTwoNames(cardName)) {
            showError(cardNameInput, cardNameError, 'Please enter first and last name');
            hasErrors = true;
        }

        const cardNum = cardNumberInput.value.replace(/\s/g, '');
        if (!cardNum) {
            showError(cardNumberInput, cardNumberError, 'Card number is required');
            hasErrors = true;
        } else if (cardNum.length < 13) {
            showError(cardNumberInput, cardNumberError, `Card number must be at least 13 digits (${cardNum.length}/13)`);
            hasErrors = true;
        }

        const expiry = expiryInput.value;
        if (!expiry) {
            showError(expiryInput, expiryError, 'Expiry date is required');
            hasErrors = true;
        } else if (!expiryRegex.test(expiry)) {
            showError(expiryInput, expiryError, 'Use format MM/YY');
            hasErrors = true;
        } else {
            const [month, year] = expiry.split('/');
            const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
            if (expDate < new Date()) {
                showError(expiryInput, expiryError, 'Card has expired');
                hasErrors = true;
            }
        }

        const cvv = cvvInput.value;
        if (!cvv) {
            showError(cvvInput, cvvError, 'CVV is required');
            hasErrors = true;
        } else if (!cvvRegex.test(cvv)) {
            showError(cvvInput, cvvError, 'CVV must be 3 digits');
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        // Success - clear basket and show confirmation
        localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify([]));
        
        showToast("Order placed successfully! Thank you for shopping with Luminous Scents.");
        
        // Clear form
        form.reset();
        [nameInput, emailInput, phoneInput, addressInput, cardNameInput, cardNumberInput, expiryInput, cvvInput].forEach(input => {
            input.classList.remove('input-success', 'input-error');
        });
        [nameError, emailError, phoneError, addressError, cardNameError, cardNumberError, expiryError, cvvError].forEach(err => {
            err.classList.remove('show');
            err.textContent = '';
        });

        // Refresh order summary
        renderCheckoutSummary();
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

            s.x += s.speed * 0.8;
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
    // Auto-resize textarea (vertical)
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });

    const page = document.body.getAttribute("data-page");

    initStarfield();
    initMouseTrail();

    // rest of the code...
    if (page === "home" || page === "account") {
        setupAuthForm();
    } else if (page === "products") {
        renderProductsPage();
        initEnhancedSearch();
    } else if (page === "basket") {
        renderBasketPage();
    } else if (page === "contact") {
        setupContactForm();
    } else if (page === "checkout") {
        renderCheckoutSummary();
        setupCheckoutForm();
    }
});

// Wait for all content (including images) to load before running initial UI updates.
// This prevents layout flashes and incorrect calculations.
window.addEventListener("load", () => {
    if (document.body.getAttribute("data-page") === "products") {
        document.querySelectorAll(".product-section-scrollable").forEach(section => {
            const container = section.querySelector(".product-scroll-container");
            
            if (container) {
                container.scrollLeft = 0;
            }
            
            // Run calculations to determine layout
            updateSectionUI(section);

            // Force the browser to paint the layout before we make it visible
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (container) {
                        container.scrollLeft = 0;
                    }
                    section.classList.add('loaded');
                });
            });
        });
    }
});

// Scroll reveal animations with hysteresis to prevent jitter at boundaries
// Reveal observer: triggers when element enters viewport
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.05, rootMargin: '0px' });

// Hide observer: triggers when element is fully outside viewport (with small buffer)
const hideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.target.classList.contains('revealed')) {
            entry.target.classList.remove('revealed');
        }
    });
}, { threshold: 0, rootMargin: '20px 0px 20px 0px' });

// Combined observer wrapper
const observer = {
    observe: function(element) {
        revealObserver.observe(element);
        hideObserver.observe(element);
    }
};

// Prevent observer from catching alert elements
const originalObserve = observer.observe.bind(observer);
observer.observe = function(element) {
    if (element.classList.contains('custom-alert') || 
        element.classList.contains('custom-alert-overlay') ||
        element.closest('.custom-alert')) {
        return;
    }
    originalObserve(element);
};
// Add scroll-reveal class to content elements (excluding header to keep it stable)
document.querySelectorAll('.site-footer, .hero-text, .page-header, .card, .feature-section h3, .feature-card, .feature-card h4, .basket-section, .basket-item, .basket-summary, .basket-summary p, .basket-summary .btn-primary, .info-column, .steps-list li, .step-number, .auth-section, .auth-form').forEach(el => {
    el.classList.add('scroll-reveal');
});

// Wait for browser to paint the initial state before observing
requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    });
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

const bulletObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bullets = entry.target.querySelectorAll("li");
            bullets.forEach((li, i) => {
                setTimeout(() => {
                    li.classList.add("bullet-visible");
                }, i * 150);
            });
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".values-section").forEach(section => {
    bulletObserver.observe(section);
});

