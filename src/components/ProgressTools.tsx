import { useEffect, useState } from 'preact/hooks';
import { discardUnreadableCopy, unreadableCopy } from '../browser/storage.ts';
import { useProgress } from '../browser/useProgress.ts';
import { emptyProgress, exportProgress, mergeProgress, parseProgress } from '../core/progress.ts';
import { dict, type Lang } from '../i18n/index.ts';

interface Props {
  lang: Lang;
}

/** Hands a text to the browser as a file to save. */
function download(name: string, text: string): void {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  const link = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/** Export, import and reset of the progress stored in this browser. */
export function ProgressTools({ lang }: Props) {
  const t = dict(lang);
  const { progress, storageFailed, replace } = useProgress();
  // The outcome is shown inside the section that produced it.
  const [message, setMessage] = useState<{
    from: 'import' | 'reset';
    ok: boolean;
    text: string;
  } | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [unreadable, setUnreadable] = useState<string | null>(null);

  useEffect(() => {
    try {
      setUnreadable(unreadableCopy());
    } catch {
      // Storage refused: the hook already reports it.
    }
  }, [progress]);

  if (progress === null) return null;

  const states = Object.values(progress.briques).map((brick) => brick.etat);
  const validated = states.filter((state) => state === 'validee').length;

  const exportFile = () => {
    const now = new Date();
    const text = JSON.stringify(exportProgress(progress, now), null, 2);
    download(`iadmin-progression-${now.toISOString().slice(0, 10)}.json`, text);
  };

  const importFile = async (input: HTMLInputElement) => {
    const file = input.files?.[0];
    if (!file) return;
    let data: unknown;
    try {
      data = JSON.parse(await file.text());
    } catch {
      setMessage({ from: 'import', ok: false, text: t.progress.notJson });
      return;
    } finally {
      // Lets the learner pick the same file again.
      input.value = '';
    }
    let imported;
    try {
      imported = parseProgress(data);
    } catch {
      setMessage({ from: 'import', ok: false, text: t.progress.notProgress });
      return;
    }
    const merged = mergeProgress(progress, imported);
    replace(merged.progress);
    setMessage({
      from: 'import',
      ok: true,
      text: t.progress.imported(merged.added, merged.upgraded, merged.known),
    });
  };

  const reset = () => {
    replace(emptyProgress());
    setConfirming(false);
    setMessage({ from: 'reset', ok: true, text: t.progress.resetDone });
  };

  const outcome = (from: 'import' | 'reset') => (
    <p class={`feedback ${message?.from === from ? (message.ok ? 'ok' : 'ko') : ''}`} role="status">
      {message?.from === from ? message.text : ''}
    </p>
  );

  return (
    <div class="progress-tools">
      <p class="lead" data-testid="progress-summary">
        {states.length === 0
          ? t.progress.empty
          : t.progress.summary(validated, states.length - validated)}
      </p>
      {storageFailed && <p class="notice warning">{t.exercises.storageError}</p>}
      {unreadable !== null && (
        <div class="tool warning" data-testid="unreadable">
          <p>{t.progress.unreadable}</p>
          <button
            type="button"
            class="secondary"
            onClick={() => download('iadmin-progression-illisible.txt', unreadable)}
          >
            {t.progress.unreadableDownload}
          </button>{' '}
          <button
            type="button"
            class="secondary"
            onClick={() => {
              discardUnreadableCopy();
              setUnreadable(null);
            }}
          >
            {t.progress.unreadableDiscard}
          </button>
        </div>
      )}

      <section class="tool">
        <h2>{t.progress.exportHeading}</h2>
        <p>{t.progress.exportHelp}</p>
        <button type="button" onClick={exportFile}>
          {t.progress.exportButton}
        </button>
      </section>

      <section class="tool">
        <h2>{t.progress.importHeading}</h2>
        <p>{t.progress.importHelp}</p>
        <label>
          <span>{t.progress.importLabel}</span>
          <input
            type="file"
            accept="application/json,.json"
            onChange={(event) => importFile(event.currentTarget)}
          />
        </label>
        {outcome('import')}
      </section>

      <section class="tool">
        <h2>{t.progress.resetHeading}</h2>
        <p>{t.progress.resetHelp}</p>
        {confirming ? (
          <>
            <button type="button" class="danger" onClick={reset}>
              {t.progress.resetConfirm}
            </button>{' '}
            <button type="button" class="secondary" onClick={() => setConfirming(false)}>
              {t.progress.resetCancel}
            </button>
          </>
        ) : (
          <button type="button" class="secondary" onClick={() => setConfirming(true)}>
            {t.progress.resetButton}
          </button>
        )}
        {outcome('reset')}
      </section>
    </div>
  );
}
