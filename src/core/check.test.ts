import { describe, expect, it } from 'vitest';
import { runCheck } from './check.ts';

describe('runCheck', () => {
  it('applies filters in order before the predicate', () => {
    expect(runCheck(['rogner', 'minuscules', { egal: 'bit' }], '  BIT ')).toBe(true);
    expect(runCheck([{ egal: 'bit' }], ' bit')).toBe(false);
    expect(runCheck(['sans_espaces', { egal: '1010' }], '10 10')).toBe(true);
  });

  it('supports each predicate', () => {
    expect(runCheck([{ parmi: ['oui', 'vrai'] }], 'vrai')).toBe(true);
    expect(runCheck([{ parmi: ['oui', 'vrai'] }], 'non')).toBe(false);
    expect(runCheck([{ nombre: 4 }], ' 4 ')).toBe(true);
    expect(runCheck([{ nombre: 0.5 }], '0,5')).toBe(true);
    expect(runCheck([{ nombre: 4 }], 'quatre')).toBe(false);
    expect(runCheck([{ nombre: 0 }], '')).toBe(false);
  });

  it('matches a regex against the whole answer', () => {
    expect(runCheck([{ regex: '[01]{3}' }], '101')).toBe(true);
    expect(runCheck([{ regex: '[01]{3}' }], '1010')).toBe(false);
    expect(runCheck([{ regex: 'a|b' }], 'ab')).toBe(false);
  });

  it('rejects a pipeline without predicate', () => {
    expect(() => runCheck(['rogner'], 'x')).toThrow();
  });
});
