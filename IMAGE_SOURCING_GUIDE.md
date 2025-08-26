# Complete Image Sourcing Guide for Travel Itineraries

## Overview
This guide provides step-by-step instructions for sourcing, downloading, and organizing high-quality images for travel itinerary websites. Follow this process to build stunning Pinterest-style galleries that engage visitors and reduce customer support needs.

## Image Sourcing Priority (Best to Lowest Quality)

### 1. 🏆 **Official Business Websites & Social Media** (HIGHEST PRIORITY)
**Why**: Authentic, high-quality, properly licensed, shows actual experience
**Sources**:
- Business official websites (.com domains)
- Official Instagram accounts (@businessname)
- Official Facebook pages 
- Google My Business photos
- TripAdvisor business-uploaded photos

### 2. 🥈 **Tourism Board Official Media**
**Why**: Professional photography, destination-approved, high resolution
**Sources**:
- Visit Santa Barbara (santabarbaraca.com)
- California Tourism Board
- Local CVB (Convention & Visitors Bureau) sites
- Official destination Instagram accounts

### 3. 🥉 **Creative Commons & Open Source**
**Why**: Free to use, often high quality, properly licensed
**Sources**:
- Unsplash.com (search "Santa Barbara [attraction]")
- Pexels.com
- Wikimedia Commons
- Flickr Creative Commons

### 4. 📸 **Stock Photography** (LAST RESORT)
**Why**: Generic, expensive, may not show actual location
**Sources**: Shutterstock, Getty Images, Adobe Stock

## Step-by-Step Sourcing Process

### Phase 1: Research & Discovery (15 minutes per activity)

#### Step 1: Identify Official Sources
1. **Google search**: "[Business Name] official website"
2. **Instagram search**: "@[businessname]" or "#[businessname]"
3. **Find social handles**: Usually listed on official website footer
4. **Check Google My Business**: Often has customer and business photos

#### Step 2: Create Source List Template
For each activity, document:
```
Activity: Santa Barbara Zoo
Official Website: sbzoo.org
Instagram: @santabarbarazoo
Facebook: /SantaBarbaraZoo
Google My Business: Yes - multiple photos
TripAdvisor: Yes - business gallery section
```

### Phase 2: Image Collection Using Puppeteer (20 minutes per activity)

#### Step 3: Automated Website Scraping with Puppeteer
**New Method - Using Puppeteer for Dynamic Content**:
1. Navigate to official website using Puppeteer
2. Handle any privacy popups or consent forms
3. Navigate to key pages: Homepage, Gallery, Exhibits, Visit sections
4. Use JavaScript evaluation to find all substantial images:
```javascript
const images = Array.from(document.querySelectorAll('img')).filter(img => {
    return img.src && 
           !img.src.includes('logo') && 
           !img.src.includes('icon') &&
           img.naturalWidth > 400 &&
           img.naturalHeight > 300;
});
```
5. Collect image URLs with metadata (alt text, dimensions)
6. Download using curl with proper headers to avoid blocking

**Target Pages**:
- Homepage hero images
- Gallery/Photos sections
- Activity/Attraction specific pages
- "Visit" or "Experience" pages
- Interactive exhibit pages

#### Step 4: Instagram Content Discovery via Puppeteer
**Automated Instagram Scraping**:
1. Navigate to Instagram profile page using Puppeteer
2. Scroll to load more posts dynamically
3. Extract post image URLs from the grid
4. Filter for high-quality images (resolution > 600px)
5. Download using curl with Instagram-specific headers

**Best Practices**:
- Look for business-posted content (not user-generated)
- Target recent posts from last 6 months
- Focus on images showing experiences, not just exterior shots
- Collect at least 15-20 images to choose from

**Instagram Image URL Pattern**:
```
https://scontent-*.cdninstagram.com/v/t51.*.jpg
```

#### Step 5: Direct Download Strategy
**Using curl for reliable downloads**:
1. Create directory structure first
2. Use curl with proper headers to avoid blocking:
```bash
curl -o image1.jpg "URL" \
  -H "User-Agent: Mozilla/5.0" \
  -H "Referer: https://instagram.com/"
```
3. Download multiple images in parallel for efficiency
4. Verify successful downloads before proceeding

### Phase 3: Image Processing (10 minutes per activity)

#### Step 6: Image Selection & Curation
**Selection Criteria**:
- **Image quality**: Minimum 800px width, crisp focus
- **Content relevance**: Shows actual experience visitors will have
- **Emotional appeal**: People enjoying activities, not empty spaces
- **Lighting**: Natural lighting preferred, avoid heavily filtered images
- **Composition**: Mix of wide shots, detail shots, and people shots

**Content Mix per Activity (10-12 images)**:
- 1-2 Hero shots (exterior, main attraction)
- 2-3 Experience shots (people enjoying activity)
- 2-3 Detail shots (food, exhibits, unique features)
- 2-3 Context shots (views, atmosphere, surroundings)
- 1-2 Supporting shots (amenities, facilities)

#### Step 7: Download & Organize Images
**Updated Naming Format**: `image{number}.jpg` where number is 1-15+

**Process**:
1. Download images directly to activity folder using curl
2. Name images sequentially: `image1.jpg`, `image2.jpg`, etc.
3. Start numbering from 4 if placeholder images exist (will be deleted)
4. Download 15+ images per activity for optimal gallery variety

