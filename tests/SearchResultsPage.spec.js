// @ts-check
import { test, expect } from '@playwright/test';
import { SearchResultsPage } from '../pages/SearchResultsPage.js';

test.describe('Livabl Search Functionality', () => {
  
  test('is the basic search functionality working successfully', async ({ page }) => {
    // Hide webdriver property to avoid bot detection
    await page.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
        });
    });
    
    const searchResults = new SearchResultsPage(page);
    
    await page.goto('/map#OHw0MS45NTIyNDM4fC04Ny45OTQ5MzQxfGZlYXR8U2VsbGluZyxSZWdpc3RyYXRpb24sUGVuZGluZ3xGb3IgU2FsZXx8MzAwMDAwfHx8fHx8MSt8QW55fEFsbCxDb25kbyxDb25kb3AsQ28tb3AsRmVlIFNpbXBsZXx8NHw4N3x8ZmFsc2V8ZmFsc2U=', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    
    // Handle captcha if present with manual solving
    const captcha = page.getByText('Press & Hold');
    const isCaptchaVisible = await captcha.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (isCaptchaVisible) {
        console.log('\n========================================');
        console.log('CAPTCHA DETECTED!');
        console.log('========================================');
        console.log('Please solve the captcha manually.');
        console.log('The test will wait for 30 seconds...');
        console.log('========================================\n');
        
        // Wait 30 seconds for manual solving
        await page.waitForTimeout(30000);
        
        // Check if captcha is gone
        const stillVisible = await captcha.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (!stillVisible) {
            console.log('Captcha solved! Continuing test...');
            await page.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
            await page.waitForTimeout(3000);
        } else {
            console.log('Captcha still present after 30 seconds.');
            test.skip(true, 'Captcha was not solved manually');
        }
    }
    
    // Additional wait for page to stabilize
    await page.waitForTimeout(2000); 
    
    await page.waitForSelector('a.card', { state: 'visible', timeout: 30000 });
    
    const listingCount = await searchResults.listingCards.count();
    console.log(`Found ${listingCount} listing cards`);
    expect(listingCount).toBeGreaterThan(0);
    

    await expect(searchResults.listingTitle).toBeVisible({ timeout: 10000 });
    await expect(searchResults.listingPrice).toBeVisible({ timeout: 10000 });
    await expect(searchResults.listingAddress).toBeVisible({ timeout: 10000 });
    
    const listingDetails = {
      title: await searchResults.listingTitle.textContent(),
      price: await searchResults.listingPrice.textContent(),
      address: await searchResults.listingAddress.textContent()
    };
    
    console.log('First Listing Details:', listingDetails);
    
    expect(listingDetails.title).toBeTruthy(); //tiene un texto
    expect(listingDetails.price).toBeTruthy();
    expect(listingDetails.address).toBeTruthy();
  });
  
});
