import { describe, expect, it } from 'vitest';
import { brickSchema, pathSchema } from './schema.ts';

const valid = {
  titre: 'Le bit',
  resume: 'Un bit vaut 0 ou 1.',
  niveau: 'bas',
  acquis: ['Citer les deux valeurs d’un bit.'],
  manipulation: { consigne: 'Bascule.', widget: 'bascule-bits', params: { bits: 1 } },
  exercices: [
    {
      type: 'choix',
      consigne: 'Combien de valeurs ?',
      options: [
        { texte: '2', correct: true },
        { texte: '8', retour: 'Huit est le nombre de bits d’un octet.' },
      ],
    },
    {
      type: 'saisie',
      consigne: 'Lampe éteinte ?',
      verif: ['rogner', { egal: '0' }],
      solution: '0',
      contre_exemples: ['1'],
      retour: 'Un bit a deux valeurs : si allumé se note 1, éteint se note 0.',
    },
  ],
};

const messages = (data: unknown): string[] => {
  const result = brickSchema.safeParse(data);
  return result.success ? [] : result.error.issues.map((i) => i.message);
};

const withExercise = (exercise: unknown) => ({
  ...valid,
  exercices: [valid.exercices[0], exercise],
});

describe('brickSchema', () => {
  it('accepts the reference brick and fills the defaults', () => {
    const brick = brickSchema.parse(valid);
    expect(brick.genre).toBe('notion');
    expect(brick.requiert).toEqual([]);
  });

  it('rejects unknown keys', () => {
    expect(messages({ ...valid, bonus: 1 })).not.toEqual([]);
  });

  it('requires a manipulation for a notion, with a known widget and valid params', () => {
    const { manipulation: _, ...withoutManipulation } = valid;
    expect(messages(withoutManipulation)).toContain('une brique `notion` a une manipulation');
    expect(brickSchema.safeParse({ ...withoutManipulation, genre: 'defi' }).success).toBe(true);
    expect(
      messages({ ...valid, manipulation: { consigne: 'x', widget: 'inconnu', params: {} } }),
    ).toContain('widget inconnu : inconnu');
    expect(
      messages({ ...valid, manipulation: { consigne: 'x', widget: 'bascule-bits', params: {} } }),
    ).not.toEqual([]);
  });

  it('requires a solution that passes and counter-examples that fail', () => {
    const base = valid.exercices[1];
    expect(messages(withExercise({ ...base, solution: '1' }))).toContain(
      'la solution échoue à sa propre `verif`',
    );
    expect(messages(withExercise({ ...base, contre_exemples: [' 0 '] }))).toContain(
      'le contre-exemple «  0  » passe la `verif`',
    );
  });

  it('requires a predicate at the end of the check, and only there', () => {
    const base = valid.exercices[1];
    expect(messages(withExercise({ ...base, verif: ['rogner'] }))).toContain(
      'la chaîne `verif` se termine par un prédicat',
    );
    expect(messages(withExercise({ ...base, verif: [{ egal: '0' }, { egal: '0' }] }))).toContain(
      'un seul prédicat, en fin de chaîne `verif`',
    );
  });

  it('requires an explanatory feedback on checked exercises', () => {
    const { retour: _, ...withoutFeedback } = valid.exercices[1]!;
    expect(messages(withExercise(withoutFeedback))).not.toEqual([]);
  });

  it('requires one correct option and feedback on every wrong one', () => {
    const choice = (options: unknown) => ({
      ...valid,
      exercices: [{ type: 'choix', consigne: 'c', options }, valid.exercices[1]],
    });
    expect(messages(choice([{ texte: 'a' }, { texte: 'b', retour: 'r' }]))).toContain(
      'exactement une option correcte',
    );
    expect(messages(choice([{ texte: 'a', correct: true }, { texte: 'b' }]))).toContain(
      'chaque mauvaise option porte un `retour` explicatif',
    );
  });

  it('enforces the budgets', () => {
    expect(messages({ ...valid, resume: 'mot '.repeat(41) })).toContain(
      'résumé de 40 mots au plus',
    );
    expect(messages({ ...valid, exercices: [valid.exercices[0]] })).not.toEqual([]);
    expect(messages({ ...valid, acquis: ['a', 'b', 'c', 'd'] })).not.toEqual([]);
    expect(messages({ ...valid, requiert: ['Bit'] })).not.toEqual([]);
  });

  describe('plus_loin', () => {
    const entry = { question: 'Pourquoi 0 et 1 ?', reponse: 'Ce sont des étiquettes.' };

    it('defaults to an empty list and accepts an entry with or without source', () => {
      expect(brickSchema.parse(valid).plus_loin).toEqual([]);
      const source = { ...entry, source: 'https://fr.wikipedia.org/wiki/Bit' };
      expect(brickSchema.parse({ ...valid, plus_loin: [entry, source] }).plus_loin).toEqual([
        entry,
        source,
      ]);
    });

    it('keeps at most 3 entries and 80 words per answer', () => {
      expect(messages({ ...valid, plus_loin: [entry, entry, entry, entry] })).not.toEqual([]);
      expect(
        messages({ ...valid, plus_loin: [{ ...entry, reponse: 'mot '.repeat(81) }] }),
      ).toContain('réponse « pour aller plus loin » de 80 mots au plus');
      expect(messages({ ...valid, plus_loin: [{ ...entry, reponse: 'mot '.repeat(80) }] })).toEqual(
        [],
      );
    });

    it('requires a question, an answer and an https source', () => {
      expect(messages({ ...valid, plus_loin: [{ question: 'q' }] })).not.toEqual([]);
      expect(messages({ ...valid, plus_loin: [{ ...entry, question: '' }] })).not.toEqual([]);
      for (const source of ['http://example.org', 'ftp://example.org', 'example.org']) {
        expect(messages({ ...valid, plus_loin: [{ ...entry, source }] })).toContain(
          'source attendue : une adresse https://…',
        );
      }
      expect(messages({ ...valid, plus_loin: [{ ...entry, bonus: 1 }] })).not.toEqual([]);
    });
  });
});

describe('pathSchema', () => {
  it('needs at least one target or one included path', () => {
    expect(pathSchema.safeParse({ titre: 't', description: 'd' }).success).toBe(false);
    expect(pathSchema.safeParse({ titre: 't', description: 'd', inclut: ['shell'] }).success).toBe(
      true,
    );
  });
});
