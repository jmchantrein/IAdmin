import { useEffect, useState } from 'preact/hooks';
import type { WidgetProps } from './index.ts';

/**
 * Step-by-step animation declared in the brick. The learner sets the pace, forward and
 * backward; each step changes one thing and its caption sits right under the cells.
 * Value: the number of the current step, starting at 1.
 */
export function Stepper({ params, onChange, t }: WidgetProps<'pas-a-pas'>) {
  const text = t.widgets.steps;
  const [index, setIndex] = useState(0);
  const total = params.etapes.length;
  const step = params.etapes[index]!;

  useEffect(() => onChange?.(String(index + 1)), [index]);

  return (
    <div class="widget steps">
      <ol
        class={`steps-cells ${params.colonnes ? 'grid' : ''}`}
        style={params.colonnes ? { '--colonnes': params.colonnes } : undefined}
      >
        {step.cases.map((cell, i) => {
          const active = step.actifs.includes(i);
          const out = step.ecartes.includes(i);
          const label = step.etiquettes[String(i)];
          // An empty cell only holds a place, to align rows of different lengths.
          const empty = cell === '' && !label;
          return (
            <li
              class={`${active ? 'active' : ''} ${out ? 'out' : ''} ${cell === '' ? 'empty' : ''}`}
              aria-hidden={empty || undefined}
            >
              <span class="cell">{cell}</span>
              <span class="cell-label">{label ?? ''}</span>
              {/* What the colours show, for readers who do not see them. */}
              <span class="sr-only">
                {out ? text.out : ''} {active && !label ? text.active : ''}
              </span>
            </li>
          );
        })}
      </ol>
      <p class="steps-caption" aria-live="polite" data-testid="steps-caption">
        {step.legende}
      </p>
      <div class="steps-controls">
        <button
          type="button"
          class="secondary"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
        >
          {text.previous}
        </button>
        <span class="steps-position" data-testid="steps-position">
          {text.position(index + 1, total)}
        </span>
        <button type="button" disabled={index === total - 1} onClick={() => setIndex(index + 1)}>
          {text.next}
        </button>
      </div>
    </div>
  );
}
