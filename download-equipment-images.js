const https = require('https');
const fs = require('fs');
const path = require('path');

// Equipment images from the screenshot with Google Drive links
const equipmentImages = [
  {
    name: 'shoulder-equipment.jpg',
    title: 'Shoulder Equipment',
    driveId: '1212LEMYRaL9Po3EfKyg0LUi_XNaUSqflpA'
  },
  {
    name: 'rogue-dynabody.jpg', 
    title: 'Rogue-Dyna Body',
    driveId: '16lRJ6T69SVWqAQuxN-hxl9G_HTG'
  },
  {
    name: 'bench-press.jpg',
    title: 'Bench Press',
    driveId: '1AtcNIEDlqJWU-h37pFvPY3GpJlVau'
  },
  {
    name: 'precore-icarian-paramount.jpg',
    title: 'Precore-Icarian-Paramount Equipment',
    driveId: '1Or0ySG8cBAUfUsacMNYQxe6Ulu--2m-'
  },
  {
    name: 'powerlift-racks.jpg',
    title: 'PowerLift Racks',
    driveId: '18PsvXjodeTaw0_K6WvgPOUAOW2'
  },
  {
    name: 'leg-equipment.jpg',
    title: 'Leg Equipment',
    driveId: '1TuWlV-kOeEtOJhBGqJRpa87JdHOpDyT'
  },
  {
    name: 'hammer-strength.jpg',
    title: 'Hammer Strength Equipment',
    driveId: '10C5HRtq_f9Hoc6hrwTrfNw01nHNl8Jn'
  },
  {
    name: 'free-weights-room.jpg',
    title: 'Free Weights Room',
    driveId: '1PNsLIBfmHcM_Bd8o4cO_BiE2aJ-pL1_tsLaoKh2'
  },
  {
    name: 'chest-equipment.jpg',
    title: 'Chest Equipment',
    driveId: '1fc6XPJifIVhGtynnqtqRFltvdiDsLZhULg3iMJ'
  },
  {
    name: 'cardio-equipment.jpg',
    title: 'Cardio Equipment',
    driveId: 'CJUArDFpAcEHN5QT9DG_DGPfh'
  },
  {
    name: 'camstar-equipment.jpg',
    title: 'Camstar Equipment',
    driveId: '1Gte5JqM4PnxLVrnToIyChkYVUZ_oZI2'
  },
  {
    name: 'bodymaster-equipment.jpg',
    title: 'BodyMaster Equipment',
    driveId: 'TVyDrJGDaCJbFOHCdkhlvlMo8JyBdnRy'
  },
  {
    name: 'back-equipment.jpg',
    title: 'Back Equipment',
    driveId: '16PcOdJCyoOC7mT-vS_V_8Ys'
  }
];

// Create equipment directory if it doesn't exist
const equipmentDir = path.join(__dirname, 'public', 'images', 'equipment');
if (!fs.existsSync(equipmentDir)) {
  fs.mkdirSync(equipmentDir, { recursive: true });
}

// Function to download image from Google Drive
function downloadImage(item, index) {
  return new Promise((resolve, reject) => {
    // Google Drive direct download URL format
    const url = `https://drive.google.com/uc?export=download&id=${item.driveId}`;
    const filePath = path.join(equipmentDir, item.name);

    console.log(`Downloading ${index + 1}/${equipmentImages.length}: ${item.title}...`);

    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      // Handle redirect
      if (response.statusCode === 302 || response.statusCode === 303) {
        const redirectUrl = response.headers.location;
        https.get(redirectUrl, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`✓ Downloaded: ${item.title}`);
            resolve();
          });
        }).on('error', (err) => {
          fs.unlink(filePath, () => {});
          console.error(`✗ Error downloading ${item.title}:`, err.message);
          resolve(); // Continue with other downloads even if one fails
        });
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${item.title}`);
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      console.error(`✗ Error downloading ${item.title}:`, err.message);
      resolve(); // Continue with other downloads even if one fails
    });

    file.on('error', (err) => {
      fs.unlink(filePath, () => {});
      console.error(`✗ Error writing ${item.title}:`, err.message);
      resolve();
    });
  });
}

// Download all images sequentially
async function downloadAllImages() {
  console.log('Starting equipment image downloads...\n');
  
  for (let i = 0; i < equipmentImages.length; i++) {
    await downloadImage(equipmentImages[i], i);
    // Add a small delay between downloads to be polite to Google's servers
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\nAll downloads complete!');
  console.log(`Images saved to: ${equipmentDir}`);
}

// Run the download
downloadAllImages().catch(console.error);