'use strict';

/**
 * Component Loader with Sanitization
 * Dynamically loads header and footer components with security
 */

class ComponentLoader {
    constructor() {
        this.contentData = null;
        this.currentPage = this.getCurrentPage();
    }

    /**
     * Get current page name for active navigation
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        return page;
    }

    /**
     * Sanitize HTML to prevent XSS
     */
    sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    /**
     * Load JSON content data
     */
    async loadContentData() {
        try {
            const response = await fetch('/data/content.json');
            if (!response.ok) {
                throw new Error('Failed to load content data');
            }
            this.contentData = await response.json();
            return this.contentData;
        } catch (error) {
            console.error('Error loading content data:', error);
            return null;
        }
    }

    /**
     * Load header component
     */
    async loadHeader() {
        try {
            const response = await fetch('/includes/header.html');
            if (!response.ok) {
                throw new Error('Failed to load header');
            }
            const html = await response.text();
            const headerElement = document.getElementById('header');
            if (headerElement) {
                headerElement.innerHTML = html;
                await this.populateNavigation();
            }
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    /**
     * Populate navigation with data from JSON
     */
    async populateNavigation() {
        if (!this.contentData) {
            await this.loadContentData();
        }

        if (!this.contentData) return;

        // Update brand name
        const brandName = document.getElementById('brandName');
        if (brandName && this.contentData.site) {
            brandName.textContent = this.sanitizeHTML(this.contentData.site.name);
        }

        // Populate navigation items
        const navItems = document.getElementById('navItems');
        if (navItems && this.contentData.navigation) {
            navItems.innerHTML = '';
            this.contentData.navigation.forEach(item => {
                const li = document.createElement('li');
                li.className = 'nav-item';
                
                const a = document.createElement('a');
                a.className = 'nav-link';
                if (item.url === this.currentPage) {
                    a.classList.add('active');
                    a.setAttribute('aria-current', 'page');
                }
                a.href = this.sanitizeHTML(item.url);
                a.textContent = this.sanitizeHTML(item.name);
                
                li.appendChild(a);
                navItems.appendChild(li);
            });
        }
    }

    /**
     * Load footer component
     */
    async loadFooter() {
        try {
            const response = await fetch('/includes/footer.html');
            if (!response.ok) {
                throw new Error('Failed to load footer');
            }
            const html = await response.text();
            const footerElement = document.getElementById('footer');
            if (footerElement) {
                footerElement.innerHTML = html;
                await this.populateFooter();
            }
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }

    /**
     * Populate footer with data from JSON
     */
    async populateFooter() {
        if (!this.contentData) {
            await this.loadContentData();
        }

        if (!this.contentData) return;

        // Update brand name
        const footerBrandName = document.getElementById('footerBrandName');
        if (footerBrandName && this.contentData.site) {
            footerBrandName.textContent = this.sanitizeHTML(this.contentData.site.name);
        }

        // Update description
        const footerDescription = document.getElementById('footerDescription');
        if (footerDescription && this.contentData.site) {
            footerDescription.textContent = this.sanitizeHTML(this.contentData.site.description);
        }

        // Populate quick links
        const footerLinks = document.getElementById('footerLinks');
        if (footerLinks && this.contentData.navigation) {
            footerLinks.innerHTML = '';
            this.contentData.navigation.forEach(item => {
                const li = document.createElement('li');
                li.className = 'mb-2';
                
                const a = document.createElement('a');
                a.href = this.sanitizeHTML(item.url);
                a.textContent = this.sanitizeHTML(item.name);
                a.className = 'text-decoration-none';
                
                li.appendChild(a);
                footerLinks.appendChild(li);
            });
        }

        // Populate social links
        const socialLinks = document.getElementById('socialLinks');
        if (socialLinks && this.contentData.social) {
            socialLinks.innerHTML = '';
            this.contentData.social.forEach(social => {
                const a = document.createElement('a');
                a.href = this.sanitizeHTML(social.url);
                a.className = 'social-link';
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.setAttribute('aria-label', this.sanitizeHTML(social.name));
                
                const i = document.createElement('i');
                i.className = `bi ${this.sanitizeHTML(social.icon)}`;
                
                a.appendChild(i);
                socialLinks.appendChild(a);
            });
        }

        // Update copyright
        const copyrightText = document.getElementById('copyrightText');
        if (copyrightText && this.contentData.footer) {
            copyrightText.textContent = this.sanitizeHTML(this.contentData.footer.copyright);
        }

        // Populate policy links
        const footerPolicyLinks = document.getElementById('footerPolicyLinks');
        if (footerPolicyLinks && this.contentData.footer && this.contentData.footer.links) {
            footerPolicyLinks.innerHTML = '';
            this.contentData.footer.links.forEach((link, index) => {
                const li = document.createElement('li');
                li.className = 'list-inline-item';
                
                if (index > 0) {
                    const separator = document.createElement('span');
                    separator.className = 'text-muted';
                    separator.textContent = ' | ';
                    footerPolicyLinks.appendChild(separator);
                }
                
                const a = document.createElement('a');
                a.href = this.sanitizeHTML(link.url);
                a.textContent = this.sanitizeHTML(link.name);
                a.className = 'text-decoration-none small';
                
                li.appendChild(a);
                footerPolicyLinks.appendChild(li);
            });
        }
    }

    /**
     * Initialize all components
     */
    async init() {
        await this.loadContentData();
        await Promise.all([
            this.loadHeader(),
            this.loadFooter()
        ]);
    }
}

// Initialize component loader when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const loader = new ComponentLoader();
        loader.init();
    });
} else {
    const loader = new ComponentLoader();
    loader.init();
}
