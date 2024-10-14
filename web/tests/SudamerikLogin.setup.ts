import { expect, test as setup } from "@playwright/test";
import { LoginSudamerik } from "../pom/Pages/SudamerikPages/LoginPage";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup(" Login", async ({ page }) => {
  await page.goto(process.env.SUDAMERIK_HOME!);
  const loginPage = new LoginSudamerik(page);
  await loginPage.navigateToLogin();
  await loginPage.loginSudamerik();
  await page.context().storageState({ path: authFile });
});
