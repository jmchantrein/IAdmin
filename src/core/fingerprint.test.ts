import { describe, expect, it } from 'vitest';
import { fingerprint } from './fingerprint.ts';

const differingDigits = (a: string, b: string) =>
  [...a].filter((digit, i) => digit !== b[i]).length;

describe('fingerprint', () => {
  it('always gives five digits, the empty text included', () => {
    for (const text of ['', 'a', 'chat', 'Le chat dort sur le canapé du salon.', 'é€😀']) {
      expect(fingerprint(text)).toMatch(/^\d{5}$/);
      expect(Number(fingerprint(text))).toBeLessThanOrEqual(65535);
    }
  });

  it('gives the same fingerprint to the same text', () => {
    expect(fingerprint('chat')).toBe(fingerprint('chat'));
    expect(fingerprint('')).toBe(fingerprint(''));
  });

  it('keeps its published values', () => {
    // Bricks write these fingerprints in their solutions: changing the function breaks them.
    expect(
      Object.fromEntries(['', 'chat', 'chas', 'Chat', 'bonjour'].map((t) => [t, fingerprint(t)])),
    ).toMatchInlineSnapshot(`
      {
        "": "55093",
        "Chat": "05667",
        "bonjour": "21474",
        "chas": "00705",
        "chat": "30917",
      }
    `);
  });

  it('gives unrelated fingerprints to texts one character apart', () => {
    const words = ['chat', 'maison', 'bonjour', 'arbre', 'Paris', 'mot de passe', 'a', '2024'];
    const replacements = 'aeiostz1 ';
    const pairs: [string, string][] = [];
    for (const word of words) {
      for (let position = 0; position < word.length; position++) {
        for (const character of replacements) {
          if (word[position] === character) continue;
          pairs.push([word, word.slice(0, position) + character + word.slice(position + 1)]);
        }
      }
      // One character added at the end, too.
      pairs.push([word, `${word}s`]);
    }
    expect(pairs.length).toBeGreaterThanOrEqual(200);
    const total = pairs.reduce(
      (sum, [a, b]) => sum + differingDigits(fingerprint(a), fingerprint(b)),
      0,
    );
    expect(total / pairs.length).toBeGreaterThanOrEqual(3);
    // No pair keeps the same fingerprint in this sample.
    expect(pairs.filter(([a, b]) => fingerprint(a) === fingerprint(b))).toEqual([]);
  });
});
