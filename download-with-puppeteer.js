const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Equipment images - using the visible parts of the URLs from the screenshot
const equipmentImages = [
  { name: 'shoulder-equipment.jpg', title: 'Shoulder Equipment', 
    url: 'https://drive.google.com/file/d/1212LEMYRaL9Po3EfKyg0LUi_XNaUSqflpA' },
  { name: 'rogue-dynabody.jpg', title: 'Rogue-Dynabody', 
    url: 'https://drive.google.com/file/d/16lRJ6T69SVWqAQuxN-hxl9G_HTG' },
  { name: 'bench-press.jpg', title: 'Bench Press', 
    url: 'https://drive.google.com/file/d/1AtcNIEDlqJWU-h37pFvPY3GpJlVau' },
  { name: 'precore-icarian-paramount.jpg', title: 'Precore-Icarian-Paramount Equipment', 
    url: 'https://drive.google.com/file/d/1Or0ySG8cBAUfUsacMNYQxe6Ulu--2m-' },
  { name: 'powerlift-racks.jpg', title: 'PowerLift Racks', 
    url: 'https://drive.google.com/file/d/18PsvXjodeTaw0_K6WvgPOUAOW2' },
  { name: 'leg-equipment.jpg', title: 'Leg Equipment', 
    url: 'https://drive.google.com/file/d/1TuWlV-kOeEtOJhBGqJRpa87JdHOpDyT' },
  { name: 'hammer-strength.jpg', title: 'Hammer Strength Equipment', 
    url: 'https://drive.google.com/file/d/10C5HRtq_f9Hoc6hrwTrfNw01nHNl8Jn' },
  { name: 'free-weights-room.jpg', title: 'Free Weights Room', 
    url: 'https://drive.google.com/file/d/1PNsLIBfmHcM_Bd8o4cO_BiE2aJ-pL1_tsLaoKh2' },
  { name: 'chest-equipment.jpg', title: 'Chest Equipment', 
    url: 'https://drive.google.com/file/d/1fc6XPJifIVhGtynnqtqRFltvdiDsLZhULg3iMJ' },
  { name: 'cardio-equipment.jpg', title: 'Cardio Equipment', 
    url: 'https://drive.google.com/file/d/CJUArDFpAcEHN5QT9DG_DGPfh' },
  { name: 'camstar-equipment.jpg', title: 'Camstar Equipment', 
    url: 'https://drive.google.com/file/d/1Gte5JqM4PnxLVrnToIyChkYVUZ_oZI2' },
  { name: 'bodymaster-equipment.jpg', title: 'BodyMaster Equipment', 
    url: 'https://drive.google.com/file/d/TVyDrJGDaCJbFOHCdkhlvlMo8JyBdnRy' },
  { name: 'back-equipment.jpg', title: 'Back Equipment', 
    url: 'https://drive.google.com/file/d/16PcOdJCyoOC7mT-vS_V_8Ys' }
];

async function downloadWithPuppeteer() {
  console.log('🚀 Starting Puppeteer download process...\n');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Create equipment directory
  const equipmentDir = path.join(__dirname, 'public', 'images', 'equipment');
  if (!fs.existsSync(equipmentDir)) {
    fs.mkdirSync(equipmentDir, { recursive: true });
  }
  
  let successCount = 0;
  
  for (let i = 0; i < equipmentImages.length; i++) {
    const item = equipmentImages[i];
    console.log(`Downloading ${i + 1}/${equipmentImages.length}: ${item.title}`);
    
    try {
      // Navigate to the Google Drive page
      await page.goto(item.url + '/view', { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      // Wait for the image to load
      await page.waitForTimeout(2000);
      
      // Try to find the image element
      const imageUrl = await page.evaluate(() => {
        // Look for the main image in various possible selectors
        const selectors = [
          'img[data-iml]',
          'img[data-atf="1"]',
          'div[role="img"] img',
          'img.ndfHFb-c4YZDc-HiaYvf',
          'img[src*="drive.google.com"]'
        ];
        
        for (const selector of selectors) {
          const img = document.querySelector(selector);
          if (img && img.src && !img.src.includes('profile_photo')) {
            return img.src;
          }
        }
        
        // If no image found, look for video preview (sometimes images are shown as video preview)
        const video = document.querySelector('video');
        if (video && video.poster) {
          return video.poster;
        }
        
        return null;
      });
      
      if (imageUrl) {
        console.log('  Found image URL, downloading...');
        
        // Download the image
        const viewSource = await page.goto(imageUrl);
        const buffer = await viewSource.buffer();
        
        const filePath = path.join(equipmentDir, item.name);
        fs.writeFileSync(filePath, buffer);
        
        const stats = fs.statSync(filePath);
        console.log(`✅ Downloaded: ${item.title} (${Math.round(stats.size / 1024)}KB)`);
        successCount++;
      } else {
        console.log(`❌ Could not find image URL for ${item.title}`);
        
        // Try alternative: take a screenshot of the preview
        const previewElement = await page.$('img, video');
        if (previewElement) {
          const filePath = path.join(equipmentDir, item.name);
          await previewElement.screenshot({ path: filePath });
          console.log(`📸 Captured screenshot for ${item.title}`);
          successCount++;
        }
      }
      
      // Wait between downloads
      await page.waitForTimeout(2000);
      
    } catch (error) {
      console.log(`❌ Error downloading ${item.title}: ${error.message}`);
    }
  }
  
  await browser.close();
  
  console.log(`\n✨ Download complete! ${successCount}/${equipmentImages.length} images processed`);
  console.log(`📁 Images saved to: ${equipmentDir}`);
}

// Run the download
downloadWithPuppeteer().catch(console.error);