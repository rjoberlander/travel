/**
 * MapSection Component - Interactive Google Maps integration
 * Displays all itinerary locations with markers and route
 */

class MapSection {
    constructor(mapConfig, containerSelector) {
        this.config = mapConfig;
        this.container = document.querySelector(containerSelector);
        this.map = null;
        this.markers = [];
        this.directionsService = null;
        this.directionsRenderer = null;
    }

    init() {
        if (!this.container) {
            console.error('Map container not found');
            return;
        }
        
        // Check if Google Maps API is loaded
        if (typeof google === 'undefined') {
            console.error('Google Maps API not loaded');
            this.renderPlaceholder();
            return;
        }

        this.renderMap();
    }

    renderMap() {
        // Create map container
        this.container.innerHTML = `
            <div class="map-header">
                <h2 class="map-title">YOUR SANTA BARBARA ADVENTURE MAP</h2>
                <p class="map-subtitle">All locations plotted for easy navigation during your trip</p>
            </div>
            <div id="google-map" style="height: 600px; width: 100%;"></div>
            <div class="map-locations">
                <h3>📍 Your Itinerary Locations</h3>
                <div id="location-list"></div>
            </div>
        `;

        // Initialize map
        const mapOptions = {
            center: this.config.center || { lat: 34.4208, lng: -119.6982 },
            zoom: this.config.zoom || 13,
            styles: this.getMapStyles(),
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true
        };

        this.map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

        // Initialize services
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer({
            map: this.map,
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: '#4285F4',
                strokeWeight: 4,
                strokeOpacity: 0.8
            }
        });

        // Add markers and route
        this.addMarkers();
        if (this.config.showRoute) {
            this.calculateRoute();
        }

        // Add location list
        this.renderLocationList();
    }

    addMarkers() {
        this.config.locations.forEach((location, index) => {
            const marker = new google.maps.Marker({
                position: location.coordinates,
                map: this.map,
                title: location.name,
                icon: this.getMarkerIcon(location.type),
                animation: google.maps.Animation.DROP
            });

            // Create info window
            const infoWindow = new google.maps.InfoWindow({
                content: this.createInfoWindowContent(location)
            });

            marker.addListener('click', () => {
                // Close all other info windows
                this.markers.forEach(m => {
                    if (m.infoWindow) m.infoWindow.close();
                });
                infoWindow.open(this.map, marker);
            });

            // Store marker and info window
            this.markers.push({ marker, infoWindow, location });
        });
    }

    getMarkerIcon(type) {
        const icons = {
            hotel: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new google.maps.Size(40, 40)
            },
            activity: {
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new google.maps.Size(32, 32)
            },
            restaurant: {
                url: 'https://maps.google.com/mapfiles/ms/icons/restaurant.png',
                scaledSize: new google.maps.Size(32, 32)
            },
            transport: {
                url: 'https://maps.google.com/mapfiles/ms/icons/train.png',
                scaledSize: new google.maps.Size(32, 32)
            }
        };

        return icons[type] || icons.activity;
    }

    createInfoWindowContent(location) {
        return `
            <div class="map-info-window">
                <h4>${location.name}</h4>
                <p>${location.description || ''}</p>
                ${location.address ? `<p><strong>Address:</strong> ${location.address}</p>` : ''}
                ${location.time ? `<p><strong>Time:</strong> ${location.time}</p>` : ''}
                ${location.directionsUrl ? `
                    <a href="${location.directionsUrl}" target="_blank" class="directions-link">
                        Get Directions →
                    </a>
                ` : ''}
            </div>
        `;
    }

    calculateRoute() {
        // Filter out hotel from route (assuming you return there)
        const waypoints = this.config.locations
            .filter(loc => loc.type !== 'hotel' && loc.includeInRoute !== false)
            .map(loc => ({ location: loc.coordinates, stopover: true }));

        if (waypoints.length < 2) return;

        const request = {
            origin: waypoints[0].location,
            destination: waypoints[waypoints.length - 1].location,
            waypoints: waypoints.slice(1, -1),
            travelMode: google.maps.TravelMode.WALKING,
            optimizeWaypoints: false
        };

        this.directionsService.route(request, (result, status) => {
            if (status === 'OK') {
                this.directionsRenderer.setDirections(result);
                
                // Calculate total distance and time
                let totalDistance = 0;
                let totalDuration = 0;
                
                result.routes[0].legs.forEach(leg => {
                    totalDistance += leg.distance.value;
                    totalDuration += leg.duration.value;
                });

                // Display route info
                this.displayRouteInfo(totalDistance, totalDuration);
            }
        });
    }

    displayRouteInfo(distance, duration) {
        const distanceMiles = (distance * 0.000621371).toFixed(1);
        const durationMins = Math.round(duration / 60);
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'route-info';
        infoDiv.innerHTML = `
            <p>🚶 Total walking distance: ${distanceMiles} miles</p>
            <p>⏱️ Estimated walking time: ${durationMins} minutes</p>
        `;
        
        document.getElementById('location-list').appendChild(infoDiv);
    }

    renderLocationList() {
        const listContainer = document.getElementById('location-list');
        
        this.config.locations.forEach((location, index) => {
            const locationItem = document.createElement('div');
            locationItem.className = 'location-item';
            locationItem.innerHTML = `
                <div class="location-number">${index + 1}</div>
                <div class="location-details">
                    <h4>${location.name}</h4>
                    ${location.address ? `<p>${location.address}</p>` : ''}
                </div>
            `;
            
            locationItem.addEventListener('click', () => {
                this.map.panTo(location.coordinates);
                this.map.setZoom(16);
                
                // Open info window
                const markerData = this.markers.find(m => m.location === location);
                if (markerData) {
                    google.maps.event.trigger(markerData.marker, 'click');
                }
            });
            
            listContainer.appendChild(locationItem);
        });
    }

    getMapStyles() {
        // Custom map styles for a clean look
        return [
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#a2daf2" }]
            },
            {
                featureType: "landscape.man_made",
                elementType: "geometry",
                stylers: [{ color: "#f7f7f7" }]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ lightness: 100 }, { visibility: "simplified" }]
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#c5e1a5" }]
            }
        ];
    }

    renderPlaceholder() {
        this.container.innerHTML = `
            <div class="map-placeholder">
                <h2>Interactive Map</h2>
                <p>Google Maps API key required for interactive map functionality</p>
                <p>Please add your API key to enable the map</p>
            </div>
        `;
    }
}

