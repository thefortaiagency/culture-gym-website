const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1920, height: 1080 });
    console.log('🚀 Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 15000 });
    
    console.log('⏳ Waiting for page to load...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // First, capture the classes section (section before membership)
    console.log('📷 Capturing Classes section...');
    await page.evaluate(() => {
      const classes = document.querySelector('#classes');
      if (classes) classes.scrollIntoView({ behavior: 'smooth' });
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.screenshot({ 
      path: '/Users/thefortob/Desktop/classes-section-before-membership.png', 
      fullPage: false 
    });
    
    // Now scroll to membership and capture
    console.log('📷 Capturing Membership section...');
    await page.evaluate(() => {
      const membership = document.querySelector('#membership');
      if (membership) membership.scrollIntoView({ behavior: 'smooth' });
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.screenshot({ 
      path: '/Users/thefortob/Desktop/membership-with-bar-issue.png', 
      fullPage: false 
    });
    
    // Also capture when clicking a membership button
    console.log('🖱️ Clicking on a membership button...');
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('#membership button');
      if (buttons.length > 0) {
        buttons[0].click();
      }
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.screenshot({ 
      path: '/Users/thefortob/Desktop/membership-after-click.png', 
      fullPage: false 
    });
    
    console.log('✅ All screenshots saved to Desktop');
    console.log('- classes-section-before-membership.png');
    console.log('- membership-with-bar-issue.png');
    console.log('- membership-after-click.png');
    
    await browser.close();
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
})();