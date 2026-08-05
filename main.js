// Main JavaScript for VAISHNAVI ALANKAR

// Cart & Wishlist State with LocalStorage Persistence
let cart = [];
let wishlist = [];

try {
    const savedCart = localStorage.getItem('va_cart');
    if (savedCart) cart = JSON.parse(savedCart);
    const savedWishlist = localStorage.getItem('va_wishlist');
    if (savedWishlist) wishlist = JSON.parse(savedWishlist);
} catch (e) {
    console.warn('LocalStorage read warning:', e);
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollBackgroundAnimation();
    initScrollReveal();
    initNavbarScroll();
    initGoldParticles();
    initFilterTabs();
    initDrawersAndModals();
    initKeyboardShortcuts();
    initMobileNavScroll();
    updateCartUI();
    updateWishlistUI();
    initSupabase();
    initStatesDropdown();
});

/* --- 1. Scroll Reveal Animation --- */
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-slide-up').forEach(element => {
        observer.observe(element);
    });
}

/* --- 2. Navbar Glass Effect --- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-glass');
        } else {
            navbar.classList.remove('nav-glass');
        }
    });
}

/* --- 3. Ambient Gold Dust Canvas Particles --- */
function initGoldParticles() {
    const canvas = document.getElementById('particles-canvas') || document.getElementById('particles-js');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const numParticles = Math.min(Math.floor(width / 20), 60);
    const particles = [];

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.5,
            color: `rgba(242, 202, 80, ${Math.random() * 0.6 + 0.2})`,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -Math.random() * 0.5 - 0.2,
            alphaPulse: Math.random() * 0.02 + 0.005,
            alphaDir: 1
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.y < 0) {
                p.y = height;
                p.x = Math.random() * width;
            }
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#f2ca50';
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}


/* --- 4. Scroll-Controlled 3D Jewellery Image Sequence Inspector Engine --- */
const JEWELLERY_3D_CONFIGS = {
    'jhumka': {
        title: '22K Royal Gold Jhumka',
        subtitle: 'Scroll down to rotate the 22K Royal Gold Jhumka in 360° space',
        folder: '3D_rotating_gold_Jhumka_202608021234_frames',
        totalFrames: 130
    },
    'gold_choker': {
        title: 'Royal Kundan Ruby Choker',
        subtitle: 'Scroll down to inspect the Royal Kundan Ruby Choker in 360° space',
        folder: 'gold_choker_frames',
        fallbackFolder: '3D_rotating_gold_Jhumka_202608021234_frames',
        totalFrames: 130
    },
    'mens_kada_chain': {
        title: "Royal Men's Gold Kada & Chain",
        subtitle: "Scroll down to inspect the Men's Gold Kada & Chain Set in 360° space",
        folder: 'mens_kada_chain_frames',
        fallbackFolder: '3D_rotating_gold_Jhumka_202608021234_frames',
        totalFrames: 130
    },
    'mens_signet_ring': {
        title: 'Imperial Lion Ruby Signet Ring',
        subtitle: 'Scroll down to inspect the Imperial Lion Signet Ring in 360° space',
        folder: 'mens_signet_ring_frames',
        fallbackFolder: '3D_rotating_gold_Jhumka_202608021234_frames',
        totalFrames: 130
    },
    'mens_gold_bracelet': {
        title: "Men's Cuban Link Gold Bracelet",
        subtitle: "Scroll down to inspect the Men's Cuban Link Gold Bracelet in 360° space",
        folder: 'mens_gold_bracelet_frames',
        fallbackFolder: '3D_rotating_gold_Jhumka_202608021234_frames',
        totalFrames: 130
    },
    'kids_nazariya': {
        title: 'Gold Elephant Baby Nazariya',
        subtitle: 'Scroll down to inspect the Gold Elephant Baby Nazariya in 360° space',
        folder: 'kids_nazariya_frames',
        fallbackFolder: '3D_rotating_gold_Jhumka_202608021234_frames',
        totalFrames: 130
    },
    'chandbali_earrings': {
        title: 'Polki Chandbali Earrings',
        subtitle: 'Scroll down to inspect the Polki Chandbali Earrings in 360° space',
        folder: '3D_rotating_gold_Jhumka_202608021234_frames',
        totalFrames: 130
    },
    'temple_bangles': {
        title: 'Peacock Nakshi Gold Kadas',
        subtitle: 'Scroll down to inspect the Peacock Nakshi Gold Kadas in 360° space',
        folder: 'temple_bangles_frames',
        fallbackFolder: '3D_rotating_gold_Jhumka_202608021234_frames',
        totalFrames: 130
    },
    'diamond_mangalsutra': {
        title: 'Floral Diamond Mangalsutra',
        subtitle: 'Scroll down to inspect the Floral Diamond Solitaire Mangalsutra in 360° space',
        folder: 'diamond_mangalsutra_frames',
        fallbackFolder: '3D_rotating_gold_Jhumka_202608021234_frames',
        totalFrames: 130
    }
};

let currentJewelleryKey = 'jhumka';
let inspectorInstance = null;

