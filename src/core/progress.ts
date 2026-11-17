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

const STRENGTH: Record<State, number> = { presumee: 1, validee: 2 };

/** Adds the export date to a copy of the document. */
export function exportProgress(progress: Progress, now: Date): Progress {
  return { ...progress, exporte_le: now.toISOString() };
}

export interface MergeResult {
  progress: Progress;
  /** Bricks the local document did not know. */
  added: number;
  /** Bricks whose state got stronger (`presumee` → `validee`). */
  upgraded: number;
  /** Bricks already known with a state at least as strong. */
  known: number;
}

/**
 * Merges an imported document into the local one. Per brick, the strongest state wins and
 * the most recent date breaks ties. Nothing is ever dropped: bricks this site does not know
 * are kept, so a file can travel between versions of the site.
 */
export function mergeProgress(local: Progress, imported: Progress): MergeResult {
  const briques = { ...local.briques };
  const result = { added: 0, upgraded: 0, known: 0 };

  for (const [id, incoming] of Object.entries(imported.briques)) {
    const current = briques[id];
    if (!current) {
      result.added += 1;
      briques[id] = incoming;
    } else if (STRENGTH[incoming.etat] > STRENGTH[current.etat]) {
      result.upgraded += 1;
      briques[id] = incoming;
    } else {
      result.known += 1;
      if (incoming.etat === current.etat && incoming.le > current.le) briques[id] = incoming;
    }
  }

  return { progress: { format: local.format, version: local.version, briques }, ...result };
}
