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
  test("@Web Complete inputs ", async ({ page }) => {
    await page.goto(process.env.NEAR_FORM_URL!);
    const poManager = new POManager(page);
    const inputs = await poManager.getInputs();
    await inputs.goToInputs();
    await inputs.completeInput();
  });
  test("@Web Download file ", async ({ page }) => {
    await page.goto(process.env.NEAR_FORM_URL!);
    const poManager = new POManager(page);
    const download = await poManager.getDownload();
    await download.goToDownload();
    await download.downloadFile();
  });
  test("@Web Upload File ", async ({ page }) => {
    await page.goto(process.env.NEAR_FORM_URL!);
    const poManager = new POManager(page);
    const uploadFile = await poManager.getUploadFile();
    await uploadFile.goToFileUploadMenu();
    await uploadFile.uploadFile();
  });
  test("@Web Alert notification ", async ({ page }) => {
    await page.goto(process.env.NEAR_FORM_URL!);
    const poManager = new POManager(page);
    const alert = await poManager.getAlert();
    await alert.goToAlert();
    await alert.handleAlert();
  });
  test("@Web Slider ", async ({ page }) => {
    await page.goto(process.env.NEAR_FORM_URL!);
    const poManager = new POManager(page);
    const slider = await poManager.getSlider();
    const rangeFrom: number = parseInt(process.env.RANGE_FROM!);
    const rangeTo: number = parseInt(process.env.RANGE_TO!);
    await slider.goToSliderMenu();
    await slider.moveSlider(rangeFrom, rangeTo);
    const getValue = await slider.getValues();
    const actualRangeFrom = getValue.fromValue;
    const actualRangeTo = getValue.toValue;
    expect(await actualRangeFrom).toEqual(process.env.RANGE_FROM!);
    expect(await actualRangeTo).toEqual(process.env.RANGE_TO!);
  });
  test("@Web Dynamic Table ", async ({ page }) => {
    await page.goto(process.env.NEAR_FORM_URL!);
    const poManager = new POManager(page);
    const dynamicTable = await poManager.getDynamicTable();
    await dynamicTable.goToTable();
    const limit = parseInt(process.env.LIMIT_PERCENTAGE!);
    await dynamicTable.getTableValue(limit);
  });
  test("@Web Drag & Drop Medium ", async ({ page }) => {
    await page.goto(process.env.NEAR_FORM_URL!);
    const poManager = new POManager(page);
    const dragNDropMedium = await poManager.getDragNDropMedium();
    const actionTimes = parseInt(process.env.ACTION_TIMES!);
    await dragNDropMedium.goToDNDMenu();
    await dragNDropMedium.dragAndDrop(actionTimes);
  });
  test("@Web Drag & Drop Hard ", async ({ page }) => {
    await page.goto(process.env.NEAR_FORM_URL!);
    const poManager = new POManager(page);
    const dragNDropHard = await poManager.getDragNDropHard();
    await dragNDropHard.goToDNDMenu();
    await dragNDropHard.dragNDrop();
  });
});
