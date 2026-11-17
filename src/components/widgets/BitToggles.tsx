import { useEffect, useState } from 'preact/hooks';
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

  return (
    <div class="widget bits">
      <div class="bits-row">
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
          </button>
        ))}
      </div>
      <p class="widget-value">
        {t.widgets.bits.value} : <output data-testid="bits-value">{value}</output>
      </p>
      {params.suivi && (
        <div class="bits-tracker">
          <ul aria-hidden="true">
            {Array.from({ length: total }, (_, n) => n.toString(2).padStart(params.bits, '0')).map(
              (combination) => (
                <li class={seen.has(combination) ? 'found' : ''}>
                  {seen.has(combination) ? combination : '?'.repeat(params.bits)}
                </li>
              ),
            )}
          </ul>
          <p aria-live="polite">
            {t.widgets.bits.found(seen.size, total)}
            {seen.size === total && <strong> {t.widgets.bits.complete}</strong>}
          </p>
        </div>
      )}
    </div>
  );
}
