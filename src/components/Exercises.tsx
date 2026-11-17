import { useEffect, useState } from 'preact/hooks';
import { useProgress } from '../browser/useProgress.ts';
import { isAcquired } from '../core/progress.ts';
import type { Exercise as ExerciseData } from '../core/schema.ts';
import { dict, type Lang } from '../i18n/index.ts';
import { Exercise } from './exercises/Exercise.tsx';

interface Link {
  titre: string;
  url: string;
}

interface Props {
  brickId: string;
  exercises: ExerciseData[];
  lang: Lang;
  /** Bricks that require this one, offered once it is validated. */
  next: Link[];
}

/** The exercises of a brick. The brick is validated once every exercise has succeeded. */
export function Exercises({ brickId, exercises, lang, next }: Props) {
  const t = dict(lang).exercises;
  const { progress, storageFailed, validate } = useProgress();
  const [solved, setSolved] = useState<ReadonlySet<number>>(new Set());
  const complete = solved.size === exercises.length;
  const alreadyValidated = progress !== null && isAcquired(progress, brickId) && !complete;

  useEffect(() => {
    if (complete) validate(brickId);
  }, [complete]);

  return (
    <div class="exercises">
      {alreadyValidated && <p class="notice">{t.alreadyValidated}</p>}
      <ol>
        {exercises.map((exercise, i) => (
          <li class={solved.has(i) ? 'solved' : ''}>
            <h3>{t.number(i + 1)}</h3>
            <Exercise
              exercise={exercise}
              lang={lang}
              name={`exercice-${i}`}
              onSuccess={() => setSolved((previous) => new Set(previous).add(i))}
            />
          </li>
        ))}
      </ol>
      <p class="exercises-progress" role="status" data-testid="exercises-progress">
        {t.progress(solved.size, exercises.length)}
      </p>
      {storageFailed && <p class="notice warning">{t.storageError}</p>}
      {complete && (
        <div class="validated" data-testid="brick-validated">
          <p>
            <strong>{t.validated}</strong>
          </p>
          {next.length > 0 && (
            <>
              <p>{t.continue} :</p>
              <ul>
                {next.map((link) => (
                  <li>
                    <a href={link.url}>{link.titre}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
