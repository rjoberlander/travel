#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont
import requests
from io import BytesIO

# Define image folders and their placeholder texts
image_folders = {
    "Saturday-0950-CoastStarlight": ["Pacific Ocean Views", "Train Interior", "Coastal Scenery"],
    "Saturday-1200-Lunch": ["Funk Zone Restaurants", "Outdoor Dining", "Local Cuisine"],
    "Saturday-1600-ChasePalmPark": ["Shipwreck Playground", "Surfacing Whales", "Conch Shell Lighthouse"],
    "Saturday-1900-FisHouse": ["Fresh Seafood", "Ocean View Dining", "Fire Pit Patio"],
    "Sunday-0930-SBZoo": ["Giraffe Feeding", "Australian Walkabout", "Penguin House", "Zoo Train"],
    "Sunday-1200-ReunionKitchen": ["Beachfront Dining", "Crispy Ribs", "Cocktails"],
    "Sunday-1500-SeaCenter": ["Touch Pools", "Gray Whale Exhibit", "Moon Jellies"],
    "Sunday-1700-WheelFunRentals": ["Surrey Bikes", "Beach Path", "Family Fun"],
    "Sunday-1800-ShorelinePark": ["Ocean Views", "Playground", "Whale Watching"],
    "Monday-0900-MOXI": ["Giant Guitar", "Sky Garden", "Interactive Exhibits"],
    "Monday-1345-CoastStarlightReturn": ["Return Journey", "Sunset Views", "Coastal Route"],
    "Hotel-Californian": ["Rooftop Pool", "Tan-Tan Bar", "Spanish Architecture", "Luxury Rooms"]
}

base_dir = "/Users/richard/Downloads/Travel/santa-barbara-images"

# Create placeholder images
for folder, captions in image_folders.items():
    folder_path = os.path.join(base_dir, folder)
    os.makedirs(folder_path, exist_ok=True)
    
    for i, caption in enumerate(captions):
        img_path = os.path.join(folder_path, f"image{i+1}.jpg")
        
        # Skip if image already exists
        if os.path.exists(img_path):
            continue
            
        # Create placeholder image
        img = Image.new('RGB', (800, 600), color=(240, 240, 240))
        draw = ImageDraw.Draw(img)
        
        # Add text
        text = f"{caption}"
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 40)
        except:
            font = ImageFont.load_default()
            
        # Get text bounding box
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        # Center text
        x = (800 - text_width) // 2
        y = (600 - text_height) // 2
        
        draw.text((x, y), text, fill=(150, 150, 150), font=font)
        
        # Add border
        draw.rectangle([0, 0, 799, 599], outline=(200, 200, 200), width=2)
        
        # Save image
        img.save(img_path, 'JPEG', quality=85)
        print(f"Created placeholder: {img_path}")

print("Placeholder images created!")