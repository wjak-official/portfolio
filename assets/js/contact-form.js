'use strict';

/**
 * Secure Contact Form Handler
 * Includes validation, sanitization, rate limiting, CSRF protection, and bot challenge.
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
        // CSRF token stored in-memory only (never persisted to storage)
        this.csrfToken = null;
        // Bot-challenge numbers, generated fresh on init and after each failed attempt
        this.challengeA = 0;
        this.challengeB = 0;
    }

    // -------------------------------------------------------------------------
    // CSRF token lifecycle
    // -------------------------------------------------------------------------

    /**
     * Fetch a fresh CSRF token from the API and store it in memory.
     * Includes the session cookie via credentials:'include' so the backend
     * can issue and later validate the double-submit cookie pair.
     *
     * @returns {Promise<string|null>} The token string, or null on failure.
     */
    async fetchCsrfToken() {
        try {
            const response = await fetch('https://api.ifreelance4u.com/api/csrf-token', {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                console.warn('CSRF token fetch failed with status:', response.status);
                return null;
            }
            const data = await response.json();
            this.csrfToken = data.csrfToken || null;
            return this.csrfToken;
        } catch (err) {
            console.warn('CSRF token fetch error:', err);
            return null;
        }
    }

    // -------------------------------------------------------------------------
    // Bot challenge
    // -------------------------------------------------------------------------

    /**
     * Generate two random numbers (1–10) for the math challenge and update
     * the visible labels in the form.
     */
    generateChallenge() {
        this.challengeA = Math.floor(Math.random() * 10) + 1;
        this.challengeB = Math.floor(Math.random() * 10) + 1;
        const num1El = document.getElementById('challengeNum1');
        const num2El = document.getElementById('challengeNum2');
        if (num1El) num1El.textContent = this.challengeA;
        if (num2El) num2El.textContent = this.challengeB;
        // Clear any previous answer
        const challengeInput = this.formElement.querySelector('[name="challenge"]');
        if (challengeInput) {
            challengeInput.value = '';
            challengeInput.classList.remove('is-invalid');
        }
    }

    /**
     * Validate the user's answer to the math challenge.
     * @returns {boolean}
     */
    checkChallenge() {
        const challengeInput = this.formElement.querySelector('[name="challenge"]');
        if (!challengeInput) return true; // field absent — skip check
        const answer = parseInt(challengeInput.value, 10);
        return !isNaN(answer) && answer >= 0 && answer === (this.challengeA + this.challengeB);
    }

    // -------------------------------------------------------------------------
    // Input sanitization and validation
    // -------------------------------------------------------------------------

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

    // -------------------------------------------------------------------------
    // Rate limiting
    // -------------------------------------------------------------------------

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

    // -------------------------------------------------------------------------
    // Form validation
    // -------------------------------------------------------------------------

    /**
     * Validate form fields
     */
    validateForm() {
        let isValid = true;
        const fields = this.formElement.querySelectorAll('[required]');
        
        fields.forEach(field => {
            // Skip the challenge input — validated separately
            if (field.name === 'challenge') return;

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

    // -------------------------------------------------------------------------
    // Honeypot
    // -------------------------------------------------------------------------

    /**
     * Check honeypot field
     */
    checkHoneypot() {
        const honeypot = this.formElement.querySelector('[name="website"]');
        return !honeypot || !honeypot.value;
    }

    // -------------------------------------------------------------------------
    // UI helpers
    // -------------------------------------------------------------------------

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

    // -------------------------------------------------------------------------
    // Form submission
    // -------------------------------------------------------------------------

    /**
     * Handle form submission
     */
    async handleSubmit(e) {
        e.preventDefault();
        
        // Hide previous messages
        this.hideMessage();
        
        // Validate form fields
        if (!this.validateForm()) {
            this.showMessage('Please correct the errors in the form.', 'error');
            return;
        }

        // Validate bot challenge
        if (!this.checkChallenge()) {
            const challengeInput = this.formElement.querySelector('[name="challenge"]');
            if (challengeInput) {
                challengeInput.classList.add('is-invalid');
                const feedback = challengeInput.nextElementSibling;
                if (feedback && feedback.classList.contains('invalid-feedback')) {
                    feedback.textContent = 'Incorrect answer. Please try again.';
                }
            }
            this.showMessage('Please answer the verification question correctly.', 'error');
            this.generateChallenge();
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

        // Ensure we have a CSRF token before submitting
        if (!this.csrfToken) {
            const token = await this.fetchCsrfToken();
            if (!token) {
                this.showMessage('Unable to secure your request. Please refresh the page and try again.', 'error');
                return;
            }
        }
        
        // Disable submit button
        this.disableSubmit(true);
        
        // Collect form data
        const formData = {
            name: this.sanitizeInput(this.formElement.querySelector('[name="name"]').value),
            email: this.sanitizeInput(this.formElement.querySelector('[name="email"]').value),
            subject: this.sanitizeInput(this.formElement.querySelector('[name="subject"]').value),
            message: this.sanitizeInput(this.formElement.querySelector('[name="message"]').value),
            challenge_a: this.challengeA,
            challenge_b: this.challengeB,
            challenge_answer: parseInt(this.formElement.querySelector('[name="challenge"]').value, 10)
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

            // Generate a fresh challenge for the next potential submission
            this.generateChallenge();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('An error occurred. Please try again later or email directly.', 'error');
            // Regenerate challenge so the user can try again
            this.generateChallenge();
        } finally {
            // Re-enable submit button
            this.disableSubmit(false);
        }
    }

    /**
     * Submit form data to the API.
     * Credentials are included so the CSRF cookie is sent alongside the header.
     * On a 403 (likely CSRF expiry) the token is refreshed and the request is
     * retried exactly once before surfacing an error to the user.
     */
    async submitToServer(formData) {
        const makeRequest = (token) => fetch('https://api.ifreelance4u.com/api/contact', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': token || ''
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                challenge_a: formData.challenge_a,
                challenge_b: formData.challenge_b,
                challenge_answer: formData.challenge_answer
            })
        });

        let response = await makeRequest(this.csrfToken);

        // On 403, attempt a single token refresh and retry
        if (response.status === 403) {
            const freshToken = await this.fetchCsrfToken();
            if (!freshToken) {
                throw new Error('Unable to refresh security token. Please check your connection and try again.');
            }
            response = await makeRequest(freshToken);
        }

        if (!response.ok) {
            let errorMessage = 'Submission failed';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch {
                errorMessage = 'Server returned an invalid response';
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    }

    // -------------------------------------------------------------------------
    // Initialization
    // -------------------------------------------------------------------------

    /**
     * Initialize form handler
     */
    init() {
        this.formElement = document.getElementById('contactForm');
        this.submitButton = document.getElementById('submitButton');
        this.messageElement = document.getElementById('formMessage');
        
        if (!this.formElement) return;

        // Bootstrap CSRF token in the background so it is ready before the
        // user submits; failures are handled gracefully at submit time.
        this.fetchCsrfToken();

        // Generate the initial bot-challenge question
        this.generateChallenge();
        
        // Attach submit event
        this.formElement.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation on blur (skip honeypot and challenge fields)
        const fields = this.formElement.querySelectorAll('[required]');
        fields.forEach(field => {
            if (field.name === 'website' || field.name === 'challenge') return;
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

