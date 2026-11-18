import { loadContent, locales } from '../load.ts';
import { capture, expect, test } from './fixtures.ts';
import { solveBrick } from './play.ts';

/**
 * Plays every brick the way a learner would: one wrong answer first, to see its
 * explanation, then the reference solution, until the brick is validated.
 * Driven by the content itself: a new brick is covered without touching this file.
 */
for (const lang of locales()) {
  const { bricks, errors } = loadContent(lang);

  test(`contenu « ${lang} » lisible`, () => {
    expect(errors).toEqual([]);
  });

  for (const [id, brick] of bricks) {
    test(`${lang}/${id} se valide avec ses solutions`, async ({ page }) => {
      await page.goto(`${lang}/briques/${id}/`);
      await solveBrick(page, brick, { wrongFirst: true });
      const name = `brique-${id.replaceAll('/', '-')}`;
      await capture(page, name);
      // Diagrams and notes, where they are hardest to read: a phone, in the dark theme.
      await page.setViewportSize({ width: 360, height: 740 });
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.locator('.explanation').screenshot({
        path: `test-results/captures/${name}-telephone-sombre.png`,
        animations: 'disabled',
      });
    });
  }
}
