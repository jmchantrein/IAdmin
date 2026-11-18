import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import { satteri } from '@astrojs/markdown-satteri';
import { mechanismsPlugin } from './src/markdown/plugin.ts';

// Le site est servi par GitHub Pages sous https://jmchantrein.github.io/IAdmin/.
export default defineConfig({
  site: 'https://jmchantrein.github.io',
  base: '/IAdmin',
  trailingSlash: 'always',
  integrations: [preact()],
  // Liens vers une brique, notes, schémas : voir src/markdown/mechanisms.ts.
  markdown: { processor: satteri({ mdastPlugins: [mechanismsPlugin] }) },
});
