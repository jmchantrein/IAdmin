import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { emptyProgress, markValidated } from '../core/progress.ts';
import type { Progress } from '../core/schema.ts';
import { loadProgress, saveProgress } from './storage.ts';

export interface ProgressHandle {
  /** `null` until the browser storage has been read (never read during the static build). */
  progress: Progress | null;
  /** True when the browser refuses storage: progress then lives in memory only. */
  storageFailed: boolean;
  validate: (brickId: string) => void;
  /** Replaces the whole document (import, reset). */
  replace: (next: Progress) => void;
}

export function useProgress(): ProgressHandle {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [storageFailed, setStorageFailed] = useState(false);
  const memory = useRef<Progress>(emptyProgress());

  /** Reads the storage; falls back to the in-memory copy when the browser refuses. */
  const read = useCallback((): Progress => {
    try {
      return loadProgress();
    } catch {
      setStorageFailed(true);
      return memory.current;
    }
  }, []);

  useEffect(() => setProgress(read()), [read]);

  const replace = useCallback((next: Progress) => {
    memory.current = next;
    try {
      saveProgress(next);
    } catch {
      setStorageFailed(true);
    }
    setProgress(next);
  }, []);

  // Re-read first: another tab may have recorded progress meanwhile.
  const validate = useCallback(
    (brickId: string) => replace(markValidated(read(), brickId, new Date())),
    [read, replace],
  );

  return { progress, storageFailed, validate, replace };
}
