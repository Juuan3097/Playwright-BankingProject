import { test, expect, chromium, Page } from "@playwright/test";
import { POManager } from "../pom/Pages/POManager";

test.describe.skip(" Addidas", () => {
  test.beforeAll(async ({}) => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    const login = await poManager.getLoginAdidas();
    await login.navigateToLogin();
    await login.loginStorage();
    await context.storageState({ path: "web/context/storageState.json" });
    await browser.close();
  });
  test(
    " Crear Cuenta",
    {
      tag: "",
    },
    async ({ page }) => {}
  );
});
