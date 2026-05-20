# djh-astrowind

## Overview

AstroWind business website template built with Astro 5 & Tailwind 4. Optimized for performance with hybrid CSS architecture using Tailwind CSS v4.

## TODOs

- New Components
  - HoverLink/Tooltip: Interactive text hover component
  - BusinessHours (2 modes: footer, contact page. Maybe 2 separate components. But they both access same client business hours data)
- EmbeddedMap improvements
- Increase test coverage
- Edit website principles, and harden using website principles
- Change blog post image to not copy alt text of title, should be defined alt text
  - Run WAVE
- axe-core has false positives. look into alternative tools, or set up custom suite

## Architecture

- **Framework**: Astro 5.x with static output
- **Styling**: Tailwind CSS v4 with custom CSS integration
- **Testing**: Vitest for unit tests, Playwright for E2E
- **Build**: Vite with custom optimizations
- **Deployment**: SSG for Netlify

### Configuration Files

- `src/config.yaml` - Site configuration + business data (single source of truth)
- `public/decapcms/config.yml` - Decap CMS configuration (blog editing only)
- `src/types.d.ts` - TypeScript definitions
- `astro.config.ts` - Astro configuration with custom integrations
- `vitest.config.ts` - Test configuration (requires Vite override)

### Content Management

- **Decap CMS**: Available at `/decapcms` for blog post editing
- **Business Data**: Managed in `src/config.yaml` under the `business:` section
- **Site Config**: All site settings in `src/config.yaml` (no separate client.json)

## Design Principles

Reference the Principles in [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md)

## Development Preferences

- **Code Style**: 2-space indentation, Prettier formatting
- **TypeScript**: Strict mode enabled, prefer explicit types
- **Testing**: Unit tests (Vitest), E2E tests (Playwright), Accessibility tests using axe-core only (automated WCAG 2.2 AA scanning), maintain high coverage
- **Accessibility**: Target WCAG 2.2 AA compliance (4.5:1 contrast for normal text, 3:1 for large text). Automated testing via axe-core scans 90+ accessibility rules including color contrast, keyboard navigation, form accessibility, heading structure, and ARIA implementation. Tests run in both light and dark modes. AAA is aspirational but not enforced.
  - Use Figma Color Contrast Checker to pick better contrast colors: https://www.figma.com/color-contrast-checker/
- **Commits**: Use conventional commits with pre-commit hooks

### Formatter Configuration

- Astro files: `astro-build.astro-vscode`
- TypeScript files: `esbenp.prettier-vscode`
- All files use 2-space indentation

## Important Notes

- **Vite Override**: Added `"vite": "6.0.2"` override in `package.json` to fix Vitest+Vite 6 compatibility issues with `vitest.config.ts`. See [astro/issues/12662](https://github.com/withastro/astro/issues/12662)
  - Don't remove the Vite override without testing vitest.config.ts

### Commands

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm test` - Run unit tests (Vitest)
- `npm run test:e2e` - Run E2E tests (Playwright, chromium only - fast)
- `npm run test:e2e:full` - Run E2E tests on all browsers (chromium, firefox, webkit, mobile)
- `npm run test:a11y` - Run accessibility tests (Playwright + axe-core WCAG 2.2 AA scans, chromium only)
- `npm run test:all` - Run unit tests + E2E tests (chromium only)
- `npm run test:ci` - Full test suite for CI (check + unit + E2E all browsers)
- `npm run check` - Run all checks (astro + eslint + prettier)
- `npm run fix` - Auto-fix ESLint and Prettier issues

### Configuration

- ESLint uses flat config format (v9+)
- Pre-commit hooks validate tests and build
- All TypeScript files should use Prettier formatting
