import { test, Locator, Page } from "@playwright/test";

export class MagentoLoginPage {
  page: Page;
  loginBtn: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  confirmLoginBtn: Locator;
  dropDownMenu: Locator;
  logOutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginBtn = page.getByRole("link", { name: "Sign In" });
    this.emailInput = page.locator("input[type='email']");
    this.passwordInput = page.locator("input[type='password']");
    this.confirmLoginBtn = page.getByRole("button", { name: "Sign In" });
    this.dropDownMenu = page
      .locator("ul.header.links")
      .locator("li.customer-welcome")
      .locator("span.customer-name")
      .locator("button")
      .first();
    this.logOutBtn = page.getByRole("link", { name: "Sign Out" });
  }

  async navigateToLogin() {
    await this.page.goto(process.env.MAGENTO_HOME!);
  }
  async loginMagento() {
    if (await this.loginBtn.isVisible()) {
      await this.loginBtn.click();
      await this.emailInput.fill(process.env.MAGENTO_EMAIL!);
      await this.passwordInput.fill(process.env.MAGENTO_PASSWORD2!);
      await this.confirmLoginBtn.click();
      await this.page.waitForURL(process.env.MAGENTO_HOME!);
    }
  }

  async logOut() {
    await this.dropDownMenu.click();
    await this.logOutBtn.click();
    await this.loginBtn.click();
  }
}
