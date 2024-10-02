import { test, expect, Locator, Page } from "@playwright/test";

export class Customer {
  page: Page;
  customerMenu: Locator;
  userSelect: Locator;
  loginBtn: Locator;
  welcomeMsg: Locator;
  depositBtn: Locator;
  amountInput: Locator;
  submitBtn: Locator;
  confirmationMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.customerMenu = page.getByRole("button", { name: "Customer Login" });
    this.userSelect = page.locator("#userSelect");
    this.loginBtn = page.locator("button[type='submit']");
    this.welcomeMsg = page.getByText(" Welcome ");
    this.depositBtn = page.getByRole("button", { name: "Deposit" });
    this.amountInput = page.getByPlaceholder("amount");
    this.submitBtn = page.locator("button[type='submit']");
    this.confirmationMsg = page.getByText("Deposit Successful");
  }

  async login() {
    await this.customerMenu.click();
    await this.userSelect.selectOption({ label: "Harry Potter" });
    await this.loginBtn.click();
    await this.welcomeMsg.waitFor({ state: "visible" });
  }

  async deposit() {
    await this.depositBtn.click();
    await this.amountInput.fill("1500");
    await this.submitBtn.click();
    expect(await this.confirmationMsg).toBeVisible();
  }
}
