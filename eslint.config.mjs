import js from '@eslint/js';
import next from 'eslint-config-next';

export default [
  // Ignore build artifacts
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**'],
  },

  // Base JS recommendations
  js.configs.recommended,

  // Next.js rules (Core Web Vitals etc.)
  ...next,
];
