/**
 * HotelSection Component - Dedicated hotel showcase section
 * Features amenities, photos, guest favorites, and booking information
 */

class HotelSection {
    constructor(hotelData, containerSelector) {
        this.data = hotelData;
        this.container = document.querySelector(containerSelector);
    }

    init() {
        if (!this.container) {
            console.error('Hotel section container not found');
            return;
        }
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="hotel-section">
                <div class="hotel-header">
                    <h2 class="hotel-title">Your Home Base</h2>
                    <div class="hotel-name">${this.data.name}</div>
                    ${this.data.rating ? this.renderRating() : ''}
                </div>

                <div class="hotel-content">
                    <div class="hotel-main">
                        ${this.renderHeroImage()}
                        <div class="hotel-details">
                            ${this.renderDescription()}
                            ${this.renderAmenities()}
                            ${this.renderGuestFavorites()}
                        </div>
                    </div>
                    
                    <div class="hotel-sidebar">
                        ${this.renderQuickInfo()}
                        ${this.renderLocationInfo()}
                        ${this.renderBookingInfo()}
                    </div>
                </div>

                ${this.data.gallery ? this.renderPhotoGallery() : ''}
            </div>
        `;
    }

    renderRating() {
        const stars = '★'.repeat(Math.floor(this.data.rating.stars)) + 
                     '☆'.repeat(5 - Math.floor(this.data.rating.stars));
        
        return `
            <div class="hotel-rating">
                <span class="rating-stars">${stars}</span>
                <span class="rating-text">${this.data.rating.stars}/5 • ${this.data.rating.reviewCount} Reviews</span>
            </div>
        `;
    }

    renderHeroImage() {
        return `
            <div class="hotel-hero">
                <img src="${this.data.heroImage}" alt="${this.data.name}" 
                     onerror="this.src='${this.getPlaceholderImage()}'">
                ${this.data.imageCaption ? `
                    <div class="hotel-image-caption">${this.data.imageCaption}</div>
                ` : ''}
            </div>
        `;
    }

    renderDescription() {
        return `
            <div class="hotel-description">
                <p>${this.data.description}</p>
                ${this.data.highlight ? `
                    <div class="hotel-highlight">
                        <span class="highlight-icon">✨</span>
                        ${this.data.highlight}
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderAmenities() {
        if (!this.data.amenities || this.data.amenities.length === 0) return '';

        const amenityIcons = {
            'Pool': '🏊',
            'Spa': '💆',
            'Gym': '🏋️',
            'Restaurant': '🍽️',
            'Bar': '🍸',
            'WiFi': '📶',
            'Parking': '🚗',
            'Pet-Friendly': '🐕',
            'Beach Access': '🏖️',
            'Business Center': '💼',
            'Concierge': '🛎️',
            'Room Service': '🛏️'
        };

        const amenityItems = this.data.amenities.map(amenity => {
            const icon = amenityIcons[amenity] || '•';
            return `
                <div class="amenity-item">
                    <span class="amenity-icon">${icon}</span>
                    <span class="amenity-name">${amenity}</span>
                </div>
            `;
        }).join('');

        return `
            <div class="hotel-amenities">
                <h3 class="section-subtitle">Hotel Amenities</h3>
                <div class="amenities-grid">
                    ${amenityItems}
                </div>
            </div>
        `;
    }

    renderGuestFavorites() {
        if (!this.data.guestFavorites || this.data.guestFavorites.length === 0) return '';

        const favoriteItems = this.data.guestFavorites.map(favorite => `
            <div class="favorite-item">
                <div class="favorite-icon">❤️</div>
                <div class="favorite-content">
                    <div class="favorite-title">${favorite.title}</div>
                    <div class="favorite-description">${favorite.description}</div>
                </div>
            </div>
        `).join('');

        return `
            <div class="hotel-favorites">
                <h3 class="section-subtitle">Guest Favorites</h3>
                <div class="favorites-list">
                    ${favoriteItems}
                </div>
            </div>
        `;
    }

    renderQuickInfo() {
        return `
            <div class="hotel-quick-info">
                <h3 class="sidebar-title">Quick Info</h3>
                <div class="info-list">
                    ${this.data.checkIn ? `
                        <div class="info-item">
                            <span class="info-label">Check-in:</span>
                            <span class="info-value">${this.data.checkIn}</span>
                        </div>
                    ` : ''}
                    ${this.data.checkOut ? `
                        <div class="info-item">
                            <span class="info-label">Check-out:</span>
                            <span class="info-value">${this.data.checkOut}</span>
                        </div>
                    ` : ''}
                    ${this.data.priceRange ? `
                        <div class="info-item">
                            <span class="info-label">Price Range:</span>
                            <span class="info-value">${this.data.priceRange}</span>
                        </div>
                    ` : ''}
                    ${this.data.phone ? `
                        <div class="info-item">
                            <span class="info-label">Phone:</span>
                            <span class="info-value"><a href="tel:${this.data.phone}">${this.data.phone}</a></span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderLocationInfo() {
        if (!this.data.location) return '';

        return `
            <div class="hotel-location">
                <h3 class="sidebar-title">Location</h3>
                <div class="location-address">
                    📍 ${this.data.location.address}
                </div>
                ${this.data.location.walkingDistance ? `
                    <div class="walking-distances">
                        <div class="distance-title">Walking Distance To:</div>
                        ${this.data.location.walkingDistance.map(item => `
                            <div class="distance-item">
                                <span class="distance-icon">🚶</span>
                                ${item.place}: ${item.time}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                ${this.data.location.mapUrl ? `
                    <a href="${this.data.location.mapUrl}" target="_blank" class="map-link">
                        View on Map →
                    </a>
                ` : ''}
            </div>
        `;
    }

    renderBookingInfo() {
        if (!this.data.booking) return '';

        return `
            <div class="hotel-booking">
                <h3 class="sidebar-title">Ready to Book?</h3>
                ${this.data.booking.specialOffer ? `
                    <div class="special-offer">
                        <span class="offer-icon">🎉</span>
                        ${this.data.booking.specialOffer}
                    </div>
                ` : ''}
                <a href="${this.data.booking.url}" target="_blank" class="booking-button">
                    Check Availability
                </a>
                ${this.data.booking.cancellation ? `
                    <div class="cancellation-policy">
                        ✓ ${this.data.booking.cancellation}
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderPhotoGallery() {
        const galleryItems = this.data.gallery.slice(0, 6).map((photo, index) => `
            <div class="hotel-gallery-item" onclick="openHotelLightbox('${photo.src}', '${photo.caption || ''}')">
                <img src="${photo.src}" alt="${photo.alt || 'Hotel photo'}" 
                     onerror="this.src='${this.getPlaceholderImage()}'">
            </div>
        `).join('');

        return `
            <div class="hotel-gallery">
                <h3 class="gallery-title">Photo Gallery</h3>
                <div class="hotel-gallery-grid">
                    ${galleryItems}
                </div>
                ${this.data.gallery.length > 6 ? `
                    <div class="gallery-more">
                        <a href="${this.data.galleryUrl || '#'}" target="_blank">
                            View All ${this.data.gallery.length} Photos →
                        </a>
                    </div>
                ` : ''}
            </div>
        `;
    }

    getPlaceholderImage() {
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%234682B4' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-family='Arial' font-size='24'%3EHotel Image%3C/text%3E%3C/svg%3E`;
    }
}

// CSS styles for the hotel section
const hotelStyles = `
<style>
    /* Hotel Section Container */
    .hotel-section {
        background: #fff;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        margin: 40px 0;
    }

    /* Hotel Header */
    .hotel-header {
        background: linear-gradient(135deg, #4682B4 0%, #87CEEB 100%);
        color: white;
        padding: 40px;
        text-align: center;
    }

    .hotel-title {
        font-family: 'Bebas Neue', cursive;
        font-size: 2rem;
        letter-spacing: 2px;
        margin-bottom: 10px;
    }

    .hotel-name {
        font-family: 'Playfair Display', serif;
        font-size: 3rem;
        font-weight: 900;
        margin-bottom: 15px;
    }

    .hotel-rating {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .hotel-rating .rating-stars {
        color: #ffd700;
        font-size: 1.3rem;
    }

    .hotel-rating .rating-text {
        opacity: 0.9;
    }

    /* Hotel Content Layout */
    .hotel-content {
        display: grid;
        grid-template-columns: 1fr 350px;
        gap: 40px;
        padding: 40px;
    }

    /* Hotel Main Content */
    .hotel-hero {
        position: relative;
        border-radius: 15px;
        overflow: hidden;
        margin-bottom: 30px;
    }

    .hotel-hero img {
        width: 100%;
        height: 400px;
        object-fit: cover;
    }

    .hotel-image-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
        color: white;
        padding: 20px;
        font-size: 0.9rem;
    }

    .hotel-description {
        margin-bottom: 30px;
    }

    .hotel-description p {
        color: #666;
        line-height: 1.8;
        margin-bottom: 15px;
    }

    .hotel-highlight {
        background: #f8fbff;
        border-left: 4px solid #4682B4;
        padding: 15px 20px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .highlight-icon {
        font-size: 1.5rem;
    }

    /* Section Subtitles */
    .section-subtitle {
        font-family: 'Bebas Neue', cursive;
        font-size: 1.5rem;
        color: #2c3e50;
        margin-bottom: 20px;
        letter-spacing: 1px;
    }

    /* Amenities Grid */
    .amenities-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
        margin-bottom: 30px;
    }

    .amenity-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px;
        background: #f8fbff;
        border-radius: 10px;
    }

    .amenity-icon {
        font-size: 1.3rem;
    }

    /* Guest Favorites */
    .favorites-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .favorite-item {
        display: flex;
        gap: 15px;
        padding: 15px;
        background: #fff8e1;
        border-radius: 10px;
    }

    .favorite-icon {
        font-size: 1.5rem;
    }

    .favorite-title {
        font-weight: 600;
        margin-bottom: 5px;
        color: #2c3e50;
    }

    .favorite-description {
        color: #666;
        font-size: 0.9rem;
    }

    /* Hotel Sidebar */
    .hotel-sidebar {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .sidebar-title {
        font-family: 'Bebas Neue', cursive;
        font-size: 1.3rem;
        color: #4682B4;
        margin-bottom: 15px;
        letter-spacing: 1px;
    }

    /* Quick Info */
    .hotel-quick-info {
        background: #f8fbff;
        padding: 25px;
        border-radius: 15px;
    }

    .info-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .info-item {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        border-bottom: 1px solid #e0e0e0;
    }

    .info-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .info-label {
        color: #666;
        font-weight: 500;
    }

    .info-value {
        color: #2c3e50;
        font-weight: 600;
    }

    .info-value a {
        color: #4682B4;
        text-decoration: none;
    }

    /* Location Info */
    .hotel-location {
        background: #f0f9ff;
        padding: 25px;
        border-radius: 15px;
    }

    .location-address {
        color: #2c3e50;
        margin-bottom: 15px;
        font-weight: 500;
    }

    .walking-distances {
        margin-top: 15px;
    }

    .distance-title {
        font-weight: 600;
        color: #666;
        margin-bottom: 10px;
    }

    .distance-item {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        color: #666;
    }

    .map-link {
        display: inline-block;
        margin-top: 15px;
        color: #4682B4;
        text-decoration: none;
        font-weight: 600;
    }

    /* Booking Info */
    .hotel-booking {
        background: linear-gradient(135deg, #fff8e1 0%, #fff0f0 100%);
        padding: 25px;
        border-radius: 15px;
        text-align: center;
    }

    .special-offer {
        background: #fff;
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 20px;
        font-weight: 600;
        color: #ff6b6b;
    }

    .booking-button {
        display: inline-block;
        background: #ff6b6b;
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(255, 107, 107, 0.3);
    }

    .booking-button:hover {
        background: #ff5252;
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
    }

    .cancellation-policy {
        margin-top: 15px;
        font-size: 0.9rem;
        color: #666;
    }

    /* Hotel Gallery */
    .hotel-gallery {
        padding: 40px;
        background: #f8fbff;
    }

    .gallery-title {
        font-family: 'Bebas Neue', cursive;
        font-size: 2rem;
        color: #2c3e50;
        text-align: center;
        margin-bottom: 30px;
        letter-spacing: 1px;
    }

    .hotel-gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 20px;
    }

    .hotel-gallery-item {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .hotel-gallery-item:hover {
        transform: scale(1.05);
    }

    .hotel-gallery-item img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .gallery-more {
        text-align: center;
    }

    .gallery-more a {
        color: #4682B4;
        text-decoration: none;
        font-weight: 600;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
        .hotel-content {
            grid-template-columns: 1fr;
        }
        
        .hotel-sidebar {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
    }

    @media (max-width: 768px) {
        .hotel-header {
            padding: 30px 20px;
        }
        
        .hotel-name {
            font-size: 2rem;
        }
        
        .hotel-content {
            padding: 20px;
            gap: 30px;
        }
        
        .hotel-hero img {
            height: 250px;
        }
        
        .amenities-grid {
            grid-template-columns: 1fr;
        }
        
        .hotel-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
    }
</style>
`;

// Example usage
const hotelExample = `
// Hotel data structure
const hotelData = {
    name: "Hotel Californian",
    rating: {
        stars: 4.5,
        reviewCount: 847
    },
    heroImage: "hotel-hero.jpg",
    imageCaption: "Luxury beachfront property in the heart of Santa Barbara",
    description: "Experience Spanish Colonial elegance at this Forbes Five-Star hotel...",
    highlight: "Home to Santa Barbara's only rooftop pool with 360-degree ocean and mountain views",
    amenities: ["Pool", "Spa", "Gym", "Restaurant", "Bar", "Beach Access"],
    guestFavorites: [
        {
            title: "Rooftop Pool & Bar",
            description: "Stunning 360° views of the ocean and mountains"
        },
        {
            title: "Moroccan-inspired Spa",
            description: "Award-winning treatments in a serene setting"
        }
    ],
    checkIn: "4:00 PM",
    checkOut: "12:00 PM",
    priceRange: "$$$$ • Luxury",
    phone: "+1 (805) 882-0100",
    location: {
        address: "36 State St, Santa Barbara, CA 93101",
        walkingDistance: [
            { place: "Stearns Wharf", time: "5 min" },
            { place: "State Street", time: "2 min" }
        ],
        mapUrl: "https://maps.google.com/..."
    },
    booking: {
        url: "https://www.hotelcalifornian.com",
        specialOffer: "Save 15% on stays of 3+ nights",
        cancellation: "Free cancellation up to 48 hours before check-in"
    },
    gallery: [
        { src: "pool.jpg", alt: "Rooftop pool" },
        { src: "room.jpg", alt: "Ocean view room" },
        // ... more photos
    ]
};

// Initialize hotel section
const hotelSection = new HotelSection(hotelData, '#hotel-section');
hotelSection.init();
`;

export default HotelSection;
export { hotelStyles };