'use strict';

/**
 * Demo contact form handler.
 * Keeps the portfolio preview interactive without sending data anywhere.
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
    }

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

    showMessage(message, type = 'info') {
        if (!this.messageElement) return;

        const alertClass = type === 'success'
            ? 'alert-success'
            : type === 'error'
                ? 'alert-danger'
                : 'alert-info';

        const iconClass = type === 'success'
            ? 'bi-check-circle-fill'
            : type === 'error'
                ? 'bi-exclamation-triangle-fill'
                : 'bi-info-circle-fill';

        this.messageElement.className = `alert ${alertClass}`;
        this.messageElement.innerHTML = `
            <i class="bi ${iconClass} me-2"></i>
            ${this.sanitizeInput(message)}
        `;
        this.messageElement.style.display = 'block';
        this.messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    hideMessage() {
        if (this.messageElement) {
            this.messageElement.style.display = 'none';
            this.messageElement.textContent = '';
        }
    }

    isValidEmail(email) {
        if (typeof email !== 'string') {
            return false;
        }

        const value = email.trim();
        if (value === '') {
            return false;
        }

        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Za-z0-9\u00A1-\uFFFF](?:[A-Za-z0-9\u00A1-\uFFFF-]{0,61}[A-Za-z0-9\u00A1-\uFFFF])?\.)+[A-Za-z\u00A1-\uFFFF]{2,}$/u;
        if (!re.test(value)) {
            return false;
        }

        const domain = value.split('@')[1]?.toLowerCase();
        return !ContactFormHandler.DISPOSABLE_DOMAINS.includes(domain);
    }

    validateForm() {
        let isValid = true;
        const fields = this.formElement.querySelectorAll('[required]');

        fields.forEach((field) => {
            const value = field.value.trim();
            const feedbackElement = field.nextElementSibling;

            field.classList.remove('is-invalid');
            if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                feedbackElement.textContent = '';
            }

            if (!value) {
                isValid = false;
                field.classList.add('is-invalid');
                if (feedbackElement) {
                    feedbackElement.textContent = 'This field is required.';
                }
                return;
            }

            if (field.type === 'email' && !this.isValidEmail(value)) {
                isValid = false;
                field.classList.add('is-invalid');
                if (feedbackElement) {
                    feedbackElement.textContent = 'Please enter a valid non-temporary email address.';
                }
                return;
            }

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
            }
        });

        return isValid;
    }

    disableSubmit(disable = true) {
        if (!this.submitButton) return;

        if (disable) {
            this.submitButton.disabled = true;
            this.submitButton.innerHTML = `
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Previewing...
            `;
        } else {
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'Preview Submission';
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.hideMessage();

        if (!this.validateForm()) {
            this.showMessage('Please correct the highlighted fields to preview the form state.', 'error');
            return;
        }

        this.disableSubmit(true);

        const previewDelayMs = 500;
        window.setTimeout(() => {
            this.disableSubmit(false);
            this.showMessage('Demo only: no message was sent or stored. This form is here to preview the portfolio experience.', 'info');
        }, previewDelayMs);
    }

    init() {
        this.formElement = document.getElementById('contactForm');
        this.submitButton = document.getElementById('submitButton');
        this.messageElement = document.getElementById('formMessage');

        if (!this.formElement) return;

        this.formElement.addEventListener('submit', (event) => this.handleSubmit(event));

        const fields = this.formElement.querySelectorAll('[required]');
        fields.forEach((field) => {
            field.addEventListener('blur', () => {
                if (field.value.trim()) {
                    this.validateForm();
                }
            });
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const handler = new ContactFormHandler();
        handler.init();
    });
} else {
    const handler = new ContactFormHandler();
    handler.init();
}
