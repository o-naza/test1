import dotenv from "dotenv";
import path from "path";
import { cleanEnv, url, str } from "envalid";
import { defineConfig, devices } from "@playwright/test";

dotenv.config({ path: path.resolve(__dirname, `./env/.env.${process.env.ENV || "prod"}`) });

export const env = cleanEnv(process.env, {
  FRONTEND_URL: url(),
  API_URL: url(),
});

export default defineConfig({
  timeout: 60000,
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    proxy: {
      server: "http://31.57.41.239:5815",
      username: "jnszfpbb",
      password: "xjvb14zx9cdg",
    },
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1920, height: 1080 } },
    }
  ],
});
