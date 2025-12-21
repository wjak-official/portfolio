'use strict';

/**
 * About Page Content Loader
 * Loads and displays about content including SAL framework
 */

class AboutContentLoader {
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
     * Load main about content
     */
    loadMainContent() {
        if (!this.contentData || !this.contentData.about) return;

        const about = this.contentData.about;

        // Update page title
        const pageTitle = document.getElementById('aboutTitle');
        if (pageTitle) {
            pageTitle.textContent = this.sanitizeHTML(about.title);
        }

        // Update subtitle
        const pageSubtitle = document.getElementById('aboutSubtitle');
        if (pageSubtitle) {
            pageSubtitle.textContent = this.sanitizeHTML(about.subtitle);
        }

        // Update introduction
        const introduction = document.getElementById('aboutIntroduction');
        if (introduction) {
            introduction.textContent = this.sanitizeHTML(about.introduction);
        }

        // Update journey
        if (about.journey) {
            const journeyTitle = document.getElementById('journeyTitle');
            if (journeyTitle) {
                journeyTitle.textContent = this.sanitizeHTML(about.journey.title);
            }

            const journeyContent = document.getElementById('journeyContent');
            if (journeyContent) {
                journeyContent.textContent = this.sanitizeHTML(about.journey.content);
            }
        }

        // Update drive
        if (about.drive) {
            const driveTitle = document.getElementById('driveTitle');
            if (driveTitle) {
                driveTitle.textContent = this.sanitizeHTML(about.drive.title);
            }

            const driveContent = document.getElementById('driveContent');
            if (driveContent) {
                driveContent.textContent = this.sanitizeHTML(about.drive.content);
            }
        }
    }

    /**
     * Load expertise areas
     */
    loadExpertiseAreas() {
        if (!this.contentData || !this.contentData.about || !this.contentData.about.expertise_areas) return;

        const container = document.getElementById('expertiseAreas');
        if (!container) return;

        container.innerHTML = '';

        this.contentData.about.expertise_areas.forEach(area => {
            const col = document.createElement('div');
            col.className = 'col-md-6 mb-4';

            const card = document.createElement('div');
            card.className = 'card h-100 p-4';

            const title = document.createElement('h4');
            title.className = 'fw-bold mb-3';
            title.textContent = this.sanitizeHTML(area.category);

            const skillsContainer = document.createElement('div');
            skillsContainer.className = 'd-flex flex-wrap gap-2';

            area.skills.forEach(skill => {
                const badge = document.createElement('span');
                badge.className = 'skill-badge';
                badge.textContent = this.sanitizeHTML(skill);
                skillsContainer.appendChild(badge);
            });

            card.appendChild(title);
            card.appendChild(skillsContainer);
            col.appendChild(card);
            container.appendChild(col);
        });
    }

    /**
     * Load SAL Framework
     */
    loadSALFramework() {
        if (!this.contentData || !this.contentData.about || !this.contentData.about.sal_framework) return;

        const sal = this.contentData.about.sal_framework;

        // Update SAL title
        const salTitle = document.getElementById('salTitle');
        if (salTitle) {
            salTitle.textContent = this.sanitizeHTML(sal.title);
        }

        // Update SAL subtitle
        const salSubtitle = document.getElementById('salSubtitle');
        if (salSubtitle) {
            salSubtitle.textContent = this.sanitizeHTML(sal.subtitle);
        }

        // Update SAL description
        const salDescription = document.getElementById('salDescription');
        if (salDescription) {
            salDescription.textContent = this.sanitizeHTML(sal.description);
        }

        // Load pillars
        const pillarsContainer = document.getElementById('salPillars');
        if (!pillarsContainer || !sal.pillars) return;

        pillarsContainer.innerHTML = '';

        sal.pillars.forEach(pillar => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';

            const pillarDiv = document.createElement('div');
            pillarDiv.className = 'sal-pillar';

            const icon = document.createElement('i');
            icon.className = `bi ${this.sanitizeHTML(pillar.icon)}`;
            icon.style.fontSize = '3rem';
            icon.style.color = 'var(--primary-color)';
            icon.style.marginBottom = '1rem';

            const letter = document.createElement('div');
            letter.className = 'sal-letter';
            letter.textContent = this.sanitizeHTML(pillar.letter);

            const word = document.createElement('h4');
            word.className = 'fw-bold mb-3';
            word.textContent = this.sanitizeHTML(pillar.word);

            const description = document.createElement('p');
            description.className = 'text-muted';
            description.textContent = this.sanitizeHTML(pillar.description);

            pillarDiv.appendChild(icon);
            pillarDiv.appendChild(letter);
            pillarDiv.appendChild(word);
            pillarDiv.appendChild(description);
            col.appendChild(pillarDiv);
            pillarsContainer.appendChild(col);
        });
    }

    /**
     * Initialize and load all sections
     */
    async init() {
        try {
            await this.loadContent();
            if (this.contentData) {
                this.loadMainContent();
                this.loadExpertiseAreas();
                this.loadSALFramework();
            }
        } catch (error) {
            console.error('Error initializing about content:', error);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const loader = new AboutContentLoader();
        loader.init();
    });
} else {
    const loader = new AboutContentLoader();
    loader.init();
}
