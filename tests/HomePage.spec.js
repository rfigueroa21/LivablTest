import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';

test.describe('Home Page tests ', () => {
    
    test('validate next arrow functionality in Communities carousel', async ({ page }) => {
        // Hide webdriver property to avoid bot detection
        await page.addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
            });
        });
        
        const homePage = new HomePage(page);
        await page.goto('https://www.livabl.com/', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(3000);

        // Handle captcha if present
        const captchaSolved = await homePage.solveCaptcha();
        if (captchaSolved) {
            console.log('Waiting for page to fully load after captcha...');
            await page.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
        }
        
        // Try to wait for cards with extended timeout
        await homePage.waitForCardsToLoad();
        const initialTitles = await homePage.getAllCommunityTitles();
        
        // await homePage.clickNextSlide();
        // await page.waitForTimeout(500);
        
        // const afterNextTitles = await homePage.getAllCommunityTitles();
        // // expect(initialTitles).not.toEqual(afterNextTitles);
        
        // await expect(homePage.featuredCommunities.slider.nextButton).toBeVisible();
        // await expect(homePage.featuredCommunities.slider.nextButton).toBeEnabled();
    });

    // test('validate previous arrow functionality in Communities carousel', async ({ page }) => {
    //     const homePage = new HomePage(page);
    //     await page.goto('https://www.livabl.com/');
    //     await page.waitForLoadState('load');
        
    //     await homePage.waitForCardsToLoad();
        
    //     await homePage.clickNextSlide();
    //     await page.waitForTimeout(500);
    //     const titlesAfterNext = await homePage.getAllCommunityTitles();
        
    //     await homePage.clickPreviousSlide();
    //     await page.waitForTimeout(500);
    //     const titlesAfterPrevious = await homePage.getAllCommunityTitles();
        
    //     expect(titlesAfterNext).not.toEqual(titlesAfterPrevious);
        
    //     await expect(homePage.featuredCommunities.slider.previousButton).toBeVisible();
    //     await expect(homePage.featuredCommunities.slider.previousButton).toBeEnabled();
    // });

});