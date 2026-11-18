import { useEffect, useRef, useState } from 'preact/hooks';
import { fingerprint } from '../../core/fingerprint.ts';
import type { WidgetProps } from './index.ts';

const MAX_LENGTH = 40;

/**
 * One or two text fields, each with its fingerprint updated at every keystroke.
 * Value: `texte=empreinte` per field, separated by a space, e.g. "chat=30917 chas=00705".
 */
export function Fingerprint({ params, onChange, t }: WidgetProps<'empreinte'>) {
  const text = t.widgets.fingerprint;
  const [texts, setTexts] = useState<string[]>(params.textes);
  const fields = useRef<(HTMLInputElement | null)[]>([]);
  const prints = texts.map(fingerprint);
  const value = texts.map((typed, i) => `${typed}=${prints[i]}`).join(' ');

  // The fields are left to the browser: a text typed before this script ran stays in its
  // field, and is read here once the island is live.
  useEffect(() => setTexts(fields.current.map((field, i) => field?.value ?? texts[i]!)), []);
  useEffect(() => onChange?.(value), [value]);

  const type = (index: number, typed: string) =>
    setTexts((previous) => previous.map((old, i) => (i === index ? typed : old)));

  return (
    <div class="widget fingerprint">
      {params.textes.map((initial, i) => (
        <div class="fingerprint-row">
          <label>
            <span class="fingerprint-label">{text.text(i + 1, params.textes.length)}</span>
            <input
              type="text"
              ref={(field) => {
                fields.current[i] = field;
              }}
              defaultValue={initial}
              maxLength={MAX_LENGTH}
              autocomplete="off"
              spellcheck={false}
              onInput={(event) => type(i, event.currentTarget.value)}
            />
          </label>
          <p class="widget-value">
            {text.fingerprint}&nbsp;:{' '}
            <output class="fingerprint-value" data-testid="fingerprint">
              {prints[i]}
            </output>
          </p>
        </div>
      ))}
      {prints.length === 2 && (
        <p class="fingerprint-compare" aria-live="polite" data-testid="fingerprint-compare">
          {prints[0] === prints[1] ? text.same : text.different}
        </p>
      )}
    </div>
  );
}
