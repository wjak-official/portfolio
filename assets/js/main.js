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
                ${sanitizeText(message)}
            </div>
        `;
    }

    // Sanitization helper using DOMPurify
    function sanitizeText(text) {
        if (typeof text !== 'string') return '';
        return DOMPurify.sanitize(str, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: [],
            KEEP_CONTENT: true,
            RETURN_TRUSTED_TYPE: false,
            USE_PROFILES: { html: false }
          });
          
    }

    // Input sanitization
    function sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        const trimmed = input.trim();
        return sanitizeText(trimmed);
    }

    // Validate email
    function isValidEmail(email) {
        const input = document.createElement('input');
        input.type = 'email';
        input.value = email;
        return input.checkValidity();
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

    // Initialize CSRF token from server
    async function initCSRF() {
        try {
            const response = await fetch('/api/csrf-token');
            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('csrf_token', data.csrfToken);
            } else {
                // Fallback to client-generated token if server is not available
                console.warn('CSRF token server not available, using client-generated token');
                const token = generateClientSessionId();
                sessionStorage.setItem('csrf_token', token);
            }
        } catch (error) {
            console.warn('Failed to fetch CSRF token:', error);
            // Fallback to client-generated token
            const token = generateClientSessionId();
            sessionStorage.setItem('csrf_token', token);
        }
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
        sanitizeText,
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
