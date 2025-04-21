// Product Data (would normally come from backend API)
const products = [
    {
        id: 1,
        name: "Premium Fountain Pen",
        price: 29.99,
        image: "images/products/pen1.jpg",
        category: "pens",
        description: "Smooth writing fountain pen with elegant design. Perfect for professionals and writing enthusiasts.",
        rating: 4.8,
        stock: 15
    },
    // Add all other products from previous example
];

// Display Featured Products on Homepage
function displayFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
    if (featuredProductsContainer) {
        // Get first 4 products as featured
        const featured = products.slice(0, 4);
        
        featuredProductsContainer.innerHTML = featured.map(product => `
            <div class="product-card">
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `).join('');
    }
}

// Display All Products on Products Page
function displayAllProducts(category = '') {
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
        let filteredProducts = products;
        
        // Filter by category if specified
        if (category) {
            filteredProducts = products.filter(product => product.category === category);
            const categoryTitle = document.querySelector('.category-title');
            if (categoryTitle) {
                const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
                categoryTitle.textContent = categoryName;
            }
        }
        
        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card">
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <a href="product-details.html?id=${product.id}" class="btn btn-outline" style="margin-top: 10px; display: block;">View Details</a>
                </div>
            </div>
        `).join('');
    }
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedProducts();
    
    // Check if we're on the products page
    if (window.location.pathname.includes('products.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        displayAllProducts(category);
        
        // Add event listeners for filters
        const categoryFilter = document.getElementById('category-filter');
        const sortBy = document.getElementById('sort-by');
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                window.location.href = `products.html?category=${e.target.value}`;
            });
            
            // Set current category in filter
            if (category) {
                categoryFilter.value = category;
            }
        }
    }
});