// PupBar Pet Grooming - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initNavbar();
    initScrollEffects();
    initFormValidation();
    initServiceCards();
    initBookingForm();
    initContactForm();
    initAnimations();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .feature-badge, .team-card, .value-card, .facility-card').forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for hero circles
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.circle');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Form validation enhancements
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
        
        // Real-time validation for form inputs
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    });
}

// Individual field validation
function validateField(field) {
    const isValid = field.checkValidity();
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    
    if (isValid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
    }
}

// Service card interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card, .service-detail-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Service selection highlighting
    const serviceButtons = document.querySelectorAll('.service-detail-card .btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Store selected service for booking form
            const serviceName = this.closest('.service-detail-card').querySelector('.service-name').textContent;
            sessionStorage.setItem('selectedService', serviceName);
            
            // Visual feedback
            this.innerHTML = '<i class="fas fa-check me-2"></i>Selected!';
            this.classList.add('btn-success');
            this.classList.remove('btn-primary');
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-calendar-check me-2"></i>Book This Service';
                this.classList.remove('btn-success');
                this.classList.add('btn-primary');
            }, 2000);
        });
    });
}

// Booking form enhancements
function initBookingForm() {
    const bookingForm = document.querySelector('#booking form');
    if (!bookingForm) return;
    
    // Pre-fill service if selected from services page
    const selectedService = sessionStorage.getItem('selectedService');
    const serviceSelect = bookingForm.querySelector('select[name="service"]');
    
    if (selectedService && serviceSelect) {
        const options = serviceSelect.querySelectorAll('option');
        options.forEach(option => {
            if (option.textContent.includes(selectedService)) {
                option.selected = true;
            }
        });
    }
    
    // Date validation - prevent past dates
    const dateInput = bookingForm.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Set default to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }
    
    // Dynamic pricing display
    const serviceSelect2 = bookingForm.querySelector('select[name="service"]');
    if (serviceSelect2) {
        serviceSelect2.addEventListener('change', function() {
            updatePriceDisplay(this.value);
        });
    }
    
    // Form submission with loading state
    bookingForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Booking...';
            
            // Re-enable button after form processing (in case of validation errors)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-calendar-check me-2"></i>Book Appointment';
            }, 3000);
        }
    });
}

// Update price display based on selected service
function updatePriceDisplay(serviceValue) {
    const prices = {
        'basic_wash': '$35',
        'full_groom': '$65',
        'nail_trim': '$15',
        'teeth_cleaning': '$25',
        'flea_treatment': '$30',
        'premium_spa': '$95'
    };
    
    const price = prices[serviceValue] || 'Call for pricing';
    
    // Create or update price display
    let priceDisplay = document.querySelector('.price-display');
    if (!priceDisplay) {
        priceDisplay = document.createElement('div');
        priceDisplay.className = 'price-display alert alert-info mt-2';
        const serviceSelect = document.querySelector('select[name="service"]');
        serviceSelect.parentNode.appendChild(priceDisplay);
    }
    
    priceDisplay.innerHTML = `<strong>Service Price: ${price}</strong>`;
}

// Contact form enhancements
function initContactForm() {
    const contactForm = document.querySelector('#contact form');
    if (!contactForm) return;
    
    // Character counter for message textarea
    const messageTextarea = contactForm.querySelector('textarea[name="message"]');
    if (messageTextarea) {
        const maxLength = 500;
        
        // Create character counter
        const counter = document.createElement('div');
        counter.className = 'character-counter text-muted small mt-1';
        messageTextarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const remaining = maxLength - messageTextarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            
            if (remaining < 50) {
                counter.classList.add('text-warning');
            } else {
                counter.classList.remove('text-warning');
            }
        }
        
        messageTextarea.addEventListener('input', updateCounter);
        updateCounter(); // Initial count
    }
    
    // Form submission with loading state
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            
            // Re-enable button after form processing
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
            }, 3000);
        }
    });
}

// Initialize animations and interactions
function initAnimations() {
    // Add CSS animation classes
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .navbar-scrolled {
            background: rgba(255, 255, 255, 0.98) !important;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1) !important;
        }
        
        .character-counter.text-warning {
            color: #ffc107 !important;
        }
        
        .price-display {
            background: linear-gradient(45deg, #FFB6C1, #E0F6FF) !important;
            border: none !important;
            border-radius: 15px !important;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Image lazy loading for better performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Phone number formatting
function formatPhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    input.value = formattedValue;
}

// Apply phone formatting to phone inputs
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function() {
        formatPhoneNumber(this);
    });
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Failed to load image:', this.src);
    });
});

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // Escape key closes modals and dropdowns
    if (e.key === 'Escape') {
        const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
        openDropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
});

// Print stylesheet application
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('print');
    mediaQuery.addListener(function(mq) {
        if (mq.matches) {
            document.body.classList.add('printing');
        } else {
            document.body.classList.remove('printing');
        }
    });
}

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData && perfData.loadEventEnd > 3000) {
                console.warn('Page load time exceeded 3 seconds:', perfData.loadEventEnd);
            }
        }, 0);
    });
}

// Service worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
