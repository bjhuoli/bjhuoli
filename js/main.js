/* ============================================
   BEIJING HUOLI - MAIN JAVASCRIPT
   ============================================= */

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // Validate form
    if (!data.name || !data.email || !data.message) {
        showFormMessage('Please fill in all required fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }

    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    console.log('Form data:', data);
    
    // Simulate form submission
    showFormMessage('Thank you for your message! We\'ll be in touch soon.', 'success');
    contactForm.reset();
    
    // Optional: Actually send to a server endpoint
    // sendFormData(data);
}

function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.className = 'form-message';
        }, 5000);
    }
}

// Optional: Send form data to server
function sendFormData(data) {
    // This would be your actual server endpoint
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showFormMessage('Thank you! We\'ll be in touch soon.', 'success');
            contactForm.reset();
        } else {
            showFormMessage('An error occurred. Please try again.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFormMessage('An error occurred. Please try again.', 'error');
    });
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        
        // Close other open items
        document.querySelectorAll('.faq-item.active').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current item
        faqItem.classList.toggle('active');
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === 'index.html') ||
            currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

// Update nav on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Scroll to Top Button
let scrollToTopBtn = null;

function createScrollToTopBtn() {
    const btn = document.createElement('button');
    btn.setAttribute('id', 'scrollToTop');
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '↑';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #1a73e8;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        font-weight: bold;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    document.body.appendChild(btn);
    return btn;
}

window.addEventListener('load', () => {
    scrollToTopBtn = createScrollToTopBtn();
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

window.addEventListener('scroll', () => {
    if (scrollToTopBtn) {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    }
});

// Hover effect for scroll to top button
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#1557b0';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#1a73e8';
        this.style.transform = 'scale(1)';
    });
}

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll(`.service-item, .highlight-card, .center-card, 
.monetization-item, .strategy-card, .competency-card, 
.expertise-item`).forEach(el => {
    observer.observe(el);
});

// Analytics tracking (for SEO)
function trackPageView() {
    const page = window.location.pathname;
    console.log('Page View:', page);
    // You can add Google Analytics or other tracking here
}

// Language support (placeholder for future implementation)
const currentLanguage = 'en';

function setLanguage(lang) {
    console.log('Language set to:', lang);
    // Implement language switching here if needed
}

// Performance monitoring
function monitorPerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log('Page Load Time:', loadTime, 'ms');
    }
}

window.addEventListener('load', () => {
    monitorPerformance();
    trackPageView();
});

// SEO: Dynamic meta tags
function updateMetaTags(title, description) {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', description);
    }
}

// Error tracking
window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', event.error);
    // Send error to logging service
});

// Unhandled Promise Rejection Tracking
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
    // Send error to logging service
});

// Lazy load images (for future image optimization)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console branding
console.log('%c Beijing Huoli - Global Mobile Development', 
    'color: #1a73e8; font-size: 16px; font-weight: bold;');
console.log('%c Professional mobile app and game development services', 
    'color: #5f6368; font-size: 12px;');
