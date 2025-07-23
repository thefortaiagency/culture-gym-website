const puppeteer = require('puppeteer');

async function checkSections() {
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

  const sections = [
    { name: 'membership', selector: '#membership' },
    { name: 'classes', selector: '#classes' },
    { name: 'equipment', selector: '#equipment' },
    { name: 'about', selector: '#about' },
    { name: 'contact', selector: '#contact' }
  ];

  for (const section of sections) {
    console.log(`Navigating to ${section.name}...`);
    
    // Click on the nav link
    await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, section.selector);
    
    // Wait for scroll to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Take screenshot
    await page.screenshot({
      path: `/Users/thefortob/Desktop/${section.name}-section-alignment.png`,
      fullPage: false
    });
    
    console.log(`Screenshot saved: ${section.name}-section-alignment.png`);
  }

  await browser.close();
}

checkSections().catch(console.error);