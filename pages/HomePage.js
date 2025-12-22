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
        await this.featuredCommunities.slider.items.first().waitFor({ state: 'visible' });
    }

}

export default HomePage;



