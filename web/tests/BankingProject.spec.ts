import { test, expect, chromium, Page } from "@playwright/test";
import { POManager } from "../pom/Pages/POManager";

test.describe("@Web BankingProject", () => {
  test("@Web Add New Customer", async ({ page }) => {
    await page.goto(process.env.URL!);
    const poManager = new POManager(page);
    const bankManager = await poManager.getBankManager();
    await bankManager.addNewCustomer();
  });

  test("@Web Crear Cuenta", async ({ page }) => {
    await page.goto(process.env.URL!);
    const poManager = new POManager(page);
    const bankManager = await poManager.getBankManager();
    await page.pause();
    await bankManager.addNewCustomer();
    const fullname = (await bankManager.getLastCustomer()).fullname;
    const firstName = process.env.FIRST_NAME;
    const lastName = process.env.LAST_NAME;
    const fullNameEnv = firstName + " " + lastName;
    expect(await fullname).toEqual(fullNameEnv);
    await bankManager.goBackToHome();
    await bankManager.openAccount();
    await bankManager.validateAccountNumber();
  });

  test("@Web Validar campos Mandatorios", async ({ page }) => {
    await page.goto(process.env.URL!);
    const poManager = new POManager(page);
    const bankManager = await poManager.getBankManager();
    const firstName = (await bankManager.fillFirstNameInput())
      .customersFirstName;
    expect(firstName === process.env.FIRST_NAME!).toBeFalsy();
  });

  test("@Web Customer Login", async ({ page }) => {
    await page.goto(process.env.URL!);
    const poManager = new POManager(page);
    const customer = await poManager.getCustomer();
    await customer.login();
    await customer.deposit();
  });
});
