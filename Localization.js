// localization.js - Merged from previous localization logic and general functions from Products.js

let currentLang = 'en';
let translations = {};

// --- General Utility Functions (from Products.js) ---

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById("mobileNav");
    mobileNav.classList.toggle("active");
}

// Cart Sidebar Toggle
function toggleCart() {
    const sidebar = document.getElementById("cartSidebar");
    const overlay = document.getElementById("cartOverlay");
    const body = document.body;

    sidebar.classList.toggle("open");
    overlay.classList.toggle("open");
    body.classList.toggle("cart-open");
}

// Placeholder for checkout function used in cart sidebar
function checkout() {
    // This function is likely defined in Products.js for the products page.
    // For the contact page, we'll provide a simple placeholder to prevent errors.
    const alertMessage = currentLang === 'ar' ? "وظيفة الدفع غير متوفرة في صفحة الاتصال." : "Checkout function is not available on the contact page.";
    alert(alertMessage);
}

// --- Localization Functions ---

// Function to fetch JSON data
async function fetchTranslations() {
    try {
        // Assuming data_ar.json and data_en.json are in the same directory
        const [arResponse, enResponse] = await Promise.all([
            fetch('data_ar.json'),
            fetch('data_en.json')
        ]);

        translations.ar = await arResponse.json();
        translations.en = await enResponse.json();
        
        // Initialize language from localStorage or default to 'en'
        currentLang = localStorage.getItem('lang') || 'en';
        
        applyLocalization();
        updateLanguageToggle();
    } catch (error) {
        console.error("Error loading translation files:", error);
    }
}

// Function to apply localization to the entire page
function applyLocalization() {
    // We only need the contact_page data for this file
    const langData = translations[currentLang].contact_page;
    const isRTL = currentLang === 'ar';

    // Set HTML attributes for language and direction
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    // Apply text alignment for RTL/LTR layout
    document.body.style.textAlign = isRTL ? 'right' : 'left';

    // Update navigation links (using common keys from all pages)
    // We use the login_page header data as it's common across all pages
    const navLinksData = translations[currentLang].login_page.header.nav_links;
    document.querySelectorAll('[data-localize-nav]').forEach(el => {
        const index = parseInt(el.getAttribute('data-localize-nav'));
        el.textContent = navLinksData[index];
    });
    
    // Update Logo
    document.querySelector('.logo').textContent = translations[currentLang].login_page.header.logo;

    // Update main contact info section
    document.querySelector('[data-localize="contact_info_section.title"]').textContent = langData.contact_info_section.title;
    document.querySelector('[data-localize="contact_info_section.description"]').textContent = langData.contact_info_section.description;
    
    // Update contact details
    document.querySelector('[data-localize="contact_info_section.address"]').textContent = langData.contact_info_section.address;
    document.querySelector('[data-localize="contact_info_section.phone"]').textContent = langData.contact_info_section.phone;
    document.querySelector('[data-localize="contact_info_section.email"]').textContent = langData.contact_info_section.email;
    document.querySelector('[data-localize="contact_info_section.hours"]').textContent = langData.contact_info_section.hours;
    
    // Update contact form
    document.querySelector('[data-localize="message_form.title"]').textContent = langData.message_form.title;
    document.querySelector('[data-localize="message_form.full_name_label"]').textContent = langData.message_form.full_name_label;
    document.querySelector('[data-localize="message_form.full_name_placeholder"]').placeholder = langData.message_form.full_name_placeholder;
    document.querySelector('[data-localize="message_form.email_label"]').textContent = langData.message_form.email_label;
    document.querySelector('[data-localize="message_form.email_placeholder"]').placeholder = langData.message_form.email_placeholder;
    document.querySelector('[data-localize="message_form.message_label"]').textContent = langData.message_form.message_label;
    document.querySelector('[data-localize="message_form.message_placeholder"]').placeholder = langData.message_form.message_placeholder;
    document.querySelector('[data-localize="message_form.send_button"]').textContent = langData.message_form.send_button;
    
    // Update footer
    document.querySelector('[data-localize="footer.about_title"]').textContent = langData.footer.about_title;
    document.querySelector('[data-localize="footer.about_text"]').textContent = langData.footer.about_text;
    document.querySelector('[data-localize="footer.quick_links_title"]').textContent = langData.footer.quick_links_title;
    document.querySelector('[data-localize="footer.copyright"]').textContent = langData.footer.copyright;
    
    // Update quick links in footer
    const quickLinks = document.querySelectorAll('.footer-section:nth-child(2) a');
    langData.footer.quick_links.forEach((linkText, index) => {
        if (quickLinks[index]) {
            quickLinks[index].textContent = linkText;
        }
    });
    
    // Update cart/mobile menu text (using English keys for simplicity as they are not in contact_page data)
    document.querySelector('.mobile-cart').childNodes[1].textContent = currentLang === 'ar' ? ' سلة التسوق ' : ' Shopping Cart ';
    document.querySelector('.cart-header h2').textContent = currentLang === 'ar' ? 'سلة التسوق' : 'Shopping Cart';
    document.querySelector('.cart-empty h3').textContent = currentLang === 'ar' ? 'سلتك فارغة' : 'Your cart is empty';
    document.querySelector('.cart-empty p').textContent = currentLang === 'ar' ? 'أضف بعض المنتجات للبدء!' : 'Add some products to get started!';
    document.querySelector('.cart-total-label').textContent = currentLang === 'ar' ? 'الإجمالي:' : 'Total:';
    document.querySelector('.checkout-btn').textContent = currentLang === 'ar' ? 'الدفع' : 'CHECKOUT';
    
    // Update success message
    const successMsg = document.getElementById("successMessage");
    if (successMsg) {
        // Ensure we only update the text node inside the success message div
        const successText = currentLang === 'ar' ? ' شكراً لك! تم إرسال رسالتك بنجاح.' : ' Thank you! Your message has been sent.';
        // Find the text node or create one if it doesn't exist
        let textNode = Array.from(successMsg.childNodes).find(node => node.nodeType === 3);
        if (!textNode) {
            textNode = document.createTextNode(successText);
            successMsg.appendChild(textNode);
        } else {
            textNode.nodeValue = successText;
        }
    }
}

// Function to toggle language
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', currentLang);
    applyLocalization();
    updateLanguageToggle();
}

// Function to update the AR | EN button text
function updateLanguageToggle() {
    const langToggleButtons = document.querySelectorAll('.lang-toggle');
    langToggleButtons.forEach(btn => {
        btn.textContent = currentLang === 'en' ? 'AR | EN' : 'EN | AR';
    });
}

// Start the process
document.addEventListener('DOMContentLoaded', fetchTranslations);