function initThreeJSShowcase() {
    const canvas = document.getElementById('jhumka-canvas');
    const section = document.getElementById('3d-showcase');
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    let images = [];
    let sequenceState = { frame: 0 };
    let currentFrameIndex = 0;
    let scrollTriggerTween = null;
    let renderFrameReq = null;

    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const container = canvas.parentElement || section;
        const rect = container.getBoundingClientRect();
        
        const displayWidth = rect.width || window.innerWidth;
        const displayHeight = rect.height || window.innerHeight;

        canvas.width = Math.floor(displayWidth * dpr);
        canvas.height = Math.floor(displayHeight * dpr);
        canvas.style.width = displayWidth + 'px';
        canvas.style.height = displayHeight + 'px';

        renderFrame(currentFrameIndex);
    }

    function renderFrame(index) {
        if (!images.length || !canvas.width || !canvas.height) return;

        const safeIndex = Math.max(0, Math.min(images.length - 1, Math.floor(index)));
        const img = images[safeIndex];
        if (!img || !img.complete || !img.naturalWidth) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.naturalWidth / img.naturalHeight;
        
        let scaleFactor = 0.82;
        if (window.innerWidth < 640) {
            scaleFactor = 0.78;
        }

        let drawWidth, drawHeight;
        if (canvasAspect > imgAspect) {
            drawHeight = canvas.height * scaleFactor;
            drawWidth = drawHeight * imgAspect;
        } else {
            drawWidth = canvas.width * scaleFactor;
            drawHeight = drawWidth / imgAspect;
        }

        const x = (canvas.width - drawWidth) / 2;
        const y = (canvas.height - drawHeight) / 2;

        ctx.drawImage(img, x, y, drawWidth, drawHeight);
    }

    function setupScrollTrigger() {
        if (scrollTriggerTween) {
            if (scrollTriggerTween.scrollTrigger) {
                scrollTriggerTween.scrollTrigger.kill();
            }
            scrollTriggerTween.kill();
            scrollTriggerTween = null;
        }

        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            return;
        }

        sequenceState.frame = 0;
        currentFrameIndex = 0;

        scrollTriggerTween = gsap.to(sequenceState, {
            frame: images.length - 1,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=200",
                pin: true,
                pinSpacing: true,
                scrub: true,
                onUpdate: () => {
                    const targetIdx = Math.round(sequenceState.frame);
                    if (targetIdx !== currentFrameIndex) {
                        currentFrameIndex = targetIdx;
                        if (!renderFrameReq) {
                            renderFrameReq = requestAnimationFrame(() => {
                                renderFrame(currentFrameIndex);
                                renderFrameReq = null;
                            });
                        }
                    }
                },
                onRefresh: () => {
                    renderFrame(currentFrameIndex);
                }
            }
        });
    }

    function loadSequence(folder, fallbackFolder = '3D_rotating_gold_Jhumka_202608021234_frames', maxFrameCount = 141) {
        images = [];
        const paths = [];

        for (let i = 1; i <= maxFrameCount; i++) {
            if (folder === '3D_rotating_gold_Jhumka_202608021234_frames' && i === 117) {
                continue;
            }
            const frameNum = String(i).padStart(3, '0');
            paths.push(`${folder}/frame_${frameNum}.jpg`);
        }

        let loadedCount = 0;
        const total = paths.length;

        paths.forEach((src, idx) => {
            const img = new Image();
            img.src = src;

            img.onload = () => {
                loadedCount++;
                if (idx === 0 || loadedCount === 1) {
                    renderFrame(0);
                }
                if (loadedCount === total) {
                    resizeCanvas();
                    setupScrollTrigger();
                }
            };

            img.onerror = () => {
                if (folder !== fallbackFolder) {
                    console.warn(`Frame path ${src} failed, falling back to ${fallbackFolder}`);
                    loadSequence(fallbackFolder, fallbackFolder, 141);
                } else {
                    loadedCount++;
                    if (loadedCount === total) {
                        resizeCanvas();
                        setupScrollTrigger();
                    }
                }
            };

            images.push(img);
        });
    }

    // Material control toast triggers
    document.getElementById('btn-material-gold')?.addEventListener('click', () => {
        showToast('Viewing 22K Royal Yellow Gold Finish');
    });
    document.getElementById('btn-material-rose')?.addEventListener('click', () => {
        showToast('Viewing Rose Gold Finish');
    });
    document.getElementById('btn-material-platinum')?.addEventListener('click', () => {
        showToast('Viewing Platinum Accent Finish');
    });

    window.addEventListener('resize', () => {
        resizeCanvas();
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });

    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            resizeCanvas();
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 200);
    });

    loadSequence('3D_rotating_gold_Jhumka_202608021234_frames', '3D_rotating_gold_Jhumka_202608021234_frames', 141);
    resizeCanvas();

    inspectorInstance = {
        loadSequence: (itemKey) => {
            const config = JEWELLERY_3D_CONFIGS[itemKey] || JEWELLERY_3D_CONFIGS['jhumka'];
            currentJewelleryKey = itemKey;

            const titleEl = document.getElementById('inspector-title');
            const subEl = document.getElementById('inspector-subtitle');
            if (titleEl) titleEl.innerText = config.title;
            if (subEl) subEl.innerText = config.subtitle;

            loadSequence(config.folder, config.fallbackFolder || '3D_rotating_gold_Jhumka_202608021234_frames', config.totalFrames || 141);
        },
        refresh: () => {
            resizeCanvas();
            renderFrame(currentFrameIndex);
        }
    };
}

function selectFeaturedJewellery(key) {
    if (inspectorInstance && inspectorInstance.loadSequence) {
        inspectorInstance.loadSequence(key);
    }
    const section = document.getElementById('3d-showcase');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    const config = JEWELLERY_3D_CONFIGS[key];
    if (config) {
        showToast(`Loading 3D Inspector: ${config.title}`);
    }
}

/* --- 5. Collections & Audience Category Filtering --- */
let activeAudience = 'all';
let activeCategory = 'all';

function initFilterTabs() {
    const audienceBtns = document.querySelectorAll('.audience-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');

    audienceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            activeAudience = btn.getAttribute('data-audience');
            updateAudienceBtnsUI();
            applyCombinedFilters();
        });
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            activeCategory = btn.getAttribute('data-filter');
            updateCategoryBtnsUI();
            applyCombinedFilters();
        });
    });
}

function updateAudienceBtnsUI() {
    document.querySelectorAll('.audience-btn').forEach(b => {
        if (b.getAttribute('data-audience') === activeAudience) {
            b.classList.add('active', 'bg-primary', 'text-on-primary');
            b.classList.remove('text-on-surface-variant');
        } else {
            b.classList.remove('active', 'bg-primary', 'text-on-primary');
            b.classList.add('text-on-surface-variant');
        }
    });
}

