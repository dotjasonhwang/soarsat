# AstroWind Template - Quick Start Guide

## Setup

```shell
git clone git@github.com-djh:dotjasonhwang/djh-astrowind.git my-website
cd my-website
npm install
```

**Quick Configuration:**

1. Update `src/config.yaml` with your site and business info (single source of truth)
2. Remove unused pages from `src/pages/`
3. Update `src/navigation.ts` to match your pages
4. Replace images in `src/assets/` and `public/`
5. Run `npm run dev` to start development

## Commands

| Command            | Action                                     |
| :----------------- | :----------------------------------------- |
| `npm run dev`      | Start dev server at `localhost:4321`       |
| `npm run test`     | Run unit tests                             |
| `npm run test:e2e` | Run e2e tests                              |
| `npm run check`    | Run all checks (astro + eslint + prettier) |
| `npm run fix`      | Format code with Prettier + ESLint         |

## Testing

```bash
npm run test          # Unit tests (Vitest)
npm run test:e2e      # E2E tests (Playwright, chromium only)
npm run test:e2e:full # E2E tests (all browsers)
npm run test:a11y     # Accessibility tests (axe-core, WCAG 2.2 AA, light + dark modes, 5 pages)
npm run test:all      # Unit + E2E (chromium)
npm run test:ci       # Full suite for CI
```

**Accessibility Testing**: Uses axe-core to automatically scan for 90+ WCAG 2.2 AA violations including color contrast, keyboard navigation, form accessibility, and more.

Tests run automatically on commit/push via git hooks.

## Content Management (Optional)

Access `/decapcms` for Decap CMS interface to edit blog content without code.

Business information is managed in `src/config.yaml` under the `business:` section.

## Deploy

**Netlify (Recommended):**

1. Push code to GitHub
2. Connect repository to Netlify
3. Auto-deploys on every push to main branch
