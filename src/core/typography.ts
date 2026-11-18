import type { Brick, Exercise, Path } from './schema.ts';
import { WIDGET_PARAMS } from './widgets.ts';

/**
 * Typographic rules of each content language, applied to the text the learner reads.
 * Adding a language: add its rule to `RULES`; a language without a rule is left as is.
 */

const NBSP = ' ';
/** Ordinary spacing only: an existing no-break space is already right. */
const SPACING = '[ \\t\\r\\n]+';

/**
 * French: a no-break space before `: ; ? ! »` and after `«`, so the sign never starts a line
 * alone. Only an existing space is replaced: `12:30` or `https://…` have none and stay as is.
 */
const french = (text: string) =>
  text
    .replace(new RegExp(`${SPACING}(?=[:;?!»])`, 'g'), NBSP)
    .replace(new RegExp(`«${SPACING}`, 'g'), `«${NBSP}`);

const RULES: Record<string, (text: string) => string> = { fr: french };

/** Applies the typographic rules of `lang` to a displayed text. Idempotent. */
export function typeset(text: string, lang: string): string {
  const rule = RULES[lang];
  return rule ? rule(text) : text;
}

// --- Displayed fields of the content ---
// Fields compared with the learner's answer (`verif`, `solution`, `contre_exemples`), cells of
// a step, ids and addresses stay as written.

type WidgetUse = { widget: string; params: Record<string, unknown> };

function typesetWidget<W extends WidgetUse>(use: W, t: (s: string) => string): W {
  if (use.widget !== 'pas-a-pas') return use;
  // Already validated by the brick schema; parsing again only gives it its type.
  const params = WIDGET_PARAMS['pas-a-pas'].parse(use.params);
  return {
    ...use,
    params: {
      ...params,
      etapes: params.etapes.map((step) => ({
        ...step,
        legende: t(step.legende),
        etiquettes: Object.fromEntries(
          Object.entries(step.etiquettes).map(([index, label]) => [index, t(label)]),
        ),
      })),
    },
  };
}

function typesetExercise(exercise: Exercise, t: (s: string) => string): Exercise {
  const consigne = t(exercise.consigne);
  switch (exercise.type) {
    case 'choix':
      return {
        ...exercise,
        consigne,
        options: exercise.options.map((option) => ({
          ...option,
          texte: t(option.texte),
          ...(option.retour !== undefined && { retour: t(option.retour) }),
        })),
      };
    case 'saisie':
      return { ...exercise, consigne, retour: t(exercise.retour) };
    case 'widget':
      return typesetWidget({ ...exercise, consigne, retour: t(exercise.retour) }, t);
  }
}

/** The brick with the typographic rules of `lang` applied to every displayed text. */
export function typesetBrick(brick: Brick, lang: string): Brick {
  const t = (text: string) => typeset(text, lang);
  return {
    ...brick,
    titre: t(brick.titre),
    resume: t(brick.resume),
    acquis: brick.acquis.map(t),
    ...(brick.manipulation && {
      manipulation: typesetWidget(
        { ...brick.manipulation, consigne: t(brick.manipulation.consigne) },
        t,
      ),
    }),
    exercices: brick.exercices.map((exercise) => typesetExercise(exercise, t)),
    plus_loin: brick.plus_loin.map((entry) => ({
      ...entry,
      question: t(entry.question),
      reponse: t(entry.reponse),
    })),
  };
}

/** The path with the typographic rules of `lang` applied to its title and description. */
export function typesetPath(path: Path, lang: string): Path {
  return {
    ...path,
    titre: typeset(path.titre, lang),
    description: typeset(path.description, lang),
  };
}
