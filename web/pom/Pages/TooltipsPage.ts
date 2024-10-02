import { test, expect, Locator, Page } from "@playwright/test";

export class Tooltip {
  page: Page;
  tooltipMenu: Locator;
  moreInfoBtn: Locator;
  moreInfoLink: Locator;
  title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tooltipMenu = page.getByRole("link", {
      name: "A set of tooltips to test against.",
    });
    this.moreInfoBtn = page.getByTestId("more-info-button");
    this.moreInfoLink = page.getByRole("tooltip");
    this.title = page.locator("h1.heading-element");
  }

  async goToTooltips() {
    await this.tooltipMenu.click();
  }

  async getMoreInfo() {
    await this.moreInfoBtn.hover();
    await this.moreInfoLink.click();
  }
}
