/* ============================================================
   IEEE CU UP GALLERY - VANILLA JAVASCRIPT
   Features: Filtering, Lightbox, Lazy Loading, Animations
   ============================================================ */

// ==================== GALLERY DATA ==================== 
// This is the core data structure. Add new items here to expand the gallery.
// Format: { id, title, date, category, year, type (image/video), src, thumbnail }

const GALLERY_DATA = [
    // 2024 Events
    {
        id: 1,
        title: "Annual IEEE Summit 2024",
        date: "March 15, 2024",
        category: "events",
        year: "2024",
        type: "image",
        src: "assets/images/event-1.jpg",
        thumbnail: "assets/images/event-1.jpg"
    },
    {
        id: 2,
        title: "Student Leadership Workshop",
        date: "April 8, 2024",
        category: "workshops",
        year: "2024",
        type: "image",
        src: "assets/images/workshop-1.jpg",
        thumbnail: "assets/images/workshop-1.jpg"
    },
    {
        id: 3,
        title: "Robotics & AI Seminar",
        date: "April 22, 2024",
        category: "seminars",
        year: "2024",
        type: "video",
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "assets/images/seminar-1.jpg"
    },
    {
        id: 4,
        title: "Coding Competition Finals",
        date: "May 10, 2024",
        category: "competitions",
        year: "2024",
        type: "image",
        src: "assets/images/competition-1.jpg",
        thumbnail: "assets/images/competition-1.jpg"
    },
    {
        id: 5,
        title: "Tech Talk: Cloud Computing",
        date: "May 25, 2024",
        category: "seminars",
        year: "2024",
        type: "image",
        src: "assets/images/seminar-2.jpg",
        thumbnail: "assets/images/seminar-2.jpg"
    },
    {
        id: 6,
        title: "Networking Gala 2024",
        date: "June 5, 2024",
        category: "events",
        year: "2024",
        type: "image",
        src: "assets/images/event-2.jpg",
        thumbnail: "assets/images/event-2.jpg"
    },

    // 2023 Events
    {
        id: 7,
        title: "IEEE Congress 2023",
        date: "February 14, 2023",
        category: "events",
        year: "2023",
        type: "image",
        src: "assets/images/event-3.jpg",
        thumbnail: "assets/images/event-3.jpg"
    },
    {
        id: 8,
        title: "Web Development Boot Camp",
        date: "March 20, 2023",
        category: "workshops",
        year: "2023",
        type: "image",
        src: "assets/images/workshop-2.jpg",
        thumbnail: "assets/images/workshop-2.jpg"
    },
    {
        id: 9,
        title: "IoT & Embedded Systems",
        date: "April 10, 2023",
        category: "seminars",
        year: "2023",
        type: "image",
        src: "assets/images/seminar-3.jpg",
        thumbnail: "assets/images/seminar-3.jpg"
    },
    {
        id: 10,
        title: "Hackathon 2023",
        date: "May 5, 2023",
        category: "competitions",
        year: "2023",
        type: "image",
        src: "assets/images/competition-2.jpg",
        thumbnail: "assets/images/competition-2.jpg"
    },

    // 2022 Events
    {
        id: 11,
        title: "Inaugural Event 2022",
        date: "January 20, 2022",
        category: "events",
        year: "2022",
        type: "image",
        src: "assets/images/event-4.jpg",
        thumbnail: "assets/images/event-4.jpg"
    },
    {
        id: 12,
        title: "Machine Learning Workshop",
        date: "February 14, 2022",
        category: "workshops",
        year: "2022",
        type: "image",
        src: "assets/images/workshop-3.jpg",
        thumbnail: "assets/images/workshop-3.jpg"
    }
];

// ==================== STATE MANAGEMENT ==================== 
let currentFilters = {
    category: 'all',
    year: 'all'
};

let currentLightboxIndex = 0;
let filteredGalleryData = [...GALLERY_DATA];

// ==================== DOM ELEMENTS ==================== 
const galleryGrid = document.getElementById('gallery-grid');
const noResults = document.getElementById('no-results');
const categoryFilterBtns = document.querySelectorAll('[data-category]');
const yearFilterBtns = document.querySelectorAll('[data-year]');
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxVideo = document.getElementById('lightbox-video');
const lightboxVideoMp4 = document.getElementById('lightbox-video-mp4');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDate = document.getElementById('lightbox-date');
const lightboxCategory = document.getElementById('lightbox-category');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const ctaButton = document.getElementById('cta-button');

// ==================== INITIALIZATION ==================== 
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Gallery initialized with', GALLERY_DATA.length, 'items');
    
    // Render initial gallery
    renderGallery(GALLERY_DATA);
    
    // Attach event listeners
    setupEventListeners();
});

