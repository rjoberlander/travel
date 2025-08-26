// JavaScript to add comprehensive photo galleries to all activities

const photoGalleries = {
    'zoo': `
    <div class="photo-gallery">
        <div class="gallery-item" onclick="openLightbox(this.querySelector('img').src)">
            <img src="./santa-barbara-images/Sunday-0930-SBZoo/giraffe-feeding.jpg" alt="Giraffe Feeding" onerror="this.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23DAA520" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="18"%3EGiraffe Feeding%3C/text%3E%3C/svg%3E'">
            <div class="gallery-item-caption">Feed Masai Giraffes</div>
        </div>
        <div class="gallery-item" onclick="openLightbox(this.querySelector('img').src)">
            <img src="./santa-barbara-images/Sunday-0930-SBZoo/australian-walkabout.jpg" alt="Australian Walkabout" onerror="this.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%238B4513" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="18"%3EAustralian Walkabout%3C/text%3E%3C/svg%3E'">
            <div class="gallery-item-caption">Walk with Kangaroos</div>
        </div>
        <div class="gallery-item" onclick="openLightbox(this.querySelector('img').src)">
            <img src="./santa-barbara-images/Sunday-0930-SBZoo/penguins.jpg" alt="Humboldt Penguins" onerror="this.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23483D8B" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="18"%3EHumboldt Penguins%3C/text%3E%3C/svg%3E'">
            <div class="gallery-item-caption">Penguin House</div>
        </div>
        <div class="gallery-item" onclick="openLightbox(this.querySelector('img').src)">
            <img src="./santa-barbara-images/Sunday-0930-SBZoo/zoo-train.jpg" alt="Zoo Train" onerror="this.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23228B22" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="18"%3EZoo Train%3C/text%3E%3C/svg%3E'">
            <div class="gallery-item-caption">C.P. Huntington Train</div>
        </div>
    </div>`,
    
    'moxi': `
    <div class="photo-gallery">
        <div class="gallery-item" onclick="openLightbox(this.querySelector('img').src)">
            <img src="./santa-barbara-images/Monday-0900-MOXI/giant-guitar.jpg" alt="Giant Guitar" onerror="this.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23FF1493" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="18"%3EGiant Guitar%3C/text%3E%3C/svg%3E'">
            <div class="gallery-item-caption">24-foot Giant Guitar</div>
        </div>
        <div class="gallery-item" onclick="openLightbox(this.querySelector('img').src)">
            <img src="./santa-barbara-images/Monday-0900-MOXI/sky-garden.jpg" alt="Sky Garden" onerror="this.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2300CED1" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="18"%3ESky Garden%3C/text%3E%3C/svg%3E'">
            <div class="gallery-item-caption">Rooftop Sky Garden</div>
        </div>
        <div class="gallery-item" onclick="openLightbox(this.querySelector('img').src)">
            <img src="./santa-barbara-images/Monday-0900-MOXI/speed-track.jpg" alt="Speed Track" onerror="this.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23FF4500" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="18"%3ESpeed Track%3C/text%3E%3C/svg%3E'">
            <div class="gallery-item-caption">Race Car Speed Track</div>
        </div>
        <div class="gallery-item" onclick="openLightbox(this.querySelector('img').src)">
            <img src="./santa-barbara-images/Monday-0900-MOXI/interactive-exhibits.jpg" alt="Interactive Exhibits" onerror="this.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%239370DB" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="18"%3EInteractive Exhibits%3C/text%3E%3C/svg%3E'">
            <div class="gallery-item-caption">Hands-on STEAM Fun</div>
        </div>
    </div>`,
    
    'hotel': `
    <div class="photo-gallery">
        <div class="gallery-item" onclick="openLightbox(this.querySelector('img').src)">
            <img src="./santa-barbara-images/Hotel-Californian/rooftop-pool.jpg" alt="Rooftop Pool" onerror="this.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2300BFFF" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="18"%3ERooftop Pool%3C/text%3E%3C/svg%3E'">
            <div class="gallery-item-caption">Tan-Tan Rooftop Pool</div>
        </div>
        <div class="gallery-item" onclick="openLightbox(this.querySelector('img').src)">
            <img src="./santa-barbara-images/Hotel-Californian/ocean-view.jpg" alt="Ocean Views" onerror="this.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%234682B4" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="18"%3EOcean Views%3C/text%3E%3C/svg%3E'">
            <div class="gallery-item-caption">360° Ocean & Mountain Views</div>
        </div>
        <div class="gallery-item" onclick="openLightbox(this.querySelector('img').src)">
            <img src="./santa-barbara-images/Hotel-Californian/spanish-architecture.jpg" alt="Spanish Architecture" onerror="this.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23CD853F" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="18"%3ESpanish Architecture%3C/text%3E%3C/svg%3E'">
            <div class="gallery-item-caption">Spanish Colonial Design</div>
        </div>
        <div class="gallery-item" onclick="openLightbox(this.querySelector('img').src)">
            <img src="./santa-barbara-images/Hotel-Californian/luxury-room.jpg" alt="Luxury Suite" onerror="this.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23DDA0DD" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="18"%3ELuxury Suite%3C/text%3E%3C/svg%3E'">
            <div class="gallery-item-caption">Moroccan-Inspired Suites</div>
        </div>
    </div>`
};

// Add galleries to activities that don't have them yet
document.addEventListener('DOMContentLoaded', function() {
    // Find activities and add galleries
    const activities = document.querySelectorAll('.activity-card');
    activities.forEach(card => {
        const title = card.querySelector('.activity-title').textContent;
        const hasGallery = card.querySelector('.photo-gallery');
        
        if (!hasGallery) {
            const highlight = card.querySelector('.activity-highlight');
            if (highlight) {
                // Add appropriate gallery based on activity
                if (title.includes('Zoo')) {
                    highlight.insertAdjacentHTML('afterend', photoGalleries.zoo);
                } else if (title.includes('MOXI')) {
                    highlight.insertAdjacentHTML('afterend', photoGalleries.moxi);
                }
            }
        }
    });
});