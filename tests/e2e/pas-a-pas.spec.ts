import { capture, expect, test } from './fixtures.ts';

test("l'animation avance et recule au rythme de l'apprenant", async ({ page }) => {
  await page.goto('fr/briques/algo/algorithme/');
  const widget = page.locator('.manipulation');
  const caption = widget.getByTestId('steps-caption');
  const position = widget.getByTestId('steps-position');
  const previous = widget.getByRole('button', { name: 'Précédent' });
  const next = widget.getByRole('button', { name: 'Suivant' });

  await expect(position).toHaveText('Étape 1 / 8');
  await expect(caption).toHaveText('Tu retiens la première carte.');
  await expect(previous).toBeDisabled();
  await expect(widget.locator('.steps-cells li.active')).toHaveCount(1);

  await next.click();
  await expect(position).toHaveText('Étape 2 / 8');
  await expect(caption).toContainText('9 est plus grand que 4');
  await expect(widget.locator('.steps-cells li.active')).toHaveCount(2);

  await previous.click();
  await expect(position).toHaveText('Étape 1 / 8');

  for (let step = 1; step < 8; step++) await next.click();
  await expect(position).toHaveText('Étape 8 / 8');
  await expect(caption).toContainText('la plus grande de la rangée');
  await expect(next).toBeDisabled();
  await expect(widget.locator('.steps-cells li.out')).toHaveCount(3);
  await expect(widget.locator('.cell-label').nth(1)).toHaveText('la plus grande');
  await capture(page, 'algorithme');
});
