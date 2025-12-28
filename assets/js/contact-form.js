'use strict';

/**
 * Secure Contact Form Handler
 * Includes validation, sanitization, rate limiting, and CSRF protection
 */

class ContactFormHandler {
    constructor() {
        this.formElement = null;
        this.submitButton = null;
        this.messageElement = null;
        this.rateLimitKey = 'contact_form_submissions';
        this.maxSubmissions = 3;
        this.timeWindow = 3600000; // 1 hour in milliseconds
    }

    /**
     * Sanitize input
     * Escapes special HTML characters to mitigate XSS when rendering user input.
     */
    sanitizeInput(input) {
        if (typeof input !== 'string') return '';

        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;'
        };

        return input
            .trim()
            .replace(/[&<>"'\/]/g, function (ch) {
                return map[ch] || ch;
            });
    }

    /**
     * Validate email format
     */
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
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
            if (field.type === 'email' && !this.isValidEmail(value)) {
                isValid = false;
                field.classList.add('is-invalid');
                if (feedbackElement) {
                    feedbackElement.textContent = 'Please enter a valid email address.';
                }
                return;
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
            // In production, this would make an actual API call
            // For now, simulate the submission
            await this.simulateSubmission(formData);
            
            // Record submission for rate limiting
            this.recordSubmission();
            
            // Show success message
            this.showMessage('Thank you for your message! I will get back to you within 24 hours.', 'success');
            
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
     * Simulate form submission (replace with actual API call in production)
     */
    async simulateSubmission(data) {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data:', data);
                resolve();
            }, 1500);
        });
        
        /* Production implementation would look like:
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': data.csrf_token
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Submission failed');
        }
        
        return await response.json();
        */
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
