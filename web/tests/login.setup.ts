import { expect, test as setup } from "@playwright/test";
import { POManager } from "../pom/Pages/POManager";

import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup(" Buscar productos", async ({ page }) => {
  await page.goto(process.env.SUDAMERIK_HOME!);
  const poManager = new POManager(page);
  const login = await poManager.getSudamerikLogin();
  await login.navigateToLogin();
  await login.loginSudamerik();
  await page.context().storageState({ path: authFile });
});
