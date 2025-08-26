# Travel Itinerary Generator

A beautiful, interactive travel itinerary website generator that combines vintage travel poster aesthetics with modern functionality. This project creates Pinterest-style travel guides optimized for both digital viewing and printing.

## 🎯 Project Overview

This system generates stunning travel itinerary websites featuring:
- Vintage travel poster design aesthetic
- Pinterest-style masonry photo galleries
- Interactive maps with all locations
- Live countdown timer
- Weather forecasts
- Mobile-responsive design
- Print-optimized styles

## 🎨 Design System

### Visual Identity
- **Primary Font**: Bebas Neue (headers, titles)
- **Secondary Font**: Playfair Display (elegant accents)
- **Body Font**: Roboto (readable content)
- **Color Palette**:
  - Ocean Blues: `#4682B4`, `#87CEEB`
  - Coral Accent: `#ff6b6b`
  - Warm Background: `#fef9f3`
  - Text: `#2c3e50` (dark), `#666` (secondary)

### Layout Structure
- **Hero Section**: Gradient background with destination name
- **Countdown Timer**: Real-time countdown with days, hours, minutes, seconds
- **Navigation**: Sticky nav bar with smooth scrolling
- **Activity Cards**: 30/70 split layout (30% content, 70% gallery)
- **Map Section**: Embedded Google Maps with all locations
- **Weather Widget**: 3-day forecast display

## 📁 Project Structure

```
travel-itinerary/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ActivityCard/
│   │   │   ├── CountdownTimer/
│   │   │   ├── WeatherWidget/
│   │   │   ├── PhotoGallery/
│   │   │   ├── HotelSection/
│   │   │   ├── NavigationBar/
│   │   │   └── MapSection/
│   │   └── styles/
│   └── [generated-itinerary].html
├── backend/
│   └── src/
│       └── data_collection/
│           └── weather_api.py
├── santa-barbara-images/
│   ├── Hotel-[Name]/
│   ├── [Day]-[Time]-[ActivityName]/
│   └── ...
├── TRAVEL_ITINERARY_PRD.md
├── IMAGE_NAMING_CONVENTION.md
└── GOOGLE_MAPS_SETUP.md
```

## 🖼️ Image Management System

### Folder Naming Convention
```
Format: {Day}-{Time}-{ActivityName}/
Examples:
- Saturday-0950-CoastStarlight/
- Sunday-0930-SBZoo/
- Hotel-Californian/
```

### Image Naming Convention
```
image1.jpg - Primary/hero image
image2.jpg - Secondary image
image3.jpg - Additional gallery image
```

### Image Requirements
- Optimal size: 800x600px minimum
- Format: JPG for photos, PNG for graphics
- 3-6 images per activity for best gallery display

## 🗺️ Map Integration

We use embedded Google Maps iframe (no API key required):

```html
<iframe 
    src="https://www.google.com/maps/embed?pb=!1m76!1m12!1m3!..."
    width="100%" 
    height="600" 
    style="border:0; border-radius: 20px;" 
    allowfullscreen="" 
    loading="lazy">
</iframe>
```

