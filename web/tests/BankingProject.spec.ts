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

  test("@Web Realizar deposito en la cuenta", async ({ page }) => {
    await page.goto(process.env.URL!);
    const poManager = new POManager(page);
    const customer = await poManager.getCustomer();
    const depositAmount = process.env.DEPOSIT_AMOUNT;
    await customer.login();
    await customer.deposit(parseInt(depositAmount!));
  });

  test("@Web Realizar retiro que exceda el balance", async ({ page }) => {
    await page.goto(process.env.URL!);
    const poManager = new POManager(page);
    const customer = await poManager.getCustomer();
    const withdrawalAmount = process.env.WITHDRAWAL_AMOUNT;
    await customer.login();
    await customer.withdraw(parseInt(withdrawalAmount!));
  });
});
