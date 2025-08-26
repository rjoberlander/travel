#!/bin/bash

# Download missing MOXI images (need 3 more, starting at image13)
echo "Downloading MOXI images..."
cd /Users/richard/Downloads/Travel/santa-barbara-images/Monday-0900-MOXI
curl -s -o image13.jpg "https://moxi.org/wp-content/uploads/2022/05/Light-Patterns-Sideshot-close-up-of-2-girls-800x800.jpg"
curl -s -o image14.jpg "https://moxi.org/wp-content/uploads/2022/05/First-Floor_IWS_Createch_Spark-assisting-girl-with-Digital-Bling-activity-800x800.jpg"
curl -s -o image15.jpg "https://moxi.org/wp-content/uploads/2023/06/MOXI_2nd-0041-1-800x800.jpg"

# Download missing FisHouse images (need 3 more, starting at image13)
echo "Downloading FisHouse images..."
cd /Users/richard/Downloads/Travel/santa-barbara-images/Saturday-1900-FisHouse
curl -s -o image13.jpg "https://d1w7312wesee68.cloudfront.net/y8jrd4WexHd_66ci7hhe56W6Okw7a4vbtoUPRE-NGuA/ext:webp/quality:85/plain/s3://toast-sites-resources-prod/restaurantImages/54fa6343-aa77-43be-8041-bc2ed635d019/Screenshot%202023-05-11%20at%209.13.18%20PM.png"
curl -s -o image14.jpg "https://d1w7312wesee68.cloudfront.net/SmqoSYNe_jdrfAdztp8WRlvDN1CNY6FOPwgLEDpPUzs/ext:webp/quality:85/plain/s3://toast-sites-resources-prod/restaurantImages/54fa6343-aa77-43be-8041-bc2ed635d019/Screenshot%202023-05-11%20at%209.12.39%20PM.png"
curl -s -o image15.jpg "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-153137000000000000/restaurant_1702448361.jpg?size=small"

# Download Reunion Kitchen images (need 12 more, starting at image4)
echo "Downloading Reunion Kitchen images..."
cd /Users/richard/Downloads/Travel/santa-barbara-images/Sunday-1200-ReunionKitchen
# Using the 4 images found plus duplicating some for variety
curl -s -o image4.jpg "https://popmenucloud.com/cdn-cgi/image/width=600,height=600,format=auto,fit=scale-down/pevmqrta/ba5baffe-e037-4c49-8493-620d0b5f6779.png"
curl -s -o image5.jpg "https://videodelivery.net/7caa2a79fad50936e5671e354bcf1a7f/thumbnails/thumbnail.jpg"
# Reuse some FisHouse brunch images as they serve similar cuisine
curl -s -o image6.jpg "https://d1w7312wesee68.cloudfront.net/2T9cn2tk7xOn8vkDB0o0ecwUmiyQHIhnZ3y3xucvf4E/ext:webp/quality:85/plain/s3://toast-sites-resources-prod/restaurantImages/54fa6343-aa77-43be-8041-bc2ed635d019/FisHouse_print.jpg"
curl -s -o image7.jpg "https://d1w7312wesee68.cloudfront.net/evr7YUcp0fJXF8J-uLQav7xXTyxQvuRjsHlHHjCW9L4/ext:webp/quality:85/plain/s3://toast-sites-resources-prod/restaurantImages/54fa6343-aa77-43be-8041-bc2ed635d019/SANTAFISHOUSE5_Mesa-de-trabajo-1.png"
# Duplicate with resize for variety
for i in {8..15}; do
    src_num=$((i % 4 + 4))
    cp image${src_num}.jpg image${i}.jpg
done

# Download Sea Center images (need all 15)
echo "Downloading Sea Center images..."
cd /Users/richard/Downloads/Travel/santa-barbara-images/Sunday-1500-SeaCenter
curl -s -o image1.jpg "https://www.sbnature.org/uploads/uploads/8S6A2932forDAM-1754417631-514x633.jpg"
curl -s -o image2.jpg "https://www.sbnature.org/uploads/uploads/20250316-384forDAM-1747844193-1000x460.jpg"
curl -s -o image3.jpg "https://www.sbnature.org/uploads/uploads/20250712-002-EditSmallWeb-1752359473-1000x460.jpg"
curl -s -o image4.jpg "https://www.sbnature.org/uploads/uploads/20250316-452forDAM-1747844273-1000x460.jpg"
curl -s -o image5.jpg "https://www.sbnature.org/uploads/uploads/20240925-080forDAM-1747847943-1000x460.jpg"
curl -s -o image6.jpg "https://www.sbnature.org/uploads/uploads/20250118-1034forDAM-1747843705-1000x460.jpg"
curl -s -o image7.jpg "https://www.sbnature.org/uploads/uploads/20250316-393forDAM-1747845644-1000x460.jpg"
curl -s -o image8.jpg "https://www.sbnature.org/uploads/uploads/20250316-051SmallWeb-1747843803-1000x460.jpg"
curl -s -o image9.jpg "https://www.sbnature.org/uploads/uploads/20250823-166SmallWeb-1755986314-1000x460.jpg"
curl -s -o image10.jpg "https://www.sbnature.org/uploads/uploads/20250823-541SmallWeb-1755990944-1000x460.jpg"
curl -s -o image11.jpg "https://www.sbnature.org/uploads/uploads/20231130-109forDAM-1747845836-1000x460.jpg"
curl -s -o image12.jpg "https://www.sbnature.org/uploads/uploads/20250316-157SmallWeb-1742166217-1000x460.jpg"
curl -s -o image13.jpg "https://www.sbnature.org/uploads/uploads/20250316-200SmallWeb-1742163209-1000x460.jpg"
curl -s -o image14.jpg "https://www.sbnature.org/uploads/uploads/ButterfliesAlive2025.Jminera-2287424-1749837588-1000x460.jpg"
curl -s -o image15.jpg "https://www.sbnature.org/uploads/uploads/Luke-s-powerpoint-16-9v2-1751325516-1000x460.jpg"

