import { test, expect, Locator, Page } from "@playwright/test";

export class UploadFile {
  page: Page;
  uploadFileMenu: Locator;
  uploadFileIcon: Locator;
  updloadBtn: Locator;
  alertMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.uploadFileMenu = page.getByRole("link", { name: "File Upload" });
    this.uploadFileIcon = page.locator("input[type='file']");
    this.updloadBtn = page.getByTestId("upload-button");
    this.alertMsg = page.getByTestId("upload-message");
  }

  async goToFileUploadMenu() {
    await this.uploadFileMenu.click();
  }

  async uploadFile() {
    await this.uploadFileIcon.setInputFiles("/Users/jrios/Downloads/file.txt");
    await this.updloadBtn.click();
    expect(await this.alertMsg).toBeVisible();
    // const fileChooserPromise = await this.page.waitForEvent("filechooser");
    // const fileChooser = await fileChooserPromise;
    // await fileChooser.setFiles(path.join("/Users/jrios/Downloads/file.txt"));
  }
}