function updateCategoryBtnsUI() {
    document.querySelectorAll('.filter-btn').forEach(b => {
        if (b.getAttribute('data-filter') === activeCategory) {
            b.classList.add('active', 'border-primary', 'text-primary');
            b.classList.remove('border-outline-variant', 'text-on-surface-variant');
        } else {
            b.classList.remove('active', 'border-primary', 'text-primary');
            b.classList.add('border-outline-variant', 'text-on-surface-variant');
        }
    });
}

function filterByAudience(audience) {
    activeAudience = audience;
    updateAudienceBtnsUI();
    applyCombinedFilters();

    const target = document.getElementById('jewelry-section-target');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

function applyCombinedFilters() {
    const items = document.querySelectorAll('.product-item');
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            const itemAudience = item.getAttribute('data-audience');
            const itemCategory = item.getAttribute('data-category');

            const matchAudience = (activeAudience === 'all' || itemAudience === activeAudience);
            const matchCategory = (activeCategory === 'all' || itemCategory === activeCategory);

            if (matchAudience && matchCategory) {
                item.style.display = 'flex';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.display = 'none';
            }
        }, 200);
    });
}

/* --- 6. Drawers, Modals & Dynamic E-Commerce Logic --- */
function initDrawersAndModals() {
    // Cart Drawer
    const cartDrawer = document.getElementById('cart-drawer');
    document.getElementById('btn-cart-toggle')?.addEventListener('click', () => {
        cartDrawer.classList.add('drawer-open');
    });
    document.getElementById('btn-cart-close')?.addEventListener('click', () => {
        cartDrawer.classList.remove('drawer-open');
    });
    document.getElementById('cart-backdrop')?.addEventListener('click', () => {
        cartDrawer.classList.remove('drawer-open');
    });

    // Wishlist Drawer
    const wishlistDrawer = document.getElementById('wishlist-drawer');
    document.getElementById('btn-wishlist-toggle')?.addEventListener('click', () => {
        wishlistDrawer.classList.add('drawer-open');
    });
    document.getElementById('btn-wishlist-close')?.addEventListener('click', () => {
        wishlistDrawer.classList.remove('drawer-open');
    });
    document.getElementById('wishlist-backdrop')?.addEventListener('click', () => {
        wishlistDrawer.classList.remove('drawer-open');
    });

    // QuickView Modal Close
    const qvModal = document.getElementById('quickview-modal');
    document.getElementById('btn-quickview-close')?.addEventListener('click', () => {
        qvModal.classList.remove('modal-open');
    });
    document.getElementById('quickview-backdrop')?.addEventListener('click', () => {
        qvModal.classList.remove('modal-open');
    });

    // Appointment Modal
    const aptModal = document.getElementById('appointment-modal');
    const openAptBtns = [document.getElementById('btn-open-appointment'), document.getElementById('btn-bridal-consult')];
    openAptBtns.forEach(b => {
        b?.addEventListener('click', () => {
            aptModal.classList.add('modal-open');
        });
    });
    document.getElementById('btn-appointment-close')?.addEventListener('click', () => {
        aptModal.classList.remove('modal-open');
    });
    document.getElementById('appointment-backdrop')?.addEventListener('click', () => {
        aptModal.classList.remove('modal-open');
    });

    // Appointment Form Submit
    document.getElementById('appointment-form')?.addEventListener('submit', handleAppointmentSubmit);

    // Newsletter Form Submit
    document.getElementById('newsletter-form')?.addEventListener('submit', handleNewsletterSubmit);

    // Auth Forms Submit
    document.getElementById('auth-login-form')?.addEventListener('submit', handleAuthLogin);
    document.getElementById('auth-register-form')?.addEventListener('submit', handleAuthRegister);
}

function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

function openAppointmentModal() {
    const aptModal = document.getElementById('appointment-modal');
    if (aptModal) {
        aptModal.classList.add('modal-open');
    }
}

function openPamphletModal() {
    const pModal = document.getElementById('pamphlet-modal');
    if (pModal) {
        pModal.classList.add('modal-open');
    }
}

function closePamphletModal() {
    const pModal = document.getElementById('pamphlet-modal');
    if (pModal) {
        pModal.classList.remove('modal-open');
    }
}

/* --- Cart & Wishlist Helper Functions --- */
function addToCart(title, price, image) {
    const existing = cart.find(item => item.title === title);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ title, price, image, qty: 1 });
    }
    updateCartUI();
    showToast(`Added ${title} to Shopping Bag`);
}

function removeFromCart(title) {
    cart = cart.filter(item => item.title !== title);
    updateCartUI();
}

function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');

    try {
        localStorage.setItem('va_cart', JSON.stringify(cart));
    } catch (e) {
        console.warn('LocalStorage save error:', e);
    }
    syncUserDataWithSupabase();

    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    if (totalCount > 0) {
        if (badge) {
            badge.innerText = totalCount;
            badge.classList.remove('opacity-0');
        }
    } else {
        if (badge) badge.classList.add('opacity-0');
    }

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p class="text-xs text-on-surface-variant text-center py-8">Your shopping bag is currently empty.</p>';
        if (subtotalEl) subtotalEl.innerText = '₹0';
        return;
    }

    let subtotal = 0;
    container.innerHTML = cart.map(item => {
        const numPrice = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
        subtotal += numPrice * item.qty;
        const safeTitle = item.title.replace(/'/g, "\\'");
        return `
            <div class="flex items-center gap-4 border-b border-outline-variant/20 pb-3">
                <img src="${item.image}" alt="${item.title}" class="w-14 h-14 object-cover rounded border border-primary/20">
                <div class="flex-grow">
                    <h4 class="text-xs font-semibold text-on-surface mb-1">${item.title}</h4>
                    <span class="text-xs text-primary font-bold">${item.price} x ${item.qty}</span>
                </div>
                <button onclick="removeFromCart('${safeTitle}')" aria-label="Remove item" class="text-on-surface-variant hover:text-error transition-colors p-1">
                    <span class="material-symbols-outlined text-sm">delete</span>
                </button>
            </div>
        `;
    }).join('');

    if (subtotalEl) subtotalEl.innerText = `₹${subtotal.toLocaleString('en-IN')}`;
}

