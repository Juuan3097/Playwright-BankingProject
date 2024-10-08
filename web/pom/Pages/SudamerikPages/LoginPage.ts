import { test, expect, Locator, Page } from "@playwright/test";

export class LoginSudamerik {
  page: Page;
  loginBtn: Locator;
  googleBtn: Locator;
  inputEmail: Locator;
  inputPassword: Locator;
  nextBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.googleBtn = page.locator("button.btn-google");
    this.inputEmail = page.locator("input[type='email']");
    this.inputPassword = page.locator("input[type='password']").first();
    this.loginBtn = page.getByRole("link", { name: "Ingresar" });
    this.nextBtn = page.getByRole("button", { name: "Next" });
  }

  async navigateToLogin() {
    await this.page.goto(process.env.SUDAMERIK_HOME!);
  }

  async loginSudamerik() {
    if (await this.loginBtn.isVisible()) {
      await this.loginBtn.click();
      await this.googleBtn.waitFor({ state: "visible" });
      await this.googleBtn.click();
      await this.inputEmail.waitFor({ state: "visible" });
      await this.inputEmail.fill(process.env.GOOGLE_EMAIL!);
      await this.nextBtn.click();
      await this.inputPassword.waitFor({ state: "visible" });
      await this.inputPassword.fill(process.env.GOOGLE_PASSWORD!);
      await this.nextBtn.click();
      await this.page.waitForURL(
        "https://www.sudamerikargentina.com.ar/search?previousPage=login"
      );
      await this.page
        .getByRole("link", { name: " Perfil" })
        .waitFor({ state: "visible" });
    }
  }
}
