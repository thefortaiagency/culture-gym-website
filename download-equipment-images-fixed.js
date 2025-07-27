const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Equipment images from the screenshot with correct Google Drive IDs
const equipmentImages = [
  {
    name: 'shoulder-equipment.jpg',
    title: 'Shoulder Equipment',
    driveUrl: 'https://drive.google.com/file/d/1212LEMYRaL9Po3EfKyg0LUi_XNaUSqflpA'
  },
  {
    name: 'rogue-dynabody.jpg', 
    title: 'Rogue-Dyna Body',
    driveUrl: 'https://drive.google.com/file/d/16lRJ6T69SVWqAQuxN-hxl9G_HTG'
  },
  {
    name: 'bench-press.jpg',
    title: 'Bench Press',
    driveUrl: 'https://drive.google.com/file/d/1AtcNIEDlqJWU-h37pFvPY3GpJlVau'
  },
  {
    name: 'precore-icarian-paramount.jpg',
    title: 'Precore-Icarian-Paramount Equipment',
    driveUrl: 'https://drive.google.com/file/d/1Or0ySG8cBAUfUsacMNYQxe6Ulu--2m-'
  },
  {
    name: 'powerlift-racks.jpg',
    title: 'PowerLift Racks',
    driveUrl: 'https://drive.google.com/file/d/18PsvXjodeTaw0_K6WvgPOUAOW2'
  },
  {
    name: 'leg-equipment.jpg',
    title: 'Leg Equipment',
    driveUrl: 'https://drive.google.com/file/d/1TuWlV-kOeEtOJhBGqJRpa87JdHOpDyT'
  },
  {
    name: 'hammer-strength.jpg',
    title: 'Hammer Strength Equipment',
    driveUrl: 'https://drive.google.com/file/d/10C5HRtq_f9Hoc6hrwTrfNw01nHNl8Jn'
  },
  {
    name: 'free-weights-room.jpg',
    title: 'Free Weights Room',
    driveUrl: 'https://drive.google.com/file/d/1PNsLIBfmHcM_Bd8o4cO_BiE2aJ-pL1_tsLaoKh2'
  },
  {
    name: 'chest-equipment.jpg',
    title: 'Chest Equipment',
    driveUrl: 'https://drive.google.com/file/d/1fc6XPJifIVhGtynnqtqRFltvdiDsLZhULg3iMJ'
  },
  {
    name: 'cardio-equipment.jpg',
    title: 'Cardio Equipment',
    driveUrl: 'https://drive.google.com/file/d/CJUArDFpAcEHN5QT9DG_DGPfh'
  },
  {
    name: 'camstar-equipment.jpg',
    title: 'Camstar Equipment',
    driveUrl: 'https://drive.google.com/file/d/1Gte5JqM4PnxLVrnToIyChkYVUZ_oZI2'
  },
  {
    name: 'bodymaster-equipment.jpg',
    title: 'BodyMaster Equipment',
    driveUrl: 'https://drive.google.com/file/d/TVyDrJGDaCJbFOHCdkhlvlMo8JyBdnRy'
  },
  {
    name: 'back-equipment.jpg',
    title: 'Back Equipment',
    driveUrl: 'https://drive.google.com/file/d/16PcOdJCyoOC7mT-vS_V_8Ys'
  }
];

// Create equipment directory if it doesn't exist
const equipmentDir = path.join(__dirname, 'public', 'images', 'equipment');
if (!fs.existsSync(equipmentDir)) {
  fs.mkdirSync(equipmentDir, { recursive: true });
}

// Clean up existing files first
console.log('Cleaning up existing files...');
try {
  const files = fs.readdirSync(equipmentDir);
  files.forEach(file => {
    fs.unlinkSync(path.join(equipmentDir, file));
  });
} catch (e) {
  console.log('No existing files to clean up');
}

console.log('\n📥 Downloading equipment images using curl...\n');

// Download each image using curl
equipmentImages.forEach((item, index) => {
  const fileId = item.driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1];
  if (!fileId) {
    console.error(`❌ Could not extract file ID for ${item.title}`);
    return;
  }

  const filePath = path.join(equipmentDir, item.name);
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  
  console.log(`Downloading ${index + 1}/${equipmentImages.length}: ${item.title}...`);
  
  try {
    // Using curl with follow redirects and cookie handling
    execSync(`curl -L -o "${filePath}" "${downloadUrl}"`, { stdio: 'pipe' });
    
    // Check if the downloaded file is actually an image
    const fileInfo = execSync(`file "${filePath}"`).toString();
    if (fileInfo.includes('HTML') || fileInfo.includes('text')) {
      console.error(`❌ ${item.title} - Downloaded HTML instead of image`);
      fs.unlinkSync(filePath);
      
      // Try alternative download method with confirmation
      console.log(`   Trying alternative download for ${item.title}...`);
      const confirmUrl = `https://drive.google.com/uc?export=download&confirm=t&id=${fileId}`;
      execSync(`curl -L -o "${filePath}" "${confirmUrl}"`, { stdio: 'pipe' });
      
      // Check again
      const fileInfo2 = execSync(`file "${filePath}"`).toString();
      if (fileInfo2.includes('HTML') || fileInfo2.includes('text')) {
        console.error(`   ❌ Still failed to download ${item.title}`);
        fs.unlinkSync(filePath);
      } else {
        console.log(`   ✅ Successfully downloaded ${item.title}`);
      }
    } else {
      console.log(`✅ Downloaded: ${item.title}`);
    }
  } catch (error) {
    console.error(`❌ Failed to download ${item.title}: ${error.message}`);
  }
});

console.log('\n✨ Download process complete!');
console.log(`📁 Check ${equipmentDir} for downloaded images`);

// List the successfully downloaded images
const downloadedFiles = fs.readdirSync(equipmentDir).filter(f => f.endsWith('.jpg'));
console.log(`\n📊 Successfully downloaded ${downloadedFiles.length}/${equipmentImages.length} images`);

if (downloadedFiles.length === 0) {
  console.log('\n⚠️  No images were successfully downloaded. The Google Drive links may require manual download.');
  console.log('Please download the images manually and place them in:', equipmentDir);
}