**Folder Organization**:
```
santa-barbara-images/
├── Monday-0900-MOXI/
│   ├── image1.jpg    (delete if placeholder)
│   ├── image2.jpg    (delete if placeholder)
│   ├── image3.jpg    (delete if placeholder)
│   ├── image4.jpg    (new downloaded image)
│   ├── image5.jpg    (new downloaded image)
│   └── ... up to image15.jpg or more
```

**Important**: Delete any existing placeholder images (typically image1-3.jpg) before adding new content

## Specific Santa Barbara Business Guide

### 🦒 Santa Barbara Zoo
**Official Sources**:
- Website: sbzoo.org/visit, sbzoo.org/attractions
- Instagram: @santabarbarazoo (14K followers)
- Key photo opportunities: Giraffe feeding deck, train, Australian walkabout, penguin house

**Image Priority List**:
1. `01-giraffe-feeding-experience-super-tall.jpg` - People feeding giraffes
2. `02-australian-walkabout-kangaroos-large.jpg` - Visitors with kangaroos
3. `03-penguin-house-underwater-medium.jpg` - Penguins swimming
4. `04-zoo-train-ocean-view-tall.jpg` - C.P. Huntington train with ocean backdrop
5. `05-california-condors-flight-extra-tall.jpg` - Condors in flight or perched
6. `06-ocean-views-from-zoo-small.jpg` - Pacific Ocean view from zoo

### 🎸 MOXI Museum
**Official Sources**:
- Website: moxi.org/exhibits, moxi.org/visit
- Instagram: @moxisb (8K followers)
- Key features: Giant guitar, Sky Garden, Speed Track, interactive exhibits

**Image Priority List**:
1. `01-giant-guitar-walkthrough-super-tall.jpg` - Kids inside 24-ft guitar
2. `02-sky-garden-rooftop-views-wide.jpg` - Rooftop garden with ocean views
3. `03-speed-track-racing-cars-large.jpg` - Children racing custom cars
4. `04-interactive-exhibits-hands-on-square.jpg` - Kids engaged with STEAM activities
5. `05-wind-column-flight-test-tall.jpg` - Testing flying objects in wind tunnel
6. `06-sound-studio-recording-small.jpg` - Children recording sound effects

### 🚢 Chase Palm Park
**Official Sources**:
- Website: santabarbaraca.gov/parks (search Chase Palm Park)
- Instagram: Search #ChasePalmPark, #ShipwreckPlayground
- Key features: Shipwreck playground, whale sculptures, carousel house

### 🐟 Santa Barbara FisHouse  
**Official Sources**:
- Website: fishousesb.com
- Instagram: @fishousesb (if available)
- Google My Business: Multiple food and interior photos
- Key features: Lobster mac & cheese, ocean view patio, fresh seafood

## Quality Control Checklist

Before finalizing images, verify:
- [ ] **Resolution**: Minimum 800px width
- [ ] **Format**: JPEG preferred (.jpg extension)
- [ ] **File size**: Under 500KB each (compress if needed)
- [ ] **Naming**: Follows `01-description-size.jpg` convention
- [ ] **Content**: Shows actual business/activity accurately  
- [ ] **Mix**: Variety of shot types (wide, detail, people, context)
- [ ] **Rights**: From official business sources or Creative Commons
- [ ] **Relevance**: Matches content described in activity text

## Legal & Attribution Notes

### Safe Usage Guidelines:
- **Business official photos**: Generally safe to use for promotional purposes
- **Social media posts**: Use business-posted content, avoid user-generated content
- **Creative Commons**: Check specific license requirements
- **Fair Use**: Educational/informational use generally protected

### Attribution Best Practices:
```html
<!-- In HTML comments or credits section -->
<!-- Images courtesy of Santa Barbara Zoo (sbzoo.org) -->
<!-- MOXI Museum photography (moxi.org) -->
<!-- Tourism photography: Visit Santa Barbara -->
```

## Tools & Browser Extensions

### Helpful Tools:
- **Image Downloader for Chrome**: Batch download from web pages
- **Instagram Photo Downloader**: Browser extension for Instagram
- **TinyPNG**: Compress images while maintaining quality
- **EXIF Viewer**: Check image metadata and resolution

### File Management:
- **Bulk Rename Utility** (Windows): Batch rename files
- **Name Mangler** (Mac): Batch file renaming
- **ImageOptim**: Lossless image compression

## Time Estimates

Per activity (10-12 images):
- **Research & source identification**: 15 minutes
- **Image collection & download**: 20 minutes  
- **Processing & renaming**: 10 minutes
- **Quality control**: 5 minutes
- **Total per activity**: ~50 minutes

For Santa Barbara project (4 activities):
- **Total estimated time**: 3-4 hours
- **Recommended approach**: 1 activity per session to maintain quality

## Final File Structure

```
santa-barbara-images/
├── Saturday-0950-CoastStarlight/
│   ├── 01-ocean-views-train-super-tall.jpg
│   ├── 02-sightseer-lounge-interior-large.jpg
│   ├── 03-coastal-route-scenery-medium.jpg
│   └── ...
├── Sunday-0930-SBZoo/
│   ├── 01-giraffe-feeding-experience-super-tall.jpg
│   ├── 02-australian-walkabout-kangaroos-large.jpg
│   └── ...
└── [Additional activity folders...]
```

This systematic approach ensures high-quality, legally safe, and properly organized images that will make your Pinterest-style galleries shine!