function toggleWishlist(title, price, image) {
    const index = wishlist.findIndex(item => item.title === title);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast(`Removed from Wishlist`);
    } else {
        wishlist.push({ title, price, image });
        showToast(`Added ${title} to Wishlist`);
    }
    updateWishlistUI();
}

function updateWishlistUI() {
    const badge = document.getElementById('wishlist-badge');
    const container = document.getElementById('wishlist-items-container');

    try {
        localStorage.setItem('va_wishlist', JSON.stringify(wishlist));
    } catch (e) {
        console.warn('LocalStorage save error:', e);
    }
    syncUserDataWithSupabase();

    if (wishlist.length > 0) {
        if (badge) {
            badge.innerText = wishlist.length;
            badge.classList.remove('opacity-0');
        }
    } else {
        if (badge) badge.classList.add('opacity-0');
    }

    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = '<p class="text-xs text-on-surface-variant text-center py-8">Your wishlist is currently empty.</p>';
        return;
    }

    container.innerHTML = wishlist.map(item => {
        const safeTitle = item.title.replace(/'/g, "\\'");
        const safePrice = item.price.replace(/'/g, "\\'");
        const safeImage = item.image.replace(/'/g, "\\'");
        return `
        <div class="flex items-center gap-4 border-b border-outline-variant/20 pb-3">
            <img src="${item.image}" alt="${item.title}" class="w-14 h-14 object-cover rounded border border-primary/20">
            <div class="flex-grow">
                <h4 class="text-xs font-semibold text-on-surface mb-1">${item.title}</h4>
                <span class="text-xs text-primary font-bold">${item.price}</span>
            </div>
            <button onclick="addToCart('${safeTitle}', '${safePrice}', '${safeImage}')" class="px-2 py-1 bg-primary text-on-primary text-[10px] uppercase font-semibold hover:bg-primary-fixed transition-colors rounded">
                Move to Bag
            </button>
        </div>
    `;
    }).join('');
}

function openQuickView(title, desc, price, image) {
    const qvTitle = document.getElementById('qv-title');
    const qvDesc = document.getElementById('qv-desc');
    const qvPrice = document.getElementById('qv-price');
    const qvImage = document.getElementById('qv-image');
    if (qvTitle) qvTitle.innerText = title;
    if (qvDesc) qvDesc.innerText = desc;
    if (qvPrice) qvPrice.innerText = price;
    if (qvImage) qvImage.src = image;

    const addBtn = document.getElementById('qv-add-cart');
    if (addBtn) {
        addBtn.onclick = () => {
            addToCart(title, price, image);
            const modal = document.getElementById('quickview-modal');
            if (modal) modal.classList.remove('modal-open');
        };
    }

    const modal = document.getElementById('quickview-modal');
    if (modal) modal.classList.add('modal-open');
}

/* --- Keyboard Shortcuts & Accessibility --- */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.drawer-open, .modal-open').forEach(el => {
                el.classList.remove('drawer-open', 'modal-open');
            });
        }
    });
}

/* --- Mobile Bottom Nav Active Link Observer --- */
function initMobileNavScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navbar a.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active', 'text-primary');
            link.classList.add('text-on-surface-variant');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active', 'text-primary');
                link.classList.remove('text-on-surface-variant');
            }
        });
    });
}

/* --- Toast Notification Helper --- */
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.innerText = message;
    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    }, 3000);
}

function handleServiceClick(serviceName) {
    showToast(`${serviceName} information requested. Our concierge team is available 24/7.`);
}

