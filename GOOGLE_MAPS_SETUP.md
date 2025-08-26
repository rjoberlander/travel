# Google Maps Integration Setup Guide

## Prerequisites

You'll need a Google Cloud Platform account and a valid API key with the following APIs enabled:
- Maps JavaScript API
- Places API (optional, for enhanced location search)
- Directions API (for route calculation)

## Step 1: Get a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Maps JavaScript API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Maps JavaScript API"
   - Click on it and press "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

## Step 2: Secure Your API Key

1. Click on your API key in the credentials list
2. Under "Application restrictions":
   - Select "HTTP referrers (websites)"
   - Add your website URLs:
     ```
     http://localhost:*
     https://yourdomain.com/*
     ```
3. Under "API restrictions":
   - Select "Restrict key"
   - Choose the APIs: Maps JavaScript API, Directions API

## Step 3: Add Google Maps to Your HTML

Add this script tag before the closing `</body>` tag in your HTML file:

```html
<!-- Google Maps API -->
<script async defer 
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initializeMap">
</script>

<!-- Initialize Map -->
<script>
    // Map configuration with all your locations
    const mapConfig = {
        center: { lat: 34.4208, lng: -119.6982 }, // Santa Barbara center
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
                description: "Your luxury home base for the weekend"
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
            },
            {
                name: "Reunion Kitchen",
                type: "restaurant",
                coordinates: { lat: 34.4180, lng: -119.6985 },
                address: "2 E Ortega St, Santa Barbara, CA",
                time: "Sunday 12:00 PM",
                description: "Brunch spot with creative cocktails"
            },
            {
                name: "Shoreline Park",
                type: "activity",
                coordinates: { lat: 34.4048, lng: -119.7180 },
                address: "Shoreline Dr, Santa Barbara, CA",
                time: "Sunday 6:00 PM",
                description: "Clifftop park for sunset views"
            }
        ]
    };

    // Initialize map when Google Maps loads
    function initializeMap() {
        const mapSection = new MapSection(mapConfig, '#map-section');
        mapSection.init();
    }
</script>
```

## Step 4: Add the Map Container to Your HTML

Add this where you want the map to appear:

```html
<!-- Map Section -->
<section id="map-section" class="map-section">
    <!-- Map will be rendered here by JavaScript -->
</section>
```

## Step 5: Simple Implementation (Without Module)

If you're not using ES6 modules, here's a simplified version:

```html
<script>
function initializeMap() {
    // Map center (Santa Barbara)
    const center = { lat: 34.4208, lng: -119.6982 };
    
    // Create map
    const map = new google.maps.Map(document.getElementById('google-map'), {
        center: center,
        zoom: 13,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
    });

    // Your locations
    const locations = [
        { name: "Hotel Californian", lat: 34.4165, lng: -119.6910, icon: 'red' },
        { name: "Santa Barbara Zoo", lat: 34.4200, lng: -119.6640, icon: 'blue' },
        { name: "Stearns Wharf", lat: 34.4108, lng: -119.6859, icon: 'blue' },
        // Add more locations...
    ];

    // Add markers
    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name,
            icon: `https://maps.google.com/mapfiles/ms/icons/${location.icon}-dot.png`
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `<h4>${location.name}</h4>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}
</script>
```

## Step 6: Add the Map Container

```html
<section id="map-section" class="map-section">
    <div class="map-header">
        <h2 class="map-title">YOUR SANTA BARBARA ADVENTURE MAP</h2>
        <p class="map-subtitle">All locations plotted for easy navigation during your trip</p>
    </div>
    <div id="google-map" style="height: 600px; width: 100%; border-radius: 20px; overflow: hidden;"></div>
</section>
```

## Troubleshooting

### Common Issues:

1. **"Google is not defined" error**
   - Make sure the Google Maps script is loaded before your initialization code
   - Use the `callback` parameter in the script URL

2. **Map not showing**
   - Check browser console for API key errors
   - Verify your API key is active and has billing enabled
   - Check that the container has a defined height

3. **"RefererNotAllowedMapError"**
   - Add your domain to the API key's HTTP referrer restrictions
   - For local development, add `http://localhost:*`

4. **Billing Required**
   - Google Maps requires a billing account (but offers $200 free credit monthly)
   - Most small projects stay within the free tier

## Optional Enhancements

### Add Walking Directions Between Points:
```javascript
const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer();
directionsRenderer.setMap(map);

const request = {
    origin: locations[0],
    destination: locations[locations.length - 1],
    waypoints: locations.slice(1, -1).map(loc => ({ location: loc, stopover: true })),
    travelMode: google.maps.TravelMode.WALKING
};

directionsService.route(request, (result, status) => {
    if (status === 'OK') {
        directionsRenderer.setDirections(result);
    }
});
```

### Custom Map Styling:
```javascript
const mapStyles = [
    {
        featureType: "water",
        stylers: [{ color: "#a2daf2" }]
    },
    {
        featureType: "landscape",
        stylers: [{ color: "#f7f7f7" }]
    }
];

map.setOptions({ styles: mapStyles });
```

## Security Best Practices

1. **Never commit API keys to version control**
2. **Use environment variables for production**
3. **Restrict API key usage by domain**
4. **Monitor usage in Google Cloud Console**
5. **Set up billing alerts**

## Cost Considerations

- Google Maps offers $200 free monthly credit
- Map loads: $0.007 per load (28,500 free per month)
- Directions requests: $0.005 per request (40,000 free per month)
- Most travel itinerary sites stay well within free limits

## Alternative: Using an Iframe (No API Key Required)

For a simpler solution without API key:

```html
<iframe 
    src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d26359.07687456771!2d-119.71426!3d34.4208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e2!4m5!1s0x80e91479fc8a0a5f%3A0x7c5b7e3b7e3b7e3b!2sSanta%20Barbara%20Train%20Station!3m2!1d34.414!2d-119.6945!4m5!1s0x80e914c9b839ce87%3A0x7ada6e30f85f40a7!2sHotel%20Californian%2C%20State%20Street%2C%20Santa%20Barbara%2C%20CA!3m2!1d34.4165!2d-119.691!5e0!3m2!1sen!2sus!4v1234567890123"
    width="100%" 
    height="600" 
    style="border:0; border-radius: 20px;" 
    allowfullscreen="" 
    loading="lazy" 
    referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

Note: Iframe embeds are limited and don't support custom markers or interactivity.