const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

class EnhancedLocationImageScraper {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor'
            ]
        });
        this.page = await this.browser.newPage();
        
        // Set viewport and user agent
        await this.page.setViewport({ width: 1920, height: 1080 });
        await this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        
        // Intercept requests to block unnecessary resources
        await this.page.setRequestInterception(true);
        this.page.on('request', (req) => {
            if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
                req.continue();
            } else {
                req.continue();
            }
        });
    }

    async scrapeYelpImages(businessName, location, outputDir) {
        console.log(`🔍 Scraping Yelp images for: ${businessName} in ${location}`);
        
        try {
            const searchQuery = `${businessName} ${location}`;
            const yelpUrl = `https://www.yelp.com/search?find_desc=${encodeURIComponent(searchQuery)}`;
            
            await this.page.goto(yelpUrl, { waitUntil: 'networkidle2', timeout: 30000 });
            
            // Wait for search results
            await this.page.waitForSelector('[data-testid="serp-ia-card"]', { timeout: 15000 });
            
            // Click on the first business result
            const firstResult = await this.page.$('[data-testid="serp-ia-card"] a');
            if (firstResult) {
                await firstResult.click();
                await this.page.waitForTimeout(3000);
                
                // Navigate to photos section
                const photosLink = await this.page.$('a[href*="/photos"]');
                if (photosLink) {
                    await photosLink.click();
                    await this.page.waitForTimeout(3000);
                    
                    // Get high-resolution image URLs
                    const imageUrls = await this.page.evaluate(() => {
                        const images = document.querySelectorAll('img[src*="s3-media"]');
                        const urls = [];
                        
                        images.forEach(img => {
                            const src = img.src;
                            if (src && src.includes('s3-media') && !src.includes('placeholder')) {
                                // Convert to high-resolution version
                                const highResUrl = src.replace(/&w=\d+/, '&w=800').replace(/&h=\d+/, '&h=600');
                                urls.push(highResUrl);
                            }
                        });
                        
                        return [...new Set(urls)]; // Remove duplicates
                    });
                    
                    console.log(`📸 Found ${imageUrls.length} images on Yelp`);
                    await this.downloadImages(imageUrls, outputDir, 'yelp');
                }
            }
        } catch (error) {
            console.error(`❌ Error scraping Yelp: ${error.message}`);
        }
    }

    async scrapeGoogleImages(businessName, location, outputDir) {
        console.log(`🔍 Scraping Google images for: ${businessName} in ${location}`);
        
        try {
            const searchQuery = `${businessName} ${location} restaurant food interior exterior`;
            const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch&tbs=isz:l`;
            
            await this.page.goto(googleUrl, { waitUntil: 'networkidle2', timeout: 30000 });
            
            // Wait for images to load
            await this.page.waitForSelector('img[data-src]', { timeout: 15000 });
            
            // Scroll to load more images
            await this.autoScroll();
            
            // Get image URLs with multiple selector strategies
            const imageUrls = await this.page.evaluate(() => {
                const urls = new Set();
                
                // Strategy 1: data-src attribute
                const dataSrcImages = document.querySelectorAll('img[data-src]');
                dataSrcImages.forEach(img => {
                    if (img.dataset.src && img.dataset.src.startsWith('http')) {
                        urls.add(img.dataset.src);
                    }
                });
                
                // Strategy 2: src attribute with Google image URLs
                const srcImages = document.querySelectorAll('img[src*="gstatic.com"]');
                srcImages.forEach(img => {
                    if (img.src && img.src.startsWith('http')) {
                        urls.add(img.src);
                    }
                });
                
                // Strategy 3: Look for high-resolution versions
                const allImages = document.querySelectorAll('img');
                allImages.forEach(img => {
                    const src = img.src || img.dataset.src;
                    if (src && src.includes('gstatic.com') && src.includes('w=')) {
                        // Convert to higher resolution
                        const highResUrl = src.replace(/w=\d+/, 'w=800').replace(/h=\d+/, 'h=600');
                        urls.add(highResUrl);
                    }
                });
                
                return Array.from(urls);
            });
            
            console.log(`📸 Found ${imageUrls.length} images on Google`);
            await this.downloadImages(imageUrls, outputDir, 'google');
            
        } catch (error) {
            console.error(`❌ Error scraping Google: ${error.message}`);
        }
    }

    async scrapeGoogleMapsImages(businessName, location, outputDir) {
        console.log(`🗺️ Scraping Google Maps images for: ${businessName} in ${location}`);
        
        try {
            const searchQuery = `${businessName} ${location}`;
            const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
            
            await this.page.goto(mapsUrl, { waitUntil: 'networkidle2', timeout: 30000 });
            
            // Wait for business listing to load
            await this.page.waitForSelector('[data-value="Photos"]', { timeout: 15000 });
            
            // Click on Photos tab
            const photosTab = await this.page.$('[data-value="Photos"]');
            if (photosTab) {
                await photosTab.click();
                await this.page.waitForTimeout(3000);
                
                // Get image URLs
                const imageUrls = await this.page.evaluate(() => {
                    const images = document.querySelectorAll('img[src*="maps.googleapis.com"]');
                    return Array.from(images, img => img.src).filter(src => src && src.includes('maps.googleapis.com'));
                });
                
                console.log(`📸 Found ${imageUrls.length} images on Google Maps`);
                await this.downloadImages(imageUrls, outputDir, 'googlemaps');
            }
            
        } catch (error) {
            console.error(`❌ Error scraping Google Maps: ${error.message}`);
        }
    }

    async autoScroll() {
        await this.page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 100;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    
                    if (totalHeight >= scrollHeight || totalHeight > 3000) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 200);
            });
        });
    }

    async downloadImages(imageUrls, outputDir, source) {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        console.log(`💾 Downloading ${Math.min(imageUrls.length, 15)} images to ${outputDir}`);
        
        const downloadPromises = [];
        for (let i = 0; i < Math.min(imageUrls.length, 15); i++) {
            const imageUrl = imageUrls[i];
            const fileName = `${source}_${i + 1}.jpg`;
            const filePath = path.join(outputDir, fileName);
            
            downloadPromises.push(this.downloadImage(imageUrl, filePath, fileName));
        }
        
        await Promise.allSettled(downloadPromises);
    }

    async downloadImage(url, filePath, fileName) {
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(filePath);
            
            const request = https.get(url, (response) => {
                if (response.statusCode === 200) {
                    response.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log(`✅ Downloaded: ${fileName}`);
                        resolve();
                    });
                } else {
                    reject(new Error(`HTTP ${response.statusCode}`));
                }
            });
            
            request.on('error', (err) => {
                fs.unlink(filePath, () => {});
                console.error(`❌ Failed to download ${fileName}: ${err.message}`);
                reject(err);
            });
            
            request.setTimeout(10000, () => {
                request.destroy();
                reject(new Error('Timeout'));
            });
        });
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}

// Usage function
async function scrapeLocationImages(businessName, location, outputDir) {
    const scraper = new EnhancedLocationImageScraper();
    
    try {
        await scraper.init();
        
        // Scrape from all sources
        await scraper.scrapeYelpImages(businessName, location, outputDir);
        await scraper.scrapeGoogleImages(businessName, location, outputDir);
        await scraper.scrapeGoogleMapsImages(businessName, location, outputDir);
        
        console.log(`🎉 Completed scraping images for ${businessName}`);
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await scraper.close();
    }
}

// Example usage
async function main() {
    const locations = [
        { name: "Santa Barbara FisHouse", location: "Santa Barbara, CA" },
        { name: "Reunion Kitchen", location: "Santa Barbara, CA" },
        { name: "Shoreline Beach Cafe", location: "Santa Barbara, CA" }
    ];
    
    for (const loc of locations) {
        const outputDir = `./downloaded-images/${loc.name.toLowerCase().replace(/\s+/g, '-')}`;
        await scrapeLocationImages(loc.name, loc.location, outputDir);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait between locations
    }
}

module.exports = { EnhancedLocationImageScraper, scrapeLocationImages };

if (require.main === module) {
    main();
}
