'use strict';

/**
 * Services Page Content Loader
 * Loads and displays service offerings
 */

class ServicesContentLoader {
    constructor() {
        this.contentData = null;
    }

    /**
     * Sanitize HTML using DOMPurify
     */
    sanitizeHTML(str) {
        return DOMPurify.sanitize(str, { ALLOWED_TAGS: [] });
    }

    /**
     * Load content data
     */
    async loadContent() {
        try {
            const response = await fetch('/data/content.json');
            if (!response.ok) {
                throw new Error('Failed to load content');
            }
            this.contentData = await response.json();
            return this.contentData;
        } catch (error) {
            console.error('Error loading content:', error);
            return null;
        }
    }

    /**
     * Load services
     */
    loadServices() {
        if (!this.contentData || !this.contentData.services) return;

        const servicesContainer = document.getElementById('servicesContainer');
        if (!servicesContainer) return;

        servicesContainer.innerHTML = '';

        this.contentData.services.forEach(service => {
            const col = document.createElement('div');
            col.className = 'col-lg-6 mb-4';

            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';

            // Icon
            const icon = document.createElement('i');
            icon.className = `bi ${this.sanitizeHTML(service.icon)} service-icon`;

            // Title
            const title = document.createElement('h3');
            title.className = 'fw-bold mb-3';
            title.textContent = this.sanitizeHTML(service.title);

            // Short description
            const shortDesc = document.createElement('p');
            shortDesc.className = 'lead text-muted mb-3';
            shortDesc.textContent = this.sanitizeHTML(service.shortDescription);

            // Full description
            const fullDesc = document.createElement('p');
            fullDesc.className = 'mb-4';
            fullDesc.textContent = this.sanitizeHTML(service.fullDescription);

            // Features list
            const featuresTitle = document.createElement('h5');
            featuresTitle.className = 'fw-bold mb-3';
            featuresTitle.textContent = 'Key Features:';

            const featuresList = document.createElement('ul');
            featuresList.className = 'service-features mb-4';

            service.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = this.sanitizeHTML(feature);
                featuresList.appendChild(li);
            });

            // Pricing and timeline
            const infoDiv = document.createElement('div');
            infoDiv.className = 'd-flex justify-content-between align-items-center flex-wrap gap-3 mt-4';

            const pricingDiv = document.createElement('div');
            const pricingLabel = document.createElement('small');
            pricingLabel.className = 'text-muted d-block';
            pricingLabel.textContent = 'Pricing:';
            const pricingValue = document.createElement('strong');
            pricingValue.className = 'text-primary';
            pricingValue.textContent = this.sanitizeHTML(service.pricing);
            pricingDiv.appendChild(pricingLabel);
            pricingDiv.appendChild(pricingValue);

            const timelineDiv = document.createElement('div');
            const timelineLabel = document.createElement('small');
            timelineLabel.className = 'text-muted d-block';
            timelineLabel.textContent = 'Timeline:';
            const timelineValue = document.createElement('strong');
            timelineValue.textContent = this.sanitizeHTML(service.timeline);
            timelineDiv.appendChild(timelineLabel);
            timelineDiv.appendChild(timelineValue);

            const ctaBtn = document.createElement('a');
            ctaBtn.href = 'contact.html';
            ctaBtn.className = 'btn btn-primary';
            ctaBtn.textContent = 'Get Started';

            infoDiv.appendChild(pricingDiv);
            infoDiv.appendChild(timelineDiv);
            infoDiv.appendChild(ctaBtn);

            // Assemble card
            serviceCard.appendChild(icon);
            serviceCard.appendChild(title);
            serviceCard.appendChild(shortDesc);
            serviceCard.appendChild(fullDesc);
            serviceCard.appendChild(featuresTitle);
            serviceCard.appendChild(featuresList);
            serviceCard.appendChild(infoDiv);

            col.appendChild(serviceCard);
            servicesContainer.appendChild(col);
        });
    }

    /**
     * Initialize and load all sections
     */
    async init() {
        try {
            await this.loadContent();
            if (this.contentData) {
                this.loadServices();
            }
        } catch (error) {
            console.error('Error initializing services content:', error);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const loader = new ServicesContentLoader();
        loader.init();
    });
} else {
    const loader = new ServicesContentLoader();
    loader.init();
}
