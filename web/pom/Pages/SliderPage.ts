import { test, expect, Locator, Page } from "@playwright/test";

export class Slider {
  page: Page;
  sliderMenu: Locator;
  rangeSlider: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sliderMenu = page.getByRole("link", { name: "Sliders" });
    this.rangeSlider = page
      .getByTestId("range-slider")
      .locator("input[type='range']");
  }

  async goToSliderMenu() {
    await this.sliderMenu.click();
  }

  async moveSlider(rangeFrom: number, rangeTo: number) {
    await this.rangeSlider.nth(0).fill(rangeFrom.toString());
    await this.rangeSlider.nth(1).fill(rangeTo.toString());
  }

  async getValues() {
    const fromValue = await this.rangeSlider.nth(0).getAttribute("value");
    const toValue = await this.rangeSlider.nth(1).getAttribute("value");
    return { fromValue, toValue };
  }
}
