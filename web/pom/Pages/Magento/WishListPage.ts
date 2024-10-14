import { Page, Locator, expect } from "@playwright/test";

export class WishListPage {
  page: Page;
  addToCartBtn: Locator;
  emptyWishlistMsg: Locator;
  goToCheckoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBtn = page.getByText("Add All to Cart");
    this.emptyWishlistMsg = page
      .locator("#wishlist-view-form")
      .getByText("You have no items in your");
    this.goToCheckoutBtn = page.getByRole("button", {
      name: "Proceed to Checkout",
    });
  }

  async addToCart() {
    await this.addToCartBtn.scrollIntoViewIfNeeded();
    await this.addToCartBtn.click();
    await this.emptyWishlistMsg.waitFor({ state: "visible" });
  }

  async goToCart() {
    await this.page.goto(process.env.MAGNETO_CART!);
  }

  async goToCheckout() {
    await this.goToCheckoutBtn.click();
  }

}
