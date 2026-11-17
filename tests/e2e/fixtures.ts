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
      await use();
      expect(problems).toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

/** Full-page capture for human review, published as a CI artifact. */
export const capture = (page: Page, name: string) =>
  page.screenshot({
    path: `test-results/captures/${name}.png`,
    fullPage: true,
    animations: 'disabled',
  });