/* --- Premium Scroll-Driven Background Animation Engine --- */
function initScrollBackgroundAnimation() {
    const canvas = document.getElementById('bg-scroll-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const totalFrames = 240;
    const folderPath = 'antigravity_scroll_frames_jpg';
    const images = new Array(totalFrames);
    const loadedFlags = new Array(totalFrames).fill(false);

    let currentFrameIndex = 0;
    let targetFrameIndex = 0;
    let renderRequested = false;

    function getFramePath(index) {
        const frameNum = String(index).padStart(4, '0');
        return `${folderPath}/frame_${frameNum}.jpg`;
    }

    function loadFrame(index, callback) {
        if (images[index]) {
            if (loadedFlags[index] && callback) callback();
            return;
        }
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
            loadedFlags[index] = true;
            images[index] = img;
            if (callback) callback();
            if (!renderRequested) {
                renderRequested = true;
                requestAnimationFrame(renderLoop);
            }
        };
        img.onerror = () => {
            loadedFlags[index] = false;
        };
        images[index] = img;
    }

    // Smart Priority Preloading
    function preloadFrames() {
        // Priority 1: First 15 frames
        for (let i = 0; i < Math.min(15, totalFrames); i++) {
            loadFrame(i, i === 0 ? () => renderFrame(0) : null);
        }
        // Priority 2: Milestone frames (every 10th frame)
        for (let i = 20; i < totalFrames; i += 10) {
            loadFrame(i);
        }
        // Priority 3: Progressive idle load remaining frames
        let nextIndex = 0;
        function loadNextChunk() {
            let loadedInChunk = 0;
            while (nextIndex < totalFrames && loadedInChunk < 8) {
                if (!images[nextIndex]) {
                    loadFrame(nextIndex);
                    loadedInChunk++;
                }
                nextIndex++;
            }
            if (nextIndex < totalFrames) {
                if ('requestIdleCallback' in window) {
                    requestIdleCallback(loadNextChunk, { timeout: 1000 });
                } else {
                    setTimeout(loadNextChunk, 40);
                }
            }
        }
        setTimeout(loadNextChunk, 100);
    }

    function findClosestLoadedFrame(targetIdx) {
        const rounded = Math.min(totalFrames - 1, Math.max(0, Math.round(targetIdx)));
        if (loadedFlags[rounded] && images[rounded]) return rounded;

        // Search outwards for nearest loaded frame
        for (let offset = 1; offset < totalFrames; offset++) {
            const prev = rounded - offset;
            if (prev >= 0 && loadedFlags[prev] && images[prev]) return prev;
            const next = rounded + offset;
            if (next < totalFrames && loadedFlags[next] && images[next]) return next;
        }
        return rounded;
    }

    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        renderFrame(currentFrameIndex);
    }

    function renderFrame(index) {
        if (!canvas.width || !canvas.height) return;
        const validIdx = findClosestLoadedFrame(index);
        const img = images[validIdx];
        if (!img || !loadedFlags[validIdx] || !img.naturalWidth) return;

        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.naturalWidth / img.naturalHeight;

        let drawWidth, drawHeight, offsetX, offsetY;
        if (canvasAspect > imgAspect) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgAspect;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgAspect;
            drawHeight = canvas.height;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        // Subtle dark vignette overlay for high contrast typography
        ctx.fillStyle = 'rgba(10, 10, 10, 0.40)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function calculateTargetFrame() {
        const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) return 0;
        const scrollFraction = Math.min(1, Math.max(0, scrollTop / scrollHeight));
        return scrollFraction * (totalFrames - 1);
    }

    function renderLoop() {
        targetFrameIndex = calculateTargetFrame();

        // Smooth frame lerping for cinematic transitions
        const diff = targetFrameIndex - currentFrameIndex;
        if (Math.abs(diff) > 0.001) {
            currentFrameIndex += diff * 0.25;
            renderFrame(currentFrameIndex);
            renderRequested = true;
            requestAnimationFrame(renderLoop);
        } else {
            currentFrameIndex = targetFrameIndex;
            renderFrame(currentFrameIndex);
            renderRequested = false;
        }
    }

    function onScroll() {
        if (!renderRequested) {
            renderRequested = true;
            requestAnimationFrame(renderLoop);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', () => setTimeout(resizeCanvas, 200));

    preloadFrames();
    resizeCanvas();
}

/* --- Supabase Integration & Authentication --- */
const SUPABASE_URL = 'https://xqbkaqxnbyquuyggmvha.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_OLWCrNM89g_RYYAoiBAqjA_Md6mKka4';

let supabaseClient = null;
let currentUser = null;

function initSupabase() {
    if (window.supabase && window.supabase.createClient) {
        try {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase initialized with URL:', SUPABASE_URL);

            supabaseClient.auth.getSession().then(({ data: { session } }) => {
                handleAuthState(session ? session.user : null);
            }).catch(err => console.warn('Supabase getSession error:', err));

            supabaseClient.auth.onAuthStateChange((event, session) => {
                handleAuthState(session ? session.user : null);
            });
        } catch (err) {
            console.error('Supabase initialization error:', err);
        }
    } else {
        console.warn('Supabase SDK not loaded.');
    }
}

async function handleAuthState(user) {
    currentUser = user;
    const navText = document.getElementById('auth-nav-text');
    const mobileText = document.getElementById('auth-mobile-text');
    const unauthContainer = document.getElementById('auth-unauth-container');
    const userContainer = document.getElementById('auth-user-container');
    const userEmailEl = document.getElementById('auth-user-email');
    const userNameEl = document.getElementById('auth-user-name');

    if (user) {
        const displayName = user.user_metadata?.full_name || user.email.split('@')[0];
        if (navText) navText.textContent = displayName;
        if (mobileText) mobileText.textContent = displayName;

        if (unauthContainer) unauthContainer.classList.add('hidden');
        if (userContainer) userContainer.classList.remove('hidden');
        if (userEmailEl) userEmailEl.textContent = user.email;
        if (userNameEl) userNameEl.textContent = displayName ? `Welcome, ${displayName}` : '';

        // Pre-fill consultation fields
        const aptName = document.getElementById('apt-name');
        if (aptName && !aptName.value && user.user_metadata?.full_name) {
            aptName.value = user.user_metadata.full_name;
        }

        const profPhone = document.getElementById('prof-phone');
        if (profPhone && user.user_metadata?.phone) {
            profPhone.value = user.user_metadata.phone;
        }

        const profAddress = document.getElementById('prof-address');
        if (profAddress && user.user_metadata?.address) {
            profAddress.value = user.user_metadata.address;
        }

        // Restore saved cart and wishlist from user metadata if local is empty
        if (user.user_metadata?.cart && Array.isArray(user.user_metadata.cart) && cart.length === 0) {
            cart = user.user_metadata.cart;
            updateCartUI();
        }
        if (user.user_metadata?.wishlist && Array.isArray(user.user_metadata.wishlist) && wishlist.length === 0) {
            wishlist = user.user_metadata.wishlist;
            updateWishlistUI();
        }

        // Load user's orders
        loadUserOrders();
    } else {
        if (navText) navText.textContent = 'Sign In';
        if (mobileText) mobileText.textContent = 'Account';

        if (unauthContainer) unauthContainer.classList.remove('hidden');
        if (userContainer) userContainer.classList.add('hidden');
    }
}

async function syncUserDataWithSupabase() {
    const cartCountEl = document.getElementById('profile-saved-cart-count');
    const wishlistCountEl = document.getElementById('profile-saved-wishlist-count');
    if (cartCountEl) cartCountEl.textContent = `${cart.length} item(s) in bag`;
    if (wishlistCountEl) wishlistCountEl.textContent = `${wishlist.length} item(s) saved`;

    if (!supabaseClient || !currentUser) return;
    try {
        await supabaseClient.auth.updateUser({
            data: { cart: cart, wishlist: wishlist }
        });
    } catch (err) {
        console.warn('Sync user data warning:', err);
    }
}

function openAuthModal(defaultTab) {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('modal-open');
    if (defaultTab && currentUser) {
        switchProfileTab(defaultTab);
    }
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('modal-open');
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('auth-login-form');
    const registerForm = document.getElementById('auth-register-form');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const title = document.getElementById('auth-modal-title');

    if (tab === 'login') {
        loginForm?.classList.remove('hidden');
        registerForm?.classList.add('hidden');
        tabLogin?.classList.add('text-primary', 'border-b-2', 'border-primary');
        tabLogin?.classList.remove('text-on-surface-variant');
        tabRegister?.classList.remove('text-primary', 'border-b-2', 'border-primary');
        tabRegister?.classList.add('text-on-surface-variant');
        if (title) title.textContent = 'Client Portal Login';
    } else {
        loginForm?.classList.add('hidden');
        registerForm?.classList.remove('hidden');
        tabRegister?.classList.add('text-primary', 'border-b-2', 'border-primary');
        tabRegister?.classList.remove('text-on-surface-variant');
        tabLogin?.classList.remove('text-primary', 'border-b-2', 'border-primary');
        tabLogin?.classList.add('text-on-surface-variant');
        if (title) title.textContent = 'Join Royal Privilege Club';
    }
}

function switchProfileTab(tab) {
    const viewOrders = document.getElementById('profile-view-orders');
    const viewSaved = document.getElementById('profile-view-saved');
    const viewAddress = document.getElementById('profile-view-address');

    const tabOrders = document.getElementById('profile-tab-orders');
    const tabSaved = document.getElementById('profile-tab-saved');
    const tabAddress = document.getElementById('profile-tab-address');

    [viewOrders, viewSaved, viewAddress].forEach(v => v?.classList.add('hidden'));
    [tabOrders, tabSaved, tabAddress].forEach(t => {
        t?.classList.remove('text-primary', 'border-b-2', 'border-primary');
        t?.classList.add('text-on-surface-variant');
    });

    if (tab === 'orders') {
        viewOrders?.classList.remove('hidden');
        tabOrders?.classList.add('text-primary', 'border-b-2', 'border-primary');
        tabOrders?.classList.remove('text-on-surface-variant');
        loadUserOrders();
    } else if (tab === 'saved') {
        viewSaved?.classList.remove('hidden');
        tabSaved?.classList.add('text-primary', 'border-b-2', 'border-primary');
        tabSaved?.classList.remove('text-on-surface-variant');
    } else if (tab === 'address') {
        viewAddress?.classList.remove('hidden');
        tabAddress?.classList.add('text-primary', 'border-b-2', 'border-primary');
        tabAddress?.classList.remove('text-on-surface-variant');
    }
}

async function handleSaveAddress(e) {
    e.preventDefault();
    const phone = document.getElementById('prof-phone')?.value.trim();
    const address = document.getElementById('prof-address')?.value.trim();

    if (supabaseClient && currentUser) {
        const { error } = await supabaseClient.auth.updateUser({
            data: { phone, address }
        });
        if (error) {
            showToast(`Address update error: ${error.message}`);
        } else {
            showToast('✅ Delivery address saved to your profile!');
        }
    } else {
        localStorage.setItem('va_user_address', JSON.stringify({ phone, address }));
        showToast('✅ Delivery address saved locally!');
    }
}

async function loadUserOrders() {
    const listEl = document.getElementById('profile-orders-list');
    const emptyEl = document.getElementById('profile-orders-empty');

    let orders = [];

    if (supabaseClient && currentUser) {
        try {
            const { data, error } = await supabaseClient
                .from('orders')
                .select('*')
                .eq('user_id', currentUser.id)
                .order('created_at', { ascending: false });
            
            if (!error && data && data.length > 0) {
                orders = data;
            }
        } catch (err) {
            console.warn('Fetch Supabase orders notice:', err);
        }
    }

    if (orders.length === 0) {
        try {
            const savedLocal = localStorage.getItem('va_orders');
            if (savedLocal) orders = JSON.parse(savedLocal);
        } catch (e) {
            console.warn('Local orders read error:', e);
        }
    }

    if (!listEl) return;

    if (orders.length === 0) {
        if (emptyEl) emptyEl.classList.remove('hidden');
        listEl.innerHTML = '';
        return;
    }

    if (emptyEl) emptyEl.classList.add('hidden');

    listEl.innerHTML = orders.map(order => `
        <div class="p-3.5 bg-surface-container border border-primary/30 rounded-lg text-left text-xs space-y-2">
            <div class="flex justify-between items-center pb-2 border-b border-outline-variant/20">
                <span class="font-mono text-primary font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/20">${order.delivery_id || 'VA-DEL-000000'}</span>
                <span class="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">${order.status || 'Dispatched'}</span>
            </div>
            <div class="text-on-surface-variant space-y-1 text-[11px]">
                <p><strong>Payment:</strong> ${order.payment_method || 'UPI'} • <strong>Total:</strong> ₹${(order.subtotal || 0).toLocaleString('en-IN')}</p>
                <p class="truncate"><strong>Delivery to:</strong> ${order.delivery_address || 'Address provided'}</p>
                <p class="text-[10px] text-outline">Date: ${new Date(order.created_at || Date.now()).toLocaleDateString()}</p>
            </div>
        </div>
    `).join('');
}

async function handleAuthLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;

    if (!supabaseClient) {
        showToast('Supabase client is not ready');
        return;
    }

    const btn = document.getElementById('btn-login-submit');
    const originalContent = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="material-symbols-outlined animate-spin text-sm">progress_activity</span> Signing in...';
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalContent;
    }

    if (error) {
        showToast(`Login failed: ${error.message}`);
    } else {
        showToast(`Welcome back, ${data.user.email}!`);
        closeAuthModal();
    }
}

