import { describe, expect, it } from 'vitest';
import { seededOrder } from './shuffle.ts';

describe('seededOrder', () => {
  it('returns a permutation, identical for the same seed', () => {
    const order = seededOrder(5, 'Combien de valeurs ?');
    expect([...order].sort()).toEqual([0, 1, 2, 3, 4]);
    expect(seededOrder(5, 'Combien de valeurs ?')).toEqual(order);
  });

  it('spreads the first item over every position across seeds', () => {
    const positions = new Set<number>();
    for (let n = 0; n < 60; n++) positions.add(seededOrder(3, `question ${n}`).indexOf(0));
    expect([...positions].sort()).toEqual([0, 1, 2]);
  });

  it('handles the degenerate sizes', () => {
    expect(seededOrder(0, 'x')).toEqual([]);
    expect(seededOrder(1, 'x')).toEqual([0]);
  });
});
