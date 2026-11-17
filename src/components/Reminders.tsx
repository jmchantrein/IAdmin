import { useState } from 'preact/hooks';
import { useProgress } from '../browser/useProgress.ts';
import { isAcquired } from '../core/progress.ts';
import type { Exercise as ExerciseData } from '../core/schema.ts';
import { dict, type Lang } from '../i18n/index.ts';
import { Exercise } from './exercises/Exercise.tsx';

export interface Prerequisite {
  id: string;
  titre: string;
  /** The single reminder text of the notion, declared once in its own brick. */
  resume: string;
  url: string;
  /** A quick exercise of that brick, offered as "test me". */
  exercise: ExerciseData | null;
}

interface Props {
  prerequisites: Prerequisite[];
  lang: Lang;
}

/**
 * Direct prerequisites of a brick: a reminder when the notion is acquired, an invitation to
 * see it first otherwise. Never blocks.
 */
export function Reminders({ prerequisites, lang }: Props) {
  const t = dict(lang).reminders;
  const { progress } = useProgress();
  const [testing, setTesting] = useState<ReadonlySet<string>>(new Set());

  return (
    <ul class="reminders">
      {prerequisites.map((prerequisite) => {
        const acquired = progress !== null && isAcquired(progress, prerequisite.id);
        return (
          <li class={acquired ? 'acquired' : 'missing'} data-brick={prerequisite.id}>
            <details open={!acquired}>
              <summary>
                <span class="tag">{acquired ? t.recall : t.first}</span> {prerequisite.titre}
              </summary>
              <p>{prerequisite.resume}</p>
              <p class="reminder-actions">
                <a href={prerequisite.url}>{t.open}</a>
                {acquired && prerequisite.exercise && !testing.has(prerequisite.id) && (
                  <button
                    type="button"
                    class="secondary"
                    onClick={() => setTesting(new Set(testing).add(prerequisite.id))}
                  >
                    {t.testMe}
                  </button>
                )}
              </p>
              {testing.has(prerequisite.id) && prerequisite.exercise && (
                <Exercise
                  exercise={prerequisite.exercise}
                  lang={lang}
                  name={`rappel-${prerequisite.id}`}
                />
              )}
            </details>
          </li>
        );
      })}
    </ul>
  );
}
