import { test, expect, Locator, Page } from "@playwright/test";

export class Checkbox {
  page: Page;
  checkboxMenu: Locator;
  requiredCheckbox: Locator;
  checkboxIcons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkboxMenu = page.getByText("Checkbox");
    this.requiredCheckbox = page.getByTestId("required");
    this.checkboxIcons = page
      .getByTestId("favorite")
      .locator("..")
      .locator("span")
      .locator("input[type='checkbox']");
  }

  async goTocheckboxMenu() {
    await this.checkboxMenu.first().click();
  }

  async checkbox() {
    await this.requiredCheckbox.check();
    const checkState = await this.requiredCheckbox.isChecked();
    expect(await checkState).toBeTruthy();
  }

  async checkIcons() {
    console.log(
      "La cantidad de elementos encontrados son: " +
        (await this.checkboxIcons.count())
    );
    for (let i = 0; i < (await this.checkboxIcons.count()); i++) {
      const checkIconState = await this.checkboxIcons.nth(i).isChecked();
      if (checkIconState === false) {
        await this.checkboxIcons.nth(i).click();
      }
    }
  }
}
