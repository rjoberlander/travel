/**
 * PhotoGallery Component - Pinterest-style masonry gallery
 * Features: Masonry layout, lightbox, show more functionality, hover effects
 */

class PhotoGallery {
    constructor(galleryId, images, options = {}) {
        this.galleryId = galleryId;
        this.images = images;
        this.options = {
            initialCount: options.initialCount || 6,
            showMoreText: options.showMoreText || 'Show More Photos',
            sizes: options.sizes || ['small', 'medium', 'tall', 'extra-tall', 'super-tall']
        };
        this.container = document.getElementById(galleryId);
        this.isExpanded = false;
        this.lightboxOpen = false;
    }

    init() {
        if (!this.container) {
            console.error(`Gallery container #${this.galleryId} not found`);
            return;
        }
        this.render();
        this.attachEventListeners();
    }

    getRandomSize() {
        // Weighted distribution for more visual variety
        const sizeWeights = {
            'small': 15,
            'medium': 25,
            'tall': 30,
            'extra-tall': 20,
            'super-tall': 10
        };
        
        const weightedSizes = [];
        Object.entries(sizeWeights).forEach(([size, weight]) => {
            for (let i = 0; i < weight; i++) {
                weightedSizes.push(size);
            }
        });
        
        return weightedSizes[Math.floor(Math.random() * weightedSizes.length)];
    }

    render() {
        const visibleImages = this.isExpanded ? this.images : this.images.slice(0, this.options.initialCount);
        const hiddenCount = this.images.length - visibleImages.length;

        const galleryHTML = `
            <div class="masonry-gallery" id="${this.galleryId}-masonry">
                ${visibleImages.map((image, index) => this.renderGalleryItem(image, index)).join('')}
            </div>
            ${hiddenCount > 0 ? `
                <div class="gallery-fade-overlay"></div>
                <div class="show-more-container">
                    <button class="show-more-btn" data-gallery="${this.galleryId}">
                        ${this.options.showMoreText}
                    </button>
                    <div class="photo-count">${visibleImages.length} of ${this.images.length} photos</div>
                </div>
            ` : ''}
        `;

        this.container.innerHTML = galleryHTML;
        this.container.classList.add('gallery-container');
    }

    renderGalleryItem(image, index) {
        const size = image.size || this.getRandomSize();
        const isHidden = index >= this.options.initialCount && !this.isExpanded;
        
        return `
            <div class="gallery-item ${size} ${isHidden ? 'hidden' : ''}" data-index="${index}">
                <div class="gallery-placeholder">
                    <img src="${image.src}" 
                         alt="${image.alt || 'Gallery image'}" 
                         loading="lazy"
                         onerror="this.onerror=null; this.src='${image.placeholder || this.getPlaceholder(size)}';">
                </div>
                ${image.caption ? `
                    <div class="gallery-caption">
                        ${image.caption}
                    </div>
                ` : ''}
            </div>
        `;
    }

    getPlaceholder(size) {
        const heights = {
            'small': 120,
            'medium': 200,
            'tall': 280,
            'extra-tall': 360,
            'super-tall': 450
        };
        
        const height = heights[size] || 200;
        const colors = ['#4682B4', '#87CEEB', '#ff6b6b', '#4ECDC4', '#F7DC6F'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='${height}'%3E%3Crect fill='${encodeURIComponent(color)}' width='300' height='${height}'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-family='Arial' font-size='16'%3EImage Loading...%3C/text%3E%3C/svg%3E`;
    }

    attachEventListeners() {
        // Show more button
        const showMoreBtn = this.container.querySelector('.show-more-btn');
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => this.toggleShowMore());
        }

        // Gallery item clicks for lightbox
        this.container.addEventListener('click', (e) => {
            const galleryItem = e.target.closest('.gallery-item');
            if (galleryItem && !e.target.closest('.gallery-caption')) {
                const index = parseInt(galleryItem.dataset.index);
                this.openLightbox(index);
            }
        });
    }

    toggleShowMore() {
        this.isExpanded = !this.isExpanded;
        this.render();
        
        // Smooth scroll to show newly revealed images
        if (this.isExpanded) {
            setTimeout(() => {
                const firstHidden = this.container.querySelector('.gallery-item:nth-child(7)');
                if (firstHidden) {
                    firstHidden.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 300);
        }
    }

    openLightbox(index) {
        const image = this.images[index];
        if (!image) return;

        // Create lightbox if it doesn't exist
        let lightbox = document.getElementById('gallery-lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'gallery-lightbox';
            lightbox.className = 'lightbox';
            document.body.appendChild(lightbox);
        }

        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">‹</button>
                <button class="lightbox-next">›</button>
                <img src="${image.src}" alt="${image.alt || 'Gallery image'}">
                ${image.caption ? `<div class="lightbox-caption">${image.caption}</div>` : ''}
            </div>
        `;

        lightbox.classList.add('active');
        this.lightboxOpen = true;
        this.currentLightboxIndex = index;

        // Attach lightbox event listeners
        this.attachLightboxListeners(lightbox);
    }

    attachLightboxListeners(lightbox) {
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        closeBtn.addEventListener('click', () => this.closeLightbox());
        prevBtn.addEventListener('click', () => this.navigateLightbox(-1));
        nextBtn.addEventListener('click', () => this.navigateLightbox(1));

        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });

