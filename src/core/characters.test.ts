import { describe, expect, it } from 'vitest';
import { printableCharacter } from './characters.ts';

describe('printableCharacter', () => {
  it('gives the character of a printable code', () => {
    expect(printableCharacter(65)).toBe('A');
    expect(printableCharacter(97)).toBe('a');
    expect(printableCharacter(48)).toBe('0');
    expect(printableCharacter(32)).toBe(' ');
    expect(printableCharacter(126)).toBe('~');
  });

  it('gives nothing outside 32 to 126', () => {
    for (const code of [0, 10, 31, 127, 200, 255, -1, 65.5]) {
      expect(printableCharacter(code)).toBeNull();
    }
  });
});
