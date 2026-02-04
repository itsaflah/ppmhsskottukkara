// JavaScript for School Website Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initSmoothScrolling();
    initBackToTop();
    initAnimations();
});

//footer and navbar
function includeHTML(file, elementId) {
    fetch(file)
      .then(response => response.text())
      .then(data => document.getElementById(elementId).innerHTML = data);
  }

  includeHTML('/ppmhsskottukkara/common/navbar.html', 'navbar-placeholder');
  includeHTML('/ppmhsskottukkara/common/footer.html', 'footer-placeholder');

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('mainNav');

    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to top button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.stat-card, .feature-card, .staff-card, .event-card, .gallery-item, .download-card');
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Gallery image modal functionality
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-image');
            const title = this.querySelector('.gallery-overlay h5').textContent;
            const description = this.querySelector('.gallery-overlay p').textContent;
            
            // Create modal (you can enhance this with Bootstrap modal)
            showImageModal(img.src, title, description);
        });
    });
}

// Show image in modal (basic implementation)
function showImageModal(src, title, description) {
    // Create modal backdrop
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop';
    modalBackdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        text-align: center;
        cursor: default;
    `;
    modalContent.innerHTML = `
        <img src="${src}" alt="${title}" style="max-width: 100%; max-height: 80vh; border-radius: 10px;">
        <h4 style="color: white; margin-top: 1rem;">${title}</h4>
        <p style="color: #ccc;">${description}</p>
    `;
    
    modalBackdrop.appendChild(modalContent);
    document.body.appendChild(modalBackdrop);
    
    // Close modal when clicking backdrop
    modalBackdrop.addEventListener('click', function(e) {
        if (e.target === modalBackdrop) {
            document.body.removeChild(modalBackdrop);
        }
    });
    
    // Close modal with Escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modalBackdrop);
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    // Prevent content click from closing modal
    modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Download functionality for files
function initDownloads() {
    const downloadLinks = document.querySelectorAll('.download-card .btn');
    
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const fileName = this.closest('.download-card').querySelector('h5').textContent;
            
            // Since these are demo files, show a message
            showAlert(`Download for "${fileName}" would start here. Please replace with actual file links.`, 'info');
        });
    });
}

// Initialize additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initGalleryModal();
    initDownloads();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Utility function to format dates
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Utility function to truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Search functionality (if needed)
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchableElements = document.querySelectorAll('[data-searchable]');
            
            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                const parent = element.closest('.col-lg-4, .col-md-6, .col-lg-3');
                
                if (text.includes(searchTerm) || searchTerm === '') {
                    parent.style.display = 'block';
                } else {
                    parent.style.display = 'none';
                }
            });
        });
    }
}

// Print functionality
function printPage() {
    window.print();
}

// Share functionality
function shareContent(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            showAlert('Link copied to clipboard!', 'success');
        });
    }
}

// Accessibility improvements
function initAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only sr-only-focusable';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        z-index: 10000;
        color: white;
        background: #007bff;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
    `;
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Focus management for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Handle tab navigation in modals
            const modal = document.querySelector('.modal-backdrop');
            if (modal) {
                // Trap focus within modal
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey && document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function() {
    initAccessibility();
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace broken images with placeholder
            this.src = 'images/Main/images.jpg';
            this.alt = 'Image not available';
        });
    });
});
