import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
  page: Page;
  addressInput: Locator;
  cityInput: Locator;
  countrySelect: Locator;
  postalCodeInput: Locator;
  phoneInput: Locator;
  nextBtn: Locator;
  placeOrderBtn: Locator;
  newAddressBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressInput = page.getByLabel("Street Address: Line 1");
    this.cityInput = page.getByLabel("City");
    this.countrySelect = page.getByLabel("Country");
    this.postalCodeInput = page.getByLabel("Zip/Postal Code");
    this.phoneInput = page.getByLabel("Phone Number");
    this.nextBtn = page.getByRole("button", { name: "Next" });
    this.placeOrderBtn = page.getByRole("button", { name: "Place Order" });
    this.newAddressBtn = page.getByRole("button", { name: "+New Address" });
  }

  async fillCheckoutForm() {
    await this.page.waitForLoadState("networkidle");
    if (await this.newAddressBtn.isVisible()) {
      await this.nextBtn.click();
    } else {
      await this.addressInput.fill(process.env.MAGENTO_ADDRESS!);
      await this.cityInput.fill(process.env.MAGENTO_CITY!);
      await this.countrySelect.selectOption(process.env.MAGENTO_COUNTRY!);
      await this.postalCodeInput.fill(process.env.MAGENTO_POSTALCODE!);
      await this.phoneInput.fill(process.env.MAGENTO_PHONE!);
      await this.nextBtn.click();
    }
    await this.placeOrderBtn.waitFor({ state: "visible" });
    await this.placeOrderBtn.click();
  }
}
