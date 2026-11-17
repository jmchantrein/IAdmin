import { emptyProgress, parseProgress } from '../core/progress.ts';
import type { Progress } from '../core/schema.ts';

const KEY = 'iadmin:progression';
const UNREADABLE_KEY = `${KEY}:illisible`;

/**
 * Reads the stored progress. Unreadable data is moved aside under another key, never
 * silently dropped, and the learner starts from an empty document.
 */
export function loadProgress(): Progress {
  const raw = localStorage.getItem(KEY);
  if (raw === null) return emptyProgress();
  try {
    return parseProgress(JSON.parse(raw));
  } catch (error) {
    // Moved, not copied: the next load starts clean and the copy is set aside only once.
    localStorage.setItem(UNREADABLE_KEY, raw);
    localStorage.removeItem(KEY);
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

/** Raw text of a progress that could not be read, kept aside by `loadProgress`, if any. */
export function unreadableCopy(): string | null {
  return localStorage.getItem(UNREADABLE_KEY);
}

export function discardUnreadableCopy(): void {
  localStorage.removeItem(UNREADABLE_KEY);
}
