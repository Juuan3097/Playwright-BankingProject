import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./api/tests",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 30000 * 1000,
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    viewport: { width: 1536, height: 816 },
    trace: "retain-on-failure",
    headless: false,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "sudamerik-setup",
      use: { ...devices["Desktop Chrome"] },
      testMatch: ["SudamerikLogin.setup.ts"],
    },
    {
      name: "Sudamerik-chrome-project",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "web/playwright/.auth/user.json",
      },
      dependencies: ["sudamerik-setup"],
    },
    {
      name: "magento-setup",
      use: { ...devices["Desktop Chrome"] },
      testMatch: ["MagentoLogin.setup.ts"],
    },
    {
      name: "Magento-chrome-project",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "web/playwright/.auth/magento-storageState.json",
      },
      dependencies: ["magento-setup"],
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "simpleBookApiSetup",
      use: { ...devices["Desktop Chrome"] },
      testMatch: ["simpleBooksAuthentication.setup.ts"],
    },
    {
      name: "simpleBookAPI",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "API/playwright/.auth/user.json",
      },
      dependencies: ["simpleBookApiSetup"],
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
