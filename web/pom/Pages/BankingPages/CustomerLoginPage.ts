import { test, expect, Locator, Page } from "@playwright/test";

export class Customer {
  page: Page;
  customerMenu: Locator;
  userSelect: Locator;
  loginBtn: Locator;
  welcomeMsg: Locator;
  depositMenu: Locator;
  amountInput: Locator;
  submitBtn: Locator;
  confirmationMsg: Locator;
  withdrawMenu: Locator;
  withdrawalInput: Locator;
  errorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.customerMenu = page.getByRole("button", { name: "Customer Login" });
    this.userSelect = page.locator("#userSelect");
    this.loginBtn = page.locator("button[type='submit']");
    this.welcomeMsg = page.getByText(" Welcome ");
    this.depositMenu = page.getByRole("button", { name: "Deposit" });
    this.amountInput = page.getByPlaceholder("amount");
    this.submitBtn = page.locator("button[type='submit']");
    this.confirmationMsg = page.getByText("Deposit Successful");
    this.withdrawMenu = page.getByRole("button", { name: "Withdrawl " });
    this.withdrawalInput = page.getByPlaceholder("amount");
    this.errorMsg = page.getByText(
      "Transaction Failed. You can not withdraw amount more than the balance."
    );
  }

  async login() {
    await this.customerMenu.click();
    await this.userSelect.selectOption({ label: "Harry Potter" });
    await this.loginBtn.click();
    await this.welcomeMsg.waitFor({ state: "visible" });
  }

  async deposit(depositAmount: number) {
    await this.depositMenu.click();
    await this.amountInput.fill(depositAmount.toString());
    await this.submitBtn.click();
    expect(await this.confirmationMsg).toBeVisible();
  }

  async withdraw(withdrawalAmount: number) {
    await this.withdrawMenu.click();
    await this.withdrawalInput.fill(withdrawalAmount.toString());
    await this.submitBtn.click();
    expect(await this.errorMsg).toBeVisible();
  }
}
