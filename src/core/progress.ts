import { progressSchema, type Progress, type State } from './schema.ts';

/**
 * Only facts are stored (`validee`, `presumee`). Whether a brick is available is derived
 * from the graph, so stored progress can never contradict it.
 */

export type Status = State | 'disponible' | 'prerequis-manquants';

export function emptyProgress(): Progress {
  return { format: 'iadmin-progression', version: 1, briques: {} };
}

/** Validates unknown data (stored or imported). Throws on anything unexpected. */
export function parseProgress(data: unknown): Progress {
  return progressSchema.parse(data);
}

export function isAcquired(progress: Progress, id: string): boolean {
  return id in progress.briques;
}

export function markValidated(progress: Progress, id: string, now: Date): Progress {
  return {
    ...progress,
    briques: { ...progress.briques, [id]: { etat: 'validee', le: now.toISOString() } },
  };
}

/** Direct prerequisites not acquired yet. */
export function missingPrerequisites(progress: Progress, requires: readonly string[]): string[] {
  return requires.filter((id) => !isAcquired(progress, id));
}

export function statusOf(progress: Progress, id: string, requires: readonly string[]): Status {
  const fact = progress.briques[id];
  if (fact) return fact.etat;
  return missingPrerequisites(progress, requires).length === 0
    ? 'disponible'
    : 'prerequis-manquants';
}
