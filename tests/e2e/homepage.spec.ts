import { test, expect } from '@playwright/test';
import { getSiteName } from './helpers/config';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check that the main heading is visible
    await expect(page.locator('main h1, .hero h1, h1').first()).toBeVisible();

    // Check that the navigation is present (may be hidden on mobile)
    const navigation = page.locator('nav, header nav, header');
    await expect(navigation.first()).toBeVisible();

    // Check that the footer is present
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have correct page title and meta description', async ({ page }) => {
    await page.goto('/');

    // Check page title contains site name (from config.yaml)
    const siteName = getSiteName();
    await expect(page).toHaveTitle(new RegExp(siteName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));

    // Check meta description is present
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription?.length).toBeGreaterThan(10);
  });

  test('should have theme toggle functionality', async ({ page }) => {
    await page.goto('/');

    // Find theme toggle button
    const themeToggle = page.locator('[data-aw-toggle-color-scheme]');

    if ((await themeToggle.count()) > 0 && (await themeToggle.isVisible())) {
      // Click theme toggle
      await themeToggle.click();

      // Wait a moment for theme change
      await page.waitForTimeout(100);

      // Check if dark mode class is applied to document
      const htmlElement = page.locator('html');
      await expect(htmlElement).toHaveClass(/dark/);

      // Click again to toggle back
      await themeToggle.click();
      await page.waitForTimeout(100);

      // Should not have dark class
      const htmlClass = await htmlElement.getAttribute('class');
      expect(htmlClass).not.toContain('dark');
    } else {
      // If toggle is not visible, just verify theme system exists
      const hasThemeSystem = await page.evaluate(() => {
        return (
          typeof window !== 'undefined' &&
          (document.documentElement.classList.contains('light') ||
            document.documentElement.classList.contains('dark') ||
            document.documentElement.hasAttribute('data-theme'))
        );
      });

      // Theme system should exist in some form
      expect(hasThemeSystem || (await themeToggle.count()) > 0).toBe(true);
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that content is still visible and accessible
    await expect(page.locator('main h1, .hero h1, h1').first()).toBeVisible();
    await expect(page.locator('header#header, nav[aria-label="Main navigation"]').first()).toBeVisible();

    // Check mobile navigation if hamburger menu exists
    const hamburgerMenu = page.locator('[data-aw-toggle-menu], .hamburger, .mobile-menu-toggle');
    if ((await hamburgerMenu.count()) > 0) {
      // Click hamburger menu
      await hamburgerMenu.click();

      // Check if mobile menu content is visible - look for navigation that becomes visible
      const mobileNavContent = page.locator('nav[aria-label="Main navigation"]:not([class*="hidden"])');
      if ((await mobileNavContent.count()) > 0) {
        // Should become visible after clicking hamburger
        await expect(mobileNavContent).toBeVisible();
      }
    }
  });

  test('should have navigation structure', async ({ page }) => {
    await page.goto('/');

    // Check that navigation exists
    const navigation = await page.locator('nav, header nav').count();
    expect(navigation).toBeGreaterThan(0);

    // Check that some navigation links exist
    const navLinks = await page.locator('nav a, header a').count();
    expect(navLinks).toBeGreaterThan(0);

    // Verify at least one link has a valid href
    const validLinks = await page.locator('nav a[href], header a[href]').count();
    expect(validLinks).toBeGreaterThan(0);
  });

  test('should load hero section correctly', async ({ page }) => {
    await page.goto('/');

    // Check for hero section elements
    const heroSection = page.locator('.hero, section:first-child, main > section:first-child');
    await expect(heroSection.first()).toBeVisible();

    // Check for hero title
    const heroTitle = page.locator('.hero h1, section h1, main h1').first();
    await expect(heroTitle).toBeVisible();

    // Check for CTA buttons if they exist
    const ctaButtons = page.locator('.hero a, .hero button, section a[class*="btn"], section button[class*="btn"]');
    if ((await ctaButtons.count()) > 0) {
      await expect(ctaButtons.first()).toBeVisible();
    }
  });

  test('should have accessible images', async ({ page }) => {
    await page.goto('/');

    // Check all images have alt text or are marked as decorative
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const ariaHidden = await img.getAttribute('aria-hidden');
      const role = await img.getAttribute('role');

      // Images should either have alt text or be marked as decorative
      if (ariaHidden !== 'true' && role !== 'presentation') {
        expect(alt).toBeTruthy();
        expect(alt).not.toBe('');
        expect(alt).not.toBe('image'); // Avoid generic alt text
      }
    }
  });

  test('should have accessible contact page', async ({ page }) => {
    // Directly test the contact page exists and loads
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Check page loads successfully
    expect(page.url()).toContain('contact');

    // Check for contact form or contact content
    const hasContactForm = (await page.locator('form').count()) > 0;
    const hasContactContent =
      (await page
        .locator('h1, h2, h3')
        .filter({ hasText: /contact/i })
        .count()) > 0;

    // Should have either a form or contact content
    expect(hasContactForm || hasContactContent).toBe(true);
  });
});
