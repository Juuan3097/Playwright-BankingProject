import { Page, Locator, expect } from "@playwright/test";

export class LoginChecker {
  page: Page;
  loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginBtn = page.getByRole("link", { name: "Ingresar" });
  }

  async checkLogout() {
    expect(await this.loginBtn).toBeVisible();
  }
}
