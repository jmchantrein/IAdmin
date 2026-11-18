import { expect, test } from './fixtures.ts';

test('aucun signe double ne passe seul à la ligne', async ({ page }) => {
  await page.goto('fr/briques/donnees/octet/');
  // An ordinary space before `: ; ? ! »` or after `«` lets the browser break the line there.
  const breakable = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const found: string[] = [];
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node.textContent ?? '';
      if (/[ \t\r\n][:;?!»]|«[ \t\r\n]/.test(text)) found.push(text.trim().slice(0, 60));
    }
    return found;
  });
  expect(breakable).toEqual([]);
  // The signs are still there, with a no-break space before them (Playwright's text
  // assertions would see it as an ordinary space).
  const explanation = await page.locator('.explanation').textContent();
  expect(explanation).toContain('255 : impossible');
});
