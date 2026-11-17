import { readFileSync } from 'node:fs';
import { capture, expect, hydrated, test } from './fixtures.ts';

const KEY = 'iadmin:progression';
const stored = {
  format: 'iadmin-progression',
  version: 1,
  briques: {
    'donnees/bit': { etat: 'validee', le: '2026-11-17T10:00:00.000Z' },
    'donnees/information': { etat: 'presumee', le: '2026-11-16T09:00:00.000Z' },
  },
};

const summary = 'progress-summary';

test('exporter, effacer puis importer rend la même progression', async ({ page }) => {
  await page.goto('');
  await page.getByRole('link', { name: 'Ma progression' }).click();
  await hydrated(page);
  await expect(page.getByTestId(summary)).toHaveText('Aucune brique acquise pour l’instant.');

  await page.evaluate(
    ([key, value]) => localStorage.setItem(key!, value!),
    [KEY, JSON.stringify(stored)],
  );
  await page.reload();
  await expect(page.getByTestId(summary)).toHaveText('1 brique validée, 1 présumée acquise');

  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exporter ma progression' }).click();
  const download = await downloading;
  expect(download.suggestedFilename()).toMatch(/^iadmin-progression-\d{4}-\d{2}-\d{2}\.json$/);
  const file = await download.path();
  const exported = JSON.parse(readFileSync(file, 'utf8'));
  expect(exported.briques).toEqual(stored.briques);
  expect(exported.exporte_le).toBeTruthy();

  await page.getByRole('button', { name: 'Effacer ma progression' }).click();
  await page.getByRole('button', { name: 'Confirmer l’effacement' }).click();
  await expect(page.getByTestId(summary)).toHaveText('Aucune brique acquise pour l’instant.');
  expect(
    JSON.parse((await page.evaluate((key) => localStorage.getItem(key), KEY))!).briques,
  ).toEqual({});

  await page.getByLabel('Fichier de progression').setInputFiles(file);
  await expect(page.locator('.tool', { hasText: 'Importer' }).getByRole('status')).toHaveText(
    'Import réussi : 2 ajoutées, 0 renforcée, 0 déjà connue.',
  );
  await expect(page.getByTestId(summary)).toHaveText('1 brique validée, 1 présumée acquise');
  expect(JSON.parse((await page.evaluate((key) => localStorage.getItem(key), KEY))!)).toEqual(
    stored,
  );
  await capture(page, 'progression');

  // Importing the same file again changes nothing.
  await page.getByLabel('Fichier de progression').setInputFiles(file);
  await expect(page.locator('.tool', { hasText: 'Importer' }).getByRole('status')).toHaveText(
    'Import réussi : 0 ajoutée, 0 renforcée, 2 déjà connues.',
  );

  // The imported facts drive the path page.
  await page.goto('fr/parcours/fondements/');
  await expect(page.locator('[data-brick="donnees/bit"]')).toHaveAttribute(
    'data-status',
    'validee',
  );
  await expect(page.locator('[data-brick="donnees/information"]')).toHaveAttribute(
    'data-status',
    'presumee',
  );
});

test('un fichier invalide laisse la progression intacte', async ({ page }) => {
  await page.goto('fr/progression/');
  await page.evaluate(
    ([key, value]) => localStorage.setItem(key!, value!),
    [KEY, JSON.stringify(stored)],
  );
  await page.reload();
  const input = page.getByLabel('Fichier de progression');

  await input.setInputFiles({
    name: 'notes.json',
    mimeType: 'application/json',
    buffer: Buffer.from('ceci n’est pas du JSON'),
  });
  await expect(page.locator('.tool', { hasText: 'Importer' }).getByRole('status')).toContainText(
    'ce n’est pas du JSON',
  );

  await input.setInputFiles({
    name: 'autre.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({ format: 'autre', briques: { 'x/y': 'validee' } })),
  });
  await expect(page.locator('.tool', { hasText: 'Importer' }).getByRole('status')).toContainText(
    'n’est pas un export de progression',
  );

  await expect(page.getByTestId(summary)).toHaveText('1 brique validée, 1 présumée acquise');
  expect(JSON.parse((await page.evaluate((key) => localStorage.getItem(key), KEY))!)).toEqual(
    stored,
  );
});

test.describe('progression illisible', () => {
  test.use({ expectedErrors: [/Progression illisible/] });

  test('la copie mise de côté se télécharge puis se supprime', async ({ page }) => {
    await page.goto('fr/progression/');
    await page.evaluate((key) => localStorage.setItem(key, 'abîmé'), KEY);
    await page.reload();
    const notice = page.getByTestId('unreadable');
    await expect(notice).toBeVisible();

    const downloading = page.waitForEvent('download');
    await notice.getByRole('button', { name: 'Télécharger la copie' }).click();
    expect(readFileSync(await (await downloading).path(), 'utf8')).toBe('abîmé');

    await notice.getByRole('button', { name: 'Supprimer la copie' }).click();
    await expect(notice).toBeHidden();
    await page.reload();
    await expect(page.getByTestId(summary)).toBeVisible();
    await expect(notice).toBeHidden();
  });
});
