import { test, expect, Locator, Page } from "@playwright/test";

export class DynamicTable {
  page: Page;
  tableMenu: Locator;
  table: Locator;
  row: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tableMenu = page.getByRole("link", { name: "Dynamic Table" });
    this.table = page.getByTestId("dynamic-table");
    this.row = this.table.locator("tbody").locator("tr");
  }

  async goToTable() {
    await this.tableMenu.click();
  }

  async getTableValue(limit: number) {
    await this.page.pause();
    let condition: boolean = false;
    for (let i = 0; i < (await this.row.count()); i++) {
      const name = await this.row.nth(i).locator("td").nth(0).textContent();
      const cpuPercentage = await this.row
        .nth(i)
        .locator("td")
        .nth(1)
        .textContent();
      const cpuPercentageValue = parseInt(cpuPercentage!);
      if (cpuPercentageValue > limit) {
        console.log("El elemento " + name + " supera el porcentaje permitido");
        condition = true;
      }
    }
    if (condition === false) {
      console.log(
        "Ningun elemento supera el limite de " +
          process.env.LIMIT_PERCENTAGE +
          "%"
      );
    }
  }
}