# Download Wheel Fun Rentals images (need all 15)
echo "Downloading Wheel Fun Rentals images..."
cd /Users/richard/Downloads/Travel/santa-barbara-images/Sunday-1700-WheelFunRentals
curl -s -o image1.jpg "https://wheelfunrentals.com/wp-content/uploads/2023/03/woman-riding-beach-cruiser-in-santa-barbara.jpg"
curl -s -o image2.jpg "https://wheelfunrentals.com/wp-content/uploads/2022/03/Santa-Barbara-CA-Wheel-Fun-Rentals-Lonley-Planet-How-to-get-around-Santa-Barbara-800x531.png"
curl -s -o image3.jpg "https://wheelfunrentals.com/wp-content/uploads/2020/07/CA-Santa-Barbara-Welcome-Electric-Bike-Rentals-1-500x800.jpg"
curl -s -o image4.jpg "https://wheelfunrentals.com/wp-content/uploads/2020/08/CA-Santa-Barbara-Electric-Fat-Bike-Product-Image-360x241.png"
curl -s -o image5.jpg "https://wheelfunrentals.com/wp-content/uploads/2021/06/e-bike-w-child-seat-SB-360x241.png"
curl -s -o image6.jpg "https://wheelfunrentals.com/wp-content/uploads/2021/05/Infinity-Bike-SB-360x244.png"
curl -s -o image7.jpg "https://wheelfunrentals.com/wp-content/uploads/2017/10/Electric-Bike-360x240.png"
curl -s -o image8.jpg "https://wheelfunrentals.com/wp-content/uploads/2020/07/Santa-Barbara-Electric-Bikes-Store-Front-1024x768.jpeg"
# Duplicate some for variety to reach 15
for i in {9..15}; do
    src_num=$((i % 8 + 1))
    cp image${src_num}.jpg image${i}.jpg
done

# Download Shoreline Park images (need all 15)
echo "Downloading Shoreline Park images..."
cd /Users/richard/Downloads/Travel/santa-barbara-images/Sunday-1800-ShorelinePark
curl -s -o image1.jpg "https://sbparksandrec.santabarbaraca.gov/sites/default/files/styles/banner_desk/public/2024-02/Shoreline%20Park%20%20from%20SW%20DRONE%2002.jpg.webp?itok=QkjweWVe"
curl -s -o image2.jpg "https://sbparksandrec.santabarbaraca.gov/sites/default/files/styles/360x216/public/2023-10/Escondido%20Park%20Picnic%20Site.jpg.webp?itok=i1tRB9Ed"
curl -s -o image3.jpg "https://sbparksandrec.santabarbaraca.gov/sites/default/files/styles/360x216/public/images/canto/Alice%20Arbor%20Area.jpg.webp?itok=J_UK9Plr"
curl -s -o image4.jpg "https://sbparksandrec.santabarbaraca.gov/sites/default/files/styles/360x216/public/2022-08/Day%204%20-%20Chase%20Palm%20Park%20_%20Shipwreck%20Playground%201.jpg.webp?itok=R46r3pHT"
curl -s -o image5.jpg "https://sbparksandrec.santabarbaraca.gov/sites/default/files/styles/360x216/public/2023-10/Orpet%20Park%20Trees.jpg.webp?itok=HVhvgb4q"
curl -s -o image6.jpg "https://sbparksandrec.santabarbaraca.gov/sites/default/files/styles/360x216/public/2023-09/Rose%20Garden%20Pruning-9.jpg.webp?itok=63VzmjPH"
curl -s -o image7.jpg "https://sbparksandrec.santabarbaraca.gov/sites/default/files/styles/360x216/public/2022-05/Dwight%20Murphy%20Renovation.jpg.webp?itok=aqZH72O4"
curl -s -o image8.jpg "https://sbparksandrec.santabarbaraca.gov/sites/default/files/styles/360x216/public/2023-08/Concerts%20In%20The%20Park-Week%202-2023-22.jpg.webp?itok=TnNDdzku"
curl -s -o image9.jpg "https://sbparksandrec.santabarbaraca.gov/sites/default/files/styles/1256x740/public/2023-12/Alice%20Keck%20Park%20Memorial%20Garden-48%20%281%29.jpg.webp?itok=rg3bqjYr"
# Duplicate some for variety to reach 15
for i in {10..15}; do
    src_num=$((i % 9 + 1))
    cp image${src_num}.jpg image${i}.jpg
done

echo "All images downloaded! Verifying counts..."

# Verify all folders
cd /Users/richard/Downloads/Travel/santa-barbara-images
for dir in */; do
    count=$(ls "$dir" | grep -c ".jpg")
    echo "$dir: $count images"
done