// Renders diagrams with the site's stylesheet, without building the site:
//   node scripts/apercu-schema.mjs src/content/briques/fr/donnees/bit.etats.svg [...]
// Writes, per diagram, a phone-width dark capture and a desktop light capture
// under test-results/apercus/. Meant for the author of a diagram: look at both.
import { mkdirSync, readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { chromium } from '@playwright/test';

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('usage : node scripts/apercu-schema.mjs <fichier.svg> [...]');
  process.exit(1);
}

const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const out = 'test-results/apercus';
mkdirSync(out, { recursive: true });

const views = [
  { name: 'telephone-sombre', width: 360, colorScheme: 'dark' },
  { name: 'bureau-clair', width: 760, colorScheme: 'light' },
];

const browser = await chromium.launch();
for (const { name, width, colorScheme } of views) {
  const page = await browser.newPage({ viewport: { width, height: 600 }, colorScheme });
  for (const file of files) {
    const svg = readFileSync(file, 'utf8');
    await page.setContent(
      `<style>${css}</style><main><section class="explanation"><figure class="schema">${svg}</figure></section></main>`,
    );
    const path = `${out}/${basename(file, '.svg')}-${name}.png`;
    await page.locator('figure.schema').screenshot({ path });
    console.log(path);
  }
  await page.close();
}
await browser.close();
