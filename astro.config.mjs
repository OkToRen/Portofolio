// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Fonts are downloaded at build time and served from this site, preloaded,
// with metric-matched fallbacks so text doesn't shift when they swap in.
const google = fontProviders.google();

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: google,
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      weights: ['300 600'],
      styles: ['normal'],
      fallbacks: ['Georgia', 'serif'],
      options: { experimental: { variableAxis: { opsz: [['9', '144']] } } },
    },
    {
      provider: google,
      name: 'Inter Tight',
      cssVariable: '--font-inter-tight',
      weights: ['400 700'],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: google,
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: ['400 500'],
      styles: ['normal'],
      fallbacks: ['Consolas', 'monospace'],
    },
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
