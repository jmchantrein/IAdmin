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
} as const;

export type WidgetName = keyof typeof WIDGET_PARAMS;

export function isWidgetName(name: string): name is WidgetName {
  return Object.hasOwn(WIDGET_PARAMS, name);
}
