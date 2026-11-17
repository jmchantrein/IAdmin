import { expect, type Locator, type Page } from '@playwright/test';
import { isNumber } from '../../src/core/check.ts';
import type { Brick, Exercise } from '../../src/core/schema.ts';

/** Helpers that play the content the way a learner would, driven by the content itself. */

const NUMBER_ONLY = 'Écris seulement le nombre, en chiffres, sans unité ni autre mot.';

/** Brings a widget to the state described by `value` (the string its exercises check). */
async function driveWidget(scope: Locator, widget: string, value: string): Promise<void> {
  if (widget === 'bascule-bits') {
    const switches = scope.getByRole('switch');
    await expect(switches).toHaveCount(value.length);
    for (const [i, bit] of [...value].entries()) {
      const on = (await switches.nth(i).getAttribute('aria-checked')) === 'true';
      if (on !== (bit === '1')) await switches.nth(i).click();
    }
    return;
  }
  if (widget === 'pas-a-pas') {
    const position = scope.getByTestId('steps-position');
    const current = Number(/\d+/.exec((await position.textContent()) ?? '')?.[0]);
    const target = Number(value);
    const button = scope.getByRole('button', { name: target > current ? 'Suivant' : 'Précédent' });
    for (let step = 0; step < Math.abs(target - current); step++) await button.click();
    return;
  }
  throw new Error(`aucun pilote de test pour le widget « ${widget} »`);
}

/** True when the exercise is a typed answer checked as a number. */
const expectsNumber = (exercise: Exercise) => {
  const last = exercise.type === 'saisie' ? exercise.verif.at(-1) : undefined;
  return typeof last === 'object' && 'nombre' in last;
};

/**
 * Answers one exercise inside `scope`. With `wrongFirst`, gives a wrong answer first and
 * checks the explanation it gets.
 */
export async function solveExercise(
  scope: Locator,
  exercise: Exercise,
  { wrongFirst = false } = {},
): Promise<void> {
  const submit = scope.getByRole('button', { name: 'Valider' });
  // By class: a widget's value display also has the `status` role.
  const feedback = scope.locator('.feedback');

  if (exercise.type === 'choix') {
    // Options are displayed shuffled: each radio carries the index of its option as value.
    const radio = (index: number) => scope.locator(`input[type="radio"][value="${index}"]`);
    if (wrongFirst) {
      const wrong = exercise.options.findIndex((option) => !option.correct);
      await radio(wrong).check();
      await submit.click();
      await expect(feedback).toHaveText(exercise.options[wrong]!.retour!);
    }
    await radio(exercise.options.findIndex((option) => option.correct)).check();
  } else if (exercise.type === 'saisie') {
    const field = scope.getByRole('textbox');
    if (wrongFirst) {
      const wrong = exercise.contre_exemples[0]!;
      await field.fill(wrong);
      await submit.click();
      const numberOnly = expectsNumber(exercise) && !isNumber(wrong);
      await expect(feedback).toHaveText(numberOnly ? NUMBER_ONLY : exercise.retour);
    }
    await field.fill(exercise.solution);
  } else {
    if (wrongFirst) {
      await driveWidget(scope, exercise.widget, exercise.contre_exemples[0]!);
      await submit.click();
      await expect(feedback).toHaveText(exercise.retour);
    }
    await driveWidget(scope, exercise.widget, exercise.solution);
  }

  await submit.click();
  await expect(feedback).toHaveText('Exact.');
}

/** Solves every exercise of the brick page currently open, until the brick is validated. */
export async function solveBrick(page: Page, brick: Brick, options = {}): Promise<void> {
  const items = page.locator('.exercises > ol > li');
  await expect(items).toHaveCount(brick.exercices.length);
  for (const [i, exercise] of brick.exercices.entries()) {
    await expect(items.nth(i)).not.toHaveClass(/solved/);
    await solveExercise(items.nth(i), exercise, options);
    await expect(items.nth(i)).toHaveClass(/solved/);
  }
  await expect(page.getByTestId('brick-validated')).toBeVisible();
}
