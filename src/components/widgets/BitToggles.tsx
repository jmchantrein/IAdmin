import { useEffect, useState } from 'preact/hooks';
import { printableCharacter } from '../../core/characters.ts';
import type { WidgetProps } from './index.ts';

/** Row of switches, one per bit. Value: the bit string, e.g. "101". */
export function BitToggles({ params, onChange, t }: WidgetProps<'bascule-bits'>) {
  const [bits, setBits] = useState<boolean[]>(() => Array<boolean>(params.bits).fill(false));
  const [seen, setSeen] = useState<ReadonlySet<string>>(new Set());
  const value = bits.map((on) => (on ? '1' : '0')).join('');
  const total = 2 ** params.bits;

  useEffect(() => {
    onChange?.(value);
    setSeen((previous) => (previous.has(value) ? previous : new Set(previous).add(value)));
  }, [value]);

  const toggle = (index: number) => setBits(bits.map((on, i) => (i === index ? !on : on)));

  // Weight of each bit, the rightmost one weighing 1.
  const weights = bits.map((_, i) => 2 ** (params.bits - 1 - i));
  const lit = weights.filter((_, i) => bits[i]);
  const sum = lit.reduce((a, b) => a + b, 0);

  return (
    <div class="widget bits">
      <div class="bits-row" style={{ '--bits': params.bits }}>
        {bits.map((on, i) => (
          <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-label={t.widgets.bits.toggle(i + 1)}
            class="bit"
            onClick={() => toggle(i)}
          >
            <span class="lamp" aria-hidden="true" />
            <span class="digit">{on ? '1' : '0'}</span>
            {params.poids && (
              <span class="weight">
                <span class="sr-only">{t.widgets.bits.weightLabel} </span>
                {weights[i]}
              </span>
            )}
          </button>
        ))}
      </div>
      {params.poids && <p class="widget-hint">{t.widgets.bits.weightHint}</p>}
      <p class="widget-value">
        {t.widgets.bits.value}&nbsp;: <output data-testid="bits-value">{value}</output>
      </p>
      {params.poids && (
        <p class="widget-value" aria-live="polite">
          {t.widgets.bits.total}&nbsp;:{' '}
          <output data-testid="bits-total">
            {lit.length > 1 ? `${lit.join(' + ')} = ${sum}` : sum}
          </output>
        </p>
      )}
      {params.caractere && <Character code={parseInt(value, 2)} t={t} />}
      {params.suivi && (
        // Only what has been found is listed: the total stays for the learner to discover.
        <div class="bits-tracker">
          <ul aria-hidden="true">
            {[...seen].sort().map((combination) => (
              <li class="found">{combination}</li>
            ))}
          </ul>
          <p aria-live="polite" data-testid="bits-found">
            {seen.size === total ? t.widgets.bits.complete(total) : t.widgets.bits.found(seen.size)}
          </p>
        </div>
      )}
    </div>
  );
}

/** The character whose code the bits write, read in binary. */
function Character({ code, t }: { code: number; t: WidgetProps<'bascule-bits'>['t'] }) {
  const text = t.widgets.bits;
  const character = printableCharacter(code);
  return (
    <p class="widget-value" aria-live="polite">
      {character === null ? (
        <output data-testid="bits-character">{text.noCharacter(code)}</output>
      ) : (
        <>
          {text.character}&nbsp;:{' '}
          <output data-testid="bits-character" class={character === ' ' ? '' : 'character'}>
            {character === ' ' ? text.space : character}
          </output>
        </>
      )}
    </p>
  );
}
