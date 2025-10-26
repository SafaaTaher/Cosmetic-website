
        let currentPage = 1;
        const productsPerPage = 12;
        let cart = [];

        const products = [
            { id: 1, name: 'Velvet Matte Lipstick', category: 'lips', price: 28, rating: 5, reviews: 245, icon: '💄', colors: ['#8B2635', '#C85A54', '#A0522D', '#DC143C'], badge: 'NEW', description: 'Long-lasting, highly pigmented formula' },
            { id: 2, name: 'Radiance Foundation', category: 'face', price: 42, rating: 5, reviews: 312, icon: '✨', colors: ['#F5D5C0', '#E8B897', '#D4A574', '#8D5524'], description: 'Flawless, buildable coverage' },
            { id: 3, name: 'Luxe Eye Palette', category: 'eyes', price: 58, rating: 5, reviews: 428, icon: '👁️', badge: 'BESTSELLER', badgeColor: '#c17d5f', description: '12 versatile shades for any look' },
            { id: 4, name: 'Dewy Setting Spray', category: 'face', price: 32, rating: 5, reviews: 189, icon: '🌸', description: 'All-day lasting finish with radiance' },
            { id: 5, name: 'Luxe Lip Gloss', category: 'lips', price: 24, rating: 4, reviews: 156, icon: '💋', colors: ['#FFB6C1', '#FF69B4', '#C17D5F'], description: 'High-shine, non-sticky formula' },
            { id: 6, name: 'Blush & Contour Duo', category: 'face', price: 38, rating: 5, reviews: 203, icon: '🎨', colors: ['#FFC0CB', '#FFB6A3', '#E8B897'], badge: 'NEW', description: 'Sculpt and define effortlessly' },
            { id: 7, name: 'Precision Eyeliner', category: 'eyes', price: 22, rating: 5, reviews: 278, icon: '✏️', colors: ['#000', '#2F4F4F', '#8B4513'], description: 'Waterproof, smudge-proof formula' },
            { id: 8, name: 'Hydrating Serum', category: 'skincare', price: 56, rating: 5, reviews: 392, icon: '🧴', badge: 'BESTSELLER', badgeColor: '#c17d5f', description: 'Deep moisture with vitamin C' },
            { id: 9, name: 'SPF 50 Day Cream', category: 'skincare', price: 44, rating: 4, reviews: 167, icon: '☀️', description: 'Sun protection with nourishment' },
            { id: 10, name: 'Volume Mascara', category: 'eyes', price: 26, rating: 5, reviews: 341, icon: '👀', description: 'Dramatic length and volume' },
            { id: 11, name: 'Illuminating Highlighter', category: 'face', price: 34, rating: 5, reviews: 289, icon: '💫', description: 'Radiant glow for all skin tones' },
            { id: 12, name: 'Night Repair Cream', category: 'skincare', price: 62, rating: 5, reviews: 215, icon: '🌙', badge: 'NEW', description: 'Regenerate while you sleep' },
            { id: 13, name: 'Lip Liner Set', category: 'lips', price: 32, rating: 5, reviews: 198, icon: '✍️', colors: ['#8B2635', '#C85A54', '#A0522D'], description: 'Define and shape perfectly' },
            { id: 14, name: 'Cream Blush', category: 'face', price: 29, rating: 4, reviews: 176, icon: '🌺', colors: ['#FFB6C1', '#FF69B4', '#FFC0CB'], description: 'Natural, dewy flush' },
            { id: 15, name: 'Brow Gel', category: 'eyes', price: 24, rating: 5, reviews: 267, icon: '🖌️', description: 'Long-lasting hold and definition' },
            { id: 16, name: 'Makeup Remover', category: 'skincare', price: 28, rating: 5, reviews: 312, icon: '🧼', description: 'Gentle, effective cleansing' },
            { id: 17, name: 'Liquid Lipstick', category: 'lips', price: 26, rating: 4, reviews: 223, icon: '💄', colors: ['#8B2635', '#DC143C', '#C85A54'], description: 'Transfer-proof matte finish' },
            { id: 18, name: 'Primer Serum', category: 'face', price: 48, rating: 5, reviews: 198, icon: '✨', badge: 'NEW', description: 'Flawless base for makeup' },
            { id: 19, name: 'Eyeshadow Singles', category: 'eyes', price: 18, rating: 4, reviews: 145, icon: '🎨', description: 'Highly pigmented shades' },
            { id: 20, name: 'Facial Oil', category: 'skincare', price: 52, rating: 5, reviews: 234, icon: '💧', description: 'Nourishing botanical blend' },
            { id: 21, name: 'Lip Balm SPF', category: 'lips', price: 16, rating: 4, reviews: 189, icon: '👄', description: 'Moisturize and protect' },
            { id: 22, name: 'Setting Powder', category: 'face', price: 36, rating: 5, reviews: 276, icon: '🌟', description: 'Translucent, shine-free finish' },
            { id: 23, name: 'Lash Serum', category: 'eyes', price: 58, rating: 5, reviews: 312, icon: '👁️', badge: 'BESTSELLER', badgeColor: '#c17d5f', description: 'Strengthen and lengthen' },
            { id: 24, name: 'Eye Cream', category: 'skincare', price: 54, rating: 5, reviews: 267, icon: '👀', description: 'Reduce dark circles and puffiness' }
        ];

        let currentCategory = 'all';
        let wishlist = new Set();

        function toggleCart() {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.getElementById('cartOverlay');
            sidebar.classList.toggle('open');
            overlay.classList.toggle('open');
        }

        function updateCartDisplay() {
            const cartItemsContainer = document.getElementById('cartItems');
            const cartCount = document.getElementById('cartCount');
            const cartTotal = document.getElementById('cartTotal');

            cartCount.textContent = cart.length;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="cart-empty">
                        <div class="cart-empty-icon">🛍️</div>
                        <h3>Your cart is empty</h3>
                        <p>Add some products to get started!</p>
                    </div>
                `;
                cartTotal.textContent = '$0';
                return;
            }

            const total = cart.reduce((sum, item) => sum + item.price, 0);
            cartTotal.textContent = `${total}`;

            cartItemsContainer.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <div class="cart-item-image">${item.icon}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-category">${item.category}</div>
                        <div class="cart-item-price">${item.price}</div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">🗑️</button>
                </div>
            `).join('');
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                cart.push(product);
                updateCartDisplay();
                
                // Visual feedback
                const button = event.target;
                const originalText = button.textContent;
                button.textContent = '✓ ADDED';
                button.style.background = '#4CAF50';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 1500);

                // Show cart briefly
                setTimeout(() => {
                    toggleCart();
                }, 600);
            }
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartDisplay();
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            alert(`Checkout - Total: ${total}\nThank you for your purchase!`);
            cart = [];
            updateCartDisplay();
            toggleCart();
        }

        function renderProducts(productsToRender) {
            const grid = document.getElementById('productsGrid');
            const noResults = document.getElementById('noResults');
            
            if (productsToRender.length === 0) {
                grid.style.display = 'none';
                noResults.style.display = 'block';
                document.getElementById('resultsCount').textContent = '0 Products';
                document.getElementById('pagination').style.display = 'none';
                return;
            }

            grid.style.display = 'grid';
            noResults.style.display = 'none';
            document.getElementById('pagination').style.display = 'flex';
            document.getElementById('resultsCount').textContent = `${productsToRender.length} Products`;

            // Pagination logic
            const totalPages = Math.ceil(productsToRender.length / productsPerPage);
            const startIndex = (currentPage - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const paginatedProducts = productsToRender.slice(startIndex, endIndex);

            // Update pagination buttons
            updatePaginationButtons(totalPages);

            grid.innerHTML = paginatedProducts.map(product => `
                <div class="product-card" data-category="${product.category}" data-price="${product.price}" data-rating="${product.rating}">
                    ${product.badge ? `<div class="product-badge" style="${product.badgeColor ? 'background: ' + product.badgeColor : ''}">${product.badge}</div>` : ''}
                    <button class="wishlist-btn" onclick="toggleWishlist(${product.id})" id="wish-${product.id}">🤍</button>
                    <div class="product-image-wrapper">
                        <div class="product-image">${product.icon}</div>
                        <div class="quick-view">Quick View</div>
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        ${product.colors ? `
                            <div class="product-colors">
                                ${product.colors.slice(0, 3).map(color => `<span class="color-dot" style="background: ${color};"></span>`).join('')}
                                ${product.colors.length > 3 ? `<span style="font-size: 0.75rem; color: #999;">+${product.colors.length - 3} more</span>` : ''}
                            </div>
                        ` : ''}
                        <div class="product-rating">${'⭐'.repeat(product.rating)} <span>(${product.reviews})</span></div>
                        <div class="product-price">${product.price}</div>
                        <button class="add-cart" onclick="addToCart(${product.id})">ADD TO CART</button>
                    </div>
                </div>
            `).join('');

            // Scroll to top of products
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }

        function updatePaginationButtons(totalPages) {
            const pagination = document.getElementById('pagination');
            
            pagination.innerHTML = `
                <button class="page-btn" onclick="changePage('prev')" ${currentPage === 1 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>←</button>
                ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => `
                    <button class="page-btn ${page === currentPage ? 'active' : ''}" onclick="changePage(${page})">${page}</button>
                `).join('')}
                <button class="page-btn" onclick="changePage('next')" ${currentPage === totalPages ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>→</button>
            `;
        }

        function changePage(page) {
            const allProducts = getFilteredProducts();
            const totalPages = Math.ceil(allProducts.length / productsPerPage);

            if (page === 'prev' && currentPage > 1) {
                currentPage--;
            } else if (page === 'next' && currentPage < totalPages) {
                currentPage++;
            } else if (typeof page === 'number' && page >= 1 && page <= totalPages) {
                currentPage = page;
            } else {
                return; // Invalid page
            }

            renderProducts(allProducts);
        }

        function getFilteredProducts() {
            let filtered = [...products];

            // Category filter
            if (currentCategory !== 'all') {
                filtered = filtered.filter(p => p.category === currentCategory);
            }

            // Search filter
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            if (searchTerm) {
                filtered = filtered.filter(p => 
                    p.name.toLowerCase().includes(searchTerm) ||
                    p.description.toLowerCase().includes(searchTerm) ||
                    p.category.toLowerCase().includes(searchTerm)
                );
            }

            // Price filter
            const priceFilter = document.getElementById('priceFilter').value;
            if (priceFilter === 'under30') {
                filtered = filtered.filter(p => p.price < 30);
            } else if (priceFilter === '30to50') {
                filtered = filtered.filter(p => p.price >= 30 && p.price <= 50);
            } else if (priceFilter === 'over50') {
                filtered = filtered.filter(p => p.price > 50);
            }

            // Sort
            const sortBy = document.getElementById('sortBy').value;
            if (sortBy === 'price-low') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price-high') {
                filtered.sort((a, b) => b.price - a.price);
            } else if (sortBy === 'rating') {
                filtered.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
            } else if (sortBy === 'newest') {
                filtered = filtered.filter(p => p.badge === 'NEW').concat(filtered.filter(p => p.badge !== 'NEW'));
            }

            return filtered;
        }

        function filterProducts(category) {
            currentCategory = category;
            currentPage = 1; // Reset to first page
            const tabs = document.querySelectorAll('.filter-tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            event.target.classList.add('active');
            applyFilters();
        }

        function searchProducts() {
            currentPage = 1; // Reset to first page
            applyFilters();
        }

        function applyFilters() {
            currentPage = 1; // Reset to first page when filtering
            const filtered = getFilteredProducts();
            renderProducts(filtered);
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                cart.push(product);
                updateCartDisplay();
                
                // Visual feedback
                const button = event.target;
                const originalText = button.textContent;
                button.textContent = '✓ ADDED';
                button.style.background = '#4CAF50';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 1500);

                // Show cart briefly
                setTimeout(() => {
                    toggleCart();
                }, 600);
            }
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartDisplay();
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            alert(`Checkout - Total: ${total}\nThank you for your purchase!`);
            cart = [];
            updateCartDisplay();
            toggleCart();
        }

        function toggleWishlist(productId) {
            const btn = document.getElementById(`wish-${productId}`);
            if (wishlist.has(productId)) {
                wishlist.delete(productId);
                btn.textContent = '🤍';
                btn.classList.remove('active');
            } else {
                wishlist.add(productId);
                btn.textContent = '❤️';
                btn.classList.add('active');
            }
        }

        // Initial render
        renderProducts(products);
    