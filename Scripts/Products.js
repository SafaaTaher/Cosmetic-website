
  const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  let currentPage = 1;
  const productsPerPage = 12;
  let cart = [];
  let products = [];
  let wishlist = new Set();

  async function getProducts() {
    try {
      const response = await fetch('products.json');
      products = await response.json();
      renderProducts(products);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }
 
  //Mobile Menu Toggle/ Cart Sidebar Toggle
  function toggleMobileMenu() {
    const mobileNav = document.getElementById("mobileNav");
    mobileNav.classList.toggle("active");
  }

  function toggleCart() {
    const sidebar = document.getElementById("cartSidebar");
    const overlay = document.getElementById("cartOverlay");
    const body = document.body;

    sidebar.classList.toggle("open");
    overlay.classList.toggle("open");
    body.classList.toggle("cart-open");
  }

  function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartCountMobile = document.getElementById("cartCountMobile");
    const cartTotal = document.getElementById("cartTotal");

    cartCount.textContent = cart.length;
    cartCountMobile.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛍️</div>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
            </div>
        `;
        cartTotal.textContent = usdFormatter.format(0);
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = usdFormatter.format(total);

    cartItemsContainer.innerHTML = cart
        .map(
            (item, index) => `
                <div class="cart-item">
                    <div class="cart-item-image">
                      <img src="${item.image}" alt="${item.name}" />
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-category">${item.category}</div>
                        <div class="cart-item-price">${item.price}</div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">🗑️</button>
                </div>
            `
        )
        .join("");
}

  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (product) {
      cart.push(product);
      updateCartDisplay();

      const button = event.target;
      const originalText = button.textContent;
      button.textContent = "✓ ADDED";
      button.style.background = "#4CAF50";
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "";
      }, 1500);

      // setTimeout(() => {
      //   toggleCart();
      // }, 600);
    }
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
  }

  function checkout() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const formattedTotal = usdFormatter.format(total); 

    alert(`Checkout - Total: ${formattedTotal}\nThank you for your purchase!`);
    cart = [];
    updateCartDisplay();
    toggleCart();
  }


  // Product Rendering and Pagination
  function renderProducts(productsToRender) {
    const grid = document.getElementById("productsGrid");
    const noResults = document.getElementById("noResults");

    if (productsToRender.length === 0) {
        grid.style.display = "none";
        noResults.style.display = "block";
        document.getElementById("resultsCount").textContent = "0 Products";
        document.getElementById("pagination").style.display = "none";
        return;
    }

    grid.style.display = "grid";
    noResults.style.display = "none";
    document.getElementById("pagination").style.display = "flex";
    document.getElementById(
        "resultsCount"
    ).textContent = `${productsToRender.length} Products`;

    const totalPages = Math.ceil(productsToRender.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = productsToRender.slice(startIndex, endIndex);

    updatePaginationButtons(totalPages);

    grid.innerHTML = paginatedProducts
        .map(
            (product) => `
                <div class="product-card" data-category="${
                  product.category
                }" data-price="${product.price}" data-rating="${
                  product.rating
                }">
                    ${
                      product.badge
                        ? `<div class="product-badge" style="${
                              product.badgeColor
                                ? "background: " + product.badgeColor
                                : ""
                          }">${product.badge}</div>`
                        : ""
                    }
                    <button class="wishlist-btn" onclick="toggleWishlist(${
                      product.id
                    })" id="wish-${product.id}">🤍</button>
                    <div class="product-image-wrapper">
                        
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        
                        <div class="quick-view">Quick View</div>
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        ${
                          product.colors
                            ? `
                            <div class="product-colors">
                                ${product.colors
                                    .slice(0, 3)
                                    .map(
                                        (color) =>
                                            `<span class="color-dot" style="background: ${color};"></span>`
                                    )
                                    .join("")}
                                ${
                                    product.colors.length > 3
                                        ? `<span style="font-size: 0.75rem; color: #999;">+${
                                              product.colors.length - 3
                                          } more</span>`
                                        : ""
                                }
                            </div>
                            `
                            : ""
                        }
                        <div class="product-rating">${"⭐".repeat(
                          product.rating
                        )} <span>(${product.reviews})</span></div>
                        <div class="product-price">${usdFormatter.format(product.price)}</div>
                        <button class="add-cart" onclick="addToCart(${
                          product.id
                        })">ADD TO CART</button>
                    </div>
                </div>
            `
        )
        .join("");

    window.scrollTo({ top: 300, behavior: "smooth" });
}

// Pagination Buttons
function updatePaginationButtons(totalPages) {
    const pagination = document.getElementById("pagination");

    pagination.innerHTML = `
            <button class="page-btn" onclick="changePage('prev')" ${
              currentPage === 1
                ? 'disabled style="opacity: 0.5; cursor: not-allowed;"'
                : ""
            }>←</button>
            ${Array.from({ length: totalPages }, (_, i) => i + 1)
              .map(
                (page) => `
                <button class="page-btn ${
                  page === currentPage ? "active" : ""
                }" onclick="changePage(${page})">${page}</button>
            `
              )
              .join("")}
            <button class="page-btn" onclick="changePage('next')" ${
              currentPage === totalPages
                ? 'disabled style="opacity: 0.5; cursor: not-allowed;"'
                : ""
            }>→</button>
        `;
}

// Change Page
function changePage(page) {
    const allProducts = getFilteredProducts();
    const totalPages = Math.ceil(allProducts.length / productsPerPage);

    if (page === "prev" && currentPage > 1) {
      currentPage--;
    } else if (page === "next" && currentPage < totalPages) {
      currentPage++;
    } else if (
      typeof page === "number" &&
      page >= 1 &&
      page <= totalPages
    ) {
      currentPage = page;
    } else {
      return;
    }

    renderProducts(allProducts);
}

// Filtering, Searching, and Sorting
function getFilteredProducts() {
    let filtered = [...products];

    if (currentCategory !== "all") {
      filtered = filtered.filter((p) => p.category === currentCategory);
    }

    const searchTerm = document
      .getElementById("searchInput")
      .value.toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.category.toLowerCase().includes(searchTerm)
      );
    }

    const priceFilter = document.getElementById("priceFilter").value;
    if (priceFilter === "under30") {
      filtered = filtered.filter((p) => p.price < 30);
    } else if (priceFilter === "30to50") {
      filtered = filtered.filter((p) => p.price >= 30 && p.price <= 50);
    } else if (priceFilter === "over50") {
      filtered = filtered.filter((p) => p.price > 50);
    }

    const sortBy = document.getElementById("sortBy").value;
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    } else if (sortBy === "newest") {
      filtered = filtered
        .filter((p) => p.badge === "NEW")
        .concat(filtered.filter((p) => p.badge !== "NEW"));
    }

    return filtered;
}

function filterProducts(category) {
    currentCategory = category;
    currentPage = 1;
    const tabs = document.querySelectorAll(".filter-tab");
    tabs.forEach((tab) => tab.classList.remove("active"));
    event.target.classList.add("active");
    applyFilters();
}

function searchProducts() {
    currentPage = 1;
    applyFilters();
}

function applyFilters() {
    currentPage = 1;
    const filtered = getFilteredProducts();
    renderProducts(filtered);
}

// Wishlist Functionality
function toggleWishlist(productId) {
    const btn = document.getElementById(`wish-${productId}`);
    if (wishlist.has(productId)) {
      wishlist.delete(productId);
      btn.textContent = "🤍";
      btn.classList.remove("active");
    } else {
      wishlist.add(productId);
      btn.textContent = "❤️";
      btn.classList.add("active");
    }
}

// تحميل المنتجات عند التهيئة
getProducts();