        // Keyboard navigation
        const keyHandler = (e) => {
            if (!this.lightboxOpen) return;
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.navigateLightbox(-1);
            if (e.key === 'ArrowRight') this.navigateLightbox(1);
        };
        document.addEventListener('keydown', keyHandler);
        lightbox.dataset.keyHandler = keyHandler;
    }

    navigateLightbox(direction) {
        const newIndex = this.currentLightboxIndex + direction;
        if (newIndex >= 0 && newIndex < this.images.length) {
            this.openLightbox(newIndex);
        }
    }

    closeLightbox() {
        const lightbox = document.getElementById('gallery-lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            this.lightboxOpen = false;
            
            // Remove keyboard handler
            if (lightbox.dataset.keyHandler) {
                document.removeEventListener('keydown', lightbox.dataset.keyHandler);
            }
        }
    }
}

// CSS styles for the photo gallery
const galleryStyles = `
<style>
    /* Gallery Container */
    .gallery-container {
        position: relative;
        width: 100%;
    }

    /* Masonry Gallery */
    .masonry-gallery {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        position: relative;
    }

    /* Gallery Items */
    .gallery-item {
        position: relative;
        overflow: hidden;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 1;
        transform: translateY(0);
    }

    .gallery-item.hidden {
        display: none;
    }

    .gallery-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    /* Size Classes */
    .gallery-item.small { grid-row: span 2; }
    .gallery-item.medium { grid-row: span 3; }
    .gallery-item.tall { grid-row: span 4; }
    .gallery-item.extra-tall { grid-row: span 5; }
    .gallery-item.super-tall { grid-row: span 6; }

    /* Gallery Images */
    .gallery-placeholder {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        background: #f0f0f0;
    }

    .gallery-placeholder img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .gallery-item:hover .gallery-placeholder img {
        transform: scale(1.05);
    }

    /* Gallery Caption */
    .gallery-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        color: white;
        padding: 20px 15px 15px;
        font-size: 0.9rem;
        transform: translateY(100%);
        transition: transform 0.3s ease;
    }

    .gallery-item:hover .gallery-caption {
        transform: translateY(0);
    }

    /* Fade Overlay */
    .gallery-fade-overlay {
        position: absolute;
        bottom: 60px;
        left: 0;
        right: 0;
        height: 100px;
        background: linear-gradient(to bottom, transparent, rgba(254, 249, 243, 0.9));
        pointer-events: none;
        z-index: 1;
    }

    /* Show More Container */
    .show-more-container {
        position: relative;
        text-align: center;
        padding: 20px;
        margin-top: -40px;
        z-index: 2;
    }

    .show-more-btn {
        background: #4682B4;
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(70, 130, 180, 0.3);
    }

    .show-more-btn:hover {
        background: #5a92c4;
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(70, 130, 180, 0.4);
    }

    .photo-count {
        margin-top: 10px;
        color: #666;
        font-size: 0.9rem;
    }

    /* Lightbox */
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }

    .lightbox.active {
        opacity: 1;
        visibility: visible;
    }

    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }

    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
    }

    .lightbox-close,
    .lightbox-prev,
    .lightbox-next {
        position: absolute;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 10px 15px;
        transition: background 0.3s ease;
    }

    .lightbox-close:hover,
    .lightbox-prev:hover,
    .lightbox-next:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .lightbox-close {
        top: 20px;
        right: 20px;
    }

    .lightbox-prev {
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
    }

    .lightbox-next {
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }

    .lightbox-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 20px;
        text-align: center;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
        .masonry-gallery {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .masonry-gallery {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        
        .gallery-item.small { grid-row: span 2; }
        .gallery-item.medium { grid-row: span 2; }
        .gallery-item.tall { grid-row: span 3; }
        .gallery-item.extra-tall { grid-row: span 3; }
        .gallery-item.super-tall { grid-row: span 4; }
    }

    @media (max-width: 480px) {
        .masonry-gallery {
            grid-template-columns: 1fr;
        }
        
        .gallery-item {
            grid-row: span 1 !important;
            height: 250px;
        }
    }
</style>
`;

// Example usage
const galleryExample = `
// Sample images data
const images = [
    { src: 'image1.jpg', alt: 'Beach view', caption: 'Beautiful beach sunset', size: 'tall' },
    { src: 'image2.jpg', alt: 'Restaurant', caption: 'Local cuisine', size: 'medium' },
    { src: 'image3.jpg', alt: 'Activity', caption: 'Fun activities', size: 'super-tall' },
    // ... more images
];

// Initialize gallery
const gallery = new PhotoGallery('activity-gallery', images, {
    initialCount: 6,
    showMoreText: 'View All Photos'
});
gallery.init();
`;

export default PhotoGallery;
export { galleryStyles };