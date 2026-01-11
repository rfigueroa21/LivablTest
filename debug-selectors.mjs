import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('https://www.livabl.com/');
  await page.waitForLoadState('load');
  await page.waitForTimeout(5000);
  
  // Try to find the communities carousel section
  console.log('\n=== Looking for Featured Communities Section ===');
  
  // Check various possible selectors
  const selectors = [
    "div[class='featured-communities-section']",
    "div[class*='featured']",
    "div[class*='communities']",
    "div[class*='carousel']",
    "div[id='td']",
    "[class*='slider']",
    "[class*='swiper']"
  ];
  
  for (const selector of selectors) {
    try {
      const count = await page.locator(selector).count();
      console.log(`${selector}: ${count} elements found`);
      if (count > 0) {
        const first = page.locator(selector).first();
        const classes = await first.getAttribute('class');
        const id = await first.getAttribute('id');
        console.log(`  - class: ${classes}`);
        console.log(`  - id: ${id}`);
      }
    } catch (e) {
      console.log(`${selector}: Error - ${e.message}`);
    }
  }
  
  console.log('\n=== Looking for items inside carousel ===');
  const carouselItemSelectors = [
    "div[id='td'] div[class='items'] a",
    "div[id='td'] a",
    "div[id='td'] .items a",
    "div[id='td'] div.items a",
    "#td a",
    "#td .development-card",
    "#td [class*='card']",
    ".sldr a",
    ".developmentslider a"
  ];
  
  for (const selector of carouselItemSelectors) {
    try {
      const count = await page.locator(selector).count();
      console.log(`${selector}: ${count} elements found`);
    } catch (e) {
      console.log(`${selector}: Error - ${e.message}`);
    }
  }
  
  console.log('\n=== Looking for Search Results Cards ===');
  await page.goto('https://www.livabl.com/map#OHw0MS45NTIyNDM4fC04Ny45OTQ5MzQxfGZlYXR8U2VsbGluZyxSZWdpc3RyYXRpb24sUGVuZGluZ3xGb3IgU2FsZXx8MzAwMDAwfHx8fHx8MSt8QW55fEFsbCxDb25kbyxDb25kb3AsQ28tb3AsRmVlIFNpbXBsZXx8NHw4N3x8ZmFsc2V8ZmFsc2U=');
  await page.waitForLoadState('load');
  await page.waitForTimeout(5000);
  
  const cardSelectors = [
    'a.card',
    '.card',
    '[class*="card"]',
    'div.card',
    'article',
    '[class*="listing"]'
  ];
  
  for (const selector of cardSelectors) {
    try {
      const count = await page.locator(selector).count();
      console.log(`${selector}: ${count} elements found`);
    } catch (e) {
      console.log(`${selector}: Error - ${e.message}`);
    }
  }
  
  console.log('\nPress Ctrl+C to exit...');
  await page.waitForTimeout(60000);
  
  await browser.close();
})();