async function handleAuthRegister(e) {
    e.preventDefault();
    const name = document.getElementById('register-name')?.value.trim();
    const email = document.getElementById('register-email')?.value.trim();
    const phone = document.getElementById('register-phone')?.value.trim();
    const state = document.getElementById('register-state')?.value;
    const city = document.getElementById('register-city')?.value;
    const password = document.getElementById('register-password')?.value;

    if (!name || !email || !phone || !state || !city || !password) {
        showToast('Please fill in all required registration fields.');
        return;
    }

    if (!supabaseClient) {
        showToast('Supabase client is not ready');
        return;
    }

    const btn = document.getElementById('btn-register-submit');
    const originalContent = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="material-symbols-outlined animate-spin text-sm">progress_activity</span> Registering Account...';
    }

    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                phone: phone,
                state: state,
                city: city,
                payment_status: 'Pending UPI Payment (8956419960@ibl)',
                registration_date: new Date().toISOString(),
                cart: cart,
                wishlist: wishlist
            }
        }
    });

    if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalContent;
    }

    if (error) {
        if (error.message.includes('already registered') || error.message.includes('unique constraint') || error.status === 422) {
            showToast('⚠️ An account with this email already exists! Please Sign In.');
            switchAuthTab('login');
            const loginEmailInput = document.getElementById('login-email');
            if (loginEmailInput) loginEmailInput.value = email;
        } else {
            showToast(`Registration failed: ${error.message}`);
        }
        return;
    }

    // Insert into Supabase registrations table
    if (data.user) {
        try {
            await supabaseClient.from('registrations').insert([
                {
                    user_id: data.user.id,
                    full_name: name,
                    email: email,
                    phone: phone,
                    state: state,
                    city: city,
                    payment_status: 'Pending UPI Payment',
                    created_at: new Date().toISOString()
                }
            ]);
        } catch (err) {
            console.warn('Registrations table insert notice:', err);
        }
    }

    showToast('✨ Registration saved! Complete UPI payment to activate.');
    closeAuthModal();
    openUpiModal();
}

