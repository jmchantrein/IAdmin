import { capture, expect, test } from './fixtures.ts';

const brick = (id: string) => `[data-brick="${id}"]`;

test("l'accueil mène au parcours", async ({ page }) => {
  await page.goto('');
  await expect(page).toHaveURL(/\/IAdmin\/fr\/$/);
  await capture(page, 'accueil');
  await page.getByRole('link', { name: 'Fondements' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Fondements');
  await expect(page.locator('.path-list li')).toHaveCount(3);
});

test('valider une brique rend la suivante disponible, et la progression persiste', async ({
  page,
}) => {
  await page.goto('fr/parcours/fondements/');
  await expect(page.locator(brick('donnees/information'))).toHaveAttribute(
    'data-status',
    'disponible',
  );
  await expect(page.locator(brick('donnees/information'))).toContainText('Continuer ici');
  await expect(page.locator(brick('donnees/combinaisons'))).toHaveAttribute(
    'data-status',
    'prerequis-manquants',
  );
  await capture(page, 'parcours-depart');

  // Free navigation: a brick opens even when its prerequisite is not acquired.
  await page.getByRole('link', { name: 'Le bit' }).click();
  await expect(page.locator(`.reminders ${brick('donnees/information')}`)).toContainText(
    'À voir d’abord',
  );

  // Manipulation first.
  const manipulation = page.locator('.manipulation');
  await manipulation.getByRole('switch').click();
  await expect(manipulation.getByTestId('bits-value')).toHaveText('1');

  const exercise = (n: number) => page.locator('.exercises ol > li').nth(n - 1);
  const submit = (n: number) => exercise(n).getByRole('button', { name: 'Valider' }).click();

  await exercise(1).getByLabel('2', { exact: true }).check();
  await submit(1);
  await expect(exercise(1).getByRole('status')).toHaveText('Exact.');

  // A wrong answer gets its own explanation, then the learner retries.
  await exercise(2).getByLabel('Le jour de la semaine.').check();
  await submit(2);
  await expect(exercise(2).getByRole('status')).toContainText('sept jours');
  await exercise(2).getByLabel('La porte est ouverte ou fermée.').check();
  await submit(2);

  await exercise(3).getByRole('textbox').fill('1');
  await submit(3);
  await expect(exercise(3).getByRole('status')).toContainText('le chiffre qui reste');
  await exercise(3).getByRole('textbox').fill(' 0 ');
  await submit(3);

  await expect(page.getByTestId('brick-validated')).toBeHidden();
  await exercise(4).getByRole('switch').click();
  await submit(4);

  await expect(page.getByTestId('exercises-progress')).toHaveText('4 / 4 exercices réussis');
  await expect(page.getByTestId('brick-validated')).toContainText('Brique validée');
  await capture(page, 'brique-validee');

  // The fact is stored in the browser and survives a reload.
  await page.reload();
  await expect(page.getByText('Tu as déjà validé cette brique')).toBeVisible();
  const stored = await page.evaluate(() => localStorage.getItem('iadmin:progression'));
  expect(JSON.parse(stored!).briques['donnees/bit'].etat).toBe('validee');

  await page.getByRole('link', { name: 'Parcours : Fondements' }).click();
  await expect(page.locator(brick('donnees/bit'))).toHaveAttribute('data-status', 'validee');
  await expect(page.locator(brick('donnees/combinaisons'))).toHaveAttribute(
    'data-status',
    'disponible',
  );
  await expect(page.getByTestId('path-progress')).toHaveText('1 / 3 briques acquises');
});

test('une notion acquise est rappelée, avec un exercice pour se tester', async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      'iadmin:progression',
      JSON.stringify({
        format: 'iadmin-progression',
        version: 1,
        briques: { 'donnees/bit': { etat: 'validee', le: '2026-11-17T10:00:00.000Z' } },
      }),
    ),
  );
  await page.goto('fr/briques/donnees/combinaisons/');
  const reminder = page.locator(`.reminders ${brick('donnees/bit')}`);
  await expect(reminder).toContainText('Rappel');
  await reminder.locator('summary').click();
  await expect(reminder).toContainText('Un bit est la plus petite information possible');
  await reminder.getByRole('button', { name: 'Me tester' }).click();
  await reminder.getByRole('textbox').fill('0');
  await reminder.getByRole('button', { name: 'Valider' }).click();
  await expect(reminder.getByRole('status')).toHaveText('Exact.');

  // Tracking widget: every combination of three bits can be found.
  const manipulation = page.locator('.manipulation');
  const switches = manipulation.getByRole('switch');
  // Gray code: one switch per step visits the eight combinations.
  for (const index of [2, 1, 2, 0, 2, 1, 2]) await switches.nth(index).click();
  await expect(manipulation).toContainText('8 / 8 combinaisons trouvées');
  await capture(page, 'combinaisons');
});

test('la devinette trouve le nombre en éliminant des possibilités', async ({ page }) => {
  await page.goto('fr/briques/donnees/information/');
  const message = page.getByTestId('guess-message');
  const cards = page.locator('.guess-cards button');
  await expect(cards.first()).toBeEnabled();
  for (let threshold = 1; threshold <= 7; threshold++) {
    if ((await message.textContent())?.startsWith('Trouvé')) break;
    await cards.nth(threshold - 1).click();
  }
  await expect(message).toContainText('Trouvé');
  await capture(page, 'information');
});

test.describe('progression illisible', () => {
  test.use({ expectedErrors: [/Progression illisible/] });

  test('elle est mise de côté, pas perdue', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('iadmin:progression', '{"format":"autre"}'),
    );
    await page.goto('fr/parcours/fondements/');
    await expect(page.getByTestId('path-progress')).toHaveText('0 / 3 briques acquises');
    expect(await page.evaluate(() => localStorage.getItem('iadmin:progression:illisible'))).toBe(
      '{"format":"autre"}',
    );
  });
});
