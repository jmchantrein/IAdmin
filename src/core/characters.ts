/**
 * Character codes: a text is written as numbers, one per character. Only the printable codes
 * of ASCII (32 to 126) are named here; they are the same in every common encoding.
 */

export const PRINTABLE = { min: 32, max: 126 } as const;

/** The character written by `code`, or `null` when no printable character has it. */
export function printableCharacter(code: number): string | null {
  return Number.isInteger(code) && code >= PRINTABLE.min && code <= PRINTABLE.max
    ? String.fromCharCode(code)
    : null;
}
