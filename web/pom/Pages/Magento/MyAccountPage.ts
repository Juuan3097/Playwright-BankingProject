import { Locator, Page } from "@playwright/test";

export class MyAccountPage {
  page: Page;
  changePasswordBtn: Locator;
  currentPassInput: Locator;
  newPasswordInput: Locator;
  confirmPassInput: Locator;
  saveChangesBtn: Locator;


  constructor(page: Page) {
    this.page = page;
    this.changePasswordBtn = page.getByRole("link", {
      name: "Change Password",
    });
    this.currentPassInput = page.getByLabel("Current Password");
    this.newPasswordInput = page.getByLabel("New Password", { exact: true });
    this.confirmPassInput = page.getByLabel("Confirm New Password");
    this.saveChangesBtn = page.getByRole("button", { name: "Save" });

  }

  async changePassword() {
    await this.changePasswordBtn.click();
    await this.currentPassInput.fill(process.env.MAGENTO_PASSWORD2!);
    await this.newPasswordInput.fill(process.env.MAGENTO_PASSWORD!);
    await this.confirmPassInput.fill(process.env.MAGENTO_PASSWORD!);
    await this.saveChangesBtn.click();
  }
}
