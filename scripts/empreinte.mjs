// Prints the fingerprint of each text, as the `empreinte` widget shows it:
//   node scripts/empreinte.mjs "chat" "chas"
// Meant for the author of a brick, to write the `solution` of an exercise.
import { fingerprint } from '../src/core/fingerprint.ts';

const texts = process.argv.slice(2);
if (texts.length === 0) {
  console.error('usage : node scripts/empreinte.mjs "<texte>" [...]');
  process.exit(1);
}
for (const text of texts) console.log(`${text}=${fingerprint(text)}`);
