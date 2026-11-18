import { describe, expect, it } from 'vitest';
import { WIDGET_PARAMS } from './widgets.ts';

describe('paramètres du widget « pas-a-pas »', () => {
  const schema = WIDGET_PARAMS['pas-a-pas'];
  const step = (extra: object = {}) => ({ legende: 'On compare.', cases: ['4', '9'], ...extra });

  it('accepts declared steps and fills the defaults', () => {
    const parsed = schema.parse({
      etapes: [step(), step({ actifs: [1], etiquettes: { 1: 'retenue' } })],
    });
    expect(parsed.etapes[0]).toMatchObject({ actifs: [], ecartes: [], etiquettes: {} });
    expect(parsed.etapes[1]?.etiquettes).toEqual({ '1': 'retenue' });
  });

  it('needs at least two steps', () => {
    expect(schema.safeParse({ etapes: [step()] }).success).toBe(false);
  });

  it('lays the cells out in columns only when asked', () => {
    expect(schema.parse({ etapes: [step(), step()] })).not.toHaveProperty('colonnes');
    const cells = Array.from({ length: 23 }, (_, i) => (i % 5 === 0 ? '' : String(i)));
    const parsed = schema.parse({
      colonnes: 5,
      etapes: [step({ cases: cells, actifs: [22], etiquettes: { 21: 'retenue' } }), step()],
    });
    expect(parsed.colonnes).toBe(5);
    expect(parsed.etapes[0]?.cases).toHaveLength(23);
  });

  it('keeps between 1 and 8 columns and at most 24 cells per step', () => {
    for (const colonnes of [0, 9, 2.5]) {
      expect(schema.safeParse({ colonnes, etapes: [step(), step()] }).success).toBe(false);
    }
    const cells = (n: number) => Array<string>(n).fill('1');
    expect(schema.safeParse({ etapes: [step({ cases: cells(24) }), step()] }).success).toBe(true);
    expect(schema.safeParse({ etapes: [step({ cases: cells(25) }), step()] }).success).toBe(false);
  });

  it('rejects an index outside the row', () => {
    for (const extra of [{ actifs: [2] }, { ecartes: [5] }, { etiquettes: { 2: 'x' } }]) {
      expect(schema.safeParse({ etapes: [step(), step(extra)] }).success).toBe(false);
    }
  });
});

describe('paramètres du widget « bascule-bits »', () => {
  const schema = WIDGET_PARAMS['bascule-bits'];

  it('hides the tracker, the weights and the character unless asked', () => {
    expect(schema.parse({ bits: 4 })).toEqual({
      bits: 4,
      suivi: false,
      poids: false,
      caractere: false,
    });
    expect(schema.parse({ bits: 7, caractere: true, poids: true })).toMatchObject({
      caractere: true,
      poids: true,
    });
    expect(schema.parse({ bits: 8, poids: true }).poids).toBe(true);
  });

  it('keeps the row between 1 and 8 bits and rejects unknown parameters', () => {
    expect(schema.safeParse({ bits: 0 }).success).toBe(false);
    expect(schema.safeParse({ bits: 9 }).success).toBe(false);
    expect(schema.safeParse({ bits: 4, couleur: 'rouge' }).success).toBe(false);
  });
});
