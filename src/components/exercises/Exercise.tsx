import { useEffect, useState } from 'preact/hooks';
import { isNumber, runCheck } from '../../core/check.ts';
import { seededOrder } from '../../core/shuffle.ts';
import type { Exercise as ExerciseData } from '../../core/schema.ts';
import { dict, type Lang } from '../../i18n/index.ts';
import { Widget } from '../Widget.tsx';

interface Props {
  exercise: ExerciseData;
  lang: Lang;
  /** Unique within the page: names the form fields. */
  name: string;
  onSuccess?: () => void;
}

type Feedback = { ok: boolean; text: string } | null;

/** One exercise of any type: collects an answer, checks it, gives feedback. */
export function Exercise({ exercise, lang, name, onSuccess }: Props) {
  const t = dict(lang).exercises;
  const [widgetValue, setWidgetValue] = useState('');
  // The button works only once this script runs: a click before that would make the
  // browser submit the form itself and reload the page.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [feedback, setFeedback] = useState<Feedback>(null);

  // A numeric check only reads digits: say so, or "huit" is refused without a reason.
  const lastStep = exercise.type === 'saisie' ? exercise.verif.at(-1) : undefined;
  const expectsNumber = typeof lastStep === 'object' && 'nombre' in lastStep;
  const answerHint = expectsNumber ? t.answerNumber : t.answer;

  const judge = (answer: string): Feedback => {
    if (exercise.type === 'choix') {
      const option = exercise.options[Number(answer)];
      if (answer === '' || !option) return { ok: false, text: t.choose };
      // The schema guarantees a `retour` on every wrong option.
      return option.correct
        ? { ok: true, text: t.correct }
        : { ok: false, text: option.retour ?? '' };
    }
    // "3 bits" may be right: ask for the number alone rather than calling the value wrong.
    if (expectsNumber && !isNumber(answer)) return { ok: false, text: t.numberOnly };
    return runCheck(exercise.verif, answer)
      ? { ok: true, text: t.correct }
      : { ok: false, text: exercise.retour };
  };

  const submit = (event: Event) => {
    event.preventDefault();
    // Fields are left to the browser and read here: an answer given before this script was
    // ready stays in its field and is judged like any other.
    const given =
      exercise.type === 'widget'
        ? widgetValue
        : String(new FormData(event.currentTarget as HTMLFormElement).get(name) ?? '');
    const result = judge(given);
    setFeedback(result);
    if (result?.ok) onSuccess?.();
  };

  const changeWidget = (value: string) => {
    setWidgetValue(value);
    setFeedback(null);
  };

  return (
    <form class="exercise" onSubmit={submit} data-type={exercise.type}>
      <p class="consigne">{exercise.consigne}</p>
      {exercise.type === 'choix' && (
        <ul class="options">
          {/* Shown in an order of their own: the author's first option is often the right one. */}
          {seededOrder(exercise.options.length, exercise.consigne).map((i) => (
            <li>
              <label>
                <input type="radio" name={name} value={i} onChange={() => setFeedback(null)} />
                <span>{exercise.options[i]!.texte}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
      {exercise.type === 'saisie' && (
        <input
          type="text"
          name={name}
          aria-label={answerHint}
          placeholder={answerHint}
          inputMode={expectsNumber ? 'decimal' : 'text'}
          autocomplete="off"
          onInput={() => setFeedback(null)}
        />
      )}
      {exercise.type === 'widget' && (
        <Widget
          widget={exercise.widget}
          params={exercise.params}
          lang={lang}
          onChange={changeWidget}
        />
      )}
      <div class="exercise-footer">
        <button type="submit" disabled={!ready}>
          {t.submit}
        </button>
        <p class={`feedback ${feedback ? (feedback.ok ? 'ok' : 'ko') : ''}`} role="status">
          {feedback?.text}
        </p>
      </div>
    </form>
  );
}
