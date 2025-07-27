const puppeteer = require('puppeteer');

async function takeDebugScreenshot() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // Listen for console messages
  page.on('console', msg => console.log('Browser console:', msg.text()));
  page.on('pageerror', error => console.log('Page error:', error.message));

  console.log('Opening debug page...');
  await page.goto('http://localhost:3000/equipment/debug', { 
    waitUntil: 'networkidle2',
    timeout: 60000 
  });

  await page.screenshot({ 
    path: 'debug-page.png',
    fullPage: true 
  });

  console.log('Debug screenshot saved! Check the browser window for network tab.');
  
  // Wait a bit for images to load
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  await browser.close();
}

takeDebugScreenshot().catch(console.error);