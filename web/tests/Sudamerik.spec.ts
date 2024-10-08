import { test, expect, Page } from "@playwright/test";
import { POManager } from "../pom/Pages/POManager";

test.describe(" Sudamerik", () => {
  test(
    " Buscar productos",
    {
      tag: "@Smoke",
    },
    async ({ page }) => {
      await page.goto(process.env.SUDAMERIK_HOME!);
      await page.pause();
    }
  );
});
