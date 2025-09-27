document.addEventListener('DOMContentLoaded', function() {
    // Header sticky behavior
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile navigation toggle
    const nav = document.querySelector('.nav');
    const hamburgerButton = document.createElement('button');
    hamburgerButton.className = 'hamburger-menu';
    hamburgerButton.setAttribute('aria-label', 'Toggle menu');
    hamburgerButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    `;
    
    // Add hamburger button to header
    const headerContainer = document.querySelector('.header-container');
    headerContainer.appendChild(hamburgerButton);
    
    hamburgerButton.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Hero entrance animations
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.image-placeholder');
    
    // Check if we're in reduced motion mode
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        // Scroll reveal animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    
                    if (entry.target === heroText) {
                        entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    } else if (entry.target === heroImage) {
                        entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    }
                }
            });
        }, { threshold: 0.1 });
        
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateX(-50px)';
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        
        observer.observe(heroText);
        observer.observe(heroImage);
        
        // Parallax effect on hero image
        const heroContainer = document.querySelector('.hero-container');
        
        heroContainer.addEventListener('mousemove', function(e) {
            const rect = heroContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 50;
            const moveY = (y - centerY) / 50;
            
            heroImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });
        
        heroContainer.addEventListener('mouseleave', function() {
            heroImage.style.transform = 'scale(1.02)';
        });
        
        // Image hover effect
        heroImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        heroImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1.02)';
        });
    }
    
    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!prefersReducedMotion) {
                this.style.transform = 'scale(1.03) translateY(-4px)';
                this.style.boxShadow = '0 8px 20px rgba(11, 23, 32, 0.3)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!prefersReducedMotion) {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 4px 12px rgba(11, 23, 32, 0.2)';
            }
        });
    });
    
    // About section - Stats count-up animation (FIXED)
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(statNumber => {
        const target = parseInt(statNumber.getAttribute('data-target'));
        if (target) {
            animateValue(statNumber, 0, target, 2000);
        }
    });
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + (end === 4.9 ? '' : '+');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Services section - Tab toggles (FIXED)
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            serviceTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Filter service cards based on selected tab
            const serviceType = this.getAttribute('data-service');
            
            serviceCards.forEach(card => {
                if (card.getAttribute('data-service') === serviceType) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Initialize service cards to show orthodontics cards by default
    const orthodonticsCards = document.querySelectorAll('.service-card[data-service="orthodontics"]');
    const otherCards = document.querySelectorAll('.service-card:not([data-service="orthodontics"])');
    
    orthodonticsCards.forEach(card => {
        card.style.display = 'block';
    });
    
    otherCards.forEach(card => {
        card.style.display = 'none';
    });
    
    // Team section - Card hover effects
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!prefersReducedMotion) {
                this.style.transform = 'translateY(-6px)';
                this.style.boxShadow = '0 12px 30px rgba(16, 36, 64, 0.06)';
            }
            
            const overlay = this.querySelector('.team-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!prefersReducedMotion) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 12px rgba(16, 36, 64, 0.06)';
            }
            
            const overlay = this.querySelector('.team-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
    
    // Contact form validation
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const formElements = this.querySelectorAll('input, textarea');
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.classList.remove('show');
        });
        
        // Validate each field
        formElements.forEach(element => {
            if (!element.value.trim()) {
                const errorElement = document.getElementById(element.name + '-error');
                if (errorElement) {
                    errorElement.textContent = 'This field is required';
                    errorElement.classList.add('show');
                    isValid = false;
                }
            } else if (element.type === 'email' && !isValidEmail(element.value)) {
                const errorElement = document.getElementById(element.name + '-error');
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid email';
                    errorElement.classList.add('show');
                    isValid = false;
                }
            }
        });
        
        if (isValid) {
            // Show success message
            alert('Thanks! We\'ll contact you shortly.');
            
            // Reset form
            this.reset();
        }
    });
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Accessibility: Keyboard navigation for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    const headerActionsButtons = document.querySelectorAll('.icon-button, .cta-button');
    
    // Ensure focus states are visible
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
    });
    
    // Reset focus state when mouse is used
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('user-is-tabbing');
    });
    
    // Add focus outlines for keyboard users
    if (document.body.classList.contains('user-is-tabbing')) {
        navLinks.forEach(link => {
            link.style.outline = '2px solid var(--accent-mid-blue)';
            link.style.outlineOffset = '2px';
        });
    }
});