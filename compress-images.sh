#!/bin/bash

# Compress all images in santa-barbara-images folder
echo "Compressing images..."

# Find all jpg files and compress them
find santa-barbara-images -name "*.jpg" -type f | while read file; do
    echo "Compressing: $file"
    # Resize to max 1200px width/height and compress to 85% quality
    sips -Z 1200 --setProperty formatOptions 85 "$file" --out "$file" 2>/dev/null
done

echo "Compression complete!"

# Show new folder size
echo "New folder size:"
du -sh santa-barbara-images/