# Image Naming Convention for Travel Itinerary Generator

## Folder Structure
**Format**: `{Day}-{Time}-{ActivityName}/`
- **Day**: `Saturday`, `Sunday`, `Monday` 
- **Time**: 4-digit 24-hour format (e.g., `0950`, `1200`, `1600`)
- **ActivityName**: PascalCase, no spaces (e.g., `CoastStarlight`, `ChasePalmPark`)
- **Special**: `Hotel-{HotelName}` for accommodations

## Image Naming Convention
**Format**: `{priority}-{description}-{size}.jpg`

### Priority (Image Order)
- `01-` = Hero/Primary image (most important, used for main display)
- `02-` = Secondary feature image 
- `03-` = Third important image
- `04-` = Supporting image
- `05-` = Additional context
- `06-` = Supplementary content
- `07-` = Extra gallery content (and so on...)

### Description (Descriptive Keywords)
Use 2-3 hyphenated keywords describing the image content:
- `giraffe-feeding-experience`
- `ocean-view-dining`
- `shipwreck-playground-kids`
- `rooftop-pool-sunset`
- `interactive-science-exhibit`

### Size Classification (Optional but Recommended)
- `large` = Hero images, main features (should be landscape/wide)
- `tall` = Vertical images perfect for masonry top positions
- `square` = Square images for middle positions
- `wide` = Panoramic images for impact

## Complete Examples

### Santa Barbara Zoo
```
Sunday-0930-SBZoo/
├── 01-giraffe-feeding-experience-tall.jpg
├── 02-australian-walkabout-kangaroos-large.jpg  
├── 03-penguin-house-underwater-square.jpg
├── 04-zoo-train-ocean-view-wide.jpg
├── 05-california-condors-flight-tall.jpg
├── 06-sea-lion-pool-splash-square.jpg
├── 07-prairie-dog-village-kids-large.jpg
├── 08-big-cat-habitat-lions-tall.jpg
├── 09-childrens-zoo-petting-square.jpg
├── 10-zoo-entrance-welcome-large.jpg
```

### MOXI Museum
```
Monday-0900-MOXI/
├── 01-giant-guitar-walkthrough-tall.jpg
├── 02-sky-garden-rooftop-views-wide.jpg
├── 03-speed-track-racing-cars-large.jpg
├── 04-interactive-exhibits-hands-on-square.jpg
├── 05-wind-column-flight-test-tall.jpg
├── 06-sound-studio-recording-square.jpg
├── 07-3d-printing-lab-creation-large.jpg
├── 08-animation-studio-stopmotion-tall.jpg
├── 09-building-challenge-towers-square.jpg
├── 10-light-lab-color-optics-large.jpg
```

### Hotel Californian
```
Hotel-Californian/
├── 01-rooftop-pool-tantan-bar-wide.jpg
├── 02-ocean-mountain-views-360-large.jpg
├── 03-spanish-colonial-architecture-tall.jpg
├── 04-luxury-moroccan-suite-large.jpg
├── 05-poolside-dining-sunset-square.jpg
├── 06-lobby-design-interior-tall.jpg
├── 07-spa-majorelle-treatment-large.jpg
├── 08-funk-zone-location-square.jpg
├── 09-guest-room-ocean-view-large.jpg
├── 10-hotel-exterior-state-street-wide.jpg
```

## Image Content Strategy

### Image Types Required (10-12 per activity):
1. **Hero Shot** (01): Main attraction/venue exterior or signature feature
2. **Experience Shot** (02): People enjoying the activity or key interaction  
3. **Detail Shots** (03-05): Food, exhibits, or unique elements mentioned in reviews
4. **Context Shots** (06-08): Location, views, atmosphere, surroundings
5. **Interior/Features** (09-10): Inside spaces, amenities, additional features
6. **Bonus Content** (11-12): Social moments, seasonal variations, special angles

## Technical Requirements
- **Format**: JPEG (.jpg)
- **Quality**: High resolution, minimum 800px wide
- **Aspect Ratios**: Mixed (portrait, landscape, square) for masonry effect
- **File Size**: Optimized for web (under 500KB each)
- **Alt Text**: Use description portion of filename for accessibility

## Benefits of This System
- **Easy sorting**: Files naturally sort by importance (01, 02, 03...)
- **SEO friendly**: Descriptive filenames help with image search
- **Content clarity**: Immediately know what each image shows
- **Masonry optimization**: Size hints help with layout planning
- **Scalable**: Easy to add more images while maintaining organization

## Real Image Sourcing Priority
1. **Official business websites** and social media
2. **Unsplash/Pexels** with proper attribution
3. **Tourist board official photos**
4. **Creative Commons licensed images**
5. **Stock photography** (as last resort)

Remember: Always ensure proper licensing and attribution for all images used.