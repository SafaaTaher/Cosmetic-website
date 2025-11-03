//Navbar scripts

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

