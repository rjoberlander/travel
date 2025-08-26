#!/usr/bin/env python3
"""
Simple batch image downloader using curl commands
"""

import os
import subprocess
import time

# Image URLs collected from official websites
IMAGE_URLS = {
    "Monday-0900-MOXI": {
        "folder": "santa-barbara-images/Monday-0900-MOXI",
        "start_num": 13,
        "urls": [
            "https://moxi.org/wp-content/uploads/2023/07/IMG_4238-scaled-600x400.jpeg",
            "https://moxi.org/wp-content/uploads/2023/07/IMG_4237-scaled-600x400.jpeg",
            "https://moxi.org/wp-content/uploads/2023/07/IMG_4233-scaled-600x400.jpeg"
        ]
    },
    "Saturday-1900-FisHouse": {
        "folder": "santa-barbara-images/Saturday-1900-FisHouse", 
        "start_num": 13,
        "urls": [
            "https://d1w7312wesee68.cloudfront.net/y8jrd4WexHd_66ci7hhe56W6Okw7a4vbtoUPRE-NGuA/ext:webp/quality:85/plain/s3://toast-sites-resources-prod/restaurantImages/54fa6343-aa77-43be-8041-bc2ed635d019/Screenshot%202023-05-11%20at%209.13.18%20PM.png",
            "https://d1w7312wesee68.cloudfront.net/SmqoSYNe_jdrfAdztp8WRlvDN1CNY6FOPwgLEDpPUzs/ext:webp/quality:85/plain/s3://toast-sites-resources-prod/restaurantImages/54fa6343-aa77-43be-8041-bc2ed635d019/Screenshot%202023-05-11%20at%209.12.39%20PM.png",
            "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-153137000000000000/restaurant_1702448361.jpg?size=small"
        ]
    },
    "Sunday-1200-ReunionKitchen": {
        "folder": "santa-barbara-images/Sunday-1200-ReunionKitchen",
        "start_num": 4,
        "urls": [
            # Will need to get these from Reunion Kitchen website
        ]
    },
    "Sunday-1500-SeaCenter": {
        "folder": "santa-barbara-images/Sunday-1500-SeaCenter",
        "start_num": 1,
        "urls": [
            # Will need to get these from Sea Center website
        ]
    },
    "Sunday-1700-WheelFunRentals": {
        "folder": "santa-barbara-images/Sunday-1700-WheelFunRentals",
        "start_num": 1,
        "urls": [
            # Will need to get these from Wheel Fun Rentals website
        ]
    },
    "Sunday-1800-ShorelinePark": {
        "folder": "santa-barbara-images/Sunday-1800-ShorelinePark",
        "start_num": 1,
        "urls": [
            # Will need to get these from Santa Barbara Parks website
        ]
    }
}

def download_images(location_name, config):
    """Download images for a location using curl"""
    if not config["urls"]:
        print(f"No URLs for {location_name}, skipping...")
        return
        
    print(f"\nProcessing {location_name}...")
    
    # Create folder if needed
    os.makedirs(config["folder"], exist_ok=True)
    
    # Download each image
    for i, url in enumerate(config["urls"]):
        image_num = config["start_num"] + i
        filepath = os.path.join(config["folder"], f"image{image_num}.jpg")
        
        print(f"  Downloading image{image_num}.jpg...")
        cmd = ["curl", "-s", "-o", filepath, url]
        subprocess.run(cmd)
        time.sleep(0.5)  # Be nice to servers
    
    print(f"  Completed {location_name}")

def main():
    """Download images for all locations"""
    print("Starting batch image download...")
    
    for location_name, config in IMAGE_URLS.items():
        download_images(location_name, config)
    
    print("\nDone! Checking results...")
    
    # Verify
    for location_name, config in IMAGE_URLS.items():
        folder = config["folder"]
        if os.path.exists(folder):
            count = len([f for f in os.listdir(folder) if f.endswith('.jpg')])
            print(f"  {location_name}: {count} images")

if __name__ == "__main__":
    main()