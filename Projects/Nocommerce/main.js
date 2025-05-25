const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        category: "Electronics",
        rating: 4.5
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        category: "Electronics",
        rating: 4.2
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        category: "Sports",
        rating: 4.7
    },
    {
        id: 4,
        name: "Cotton T-Shirt",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        category: "Clothing",
        rating: 4.0
    },
    {
        id: 5,
        name: "Coffee Maker",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1556911463-12d8df5c611f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        category: "Home",
        rating: 4.3
    },
    {
        id: 6,
        name: "Backpack",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64e30d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja3BhY2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        category: "Accessories",
        rating: 4.6
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        category: "Electronics",
        rating: 4.4
    },
    {
        id: 8,
        name: "Yoga Mat",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        category: "Sports",
        rating: 4.1
    }
];

// Shopping cart data
let cart = [];

// DOM elements
const productsContainer = document.getElementById('products-container');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart-message');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Render products
function renderProducts() {
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg overflow-hidden shadow-md transition duration-300';
        productCard.innerHTML = `
            <div class="h-48 overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-medium text-lg">${product.name}</h3>
                    <span class="text-blue-600 font-bold">$${product.price.toFixed(2)}</span>
                </div>
                <div class="flex items-center mb-3">
                    ${renderRatingStars(product.rating)}
                    <span class="text-gray-500 text-sm ml-2">${product.rating}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-500 text-sm">${product.category}</span>
                    <button class="add-to-cart bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition duration-300" data-id="${product.id}">
                        <i class="fas fa-cart-plus mr-1"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Render rating stars
function renderRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star text-yellow-400"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star text-yellow-400"></i>';
    }
    
    return stars;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center animate-fade-in';
    notification.innerHTML = `
        <i class="fas fa-check-circle mr-2"></i>
        <span>${product.name} added to cart</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('animate-fade-in');
        notification.classList.add('animate-fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
    
    // Add animation classes
    setTimeout(() => {
        notification.classList.add('animate-fade-in');
    }, 10);
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update product quantity in cart
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        updateCart();
    }
}

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        cartSubtotal.textContent = '$0.00';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    emptyCartMessage.classList.add('hidden');
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item-enter flex items-center py-3 border-b';
        cartItem.innerHTML = `
            <div class="w-16 h-16 overflow-hidden rounded-md mr-3">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
            </div>
            <div class="flex-grow">
                <h4 class="font-medium">${item.name}</h4>
                <div class="flex justify-between items-center mt-1">
                    <div class="flex items-center">
                        <button class="quantity-btn bg-gray-200 px-2 rounded-l-md" data-id="${item.id}" data-action="decrease">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="w-12 text-center border-t border-b border-gray-200">
                        <button class="quantity-btn bg-gray-200 px-2 rounded-r-md" data-id="${item.id}" data-action="increase">+</button>
                    </div>
                    <span class="font-medium">$${itemTotal.toFixed(2)}</span>
                </div>
            </div>
            <button class="remove-item ml-3 text-gray-500 hover:text-red-500" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </button>
        `;
        cartItemsContainer.appendChild(cartItem);
        
        // Add animation class after a small delay
        setTimeout(() => {
            cartItem.classList.add('cart-item-enter-active');
        }, 10);
    });
    
    // Update totals
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(button.getAttribute('data-id'));
            const action = button.getAttribute('data-action');
            const input = button.parentElement.querySelector('input');
            let quantity = parseInt(input.value);
            
            if (action === 'increase') {
                quantity += 1;
            } else {
                quantity -= 1;
            }
            
            updateQuantity(productId, quantity);
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(button.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
    
    // Add event listeners to quantity inputs
    document.querySelectorAll('.cart-item input[type="number"]').forEach(input => {
        input.addEventListener('change', (e) => {
            const productId = parseInt(input.closest('.cart-item').querySelector('.quantity-btn').getAttribute('data-id'));
            const quantity = parseInt(input.value);
            updateQuantity(productId, quantity);
        });
    });
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('translate-x-full');
    cartOverlay.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
}

// Toggle search bar
function toggleSearch() {
    searchBar.classList.toggle('hidden');
    if (!searchBar.classList.contains('hidden')) {
        searchBar.querySelector('input').focus();
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}

// Event listeners
cartBtn.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);
searchBtn.addEventListener('click', toggleSearch);
mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Initialize
renderProducts();

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(10px); }
    }
    .animate-fade-in {
        animation: fadeIn 0.3s ease-out forwards;
    }
    .animate-fade-out {
        animation: fadeOut 0.3s ease-out forwards;
    }
`;
document.head.appendChild(style);