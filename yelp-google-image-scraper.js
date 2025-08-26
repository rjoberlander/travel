const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

class LocationImageScraper {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: false, // Set to true for production
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        this.page = await this.browser.newPage();
        
        // Set user agent to avoid detection
        await this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    }

    async scrapeYelpImages(businessName, location, outputDir) {
        console.log(`Scraping Yelp images for: ${businessName} in ${location}`);
        
        const searchQuery = `${businessName} ${location}`;
        const yelpUrl = `https://www.yelp.com/search?find_desc=${encodeURIComponent(searchQuery)}`;
        
        await this.page.goto(yelpUrl, { waitUntil: 'networkidle2' });
        
        // Wait for results to load
        await this.page.waitForSelector('[data-testid="serp-ia-card"]', { timeout: 10000 });
        
        // Click on the first business result
        await this.page.click('[data-testid="serp-ia-card"] a');
        await this.page.waitForSelector('[data-testid="photo-header"]', { timeout: 10000 });
        
        // Navigate to photos section
        await this.page.click('a[href*="/photos"]');
        await this.page.waitForSelector('[data-testid="photo-header"]', { timeout: 10000 });
        
        // Get all image URLs
        const imageUrls = await this.page.evaluate(() => {
            const images = document.querySelectorAll('[data-testid="photo-header"] img');
            return Array.from(images, img => img.src).filter(src => src && !src.includes('placeholder'));
        });
        
        console.log(`Found ${imageUrls.length} images on Yelp`);
        
        // Download images
        await this.downloadImages(imageUrls, outputDir, 'yelp');
    }

    async scrapeGoogleImages(businessName, location, outputDir) {
        console.log(`Scraping Google images for: ${businessName} in ${location}`);
        
        const searchQuery = `${businessName} ${location}`;
        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`;
        
        await this.page.goto(googleUrl, { waitUntil: 'networkidle2' });
        
        // Wait for images to load
        await this.page.waitForSelector('img[data-src]', { timeout: 10000 });
        
        // Scroll to load more images
        await this.autoScroll();
        
        // Get all image URLs
        const imageUrls = await this.page.evaluate(() => {
            const images = document.querySelectorAll('img[data-src]');
            return Array.from(images, img => img.dataset.src).filter(src => src);
        });
        
        console.log(`Found ${imageUrls.length} images on Google`);
        
        // Download images
        await this.downloadImages(imageUrls, outputDir, 'google');
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
                    
                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    }

    async downloadImages(imageUrls, outputDir, source) {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        console.log(`Downloading ${imageUrls.length} images to ${outputDir}`);
        
        for (let i = 0; i < Math.min(imageUrls.length, 10); i++) { // Limit to 10 images
            const imageUrl = imageUrls[i];
            const fileName = `${source}_${i + 1}.jpg`;
            const filePath = path.join(outputDir, fileName);
            
            try {
                await this.downloadImage(imageUrl, filePath);
                console.log(`Downloaded: ${fileName}`);
            } catch (error) {
                console.error(`Failed to download ${fileName}:`, error.message);
            }
        }
    }

    async downloadImage(url, filePath) {
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(filePath);
            https.get(url, (response) => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            }).on('error', (err) => {
                fs.unlink(filePath, () => {}); // Delete the file if download failed
                reject(err);
            });
        });
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}

// Usage example
async function main() {
    const scraper = new LocationImageScraper();
    
    try {
        await scraper.init();
        
        // Example: Scrape images for a restaurant
        const businessName = "Santa Barbara FisHouse";
        const location = "Santa Barbara, CA";
        const outputDir = "./downloaded-images/fishouse";
        
        // Scrape from both sources
        await scraper.scrapeYelpImages(businessName, location, outputDir);
        await scraper.scrapeGoogleImages(businessName, location, outputDir);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await scraper.close();
    }
}

// Export for use in other files
module.exports = LocationImageScraper;

// Run if called directly
if (require.main === module) {
    main();
}
