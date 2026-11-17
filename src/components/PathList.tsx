import { useProgress } from '../browser/useProgress.ts';
import { isAcquired, statusOf } from '../core/progress.ts';
import { dict, type Lang } from '../i18n/index.ts';

export interface PathBrick {
  id: string;
  titre: string;
  resume: string;
  requiert: string[];
  url: string;
}

interface Props {
  /** Bricks in route order: every prerequisite before the brick that needs it. */
  bricks: PathBrick[];
  lang: Lang;
}

/** Ordered bricks of a path, each with its status derived from the stored progress. */
export function PathList({ bricks, lang }: Props) {
  const t = dict(lang);
  const { progress } = useProgress();
  const acquired = progress ? bricks.filter((brick) => isAcquired(progress, brick.id)).length : 0;
  const nextId = progress && bricks.find((brick) => !isAcquired(progress, brick.id))?.id;

  return (
    <div class="path">
      {progress && (
        <p class="path-progress" role="status" data-testid="path-progress">
          {acquired === bricks.length ? t.path.done : t.path.progress(acquired, bricks.length)}
        </p>
      )}
      <ol class="path-list">
        {bricks.map((brick) => {
          const status = progress ? statusOf(progress, brick.id, brick.requiert) : null;
          return (
            <li data-brick={brick.id} data-status={status}>
              <a href={brick.url}>{brick.titre}</a>
              {status && <span class={`status ${status}`}>{t.status[status]}</span>}
              {brick.id === nextId && <span class="status next">{t.path.next}</span>}
              <p>{brick.resume}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
