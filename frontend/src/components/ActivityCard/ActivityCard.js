/**
 * ActivityCard Component - Reusable activity card for travel itineraries
 * 
 * Features from Santa Barbara project that worked well:
 * - Alternating left/right image placement
 * - Rating integration with review counts
 * - Must-try lists from real reviews
 * - Pro tip highlights
 * - Photo gallery integration
 * - Instagram handle integration
 */

class ActivityCard {
    constructor(activityData, index) {
        this.data = activityData;
        this.index = index;
        this.isEven = index % 2 === 0;
    }

    render() {
        return `
            <div class="activity-card">
                <div class="activity-content ${this.isEven ? 'reverse-layout' : ''}">
                    ${this.renderImage()}
                    ${this.renderInfo()}
                </div>
            </div>
        `;
    }

    renderImage() {
        return `
            <div class="activity-image" style="background-image: url('${this.data.image}')">
                ${this.data.gallery ? this.renderGalleryOverlay() : ''}
            </div>
        `;
    }

    renderInfo() {
        return `
            <div class="activity-info">
                <div class="activity-time">${this.data.time}</div>
                <h3 class="activity-title">${this.data.title}</h3>
                <p class="activity-description">${this.data.description}</p>
                
                ${this.data.rating ? this.renderRating() : ''}
                ${this.data.mustTryItems ? this.renderMustTryList() : ''}
                ${this.data.reviewQuote ? this.renderReviewQuote() : ''}
                ${this.data.proTip ? this.renderProTip() : ''}
                ${this.data.instagram ? this.renderInstagram() : ''}
                ${this.data.gallery ? this.renderPhotoGallery() : ''}
            </div>
        `;
    }

    renderRating() {
        const stars = '★'.repeat(Math.floor(this.data.rating.stars)) + 
                     '☆'.repeat(5 - Math.floor(this.data.rating.stars));
        
        return `
            <div class="rating-info">
                <span class="rating-stars">${stars}</span>
                <span>${this.data.rating.stars}/5 • ${this.data.rating.reviewCount} Reviews${this.data.rating.context ? ' • ' + this.data.rating.context : ''}</span>
            </div>
        `;
    }

    renderMustTryList() {
        const items = this.data.mustTryItems.map(item => 
            `<div class="must-try-item">${item}</div>`
        ).join('');
        
        return `
            <div class="must-try-list">
                <div class="must-try-title">${this.data.mustTryTitle || 'MUST-TRY HIGHLIGHTS'}</div>
                ${items}
            </div>
        `;
    }

    renderReviewQuote() {
        return `
            <div class="review-quote">
                ${this.data.reviewQuote.text}
                <div class="review-source">- ${this.data.reviewQuote.source}</div>
            </div>
        `;
    }

    renderProTip() {
        return `
            <div class="activity-highlight">
                ${this.data.proTip}
            </div>
        `;
    }

    renderInstagram() {
        return `
            <div class="instagram-section">
                <a href="${this.data.instagram.url}" target="_blank" class="instagram-handle">
                    ${this.getInstagramIcon()}
                    ${this.data.instagram.handle}
                </a>
                <p style="font-size: 0.9rem; color: #666;">${this.data.instagram.description}</p>
            </div>
        `;
    }

    renderPhotoGallery() {
        const galleryItems = this.data.gallery.map((photo, index) => `
            <div class="gallery-item" onclick="openLightbox('${photo.src}')">
                <img src="${photo.src}" alt="${photo.alt}" onerror="this.src='${photo.placeholder}'">
                <div class="gallery-item-caption">${photo.caption}</div>
            </div>
        `).join('');

        return `
            <div class="photo-gallery">
                ${galleryItems}
            </div>
        `;
    }

    getInstagramIcon() {
        return `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#E1306C">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/>
                <circle cx="18.406" cy="5.594" r="1.44"/>
            </svg>
        `;
    }
}

// Example data structure based on Santa Barbara FisHouse
const exampleActivityData = {
    time: "7:00 PM - Dinner",
    title: "Santa Barbara FisHouse",
    description: "Dine where local fishermen bring their catch straight from boat to table at this waterfront gem across from East Beach.",
    image: "https://fishousesb.com/wp-content/uploads/2023/seafood-restaurant-santa-barbara.jpg",
    rating: {
        stars: 4.2,
        reviewCount: 1461,
        context: "Established 1999"
    },
    mustTryTitle: "MUST-TRY DISHES FROM REVIEWS",
    mustTryItems: [
        "🦞 Lobster Mac & Cheese - \"Legendary!\"",
        "🦀 Cioppino - \"sooo much fresh crab and shrimp\"",
        "🐟 Macadamia Mahi Mahi - \"creamy pineapple beurre blanc\"",
        "🥣 Clam Chowder - \"Best New England chowder on the west coast\""
    ],
    reviewQuote: {
        text: "We spent a lot of money on food at far more expensive, higher rated places this trip, and FisHouse was the best overall choice we made!",
        source: "Yelp Reviewer"
    },
    proTip: "Happy Hour: Mon-Thu 4PM-Close | Fri 4PM-Close | Sat 2-5PM | Sun 4PM-Close<br>Pro tip: Fire pit patio seating fills up fast at sunset!",
    instagram: {
        url: "https://www.instagram.com/fishousesb/",
        handle: "@fishousesb",
        description: "Fresh catches daily!"
    },
    gallery: [
        {
            src: "./images/fishouse/seafood-platter.jpg",
            alt: "Fresh Seafood",
            caption: "Fresh Local Catch",
            placeholder: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23FF6347' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-family='Arial' font-size='18'%3EFresh Seafood%3C/text%3E%3C/svg%3E"
        }
        // ... more gallery items
    ]
};

export default ActivityCard;