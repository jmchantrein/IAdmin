/**
 * A short fingerprint of a text: five decimal digits, from 00000 to 65535.
 * The same text always gives the same fingerprint, whatever its length; changing one
 * character gives a fingerprint that looks unrelated. Not meant for security: 65 536
 * fingerprints are few, and two texts often share one.
 */

export const FINGERPRINT_DIGITS = 5;

/**
 * FNV-1a over the UTF-8 bytes of the text, then the final mix of MurmurHash3 so that every
 * input bit moves about half of the output bits, folded to 16 bits. `Math.imul` and `>>> 0`
 * keep the 32-bit arithmetic exact in every JavaScript engine.
 */
export function fingerprint(text: string): string {
  let hash = 0x811c9dc5;
  for (const byte of new TextEncoder().encode(text)) {
    hash = Math.imul(hash ^ byte, 0x01000193);
  }
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x85ebca6b);
  hash ^= hash >>> 13;
  hash = Math.imul(hash, 0xc2b2ae35);
  hash ^= hash >>> 16;
  const folded = ((hash >>> 16) ^ hash) & 0xffff;
  return String(folded).padStart(FINGERPRINT_DIGITS, '0');
}
