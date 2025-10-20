const products = [
    {
        id: 1,
        name: "Fordive Shelby",
        price: 279000,
        description: "Wangi khas badboy yang dipadukan dengan kesan bunga yang elegan",
        category: "Men",
        size: "100ml",
        image: "https://fordive.id/wp-content/uploads/2025/05/ganteng-5.jpg"
    },
    {
        id: 2,
        name: "HMNS Farhampton",
        price: 369000,
        description: "Bergamot yang memberikan nuansa cerah dan menyegarkan seperti sinar matahari pagi.",
        category: "Men",
        size: "100ml",
        image: "https://madeforhmns.com/cdn/shop/files/Farhampton-2_b34f5a74-225a-48a7-8a4f-767e230cbd09.png?v=1739790947"
    },
    {
        id: 3,
        name: "Project 1975 Sunset in Sumba",
        price: 305000,
        description: "Seakan berjalan di tepi pantai Sumba saat senja, dengan aroma Lavender yang menenangkan.",
        category: "Unisex",
        size: "100ml",
        image: "https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/3_%2812%29.png"
    },
    {
        id: 4,
        name: "Armaf Club de Nuit Intense",
        price: 1050000,
        description: "Aroma yang maskulin dan kuar dari lemon, blackcurrant, dan apel yang membuat pria percaya diri",
        category: "Men",
        size: "200ml",
        image: "https://www.myperfumeshop.ae/cdn/shop/articles/armaf-club-de-nuit-intense-edt-vs-pure-parfum-675901.jpg?v=1725513220&width=2048"
    },
    {
        id: 5,
        name: "LAYR Rose D'Amour",
        price: 349000,
        description: "Mawar Bulgaria, vanilla Bali, dan musk krim, menciptakan wangi yang meninggalkan kesan penuh kasih. ",
        category: "Women",
        size: "50ml",
        image: "https://d2kchovjbwl1tk.cloudfront.net/vendor/9962/product/mini_magick20250621-40294-9i9glg_1750492276436_resized2048-jpg.webp"
    },
    {
        id: 6,
        name: "Alchemist Got My Mojo Back",
        price: 249000,
        description: "Elegan dan adiktif – perpaduan sempurna aroma manis, white florals, dan kayu-kayuan.",
        category: "Unisex",
        size: "50ml",
        image: "https://down-id.img.susercontent.com/file/id-11134207-7r98v-lnl4cm2n5g5d87.webp"
    },
    {
        id: 7,
        name: "Afnan Supremacy Silver ",
        price: 499000,
        description: "Parfum ini memiliki pembukaan segar dan cerah dari nanas dan apel, diikuti aroma inti yang elegan dari patchouli",
        category: "Men",
        size: "150ml",
        image: "https://munacosmetics.com/image/cache/catalog/Eau%20De%20Parfum/Afnan-Supremacy-Pour-Homme-Edp-800x800.jpg"
    },
    {
        id: 8,
        name: "VOIE Mistinguett",
        price: 220000,
        description: "Menghadirkan kesan seperti berada di Paris saat musim semi: cerah, manis dan tak terlupakan.",
        category: "Women",
        size: "50ml",
        image: "https://d2kchovjbwl1tk.cloudfront.net/vendor/9962/product/styled_Mistinguett_1757905515197_resized2048-png.webp"
    }
];

let cart = [];
let currentFilter = 'All';

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function displayProducts(filter = 'All') {
    currentFilter = filter;
    const container = document.getElementById('productsContainer');
    const filteredProducts = filter === 'All' 
        ? products 
        : products.filter(p => p.category === filter);
    
    container.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-4 col-sm-6';
        col.innerHTML = `
            <div class="product-card">
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-size">${product.size}</p>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">${formatPrice(product.price)}</span>
                    </div>
                    <button class="btn-add-cart w-100 mt-2" onclick="addToCart(${product.id})">
                        🛒 Add to Cart
                    </button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function filterProducts(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === category) {
            btn.classList.add('active');
        }
    });
    
    displayProducts(category);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    showNotification(`${product.name} ditambahkan ke keranjang!`);
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (sidebar.classList.contains('active')) {
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const emptyCart = document.getElementById('emptyCart');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.style.display = 'none';
        cartFooter.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        cartItems.style.display = 'block';
        cartFooter.style.display = 'block';
        
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-size">${item.size}</p>
                    <p class="cart-item-price">${formatPrice(item.price)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('totalPrice').textContent = formatPrice(total);
    }
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            saveCart();
            updateCartCount();
            updateCartDisplay();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

function showCheckout() {
    if (cart.length === 0) {
        showNotification('Keranjang Anda kosong!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderSummary = document.getElementById('orderSummary');
    
    orderSummary.innerHTML = `
        <h4>Ringkasan Pesanan</h4>
        <div class="checkout-items" style="background: #f8f8f8; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            ${cart.map(item => `
                <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; color: #666;">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>${formatPrice(item.price * item.quantity)}</span>
                </div>
            `).join('')}
        </div>
        <div style="display: flex; justify-content: space-between; padding: 1rem; background: #f8f8f8; border-radius: 8px; font-size: 1.2rem; font-weight: bold; color: #1a1a1a; margin-bottom: 1.5rem;">
            <strong>Total:</strong>
            <strong style="color: #D4AF37;">${formatPrice(total)}</strong>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    modal.show();
    toggleCart();
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    console.log('Contact form submitted:', { name, email, phone, message });
    
    document.getElementById('formSuccess').style.display = 'block';
    this.reset();
    
    setTimeout(() => {
        document.getElementById('formSuccess').style.display = 'none';
    }, 3000);
});

document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const orderData = {
        customer: {
            name: document.getElementById('checkoutName').value,
            email: document.getElementById('checkoutEmail').value,
            phone: document.getElementById('checkoutPhone').value,
            address: document.getElementById('checkoutAddress').value,
            city: document.getElementById('checkoutCity').value,
            postalCode: document.getElementById('checkoutPostal').value
        },
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    console.log('Order placed:', orderData);
    
    showNotification('Pesanan berhasil! Kami akan menghubungi Anda segera.');
    
    cart = [];
    saveCart();
    updateCartCount();
    
    bootstrap.Modal.getInstance(document.getElementById('checkoutModal')).hide();
    
    this.reset();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                bootstrap.Collapse.getInstance(navbarCollapse).hide();
            }
        }
    });
});

window.addEventListener('DOMContentLoaded', function() {
    loadCart();
    displayProducts();
    console.log('Scentja Perfume website initialized!');
});