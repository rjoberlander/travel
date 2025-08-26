#!/usr/bin/env python3
"""
Generate placeholder images for all Santa Barbara activities
Following the naming convention: image1.jpg, image2.jpg, etc.
"""

import os
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

# Activity folders and their details
ACTIVITIES = {
    "Hotel-Californian": {
        "title": "Hotel Californian",
        "color": "#4682B4",
        "images": ["Rooftop Pool View", "Luxury Suite", "Spa & Wellness"]
    },
    "Saturday-0950-CoastStarlight": {
        "title": "Coast Starlight Train",
        "color": "#87CEEB",
        "images": ["Ocean View from Train", "Sightseer Lounge", "Coastal Journey"]
    },
    "Saturday-1200-Lunch": {
        "title": "Lunch at State Street",
        "color": "#ff6b6b",
        "images": ["Local Restaurant", "Fresh Seafood", "Outdoor Dining"]
    },
    "Saturday-1600-ChasePalmPark": {
        "title": "Chase Palm Park",
        "color": "#4ECDC4",
        "images": ["Shipwreck Playground", "Beach Path", "Palm Trees"]
    },
    "Saturday-1900-FisHouse": {
        "title": "Santa Barbara FisHouse",
        "color": "#FF6347",
        "images": ["Seafood Platter", "Ocean View Dining", "Lobster Mac & Cheese"]
    },
    "Sunday-0930-SBZoo": {
        "title": "Santa Barbara Zoo",
        "color": "#90EE90",
        "images": ["Giraffe Feeding", "Sea Lions", "Tropical Birds"]
    },
    "Sunday-1200-ReunionKitchen": {
        "title": "Reunion Kitchen",
        "color": "#FFD700",
        "images": ["Brunch Spread", "Eggs Benedict", "Mimosa Bar"]
    },
    "Sunday-1500-SeaCenter": {
        "title": "Sea Center",
        "color": "#20B2AA",
        "images": ["Touch Tank", "Jellyfish Exhibit", "Marine Life"]
    },
    "Sunday-1700-WheelFunRentals": {
        "title": "Wheel Fun Rentals",
        "color": "#FF69B4",
        "images": ["Surrey Bikes", "Beach Cruisers", "Family Fun"]
    },
    "Sunday-1800-ShorelinePark": {
        "title": "Shoreline Park",
        "color": "#DDA0DD",
        "images": ["Sunset Views", "Picnic Area", "Coastal Trail"]
    },
    "Monday-0900-MOXI": {
        "title": "MOXI Museum",
        "color": "#1E90FF",
        "images": ["Interactive Exhibits", "Sky Garden", "Innovation Workshop"]
    },
    "Monday-1345-CoastStarlightReturn": {
        "title": "Coast Starlight Return",
        "color": "#4682B4",
        "images": ["Sunset Journey", "Coastal Views", "Train Interior"]
    }
}

def create_placeholder_image(text, color, size=(800, 600)):
    """Create a placeholder image with text"""
    # Create image with gradient background
    img = Image.new('RGB', size, color)
    draw = ImageDraw.Draw(img)
    
    # Add gradient effect
    for i in range(size[1]):
        alpha = int(255 * (1 - i / size[1] * 0.3))
        draw.rectangle([(0, i), (size[0], i+1)], fill=(*img.getpixel((0, 0)), alpha))
    
    # Try to use a nice font, fallback to default if not available
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 40)
        small_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 20)
    except:
        font = ImageFont.load_default()
        small_font = ImageFont.load_default()
    
    # Draw main text
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    x = (size[0] - text_width) // 2
    y = (size[1] - text_height) // 2
    
    # Add shadow
    draw.text((x+2, y+2), text, fill='black', font=font)
    draw.text((x, y), text, fill='white', font=font)
    
    # Add corner decoration
    draw.rectangle([(0, 0), (150, 40)], fill='white')
    draw.text((10, 10), "Placeholder", fill=color, font=small_font)
    
    return img

def generate_images():
    """Generate placeholder images for all activities"""
    base_path = Path("/Users/richard/Downloads/Travel/santa-barbara-images")
    
    for folder, details in ACTIVITIES.items():
        folder_path = base_path / folder
        
        # Skip if folder has real images already
        existing_images = list(folder_path.glob("*.jpg")) + list(folder_path.glob("*.png"))
        if existing_images:
            print(f"✓ {folder} already has images, skipping...")
            continue
        
        print(f"Generating images for {folder}...")
        
        # Create 3 images per activity
        for i, image_desc in enumerate(details["images"], 1):
            img = create_placeholder_image(
                f"{details['title']}\n{image_desc}",
                details["color"]
            )
            
            # Save as image1.jpg, image2.jpg, image3.jpg
            output_path = folder_path / f"image{i}.jpg"
            img.save(output_path, "JPEG", quality=85)
            print(f"  Created: image{i}.jpg - {image_desc}")
    
    print("\n✅ All placeholder images generated!")

if __name__ == "__main__":
    generate_images()