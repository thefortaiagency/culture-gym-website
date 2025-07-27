const https = require('https');
const fs = require('fs');
const path = require('path');

// Equipment images with corrected Google Drive IDs
const equipmentImages = [
  { name: 'shoulder-equipment.jpg', title: 'Shoulder Equipment', id: '1212LEMYRaL9Po3EfKyg0LUi_XNaUSqflpA' },
  { name: 'rogue-dynabody.jpg', title: 'Rogue-Dyna Body', id: '16lRJ6T69SVWqAQuxN-hxl9G_HTG' },
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

// Download function with retries and better error handling
function downloadImage(item) {
  return new Promise((resolve) => {
    const filePath = path.join(equipmentDir, item.name);
    
    // Try multiple URL formats
    const urls = [
      `https://drive.google.com/uc?export=download&id=${item.id}`,
      `https://drive.google.com/uc?id=${item.id}&export=download`,
      `https://drive.usercontent.google.com/download?id=${item.id}&export=download&authuser=0`
    ];
    
    let attemptCount = 0;
    
    function tryDownload() {
      if (attemptCount >= urls.length) {
        console.log(`❌ Failed all attempts for ${item.title}`);
        resolve(false);
        return;
      }
      
      const url = urls[attemptCount];
      console.log(`  Attempt ${attemptCount + 1}: ${url.substring(0, 50)}...`);
      
      const file = fs.createWriteStream(filePath);
      let isRedirect = false;
      
      https.get(url, (response) => {
        // Handle redirects
        if (response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
          isRedirect = true;
          file.close();
          
          const redirectUrl = response.headers.location;
          console.log(`  Following redirect...`);
          
          const redirectFile = fs.createWriteStream(filePath);
          https.get(redirectUrl, (redirectResponse) => {
            redirectResponse.pipe(redirectFile);
            
            redirectFile.on('finish', () => {
              redirectFile.close();
              // Check if we got an actual image
              const stats = fs.statSync(filePath);
              if (stats.size > 10000) { // Images should be larger than 10KB
                console.log(`✅ Downloaded: ${item.title} (${Math.round(stats.size / 1024)}KB)`);
                resolve(true);
              } else {
                fs.unlinkSync(filePath);
                attemptCount++;
                setTimeout(tryDownload, 2000); // Wait 2 seconds before retry
              }
            });
          }).on('error', (err) => {
            console.log(`  Redirect error: ${err.message}`);
            attemptCount++;
            setTimeout(tryDownload, 2000);
          });
        } else if (response.statusCode === 200) {
          response.pipe(file);
          
          file.on('finish', () => {
            file.close();
            // Verify it's an image
            const stats = fs.statSync(filePath);
            const fileContent = fs.readFileSync(filePath);
            
            // Check if it starts with image magic bytes or is large enough
            const isImage = (
              fileContent[0] === 0xFF && fileContent[1] === 0xD8 || // JPEG
              fileContent[0] === 0x89 && fileContent[1] === 0x50 || // PNG
              stats.size > 10000 // Reasonable image size
            );
            
            if (isImage) {
              console.log(`✅ Downloaded: ${item.title} (${Math.round(stats.size / 1024)}KB)`);
              resolve(true);
            } else {
              // Check if it's HTML (error page)
              const content = fileContent.toString('utf8', 0, 200);
              if (content.includes('<!DOCTYPE') || content.includes('<html')) {
                console.log(`  Got HTML instead of image, retrying...`);
                fs.unlinkSync(filePath);
                attemptCount++;
                setTimeout(tryDownload, 2000);
              } else {
                console.log(`✅ Downloaded: ${item.title} (${Math.round(stats.size / 1024)}KB)`);
                resolve(true);
              }
            }
          });
        } else {
          file.close();
          console.log(`  Status ${response.statusCode}, retrying...`);
          attemptCount++;
          setTimeout(tryDownload, 2000);
        }
        
        file.on('error', (err) => {
          fs.unlinkSync(filePath);
          console.log(`  Write error: ${err.message}`);
          attemptCount++;
          setTimeout(tryDownload, 2000);
        });
      }).on('error', (err) => {
        file.close();
        console.log(`  Request error: ${err.message}`);
        attemptCount++;
        setTimeout(tryDownload, 2000);
      });
    }
    
    tryDownload();
  });
}

// Main download function
async function downloadAllImages() {
  console.log('📥 Starting careful download of equipment images...');
  console.log('⏱️  This will take a few minutes with delays between downloads...\n');
  
  let successCount = 0;
  
  for (let i = 0; i < equipmentImages.length; i++) {
    console.log(`\nDownloading ${i + 1}/${equipmentImages.length}: ${equipmentImages[i].title}`);
    
    const success = await downloadImage(equipmentImages[i]);
    if (success) successCount++;
    
    // Wait 3 seconds between downloads to be respectful
    if (i < equipmentImages.length - 1) {
      console.log('  Waiting before next download...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  console.log(`\n✨ Download complete! ${successCount}/${equipmentImages.length} images downloaded`);
  console.log(`📁 Images saved to: ${equipmentDir}`);
  
  if (successCount < equipmentImages.length) {
    console.log('\n⚠️  Some images failed. Trying alternative method...');
    
    // Try using curl as a fallback
    const { execSync } = require('child_process');
    console.log('\n🔄 Attempting with curl...\n');
    
    for (const item of equipmentImages) {
      const filePath = path.join(equipmentDir, item.name);
      if (!fs.existsSync(filePath)) {
        console.log(`Trying curl for ${item.title}...`);
        try {
          // Use curl with cookie handling
          execSync(`curl -L -c /tmp/cookie.txt -o "${filePath}" "https://drive.google.com/uc?export=download&id=${item.id}"`, { stdio: 'pipe' });
          
          // Check if we need to handle confirmation
          const content = fs.readFileSync(filePath, 'utf8').substring(0, 1000);
          if (content.includes('confirm=')) {
            const confirmMatch = content.match(/confirm=([a-zA-Z0-9_-]+)/);
            if (confirmMatch) {
              console.log('  Handling download confirmation...');
              execSync(`curl -L -b /tmp/cookie.txt -o "${filePath}" "https://drive.google.com/uc?export=download&confirm=${confirmMatch[1]}&id=${item.id}"`, { stdio: 'pipe' });
            }
          }
          
          const stats = fs.statSync(filePath);
          if (stats.size > 10000) {
            console.log(`✅ Downloaded with curl: ${item.title}`);
            successCount++;
          } else {
            fs.unlinkSync(filePath);
            console.log(`❌ Failed with curl: ${item.title}`);
          }
        } catch (e) {
          console.log(`❌ Curl error for ${item.title}: ${e.message}`);
        }
      }
    }
  }
  
  console.log(`\n🏁 Final result: ${successCount}/${equipmentImages.length} images downloaded`);
}

// Run the download
downloadAllImages().catch(console.error);