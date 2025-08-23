import { initFlapText } from './flapText.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initPricingCalculator();
    initFAQAccordion();
    initClickTracking();
    initLazyLoading();
    initFlapText();
    //initTypingEffect();
});

// Smooth scrolling for internal links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add different animation delays for children
                const children = entry.target.querySelectorAll('.delay-animation');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe elements with scroll-animate class
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach(el => observer.observe(el));

    // Add scroll-animate class to benefit cards, testimonials, etc.
    const benefitCards = document.querySelectorAll('.bg-white.p-8, .testimonial-card');
    benefitCards.forEach(card => {
        card.classList.add('scroll-animate');
        observer.observe(card);
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Dynamic pricing calculator
function initPricingCalculator() {
    const packages = {
        basic: {
            bottles: 2,
            price: 158,
            originalPrice: 358,
            perBottle: 79,
            shipping: 9.99,
            savings: 200
        },
        popular: {
            bottles: 3,
            price: 207,
            originalPrice: 537,
            perBottle: 69,
            shipping: 0,
            savings: 330
        },
        bestValue: {
            bottles: 6,
            price: 294,
            originalPrice: 1074,
            perBottle: 49,
            shipping: 0,
            savings: 780
        }
    };

    // Add hover effects to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// FAQ Accordion functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            // Initially hide answers
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.5s ease';
            
            // Add click handler
            question.style.cursor = 'pointer';
            question.addEventListener('click', function() {
                if (answer.style.maxHeight === '0px') {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    question.innerHTML += ' <i class="fas fa-chevron-up text-blue-500"></i>';
                } else {
                    answer.style.maxHeight = '0';
                    question.innerHTML = question.innerHTML.replace(/ <i class="fas fa-chevron-up text-blue-500"><\/i>/, '');
                }
            });
            
            // Add hover effect
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            });
        }
    });
}

// Click tracking for affiliate links
let pendingRedirectUrl = null;

function initClickTracking() {
    const ctaButtons = document.querySelectorAll('a[href*="clickbank"]');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent immediate redirect
            pendingRedirectUrl = this.href;
            showRedirectModal();
        });
    });
}

// Modal for redirect confirmation
function showRedirectModal() {
    const modal = document.getElementById("redirectModal");
    const content = modal.querySelector(".modal-content");

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    // ESC key to close
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            cancelRedirect();
        }
    });

    // Click outside modal-content to close
    modal.addEventListener("click", function (e) {
        if (!content.contains(e.target)) {
            cancelRedirect();
        }
    });
}

// Confirm or cancel redirect
function confirmRedirect() {
    closeRedirectModal();
    if (pendingRedirectUrl) {
        window.location.href = pendingRedirectUrl;
    }
}

// Close modal and reset pending URL
function cancelRedirect() {
    closeRedirectModal();
    pendingRedirectUrl = null;
}

// Close redirect modal
function closeRedirectModal() {
    const modal = document.getElementById("redirectModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

// Typing effect for hero text
function initTypingEffect() {
    const heroTitle = document.querySelector('h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 20);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 200);
    }
}

// Add floating animation to product images
function initFloatingAnimation() {
    const productImages = document.querySelectorAll('img[src*="primebiome"]');
    productImages.forEach(img => {
        img.classList.add('animate-float');
    });
}

// Newsletter signup functionality (if needed)
function initNewsletterSignup() {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                showMessage('Thank you for subscribing!', 'success');
                this.reset();
            } else {
                showMessage('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show success/error messages
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Add entrance animations to sections
function addEntranceAnimations() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
        section.classList.add('scroll-animate');
    });
}

// Call entrance animations
addEntranceAnimations();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Add any scroll-based functionality here
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// Add mobile-specific touch interactions
if ('ontouchstart' in window) {
    const cards = document.querySelectorAll('.hover-scale, .enhanced-hover');
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});

// Initialize floating animation after page load
window.addEventListener('load', () => {
    initFloatingAnimation();
});

// Adjust header on scroll
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});

function handleScroll() {
  const header = document.getElementById('header');
  const branding = document.getElementById('branding');
  const scrolled = window.scrollY > 50;

  setTimeout(() => {
    header.classList.toggle('shadow-xl', !scrolled);
    header.classList.toggle('shadow-lg', scrolled);

    branding.classList.toggle('py-4', !scrolled);
    branding.classList.toggle('py-2', scrolled);
  }, 100);
}
