// Constants for API endpoint and cart
const API_ENDPOINT = 'https://fakestoreapi.com/products';
const cartItems = [];

// Fetch product data from FakeStore API
async function fetchProducts() {
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
}

// Create a product card element
function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.classList.add('col-md-4', 'mb-4');

  const card = document.createElement('div');
  card.classList.add('card', 'h-100');

  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.title;
  image.classList.add('card-img-top');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const title = document.createElement('h5');
  title.textContent = product.title;
  title.classList.add('card-title');

  const price = document.createElement('p');
  price.textContent = `$${product.price}`;
  price.classList.add('card-text');

  const addToCartBtn = document.createElement('button');
  addToCartBtn.textContent = 'Add to Cart';
  addToCartBtn.classList.add('btn', 'btn-primary', 'btn-block');
  addToCartBtn.addEventListener('click', () => addToCart(product));

  cardBody.appendChild(title);
  cardBody.appendChild(price);
  cardBody.appendChild(addToCartBtn);

  card.appendChild(image);
  card.appendChild(cardBody);

  productCard.appendChild(card);

  return productCard;
}

let products = [];

// Render product cards on the product listing page
function renderProducts(productsToRender) {
  const productContainer = document.querySelector('.product-list');
  productContainer.innerHTML = ''; // Clear existing products before rendering

  productsToRender.forEach(product => {
    const productCard = createProductCard(product);
    productContainer.appendChild(productCard);
  });
}

// Add a product to the shopping cart
function addToCart(product) {
  cartItems.push(product);
  updateCart();
}

// Update the cart display
function updateCart() {
  const cartItemsList = document.getElementById('cart-items');
  cartItemsList.innerHTML = '';

  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.title} - $${item.price}`;
    li.classList.add('list-group-item');
    cartItemsList.appendChild(li);
  });
}

// Show confetti effect on checkout
function showConfetti() {
  particlesJS('confetti-container', {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#ff6347'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        },
        polygon: {
          nb_sides: 5
        }
      },
      opacity: {
        value: 0.7,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 5,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable_auto: true,
        distance: 100,
        color: '#ff6347',
        opacity: 0.4,
        width: 1,
        condensed_mode: {
          enable: false,
          rotateX: 600,
          rotateY: 600
        }
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'repulse'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });
}

// Show checkout page with confetti
function showCheckoutPage() {
  const main = document.querySelector('main');
  main.innerHTML = `
    <div class="checkout-page">
      <h2>Checkout</h2>
      <form>
        <!-- Add more fields for shipping and payment info -->
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" required>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Place Order</button>
      </form>
    </div>
  `;

  showConfetti();
  const checkoutForm = document.getElementById('checkout-form');
  checkoutForm.addEventListener('submit', handleCheckout);
}
function handleCheckout(event) {
  event.preventDefault(); // Prevent form submission and redirect

  // Get the form inputs
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;


  // Redirect back to the product listing page after a delay
  setTimeout(() => {
    location.href = 'index.html';
  }, 10000); 
}
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const priceRange = document.getElementById('price-range');

searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);
priceRange.addEventListener('input', applyFilters);

// Function to filter products based on search and filters
function applyFilters() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value.toLowerCase();
  const maxPrice = priceRange.value;

  const filteredProducts = products.filter(product => {
    const titleMatch = product.title.toLowerCase().includes(searchText);
    const categoryMatch = selectedCategory === '' || product.category.toLowerCase() === selectedCategory;
    const priceMatch = parseFloat(product.price) <= parseFloat(maxPrice);

    return titleMatch && categoryMatch && priceMatch;
  });

  renderProducts(filteredProducts);
}


const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', showCheckoutPage);

// Initialize the website
async function init() {
  try {
    products = await fetchProducts();
    renderProducts(products);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


init();
