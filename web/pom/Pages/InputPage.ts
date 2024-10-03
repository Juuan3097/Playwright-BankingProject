import { test, expect, Locator, Page } from "@playwright/test";

export class Inputs {
  page: Page;
  inputsMenu: Locator;
  dateInput: Locator;
  //  dateOutput: Locator;
  textArea: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputsMenu = page.getByText("Various Inputs");
    this.dateInput = page.locator("input[type='date']");
    //    this.dateOutput = page.locator("#:r16:");
    this.textArea = page.getByTestId("textarea-input");
  }

  async goToInputs() {
    await this.inputsMenu.click();
  }

  async completeInput() {
    await this.dateInput.focus();
    await this.dateInput.pressSequentially("08301997");
    //  const value = await this.dateOutput.getAttribute("value");
    //  await expect(await value).toEqual("1997-08-30");
    await this.textArea.first().fill("lorem ipsum");
    await this.page.pause();
  }
}
