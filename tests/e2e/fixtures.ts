import { test as base, expect, type Page } from '@playwright/test';

/** Every test fails on a console error, an uncaught exception or a missing resource. */
export const test = base.extend<{ expectedErrors: RegExp[]; strictPage: void }>({
  /** Console errors a test triggers on purpose (`test.use({ expectedErrors: [...] })`). */
  expectedErrors: [[], { option: true }],
  strictPage: [
    async ({ page, expectedErrors }, use) => {
      const problems: string[] = [];
      page.on('console', (message) => {
        const expected = expectedErrors.some((pattern) => pattern.test(message.text()));
        if (message.type() === 'error' && !expected) problems.push(`console : ${message.text()}`);
      });
      page.on('pageerror', (error) => problems.push(`exception : ${error.message}`));
      page.on('response', (response) => {
        if (response.status() >= 400) problems.push(`${response.status()} : ${response.url()}`);
      });
      // Direct navigations wait for the page to be interactive; a navigation by click is
      // followed by an explicit `hydrated(page)` in the test.
      for (const method of ['goto', 'reload'] as const) {
        const navigate = page[method].bind(page) as (...args: unknown[]) => Promise<unknown>;
        Object.assign(page, {
          [method]: async (...args: unknown[]) => {
            const response = await navigate(...args);
            await hydrated(page);
            return response;
          },
        });
      }
      await use();
      expect(problems).toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

/**
 * Waits until every interactive island of the page runs its script, as a learner who lets
 * the page finish loading. Astro removes the `ssr` attribute of an island once it is live.
 */
export const hydrated = (page: Page) => expect(page.locator('astro-island[ssr]')).toHaveCount(0);

/** Full-page capture for human review, published as a CI artifact. */
export const capture = (page: Page, name: string) =>
  page.screenshot({
    path: `test-results/captures/${name}.png`,
    fullPage: true,
    animations: 'disabled',
  });
