'use strict';

/**
 * Portfolio Filter and Content Loader
 * Loads portfolio projects and handles filtering
 */

class PortfolioManager {
    constructor() {
        this.contentData = null;
        this.currentFilter = 'all';
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
     * Get unique categories from portfolio
     */
    getCategories() {
        if (!this.contentData || !this.contentData.portfolio) return [];
        
        const categories = new Set();
        this.contentData.portfolio.forEach(project => {
            if (project.category) {
                categories.add(project.category);
            }
        });
        
        return Array.from(categories);
    }

    /**
     * Create filter buttons
     */
    createFilterButtons() {
        const filterContainer = document.getElementById('portfolioFilters');
        if (!filterContainer) return;

        filterContainer.innerHTML = '';

        // Add "All" button
        const allBtn = document.createElement('button');
        allBtn.className = 'filter-btn active';
        allBtn.setAttribute('data-filter', 'all');
        allBtn.textContent = 'All Projects';
        filterContainer.appendChild(allBtn);

        // Add category buttons
        const categories = this.getCategories();
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.setAttribute('data-filter', category);
            btn.textContent = this.sanitizeHTML(category.charAt(0).toUpperCase() + category.slice(1));
            filterContainer.appendChild(btn);
        });

        // Attach event listeners
        this.attachFilterListeners();
    }

    /**
     * Attach filter button event listeners
     */
    attachFilterListeners() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // Get filter value and apply
                const filter = e.target.getAttribute('data-filter');
                this.filterProjects(filter);
            });
        });
    }

    /**
     * Filter portfolio projects
     */
    filterProjects(category) {
        this.currentFilter = category;
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hide');
                item.style.display = 'block';
            } else {
                item.classList.add('hide');
                // Use timeout for smooth animation
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    /**
     * Load portfolio projects
     */
    loadPortfolio() {
        if (!this.contentData || !this.contentData.portfolio) return;

        const portfolioContainer = document.getElementById('portfolioGrid');
        if (!portfolioContainer) return;

        portfolioContainer.innerHTML = '';

        this.contentData.portfolio.forEach(project => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4 portfolio-item';
            col.setAttribute('data-category', this.sanitizeHTML(project.category));

            const card = document.createElement('div');
            card.className = 'portfolio-card';

            // Image
            const img = document.createElement('img');
            img.src = this.sanitizeHTML(project.image);
            img.alt = this.sanitizeHTML(project.title);
            img.loading = 'lazy';

            // Overlay
            const overlay = document.createElement('div');
            overlay.className = 'portfolio-overlay';

            const overlayContent = document.createElement('div');
            overlayContent.className = 'portfolio-overlay-content';

            const title = document.createElement('h4');
            title.className = 'fw-bold mb-2';
            title.textContent = this.sanitizeHTML(project.title);

            const description = document.createElement('p');
            description.className = 'mb-3';
            description.textContent = this.sanitizeHTML(project.description);

            const tagsContainer = document.createElement('div');
            tagsContainer.className = 'mb-3';
            
            project.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'project-tag';
                tagSpan.textContent = this.sanitizeHTML(tag);
                tagsContainer.appendChild(tagSpan);
            });

            const techContainer = document.createElement('div');
            const techLabel = document.createElement('small');
            techLabel.className = 'fw-bold';
            techLabel.textContent = 'Technologies: ';
            techContainer.appendChild(techLabel);
            
            const techText = document.createElement('small');
            techText.textContent = this.sanitizeHTML(project.technologies.join(', '));
            techContainer.appendChild(techText);

            overlayContent.appendChild(title);
            overlayContent.appendChild(description);
            overlayContent.appendChild(tagsContainer);
            overlayContent.appendChild(techContainer);
            overlay.appendChild(overlayContent);

            card.appendChild(img);
            card.appendChild(overlay);
            col.appendChild(card);
            portfolioContainer.appendChild(col);
        });
    }

    /**
     * Initialize and load portfolio
     */
    async init() {
        try {
            await this.loadContent();
            if (this.contentData) {
                this.createFilterButtons();
                this.loadPortfolio();
            }
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const manager = new PortfolioManager();
        manager.init();
    });
} else {
    const manager = new PortfolioManager();
    manager.init();
}
