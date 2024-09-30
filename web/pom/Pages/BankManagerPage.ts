import { test, expect, Locator, Page } from "@playwright/test";

export class BankManager {
  page: Page;
  bankManagerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bankManagerBtn = page.getByRole("button", {
      name: "Bank Manager Login",
    });
  }

  async goToBankManager() {
    await this.bankManagerBtn.click();
  }
}
