const puppeteer = require('puppeteer');

async function takeScreenshot() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // Take screenshot of main page
  console.log('Taking screenshot of main page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.screenshot({ 
    path: 'homepage-current.png',
    fullPage: true 
  });

  // Take screenshot of equipment page
  console.log('Taking screenshot of equipment page...');
  await page.goto('http://localhost:3000/equipment', { waitUntil: 'networkidle2' });
  await page.screenshot({ 
    path: 'equipment-page-current.png',
    fullPage: true 
  });

  // Take screenshot of an equipment detail page
  console.log('Taking screenshot of equipment detail page...');
  await page.goto('http://localhost:3000/equipment/shoulder-equipment', { waitUntil: 'networkidle2' });
  await page.screenshot({ 
    path: 'equipment-detail-current.png',
    fullPage: true 
  });

  await browser.close();
  console.log('Screenshots saved!');
}

takeScreenshot().catch(console.error);