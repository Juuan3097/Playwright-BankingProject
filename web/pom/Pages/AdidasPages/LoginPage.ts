import { test, expect, Locator, Page } from "@playwright/test";

export class Login {
  page: Page;
  loginBtn: Locator;
  inputEmail: Locator;
  inputPassword: Locator;
  selectCookies: Locator;
  saveCookies: Locator;
  termsNConditions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginBtn = page.locator("button[type='submit']");
    this.inputEmail = page.locator("input[type='email']");
    this.inputPassword = page.locator("input[tpye='password']");
    this.selectCookies = page.getByText("Gestionar el seguimiento");
    this.saveCookies = page.getByText("Guardar");
    this.termsNConditions = page
      .locator("form.gl-form")
      .locator(".gl-checkbox__label")
      .nth(1)
      .locator("input[type='checkbox']");
  }

  async navigateToLogin() {
    await this.page.goto(process.env.ADIDAS_LOGIN!);
  }

  async loginStorage() {
    await this.handleCookies();
    await this.page.pause();
    if (await this.loginBtn.isVisible()) {
      await this.page.waitForTimeout(3000);
      await this.inputEmail.fill(process.env.ADIDAS_EMAIL!);
      await this.page.waitForTimeout(3000);
      await this.termsNConditions.check();
      await this.loginBtn.click();
      await this.page.waitForTimeout(3000);
      await this.inputPassword.fill(process.env.ADIDAS_PASSWORD!);
      await this.page.waitForTimeout(3000);
      await this.loginBtn.click();
      await this.page
        .context()
        .storageState({ path: "web/context/storageState.json" });
    }
  }

  async handleCookies() {
    await this.page.pause();
    await this.selectCookies.click();
    await this.saveCookies.click();
  }
}
