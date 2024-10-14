import { expect, test as setup } from "@playwright/test";
import { MagentoLoginPage } from "../pom/Pages/Magento/LoginPage";
import path from "path";

const authFile = path.join(
  __dirname,
  "../playwright/.auth/magento-storageState.json"
);

setup(" Login", async ({ page }) => {
  await page.goto(process.env.MAGENTO_HOME!);
  const loginPage = new MagentoLoginPage(page);
  await loginPage.navigateToLogin();
  await loginPage.loginMagento();
  await page.context().storageState({ path: authFile });
});
