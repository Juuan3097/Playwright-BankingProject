import { test, expect, Locator, Page } from "@playwright/test";

export class Download {
  page: Page;
  downloadMenu: Locator;
  downloadBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.downloadMenu = page.getByRole("link", { name: "File Download" });
    this.downloadBtn = page.getByTestId("CloudDownloadIcon");
  }

  async goToDownload() {
    await this.downloadMenu.click();
  }

  async downloadFile() {
    const downloadPromise = this.page.waitForEvent("download");
    await this.downloadBtn.click();
    const download = await downloadPromise;
    await download.saveAs("./" + download.suggestedFilename());
    await download.failure();
    console.log(
      "El archivo fue descargado en el siguiente path: " +
        (await download.path())
    );
  }
}
