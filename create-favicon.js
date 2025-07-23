const sharp = require('sharp');

async function createFavicon() {
  try {
    // Read the Culture logo
    const logo = await sharp('./public/images/culturelogo2.png')
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 10, g: 10, b: 10, alpha: 1 } // Culture black background
      });

    // Create different favicon sizes
    // favicon.ico (multiple sizes in one file - we'll create separate PNGs and use an online converter)
    await logo.clone().resize(16, 16).toFile('./public/favicon-16x16.png');
    await logo.clone().resize(32, 32).toFile('./public/favicon-32x32.png');
    await logo.clone().resize(48, 48).toFile('./public/favicon-48x48.png');
    
    // Apple touch icon
    await logo.clone().resize(180, 180).toFile('./public/apple-touch-icon.png');
    
    // Android Chrome icons
    await logo.clone().resize(192, 192).toFile('./public/android-chrome-192x192.png');
    await logo.clone().resize(512, 512).toFile('./public/android-chrome-512x512.png');
    
    // For Next.js App Router
    await logo.clone().resize(32, 32).toFile('./app/favicon.ico');
    
    console.log('Favicons created successfully!');
  } catch (error) {
    console.error('Error creating favicons:', error);
  }
}

createFavicon();