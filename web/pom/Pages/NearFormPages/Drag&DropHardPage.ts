import { test, expect, Locator, Page } from "@playwright/test";

export class DragNDropHard {
  page: Page;
  dndHardMenu: Locator;
  dragableItem: Locator;
  dropAtCircle: Locator;
  dropAtSquare: Locator;
  totalCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dndHardMenu = page.getByText(
      "Drag the appropriate smaller shapes onto the larger shape."
    );
    this.dragableItem = page.locator("div[draggable='true']");
    this.dropAtCircle = page.getByTestId("drop-circle");
    this.dropAtSquare = page.getByTestId("drop-square");
    this.totalCount = page.getByTestId("total-count");
  }

  async goToDNDMenu() {
    await this.dndHardMenu.click();
  }

  async dragNDrop() {
    const dragableItems = await this.dragableItem.count();
    for (let i = 0; i < (await this.dragableItem.count()); i++) {
      const itemId = await this.dragableItem.nth(i).getAttribute("data-testid");
      if (itemId?.includes("circle")) {
        await this.dragableItem.nth(i).hover();
        await this.page.mouse.down();
        await this.dropAtCircle.hover();
        await this.page.mouse.up();
      } else if (itemId?.includes("square")) {
        await this.dragableItem.nth(i).hover();
        await this.page.mouse.down();
        await this.dropAtSquare.hover();
        await this.page.mouse.up();
      }
    }
    const totalValueString = await this.totalCount.textContent();
    const totalValue = parseInt(
      totalValueString?.replace("Total Correct: ", "").trim()!
    );
    expect(await dragableItems).toEqual(totalValue);
  }
}
