import { test, expect, chromium, Page } from "@playwright/test";
import { POManager } from "../pom/Pages/POManager";

test.describe("@Web BankingProject", () => {
  test("@Web Add New Customer", async ({ page }) => {
    await page.goto(process.env.MYACCOUNT_URL!);
    const poManager = new POManager(page);
    const bankManager = await poManager.getBankManager();
    await bankManager.goToBankManager();
    console.log("test");
  });
});
