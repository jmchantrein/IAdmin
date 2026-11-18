/**
 * Logic gates: each one turns one or two input bits into one output bit.
 * A bit is written `true` for 1 and `false` for 0.
 */

export const GATES = ['non', 'et', 'ou', 'ou-exclusif'] as const;
export type Gate = (typeof GATES)[number];

/** Number of inputs of a gate: `non` reverses a single bit, the others combine two. */
export function gateInputs(gate: Gate): 1 | 2 {
  return gate === 'non' ? 1 : 2;
}

/** Output of `gate` for the given inputs, which must be as many as the gate has. */
export function gateOutput(gate: Gate, inputs: readonly boolean[]): boolean {
  if (inputs.length !== gateInputs(gate)) {
    throw new Error(`la porte « ${gate} » attend ${gateInputs(gate)} entrée(s)`);
  }
  const [a, b] = inputs as [boolean, boolean];
  switch (gate) {
    case 'non':
      return !a;
    case 'et':
      return a && b;
    case 'ou':
      return a || b;
    case 'ou-exclusif':
      return a !== b;
  }
}

/**
 * Number of inputs shared by gates wired on the same inputs, or `null` when they do not
 * agree (`non` with a two-input gate).
 */
export function sharedInputs(gates: readonly Gate[]): 1 | 2 | null {
  const counts = new Set(gates.map(gateInputs));
  return counts.size === 1 ? [...counts][0]! : null;
}

const bit = (on: boolean) => (on ? '1' : '0');

/**
 * State of gates wired on the same inputs: the inputs, a colon, then the output of each gate
 * in order. `10:1` for `et` with A = 1 and B = 0; `11:01` for `ou-exclusif` then `et`.
 */
export function circuitValue(gates: readonly Gate[], inputs: readonly boolean[]): string {
  const outputs = gates.map((gate) => bit(gateOutput(gate, inputs)));
  return `${inputs.map(bit).join('')}:${outputs.join('')}`;
}
