#!/usr/bin/env python3
"""
Batch image downloader for Santa Barbara locations
Downloads images from official websites for multiple locations in parallel
"""

import asyncio
import aiohttp
import os
import json
from urllib.parse import urljoin, urlparse
import re

# Configuration for each location
LOCATIONS = {
    "Monday-0900-MOXI": {
        "folder": "santa-barbara-images/Monday-0900-MOXI",
        "start_num": 13,  # Already has 12 images
        "needed": 3,
        "urls": [
            "https://moxi.org/",
            "https://moxi.org/explore/",
            "https://moxi.org/explore/exhibits/",
            "https://moxi.org/explore/innovation-workshop/"
        ],
        "keywords": ["exhibit", "workshop", "innovation", "science", "interactive"]
    },
    "Saturday-1900-FisHouse": {
        "folder": "santa-barbara-images/Saturday-1900-FisHouse",
        "start_num": 13,  # Already has 12 images
        "needed": 3,
        "urls": [
            "https://fishousesb.com/",
            "https://fishousesb.com/menu"
        ],
        "keywords": ["seafood", "lobster", "fish", "dining", "restaurant"]
    },
    "Sunday-1200-ReunionKitchen": {
        "folder": "santa-barbara-images/Sunday-1200-ReunionKitchen",
        "start_num": 4,  # Already has 3 images
        "needed": 12,
        "urls": [
            "https://www.reunionkitchen.net/",
            "https://www.reunionkitchen.net/menus/",
            "https://www.reunionkitchen.net/gallery/"
        ],
        "keywords": ["brunch", "breakfast", "patio", "cocktail", "food"]
    },
    "Sunday-1500-SeaCenter": {
        "folder": "santa-barbara-images/Sunday-1500-SeaCenter",
        "start_num": 1,  # No images yet
        "needed": 15,
        "urls": [
            "https://www.sbnature.org/visit/sea-center",
            "https://www.sbnature.org/",
            "https://www.sbnature.org/gallery"
        ],
        "keywords": ["marine", "aquarium", "ocean", "jellyfish", "touch tank", "sea life"]
    },
    "Sunday-1700-WheelFunRentals": {
        "folder": "santa-barbara-images/Sunday-1700-WheelFunRentals",
        "start_num": 1,  # No images yet
        "needed": 15,
        "urls": [
            "https://wheelfunrentals.com/",
            "https://wheelfunrentals.com/ca/santa-barbara/east-beach/",
            "https://wheelfunrentals.com/rentals/"
        ],
        "keywords": ["bike", "surrey", "bicycle", "beach cruiser", "rental", "family"]
    },
    "Sunday-1800-ShorelinePark": {
        "folder": "santa-barbara-images/Sunday-1800-ShorelinePark",
        "start_num": 1,  # No images yet
        "needed": 15,
        "urls": [
            "https://santabarbaraca.gov/government/departments/parks-recreation/parks-facilities/parks/shoreline-park",
            "https://santabarbaraca.gov/",
            "https://www.santabarbaraca.com/listing/shoreline-park/269/"
        ],
        "keywords": ["sunset", "cliff", "ocean view", "park", "shoreline", "picnic"]
    }
}

async def fetch_page(session, url):
    """Fetch a web page and return its content"""
    try:
        async with session.get(url, timeout=10) as response:
            if response.status == 200:
                return await response.text()
    except Exception as e:
        print(f"Error fetching {url}: {e}")
    return ""

def extract_image_urls(html, base_url, keywords):
    """Extract image URLs from HTML that match keywords"""
    image_urls = []
    
    # Find all img tags
    img_pattern = r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>'
    matches = re.findall(img_pattern, html, re.IGNORECASE)
    
    # Also find background images
    bg_pattern = r'background-image:\s*url\(["\']?([^"\')\s]+)["\']?\)'
    bg_matches = re.findall(bg_pattern, html, re.IGNORECASE)
    
    # Also find data-src (lazy loading)
    data_src_pattern = r'data-src=["\']([^"\']+)["\']'
    data_matches = re.findall(data_src_pattern, html, re.IGNORECASE)
    
    all_urls = matches + bg_matches + data_matches
    
    for url in all_urls:
        # Make absolute URL
        absolute_url = urljoin(base_url, url)
        
        # Filter out logos, icons, and small images
        if any(skip in absolute_url.lower() for skip in ['logo', 'icon', 'button', 'arrow']):
            continue
            
        # Check if URL contains any keywords or is a general image
        if any(keyword in absolute_url.lower() for keyword in keywords) or \
           any(ext in absolute_url.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp']):
            image_urls.append(absolute_url)
    
    # Remove duplicates and return
    return list(set(image_urls))

async def download_image(session, url, filepath):
    """Download an image from URL to filepath"""
    try:
        async with session.get(url, timeout=30) as response:
            if response.status == 200:
                content = await response.read()
                with open(filepath, 'wb') as f:
                    f.write(content)
                return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
    return False

async def process_location(location_name, config):
    """Process a single location - fetch pages and download images"""
    print(f"\nProcessing {location_name}...")
    
    # Create folder if it doesn't exist
    os.makedirs(config['folder'], exist_ok=True)
    
    async with aiohttp.ClientSession() as session:
        # Fetch all URLs for this location
        all_image_urls = []
        for url in config['urls']:
            print(f"  Fetching {url}...")
            html = await fetch_page(session, url)
            if html:
                image_urls = extract_image_urls(html, url, config['keywords'])
                all_image_urls.extend(image_urls)
                print(f"    Found {len(image_urls)} images")
        
        # Remove duplicates
        all_image_urls = list(set(all_image_urls))
        print(f"  Total unique images found: {len(all_image_urls)}")
        
        # Download needed images
        downloaded = 0
        image_num = config['start_num']
        
        for url in all_image_urls:
            if downloaded >= config['needed']:
                break
                
            filepath = os.path.join(config['folder'], f"image{image_num}.jpg")
            print(f"  Downloading image{image_num}.jpg from {url[:50]}...")
            
            success = await download_image(session, url, filepath)
            if success:
                downloaded += 1
                image_num += 1
            
        print(f"  Downloaded {downloaded} images for {location_name}")

async def main():
    """Main function to process all locations"""
    print("Starting batch image download for Santa Barbara locations...")
    
    # Process all locations concurrently
    tasks = []
    for location_name, config in LOCATIONS.items():
        task = process_location(location_name, config)
        tasks.append(task)
    
    await asyncio.gather(*tasks)
    
    print("\nAll locations processed!")
    
    # Verify results
    print("\nVerification:")
    for location_name, config in LOCATIONS.items():
        folder = config['folder']
        if os.path.exists(folder):
            count = len([f for f in os.listdir(folder) if f.endswith('.jpg')])
            print(f"  {location_name}: {count} images")

if __name__ == "__main__":
    asyncio.run(main())