// Portfolio data and functionality
class PortfolioSite {
    constructor() {
        this.projects = [];
        this.currentProject = null;
        this.currentImageIndex = 0;

        this.init();
    }

    async init() {
        await this.loadProjects();
        this.renderPortfolioGrid();
        this.setupEventListeners();
        this.setupNavigation();
        this.setupScrollEffects();
    }

    async loadProjects() {
        try {
            const response = await fetch('data/projects.json');
            this.projects = await response.json();
        } catch (error) {
            console.error('Error loading projects:', error);
            this.projects = [];
        }
    }

    renderPortfolioGrid() {
        const grid = document.getElementById('portfolio-grid');
        if (!grid) return;

        grid.innerHTML = this.projects.map(project => `
            <div class="portfolio-item" data-project-id="${project.id}">
                <div class="portfolio-link">
                    <div class="caption">
                        <div class="caption-content">
                            <h4>${project.client}</h4>
                        </div>
                    </div>
                    <img src="assets/images/${project.thumbnail}" alt="${project.title}">
                </div>
                <div class="caption-content">
                    <div class="thumb_title">${project.client}</div>
                    <div class="thumb_tag">${project.tags.join(', ')}</div>
                </div>
            </div>
        `).join('');

        // Add click event listeners to portfolio items
        grid.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const projectId = item.getAttribute('data-project-id');
                this.openModal(projectId);
            });
        });
    }

    openModal(projectId) {
        this.currentProject = this.projects.find(p => p.id === projectId);
        if (!this.currentProject) return;

        this.currentImageIndex = 0;
        this.renderModal();
        this.showModal();
    }

    renderModal() {
        const modalContent = document.getElementById('modal-content');
        if (!modalContent || !this.currentProject) return;

        const project = this.currentProject;

        modalContent.innerHTML = `
            <!-- Close button -->
            <button id="modal-close" style="position: absolute; top: 1rem; right: 1rem; z-index: 10; background: white; border: none; padding: 0.5rem; border-radius: 50%; cursor: pointer;">
                ×
            </button>

            <!-- Content container -->
            <div class="modal-content-flex">
                <!-- Image gallery side -->
                <div class="modal-image-side">
                    ${project.images && project.images.length > 0 ? `
                        <img id="modal-main-image"
                             src="assets/images/${project.images[this.currentImageIndex]}"
                             alt="${project.title}">

                        ${project.images.length > 1 ? `
                            <!-- Navigation arrows -->
                            <button id="prev-image" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); background: white; border: none; padding: 0.5rem; border-radius: 50%; cursor: pointer;">
                                ‹
                            </button>
                            <button id="next-image" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); background: white; border: none; padding: 0.5rem; border-radius: 50%; cursor: pointer;">
                                ›
                            </button>

                            <!-- Image indicators -->
                            <div style="position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.5rem;">
                                ${project.images.map((_, index) => `
                                    <button style="width: 12px; height: 12px; border-radius: 50%; border: none; cursor: pointer; background: ${index === this.currentImageIndex ? '#58A6A2' : 'rgba(255,255,255,0.5)'};"
                                            data-image-index="${index}"></button>
                                `).join('')}
                            </div>
                        ` : ''}
                    ` : `
                        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0;">
                            <p>No images available</p>
                        </div>
                    `}
                </div>

                <!-- Project details side -->
                <div class="modal-detail-side">
                    <!-- Project header -->
                    <div style="margin-bottom: 2rem;">
                        <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">${project.title}</h2>
                        <p style="color: #58A6A2; font-weight: 600; margin-bottom: 0.25rem;">${project.role}</p>
                        <p style="color: #666; font-size: 0.875rem;">${project.projectDate}</p>
                    </div>

                    <!-- Client logo if available -->
                    ${project.clientLogo ? `
                        <div style="margin-bottom: 2rem;">
                            <img src="assets/images/${project.clientLogo}" alt="${project.client}" style="height: 4rem; width: auto;">
                        </div>
                    ` : ''}

                    <!-- Tags -->
                    <div style="margin-bottom: 2rem;">
                        <h4 style="font-size: 0.875rem; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">Skills</h4>
                        <div>
                            ${project.tags.map(tag => `
                                <span class="project-tag">${tag}</span>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Description -->
                    <div>
                        <h4 style="font-size: 0.875rem; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">Description</h4>
                        <p style="color: #666; line-height: 1.6;">${project.description}</p>
                    </div>
                </div>
            </div>
        `;

        // Setup modal event listeners
        this.setupModalEventListeners();
    }

    setupModalEventListeners() {
        // Close button
        const closeBtn = document.getElementById('modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Image navigation
        const prevBtn = document.getElementById('prev-image');
        const nextBtn = document.getElementById('next-image');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousImage());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextImage());
        }

        // Image indicators
        document.querySelectorAll('[data-image-index]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-image-index'));
                this.setCurrentImage(index);
            });
        });
    }

    previousImage() {
        if (!this.currentProject || !this.currentProject.images) return;

        this.currentImageIndex = this.currentImageIndex > 0
            ? this.currentImageIndex - 1
            : this.currentProject.images.length - 1;

        this.updateModalImage();
    }

    nextImage() {
        if (!this.currentProject || !this.currentProject.images) return;

        this.currentImageIndex = this.currentImageIndex < this.currentProject.images.length - 1
            ? this.currentImageIndex + 1
            : 0;

        this.updateModalImage();
    }

    setCurrentImage(index) {
        if (!this.currentProject || !this.currentProject.images) return;

        this.currentImageIndex = index;
        this.updateModalImage();
    }

    updateModalImage() {
        const mainImage = document.getElementById('modal-main-image');
        if (mainImage && this.currentProject && this.currentProject.images) {
            mainImage.src = `assets/images/${this.currentProject.images[this.currentImageIndex]}`;
        }

        // Update indicators
        document.querySelectorAll('[data-image-index]').forEach((btn, index) => {
            if (index === this.currentImageIndex) {
                btn.style.background = '#58A6A2';
            } else {
                btn.style.background = 'rgba(255,255,255,0.5)';
            }
        });
    }

    showModal() {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.classList.remove('hidden');
            overlay.classList.add('show');
            document.body.classList.add('modal-open');

            // Prevent background scroll
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
            overlay.classList.remove('show');
            document.body.classList.remove('modal-open');

            // Restore background scroll
            document.body.style.overflow = '';
        }

        this.currentProject = null;
        this.currentImageIndex = 0;
    }

    setupEventListeners() {
        // Modal overlay click to close
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeModal();
                }
            });
        }

        // Keyboard event listeners
        document.addEventListener('keydown', (e) => {
            if (this.currentProject) {
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');

                // Animate hamburger menu
                const line1 = document.getElementById('line1');
                const line2 = document.getElementById('line2');
                const line3 = document.getElementById('line3');

                if (!mobileMenu.classList.contains('hidden')) {
                    line1.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    line2.style.opacity = '0';
                    line3.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    line1.style.transform = '';
                    line2.style.opacity = '';
                    line3.style.transform = '';
                }
            });
        }

        // Close mobile menu when clicking links
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');

                // Reset hamburger menu
                const line1 = document.getElementById('line1');
                const line2 = document.getElementById('line2');
                const line3 = document.getElementById('line3');

                line1.style.transform = '';
                line2.style.opacity = '';
                line3.style.transform = '';
            });
        });
    }

    setupNavigation() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Update active nav links based on scroll position
        const updateActiveNavLinks = () => {
            const sections = ['about', 'portfolio'];
            const scrollPos = window.scrollY + 100;

            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                const navLink = document.querySelector(`a[href="#${sectionId}"]`);

                if (section && navLink) {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;

                    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                        navLink.classList.add('active');
                    } else {
                        navLink.classList.remove('active');
                    }
                }
            });
        };

        window.addEventListener('scroll', updateActiveNavLinks);
        updateActiveNavLinks(); // Initial call
    }

    setupScrollEffects() {
        const nav = document.getElementById('mainNav');
        const scrollTopButton = document.getElementById('scroll-top');

        const handleScroll = () => {
            const scrolled = window.scrollY > 50;

            // Nav background effect
            if (nav) {
                if (scrolled) {
                    nav.classList.add('bg-white', 'shadow-md');
                    nav.classList.remove('bg-transparent');
                } else {
                    nav.classList.remove('bg-white', 'shadow-md');
                    nav.classList.add('bg-transparent');
                }
            }

            // Scroll to top button
            if (scrollTopButton) {
                if (window.scrollY > 300) {
                    scrollTopButton.classList.add('show');
                } else {
                    scrollTopButton.classList.remove('show');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        // Scroll to top button click
        if (scrollTopButton) {
            scrollTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}

// Initialize the portfolio site when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioSite();
});