### Creating Map URLs
1. Go to [Google Maps](https://maps.google.com)
2. Search for your destination
3. Add multiple stops using "Add destination"
4. Click "Share" → "Embed a map"
5. Copy the iframe code

## 📋 Activity Card Layout

### Pinterest-Style Gallery (70% width)
```html
<div class="gallery-container">
    <div class="masonry-gallery">
        <!-- 6 visible images initially -->
        <div class="gallery-item [size-class]">
            <img src="path/to/image.jpg" alt="Description">
            <div class="gallery-caption">Caption text</div>
        </div>
        <!-- Hidden images for "Show More" -->
        <div class="gallery-item hidden">...</div>
    </div>
    <button class="show-more-btn">Show More Photos</button>
</div>
```

### Size Classes for Visual Variety
- `small`: 120px height
- `medium`: 200px height
- `tall`: 280px height
- `extra-tall`: 360px height
- `super-tall`: 450px height

### Activity Info Section (30% width)
```html
<div class="activity-info">
    <div class="activity-time">9:30 AM</div>
    <h3 class="activity-title">Activity Name</h3>
    <p class="activity-description">Description...</p>
    <div class="rating-info">★★★★☆ 4.5/5 • 1,234 Reviews</div>
    <div class="must-try-list">
        <div class="must-try-title">MUST-TRY HIGHLIGHTS</div>
        <div class="must-try-item">🍕 Famous pizza</div>
    </div>
    <div class="activity-highlight">
        Pro tip: Insider advice here...
    </div>
</div>
```

## ⏰ Countdown Timer Implementation

```javascript
function updateCountdown() {
    const tripDate = new Date('2025-08-30T09:50:00');
    const now = new Date();
    const difference = tripDate - now;
    
    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
}

setInterval(updateCountdown, 1000); // Update every second
```

## 🌤️ Weather Integration

### Mock Weather Display (No API Key)
```html
<div class="weather-forecast">
    <div class="weather-day">
        <h3>Saturday</h3>
        <div style="font-size: 3rem;">☀️</div>
        <div style="font-size: 1.8rem;">72°/58°</div>
        <p>Partly Cloudy</p>
    </div>
    <!-- Repeat for each day -->
</div>
```

### With Weather API (Optional)
See `backend/src/data_collection/weather_api.py` for OpenWeatherMap integration.

## 🎯 Content Guidelines

### Activity Descriptions
- **Length**: 2-3 sentences
- **Tone**: Enthusiastic but informative
- **Focus**: What makes this special/unique

### Pro Tips
- **Format**: "Pro tip: [specific actionable advice]"
- **Content**: Insider knowledge, timing tips, money-saving advice
- **Length**: 1-2 sentences

### Must-Try Lists
- **Items**: 3-5 per activity
- **Format**: Emoji + item name + brief description
- **Source**: Real reviews from Yelp/TripAdvisor

### Review Integration
- **Rating**: Stars + numeric rating + review count
- **Quote**: Select vivid, descriptive quotes
- **Attribution**: "- Yelp Reviewer" or similar

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px-1199px (adjusted galleries)
- **Mobile**: <768px (single column)

### Mobile Optimizations
- Single column layout
- Touch-friendly buttons (min 44px)
- Simplified navigation
- Optimized image sizes

## 🖨️ Print Styles

```css
@media print {
    .navigation, .countdown-container, .show-more-btn {
        display: none !important;
    }
    .activity-card {
        page-break-inside: avoid;
    }
    .hidden {
        display: block !important; /* Show all gallery images */
    }
}
```

## 🚀 Creating a New Itinerary

### Step 1: Prepare Your Data
```javascript
const itineraryData = {
    destination: "Santa Barbara",
    dates: "August 30 - September 1, 2025",
    departureTime: "2025-08-30T09:50:00",
    days: [
        {
            name: "Saturday",
            activities: [
                {
                    time: "9:50 AM",
                    title: "Coast Starlight Train",
                    description: "Scenic train journey...",
                    rating: { stars: 5, count: 1234 },
                    mustTry: ["Window seats", "Cafe car"],
                    proTip: "Sit on left side for ocean views",
                    images: ["image1.jpg", "image2.jpg", "image3.jpg"]
                }
            ]
        }
    ]
};
```

### Step 2: Generate Image Folders
Run the image generation script:
```bash
python3 generate-all-images.py
```

### Step 3: Create HTML from Template
1. Copy `santa-barbara-weekend-corrected.html` as template
2. Update destination, dates, and countdown timer
3. Replace activity cards with your data
4. Update map iframe with your locations

### Step 4: Add Real Images
Replace placeholder images in each folder with real photos following the naming convention.

## 🎨 Customization Options

### Color Themes
```css
/* Beach/Coastal Theme */
--primary: #4682B4;
--secondary: #87CEEB;
--accent: #ff6b6b;

/* Mountain/Forest Theme */
--primary: #2d5a3d;
--secondary: #8fbc8f;
--accent: #d2691e;

/* Desert Theme */
--primary: #cd853f;
--secondary: #f4a460;
--accent: #dc143c;
```

### Font Alternatives
- Headers: Montserrat, Oswald, Anton
- Body: Open Sans, Lato, Source Sans Pro
- Accent: Merriweather, Lora, Crimson Text

## 📊 Performance Optimization

1. **Image Optimization**
   - Use WebP format with JPG fallbacks
   - Lazy loading for gallery images
   - Appropriate sizing (max 1200px width)

2. **Code Optimization**
   - Minify CSS/JS for production
   - Inline critical CSS
   - Async load non-critical scripts

3. **Caching Strategy**
   - Cache static assets
   - Use service worker for offline access

## 🐛 Troubleshooting

### Common Issues

1. **Countdown timer shows wrong time**
   - Check timezone in date string
   - Ensure correct date format: `YYYY-MM-DDTHH:MM:SS`

2. **Images not loading**
   - Verify file paths are correct
   - Check image naming (image1.jpg, not image01.jpg)
   - Ensure images are in correct folders

3. **Map not showing**
   - Verify iframe URL is complete
   - Check for content security policy issues
   - Ensure internet connection

4. **Gallery layout broken**
   - Check for missing CSS classes
   - Verify grid container structure
   - Ensure size classes are applied

## 📚 Additional Resources

- [Google Fonts](https://fonts.google.com) - Font selection
- [Unsplash](https://unsplash.com) - Free travel photos
- [OpenWeatherMap](https://openweathermap.org) - Weather API
- [Google Maps Embed](https://developers.google.com/maps/documentation/embed/start) - Map documentation

## 🤝 Contributing

1. Follow the established design patterns
2. Maintain consistent naming conventions
3. Test on multiple devices and browsers
4. Optimize images before adding
5. Update documentation for new features

---

Built with ❤️ for travelers who appreciate beautiful itineraries