import type { Check, Filter, Predicate } from './schema.ts';

/**
 * Check pipeline, in the spirit of a Unix pipe: the answer flows through filters
 * (string → string), then a single predicate decides (string → boolean).
 */

const FILTER_FNS: Record<Filter, (s: string) => string> = {
  rogner: (s) => s.trim(),
  minuscules: (s) => s.toLowerCase(),
  sans_espaces: (s) => s.replace(/\s+/g, ''),
};

/** Reads an answer as a number, accepting the French decimal comma. NaN when it is not one. */
function toNumber(input: string): number {
  const text = input.trim().replace(',', '.');
  return text === '' ? Number.NaN : Number(text);
}

/**
 * True when the answer is a number and nothing else. "3 bits" is not: the interface uses this
 * to ask for the number alone instead of telling the learner the value is wrong.
 */
export function isNumber(input: string): boolean {
  return Number.isFinite(toNumber(input));
}

function test(predicate: Predicate, input: string): boolean {
  if ('egal' in predicate) return input === predicate.egal;
  if ('parmi' in predicate) return predicate.parmi.includes(input);
  // The regex must match the whole answer: a forgotten anchor never lets a wrong answer through.
  if ('regex' in predicate) return new RegExp(`^(?:${predicate.regex})$`).test(input);
  return toNumber(input) === predicate.nombre;
}

export function runCheck(check: Check, answer: string): boolean {
  let value = answer;
  for (const step of check) {
    if (typeof step === 'string') value = FILTER_FNS[step](value);
    else return test(step, value);
  }
  throw new Error('chaîne `verif` sans prédicat');
}
