// 2026 Modern Portfolio - JavaScript
class ModernPortfolio {
    constructor() {
        this.projects = [];
        this.currentProject = null;
        this.currentImageIndex = 0;
        this.isModalOpen = false;

        this.init();
    }

    async init() {
        await this.loadProjects();
        this.renderProjectGrid();
        this.setupEventListeners();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
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

    renderProjectGrid() {
        const grid = document.getElementById('project-grid');
        if (!grid) return;

        grid.innerHTML = this.projects.map((project, index) => `
            <article class="project-card" data-project-id="${project.id}" style="animation-delay: ${index * 0.1}s">
                <div class="project-image-container" style="overflow: hidden;">
                    <img src="assets/images/${project.thumbnail}"
                         alt="${project.title}"
                         class="project-image"
                         loading="lazy">
                </div>
                <div class="project-content">
                    <div class="project-role">${project.role}</div>
                    <h3 class="project-title">${project.client}</h3>
                    <p class="project-description">${project.description.slice(0, 120)}${project.description.length > 120 ? '...' : ''}</p>
                    <div class="project-tags">
                        ${project.tags.slice(0, 3).map(tag => `
                            <span class="project-tag">${tag}</span>
                        `).join('')}
                    </div>
                </div>
            </article>
        `).join('');

        // Add click event listeners with modern event delegation
        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (card) {
                const projectId = card.getAttribute('data-project-id');
                this.openModal(projectId);
            }
        });

