import { Locator, expect, Page } from "@playwright/test";

export class CheckoutChecker {
  page: Page;
  successfullPurchase: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successfullPurchase = page.getByText("Thank you for your purchase!");
  }

  async checkCheckout(){}
}