async function handleAuthLogout() {
    if (supabaseClient) {
        await supabaseClient.auth.signOut();
        showToast('Successfully signed out.');
        closeAuthModal();
    }
}

async function handleAppointmentSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('apt-name')?.value.trim();
    const phone = document.getElementById('apt-phone')?.value.trim();
    const contactPerson = document.getElementById('apt-contact-person')?.value;
    const preferredDate = document.getElementById('apt-date')?.value;
    const interest = document.getElementById('apt-interest')?.value;

    const btn = e.target.querySelector('button[type="submit"]');
    const originalContent = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="material-symbols-outlined animate-spin text-sm">progress_activity</span> Booking Consultation...';
    }

    let saveSuccess = false;
    let errorDetail = '';

    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('appointments').insert([
                {
                    full_name: name,
                    phone: phone,
                    contact_person: contactPerson,
                    preferred_date: preferredDate,
                    interest: interest,
                    user_id: currentUser ? currentUser.id : null,
                    created_at: new Date().toISOString()
                }
            ]);

            if (error) {
                console.error('Supabase Appointment Error:', error);
                errorDetail = error.message;
            } else {
                saveSuccess = true;
            }
        } catch (err) {
            console.error('Appointment submit exception:', err);
            errorDetail = err.message || 'Connection error';
        }
    }

    if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalContent;
    }

    const aptModal = document.getElementById('appointment-modal');
    if (aptModal) aptModal.classList.remove('modal-open');

    if (saveSuccess) {
        showToast('✨ Appointment booked & saved in Supabase! Our concierge will contact you shortly.');
    } else if (errorDetail) {
        showToast(`Request sent! (Note: ${errorDetail})`);
    } else {
        showToast('Appointment request received! Our concierge will contact you shortly.');
    }

    e.target.reset();
}

async function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('newsletter-email')?.value.trim();
    if (!email) return;

    let saveSuccess = false;
    if (supabaseClient) {
        try {
            const { error } = await supabaseClient.from('newsletter_subscribers').insert([
                { email: email, subscribed_at: new Date().toISOString() }
            ]);
            if (!error) saveSuccess = true;
        } catch (err) {
            console.warn('Newsletter error:', err);
        }
    }

    showToast(saveSuccess ? '✨ Email saved! Welcome to the Royal Privilege Club.' : 'Welcome to the Royal Privilege Club!');
    e.target.reset();
}

/* --- Checkout Modal & Order Delivery Functions --- */
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast('Your Shopping Bag is empty! Add items before checkout.');
        const cartDrawer = document.getElementById('cart-drawer');
        if (cartDrawer) cartDrawer.classList.add('modal-open');
        return;
    }

    const cartDrawer = document.getElementById('cart-drawer');
    if (cartDrawer) cartDrawer.classList.remove('modal-open');

    if (currentUser) {
        const nameInput = document.getElementById('chk-name');
        if (nameInput && currentUser.user_metadata?.full_name) {
            nameInput.value = currentUser.user_metadata.full_name;
        }

        const phoneInput = document.getElementById('chk-phone');
        if (phoneInput && currentUser.user_metadata?.phone) {
            phoneInput.value = currentUser.user_metadata.phone;
        }

        const addrInput = document.getElementById('chk-address');
        if (addrInput && currentUser.user_metadata?.address) {
            addrInput.value = currentUser.user_metadata.address;
        }
    }

    const total = cart.reduce((sum, item) => {
        const numPrice = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
        return sum + (numPrice * item.qty);
    }, 0);

    const priceEl = document.getElementById('chk-total-price');
    if (priceEl) priceEl.textContent = `₹${total.toLocaleString('en-IN')}`;

    const formContainer = document.getElementById('checkout-form-container');
    const successContainer = document.getElementById('checkout-success-container');
    if (formContainer) formContainer.classList.remove('hidden');
    if (successContainer) successContainer.classList.add('hidden');

    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.add('modal-open');
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.remove('modal-open');
}

