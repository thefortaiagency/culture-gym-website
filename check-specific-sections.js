const puppeteer = require('puppeteer');

async function checkSpecificSections() {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  // Wait for page to fully load
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Check Equipment section
  console.log('Navigating to Equipment section...');
  await page.evaluate(() => {
    document.querySelector('a[href="#equipment"]').click();
  });
  await new Promise(resolve => setTimeout(resolve, 2000));
  await page.screenshot({
    path: '/Users/thefortob/Desktop/equipment-issue.png',
    fullPage: false
  });

  // Check Classes section  
  console.log('Navigating to Classes section...');
  await page.evaluate(() => {
    document.querySelector('a[href="#classes"]').click();
  });
  await new Promise(resolve => setTimeout(resolve, 2000));
  await page.screenshot({
    path: '/Users/thefortob/Desktop/classes-issue.png',
    fullPage: false
  });

  await browser.close();
}

checkSpecificSections().catch(console.error);