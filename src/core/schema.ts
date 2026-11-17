import { z } from 'zod';
import { runCheck } from './check.ts';
import { WIDGET_PARAMS, isWidgetName } from './widgets.ts';

/** Single source of truth for the content format (bricks, paths, exported progress). */

export const LEVELS = ['bas', 'moyen', 'haut'] as const;
export const KINDS = ['notion', 'defi'] as const;

export const BUDGETS = {
  acquisMax: 3,
  exercisesMin: 2,
  exercisesMax: 5,
  summaryWords: 40,
  bodyWords: 150,
} as const;

/** Counts words; pure punctuation (Markdown table bars, bullets) does not count. */
export function countWords(text: string): number {
  return text.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
}

/** `<domaine>/<brique>`, domains can be nested. A published id never changes. */
export const brickIdSchema = z
  .string()
  .regex(/^[a-z0-9-]+(\/[a-z0-9-]+)+$/, 'identifiant attendu : <domaine>/<brique> en [a-z0-9-]');

// --- Check pipeline: filters (string → string) then exactly one predicate ---

export const FILTERS = ['rogner', 'minuscules', 'sans_espaces'] as const;
const filterSchema = z.enum(FILTERS);

const predicateSchema = z.union([
  z.strictObject({ egal: z.string() }),
  z.strictObject({ parmi: z.array(z.string()).min(1) }),
  z.strictObject({ regex: z.string() }),
  z.strictObject({ nombre: z.number() }),
]);

export type Filter = z.infer<typeof filterSchema>;
export type Predicate = z.infer<typeof predicateSchema>;
export type Check = Array<Filter | Predicate>;

const checkSchema = z
  .array(z.union([filterSchema, predicateSchema]))
  .min(1)
  .superRefine((steps, ctx) => {
    steps.forEach((step, i) => {
      const isLast = i === steps.length - 1;
      if (isLast && typeof step === 'string') {
        ctx.addIssue({ code: 'custom', message: 'la chaîne `verif` se termine par un prédicat' });
      }
      if (!isLast && typeof step !== 'string') {
        ctx.addIssue({ code: 'custom', message: 'un seul prédicat, en fin de chaîne `verif`' });
      }
    });
  });

// --- Widgets ---

const widgetUseSchema = z.strictObject({
  widget: z.string(),
  params: z.record(z.string(), z.unknown()).default({}),
});

// --- Exercises ---

const choiceSchema = z.strictObject({
  type: z.literal('choix'),
  consigne: z.string().min(1),
  options: z
    .array(
      z.strictObject({
        texte: z.string().min(1),
        correct: z.literal(true).optional(),
        retour: z.string().min(1).optional(),
      }),
    )
    .min(2),
});

const checkedFields = {
  consigne: z.string().min(1),
  verif: checkSchema,
  /** Reference answer: must pass `verif`. */
  solution: z.string(),
  /** Typical wrong answers: each must fail `verif`. */
  contre_exemples: z.array(z.string()).min(1),
  /** Shown after a wrong answer: explains the reasoning that leads to the right one. */
  retour: z.string().min(1),
};

const inputSchema = z.strictObject({ type: z.literal('saisie'), ...checkedFields });

const widgetExerciseSchema = z.strictObject({
  type: z.literal('widget'),
  ...widgetUseSchema.shape,
  ...checkedFields,
});

export const exerciseSchema = z.discriminatedUnion('type', [
  choiceSchema,
  inputSchema,
  widgetExerciseSchema,
]);

export type Exercise = z.infer<typeof exerciseSchema>;
export type ChoiceExercise = z.infer<typeof choiceSchema>;
export type InputExercise = z.infer<typeof inputSchema>;
export type WidgetExercise = z.infer<typeof widgetExerciseSchema>;

/** Exercise types usable by the placement test and the "test me" reminders. */
export function isQuickExercise(e: Exercise): e is ChoiceExercise | InputExercise {
  return e.type === 'choix' || e.type === 'saisie';
}

// --- Brick ---

type Issue = { path: PropertyKey[]; message: string };

function widgetIssues(use: { widget: string; params: unknown }, path: PropertyKey[]): Issue[] {
  if (!isWidgetName(use.widget)) {
    return [{ path: [...path, 'widget'], message: `widget inconnu : ${use.widget}` }];
  }
  const parsed = WIDGET_PARAMS[use.widget].safeParse(use.params);
  if (parsed.success) return [];
  return parsed.error.issues.map((issue) => ({
    path: [...path, 'params', ...issue.path],
    message: issue.message,
  }));
}

