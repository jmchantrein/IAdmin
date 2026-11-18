import { z } from 'zod';
import { GATES, sharedInputs } from './logic.ts';

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
    /** Show the weight of each bit (…, 4, 2, 1) and the sum of the weights switched on. */
    poids: z.boolean().default(false),
    /** Show the character whose code is the number written by the bits (binary reading). */
    caractere: z.boolean().default(false),
  }),
  /** Guess a secret number with yes/no questions. Value: number of questions once found. */
  devinette: z.strictObject({
    max: z.number().int().min(2).max(32),
  }),
  /**
   * Text fields, each with its fingerprint, updated at every keystroke.
   * Value: `texte=empreinte` per field, separated by a space, e.g. "chat=30917 chas=00705".
   */
  empreinte: z.strictObject({
    /** Starting text of each field; a field holds 40 characters at most. */
    textes: z.array(z.string().max(40)).min(1).max(2),
  }),
  /**
   * One or two logic gates wired on the same inputs, a switch per input and a lamp per gate.
   * Value: the inputs, a colon, then the output of each gate in order, e.g. "10:1", "11:01".
   */
  porte: z.strictObject({
    portes: z
      .array(z.enum(GATES))
      .min(1)
      .max(2)
      .refine((gates) => sharedInputs(gates) !== null, {
        message:
          'la porte `non` a une seule entrée : elle ne se combine pas avec une porte à deux entrées',
      })
      .refine((gates) => new Set(gates).size === gates.length, {
        message: 'deux portes identiques montreraient la même sortie',
      }),
    /** List the rows of the truth table already found, in the order the learner finds them. */
    table: z.boolean().default(false),
  }),
  /**
   * Step-by-step animation declared in the brick: a row of cells per step, advanced by the
   * learner. Value: the number of the current step, starting at 1.
   */
  'pas-a-pas': z.strictObject({
    /**
     * Lays the cells of every step out in a grid of this many columns (an addition posed in
     * rows, a variable apart from the row of cards). Indices still run left to right, then
     * top to bottom; a row may stay incomplete.
     */
    colonnes: z.number().int().min(1).max(8).optional(),
    etapes: z
      .array(
        z
          .strictObject({
            /** What changes at this step, in one sentence. */
            legende: z.string().min(1),
            /** An empty text is an empty slot, without a frame, to align rows. */
            cases: z.array(z.string()).min(1).max(24),
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
