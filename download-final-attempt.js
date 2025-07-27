const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Equipment images array
const equipmentImages = [
  { name: 'shoulder-equipment.jpg', title: 'Shoulder Equipment', id: '1212LEMYRaL9Po3EfKyg0LUi_XNaUSqflpA' },
  { name: 'rogue-dynabody.jpg', title: 'Rogue-Dynabody', id: '16lRJ6T69SVWqAQuxN-hxl9G_HTG' },
  { name: 'bench-press.jpg', title: 'Bench Press', id: '1AtcNIEDlqJWU-h37pFvPY3GpJlVau' },
  { name: 'precore-icarian-paramount.jpg', title: 'Precore-Icarian-Paramount Equipment', id: '1Or0ySG8cBAUfUsacMNYQxe6Ulu--2m-' },
  { name: 'powerlift-racks.jpg', title: 'PowerLift Racks', id: '18PsvXjodeTaw0_K6WvgPOUAOW2' },
  { name: 'leg-equipment.jpg', title: 'Leg Equipment', id: '1TuWlV-kOeEtOJhBGqJRpa87JdHOpDyT' },
  { name: 'hammer-strength.jpg', title: 'Hammer Strength Equipment', id: '10C5HRtq_f9Hoc6hrwTrfNw01nHNl8Jn' },
  { name: 'free-weights-room.jpg', title: 'Free Weights Room', id: '1PNsLIBfmHcM_Bd8o4cO_BiE2aJ-pL1_tsLaoKh2' },
  { name: 'chest-equipment.jpg', title: 'Chest Equipment', id: '1fc6XPJifIVhGtynnqtqRFltvdiDsLZhULg3iMJ' },
  { name: 'cardio-equipment.jpg', title: 'Cardio Equipment', id: 'CJUArDFpAcEHN5QT9DG_DGPfh' },
  { name: 'camstar-equipment.jpg', title: 'Camstar Equipment', id: '1Gte5JqM4PnxLVrnToIyChkYVUZ_oZI2' },
  { name: 'bodymaster-equipment.jpg', title: 'BodyMaster Equipment', id: 'TVyDrJGDaCJbFOHCdkhlvlMo8JyBdnRy' },
  { name: 'back-equipment.jpg', title: 'Back Equipment', id: '16PcOdJCyoOC7mT-vS_V_8Ys' }
];

// Create equipment directory
const equipmentDir = path.join(__dirname, 'public', 'images', 'equipment');
if (!fs.existsSync(equipmentDir)) {
  fs.mkdirSync(equipmentDir, { recursive: true });
}

// Function to download using direct URL
function downloadDirect(id, filename) {
  return new Promise((resolve) => {
    const filePath = path.join(equipmentDir, filename);
    const file = fs.createWriteStream(filePath);
    
    // Use the direct download URL format
    const url = `https://drive.google.com/uc?export=download&id=${id}`;
    
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 303) {
        // Handle redirect
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          
          file.on('finish', () => {
            file.close();
            const stats = fs.statSync(filePath);
            if (stats.size > 5000) {
              console.log(`✅ Downloaded: ${filename} (${Math.round(stats.size / 1024)}KB)`);
              resolve(true);
            } else {
              fs.unlinkSync(filePath);
              resolve(false);
            }
          });
        });
      } else {
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(filePath);
          if (stats.size > 5000) {
            console.log(`✅ Downloaded: ${filename} (${Math.round(stats.size / 1024)}KB)`);
            resolve(true);
          } else {
            fs.unlinkSync(filePath);
            resolve(false);
          }
        });
      }
      
      file.on('error', () => {
        fs.unlinkSync(filePath);
        resolve(false);
      });
    }).on('error', () => {
      resolve(false);
    });
  });
}

// Main download function using Puppeteer as fallback
async function downloadAllImages() {
  console.log('🚀 Final attempt to download equipment images...\n');
  
  let successCount = 0;
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  for (let i = 0; i < equipmentImages.length; i++) {
    const item = equipmentImages[i];
    console.log(`\nAttempting ${i + 1}/${equipmentImages.length}: ${item.title}`);
    
    // First try direct download
    console.log('  Trying direct download...');
    const directSuccess = await downloadDirect(item.id, item.name);
    
    if (directSuccess) {
      successCount++;
    } else {
      // Fallback to Puppeteer screenshot
      console.log('  Trying Puppeteer screenshot...');
      try {
        const page = await browser.newPage();
        await page.goto(`https://drive.google.com/file/d/${item.id}/view`, { 
          waitUntil: 'networkidle2',
          timeout: 30000 
        });
        
        // Wait for content to load
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Take screenshot of the preview area
        const filePath = path.join(equipmentDir, item.name);
        
        // Try to find and screenshot just the image
        try {
          await page.waitForSelector('img[data-iml], img[data-atf="1"], div[role="img"] img', { timeout: 5000 });
          const element = await page.$('img[data-iml], img[data-atf="1"], div[role="img"] img');
          if (element) {
            await element.screenshot({ path: filePath });
            console.log(`📸 Captured screenshot: ${item.title}`);
            successCount++;
          }
        } catch (e) {
          // Take full page screenshot as last resort
          await page.screenshot({ path: filePath, fullPage: false });
          console.log(`📸 Captured page screenshot: ${item.title}`);
          successCount++;
        }
        
        await page.close();
      } catch (error) {
        console.log(`❌ Puppeteer failed: ${error.message}`);
      }
    }
    
    // Delay between downloads
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  await browser.close();
  
  console.log(`\n✨ Final result: ${successCount}/${equipmentImages.length} images obtained`);
  console.log(`📁 Check: ${equipmentDir}`);
  
  // List what we have
  const files = fs.readdirSync(equipmentDir).filter(f => f.endsWith('.jpg'));
  console.log(`\n📊 Files in equipment directory: ${files.length}`);
  files.forEach(f => console.log(`  - ${f}`));
}

// Run the download
downloadAllImages().catch(console.error);