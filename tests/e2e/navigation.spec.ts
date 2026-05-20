import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between pages successfully', async ({ page }) => {
    // Test direct navigation to different pages (simpler than clicking dropdown links)
    const testPages = [
      { name: 'About', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Contact', path: '/contact' },
      { name: 'Reviews', path: '/reviews' },
    ];

    for (const testPage of testPages) {
      await test.step(`Navigate to ${testPage.name} page`, async () => {
        await page.goto(testPage.path);
        await page.waitForLoadState('networkidle');

        // Should be on the correct page
        expect(page.url()).toContain(testPage.path);

        // Page should have loaded properly
        await expect(page.locator('main')).toBeVisible();

        // Should have a heading (if it exists)
        const headings = await page.locator('h1, h2, h3').count();
        if (headings > 0) {
          await expect(page.locator('h1, h2, h3').first()).toBeVisible();
        }
      });
    }
  });

  test('should have working mobile navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Look for mobile menu toggle
    const mobileToggle = page.locator('[data-aw-toggle-menu], .hamburger, .mobile-menu-toggle');

    if ((await mobileToggle.count()) > 0) {
      await test.step('Open mobile menu', async () => {
        await mobileToggle.click();

        // Mobile navigation should become visible
        const mobileNav = page.locator('nav, .mobile-nav, .nav-menu');
        await expect(mobileNav.first()).toBeVisible();
      });

      await test.step('Close mobile menu', async () => {
        await mobileToggle.click();

        // Mobile navigation should be hidden again
        const mobileNav = page.locator('nav[class*="hidden"], .mobile-nav[class*="hidden"]');
        if ((await mobileNav.count()) > 0) {
          await expect(mobileNav.first()).not.toBeVisible();
        }
      });
    }
  });

  test('should handle logo/brand link', async ({ page }) => {
    await page.goto('/about'); // Start from a non-home page

    // Look for logo or brand link
    const logoLink = page.locator('header a[href="/"], nav a[href="/"], .logo a, .brand a');

    if ((await logoLink.count()) > 0) {
      await logoLink.first().click();
      await page.waitForLoadState('networkidle');

      // Should navigate back to homepage
      expect(page.url()).toMatch(/\/$|\/index/);

      // Should show homepage content
      await expect(page.locator('main')).toBeVisible();
    }
  });

  test('should maintain navigation state on page refresh', async ({ page }) => {
    await page.goto('/');

    // If there's a theme toggle and it's visible, test theme persistence
    const themeToggle = page.locator('[data-aw-toggle-color-scheme]');
    if ((await themeToggle.count()) > 0 && (await themeToggle.isVisible())) {
      await themeToggle.click();
      await page.waitForTimeout(100);

      // Verify dark mode is active
      await expect(page.locator('html')).toHaveClass(/dark/);

      // Refresh the page
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Dark mode should persist
      await expect(page.locator('html')).toHaveClass(/dark/);
    } else {
      // Simple navigation state test - just ensure page refreshes properly
      const originalTitle = await page.title();
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Page should reload with same title
      const newTitle = await page.title();
      expect(newTitle).toBe(originalTitle);
    }
  });

  test('should have proper breadcrumb navigation', async ({ page }) => {
    // Navigate to a sub-page
    await page.goto('/services');

    // Look for breadcrumb navigation
    const breadcrumb = page.locator('.breadcrumb, nav[aria-label="breadcrumb"], ol[role="breadcrumb"]');

    if ((await breadcrumb.count()) > 0) {
      // Should have breadcrumb items
      const breadcrumbItems = breadcrumb.locator('li, .breadcrumb-item');
      expect(await breadcrumbItems.count()).toBeGreaterThan(0);

      // First item should link to home
      const homeLink = breadcrumbItems.first().locator('a[href="/"]');
      if ((await homeLink.count()) > 0) {
        await homeLink.click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toMatch(/\/$|\/index/);
      }
    }
  });

  test('should handle search functionality if available', async ({ page }) => {
    await page.goto('/');

    // Look for search input or search button
    const searchInput = page.locator('input[type="search"], input[name*="search"], .search-input');
    const searchButton = page.locator('button[type="search"], .search-button, [aria-label*="search" i]');

    if ((await searchInput.count()) > 0) {
      await test.step('Test search functionality', async () => {
        // Type in search input
        await searchInput.fill('web design');

        // Press Enter or click search button
        if ((await searchButton.count()) > 0) {
          await searchButton.click();
        } else {
          await searchInput.press('Enter');
        }

        // Should navigate to search results or show results
        await page.waitForLoadState('networkidle');

        // Check if we're on a search results page or results are shown
        const hasResults = (await page.locator('.search-results, [class*="result"], .no-results').count()) > 0;
        const urlChanged = page.url().includes('search') || page.url().includes('q=');

        expect(hasResults || urlChanged).toBe(true);
      });
    }
  });

  test('should handle footer navigation', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Test footer navigation links
    const footerLinks = page.locator('footer a[href^="/"]');
    const linkCount = await footerLinks.count();

    if (linkCount > 0) {
      // Test first footer link
      const firstLink = footerLinks.first();
      const href = await firstLink.getAttribute('href');

      if (href && href !== '/') {
        await firstLink.click();
        await page.waitForLoadState('networkidle');

        // Should navigate to the linked page
        expect(page.url()).toContain(href);

        // Page should load properly
        await expect(page.locator('main')).toBeVisible();
      }
    }
  });

  test('should handle external links properly', async ({ page }) => {
    await page.goto('/');

    // Find external links (social media, etc.)
    const externalLinks = page.locator('a[href^="http"]:not([href*="localhost"]):not([href*="127.0.0.1"])');
    const linkCount = await externalLinks.count();

    if (linkCount > 0) {
      // Look specifically for social media or intentionally external links
      const socialLinks = page.locator(
        'a[href*="facebook.com"], a[href*="twitter.com"], a[href*="linkedin.com"], a[href*="instagram.com"], a[href*="github.com"]'
      );
      const socialCount = await socialLinks.count();

      if (socialCount > 0) {
        const firstSocialLink = socialLinks.first();
        const target = await firstSocialLink.getAttribute('target');
        const rel = await firstSocialLink.getAttribute('rel');
        const href = await firstSocialLink.getAttribute('href');

        console.log('Social link found:', { href, target, rel });

        // Social links should have security attributes
        expect(target, `Social link should have target="_blank"`).toBe('_blank');
        expect(rel, `Social link should have rel containing noopener`).toContain('noopener');
      } else {
        // If no social links, just verify external links exist and are properly formed
        const firstExternalLink = externalLinks.first();
        const href = await firstExternalLink.getAttribute('href');
        expect(href, 'External link should have href').toBeTruthy();
        expect(href?.startsWith('http'), 'External link should start with http').toBe(true);
      }
    }
  });
});
