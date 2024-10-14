import { Page, Locator, expect } from "@playwright/test";

export class LoginChecker {
  page: Page;
  saveInfoMsg: Locator;
  emailInput: Locator;
  passInput: Locator;
  signInBtn: Locator;
  errorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.saveInfoMsg = page.getByText("You saved the account");
    this.emailInput = page.getByLabel("Email", { exact: true });
    this.passInput = page.getByLabel("Password");
    this.errorMsg = page.getByRole("alert").locator("div").first();
    this.signInBtn = page.getByRole("button", { name: "Sign In" });
  }

  async checkPasswordChange() {
    await this.emailInput.fill(process.env.MAGENTO_EMAIL!);
    await this.passInput.fill(process.env.MAGENTO_PASSWORD2!);
    await this.signInBtn.click();
    expect(await this.errorMsg).toBeAttached();
  }
}
