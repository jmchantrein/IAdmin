import { describe, expect, it } from 'vitest';
import { brickSchema, pathSchema } from './schema.ts';
import { typeset, typesetBrick, typesetPath } from './typography.ts';

const NBSP = ' ';

describe('typeset (français)', () => {
  const fr = (text: string) => typeset(text, 'fr');

  it('puts a no-break space before : ; ? ! » and after «', () => {
    expect(fr('255 : impossible ; vrai ? oui !')).toBe(
      `255${NBSP}: impossible${NBSP}; vrai${NBSP}? oui${NBSP}!`,
    );
    expect(fr('ajoute 3 à « épargne »')).toBe(`ajoute 3 à «${NBSP}épargne${NBSP}»`);
  });

  it('turns a line break or several spaces into one no-break space', () => {
    expect(fr('de 0 à\n255 :\nfin')).toBe(`de 0 à\n255${NBSP}:\nfin`);
    expect(fr('«\nhuit  »')).toBe(`«${NBSP}huit${NBSP}»`);
  });

  it('leaves a text without a space at that place untouched', () => {
    for (const text of ['https://example.org/a?b=1', '12:30', 'un rapport 3:4', 'Fin.', '«x»']) {
      expect(fr(text)).toBe(text);
    }
  });

  it('is idempotent', () => {
    const once = fr('Quoi ? « Rien » : tout ; enfin !');
    expect(fr(once)).toBe(once);
  });

  it('leaves a language without rules untouched', () => {
    expect(typeset('What ? Nothing !', 'en')).toBe('What ? Nothing !');
  });
});

describe('typesetBrick', () => {
  const brick = brickSchema.parse({
    titre: 'Le pas : à pas',
    resume: 'Un « résumé » ?',
    niveau: 'bas',
    acquis: ['Dire : oui'],
    manipulation: {
      consigne: 'Avance : vois',
      widget: 'pas-a-pas',
      params: {
        etapes: [
          { legende: 'Début : rien', cases: ['a :'], etiquettes: { 0: 'là !' } },
          { legende: 'Fin', cases: ['b'] },
        ],
      },
    },
    exercices: [
      {
        type: 'choix',
        consigne: 'Lequel ?',
        options: [
          { texte: 'A ?', correct: true },
          { texte: 'B', retour: 'Non : A.' },
        ],
      },
      {
        type: 'saisie',
        consigne: 'Combien ?',
        verif: [{ egal: 'a :' }],
        solution: 'a :',
        contre_exemples: ['b :'],
        retour: 'Compte : a.',
      },
    ],
    plus_loin: [{ question: 'Et après ?', reponse: 'Rien !', source: 'https://example.org/?a' }],
  });
  const out = typesetBrick(brick, 'fr');

  it('typesets every displayed text', () => {
    expect(out.titre).toBe(`Le pas${NBSP}: à pas`);
    expect(out.resume).toBe(`Un «${NBSP}résumé${NBSP}»${NBSP}?`);
    expect(out.acquis).toEqual([`Dire${NBSP}: oui`]);
    expect(out.manipulation?.consigne).toBe(`Avance${NBSP}: vois`);
    const steps = (out.manipulation?.params as { etapes: { legende: string }[] }).etapes;
    expect(steps[0]).toMatchObject({
      legende: `Début${NBSP}: rien`,
      etiquettes: { 0: `là${NBSP}!` },
    });
    expect(out.exercices[0]).toMatchObject({
      consigne: `Lequel${NBSP}?`,
      options: [{ texte: `A${NBSP}?` }, { texte: 'B', retour: `Non${NBSP}: A.` }],
    });
    expect(out.exercices[1]).toMatchObject({
      consigne: `Combien${NBSP}?`,
      retour: `Compte${NBSP}: a.`,
    });
    expect(out.plus_loin[0]).toMatchObject({
      question: `Et après${NBSP}?`,
      reponse: `Rien${NBSP}!`,
    });
  });

  it('leaves the checked and technical fields as written', () => {
    expect(out.exercices[1]).toMatchObject({
      verif: [{ egal: 'a :' }],
      solution: 'a :',
      contre_exemples: ['b :'],
    });
    const steps = (out.manipulation?.params as { etapes: { cases: string[] }[] }).etapes;
    expect(steps[0]?.cases).toEqual(['a :']);
    expect(out.plus_loin[0]?.source).toBe('https://example.org/?a');
    expect(out.exercices[0]).not.toHaveProperty('options.0.retour');
  });

  it('typesets the title and the description of a path', () => {
    const path = pathSchema.parse({
      titre: 'Un : deux',
      description: 'Pourquoi ?',
      cibles: ['a/b'],
    });
    expect(typesetPath(path, 'fr')).toMatchObject({
      titre: `Un${NBSP}: deux`,
      description: `Pourquoi${NBSP}?`,
      cibles: ['a/b'],
    });
  });
});
