// @ts-check
import { test, expect } from '@playwright/test';
import { SearchResultsPage } from '../pages/SearchResultsPage.js';

test.describe('Livabl Search Functionality', () => {
  
  test('is the basic search functionality working successfully', async ({ page }) => {
    const searchResults = new SearchResultsPage(page);
    
    await page.goto('/map#OHw0MS45NTIyNDM4fC04Ny45OTQ5MzQxfGZlYXR8U2VsbGluZyxSZWdpc3RyYXRpb24sUGVuZGluZ3xGb3IgU2FsZXx8MzAwMDAwfHx8fHx8MSt8QW55fEFsbCxDb25kbyxDb25kb3AsQ28tb3AsRmVlIFNpbXBsZXx8NHw4N3x8ZmFsc2V8ZmFsc2U=');
    
    await page.waitForLoadState('load');
    await page.waitForTimeout(3000); 
    
    await page.waitForSelector('a.card', { state: 'visible', timeout: 20000 });
    
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
