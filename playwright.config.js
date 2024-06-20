// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000, 
  retries: process.env.CI ? 2 : 0, // Retry on CI only
  reporter: [['list'], ['json', { outputFile: 'results.json' }]],

  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    fullyParallel: true, // Run tests in files in parallel
    forbidOnly: !!process.env.CI, // Fail the build on CI if test.only is used
    workers: process.env.CI ? 1 : undefined, // Opt out of parallel tests on CI
    trace: 'on-first-retry', // Collect trace when retrying failed tests
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
