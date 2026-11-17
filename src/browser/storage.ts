import { emptyProgress, parseProgress } from '../core/progress.ts';
import type { Progress } from '../core/schema.ts';

const KEY = 'iadmin:progression';

/**
 * Reads the stored progress. Unreadable data is kept aside under another key, never
 * silently dropped, and the learner starts from an empty document.
 */
export function loadProgress(): Progress {
  const raw = localStorage.getItem(KEY);
  if (raw === null) return emptyProgress();
  try {
    return parseProgress(JSON.parse(raw));
  } catch (error) {
    localStorage.setItem(`${KEY}:illisible`, raw);
    console.error(
      'Progression illisible, mise de côté sous « iadmin:progression:illisible ».',
      error,
    );
    return emptyProgress();
  }
}

export function saveProgress(progress: Progress): void {
  localStorage.setItem(KEY, JSON.stringify(progress));
}
