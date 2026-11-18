import { defineConfig } from '@playwright/test';

const PORT = 4321;
// Set to the public address to run the same scenarios against the deployed site
// (`npm run e2e:live`); unset, the site built locally is served and tested.
const liveUrl = process.env.E2E_BASE_URL;
// Cloud sessions reach the internet through a proxy that the browser must be told about.
const proxy = liveUrl && process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;

// Les tests E2E s'exécutent contre le site construit (`npm run e2e` lance le build avant).
export default defineConfig({
  testDir: 'tests/e2e',
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: 'list',
  use: {
    baseURL: liveUrl ?? `http://localhost:${PORT}/IAdmin/`,
    proxy,
  },
  webServer: liveUrl
    ? undefined
    : {
        // `--ignore-lock` keeps the server in the foreground: Astro 7 otherwise detaches it
        // when it detects an AI agent, and Playwright then believes the server has exited.
        command: `npx astro preview --ignore-lock --port ${PORT}`,
        url: `http://localhost:${PORT}/IAdmin/`,
        reuseExistingServer: !process.env.CI,
      },
});
