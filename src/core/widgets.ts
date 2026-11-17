import { z } from 'zod';

/**
 * Contract of every widget: it receives validated `params` and exposes its state as a string
 * (`value`), which exercises feed into the check pipeline.
 * This file is the single list of widget names and parameter schemas; the matching components
 * live in `src/components/widgets`.
 */
export const WIDGET_PARAMS = {
  /** Row of switches. Value: the bit string, e.g. "101". */
  'bascule-bits': z.strictObject({
    bits: z.number().int().min(1).max(8),
    /** Show which combinations have already been found. */
    suivi: z.boolean().default(false),
  }),
  /** Guess a secret number with yes/no questions. Value: number of questions once found. */
  devinette: z.strictObject({
    max: z.number().int().min(2).max(32),
  }),
  /**
   * Step-by-step animation declared in the brick: a row of cells per step, advanced by the
   * learner. Value: the number of the current step, starting at 1.
   */
  'pas-a-pas': z.strictObject({
    etapes: z
      .array(
        z
          .strictObject({
            /** What changes at this step, in one sentence. */
            legende: z.string().min(1),
            cases: z.array(z.string()).min(1).max(12),
            /** Indices of the cells in focus. */
            actifs: z.array(z.number().int().min(0)).default([]),
            /** Indices of the cells set aside. */
            ecartes: z.array(z.number().int().min(0)).default([]),
            /** Short label under a cell, keyed by cell index. */
            etiquettes: z.record(z.string().regex(/^\d+$/), z.string().min(1)).default({}),
          })
          .refine(
            (step) =>
              [...step.actifs, ...step.ecartes, ...Object.keys(step.etiquettes).map(Number)].every(
                (index) => index < step.cases.length,
              ),
            { message: 'indice de case hors de la rangée' },
          ),
      )
      .min(2)
      .max(12),
  }),
} as const;

export type WidgetName = keyof typeof WIDGET_PARAMS;

export function isWidgetName(name: string): name is WidgetName {
  return Object.hasOwn(WIDGET_PARAMS, name);
}
