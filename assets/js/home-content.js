'use strict';

/**
 * Home Page Content Loader
 * Loads and displays hero, expertise, and stats sections
 */

class HomeContentLoader {
    constructor() {
        this.contentData = null;
    }

    /**
     * Sanitize HTML
     */
    sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
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
     * Load hero section
     */
    loadHeroSection() {
        if (!this.contentData || !this.contentData.hero) return;

        const hero = this.contentData.hero;
        
        // Update greeting
        const greeting = document.getElementById('heroGreeting');
        if (greeting) {
            greeting.textContent = this.sanitizeHTML(hero.greeting);
        }

        // Update name
        const name = document.getElementById('heroName');
        if (name) {
            name.textContent = this.sanitizeHTML(hero.name);
        }

        // Update tagline
        const tagline = document.getElementById('heroTagline');
        if (tagline) {
            tagline.textContent = this.sanitizeHTML(hero.tagline);
        }

        // Update description
        const description = document.getElementById('heroDescription');
        if (description) {
            description.textContent = this.sanitizeHTML(hero.description);
        }

        // Update CTA buttons
        if (hero.cta) {
            const primaryBtn = document.getElementById('heroPrimaryBtn');
            if (primaryBtn && hero.cta.primary) {
                primaryBtn.textContent = this.sanitizeHTML(hero.cta.primary.text);
                primaryBtn.href = this.sanitizeHTML(hero.cta.primary.url);
            }

            const secondaryBtn = document.getElementById('heroSecondaryBtn');
            if (secondaryBtn && hero.cta.secondary) {
                secondaryBtn.textContent = this.sanitizeHTML(hero.cta.secondary.text);
                secondaryBtn.href = this.sanitizeHTML(hero.cta.secondary.url);
            }
        }
    }

    /**
     * Load expertise section
     */
    loadExpertiseSection() {
        if (!this.contentData || !this.contentData.expertise) return;

        const expertiseContainer = document.getElementById('expertiseCards');
        if (!expertiseContainer) return;

        expertiseContainer.innerHTML = '';

        this.contentData.expertise.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-3 mb-4';

            const card = document.createElement('div');
            card.className = 'card text-center p-4';

            const icon = document.createElement('i');
            icon.className = `bi ${this.sanitizeHTML(item.icon)} card-icon`;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body p-0';

            const title = document.createElement('h5');
            title.className = 'card-title fw-bold';
            title.textContent = this.sanitizeHTML(item.title);

            const description = document.createElement('p');
            description.className = 'card-text text-muted';
            description.textContent = this.sanitizeHTML(item.description);

            cardBody.appendChild(title);
            cardBody.appendChild(description);
            card.appendChild(icon);
            card.appendChild(cardBody);
            col.appendChild(card);
            expertiseContainer.appendChild(col);
        });
    }

    /**
     * Load stats section
     */
    loadStatsSection() {
        if (!this.contentData || !this.contentData.stats) return;

        const statsContainer = document.getElementById('statsCards');
        if (!statsContainer) return;

        statsContainer.innerHTML = '';

        this.contentData.stats.forEach(stat => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-3';

            const statCard = document.createElement('div');
            statCard.className = 'stat-card';

            const icon = document.createElement('i');
            icon.className = `bi ${this.sanitizeHTML(stat.icon)} stat-icon`;

            const number = document.createElement('span');
            number.className = 'stat-number';
            number.textContent = this.sanitizeHTML(stat.number);

            const label = document.createElement('span');
            label.className = 'stat-label';
            label.textContent = this.sanitizeHTML(stat.label);

            statCard.appendChild(icon);
            statCard.appendChild(number);
            statCard.appendChild(label);
            col.appendChild(statCard);
            statsContainer.appendChild(col);
        });
    }

    /**
     * Initialize and load all sections
     */
    async init() {
        try {
            await this.loadContent();
            if (this.contentData) {
                this.loadHeroSection();
                this.loadExpertiseSection();
                this.loadStatsSection();
            }
        } catch (error) {
            console.error('Error initializing home content:', error);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const loader = new HomeContentLoader();
        loader.init();
    });
} else {
    const loader = new HomeContentLoader();
    loader.init();
}