// CSS styles for the map section
const mapStyles = `
<style>
    .map-header {
        text-align: center;
        padding: 40px 20px 30px;
    }

    .map-title {
        font-family: 'Bebas Neue', cursive;
        font-size: 3rem;
        color: #4682B4;
        letter-spacing: 2px;
        margin-bottom: 10px;
    }

    .map-subtitle {
        color: #666;
        font-size: 1.1rem;
    }

    #google-map {
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .map-locations {
        margin-top: 40px;
        padding: 30px;
        background: #f8fbff;
        border-radius: 20px;
    }

    .map-locations h3 {
        font-family: 'Bebas Neue', cursive;
        font-size: 1.8rem;
        color: #2c3e50;
        margin-bottom: 20px;
        letter-spacing: 1px;
    }

    .location-item {
        display: flex;
        align-items: center;
        padding: 15px;
        margin-bottom: 10px;
        background: white;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .location-item:hover {
        transform: translateX(10px);
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }

    .location-number {
        width: 40px;
        height: 40px;
        background: #4682B4;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin-right: 15px;
    }

    .location-details h4 {
        margin: 0 0 5px 0;
        color: #2c3e50;
    }

    .location-details p {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
    }

    .route-info {
        background: #e8f4ff;
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 20px;
    }

    .route-info p {
        margin: 5px 0;
        color: #2c3e50;
    }

    /* Info Window Styles */
    .map-info-window {
        padding: 10px;
        max-width: 250px;
    }

    .map-info-window h4 {
        margin: 0 0 10px 0;
        color: #2c3e50;
    }

    .map-info-window p {
        margin: 5px 0;
        color: #666;
        font-size: 0.9rem;
    }

    .directions-link {
        display: inline-block;
        margin-top: 10px;
        color: #4285F4;
        text-decoration: none;
        font-weight: 600;
    }

    .map-placeholder {
        text-align: center;
        padding: 100px 20px;
        background: #f0f0f0;
        border-radius: 20px;
    }
</style>
`;

// Example configuration
const mapConfig = {
    center: { lat: 34.4208, lng: -119.6982 }, // Santa Barbara
    zoom: 13,
    showRoute: true,
    locations: [
        {
            name: "Santa Barbara Train Station",
            type: "transport",
            coordinates: { lat: 34.4140, lng: -119.6945 },
            address: "209 State St, Santa Barbara, CA",
            time: "9:50 AM Departure / 1:45 PM Return",
            description: "Coast Starlight arrival and departure point"
        },
        {
            name: "Hotel Californian",
            type: "hotel",
            coordinates: { lat: 34.4165, lng: -119.6910 },
            address: "36 State St, Santa Barbara, CA",
            description: "Your luxury home base for the weekend",
            directionsUrl: "https://maps.google.com/?q=Hotel+Californian+Santa+Barbara"
        },
        {
            name: "Santa Barbara Zoo",
            type: "activity",
            coordinates: { lat: 34.4200, lng: -119.6640 },
            address: "500 Ninos Dr, Santa Barbara, CA",
            time: "Sunday 9:30 AM",
            description: "30-acre zoo with ocean views"
        },
        {
            name: "Stearns Wharf & Sea Center",
            type: "activity",
            coordinates: { lat: 34.4108, lng: -119.6859 },
            address: "Stearns Wharf, Santa Barbara, CA",
            time: "Sunday 2:00 PM",
            description: "Historic pier with Sea Center aquarium"
        },
        {
            name: "Chase Palm Park",
            type: "activity",
            coordinates: { lat: 34.4100, lng: -119.6875 },
            address: "323 E Cabrillo Blvd, Santa Barbara, CA",
            time: "Saturday 4:30 PM",
            description: "Oceanfront park with shipwreck playground"
        },
        {
            name: "MOXI Museum",
            type: "activity",
            coordinates: { lat: 34.4176, lng: -119.6989 },
            address: "125 State St, Santa Barbara, CA",
            time: "Monday 9:00 AM",
            description: "Interactive science museum"
        },
        {
            name: "Santa Barbara FisHouse",
            type: "restaurant",
            coordinates: { lat: 34.4124, lng: -119.6860 },
            address: "101 E Cabrillo Blvd, Santa Barbara, CA",
            time: "Saturday 7:00 PM",
            description: "Fresh seafood with ocean views"
        }
    ]
};

export default MapSection;
export { mapStyles, mapConfig };