        // Intersection Observer for animation on scroll
        this.observeProjectCards();
    }

    observeProjectCards() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationName = 'fadeInUp';
                    entry.target.style.animationFillMode = 'both';
                    entry.target.style.animationDuration = '0.6s';
                    entry.target.style.animationTimingFunction = 'ease-out';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
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
        const modalInfoSection = document.querySelector('.modal-info-section');
        const modalImage = document.getElementById('modal-image');

        if (!modalInfoSection || !modalImage || !this.currentProject) return;

        const project = this.currentProject;

        // Clear existing project classes and add the current project's color class
        modalInfoSection.className = 'modal-info-section';
        if (project.modalId) {
            modalInfoSection.classList.add(`project-${project.modalId}`);
        }

        // Set initial image
        if (project.images && project.images.length > 0) {
            modalImage.src = `assets/images/${project.images[this.currentImageIndex]}`;
            modalImage.alt = project.title;

            // Set CSS custom property for mobile inline image
            modalInfoSection.style.setProperty('--modal-image-url', `url('assets/images/${project.images[this.currentImageIndex]}')`);
        }

        // Render project information
        modalInfoSection.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <div class="text-mono text-accent" style="margin-bottom: 0.5rem; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;">
                    ${project.projectDate}
                </div>
                <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem; line-height: 1.1;">
                    ${project.title}
                </h2>
                <div style="color: var(--color-accent); font-weight: 600; font-size: 1.1rem; margin-bottom: 1rem;">
                    ${project.role}
                </div>
            </div>

            ${project.clientLogo ? `
                <div style="margin-bottom: 2rem;">
                    <img src="assets/images/${project.clientLogo}"
                         alt="${project.client} logo"
                         class="client-logo"
                         style="height: 3rem; width: auto;">
                </div>
            ` : ''}

            <div style="margin-bottom: 2rem;">
                <h4 style="color: var(--color-text-secondary); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem; font-family: var(--font-mono);">
                    Skills & Technologies
                </h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${project.tags.map(tag => `
                        <span class="project-tag">${tag}</span>
                    `).join('')}
                </div>
            </div>

            <div style="margin-bottom: 2rem;">
                <h4 style="color: var(--color-text-secondary); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem; font-family: var(--font-mono);">
                    Project Overview
                </h4>
                <p style="line-height: 1.7; color: var(--color-text-secondary);">
                    ${project.description}
                </p>
            </div>

            ${project.images && project.images.length > 1 ? `
                <div>
                    <h4 style="color: var(--color-text-secondary); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem; font-family: var(--font-mono);">
                        Gallery (${project.images.length} images)
                    </h4>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        ${project.images.map((image, index) => `
                            <button class="image-thumbnail"
                                    data-image-index="${index}"
                                    style="width: 60px; height: 40px; border-radius: 4px; overflow: hidden; border: 2px solid ${index === this.currentImageIndex ? 'var(--color-accent)' : 'var(--color-border)'}; background: none; cursor: pointer; padding: 0;">
                                <img src="assets/images/${image}"
                                     alt="View ${index + 1}"
                                     style="width: 100%; height: 100%; object-fit: cover;">
                            </button>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;

        // Setup image navigation
        this.setupModalImageNavigation();
    }

    setupModalImageNavigation() {
        // Thumbnail clicks
        document.querySelectorAll('.image-thumbnail').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-image-index'));
                this.setCurrentImage(index);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyNavigation.bind(this));
    }

    handleKeyNavigation(e) {
        if (!this.isModalOpen) return;

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
        const modalImage = document.getElementById('modal-image');
        const modalInfoSection = document.querySelector('.modal-info-section');
        if (!modalImage || !this.currentProject || !this.currentProject.images) return;

        // Smooth transition
        modalImage.style.opacity = '0.7';

        setTimeout(() => {
            modalImage.src = `assets/images/${this.currentProject.images[this.currentImageIndex]}`;
            modalImage.style.opacity = '1';

            // Update CSS custom property for mobile inline image
            if (modalInfoSection) {
                modalInfoSection.style.setProperty('--modal-image-url', `url('assets/images/${this.currentProject.images[this.currentImageIndex]}')`);
            }
        }, 150);

        // Update thumbnails
        document.querySelectorAll('.image-thumbnail').forEach((btn, index) => {
            btn.style.borderColor = index === this.currentImageIndex
                ? 'var(--color-accent)'
                : 'var(--color-border)';
        });
    }

    showModal() {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.classList.add('show');
            this.isModalOpen = true;
            document.body.style.overflow = 'hidden';

            // Animate in
            overlay.style.animation = 'fadeIn 0.3s ease-out';
        }
    }

    closeModal() {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.classList.remove('show');
            this.isModalOpen = false;
            document.body.style.overflow = '';

            this.currentProject = null;
            this.currentImageIndex = 0;
        }
    }

    setupEventListeners() {
        // Modal close button
        const closeBtn = document.getElementById('modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Modal overlay click to close
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeModal();
                }
            });
        }

        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            // Close mobile menu when a link is clicked
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });

            // Close mobile menu when scrolling
            let lastScrollY = window.scrollY;

            setInterval(() => {
                if (window.scrollY !== lastScrollY && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                lastScrollY = window.scrollY;
            }, 50);
        }

        // Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Initialize theme from localStorage
        this.initializeTheme();

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Window resize handler
        window.addEventListener('resize', this.debounce(() => {
            // Handle responsive adjustments if needed
        }, 250));
    }

    setupNavigation() {
        // Update active navigation link on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavLink();
        });
    }

    updateActiveNavLink() {
        const sections = ['about', 'work', 'thoughts', 'contact'];
        const scrollPos = window.scrollY + 100;

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (section && navLink) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    }

    setupScrollEffects() {
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.5;

            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Section reveal animations
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

        document.querySelectorAll('.about, .projects, .thoughts, .book, .contact').forEach(section => {
            section.classList.add('section-reveal');
            sectionObserver.observe(section);
        });
    }

    setupAnimations() {
        // Add CSS animations dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .project-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease-out;
            }

            .hero-content {
                animation: fadeInUp 0.8s ease-out both;
            }

            .hero-profile {
                animation: fadeInUp 0.8s ease-out 0.3s both;
            }

            /* Section reveal animations */
            .section-reveal {
                opacity: 0;
                transform: translateY(40px);
                transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
            }

            .section-reveal.section-visible {
                opacity: 1;
                transform: translateY(0);
            }

            .section-reveal .section-header,
            .section-reveal .about-content,
            .section-reveal .thoughts-content,
            .section-reveal .book-content,
            .section-reveal .contact-content {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                            transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
            }

            .section-reveal.section-visible .section-header {
                opacity: 1;
                transform: translateY(0);
                transition-delay: 0.15s;
            }

            .section-reveal.section-visible .about-content,
            .section-reveal.section-visible .thoughts-content,
            .section-reveal.section-visible .book-content,
            .section-reveal.section-visible .contact-content {
                opacity: 1;
                transform: translateY(0);
                transition-delay: 0.3s;
            }

            .section-reveal.section-visible .project-card {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);

        // Stagger project card animations
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.transitionDelay = `${0.2 + index * 0.1}s`;
        });
    }

    // Theme functionality
    initializeTheme() {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Set initial theme: saved preference, then system preference, default to dark
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

        if (initialTheme === 'light') {
            document.documentElement.classList.add('light-theme');
        } else {
            document.documentElement.classList.remove('light-theme');
        }

        // Store the current theme
        localStorage.setItem('theme', initialTheme);
    }

    toggleTheme() {
        const isLightMode = document.documentElement.classList.contains('light-theme');

        if (isLightMode) {
            // Switch to dark mode
            document.documentElement.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            // Switch to light mode
            document.documentElement.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }

        // Add a subtle transition effect
        document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';

        // Remove transition after animation completes to avoid affecting other animations
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the modern portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernPortfolio();

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});