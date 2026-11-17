import { isQuickExercise } from '../../src/core/schema.ts';
import { loadContent } from '../load.ts';
import { capture, expect, hydrated, test } from './fixtures.ts';
import { solveBrick, solveExercise } from './play.ts';

const { bricks } = loadContent('fr');
const bit = bricks.get('donnees/bit')!;
const brick = (id: string) => `[data-brick="${id}"]`;

test("l'accueil mène au parcours", async ({ page }) => {
  await page.goto('');
  await expect(page).toHaveURL(/\/IAdmin\/fr\/$/);
  await capture(page, 'accueil');
  await page.getByRole('link', { name: 'Fondements' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Fondements');
  // The path grows with the content: only its first brick is pinned here.
  await expect(page.locator('.path-list li').first()).toContainText("L'information");
  expect(await page.locator('.path-list li').count()).toBeGreaterThan(3);
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
  await hydrated(page);
  await expect(page.locator(`.reminders ${brick('donnees/information')}`)).toContainText(
    'À voir d’abord',
  );

  // Manipulation first.
  const manipulation = page.locator('.manipulation');
  await manipulation.getByRole('switch').click();
  await expect(manipulation.getByTestId('bits-value')).toHaveText('1');

  // Records what is stored at the very moment "validated" appears on screen: the fact must
  // already be saved, or a learner who leaves the page at once would lose it.
  await page.evaluate(() => {
    new MutationObserver((_, observer) => {
      if (!document.querySelector('[data-testid="brick-validated"]')) return;
      document.body.dataset.storedWhenShown = localStorage.getItem('iadmin:progression') ?? '';
      observer.disconnect();
    }).observe(document.body, { childList: true, subtree: true });
  });
  await solveBrick(page, bit);
  expect(await page.evaluate(() => document.body.dataset.storedWhenShown)).toContain(
    '"donnees/bit":{"etat":"validee"',
  );
  await expect(page.getByTestId('exercises-progress')).toHaveText(
    `${bit.exercices.length} / ${bit.exercices.length} exercices réussis`,
  );
  await expect(page.getByTestId('brick-validated')).toContainText('Brique validée');

  // The fact is stored in the browser and survives a reload.
  await page.reload();
  await expect(page.getByText('Tu as déjà validé cette brique')).toBeVisible();
  const stored = await page.evaluate(() => localStorage.getItem('iadmin:progression'));
  expect(JSON.parse(stored!).briques['donnees/bit'].etat).toBe('validee');

  await page.getByRole('link', { name: 'Parcours : Fondements' }).click();
  await hydrated(page);
  await expect(page.locator(brick('donnees/bit'))).toHaveAttribute('data-status', 'validee');
  await expect(page.locator(brick('donnees/combinaisons'))).toHaveAttribute(
    'data-status',
    'disponible',
  );
  await expect(page.getByTestId('path-progress')).toHaveText(/^1 \/ \d+ briques acquises$/);
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
  await expect(reminder).toContainText(bit.resume);

  // "Test me" draws the last quick exercise of the recalled brick.
  await reminder.getByRole('button', { name: 'Me tester' }).click();
  await solveExercise(reminder, bit.exercices.findLast(isQuickExercise)!, { wrongFirst: true });

  // Tracking widget: the combinations found are listed, the total is only told at the end.
  const manipulation = page.locator('.manipulation');
  const found = manipulation.getByTestId('bits-found');
  await expect(found).toHaveText('1 combinaison trouvée');
  const switches = manipulation.getByRole('switch');
  // Gray code: one switch per step visits the eight combinations.
  for (const index of [2, 1, 2, 0, 2, 1]) await switches.nth(index).click();
  await expect(found).toHaveText('7 combinaisons trouvées');
  await switches.nth(2).click();
  await expect(found).toHaveText('Tu les as toutes trouvées : il y en a 8.');
  await capture(page, 'combinaisons-manipulation');
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
});

test('une saisie avec une unité demande le nombre seul', async ({ page }) => {
  await page.goto('fr/briques/donnees/combinaisons/');
  const exercise = page.locator('.exercises > ol > li').last();
  await exercise.getByRole('textbox').fill('4 bits');
  await exercise.getByRole('button', { name: 'Valider' }).click();
  await expect(exercise.locator('.feedback')).toHaveText(
    'Écris seulement le nombre, en chiffres, sans unité ni autre mot.',
  );
  await exercise.getByRole('textbox').fill('4');
  await exercise.getByRole('button', { name: 'Valider' }).click();
  await expect(exercise.locator('.feedback')).toHaveText('Exact.');
});

test.describe('progression illisible', () => {
  test.use({ expectedErrors: [/Progression illisible/] });

  test('elle est mise de côté, pas perdue', async ({ page }) => {
    await page.addInitScript(() => {
      // Seeded once: the page moves it aside, and later loads must stay clean.
      if (!sessionStorage.getItem('seeded')) {
        sessionStorage.setItem('seeded', '1');
        localStorage.setItem('iadmin:progression', '{"format":"autre"}');
      }
    });
    await page.goto('fr/parcours/fondements/');
    await expect(page.getByTestId('path-progress')).toHaveText(/^0 \/ \d+ briques acquises$/);
    expect(await page.evaluate(() => localStorage.getItem('iadmin:progression:illisible'))).toBe(
      '{"format":"autre"}',
    );
  });
});

test('une réponse tapée avant la fin du chargement est conservée et jugée', async ({ page }) => {
  // Holds back the script that makes the page interactive, as a slow connection would.
  let release!: () => void;
  const held = new Promise<void>((resolve) => (release = resolve));
  await page.route('**/_astro/client.*.js', async (route) => {
    await held;
    await route.continue();
  });

  const navigation = page.goto('fr/briques/donnees/combinaisons/');
  const exercise = page.locator('.exercises > ol > li').last();
  const field = exercise.getByRole('textbox');
  const submit = exercise.getByRole('button', { name: 'Valider' });

  // The page is readable but not interactive yet: the learner types anyway.
  await field.fill('4');
  await expect(submit).toBeDisabled();

  release();
  await navigation;
  await expect(submit).toBeEnabled();
  await expect(field).toHaveValue('4');
  await submit.click();
  await expect(exercise.locator('.feedback')).toHaveText('Exact.');
});
