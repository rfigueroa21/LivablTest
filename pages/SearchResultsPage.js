import { Page } from '@playwright/test';

export class SearchResultsPage {

  constructor(page) {
    this.page = page;
    
    // Card
    this.listingCards = page.locator('a.card');
    this.firstListingCard = this.listingCards.first();
    // card fields
    this.listingTitle = page.locator('a.card .details .name').first();
    this.listingPrice = page.locator('a.card .details .price').first();
    this.listingAddress = page.locator('a.card .details .address').first();
    this.listingImage = page.locator('a.card .map-card-image-container img.primary-image').first();
    this.listingBuild = page.locator('a.card .details .build').first();
  }

 
  async getListingCount() {
    return await this.listingCards.count();
  }

  async hasFirstListingMandatoryFields() {
    const titleVisible = await this.listingTitle.isVisible();
    const priceVisible = await this.listingPrice.isVisible();
    const addressVisible = await this.listingAddress.isVisible();
    
    return titleVisible && priceVisible && addressVisible;
  }


  async getFirstListingDetails() {
    return {
      title: await this.listingTitle.textContent(),
      price: await this.listingPrice.textContent(),
      address: await this.listingAddress.textContent(),
      build: await this.listingBuild.textContent()
    };
  }
}