// ==================== EVENT LISTENERS ==================== 
function setupEventListeners() {
    // Filter buttons - Category
    categoryFilterBtns.forEach(btn => {
        btn.addEventListener('click', handleCategoryFilter);
    });
    
    // Filter buttons - Year
    yearFilterBtns.forEach(btn => {
        btn.addEventListener('click', handleYearFilter);
    });
    
    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPreviousItem);
    lightboxNext.addEventListener('click', showNextItem);
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightboxModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') showPreviousItem();
            if (e.key === 'ArrowRight') showNextItem();
            if (e.key === 'Escape') closeLightbox();
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // CTA Button
    ctaButton.addEventListener('click', () => {
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
}

// ==================== FILTERING ==================== 
function handleCategoryFilter(e) {
    const category = e.target.getAttribute('data-category');
    
    // Update active state
    categoryFilterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Update filter state
    currentFilters.category = category;
    
    // Apply filters and render
    applyFilters();
}

function handleYearFilter(e) {
    const year = e.target.getAttribute('data-year');
    
    // Update active state
    yearFilterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Update filter state
    currentFilters.year = year;
    
    // Apply filters and render
    applyFilters();
}

function applyFilters() {
    // Filter based on current selections
    filteredGalleryData = GALLERY_DATA.filter(item => {
        const categoryMatch = currentFilters.category === 'all' || item.category === currentFilters.category;
        const yearMatch = currentFilters.year === 'all' || item.year === currentFilters.year;
        
        return categoryMatch && yearMatch;
    });
    
    // Render filtered results
    renderGallery(filteredGalleryData);
}

// ==================== GALLERY RENDERING ==================== 
function renderGallery(items) {
    // Clear existing items
    galleryGrid.innerHTML = '';
    
    if (items.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    // Create and append gallery items
    items.forEach((item, index) => {
        const galleryItem = createGalleryItem(item, index);
        galleryGrid.appendChild(galleryItem);
    });
    
    // Lazy load images
    lazyLoadImages();
}

function createGalleryItem(item, index) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.setAttribute('data-id', item.id);
    
    // Image or Video Container
    let mediaHTML = '';
    if (item.type === 'image') {
        mediaHTML = `
            <img 
                class="gallery-img" 
                src="${item.thumbnail}" 
                alt="${item.title}"
                loading="lazy"
                data-src="${item.src}"
            />
        `;
    } else if (item.type === 'video') {
        mediaHTML = `
            <img 
                class="gallery-img" 
                src="${item.thumbnail}" 
                alt="${item.title}"
                loading="lazy"
            />
            <div class="video-play-icon">▶️</div>
        `;
    }
    
    div.innerHTML = `
        <div class="gallery-image-container">
            ${mediaHTML}
            <div class="gallery-overlay">
                <span class="overlay-icon">${item.type === 'image' ? '🔍' : '▶️'}</span>
            </div>
        </div>
        <div class="gallery-content">
            <h3 class="gallery-title" title="${item.title}">${item.title}</h3>
            <div class="gallery-meta">
                <span class="gallery-date">📅 ${item.date}</span>
                <span class="gallery-category">${item.category}</span>
            </div>
        </div>
    `;
    
    // Click handler
    div.addEventListener('click', () => openLightbox(item, filteredGalleryData));
    
    return div;
}

// ==================== LIGHTBOX ==================== 
function openLightbox(item, dataSet) {
    currentLightboxIndex = dataSet.findIndex(i => i.id === item.id);
    displayLightboxContent(dataSet[currentLightboxIndex]);
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Clear media
    lightboxImage.style.display = 'none';
    lightboxVideo.style.display = 'none';
    lightboxVideoMp4.style.display = 'none';
}

function displayLightboxContent(item) {
    // Clear previous content
    lightboxImage.style.display = 'none';
    lightboxVideo.style.display = 'none';
    lightboxVideoMp4.style.display = 'none';
    
    // Update title and metadata
    lightboxTitle.textContent = item.title;
    lightboxDate.textContent = `📅 ${item.date}`;
    lightboxCategory.textContent = `📂 ${item.category.toUpperCase()}`;
    
    // Display appropriate media type
    if (item.type === 'image') {
        lightboxImage.src = item.src;
        lightboxImage.style.display = 'block';
    } else if (item.type === 'video') {
        // Check if YouTube or MP4
        if (item.src.includes('youtube') || item.src.includes('youtu.be')) {
            lightboxVideo.src = item.src;
            lightboxVideo.style.display = 'block';
        } else {
            lightboxVideoMp4.src = item.src;
            lightboxVideoMp4.style.display = 'block';
        }
    }
}

function showPreviousItem() {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredGalleryData.length) % filteredGalleryData.length;
    displayLightboxContent(filteredGalleryData[currentLightboxIndex]);
}

function showNextItem() {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredGalleryData.length;
    displayLightboxContent(filteredGalleryData[currentLightboxIndex]);
}

// ==================== LAZY LOADING ==================== 
function lazyLoadImages() {
    const images = document.querySelectorAll('.gallery-img');
    
    // Use Intersection Observer for lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src || img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
}

// ==================== MOBILE MENU ==================== 
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// ==================== NAVBAR SCROLL EFFECT ==================== 
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
}

// ==================== UTILITY FUNCTIONS ==================== 

/**
 * Smooth scroll to element
 * @param {Element} element - DOM element to scroll to
 */
function smoothScroll(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Format date string
 * @param {string} dateString - Date to format
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

/**
 * Debounce function for performance
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
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

// ==================== LOGGING ==================== 
console.log(`
╔════════════════════════════════════════════════════════════╗
║     IEEE CU UP GALLERY - Powered by Vanilla JavaScript    ║
║                                                            ║
║  📊 Total Gallery Items: ${GALLERY_DATA.length.toString().padStart(2, '0')}
║  🎨 Modern CSS3 with Flexbox & Grid                       ║
║  ⚡ Zero Framework Dependencies                            ║
║  📱 Fully Responsive Design                               ║
║  ♿ Accessibility Friendly                                ║
║                                                            ║
║  © 2024-2025 CU UP IEEE Student Branch                    ║
╚════════════════════════════════════════════════════════════╝
`);
