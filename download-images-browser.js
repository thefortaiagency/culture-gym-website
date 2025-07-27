const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Equipment images from the screenshot with Google Drive URLs
const equipmentImages = [
  {
    name: 'shoulder-equipment.jpg',
    title: 'Shoulder Equipment',
    url: 'https://drive.google.com/file/d/1212LEMYRaL9Po3EfKyg0LUi_XNaUSqflpA/view'
  },
  {
    name: 'rogue-dynabody.jpg', 
    title: 'Rogue-Dyna Body',
    url: 'https://drive.google.com/file/d/16lRJ6T69SVWqAQuxN-hxl9G_HTG/view'
  },
  {
    name: 'bench-press.jpg',
    title: 'Bench Press',
    url: 'https://drive.google.com/file/d/1AtcNIEDlqJWU-h37pFvPY3GpJlVau/view'
  },
  {
    name: 'precore-icarian-paramount.jpg',
    title: 'Precore-Icarian-Paramount Equipment',
    url: 'https://drive.google.com/file/d/1Or0ySG8cBAUfUsacMNYQxe6Ulu--2m-/view'
  },
  {
    name: 'powerlift-racks.jpg',
    title: 'PowerLift Racks',
    url: 'https://drive.google.com/file/d/18PsvXjodeTaw0_K6WvgPOUAOW2/view'
  },
  {
    name: 'leg-equipment.jpg',
    title: 'Leg Equipment',
    url: 'https://drive.google.com/file/d/1TuWlV-kOeEtOJhBGqJRpa87JdHOpDyT/view'
  },
  {
    name: 'hammer-strength.jpg',
    title: 'Hammer Strength Equipment',
    url: 'https://drive.google.com/file/d/10C5HRtq_f9Hoc6hrwTrfNw01nHNl8Jn/view'
  },
  {
    name: 'free-weights-room.jpg',
    title: 'Free Weights Room',
    url: 'https://drive.google.com/file/d/1PNsLIBfmHcM_Bd8o4cO_BiE2aJ-pL1_tsLaoKh2/view'
  },
  {
    name: 'chest-equipment.jpg',
    title: 'Chest Equipment',
    url: 'https://drive.google.com/file/d/1fc6XPJifIVhGtynnqtqRFltvdiDsLZhULg3iMJ/view'
  },
  {
    name: 'cardio-equipment.jpg',
    title: 'Cardio Equipment',
    url: 'https://drive.google.com/file/d/CJUArDFpAcEHN5QT9DG_DGPfh/view'
  },
  {
    name: 'camstar-equipment.jpg',
    title: 'Camstar Equipment',
    url: 'https://drive.google.com/file/d/1Gte5JqM4PnxLVrnToIyChkYVUZ_oZI2/view'
  },
  {
    name: 'bodymaster-equipment.jpg',
    title: 'BodyMaster Equipment',
    url: 'https://drive.google.com/file/d/TVyDrJGDaCJbFOHCdkhlvlMo8JyBdnRy/view'
  },
  {
    name: 'back-equipment.jpg',
    title: 'Back Equipment',
    url: 'https://drive.google.com/file/d/16PcOdJCyoOC7mT-vS_V_8Ys/view'
  }
];

async function downloadImagesWithPuppeteer() {
  const browser = await puppeteer.launch({
    headless: false, // Show browser for debugging
    defaultViewport: null
  });

  // Create equipment directory if it doesn't exist
  const equipmentDir = path.join(__dirname, 'public', 'images', 'equipment');
  if (!fs.existsSync(equipmentDir)) {
    fs.mkdirSync(equipmentDir, { recursive: true });
  }

  const downloadPath = path.resolve(equipmentDir);

  const page = await browser.newPage();
  
  // Set download behavior
  await page._client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath
  });

  console.log('📥 Starting equipment image downloads...\n');

  for (let i = 0; i < equipmentImages.length; i++) {
    const item = equipmentImages[i];
    console.log(`Downloading ${i + 1}/${equipmentImages.length}: ${item.title}...`);

    try {
      // Navigate to the Google Drive page
      await page.goto(item.url, { waitUntil: 'networkidle2' });

      // Wait for page to load
      await page.waitForTimeout(2000);

      // Try to find and click the download button
      try {
        // Look for the download button
        await page.waitForSelector('[aria-label*="Download"]', { timeout: 5000 });
        await page.click('[aria-label*="Download"]');
      } catch (e) {
        // Try alternative selectors
        try {
          await page.waitForSelector('div[role="button"]:has-text("Download")', { timeout: 5000 });
          await page.click('div[role="button"]:has-text("Download")');
        } catch (e2) {
          console.log(`⚠️  Could not find download button for ${item.title}`);
          continue;
        }
      }

      // Wait for download to start
      await page.waitForTimeout(3000);

      console.log(`✅ Downloaded: ${item.title}`);
    } catch (error) {
      console.error(`❌ Failed to download ${item.title}: ${error.message}`);
    }
  }

  console.log('\n✨ Download process complete!');
  console.log('⚠️  Please manually check the downloads folder and move any downloaded images to:');
  console.log(`📁 ${equipmentDir}`);
  
  await browser.close();
}

// Alternative: Generate a download script that opens all links
function generateDownloadScript() {
  const scriptContent = `#!/bin/bash
# Equipment Image Download Script
# Run this script to open all Google Drive links in your browser

echo "Opening all equipment images in browser..."
echo "Please download each image and save to: public/images/equipment/"
echo ""

# Create the equipment directory
mkdir -p public/images/equipment

# Open each URL with the suggested filename
`;

  equipmentImages.forEach((item, index) => {
    scriptContent += `
# ${index + 1}. ${item.title}
echo "Opening ${item.title} - Save as: ${item.name}"
open "${item.url}"
sleep 2
`;
  });

  scriptContent += `
echo ""
echo "All links opened! Please save each image with the correct filename to:"
echo "public/images/equipment/"
`;

  fs.writeFileSync('download-equipment-images.sh', scriptContent);
  fs.chmodSync('download-equipment-images.sh', '755');

  console.log('✅ Created download-equipment-images.sh');
  console.log('Run: ./download-equipment-images.sh to open all images in your browser');
}

// Check if puppeteer is installed
try {
  require.resolve('puppeteer');
  downloadImagesWithPuppeteer().catch(console.error);
} catch (e) {
  console.log('Puppeteer not found. Generating shell script instead...');
  generateDownloadScript();
}