import { describe, expect, it } from 'vitest';
import { GATES, circuitValue, gateInputs, gateOutput, sharedInputs } from './logic.ts';

const ROWS: [boolean, boolean][] = [
  [false, false],
  [false, true],
  [true, false],
  [true, true],
];

describe('gateOutput', () => {
  it('reverses the bit for `non`', () => {
    expect(gateOutput('non', [false])).toBe(true);
    expect(gateOutput('non', [true])).toBe(false);
  });

  it('follows the truth table of each two-input gate', () => {
    const tables = {
      et: [false, false, false, true],
      ou: [false, true, true, true],
      'ou-exclusif': [false, true, true, false],
    } as const;
    for (const [gate, outputs] of Object.entries(tables)) {
      expect(ROWS.map((row) => gateOutput(gate as keyof typeof tables, row))).toEqual(outputs);
    }
  });

  it('refuses a wrong number of inputs', () => {
    expect(() => gateOutput('non', [true, false])).toThrow();
    expect(() => gateOutput('et', [true])).toThrow();
  });
});

describe('gateInputs and sharedInputs', () => {
  it('gives one input to `non` and two to the others', () => {
    expect(GATES.map(gateInputs)).toEqual([1, 2, 2, 2]);
  });

  it('agrees only on gates with the same number of inputs', () => {
    expect(sharedInputs(['non'])).toBe(1);
    expect(sharedInputs(['ou-exclusif', 'et'])).toBe(2);
    expect(sharedInputs(['non', 'et'])).toBeNull();
  });
});

describe('circuitValue', () => {
  it('writes the inputs, a colon, then each output in order', () => {
    expect(circuitValue(['et'], [true, false])).toBe('10:0');
    expect(circuitValue(['ou'], [true, false])).toBe('10:1');
    expect(circuitValue(['non'], [false])).toBe('0:1');
    // Half adder: the sum, then the carry.
    expect(circuitValue(['ou-exclusif', 'et'], [true, true])).toBe('11:01');
    expect(circuitValue(['ou-exclusif', 'et'], [false, true])).toBe('01:10');
  });
});
