# Complete Setup Plan: Professional Services Website

Setup for your professional services business with complete branding, deployed to Netlify with custom domain!

## Phase 1: Repository Setup

### 1.1 Clone & Initialize

- Clone this repository to a new location (not in existing project)
- Initialize as a new Git repository
- Create a new GitHub repository for your business
- Push to your new remote repository

## Phase 2: Business Information & Branding

### 2.1 Update Core Site Configuration (`src/config.yaml`)

- **Site settings**: name, domain URL, base path
- **SEO metadata**: title, description, Open Graph images
- **Business info**: name, email, phone, address
- **Social media**: Twitter, Instagram, Facebook, LinkedIn, GitHub URLs
- **Google Analytics**: Add your GA4 tracking ID (optional)
- **Blog settings**: Keep enabled or disable if not needed

### 2.2 Apply Brand Colors (`src/assets/styles/tailwind.css`)

- Replace color values in `:root` section (light mode):
  - `--primary`: Your main brand color (hex/rgb)
  - `--primary-hover`: Darker shade for hover states
  - `--secondary`: Secondary brand color
  - `--accent`: Accent/highlight color
- Update `.dark` section if supporting dark mode
- Colors automatically apply across entire site via semantic tokens

### 2.3 Brand Fonts (if different from Inter)

- Install font packages: `npm install @fontsource-variable/your-font`
- Update imports in `tailwind.css`
- Update `--font-family-*` variables in `@theme` section

### 2.4 Logo & Favicon

- Replace logo in `src/components/Logo.astro` with your SVG/image
- Replace `public/favicon.svg` with your favicon
- Update `public/robots.txt` with your domain
- Replace `src/assets/images/default.png` (Open Graph image, 1200x628px)

## Phase 3: Content Customization

### 3.1 Homepage (`src/pages/index.astro`)

- Update hero section: headline, subheadline, CTA buttons
- Update features/benefits section
- Update testimonials (or remove if not ready)
- Update stats/numbers section
- Update call-to-action sections

### 3.2 About Page (`src/pages/about.astro`)

- Company story and mission
- Team members (with photos if available)
- Core values and approach
- Update timeline/milestones if applicable

### 3.3 Services Pages (`src/pages/services*.astro`)

- Choose which service page structure works best
- Update service offerings, descriptions, pricing
- Add service-specific benefits and processes
- Update CTAs to point to contact/consultation booking

### 3.4 Pricing Page (`src/pages/pricing.astro`)

- Update pricing tiers and features
- Adjust based on your business model (hourly, project-based, retainer)
- Update CTAs for each tier

### 3.5 Contact Page (`src/pages/contact.astro`)

- Verify contact form fields match your needs
- Update embedded map with your location (uses config.yaml)
- Note: Contact form needs backend setup (see Phase 5)

### 3.6 Navigation (`src/navigation.ts`)

- Update menu structure
- Add/remove pages as needed
- Update header actions (CTA buttons)
- Update footer links and sections

### 3.7 Blog (Optional)

- Keep or disable in `src/config.yaml`
- Update example posts in `src/content/post/`
- Write your first posts
- Update author information

## Phase 4: Images Phase 4: Images & Assets (1 hour) Assets

### 4.1 Replace Stock Images

- `src/assets/images/hero-image.png` - Main hero image
- `src/assets/images/` - Other page-specific images
- Optimize images (WebP format recommended, <500KB)

### 4.2 Team Photos (if applicable)

- Add to `src/assets/images/team/`
- Reference in About page

### 4.3 Service/Portfolio Images

- Add project screenshots or service illustrations
- Update references in service pages

## Phase 5: Forms Phase 5: Forms & Integrations (30 minutes) Integrations

### 5.1 Contact Form Backend

Choose one:

- **Netlify Forms** (Recommended for Netlify): Add `netlify` attribute to form
- **Formspree**: Sign up and add action URL
- **Custom API**: Implement your own handler

Update form in `src/components/ui/Form.astro`:

```html
<form name="contact" method="POST" data-netlify="true"></form>
```

### 5.2 Google Maps Embed

- Get Google Maps Place ID for accurate location
- Update in `src/config.yaml` business section
- Component: `src/components/widgets/EmbeddedMap.astro`

## Phase 6: Testing Phase 6: Testing & Quality Assurance (30 minutes) Quality Assurance

### 6.1 Run Test Suite

```bash
npm run check        # ESLint + Prettier
npm run test         # Unit tests
npm run test:e2e     # End-to-end tests
npm run build        # Production build
```

### 6.2 Manual Testing

- Test all navigation links
- Test mobile responsiveness (all breakpoints)
- Test dark mode toggle (if enabled)
- Test contact form submission
- Verify all images load correctly
- Check SEO meta tags (view page source)

### 6.3 Accessibility Check

- Run Lighthouse audit in Chrome DevTools
- Fix any critical accessibility issues flagged
- Verify keyboard navigation works

## Phase 7: Deployment to Netlify

### 7.1 Prepare for Deployment

- Ensure `npm run build` succeeds locally
- Update `public/robots.txt` with your production URL
- Set environment variables if needed (GA, form backends)

### 7.2 Deploy to Netlify

1. Push code to GitHub
2. Log in to Netlify (netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### 7.3 Configure Custom Domain

1. Go to Site settings → Domain management
2. Add custom domain (your purchased domain)
3. Follow Netlify's DNS instructions:
   - Add A record or CNAME to your domain registrar
   - Wait for DNS propagation (can take 24-48 hours)
4. Enable HTTPS (automatic with Netlify)

### 7.4 Post-Deployment Configuration

- Set up form notifications in Netlify dashboard
- Configure redirects if needed (`public/_redirects` file)
- Set up deploy previews for pull requests
- Add site to Google Search Console
- Submit sitemap: `https://yourdomain.com/sitemap-index.xml`

## Phase 8: Going Live

### 8.1 Final Checks

- Test site on production URL
- Verify custom domain works
- Test form submissions
- Check mobile performance
- Verify analytics tracking

### 8.2 SEO & Marketing

- Submit sitemap to Google Search Console
- Set up Google Business Profile (if local business)
- Create social media posts announcing launch
- Update social media profiles with new website link

### 8.3 Monitoring

- Set up Netlify analytics or Google Analytics
- Monitor form submissions
- Check error logs in Netlify dashboard

---

## Key Files Reference

**Must Edit:**

- `src/config.yaml` - All business info & site settings
- `src/assets/styles/tailwind.css` - Brand colors
- `src/pages/index.astro` - Homepage content
- `src/pages/about.astro` - About page
- `src/pages/contact.astro` - Contact page
- `src/navigation.ts` - Menu structure
- `src/components/Logo.astro` - Your logo
- `public/favicon.svg` - Your favicon

**Optional:**

- `src/pages/services*.astro` - Service pages
- `src/pages/pricing.astro` - Pricing page
- `src/content/post/*` - Blog posts
- `CLAUDE.md` - Update project-specific instructions for future AI assistance
