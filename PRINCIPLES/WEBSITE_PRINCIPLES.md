# Website Design Principles

## 1. Core Philosophy

### The Core Priorities

- Follow the following core priorities. When in conflict, choose the priority that is listed first in the list below:
  - User needs
  - Brand guide referenced here: [BRAND_GUIDE.md](BRAND_GUIDE.md)
  - Responsiveness
  - Accessibility
  - Speed

### User Experience Priority

- User flows should be intuitive and efficient
- Provide clear feedback for user actions
- Error states should be helpful, not punitive

### Accessibility First

- WCAG 2.2 AA compliance as minimum standard, AAA where feasible
- Color contrast ratios must meet accessibility requirements
- All interactive elements must be keyboard accessible
- Touch targets must meet minimum size requirements (24x24px)
- Screen reader compatibility for all content
- Focus indicators must be clearly visible
- Automated testing: @axe-core/playwright integrated into Playwright tests for comprehensive WCAG AA/AAA validation

### Performance

- See [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)

### Content Strategy

- All text should be selectable
- Use progressive disclosure to manage information density
- Content hierarchy guides user attention
- Every page should have a clear primary action

## 2. Design System Foundation

### Color Palette & Usage

- Palette: Brand guide defines palette.
- Semantic colors: Unless specified by brand guide, Success (green), warning (yellow), error (red), info (blue)
- Grays: 8 step scale for backgrounds, borders, and text
- White text Opacity: Never use grey text on colored backgrounds - use white text with reduced opacity or hand-pick colors matching the background hue.
- Color contrast must meet WCAG AA standards
- Hierarchy Through Contrast: Use color contrast (not just size) for visual hierarchy - reserve size changes for major importance shifts.

### Typography Scale & Hierarchy

- Font sizes: Using tailwind default. H1 (text-5xl/48px), H2 (text-3xl/36px), H3 (text-2xl/30px), H4 (text-xl/24px), H5 (text-lg/20px), Body (text-base/16px), Small (text-sm/14px), Caption (text-xs/12px)
- Font stack: Single font family defined by brand guide with system font fallback matched for size/shape to prevent FOUC (see PRODUCTION_CHECKLIST.md)
- Line height: Use Tailwind defaults
- Font weights: Regular (400), Medium (500), Semibold (600)

### Spacing & Layout Grid

- Use tailwind default units (base: 8x)
- Common spacing values: Multiples of base unit, exceptions are allowed, carefully
- Grid system: Use Tailwind's built-in CSS Grid utilities (grid-cols-12)
- Container max-widths: Use Tailwind defaults (sm:640px, md:768px, lg:1024px, xl:1280px, 2xl:1536px)

### Margin & Padding

- Strict rules on margin vs padding
  - Margin: Space between separate components/elements (external spacing)
  - Padding: Space inside a component between its border and content (internal spacing)
- Prefer margin-top over margin-bottom for vertical spacing consistency
- If it is a uniform spacing, use gap instead of mt
- Use Tailwind's spacing scale (multiples of 8px base unit)

### Rounding

- Rounding: Use tailwind values, maintain this mapping generally:
  - rounded-sm: text, textarea
  - rounded-md: buttons, regular cards, header dropdowns, alerts
  - rounded-lg: feature cards, content containers, large images, contact forms
  - rounded-xl: main hero containers, full-width feature sections

### Borders

- Border weight: 0. No borders, only shadows

### Shadows

- Bottom Right Corner Offset: Use bottom right offsets to simulate light coming from top-left
- Dark Mode: Color the shadow with something from the color palette instead of black
- Interactive States: Increase shadow on hover for elevation feedback

- Shadow Weight: Match the border radii class:
  - shadow-sm: text, textarea
  - shadow-md: buttons, regular cards, header dropdowns, alerts
  - shadow-lg: feature cards, content containers, large images, contact forms
  - shadow-xl: main hero containers, full-width feature sections

### Component Library Standards

- Each component should have single responsibility
- States: default, hover, focus, active, disabled, loading
- Components must be composable and reusable

### Design Tokens

- Philosophy: CSS-first configuration. Use Tailwind v4's auto-generated utilities, or Tailwind @theme directive, or @utility directive.
- Leverage auto-generated utilities for simple token usage
- Define all design tokens in @theme block for auto-utility generation
- If needed, use semantic custom utilities (@utility) for custom component patterns
- All tokens to use semantic naming: --color-brand-primary, --spacing-section
- https://tailwindcss.com/docs/theme#theme-variable-namespaces

## 3. Layout & Visual Hierarchy

### Content Organization

