import { test, expect, Locator, Page } from "@playwright/test";

export class Checkout {
  page: Page;
  billingInfo: Locator;
  paymentInfo: Locator;
  additionalInfo: Locator;
  couponInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.billingInfo = page.getByLabel("Consumidor Final");
    this.paymentInfo = page.getByLabel("Transferencia Bancaria Previa");
    this.additionalInfo = page.locator("textarea");
    this.couponInfo = page
      .getByText("BIENVENID@!!!")
      .locator("..")
      .locator("..")
      .locator("input[type='radio']");
  }

  async completeCheckout() {
    if ((await this.billingInfo.isChecked()) === false) {
      await this.billingInfo.check();
    }
    if ((await this.paymentInfo.isChecked()) === false) {
      await this.paymentInfo.check();
    }
    await this.additionalInfo.fill("Informacion adicional de pago");
    if ((await this.couponInfo.isChecked()) === false) {
      await this.couponInfo.check();
    }
  }
}
