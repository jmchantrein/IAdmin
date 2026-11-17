import { defineConfig } from '@playwright/test';

const PORT = 4321;

// Les tests E2E s'exécutent contre le site construit (`npm run e2e` lance le build avant).
export default defineConfig({
  testDir: 'tests/e2e',
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${PORT}/IAdmin/`,
  },
  webServer: {
    // `--ignore-lock` keeps the server in the foreground: Astro 7 otherwise detaches it
    // when it detects an AI agent, and Playwright then believes the server has exited.
    command: `npx astro preview --ignore-lock --port ${PORT}`,
    url: `http://localhost:${PORT}/IAdmin/`,
    reuseExistingServer: !process.env.CI,
  },
});
