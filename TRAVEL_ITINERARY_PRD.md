# Travel Itinerary Generator - Product Requirements Document (PRD)

## Overview
A system to create beautiful, interactive travel itinerary websites that combine vintage travel poster aesthetics with modern functionality. Each generated site should feel like a personalized travel magazine optimized for both digital viewing and printing.

## Core Features That Worked Well (From Santa Barbara Project)

### 1. Visual Design System
- **Vintage Travel Poster Aesthetic**: Bebas Neue headers, Playfair Display serif accents, ocean-inspired gradients
- **Modern Responsive Layout**: Mobile-first approach with elegant desktop enhancements  
- **Pinterest Gallery Layout**: 30% text content + 70% masonry gallery with dramatic size variations
- **Color Palette**: Ocean blues (#4682B4, #87CEEB), coral accents (#ff6b6b), warm backgrounds (#fef9f3)

### 2. Interactive Components
- **Live Countdown Timer**: Calculates days/hours/minutes until trip departure
- **Smooth Scroll Navigation**: Sticky nav with smooth anchor scrolling
- **Photo Lightbox**: Click-to-expand image gallery viewer
- **Print Optimization**: Clean print styles that hide digital-only elements

### 3. Content Structure That Resonates
- **Pro Tips**: Insider knowledge that adds value ("Sit on left side for ocean views")
- **Review Integration**: Real quotes from Yelp/TripAdvisor with ratings
- **Must-Try Lists**: Curated highlights from actual visitor reviews  
- **Instagram Integration**: Links to businesses' social media for authentic photos
- **Detailed Timing**: Specific times and duration estimates for each activity

### 4. Essential Information Architecture
- **Daily Sections**: Clear day-by-day breakdown with distinctive headers
- **Weather Integration**: 3-day forecast with hourly breakdowns and UV/air quality
- **Hotel Spotlight**: Dedicated section with amenities, photos, and guest favorites
- **Interactive Map**: Embedded Google Maps showing all locations in sequence
- **Transportation Details**: Specific departure times, train info, logistics

## Pinterest Gallery Layout System (Proven Success Pattern)

### Layout Structure
**30/70 Split Design** - Optimized for maximum visual impact while maintaining readability:

#### Left Column (30% - Content Area):
```html
<div class="activity-info">
    <div class="activity-time">9:30 AM</div>
    <h3 class="activity-title">Activity Name</h3>
    <p class="activity-description">Detailed description...</p>
    <div class="rating-info">★★★★☆ Reviews & ratings</div>
    <div class="must-try-list">Curated highlights</div>
    <div class="activity-highlight">Pro tips</div>
</div>
```

#### Right Column (70% - Pinterest Gallery):
```html
<div class="gallery-container">
    <div class="masonry-gallery" id="unique-gallery-id">
        <!-- 6 visible images initially -->
        <div class="gallery-item">
            <div class="gallery-placeholder size-class">Content</div>
            <div class="gallery-caption">Description</div>
        </div>
        <!-- 4-6 hidden images for "Show More" -->
        <div class="gallery-item hidden">...</div>
    </div>
    <div class="show-more-container">
        <button class="show-more-btn">Show More Photos</button>
        <div class="photo-count">6 of 10 photos</div>
    </div>
</div>
```

### Image Size Variations (Key to Pinterest Look):
- **super-tall**: 450px - Hero images, dominant features
- **extra-tall**: 360px - Important secondary content  
- **tall**: 280px - Standard prominent images
- **medium**: 200px - Balanced supporting content
- **small**: 120px - Accent pieces, details

### Visual Effects:
- **Fade-out gradient**: Bottom 60px fades images into button area
- **Floating "Show More" button**: Overlays gallery at bottom center
- **Hover animations**: Images lift with enhanced shadows
- **Caption overlays**: Slide up on hover with descriptive text

### Responsive Behavior:
- **Desktop (1200px+)**: 3-column masonry, full size variations
- **Tablet (768px-1024px)**: 2-column masonry, scaled proportions
- **Mobile (480px-768px)**: 2-column compact, adjusted heights
- **Phone (<480px)**: Single column, optimized for touch

### Implementation Requirements:
1. **Unique gallery IDs**: Each activity needs distinct identifier
2. **Size class mixing**: Vary `small`, `medium`, `tall`, `extra-tall`, `super-tall` 
3. **Strategic hidden content**: 4-6 additional images for expansion
4. **Proper image naming**: Follow `01-description-size.jpg` convention

## Technical Architecture

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── ActivityCard/
│   │   ├── CountdownTimer/
│   │   ├── WeatherWidget/
│   │   ├── PhotoGallery/
│   │   ├── HotelSection/
│   │   └── NavigationBar/
│   ├── styles/
│   │   ├── vintage-travel.css
│   │   ├── responsive.css
│   │   └── print.css
│   ├── assets/
│   │   ├── images/
│   │   └── fonts/
│   └── utils/
│       ├── dateCalculations.js
│       ├── weatherAPI.js
│       └── mapIntegration.js
├── templates/
│   ├── base-layout.html
│   ├── activity-card.html
│   └── hotel-section.html
└── public/
    └── generated-sites/
```

### Backend Structure  
```
backend/
├── src/
│   ├── data_collection/
│   │   ├── yelp_scraper.py
│   │   ├── weather_api.py
│   │   ├── instagram_integration.py
│   │   └── maps_api.py
│   ├── content_generation/
│   │   ├── itinerary_builder.py
│   │   ├── review_curator.py
│   │   ├── pro_tip_generator.py
│   │   └── must_try_compiler.py
│   ├── image_management/
│   │   ├── placeholder_generator.py
│   │   ├── image_optimizer.py
│   │   └── gallery_organizer.py
│   └── site_generation/
│       ├── html_generator.py
│       ├── template_engine.py
│       └── static_site_builder.py
├── config/
│   ├── api_keys.py
│   ├── design_themes.py
│   └── content_templates.py
└── data/
    ├── destinations/
    ├── activities/
    └── generated_content/
```

## Input Requirements

### Minimum Viable Input
1. **Destination**: City/region name
2. **Duration**: Number of days (2-7 days optimal)
3. **Transportation**: How getting there (flight, train, car)
4. **Accommodation**: Hotel name or area preference
5. **Interests**: 3-5 activity categories (food, nature, museums, etc.)

### Enhanced Input (Optional)
- Specific activities or restaurants already researched
- Travel dates for accurate weather/events
- Budget range for activity recommendations
- Group composition (couple, family, solo)
- Mobility considerations

## Content Generation Requirements

### Research & Data Collection
- **Review Mining**: Extract highlights from Yelp, TripAdvisor, Google Reviews
- **Instagram Discovery**: Find businesses' social media for authentic photos
- **Weather Integration**: Real forecast data for travel dates
- **Insider Tips**: Research local blogs, forums for unique insights
- **Timing Optimization**: Calculate realistic travel times between locations

### Content Quality Standards
- **Pro Tips**: Must provide actionable, non-obvious advice
- **Review Quotes**: Select quotes that paint vivid pictures, not generic praise
- **Must-Try Items**: Specific dishes/experiences mentioned in multiple reviews
- **Activity Descriptions**: Balance practical info with aspirational language
- **Accessibility Info**: Include relevant details for families, mobility needs

## Design Requirements

### Visual Hierarchy
1. **Hero Section**: Destination name, dates, transportation method
2. **Daily Sections**: Clear day headers with distinctive styling
3. **Activity Cards**: Image + content in alternating layout
4. **Essential Info**: Weather, hotel, map get dedicated prominence
5. **Footer**: Call-to-action and final inspiration

### Responsive Behavior  
- **Mobile**: Single column, touch-friendly galleries, condensed nav
- **Tablet**: Partial two-column layout, larger touch targets
- **Desktop**: Full alternating card layout, hover states, sidebar nav
- **Print**: Clean single-column, hide interactive elements, preserve essential info

### Performance Standards
- **Load Time**: Under 3 seconds on mobile
- **Image Optimization**: WebP format with JPEG fallbacks
- **Offline Capability**: Service worker for core functionality
- **SEO Optimization**: Meta tags, structured data, clean URLs

## Image Management System

### Folder Naming Convention
**Format**: `{Day}-{Time}-{ActivityName}/`
- **Day**: `Saturday`, `Sunday`, `Monday`
- **Time**: 24-hour format like `0950`, `1200`, `1600`
- **ActivityName**: CamelCase, no spaces (e.g., `CoastStarlight`, `ChasePalmPark`)
- **Special**: `Hotel-{HotelName}` for accommodations

**Examples**:
- `Saturday-0950-CoastStarlight/`
- `Sunday-1500-SeaCenter/`
- `Hotel-Californian/`

### Image Naming Convention
**Format**: `image{number}.jpg` where number is 1, 2, 3, etc.
- `image1.jpg` - Primary/hero image for the activity
- `image2.jpg` - Secondary image showing different aspect
- `image3.jpg` - Third image for gallery completion
- Maximum 4-6 images per activity for optimal loading

### Image Content Strategy
Each activity should have 3-4 images covering:
1. **Hero Shot**: Main attraction/venue exterior or signature feature
2. **Experience Shot**: People enjoying the activity or key interaction
3. **Detail Shot**: Food, exhibits, or unique elements mentioned in reviews
4. **Context Shot**: Location, views, or atmosphere (optional)

### Placeholder Strategy
- Generate themed placeholders for each activity type
- Color-coded by category (blue for water, green for nature, etc.)
- Include activity name and brief description overlay
- Maintain consistent aspect ratios (800x600px) across galleries
- Use descriptive captions from review research

### Real Image Integration
- API connections to Unsplash, business Instagram accounts
- Smart cropping and optimization for consistent layout
- Alt text generation for accessibility
- Lazy loading for performance
- WebP format with JPEG fallbacks

## Success Metrics

### User Engagement
- **Time on Page**: Target 5+ minutes average
- **Print Rate**: 20%+ of visitors print the itinerary  
- **Mobile Usage**: Optimized for 60%+ mobile traffic
- **Return Visits**: Clear navigation enables reference during trip

### Content Quality
- **Review Integration**: 80%+ of activities include real visitor quotes
- **Timing Accuracy**: Travel times within 15% of reality
- **Local Relevance**: Include 3+ "local secrets" per destination
- **Seasonal Awareness**: Weather-appropriate recommendations

## Technical Considerations

### API Dependencies
- **Weather**: OpenWeatherMap or similar for forecast data
- **Maps**: Google Maps API for location and routing
- **Reviews**: Yelp API, Google Places API for ratings/reviews
- **Images**: Unsplash API, Instagram Basic Display API

### Scalability Requirements
- **Static Site Generation**: Each itinerary as standalone HTML
- **Template System**: Reusable components for consistent styling
- **Content Caching**: Store researched data for popular destinations
- **Batch Processing**: Generate multiple itineraries efficiently

### Deployment Strategy
- **CDN Distribution**: Fast global loading via Cloudflare/AWS
- **Version Control**: Git-based workflow for templates and content
- **Backup Strategy**: Regular backups of generated sites and source data
- **Analytics Integration**: Track usage patterns for improvement

## Future Enhancements

### Phase 2 Features
- **Multi-language Support**: Generate itineraries in different languages
- **Budget Integration**: Real-time pricing for activities and restaurants
- **Group Collaboration**: Allow multiple people to contribute to planning
- **Mobile App**: Companion app for navigation and real-time updates

### Advanced Personalization
- **AI Recommendations**: Machine learning for activity suggestions
- **Weather Adaptation**: Dynamic recommendations based on forecast
- **Real-time Updates**: Live updates for closures, events, traffic
- **Social Sharing**: Easy sharing of generated itineraries

---

*This PRD represents learnings from the Santa Barbara weekend project and provides a blueprint for creating similarly engaging travel itinerary generators for any destination.*