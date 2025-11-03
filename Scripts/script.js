        let currentLang = 'en';

        function toggleLanguage() {
            currentLang = currentLang === 'en' ? 'ar' : 'en';
            document.body.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
            
            // Update all elements with data attributes
            const elements = document.querySelectorAll('[data-en][data-ar]');
            elements.forEach(el => {
                el.textContent = el.getAttribute(`data-${currentLang}`);
            });
            
            // Update search input placeholders
            const searchInputs = document.querySelectorAll('.search-input');
            searchInputs.forEach(input => {
                input.placeholder = input.getAttribute(`data-placeholder-${currentLang}`);
            });
        }

        function toggleMobileMenu() {
            const mobileNav = document.getElementById('mobileNav');
            mobileNav.classList.toggle('active');
        }

        function filterProducts(category) {
            const cards = document.querySelectorAll('.product-card');
            const tabs = document.querySelectorAll('.filter-tab');
            
            // Update active tab
            tabs.forEach(tab => tab.classList.remove('active'));
            event.target.classList.add('active');
            
            // Filter products
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const mobileNav = document.getElementById('mobileNav');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            if (!mobileNav.contains(event.target) && !menuBtn.contains(event.target)) {
                mobileNav.classList.remove('active');
            }
        });
  