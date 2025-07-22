const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  
  console.log('🔍 INVESTIGATING MEMBERSHIP SECTION FORMATTING...\n');
  
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Take a full page screenshot first
  await page.screenshot({ 
    path: '/Users/thefortob/Desktop/membership-full-page.png', 
    fullPage: true 
  });
  console.log('✅ Full page screenshot saved');
  
  // Scroll to membership
  await page.evaluate(() => {
    document.querySelector('#membership').scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Take membership section screenshot
  await page.screenshot({ 
    path: '/Users/thefortob/Desktop/membership-current-view.png', 
    fullPage: false 
  });
  console.log('✅ Membership view screenshot saved');
  
  // Get all styling information
  const analysis = await page.evaluate(() => {
    const membership = document.querySelector('#membership');
    const container = membership.querySelector('.container');
    const navbar = document.querySelector('nav');
    
    // Check what's visible at the top of viewport
    const viewportTop = window.scrollY;
    const membershipTop = membership.getBoundingClientRect().top + window.scrollY;
    
    // Get the actual rendered styles
    const membershipStyles = window.getComputedStyle(membership);
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
    
    // Check if there's any element overlapping
    const topOfMembership = membership.getBoundingClientRect().top;
    const elementAtTop = document.elementFromPoint(window.innerWidth / 2, topOfMembership + 10);
    
    return {
      viewport: {
        scrollY: window.scrollY,
        windowHeight: window.innerHeight
      },
      membership: {
        offsetTop: membership.offsetTop,
        boundingTop: membership.getBoundingClientRect().top,
        paddingTop: membershipStyles.paddingTop,
        marginTop: membershipStyles.marginTop,
        classes: membership.className
      },
      navbar: {
        height: navbarHeight,
        position: navbar ? window.getComputedStyle(navbar).position : 'none'
      },
      overlappingElement: {
        tag: elementAtTop?.tagName,
        id: elementAtTop?.id,
        class: elementAtTop?.className
      }
    };
  });
  
  console.log('\n📊 ANALYSIS RESULTS:');
  console.log(JSON.stringify(analysis, null, 2));
  
  // Try scrolling manually to see the issue
  await page.evaluate(() => {
    window.scrollTo(0, document.querySelector('#membership').offsetTop - 100);
  });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await page.screenshot({ 
    path: '/Users/thefortob/Desktop/membership-manual-scroll.png', 
    fullPage: false 
  });
  console.log('\n✅ Manual scroll screenshot saved');
  
  // Check mobile view too
  await page.setViewport({ width: 375, height: 667 });
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await page.screenshot({ 
    path: '/Users/thefortob/Desktop/membership-mobile-view.png', 
    fullPage: false 
  });
  console.log('✅ Mobile view screenshot saved');
  
  console.log('\n🔧 Browser kept open with DevTools for manual inspection');
  console.log('Check the screenshots on your Desktop to see the issue');
  
})();