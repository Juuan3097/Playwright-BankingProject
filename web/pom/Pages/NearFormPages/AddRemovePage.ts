import { test, expect, Locator, Page } from "@playwright/test";

export class AddRemove {
  page: Page;
  addRemoveMenu: Locator;
  addElement: Locator;
  removeElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addRemoveMenu = page.getByText("Add/Remove");
    this.addElement = page.getByTestId("add-element");
    this.removeElement = page
      .getByTestId("remove-element-1")
      .locator("..")
      .locator("..")
      .locator("div");
  }

  async addRemove() {
    await this.addRemoveMenu.click();
    await this.addElement.dblclick();
    console.log(
      "La cantidad encontrada son: " + (await this.removeElement.count())
    );

    for (let i = await this.removeElement.count(); i > 0; i--) {
      await this.removeElement
        .nth(i - 1)
        .locator("button")
        .click();
    }
  }
}
