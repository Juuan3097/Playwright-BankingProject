import { test, expect, Page } from "@playwright/test";
import { POManager } from "../pom/Pages/POManager";

test.describe(" Sudamerik", () => {
  test(
    " Buscar productos y agregar al carrito",
    {
      tag: "@Smoke",
    },
    async ({ page }) => {
      await page.goto(process.env.SUDAMERIK_HOME!);
      const poManager = new POManager(page);
      const search = await poManager.getSearchAndCart();
      const product = "MACRITAS Nachos Original";
      const quantity = 3;
      await search.searchProduct(product, quantity);
      await search.gotToCart();
      await page.waitForLoadState("networkidle");
      const cartProduct = await page.locator("article.card");
      expect(await cartProduct).toBeVisible();
    }
  );
  test(
    " Agregar productos al carrito desde categorias",
    {
      tag: "@Smoke",
    },
    async ({ page }) => {
      await page.goto(process.env.SUDAMERIK_HOME!);
      const poManager = new POManager(page);
      const search = await poManager.getSearchAndCart();
      const confirmCart = await search.confirmCartBtn;
      const quantity = 5;
      await search.addProduct(quantity);
      await search.gotToCart();
      expect(await confirmCart).toBeVisible();
    }
  );
  test(
    " Confirmar carrito sin llegar al minimo de compra",
    {
      tag: "@Smoke",
    },
    async ({ page }) => {
      await page.goto(process.env.SUDAMERIK_HOME!);
      const poManager = new POManager(page);
      const search = await poManager.getSearchAndCart();
      const quantity = 1;
      await search.addProduct(quantity);
      await search.gotToCart();
      const disabledBtn = await search.confirmBtnDisabled;
      await page.waitForLoadState("networkidle");
      expect(await disabledBtn).toBeVisible();
    }
  );
  test(
    " Eliminar productos del carrito",
    {
      tag: "@Smoke",
    },
    async ({ page }) => {
      await page.goto(process.env.SUDAMERIK_HOME!);
      const poManager = new POManager(page);
      const search = await poManager.getSearchAndCart();
      const quantity = 5;
      await search.addProduct(quantity);
      await search.gotToCart();
      await search.deleteProducts();
      const emptyCartMessage = await search.emptyCartMsg;
      expect(await emptyCartMessage).toBeVisible();
    }
  );
  test(
    " Completar checkout",
    {
      tag: "@Smoke",
    },
    async ({ page }) => {
      await page.goto(process.env.SUDAMERIK_HOME!);
      const poManager = new POManager(page);
      const search = await poManager.getSearchAndCart();
      const checkout = await poManager.getCheckout();
      const quantity = 5;
      await search.addProduct(quantity);
      await search.confirmCart();
      await checkout.completeCheckout();
    }
  );
  test(
    " Logout",
    {
      tag: "@Smoke",
    },
    async ({ page }) => {
      await page.goto(process.env.SUDAMERIK_HOME!);
      const poManager = new POManager(page);
      const logout = await poManager.getSudamerikLogin();
      await logout.logOut();
      await page.waitForLoadState("networkidle");
      const loginBtn = await logout.loginBtn;
      expect(loginBtn).toBeVisible();
    }
  );
});
