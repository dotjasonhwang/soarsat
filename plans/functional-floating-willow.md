# Pricing card: 4-section flex layout

## Context

The pricing cards on `index.astro` currently misalign across columns. The A La Carte card has a 1-line subtitle ("For students who want maximum flexibilty.") while Standard and Pro have 2-line subtitles. Because the title+subtitle group has no reserved height, every section below it (price block, bullet list) shifts vertically per card. Result: the **REMOTE/IN-PERSON** price row, the bullets, and the visual rhythm differ across cards even though the card heights match (via `items-stretch` on the grid).

The fix is to give the card a real 4-section vertical layout — Header / Pricing / Bullets / CTA — so each section has a predictable anchor regardless of content length.

## Approach

Restructure the inner layout of `src/components/widgets/Pricing.astro` so the card body is a single `flex flex-col` with **four sibling sections** (instead of the current nested `<div class="px-2">` wrapper around everything-but-CTA). Use:

- a `min-h` on the **Header** to normalize 1-line vs 2-line subtitles,
- explicit `mt-*` between Header → Pricing → Bullets for consistent rhythm,
- `mt-auto` on the **CTA** to pin it to the bottom (replacing the current outer `justify-between`).

This keeps the existing visual styling (typography, badges, ribbon, button) but anchors each section so all three cards align horizontally band-for-band.

## File to modify

- `src/components/widgets/Pricing.astro` (only file changed)

## Proposed structure

```astro
<div
  class="relative rounded-lg backdrop-blur-sm bg-surface-elevated border border-primary/25 shadow-sm px-6 py-8 flex w-full flex-col text-center"
>
  {hasRibbon && ribbonTitle && <Badge title={ribbonTitle} />}

  {/* 1. HEADER — min-h reserves space for 1 or 2 line subtitle */}
  <div class="px-2 min-h-[5.5rem] md:min-h-[6.5rem]">
    {title && <h3 class="text-xl font-semibold uppercase leading-6 tracking-wider mt-2">{title}</h3>}
    {subtitle && <p class="font-light sm:text-lg text-muted mt-1">{subtitle}</p>}
  </div>

  {/* 2. PRICING — fixed offset from header */}
  <div class="px-2 mt-10 md:mt-12">
    {/* existing Remote/In-Person split OR single-price block (unchanged) */}
    {/* hourly badges (unchanged — invisible-placeholder pattern already in place) */}
  </div>

  {/* 3. BULLETS — fixed offset from pricing */}
  {items && <ul class="px-2 mt-10 md:mt-12 space-y-2 text-left">{/* existing bullets (unchanged) */}</ul>}

  {/* 4. CTA — pinned to bottom */}
  {
    callToAction && (
      <div class="mt-auto pt-6 md:pt-8 flex justify-center">{/* existing button render (unchanged) */}</div>
    )
  }
</div>
```

### Concrete diffs

1. **Drop** the inner `<div class="px-2">` wrapper that currently spans title+subtitle+price+items (lines ~52–110). Move `px-2` onto each of the 4 sections individually.
2. **Remove** `justify-between` from the outer card div; rely on `mt-auto` on the CTA.
3. **Add** `min-h-[5.5rem] md:min-h-[6.5rem]` to the new Header div. Values chosen so a 2-line subtitle fits without clipping at both breakpoints. If a future subtitle goes to 3 lines, bump these values.
4. **Replace** the current `mt-16 md:mt-20` on the price block and items list with `mt-10 md:mt-12`. The previous large gap existed because everything sat inside one `px-2` block with no other rhythm; with explicit sections, smaller gaps read cleaner.
5. **CTA** keeps its button render; just changes its wrapper from `mt-4 md:mt-6` to `mt-auto pt-6 md:pt-8`.

### What stays the same

- All Tailwind classes for typography, the Remote/In-Person split, the hourly `$X/hr` badge (incl. the invisible-placeholder pattern for A La Carte), the ribbon Badge, and the Button component.
- The outer `(price || priceRemote || priceInPerson)` gate.
- The `hourlyRemote` / `hourlyInPerson` compute step.

## Verification

1. `npm run dev` and load `http://localhost:4321/#pricing`.
2. Visually confirm across the 3 cards: title row aligns, subtitle row aligns, REMOTE/IN-PERSON labels aligns, $ amounts align, badge row aligns, first bullet aligns, CALL TODAY buttons align.
3. Resize to mobile width (~375px) — same alignment should hold at the `sm:` and base breakpoints.
4. Toggle dark mode — no regressions in border/badge contrast.
5. `npm run check` — astro + eslint + prettier clean.
6. Optional: temporarily lengthen one subtitle to 3 lines to confirm the `min-h` value is the only knob to tune for future copy changes.
