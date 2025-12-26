// Theme Switching Function
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update active buttons if they exist
    const themeButtons = document.querySelectorAll('.theme-switch button');
    if (themeButtons.length > 0) {
        themeButtons.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon.classList.contains('fa-moon') && theme === 'dark') {
                btn.classList.add('active');
            } else if (icon.classList.contains('fa-sun') && theme === 'light') {
                btn.classList.add('active');
            } else if (icon.classList.contains('fa-circle') && theme === 'grey') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    // FAQ Category Switching
    const faqCategories = document.querySelectorAll('.faq-category');
    if (faqCategories.length > 0) {
        faqCategories.forEach(category => {
            category.addEventListener('click', function() {
                const categoryName = this.dataset.category;
                
                // Update active category
                faqCategories.forEach(cat => cat.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding FAQ section
                document.querySelectorAll('.faq-section').forEach(section => {
                    section.classList.remove('active');
                });
                document.getElementById(`${categoryName}-faq`).classList.add('active');
            });
        });
    }
    
    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to your server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links within the same page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal page anchors
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === 'index.html' && linkHref === 'index.html') ||
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Add active class to theme buttons
document.querySelectorAll('.theme-switch button').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.theme-switch button').forEach(b => {
            b.classList.remove('active');
        });
        this.classList.add('active');
    });
});