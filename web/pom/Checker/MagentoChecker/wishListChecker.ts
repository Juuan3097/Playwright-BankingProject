import { Locator, Page, expect } from "@playwright/test";

export class WishListChecker {
  page: Page;
  wishlistProduct: Locator;


  constructor(page: Page) {
    this.page = page;
    this.wishlistProduct = page
      .locator(".products-grid")
      .locator(".product-items")
      .locator("li.product-item");

  }

  async checkWishList(total: Number) {
    const totalProduct = await this.wishlistProduct.count();
    expect(await total).toEqual(await totalProduct);
  }

}
