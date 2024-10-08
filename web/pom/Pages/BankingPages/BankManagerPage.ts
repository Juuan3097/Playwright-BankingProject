import { test, expect, Locator, Page } from "@playwright/test";

export class BankManager {
  page: Page;
  bankManagerBtn: Locator;
  addCustomerMenu: Locator;
  firstName: Locator;
  lastName: Locator;
  postcode: Locator;
  subtmitBtn: Locator;
  openAccountMenu: Locator;
  customerSelector: Locator;
  currencySelector: Locator;
  customersMenu: Locator;
  homeBtn: Locator;
  lastRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bankManagerBtn = page.getByRole("button", {
      name: "Bank Manager Login",
    });
    this.addCustomerMenu = page.getByRole("button", { name: "Add Customer" });
    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.postcode = page.getByPlaceholder("Post Code");
    this.subtmitBtn = page.locator("button[type='submit']");
    this.openAccountMenu = page.getByRole("button", { name: "Open Account" });
    this.customerSelector = page.locator("#userSelect");
    this.currencySelector = page.locator("#currency");
    this.customersMenu = page.getByRole("button", { name: "Customers" });
    this.homeBtn = page.getByRole("button", { name: "Home" });
    this.lastRow = page
      .locator(".table")
      .locator("tbody")
      .locator("tr")
      .last()
      .locator("td");
  }

  async goToBankManager() {
    await this.bankManagerBtn.click();
  }

  async getLastCustomer() {
    await this.customersMenu.click();
    const customerFirstName = await this.lastRow.first().textContent();
    const customerLastName = await this.lastRow.nth(1).textContent();
    const fullname = customerFirstName + " " + customerLastName;
    return { fullname };
  }

  async addNewCustomer() {
    await this.goToBankManager();
    await this.addCustomerMenu.click();
    await this.firstName.fill(process.env.FIRST_NAME!);
    await this.lastName.fill(process.env.LAST_NAME!);
    await this.postcode.fill(process.env.POSTCODE!);
    await this.subtmitBtn.click();
    await this.page.on("dialog", (dialog) => dialog.accept());
    await this.getLastCustomer();
  }

  async goBackToHome() {
    await this.homeBtn.click();
  }

  async openAccount() {
    const firstName = process.env.FIRST_NAME;
    const lastName = process.env.LAST_NAME;
    const fullName = firstName + " " + lastName;
    await this.goToBankManager();
    await this.openAccountMenu.click();
    await this.customerSelector.selectOption({
      label: `${fullName}`,
    });
    await this.currencySelector.selectOption({ value: "Rupee" });
    await this.subtmitBtn.click();
  }

  async validateAccountNumber() {
    await this.customersMenu.click();
    const accountNumberColumn = await this.lastRow.nth(3).locator("span");
    expect(await accountNumberColumn).toBeVisible();
  }

  async fillFirstNameInput() {
    await this.goToBankManager();
    await this.addCustomerMenu.click();
    await this.firstName.fill(process.env.FIRST_NAME!);
    await this.subtmitBtn.click();
    await this.customersMenu.click();
    const customersFirstName = await this.lastRow.first().textContent();
    return { customersFirstName };
  }
}
