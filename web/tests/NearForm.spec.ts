import { test, expect, chromium, Page } from "@playwright/test";
import { POManager } from "../pom/Pages/POManager";

test.describe("@Web BankingProject", () => {
  test("@Web AddRemove element ", async ({ page }) => {
    await page.goto(process.env.NEAR_FORM_URL!);
    const poManager = new POManager(page);
    const addRemove = await poManager.getAddRemove();
    await addRemove.addRemove();
  });
  test("@Web Checkbox ", async ({ page }) => {
    await page.goto(process.env.NEAR_FORM_URL!);
    const poManager = new POManager(page);
    const checkbox = await poManager.getCheckbox();
    await checkbox.goTocheckboxMenu();
    await checkbox.checkbox();
    await checkbox.checkIcons();
  });
  test("@Web radioButton ", async ({ page }) => {
    await page.goto(process.env.NEAR_FORM_URL!);
    const poManager = new POManager(page);
    const radioButton = await poManager.getRadioButton();
    await radioButton.goToRadioButtonMenu();
    await radioButton.checkRadioBtn();
  });
  test("@Web Tootlip ", async ({ page }) => {
    await page.goto(process.env.NEAR_FORM_URL!);
    const poManager = new POManager(page);
    const tooltip = await poManager.getTooltip();
    await tooltip.goToTooltips();
    await tooltip.getMoreInfo();
  });
  test("@Web tes ", async ({ page }) => {
    await page.goto(process.env.NEAR_FORM_URL!);
    const poManager = new POManager(page);
    const inputs = await poManager.getInputs();
    await inputs.goToInputs();
    await inputs.completeInput();
  });
  test("@Web Upload File ", async ({ page }) => {
    await page.goto(process.env.NEAR_FORM_URL!);
    const poManager = new POManager(page);
    const uploadFile = await poManager.getUploadFile();
    await uploadFile.goToFileUploadMenu();
    await uploadFile.uploadFile();
    await page.pause();
  });
  test.only("@Web Alert notification ", async ({ page }) => {
    await page.goto(process.env.NEAR_FORM_URL!);
    const poManager = new POManager(page);
    const alert = await poManager.getAlert();
    await alert.goToAlert();
    await alert.handleAlert();
  });
  //  test("@Web tes ", async ({ page }) => {});
});
