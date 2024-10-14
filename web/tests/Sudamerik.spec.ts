import { test, expect, Page } from "@playwright/test";
import { SearchAndCart } from "../pom/Pages/SudamerikPages/Search&CartPage";
import { SearchAndCartChecker } from "../pom/Checker/SudamerikChecker/SearchAndCartChecker";
import { Checkout } from "../pom/Pages/SudamerikPages/CheckoutPage";
import { LoginSudamerik } from "../pom/Pages/SudamerikPages/LoginPage";
import { LoginChecker } from "../pom/Checker/SudamerikChecker/LoginChecker";

test.describe(" Sudamerik", () => {
  test(
    " Buscar productos y agregar al carrito",
    {
      tag: "@Smoke",
    },
    async ({ page }) => {
      await page.goto(process.env.SUDAMERIK_HOME!);
      const searchPage = new SearchAndCart(page);
      const checkProduct = new SearchAndCartChecker(page);
      const product = "MACRITAS Nachos Original";
      const quantity = 3;
      await searchPage.searchProduct(product, quantity);
      await searchPage.gotToCart();
      await page.waitForLoadState("networkidle");
      await checkProduct.checkCartProduct();
    }
  );
  test(
    " Agregar productos al carrito desde categorias",
    {
      tag: "@Smoke",
    },
    async ({ page }) => {
      await page.goto(process.env.SUDAMERIK_HOME!);
      const searchPage = new SearchAndCart(page);
      const checkProduct = new SearchAndCartChecker(page);
      const quantity = 5;
      await searchPage.addProduct(quantity);
      await searchPage.gotToCart();
      await checkProduct.checkCartProducts();
    }
  );
  test(
    " Confirmar carrito sin llegar al minimo de compra",
    {
      tag: "@Smoke",
    },
    async ({ page }) => {
      await page.goto(process.env.SUDAMERIK_HOME!);
      const searchPage = new SearchAndCart(page);
      const checkProduct = new SearchAndCartChecker(page);
      const quantity = 1;
      await searchPage.addProduct(quantity);
      await searchPage.gotToCart();
      await page.waitForLoadState("networkidle");
      await checkProduct.checkDisabledBtn();
    }
  );
  test(
    " Eliminar productos del carrito",
    {
      tag: "@Smoke",
    },
    async ({ page }) => {
      await page.goto(process.env.SUDAMERIK_HOME!);
      const searchPage = new SearchAndCart(page);
      const checkProduct = new SearchAndCartChecker(page);
      const quantity = 5;
      await searchPage.addProduct(quantity);
      await searchPage.gotToCart();
      await searchPage.deleteProducts();
      await checkProduct.checkEmptyCart();
    }
  );
  test.only(
    " Completar checkout",
    {
      tag: "@Smoke",
    },
    async ({ page }) => {
      await page.goto(process.env.SUDAMERIK_HOME!);
      const searchPage = new SearchAndCart(page);
      const checkoutPage = new Checkout(page);
      const quantity = 6;
      await searchPage.addProduct(quantity);
      await searchPage.confirmCart();
      await checkoutPage.completeCheckout();
    }
  );
  test(
    " Logout",
    {
      tag: "@Smoke",
    },
    async ({ page }) => {
      await page.goto(process.env.SUDAMERIK_HOME!);
      const loginPage = new LoginSudamerik(page);
      const loginChecker = new LoginChecker(page);
      await loginPage.logOut();
      await page.waitForLoadState("networkidle");
      await loginChecker.checkLogout();
    }
  );
});
