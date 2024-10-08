import { test, expect, Locator, Page } from "@playwright/test";

export class DragNDropMedium {
  page: Page;
  dndMediumMenu: Locator;
  dragableItem: Locator;
  dropItemAt: Locator;
  totalDrops: Locator;
  dropItemAtFather: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dndMediumMenu = page.getByText(
      "Drag elements from one side of the page and drop them on the other side."
    );
    this.dragableItem = page.getByTestId("draggable-box");
    this.dropItemAt = page.getByTestId("drop-target");
    this.dropItemAtFather = this.dropItemAt.locator("..");
    this.totalDrops = page.getByTestId("total-drops");
  }

  async goToDNDMenu() {
    await this.dndMediumMenu.click();
  }

  async dragAndDrop(actionTimes: number) {
    for (let i = 0; i < actionTimes; i++) {
      await this.dragableItem.hover();
      await this.page.mouse.down();
      await this.dropItemAtFather.waitFor({ state: "visible" });
      await this.dropItemAtFather.hover();
      await this.page.mouse.up();
    }
    const totalDropsText = await this.totalDrops.textContent();
    const totalDropValue = await parseInt(
      totalDropsText?.replace("Total Drops: ", "").trim()!
    );
    const boxCount = await this.dropItemAtFather.locator("div p").count();
    expect(await totalDropValue).toEqual(await boxCount);
  }
}
