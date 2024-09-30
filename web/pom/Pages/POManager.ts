import { Page } from "@playwright/test";
import { BankManager } from "./BankManagerPage";

export class POManager {
  page: Page;
  bankManager: BankManager;

  constructor(page: Page) {
    this.page = page;
    this.bankManager = new BankManager(this.page);
  }

  async getBankManager() {
    return this.bankManager;
  }
}
