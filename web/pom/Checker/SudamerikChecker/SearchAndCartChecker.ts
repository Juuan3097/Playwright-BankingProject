import { test, expect, Locator, Page } from "@playwright/test";

export class SearchAndCartChecker {
  page: Page;
  cartProduct: Locator;
  confirmCartBtn: Locator;
  confirmBtnDisabled: Locator;
  emptyCartMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartProduct = page.locator("article.card");
    this.confirmCartBtn = page.getByRole("button", { name: "Confirmar" });
    this.confirmBtnDisabled = page.locator("button.btn-disabled");
    this.emptyCartMsg = page.getByText("No hay productos en tu carrito");
  }
  async checkCartProduct() {
    expect(await this.cartProduct).toBeVisible();
  }
  async checkCartProducts() {
    expect(await this.confirmCartBtn).toBeVisible();
  }
  async checkDisabledBtn() {
    expect(await this.confirmBtnDisabled).toBeVisible();
  }
  async checkEmptyCart() {
    expect(await this.emptyCartMsg).toBeVisible();
  }
}
