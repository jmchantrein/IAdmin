/**
 * Order of display derived from a seed: a permutation of 0..length-1 that is the same on
 * the static build and in the browser, and differs from one seed to the next.
 * Used to show the options of a question in an order that does not depend on how the
 * author listed them (authors tend to write the right answer first).
 */
export function seededOrder(length: number, seed: string): number[] {
  // FNV-1a hash of the seed, then a linear congruential generator for the Fisher-Yates draws.
  let state = 2166136261;
  for (const char of seed) state = Math.imul(state ^ char.codePointAt(0)!, 16777619) >>> 0;

  const order = Array.from({ length }, (_, i) => i);
  for (let i = length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = Math.floor((state / 2 ** 32) * (i + 1));
    [order[i], order[j]] = [order[j]!, order[i]!];
  }
  return order;
}
