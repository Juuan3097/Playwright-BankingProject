import { test } from "@playwright/test";
import { HomePage } from "../pom/Pages/Magento/HomePage";
import { WishListPage } from "../pom/Pages/Magento/WishListPage";
import { WishListChecker } from "../pom/Checker/MagentoChecker/wishListChecker";
import { CheckoutPage } from "../pom/Pages/Magento/CheckoutPage";
import { MyAccountPage } from "../pom/Pages/Magento/MyAccountPage";
import { LoginChecker } from "../pom/Checker/MagentoChecker/loginChecker";
import { MagentoLoginPage } from "../pom/Pages/Magento/LoginPage";

test.describe(" Magento", () => {
  test(
    "Agregar a Wishlist productos con 4 o mas estrellas",
    {
      tag: "",
    },
    async ({ page }) => {
      await page.goto(process.env.MAGENTO_HOME!);
      const projectPage = await new HomePage(page);
      const wishlistChecker = await new WishListChecker(page);
      await projectPage.goToCategory();
      const total = (await projectPage.addToWishlist()).total;
      await projectPage.goToWishList();
      await wishlistChecker.checkWishList(total);
    }
  );
  test(
    "Agregar productos al carrito",
    {
      tag: "",
    },
    async ({ page }) => {
      await page.goto(process.env.MAGENTO_HOME!);
      const homePage = new HomePage(page);
      const productName = await process.env.MAGENTO_PRODUCT_NAME!;
      const productQuantity = await parseInt(
        process.env.MAGENTO_PRODUCT_QUANTITY!
      );
      await homePage.goToMenCategory();
      await homePage.addToCart(productName, productQuantity);
    }
  );
  test(
    "Completar checkout desde wishlist",
    {
      tag: "",
    },
    async ({ page }) => {
      await page.goto(process.env.MAGENTO_HOME!);
      const homePage = await new HomePage(page);
      const wishlistPage = await new WishListPage(page);
      const checkoutPage = await new CheckoutPage(page);
      await homePage.goToCategory();
      await homePage.addToWishlist();
      await homePage.goToWishList();
      await wishlistPage.addToCart();
      await wishlistPage.goToCart();
      await wishlistPage.goToCheckout();
      await checkoutPage.fillCheckoutForm();
    }
  );
  test(
    "Agregar Review",
    {
      tag: "@Magento-Smoke",
    },
    async ({ page }) => {
      await page.goto(process.env.MAGENTO_HOME!);
      const homePage = new HomePage(page);
      await homePage.goToMenCategory();
      const productName = await process.env.MAGENTO_PRODUCT_NAME!;
      const summary = await process.env.MAGENTO_SUMMARY!;
      const review = await process.env.MAGENTO_REVIEW!;
      await homePage.searchProduct(productName, summary, review);
    }
  );
  test(
    "Editar contraseña",
    {
      tag: "",
    },
    async ({ page }) => {
      await page.goto(process.env.MAGENTO_HOME!);
      const homePage = new HomePage(page);
      const myAccountPage = new MyAccountPage(page);
      const loginChecker = new LoginChecker(page);
      await homePage.goToMyAccount();
      await myAccountPage.changePassword();
      await loginChecker.checkPasswordChange();
    }
  );
});
