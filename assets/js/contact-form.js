'use strict';

/**
 * Secure Contact Form Handler
 * Includes validation, sanitization, rate limiting, and CSRF protection
 */

class ContactFormHandler {
    static DISPOSABLE_DOMAINS = [
        '10minutemail.com', 'guerrillamail.com', 'mailinator.com',
        'temp-mail.org', 'throwaway.email', 'yopmail.com',
        'maildrop.cc', 'tempail.com', 'dispostable.com',
        'mail-temporaire.fr', 'temp-mail.ru', 'tempemail.net',
        'mailcatch.com', 'fakeinbox.com', 'mailnull.com',
        'spamgourmet.com', 'spamhole.com', 'tempinbox.com'
    ];

    constructor() {
        this.formElement = null;
        this.submitButton = null;
        this.messageElement = null;
        this.rateLimitKey = 'contact_form_submissions';
        this.maxSubmissions = 3;
        this.timeWindow = 3600000; // 1 hour in milliseconds
    }

    /**
     * Sanitize input using DOMPurify
     */
    sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        return DOMPurify.sanitize(input, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: [],
            KEEP_CONTENT: true,
            RETURN_TRUSTED_TYPE: false,
            USE_PROFILES: { html: false }
        });
    }

    /**
     * Validate email format and check for disposable domains
     */
    isValidEmail(email) {
        if (typeof email !== 'string') {
            return false;
        }

        const value = email.trim();
        if (value === '') {
            return false;
        }

        // More robust email validation with support for internationalized domains.
        // Based on commonly used patterns (e.g., MDN) and extended for Unicode domain labels.
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Za-z0-9\u00A1-\uFFFF](?:[A-Za-z0-9\u00A1-\uFFFF-]{0,61}[A-Za-z0-9\u00A1-\uFFFF])?\.)+[A-Za-z\u00A1-\uFFFF]{2,}$/u;

        if (!re.test(value)) {
            return false;
        }

        // Check for disposable/temp email domains
        const domain = value.split('@')[1]?.toLowerCase();

        return !ContactFormHandler.DISPOSABLE_DOMAINS.includes(domain);
    }

    /**
     * Check rate limiting
     */
    checkRateLimit() {
        const submissions = JSON.parse(localStorage.getItem(this.rateLimitKey) || '[]');
        const now = Date.now();
        
        // Remove old submissions outside the time window
        const recentSubmissions = submissions.filter(time => now - time < this.timeWindow);
        
        // Update storage
        localStorage.setItem(this.rateLimitKey, JSON.stringify(recentSubmissions));
        
        // Check if limit exceeded
        if (recentSubmissions.length >= this.maxSubmissions) {
            return false;
        }
        
        return true;
    }

    /**
     * Record submission
     */
    recordSubmission() {
        const submissions = JSON.parse(localStorage.getItem(this.rateLimitKey) || '[]');
        submissions.push(Date.now());
        localStorage.setItem(this.rateLimitKey, JSON.stringify(submissions));
    }

    /**
     * Validate form fields
     */
    validateForm() {
        let isValid = true;
        const fields = this.formElement.querySelectorAll('[required]');
        
        fields.forEach(field => {
            const value = field.value.trim();
            const feedbackElement = field.nextElementSibling;
            
            // Clear previous errors
            field.classList.remove('is-invalid');
            if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                feedbackElement.textContent = '';
            }
            
            // Validate required
            if (!value) {
                isValid = false;
                field.classList.add('is-invalid');
                if (feedbackElement) {
                    feedbackElement.textContent = 'This field is required.';
                }
                return;
            }
            
            // Validate email
            if (field.type === 'email') {
                // More robust email validation with support for internationalized domains.
                const emailFormatRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Za-z0-9\u00A1-\uFFFF](?:[A-Za-z0-9\u00A1-\uFFFF-]{0,61}[A-Za-z0-9\u00A1-\uFFFF])?\.)+[A-Za-z\u00A1-\uFFFF]{2,}$/u;
                const domain = value.split('@')[1]?.toLowerCase();
                const disposableDomains = [
                    '10minutemail.com', 'guerrillamail.com', 'mailinator.com',
                    'temp-mail.org', 'throwaway.email', 'yopmail.com',
                    'maildrop.cc', 'tempail.com', 'dispostable.com',
                    'mail-temporaire.fr', 'temp-mail.ru', 'tempemail.net',
                    'mailcatch.com', 'fakeinbox.com', 'mailnull.com',
                    'spamgourmet.com', 'spamhole.com', 'tempinbox.com'
                ];

                if (!emailFormatRe.test(value)) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    if (feedbackElement) {
                        feedbackElement.textContent = 'Please enter a valid email address.';
                    }
                    return;
                } else if (disposableDomains.includes(domain)) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    if (feedbackElement) {
                        feedbackElement.textContent = 'Temporary/disposable email addresses are not allowed.';
                    }
                    return;
                }
            }
            
            // Validate length
            if (field.minLength && value.length < field.minLength) {
                isValid = false;
                field.classList.add('is-invalid');
                if (feedbackElement) {
                    feedbackElement.textContent = `Minimum ${field.minLength} characters required.`;
                }
                return;
            }
            
            if (field.maxLength && value.length > field.maxLength) {
                isValid = false;
                field.classList.add('is-invalid');
                if (feedbackElement) {
                    feedbackElement.textContent = `Maximum ${field.maxLength} characters allowed.`;
                }
                return;
            }
        });
        
        return isValid;
    }

    /**
     * Check honeypot field
     */
    checkHoneypot() {
        const honeypot = this.formElement.querySelector('[name="website"]');
        return !honeypot || !honeypot.value;
    }

    /**
     * Show message to user
     */
    showMessage(message, type = 'info') {
        if (!this.messageElement) return;
        
        const alertClass = type === 'success' ? 'alert-success' : 
                          type === 'error' ? 'alert-danger' : 
                          'alert-info';
        
        this.messageElement.className = `alert ${alertClass}`;
        this.messageElement.innerHTML = `
            <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2"></i>
            ${this.sanitizeInput(message)}
        `;
        this.messageElement.style.display = 'block';
        
        // Scroll to message
        this.messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /**
     * Hide message
     */
    hideMessage() {
        if (this.messageElement) {
            this.messageElement.style.display = 'none';
        }
    }

    /**
     * Disable submit button
     */
    disableSubmit(disable = true) {
        if (!this.submitButton) return;
        
        if (disable) {
            this.submitButton.disabled = true;
            this.submitButton.innerHTML = `
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Sending...
            `;
        } else {
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'Send Message';
        }
    }

    /**
     * Handle form submission
     */
    async handleSubmit(e) {
        e.preventDefault();
        
        // Hide previous messages
        this.hideMessage();
        
        // Validate form
        if (!this.validateForm()) {
            this.showMessage('Please correct the errors in the form.', 'error');
            return;
        }
        
        // Check honeypot
        if (!this.checkHoneypot()) {
            // Silently reject bot submissions
            this.showMessage('Thank you for your message. We will get back to you soon!', 'success');
            this.formElement.reset();
            return;
        }
        
        // Check rate limiting
        if (!this.checkRateLimit()) {
            this.showMessage('Too many submissions. Please try again later.', 'error');
            return;
        }
        
        // Disable submit button
        this.disableSubmit(true);
        
        // Get form data
        const formData = {
            name: this.sanitizeInput(this.formElement.querySelector('[name="name"]').value),
            email: this.sanitizeInput(this.formElement.querySelector('[name="email"]').value),
            subject: this.sanitizeInput(this.formElement.querySelector('[name="subject"]').value),
            message: this.sanitizeInput(this.formElement.querySelector('[name="message"]').value),
            csrf_token: sessionStorage.getItem('csrf_token') || ''
        };
        
        try {
            // Submit to server
            const result = await this.submitToServer(formData);
            
            // Record submission for rate limiting
            this.recordSubmission();
            
            // Show fixed success message to prevent XSS
            this.showMessage('Thank you for your message. We will get back to you soon!', 'success');
            
            // Reset form
            this.formElement.reset();
            
            // Remove validation classes
            this.formElement.querySelectorAll('.is-invalid').forEach(el => {
                el.classList.remove('is-invalid');
            });
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('An error occurred. Please try again later or email directly.', 'error');
        } finally {
            // Re-enable submit button
            this.disableSubmit(false);
        }
    }

    /**
     * Submit form to server
     */
    async submitToServer(formData) {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': formData.csrf_token
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Submission failed');
        }

        return await response.json();
    }

    /**
     * Initialize form handler
     */
    init() {
        this.formElement = document.getElementById('contactForm');
        this.submitButton = document.getElementById('submitButton');
        this.messageElement = document.getElementById('formMessage');
        
        if (!this.formElement) return;
        
        // Attach submit event
        this.formElement.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation on blur
        const fields = this.formElement.querySelectorAll('[required]');
        fields.forEach(field => {
            field.addEventListener('blur', () => {
                if (field.value.trim()) {
                    this.validateForm();
                }
            });
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const handler = new ContactFormHandler();
        handler.init();
    });
} else {
    const handler = new ContactFormHandler();
    handler.init();
}