function exerciseIssues(exercise: Exercise, path: PropertyKey[]): Issue[] {
  if (exercise.type === 'choix') {
    const issues: Issue[] = [];
    if (exercise.options.filter((o) => o.correct).length !== 1) {
      issues.push({ path: [...path, 'options'], message: 'exactement une option correcte' });
    }
    exercise.options.forEach((option, i) => {
      if (!option.correct && !option.retour) {
        issues.push({
          path: [...path, 'options', i],
          message: 'chaque mauvaise option porte un `retour` explicatif',
        });
      }
    });
    return issues;
  }
  const issues = exercise.type === 'widget' ? widgetIssues(exercise, path) : [];
  // A malformed `verif` is already reported by its own schema: nothing to run.
  if (typeof exercise.verif.at(-1) === 'string') return issues;
  if (!runCheck(exercise.verif, exercise.solution)) {
    issues.push({ path: [...path, 'solution'], message: 'la solution échoue à sa propre `verif`' });
  }
  exercise.contre_exemples.forEach((wrong, i) => {
    if (runCheck(exercise.verif, wrong)) {
      issues.push({
        path: [...path, 'contre_exemples', i],
        message: `le contre-exemple « ${wrong} » passe la \`verif\``,
      });
    }
  });
  return issues;
}

export const brickSchema = z
  .strictObject({
    titre: z.string().min(1),
    /** The one reminder text of the notion, reused wherever the brick is a prerequisite. */
    resume: z
      .string()
      .min(1)
      .refine((s) => countWords(s) <= BUDGETS.summaryWords, {
        message: `résumé de ${BUDGETS.summaryWords} mots au plus`,
      }),
    genre: z.enum(KINDS).default('notion'),
    niveau: z.enum(LEVELS),
    acquis: z.array(z.string().min(1)).min(1).max(BUDGETS.acquisMax),
    /** Strictly needed to understand this brick. Must stay acyclic. */
    requiert: z.array(brickIdSchema).default([]),
    /** What lies underneath ("under the hood"); never blocks. */
    repose_sur: z.array(brickIdSchema).default([]),
    /** Free links; loops allowed. */
    voir_aussi: z.array(brickIdSchema).default([]),
    manipulation: z
      .strictObject({ consigne: z.string().min(1), ...widgetUseSchema.shape })
      .optional(),
    exercices: z.array(exerciseSchema).min(BUDGETS.exercisesMin).max(BUDGETS.exercisesMax),
  })
  .superRefine((brick, ctx) => {
    const issues: Issue[] = [];
    if (brick.genre === 'notion' && !brick.manipulation) {
      issues.push({ path: ['manipulation'], message: 'une brique `notion` a une manipulation' });
    }
    if (brick.manipulation) issues.push(...widgetIssues(brick.manipulation, ['manipulation']));
    if (!brick.exercices.some(isQuickExercise)) {
      issues.push({ path: ['exercices'], message: 'au moins un exercice `choix` ou `saisie`' });
    }
    brick.exercices.forEach((e, i) => issues.push(...exerciseIssues(e, ['exercices', i])));
    for (const issue of issues) ctx.addIssue({ code: 'custom', ...issue });
  });

export type Brick = z.infer<typeof brickSchema>;

// --- Path (parcours) ---

export const pathSchema = z
  .strictObject({
    titre: z.string().min(1),
    description: z.string().min(1),
    /** Target bricks; the engine computes the route to them. */
    cibles: z.array(brickIdSchema).default([]),
    /** Other paths whose targets are included. */
    inclut: z.array(z.string().regex(/^[a-z0-9-]+$/)).default([]),
  })
  .refine((p) => p.cibles.length + p.inclut.length > 0, {
    message: 'un parcours a au moins une cible ou un parcours inclus',
  });

export type Path = z.infer<typeof pathSchema>;

// --- Progress (stored in the browser, exported as a file) ---

export const STATES = ['presumee', 'validee'] as const;

export const progressSchema = z.strictObject({
  format: z.literal('iadmin-progression'),
  version: z.literal(1),
  exporte_le: z.iso.datetime().optional(),
  briques: z.record(z.string(), z.strictObject({ etat: z.enum(STATES), le: z.iso.datetime() })),
});

export type Progress = z.infer<typeof progressSchema>;
export type State = (typeof STATES)[number];
