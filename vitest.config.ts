/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '.astro/',
        'coverage/',
        '**/*.config.*',
        '**/*.d.ts',
        'public/',
        'tests/e2e/**',
      ],
    },
    include: ['src/**/*.{test,spec}.{js,ts}'],
    exclude: [
      'node_modules/',
      'dist/',
      '.astro/',
      'coverage/',
      'tests/e2e/**',
      'playwright.config.ts',
      '**/*.e2e.{test,spec}.{js,ts}',
    ],
  },
});
