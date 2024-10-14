import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  page: Page;
  categoryMenu: Locator;
  category: Locator;
  productContainer: Locator;
  product: Locator;
  continueShoppingBtn: Locator;
  dropDownMenu: Locator;
  myAccountBtn: Locator;
  menMenu: Locator;
  topSubMenu: Locator;
  jacketCategory: Locator;
  productSize: Locator;
  productColor: Locator;
  productQuantity: Locator;
  addToCartBtn: Locator;
  reviewTab: Locator;
  rateOne: Locator;
  rate: Locator;
  summaryInput: Locator;
  reviewInput: Locator;
  submitReviewBtn: Locator;
  fieldset: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryMenu = page.getByRole("menuitem", { name: "Gear" });
    this.category = page.getByRole("menuitem", { name: "Bags" });
    this.productContainer = page.locator("ol.products");
    this.product = this.productContainer.locator("li.product-item");
    this.continueShoppingBtn = page.getByRole("link", { name: "here" });
    this.dropDownMenu = page
      .locator("ul.header.links")
      .locator("li.customer-welcome")
      .locator("span.customer-name")
      .locator("button")
      .first();
    this.myAccountBtn = page.getByRole("link", { name: "My Account" });
    this.menMenu = page.getByRole("menuitem", { name: "Men" }).last();
    this.topSubMenu = page.getByRole("menuitem", { name: "Tops" });
    this.jacketCategory = page.getByRole("menuitem", { name: "Jackets" });
    this.productSize = page.getByLabel("L", { exact: true });
    this.productColor = page.getByLabel("Green");
    this.productQuantity = page.getByLabel("Qty");
    this.addToCartBtn = page.getByRole("button", { name: "Add to Cart" });
    this.reviewTab = page.locator("#tab-label-reviews");
    this.rateOne = page.getByTitle("1 stars");
    this.rate = page.getByTitle("4 stars");
    //    this.rate = page.locator("input#Rating_4");
    this.summaryInput = page.getByLabel("Summary");
    this.reviewInput = page.getByLabel("Review", { exact: true });
    this.submitReviewBtn = page.getByRole("button", { name: "Submit Review" });
    this.fieldset = page.locator(".review-fieldset");
  }

  async goToCategory() {
    await this.categoryMenu.hover();
    await this.category.click();
    await this.page.waitForLoadState("networkidle");
  }

  async addToWishlist() {
    let total = 0;
    for (let i = 0; i < (await this.product.count()); i++) {
      const productDetails = await this.product
        .nth(i)
        .locator(".product-item-info")
        .locator(".product-item-details");
      const productRate = await productDetails
        .locator(".product-reviews-summary")
        .locator(".rating-summary")
        .locator(".rating-result");
      const wishlistBtn = await productDetails
        .locator(".product-item-inner")
        .locator(".product-item-actions")
        .locator(".actions-secondary")
        .locator(".towishlist");
      const productRateString = await productRate.getAttribute("title");
      const productRateValue = await parseInt(
        productRateString!.replace("%", "")
      );
      if ((await productRateValue!) >= 80) {
        await this.product.nth(i).scrollIntoViewIfNeeded();
        await this.product.nth(i).hover();
        await wishlistBtn.waitFor({ state: "visible" });
        await wishlistBtn.click();
        console.log("Producto agregado");
        const contador = 1;
        total = total + contador;
        await this.continueShoppingBtn.waitFor({ state: "visible" });
        await this.continueShoppingBtn.click();
      }
    }
    return { total };
  }
  async goToWishList() {
    await this.page.goto(process.env.MAGENTO_WISHLIST!);
    await this.page.waitForLoadState("networkidle");
  }

  async goToMyAccount() {
    await this.dropDownMenu.click();
    await this.myAccountBtn.click();
  }

  async goToMenCategory() {
    await this.menMenu.waitFor({ state: "visible" });
    await this.menMenu.hover();
    await this.topSubMenu.hover();
    await this.jacketCategory.click();
    await this.page.waitForLoadState("networkidle");
  }

  async searchAndAddToCart(
    productTitle: string,
    productName: string,
    productQuantity: number,
    i: number
  ) {
    if (productName === productTitle) {
      await this.product.nth(i).click();
      await this.productSize.click();
      await this.productColor.click();
      await this.productQuantity.fill(`${productQuantity}`);
      await this.addToCartBtn.click();
      console.log("producto encontrado");
    }
  }

  async addToCart(productName: string, productQuantity: number) {
    for (let i = 0; i < (await this.product.count()); i++) {
      const productDetails = await this.product
        .nth(i)
        .locator(".product-item-info")
        .locator(".product-item-details");
      const productTitle = (
        await productDetails.locator(".product-item-name").textContent()
      )?.trim();
      await this.searchAndAddToCart(
        productTitle!,
        productName,
        productQuantity,
        i
      );
    }
  }

  async addReview(
    productName: string,
    productTitle: string,
    i: number,
    review: string,
    summary: string
  ) {
    if (productName === productTitle) {
      await this.product.nth(i).scrollIntoViewIfNeeded();
      await this.product.nth(i).click();
      await this.reviewTab.waitFor({ state: "visible" });
      await this.reviewTab.click();
      const contador = await this.rate.count();
      console.log("Locators encontrados: " + contador);
      await this.summaryInput.waitFor({ state: "visible" });
      await this.summaryInput.fill(summary);
      await this.reviewInput.fill(review);
      // await this.rate.waitFor({ state: "attached" });
      //await this.rate.click();
      await this.submitReviewBtn.click();
    }
  }

  async searchProduct(productName: string, summary: string, review: string) {
    for (let i = 0; i < (await this.product.count()); i++) {
      const productDetails = await this.product
        .nth(i)
        .locator(".product-item-info")
        .locator(".product-item-details");
      const productTitle = (
        await productDetails.locator(".product-item-name").textContent()
      )?.trim();
      await this.addReview(productName, productTitle!, i, summary, review);
    }
  }
}
