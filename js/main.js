// MindChain Landing Page JavaScript

// Wait for DOM to load completely
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme based on user preference or default to light
    initTheme();
    
    // Initialize copy to clipboard functionality
    initCopyButtons();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize navbar scroll behavior
    initNavbarScroll();
    
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize code highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
});

/**
 * Initialize theme toggle functionality
 */
function initTheme() {
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');
    
    // Set initial theme based on saved preference
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }
    
    // Add event listener for theme toggle
    toggleSwitch.addEventListener('change', switchTheme);
    
    // Function to switch between light/dark theme
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }
}

/**
 * Initialize copy to clipboard buttons
 */
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Find the code element
            const codeBlock = button.closest('.code-snippet, .code-block').querySelector('pre code');
            
            // Copy text to clipboard
            navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                // Visual feedback on successful copy
                const originalIcon = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.classList.add('copied');
                
                // Reset button after 1.5 seconds
                setTimeout(() => {
                    button.innerHTML = originalIcon;
                    button.classList.remove('copied');
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" (prevents scroll to top)
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize navbar scroll behavior (background change on scroll)
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

/**
 * Initialize scroll reveal animations for elements
 */
function initScrollReveal() {
    // Add reveal classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Add reveal class to section headers
        const header = section.querySelector('.section-header');
        if (header) {
            header.classList.add('reveal');
        }
        
        // Add reveal classes to cards with delay
        const cards = section.querySelectorAll('.feature-card, .use-case-card, .resource-card');
        cards.forEach((card, index) => {
            card.classList.add('reveal');
            card.classList.add(`delay-${(index % 5) * 100}`);
        });
        
        // Add reveal to architecture items
        const archItems = section.querySelectorAll('.architecture-item');
        archItems.forEach((item, index) => {
            item.classList.add('reveal');
            item.classList.add(`delay-${index * 100}`);
        });
        
        // Add reveal to step items
        const stepItems = section.querySelectorAll('.step-item');
        stepItems.forEach((item, index) => {
            item.classList.add('reveal');
            item.classList.add(`delay-${index * 100}`);
        });
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
}

/**
 * Add animation effects for elements as they come into view
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize newsletter form submission (demo - would need backend integration)
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            
            // Simple validation
            if (emailInput.value.trim() === '') {
                return;
            }
            
            // Show loading state
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="spinner"></span> Subscribing...';
            submitButton.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Here you would typically send data to your backend
                const formGroup = emailInput.parentElement;
                formGroup.innerHTML = '<div class="alert alert-success">Thank you for subscribing! We\'ll keep you updated.</div>';
                
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
});