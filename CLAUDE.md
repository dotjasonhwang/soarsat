# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

## Commands

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm test` - Run unit tests (Vitest)
- `npm run test:watch` - Unit tests in watch mode
- `npm run test:coverage` - Unit test coverage report
- `npm run test:e2e` - E2E tests (Playwright, chromium only - fast)
- `npm run test:e2e:full` - E2E tests on all browsers (chromium, firefox, webkit, mobile)
- `npm run test:a11y` - Accessibility tests (Playwright + axe-core WCAG 2.2 AA scans, chromium only)
- `npm run test:all` - Unit tests + E2E tests (chromium only)
- `npm run test:ci` - Full test suite for CI (check + unit + E2E all browsers)
- `npm run check` - Run all checks (astro + eslint + prettier)
- `npm run fix` - Auto-fix ESLint and Prettier issues

### Running a single test

```bash
# Single unit test file
npx vitest run src/utils/utils.test.ts

# Single E2E test file
npx playwright test tests/e2e/homepage.spec.ts --project=chromium

# Single E2E test by name
npx playwright test --grep "test name" tests/e2e/homepage.spec.ts
```

## Architecture

- **Framework**: Astro 5.x with static output (SSG for Netlify)
- **Styling**: Tailwind CSS v4 with design tokens via `@theme` directive in `src/assets/styles/tailwind.css`
- **Testing**: Vitest (unit, co-located), Playwright (E2E + accessibility in `tests/e2e/`)
- **Path alias**: `~` → `./src` for clean imports

### Configuration Files

- `src/config.yaml` - Site configuration + business data (single source of truth)
- `public/decapcms/config.yml` - Decap CMS configuration (blog editing only)
- `src/types.d.ts` - TypeScript definitions for all shared types (Post, Widget, CallToAction, etc.)
- `astro.config.ts` - Astro configuration with custom integrations
- `vitest.config.ts` - Test configuration (requires Vite override)

### Component Architecture

Components are organized by abstraction level:

- `src/components/widgets/` - Full page sections (Hero, Header, Footer, Features, Pricing, Contact, EmbeddedMap, etc.)
- `src/components/ui/` - Primitive building blocks (Button, Form, Headline, ItemGrid, Timeline, etc.)
- `src/components/common/` - Meta/infrastructure (Metadata, Schema, Analytics, Image, ToggleTheme, etc.)
- `src/components/blog/` - Blog-specific display components

### Layouts

- `src/layouts/Layout.astro` - Root layout with metadata and global structure
- `src/layouts/PageLayout.astro` - Standard page wrapper (Header + Footer)
- `src/layouts/MarkdownLayout.astro` - For `.md` content files

### Content Collections

Blog posts live in `src/content/post/` as MDX/Markdown files. The collection schema is defined in `src/content/config.ts`. Blog utilities (pagination, taxonomy, related posts) are in `src/utils/blog.ts`.

### Custom Vendor Integration

`vendor/integration/` contains a custom Astro integration (`astrowind()`) that loads `src/config.yaml` and makes it available site-wide. This runs at build time and injects config into the Astro environment.

### Content Management

- **Decap CMS**: Available at `/decapcms` for blog post editing
- **Business Data**: Managed in `src/config.yaml` under the `business:` section
- **Site Config**: All site settings in `src/config.yaml` (no separate client.json)

## Design Principles

Reference `PRINCIPLES/WEBSITE_PRINCIPLES.md` for design rules covering typography, color, spacing, layout, navigation, and content standards. Key constraint: **Astro-only, no React components**.

## Development Preferences

- **Code Style**: 2-space indentation, Prettier formatting
- **TypeScript**: Strict mode enabled, prefer explicit types
- **Accessibility**: WCAG 2.2 AA (4.5:1 contrast normal text, 3:1 large text). Tests run in light and dark modes against 5 key pages. AAA aspirational.
  - Use Figma Color Contrast Checker: https://www.figma.com/color-contrast-checker/
- **Commits**: Conventional commits with pre-commit hooks (husky + lint-staged)

## Important Notes

- **Vite Override**: `"vite": "6.0.2"` in `package.json` overrides to fix Vitest+Vite 6 compatibility with `vitest.config.ts`. See [astro/issues/12662](https://github.com/withastro/astro/issues/12662). Don't remove without testing vitest.
- **ESLint**: Uses flat config format (v9+)
- **CI**: `.github/workflows/actions.yaml` is temporarily disabled (`if: false`)
