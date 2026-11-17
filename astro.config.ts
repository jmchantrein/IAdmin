import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// Le site est servi par GitHub Pages sous https://jmchantrein.github.io/IAdmin/.
export default defineConfig({
  site: 'https://jmchantrein.github.io',
  base: '/IAdmin',
  trailingSlash: 'always',
  integrations: [preact()],
});
