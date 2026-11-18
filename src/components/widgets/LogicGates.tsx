import { useEffect, useState } from 'preact/hooks';
import { circuitValue, gateOutput, sharedInputs } from '../../core/logic.ts';
import type { WidgetProps } from './index.ts';

/**
 * One or two logic gates wired on the same inputs: a switch per input, a lamp per gate.
 * Value: the inputs, a colon, then the output of each gate, e.g. "10:1".
 */
export function LogicGates({ params, onChange, t }: WidgetProps<'porte'>) {
  const text = t.widgets.gate;
  // The schema guarantees that the gates agree on their number of inputs.
  const count = sharedInputs(params.portes) ?? 1;
  const [inputs, setInputs] = useState<boolean[]>(() => Array<boolean>(count).fill(false));
  const value = circuitValue(params.portes, inputs);
  // Rows of the truth table in the order they were found, the starting one included.
  const [rows, setRows] = useState<readonly string[]>(() => [value]);
  const total = 2 ** count;

  useEffect(() => {
    onChange?.(value);
    setRows((previous) => (previous.includes(value) ? previous : [...previous, value]));
  }, [value]);

  const toggle = (index: number) => setInputs(inputs.map((on, i) => (i === index ? !on : on)));

  return (
    <div class="widget gates">
      <div class="bits-row" style={{ '--bits': count }}>
        {inputs.map((on, i) => (
          <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-label={text.input(text.inputs[i]!)}
            class="bit"
            onClick={() => toggle(i)}
          >
            <span class="input-name" aria-hidden="true">
              {text.inputs[i]}
            </span>
            <span class="lamp" aria-hidden="true" />
            <span class="digit">{on ? '1' : '0'}</span>
          </button>
        ))}
      </div>
      <ul class="gates-outputs" aria-live="polite">
        {params.portes.map((gate) => {
          const on = gateOutput(gate, inputs);
          return (
            <li class={on ? 'on' : ''} data-testid="gate-output">
              <span class="gate-name">{text.names[gate]}</span>
              <span class="lamp" aria-hidden="true" />
              <span class="digit">
                <span class="sr-only">{text.output}&nbsp;: </span>
                {on ? '1' : '0'}
                <span class="sr-only">, {on ? text.lampOn : text.lampOff}</span>
              </span>
            </li>
          );
        })}
      </ul>
      {params.table && (
        // Only what has been found is listed: the total stays for the learner to discover.
        <div class="gates-table">
          <table>
            <caption>{text.tableCaption}</caption>
            <thead>
              <tr>
                {inputs.map((_, i) => (
                  <th scope="col">{text.inputs[i]}</th>
                ))}
                {params.portes.map((gate, i) => (
                  <th scope="col" class={i === 0 ? 'divider' : ''}>
                    {text.names[gate]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const [ins = '', outs = ''] = row.split(':');
                return (
                  <tr>
                    {[...ins].map((bit) => (
                      <td>{bit}</td>
                    ))}
                    {[...outs].map((bit, i) => (
                      <td class={i === 0 ? 'divider' : ''}>{bit}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p aria-live="polite" data-testid="gate-found">
            {rows.length === total ? text.complete(total) : text.found(rows.length)}
          </p>
        </div>
      )}
    </div>
  );
}
