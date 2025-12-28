'use strict';

/**
 * Main JavaScript - Core functionality
 * Handles navbar scroll effects, security features, and utilities
 */

(function() {
    // Generate a random client-side identifier (not CSRF protection)
    function generateClientSessionId() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    // Initialize client-side identifier in sessionStorage
    function initClientSessionId() {
        if (!sessionStorage.getItem('client_session_id')) {
            const token = generateClientSessionId();
            sessionStorage.setItem('client_session_id', token);
        }
    }

    // Navbar scroll effect
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        function updateNavbar() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', updateNavbar);
        updateNavbar(); // Initial check
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Add active class to current nav item
    function updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    // Animate elements on scroll
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe cards and sections
        document.querySelectorAll('.card, .service-card, .portfolio-item, .sal-pillar').forEach(el => {
            observer.observe(el);
        });
    }

    // Loading state management
    function showLoading(element) {
        if (!element) return;
        element.innerHTML = `
            <div class="spinner-container">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
    }

    function hideLoading(element) {
        if (!element) return;
        const spinner = element.querySelector('.spinner-container');
        if (spinner) {
            spinner.remove();
        }
    }

    // Error handling
    function showError(element, message) {
        if (!element) return;
        element.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                ${escapeHtml(message)}
            </div>
        `;
    }

    // Sanitization helper
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    // Input sanitization
    function sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        return input.trim().replace(/[<>]/g, '');
    }

    // Validate email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Form validation helper
    function validateForm(formElement) {
        let isValid = true;
        const requiredFields = formElement.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            const value = field.value.trim();
            const feedbackElement = field.nextElementSibling;
            
            // Clear previous errors
            field.classList.remove('is-invalid');
            if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                feedbackElement.textContent = '';
            }
            
            // Validate
            if (!value) {
                isValid = false;
                field.classList.add('is-invalid');
                if (feedbackElement) {
                    feedbackElement.textContent = 'This field is required.';
                }
            } else if (field.type === 'email' && !isValidEmail(value)) {
                isValid = false;
                field.classList.add('is-invalid');
                if (feedbackElement) {
                    feedbackElement.textContent = 'Please enter a valid email address.';
                }
            }
        });
        
        return isValid;
    }

    // Back to top button
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Console warning for security
    function securityWarning() {
        console.log('%cWarning!', 'color: red; font-size: 40px; font-weight: bold;');
        console.log('%cThis is a browser feature intended for developers.', 'font-size: 16px;');
        console.log('%cIf someone told you to copy-paste something here, it could compromise your security.', 'font-size: 16px;');
    }

    // Initialize all features
    function init() {
        initCSRF();
        initNavbarScroll();
        initSmoothScroll();
        updateActiveNavLink();
        initScrollAnimations();
        initBackToTop();
        securityWarning();
    }

    // Export utilities for other scripts
    window.AppUtils = {
        escapeHtml,
        sanitizeInput,
        isValidEmail,
        validateForm,
        showLoading,
        hideLoading,
        showError,
        getCSRFToken: () => sessionStorage.getItem('csrf_token')
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
