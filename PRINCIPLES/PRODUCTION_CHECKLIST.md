# Production Checklist

## 1. New Site Setup

Configure these first when using the template:

- [ ] Update `src/config.yaml`:
  - `site.name` - Your site name
  - `business.name`, `phone`, `email`, `address`
  - `business.socialMedia` - Instagram, Facebook, LinkedIn, GitHub
  - `metadata.title.default` and `description` - SEO defaults
  - `analytics.vendors.googleTagManager.id` - Your GTM container ID
- [ ] Replace placeholder descriptions on all pages (search for `TODO:`)
- [ ] Update page content: index, about, services, pricing, reviews, contact
- [ ] Replace images in `src/assets/images/`
- [ ] Update favicon in `public/` (https://favicon.io)
- [ ] Update `src/navigation.ts` if adding/removing pages
- [ ] Update legal pages: `privacy.md` and `terms.md`
- [ ] Add/edit blog posts in `src/content/post/`

## 2. Image Optimization

- [ ] Use Astro's `Image` component for responsive images
- [ ] Use Astro's `Picture` component for art direction (different images per breakpoint)
- [ ] Provide source images at highest resolution (Astro generates optimized sizes)
- [ ] Specify `widths` array to generate multiple sizes
- [ ] Never manually resize/compress - Astro handles WebP conversion
- [ ] Optimize SVGs manually with SVGOMG (Astro doesn't process SVGs)
- [ ] For mobile, provide separate cropped source images (~500px wide)

## 3. Loading Strategies

- [ ] Preload critical images in head: `<link rel="preload" as="image" href={img.src} />`
- [ ] Preload fonts: `<link rel="preload" href="/fonts/font.woff2" as="font" type="font/woff2" crossorigin />`
- [ ] Set `loading="eager"` for above-fold images

## 4. Font Optimization

- [ ] Download fonts locally using Google Fonts Helper
- [ ] Limit to weights 400 and 700 (browser estimates rest)
- [ ] Place fonts in `/fonts` folder
- [ ] Add `font-display: swap` in @font-face declarations
- [ ] Use Font Style Matcher to find matching fallback system font
- [ ] Match line heights between custom and fallback fonts

## 5. Performance

- [ ] Minify CSS/JS (Netlify has auto-minify)
- [ ] Use SVGs for icons, graphics, logos

## 6. Code Cleanup

- [ ] Audit and remove unnecessary dependencies
- [ ] Defer loading for non-critical scripts

## 7. SEO & Analytics

- [ ] Set up Google Tag Manager, add container ID to config.yaml
- [ ] Set up Google Search Console
- [ ] Add verification ID to config.yaml
- [ ] Submit sitemap.xml to Search Console
- [ ] Generate LocalBusiness schema markup
- [ ] Validate schema with Rich Results Test
- [ ] Add schema JSON-LD to Layout.astro head

## 8. Deployment

- [ ] Deploy to Netlify (connect GitHub repo)
- [ ] Custom Domain
- [ ] Set up netlify forms notifications
- [ ] Test on PageSpeed Insights (aim for 100 on all metrics)
- [ ] Test both mobile and desktop

## Tools Reference

| Purpose             | Tool                                                     |
| ------------------- | -------------------------------------------------------- |
| HTML Validation     | https://validator.w3.org/                                |
| SVG Optimization    | https://jakearchibald.github.io/svgomg/                  |
| Google Fonts Helper | https://gwfh.mranftl.com/fonts                           |
| Font Style Matcher  | https://meowni.ca/font-style-matcher/                    |
| Web Safe Fonts      | https://blog.hubspot.com/website/web-safe-html-css-fonts |
| Schema Generator    | https://technicalseo.com/tools/schema-markup-generator/  |
| Schema Validation   | https://search.google.com/test/rich-results              |
| PageSpeed Testing   | https://pagespeed.web.dev/                               |
| Premium SVGs        | https://www.flaticon.com                                 |
