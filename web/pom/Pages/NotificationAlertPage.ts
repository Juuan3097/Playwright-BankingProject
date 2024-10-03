import { test, expect, Locator, Page } from "@playwright/test";

export class Alert {
  page: Page;
  alertMenu: Locator;
  errorBtn: Locator;
  errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertMenu = page.getByRole("link", { name: "Notification" });
    this.errorBtn = page.getByTestId("button-error");
    this.errorAlert = page.getByRole("alert");
  }

  async goToAlert() {
    await this.alertMenu.click();
  }

  async handleAlert() {
    await this.errorBtn.click();
    await this.page.on("dialog", (dialog) => dialog.dismiss());
    console.log("Alert handled");
  }
}
