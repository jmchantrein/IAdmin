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

  it('rejects an index outside the row', () => {
    for (const extra of [{ actifs: [2] }, { ecartes: [5] }, { etiquettes: { 2: 'x' } }]) {
      expect(schema.safeParse({ etapes: [step(), step(extra)] }).success).toBe(false);
    }
  });
});

describe('paramètres du widget « bascule-bits »', () => {
  const schema = WIDGET_PARAMS['bascule-bits'];

  it('hides the tracker and the weights unless asked', () => {
    expect(schema.parse({ bits: 4 })).toEqual({ bits: 4, suivi: false, poids: false });
    expect(schema.parse({ bits: 8, poids: true }).poids).toBe(true);
  });

  it('keeps the row between 1 and 8 bits and rejects unknown parameters', () => {
    expect(schema.safeParse({ bits: 0 }).success).toBe(false);
    expect(schema.safeParse({ bits: 9 }).success).toBe(false);
    expect(schema.safeParse({ bits: 4, couleur: 'rouge' }).success).toBe(false);
  });
});
