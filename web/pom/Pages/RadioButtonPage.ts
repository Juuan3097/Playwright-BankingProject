import { test, expect, Locator, Page } from "@playwright/test";

export class RadioButton {
  page: Page;
  radioButtonMenu: Locator;
  redBtn: Locator;
  groupTwo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.radioButtonMenu = page.getByRole("link", {
      name: "Radio Button A set of radio",
    });
    this.redBtn = page.locator("input[value='Red']");
    this.groupTwo = page
      .getByTestId("radio-button-group-2")
      .locator("label")
      .getByLabel("purple");
  }

  async goToRadioButtonMenu() {
    await this.radioButtonMenu.waitFor({ state: "visible" });
    await this.radioButtonMenu.click();
  }

  async checkRadioBtn() {
    await this.redBtn.check();
    await this.groupTwo.waitFor({ state: "visible" });
    await this.groupTwo.check();
    await this.page.pause();
  }
}
