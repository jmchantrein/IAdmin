import type { Locator, Page } from '@playwright/test';
import { loadContent } from '../load.ts';
import { capture, expect, test } from './fixtures.ts';

/** The four authoring mechanisms, as the template brick `donnees/bit` uses them. */

const { bricks } = loadContent('fr');
const informationSummary = bricks.get('donnees/information')!.resume;

const brickLink = (page: Page) =>
  page.locator('.explanation').getByRole('link', { name: 'information' });
const note = (page: Page) => page.locator('.explanation').getByRole('button', { name: 'bit' });

/** The tooltip an element points to with `aria-describedby`. */
async function tooltipOf(trigger: Locator): Promise<Locator> {
  const id = await trigger.getAttribute('aria-describedby');
  expect(id).toBeTruthy();
  const tooltip = trigger.page().locator(`[id="${id}"]`);
  await expect(tooltip).toHaveAttribute('role', 'tooltip');
  return tooltip;
}

async function expectWithinWidth(tooltip: Locator, width: number) {
  const box = (await tooltip.boundingBox())!;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(width);
}

test.describe('brique gabarit « le bit »', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('fr/briques/donnees/bit/');
  });

  test('le lien de brique mène à la brique et montre son résumé au survol et au focus', async ({
    page,
  }) => {
    const link = brickLink(page);
    await expect(link).toHaveAttribute('href', '/IAdmin/fr/briques/donnees/information/');
    const tooltip = await tooltipOf(link);
    await expect(link).toHaveAccessibleDescription(new RegExp(informationSummary.slice(0, 30)));
    await expect(tooltip).toBeHidden();

    await link.hover();
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText("L'information");
    await expect(tooltip).toContainText(informationSummary);
    await page.mouse.move(0, 0);
    await expect(tooltip).toBeHidden();

    await link.focus();
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText(informationSummary);
  });

  test('la note s’ouvre au focus clavier, sans être un lien', async ({ page }) => {
    const trigger = note(page);
    const tooltip = await tooltipOf(trigger);
    await expect(tooltip).toBeHidden();
    await trigger.focus();
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText('binary digit');
    await expect(page.locator('.explanation').getByRole('link', { name: 'bit' })).toHaveCount(0);
  });

  test('le schéma est une image nommée, intégrée au texte', async ({ page }) => {
    const schema = page.getByRole('img', { name: /la lampe éteinte est notée 0/ });
    await expect(schema).toBeVisible();
    await expect(page.locator('figure.schema > svg[role="img"]')).toHaveCount(1);
    await expect(page.locator('.explanation img')).toHaveCount(0);
  });

  test('« Pour aller plus loin » se déplie', async ({ page }) => {
    const section = page.locator('section.further');
    await expect(section.getByRole('heading', { name: 'Pour aller plus loin' })).toBeVisible();
    const answer = section.getByText('Ce sont de simples étiquettes');
    await expect(answer).toBeHidden();
    await section.locator('summary', { hasText: 'Pourquoi 0 et 1' }).click();
    await expect(answer).toBeVisible();

    await brickLink(page).hover();
    await capture(page, 'mecanismes');
    await page.emulateMedia({ colorScheme: 'dark' });
    await capture(page, 'mecanismes-sombre');
  });
});

test.describe('sur un écran de téléphone', () => {
  test.use({ viewport: { width: 360, height: 740 }, hasTouch: true });

  test('les infobulles tiennent dans la largeur, la note s’ouvre au toucher', async ({ page }) => {
    await page.goto('fr/briques/donnees/bit/');
    const trigger = note(page);
    const noteTooltip = await tooltipOf(trigger);
    await trigger.tap();
    await expect(noteTooltip).toBeVisible();
    await expectWithinWidth(noteTooltip, 360);

    const linkTooltip = await tooltipOf(brickLink(page));
    await brickLink(page).focus();
    await expect(linkTooltip).toBeVisible();
    await expectWithinWidth(linkTooltip, 360);
  });
});
