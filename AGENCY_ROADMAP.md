# Agency Template Development Roadmap

## Phase 1: Clean Up & Operationalize (Do First)

### 1.1 Make this a GitHub Template Repository

- [ ] Go to repo Settings → check "Template repository"
- [ ] Test by creating a new repo from template

### 1.2 Create Client Onboarding Script

- [ ] Create `scripts/setup-client.sh` or `scripts/setup-client.ts`
- [ ] Script prompts for: business name, phone, email, address, primary color
- [ ] Script updates `src/config.yaml` with client values
- [ ] Script handles any hardcoded references

### 1.3 Clean Up Unused Files & Bloat

- [ ] Audit `src/pages/` - remove demo/example pages not needed
- [ ] Audit `src/components/` - identify unused components
- [ ] Remove commented-out code blocks
- [ ] Review `public/` for unused assets

### 1.4 Fix Known Issues (from CLAUDE.md TODOs)

- [ ] Blog post image alt text - should be defined, not copied from title
- [ ] Run WAVE accessibility checker and fix issues

---

## Phase 2: Complete Core Components

### 2.1 BusinessHours Component

- [ ] Create `src/components/widgets/BusinessHours.astro`
- [ ] Two modes: footer (compact) and contact page (detailed)
- [ ] Pull data from `src/config.yaml` business hours section
- [ ] Handle: closed days, holiday hours

### 2.2 HoverLink/Tooltip Component

- [ ] Create interactive text hover component
- [ ] Accessible (keyboard navigable, screen reader friendly)

### 2.3 EmbeddedMap Improvements

- [ ] Add loading state / placeholder
- [ ] Lazy load iframe for performance

### 2.4 Form Improvements

- [ ] Add form validation feedback
- [ ] Success/error states after submission

---

## Phase 3: Documentation & Client Experience

### 3.1 Client Admin Guide

- [ ] Document CMS usage for clients
- [ ] How to edit content, add blog posts, update images
- [ ] Common troubleshooting

### 3.2 Developer Documentation

- [ ] Document component API/props
- [ ] Document theming/customization approach

---

## Phase 4: Test Coverage

### 4.1 Add Missing E2E Tests

- [ ] Blog listing and individual post pages
- [ ] Form submission flow

### 4.2 Increase Unit Test Coverage

- [ ] Test remaining utility functions

---

## Phase 5: Maybe - Flashy UI Template (Aceternity)

> Only pursue after Phases 1-4 are solid. This is a separate template variant.

### 5.1 Research & Setup

- [ ] Review Aceternity UI components (https://ui.aceternity.com)
- [ ] Decide: fork this repo or create separate template?
- [ ] Evaluate: do these need React, or can they be Astro-ified?

### 5.2 Implementation (if pursuing)

- [ ] Create `astrowind-flashy` or similar variant repo
- [ ] Add select Aceternity components (keep it minimal)
- [ ] Ensure they don't break accessibility or performance

### 5.3 Theming System (CSS-only, no React)

- [ ] Use CSS custom properties for theme variants
- [ ] Create 2-3 theme presets (minimal, luxury, bold)
- [ ] Theme switching via config, not runtime JS

---

## Quick Wins (Can Do Anytime)

- [ ] Verify `sitemap.xml` generation works
- [ ] Add OpenGraph images for social sharing
- [ ] Set up Lighthouse CI budget alerts

---

## Notes

- Image pipeline already production-ready (Sharp + responsive srcset + WebP)
- Testing setup is solid (Vitest + Playwright + axe-core)
- Focus on operationalizing, not adding features
