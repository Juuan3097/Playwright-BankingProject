import { test, expect, Locator, Page } from "@playwright/test";

export class SearchAndCart {
  page: Page;
  searchInput: Locator;
  searchElement: Locator;
  addUnitBtn: Locator;
  addButton: Locator;
  container: Locator;
  productLink: Locator;
  category: Locator;
  cardBody: Locator;
  cartMenu: Locator;
  clearBtn: Locator;
  confirmClearCart: Locator;
  confirmCartBtn: Locator;
  confirmBtnDisabled: Locator;
  article: Locator;
  product: Locator;
  emptyCartMsg: Locator;
  searchProductButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator("input#search");
    this.searchElement = page.locator(".dropdown-content").locator("li");
    this.container = page.locator(".container").nth(2);
    this.productLink = this.container
      .locator("div")
      .nth(1)
      .locator("a")
      .first();
    this.addUnitBtn = page.locator("article button").nth(1);
    this.addButton = page.locator("article").getByText("Agregar");
    this.category = page.getByRole("link", { name: "Mix frutas" });
    this.cardBody = page.locator(".card-body");
    this.cartMenu = page.getByRole("link", { name: "Carrito" });
    this.clearBtn = page.getByRole("button", { name: "Vaciar carrito" });
    this.confirmClearCart = page.getByText("Vaciar", { exact: true });
    this.confirmCartBtn = page.getByRole("button", { name: "Confirmar" });
    this.article = page.locator("section.container").nth(5);
    this.product = this.article.locator("section");
    this.emptyCartMsg = page.getByText("No hay productos en tu carrito");
    this.confirmBtnDisabled = page.locator("button.btn-disabled");
    this.searchProductButton = page.getByText("Buscar productos");
  }

  async searchProduct(product: string, quantity: number) {
    await this.clearCart();
    await this.searchInput.fill(product);
    for (let i = 1; i < (await this.searchElement.count()); i++) {
      const elementText = await this.searchElement
        .nth(i)
        .locator("a")
        .locator("div")
        .locator("p");
      const resultText = await elementText.textContent();
      if ((await resultText?.includes(product)) === true) {
        console.log("Producto encontrado");
        await this.searchElement.nth(i).click();
        await this.container.waitFor({ state: "visible" });
        await this.productLink.waitFor({ state: "visible" });
        await this.productLink.click();
        await this.addUnit(quantity);
      }
    }
  }

  async addUnit(quantity: number) {
    for (let i = 1; i < quantity; i++) {
      await this.addUnitBtn.click();
    }
    await this.addButton.waitFor({ state: "visible" });
    await this.addButton.click();
  }

  async addProduct(quantity: number) {
    await this.clearCart();
    await this.category.click();
    for (let i = 0; i < quantity; i++) {
      const addToCart = await this.cardBody
        .nth(i)
        .locator("button[type='button']");
      await addToCart.click();
      await this.addButton.waitFor({ state: "visible" });
      await this.addButton.click();
      await addToCart.waitFor({ state: "visible" });
    }
  }

  async gotToCart() {
    await this.cartMenu.click();
  }

  async deleteProducts() {
    await this.article.waitFor({ state: "visible" });
    for (let i = await this.product.count(); i > 0; i--) {
      const closeBtn = await this.product
        .nth(i - 1)
        .locator("article.card")
        .locator("figure")
        .locator("span")
        .locator("svg");
      await closeBtn.click();
    }
    await this.searchProductButton.waitFor({ state: "visible" });
  }

  async confirmCart() {
    await this.gotToCart();
    await this.confirmCartBtn.waitFor({ state: "visible" });
    await this.confirmCartBtn.click();
  }

  async clearCart() {
    await this.cartMenu.click();
    await this.page.waitForLoadState("networkidle");
    if (await this.clearBtn.isVisible()) {
      await this.clearBtn.click();
      await this.confirmClearCart.waitFor({ state: "visible" });
      await this.confirmClearCart.click();
    }
    await this.page.goto(process.env.SUDAMERIK_HOME!);
  }
}
