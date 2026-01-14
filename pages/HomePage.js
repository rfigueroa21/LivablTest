export class HomePage {

    /** @type {Page} */
    page;

    /**
     * @param {Page} page
     */

    constructor(page) {
        this.page = page;
        this.livablLogo = page.locator("img[alt='Livabl Logo']");
        this.featuredCommunities = {
            container: page.locator("div[class='featured-communities-section']"),
            viewAllLink: page.locator("div[class='featured-communities-section'] a[class='view-all-link']"),
            slider: {
                container: page.locator("div[id='td']"),
                items: page.locator("div[id='td'] div[class='items'] a"),
                nextButton: page.locator("div[id='td'] button[aria-label='Slide right']"),
                previousButton: page.locator("button[class='leftArrow lbl-bordered-btn']")
            }
        };
        this.captchaButton = page.getByText('Press & Hold');

    }

    // Dynamic methods for Featured Communities / Trending cards
    getCommunityCard(index) {
        return this.featuredCommunities.slider.items.nth(index);
    }

    getCommunityCardByName(name) {
        return this.featuredCommunities.slider.items.filter({ hasText: name });
    }

    getCommunityCardImage(index) {
        return this.getCommunityCard(index).locator('div[class*="image"], img');
    }

    getCommunityCardTitle(index) {
        return this.getCommunityCard(index).locator('span.devtitle');
    }

    async getCommunityCardCount() { 
        return await this.featuredCommunities.slider.items.count();
    }

    async getAllCommunityTitles() {
        return await this.featuredCommunities.slider.items.locator('span.devtitle').allTextContents();
    }

    // Navigation methods
    async clickNextSlide() {
        await this.featuredCommunities.slider.nextButton.click();
    }

    async clickPreviousSlide() {
        await this.featuredCommunities.slider.previousButton.click();
    }

    async clickViewAllCommunities() {
        await this.featuredCommunities.viewAllLink.click();
    }

    // Helper method to wait for cards to load
    async waitForCardsToLoad() {
        await this.featuredCommunities.slider.items.first().waitFor({ state: 'visible', timeout: 45000 });
    }
    
    // Helper method to check if captcha is present
    async isCaptchaPresent() {
        const captcha = this.page.locator('text=Press & Hold');
        return await captcha.isVisible({ timeout: 2000 }).catch(() => false);
    }

    // Helper method to solve captcha by pressing and holding
    async solveCaptcha(maxAttempts = 2) {
        const isCaptchaVisible = await this.captchaButton.isVisible({ timeout: 5000 }).catch(() => false);
        
        if (!isCaptchaVisible) {
            console.log('No captcha detected');
            return false;
        }
        
        console.log('\n========================================');
        console.log('CAPTCHA DETECTED!');
        console.log('========================================');
        console.log('Please solve the captcha manually.');
        console.log('The test will wait for 30 seconds...');
        console.log('========================================\n');
        
        // Wait 30 seconds for manual solving
        await this.page.waitForTimeout(30000);
        
        // Check if captcha is gone
        const stillVisible = await this.captchaButton.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (!stillVisible) {
            console.log('Captcha solved! Continuing test...');
            await this.page.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
            await this.page.waitForTimeout(3000);
            return true;
        } else {
            console.log('Captcha still present after 30 seconds.');
            console.log('Marking test as skipped due to unsolved captcha.');
            return false;
        }
    }

}

export default HomePage;