async function handleCheckoutSubmit(e) {
    e.preventDefault();

    const recipientName = document.getElementById('chk-name')?.value.trim();
    const phone = document.getElementById('chk-phone')?.value.trim();
    const address = document.getElementById('chk-address')?.value.trim();
    const city = document.getElementById('chk-city')?.value.trim();
    const state = document.getElementById('chk-state')?.value.trim();
    const pincode = document.getElementById('chk-pincode')?.value.trim();

    const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value || 'UPI Instant Pay';

    const totalSubtotal = cart.reduce((sum, item) => {
        const numPrice = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
        return sum + (numPrice * item.qty);
    }, 0);

    // Unique Delivery Tracking ID
    const deliveryId = 'VA-DEL-' + Math.floor(100000 + Math.random() * 900000) + '-' + new Date().getFullYear();

    const orderData = {
        delivery_id: deliveryId,
        user_id: currentUser ? currentUser.id : null,
        user_email: currentUser ? currentUser.email : null,
        recipient_name: recipientName,
        phone: phone,
        delivery_address: `${address}, ${city}, ${state} - ${pincode}`,
        payment_method: paymentMethod,
        items: cart,
        subtotal: totalSubtotal,
        status: 'Confirmed - Insured Express Transit',
        created_at: new Date().toISOString()
    };

    const btn = document.getElementById('btn-place-order');
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="material-symbols-outlined animate-spin text-sm">progress_activity</span> Processing Order & Delivery ID...';
    }

    if (supabaseClient) {
        try {
            const { error } = await supabaseClient.from('orders').insert([orderData]);
            if (error) console.warn('Supabase order insert notice:', error.message);
        } catch (err) {
            console.warn('Order submission exception:', err);
        }
    }

    try {
        let localOrders = [];
        const saved = localStorage.getItem('va_orders');
        if (saved) localOrders = JSON.parse(saved);
        localOrders.unshift(orderData);
        localStorage.setItem('va_orders', JSON.stringify(localOrders));
    } catch (e) {
        console.warn('Local order storage warning:', e);
    }

    if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }

    const delIdEl = document.getElementById('success-delivery-id');
    const payStatusEl = document.getElementById('success-payment-status');
    if (delIdEl) delIdEl.textContent = deliveryId;
    if (payStatusEl) payStatusEl.textContent = `Confirmed (${paymentMethod})`;

    cart = [];
    updateCartUI();
    syncUserDataWithSupabase();

    const formContainer = document.getElementById('checkout-form-container');
    const successContainer = document.getElementById('checkout-success-container');
    if (formContainer) formContainer.classList.add('hidden');
    if (successContainer) successContainer.classList.remove('hidden');

    showToast(`🎉 Order Placed! Delivery Tracking ID: ${deliveryId}`);
}

/* --- State & City Selection Logic --- */
function initStatesDropdown() {
    const stateSelect = document.getElementById('register-state');
    if (!stateSelect || typeof INDIAN_STATES_AND_CITIES === 'undefined') return;

    stateSelect.innerHTML = '<option value="">Select State / UT</option>';
    Object.keys(INDIAN_STATES_AND_CITIES).sort().forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
}

function handleStateChange(selectedState) {
    const citySelect = document.getElementById('register-city');
    if (!citySelect) return;

    if (!selectedState || !INDIAN_STATES_AND_CITIES[selectedState]) {
        citySelect.innerHTML = '<option value="">Select City (Select State First)</option>';
        citySelect.disabled = true;
        return;
    }

    const cities = INDIAN_STATES_AND_CITIES[selectedState].sort();
    citySelect.innerHTML = '<option value="">Select City</option>';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });

    citySelect.disabled = false;
}

/* --- UPI Payment Modal & Verification Functions --- */
function openUpiModal() {
    const modal = document.getElementById('upi-modal');
    if (modal) modal.classList.add('modal-open');
}

function closeUpiModal() {
    const modal = document.getElementById('upi-modal');
    if (modal) modal.classList.remove('modal-open');
}

function copyUpiId() {
    const upiId = '8956419960@ibl';
    navigator.clipboard.writeText(upiId).then(() => {
        showToast('📋 UPI ID (8956419960@ibl) copied to clipboard!');
    }).catch(err => {
        showToast('UPI ID: 8956419960@ibl');
    });
}

async function handleUpiConfirmSubmit(e) {
    e.preventDefault();
    const utr = document.getElementById('upi-utr-input')?.value.trim();

    if (!utr || utr.length < 6) {
        showToast('Please enter a valid 12-digit UPI Ref No. / UTR.');
        return;
    }

    const btn = document.getElementById('btn-upi-confirm');
    const originalContent = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="material-symbols-outlined animate-spin text-sm">progress_activity</span> Submitting UTR Verification...';
    }

    const paymentStatus = `Verification Pending (UTR: ${utr})`;

    if (supabaseClient && currentUser) {
        try {
            await supabaseClient.auth.updateUser({
                data: { payment_status: paymentStatus, utr_number: utr }
            });
        } catch (err) {
            console.warn('Auth metadata update notice:', err);
        }

        try {
            await supabaseClient
                .from('registrations')
                .update({ payment_status: paymentStatus, utr_number: utr })
                .eq('user_id', currentUser.id);
        } catch (err) {
            console.warn('Registrations table update notice:', err);
        }
    }

    if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalContent;
    }

    showToast(`✅ Payment UTR (${utr}) submitted! Registration verification pending.`);
    closeUpiModal();
    openAuthModal('orders');
}

