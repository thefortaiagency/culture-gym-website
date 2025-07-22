const https = require('https');
const fs = require('fs');
const path = require('path');

// High-quality gym images from Pexels
const images = [
  {
    url: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    filename: 'hero-gym.jpg',
    description: 'Dark gym equipment'
  },
  {
    url: 'https://images.pexels.com/photos/949126/pexels-photo-949126.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    filename: 'weights-section.jpg',
    description: 'Dumbbells rack'
  },
  {
    url: 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    filename: 'barbell-dark.jpg',
    description: 'Barbell on floor'
  },
  {
    url: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    filename: 'weights-dark.jpg',
    description: 'Weight plates'
  },
  {
    url: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    filename: 'cardio-equipment.jpg',
    description: 'Treadmills'
  },
  {
    url: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    filename: 'group-fitness.jpg',
    description: 'Group fitness class'
  },
  {
    url: 'https://images.pexels.com/photos/2247179/pexels-photo-2247179.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    filename: 'gym-interior.jpg',
    description: 'Gym interior wide shot'
  },
  {
    url: 'https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    filename: 'training-area.jpg',
    description: 'Training area'
  }
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAllImages() {
  const imagesDir = path.join(__dirname, 'public', 'images');
  
  for (const image of images) {
    const filepath = path.join(imagesDir, image.filename);
    console.log(`Downloading ${image.description}...`);
    try {
      await downloadImage(image.url, filepath);
      console.log(`✓ Downloaded ${image.filename}`);
    } catch (error) {
      console.error(`✗ Failed to download ${image.filename}:`, error.message);
    }
  }
  console.log('\nAll downloads complete!');
}

downloadAllImages();