- Reading pattern: Z-pattern for landing/hero sections, F-pattern for content pages and forms
- Information hierarchy: Most important content above the fold, progressive disclosure for details
- Scannable structure: Use headings, bullet points, and white space for easy scanning
- Content grouping: Related information clustered together, clear visual separation between sections
- Mobile-first flow: Linear content flow on mobile, enhanced layouts on larger screens

### White Space & Breathing Room

- White space is not empty space—it's a design element
- Generous spacing around important CTAs
- Section breaks using vertical rhythm

### Responsive Breakpoints

- Strategy: Mobile-first design using Tailwind's default breakpoints
- Principle: Use minimum necessary breakpoints - most components need 1-2 breakpoints max
- Core pattern: Base → md: → lg: for most components
- Navigation/Header: Base (hamburger, stacked) → md: (horizontal layout)
- Typography: Base → md: (readability scaling)
- Grid/Layout: Base (single column) → md: (2-column)
- Cards/Content: Base (full width, stacked) → md: (side-by-side, grid)
- Skip often: sm: (too close to mobile), lg: (unless specific need), xl:/2xl: (unless specific need)

## 4. Navigation

### Header (NavBar)

- Clear, concise navigation labels
- Maximum 6 primary navigation items and 1 Button
- Use dropdown if more than 6 navigation items
- Current page indication in navigation via active status of HoverLink(TODO)
- Hamburger menu on mobile

### Footer

- All links in Header to be displayed in Footer

### Search

- Currently unused, consider in the future: https://github.com/shishkin/astro-pagefind

## 5. Content & Messaging

### Content Hierarchy

- H1: One per page, describes main content
- H2-H5: Logical nesting, no skipping levels
- Lead paragraphs to introduce sections
- Can use pull quotes when relevant

### Tone of Voice Guidelines

- Active voice over passive voice
- Clear and direct, avoiding marketing speak and fluff words
- If specified in Brand Guide, adhere to Brand tone

### Call-to-Action Standards

- 1 primary CTA per page/section, except for sections that refer to a list of items. Then you can have actions equal to the number of items.
- Plus an option secondary action, again one per item if it is a list.
- BAD EXAMPLES (BANNED):
  - Click here
  - Submit
  - Learn more
  - Sign up
  - Buy now
  - Download
  - Go
  - Continue
  - Next
- GOOD EXAMPLES:
  - Get started
  - Try free for 30 days
  - See pricing
  - Get your quote
  - Schedule a call
  - Unlock access
  - Get your guide
- High contrast and visual prominence

## 6. Interactive Elements

### Button States & Styles

- All interactive elements require hover and focus state
- Primary: High contrast, brand color, main actions
- Secondary: Lower contrast, supporting actions
- Tertiary: Text-only, minimal actions
- States: default, hover, focus, active, disabled, loading
- Consistent sizing and spacing across variants

### Loading States & Feedback

- Skeleton screens for content loading
- Progress indicators for multi-step processes
- Provide success confirmation for completed actions

### Hover & Focus Effects

- Subtle hover states that indicate interactivity
- Duration: 150ms
- Clear focus indicators for keyboard navigation
- Hover effects should enhance, not distract

### Animation & Transitions

- Purposeful animations that aid user understanding
- Duration: 150ms for micro-interactions, 300ms for transitions
- Easing: ease-out for entering, ease-in for exiting
- Use consistent motion language across components

## 7. Assets

### Favicon

- Use [Real Favicon Generator](https://realfavicongenerator.net/) to generate all required favicon files and formats
- Generates comprehensive favicon package for all platforms (iOS, Android, Windows, macOS)
- Includes proper meta tags and configuration for optimal display across devices
- Place generated files in `/public` directory as instructed by the generator
- Update meta tags in layout files with the generated markup

### Images & Icons

- Don't scale icons/images beyond their original size, use background shapes to fill space.
- More on asset handling in PRODUCTION_CHECKLIST.md

## 8. Technical Implementation

### CSS Architecture

- Utility-first approach with Tailwind CSS
- Minimal custom CSS, prefer utility classes
  - Component-specific styles in Astro files
  - Custom properties for design tokens
  - Consistent naming conventions (BEM when needed)

### Component Patterns

- Astro only, no React
- Use slots for flexible content composition

### SEO Considerations

- Semantic HTML structure with proper headings
- Meta descriptions under 155 characters
- Descriptive page titles under 60 characters
- Alt text for all meaningful images
- In sections, follow the formula:
  - Tagline: 1 or 2 word descriptions of section
  - Title: Phrase that captures essense
  - Subtitle: 1-2 sentence description

### Browser Support

- Modern browsers: Chrome, Firefox, Safari, Edge (last 2 versions)
- Core functionality works without JavaScript
- CSS fallbacks for newer properties
