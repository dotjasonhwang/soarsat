/**
 * Console error detection tests
 * Catches JavaScript errors, missing resources, and other console issues
 */

import { test, expect } from '@playwright/test';

test.describe('Console Error Detection', () => {
  const testPages = [
    { name: 'Homepage', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Pricing', path: '/pricing' },
  ];

  testPages.forEach(({ name, path }) => {
    test(`${name} page should have no console errors`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const consoleWarnings: string[] = [];

      // Listen for console messages
      page.on('console', (msg) => {
        const text = msg.text();

        // Skip harmless warnings that don't affect functionality
        const harmlessPatterns = [
          /Download the React DevTools/i,
          /Vue DevTools/i,
          /A Cookie associated with a cross-site resource/i,
          /Third-party cookie/i,
          /Lighthouse/i,
          /DevTools/i,
          /@vite\/client/i, // Vite development messages
        ];

        const isHarmless = harmlessPatterns.some((pattern) => pattern.test(text));
        if (isHarmless) return;

        if (msg.type() === 'error') {
          consoleErrors.push(text);
        } else if (msg.type() === 'warning') {
          consoleWarnings.push(text);
        }
      });

      // Navigate to page and wait for network activity to settle
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      // Wait a bit more for any delayed scripts
      await page.waitForTimeout(1000);

      // Report findings
      if (consoleErrors.length > 0) {
        console.log(`❌ Console errors on ${name}:`, consoleErrors);
      }

      if (consoleWarnings.length > 0) {
        console.log(`⚠️  Console warnings on ${name}:`, consoleWarnings);
      }

      // Fail test if there are console errors
      expect(consoleErrors, `${name} should have no console errors`).toHaveLength(0);

      // Optional: Log warnings but don't fail (can be changed to fail if desired)
      if (consoleWarnings.length > 0) {
        console.log(`Note: ${consoleWarnings.length} warnings found on ${name} (not failing test)`);
      }
    });
  });

  test('should handle missing resources gracefully', async ({ page }) => {
    const resourceErrors: string[] = [];

    // Listen for failed resource loads
    page.on('response', (response) => {
      if (response.status() >= 400) {
        resourceErrors.push(`${response.status()} ${response.url()}`);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out acceptable resource failures
    const criticalErrors = resourceErrors.filter((error) => {
      // Skip external resources that might be blocked or unavailable
      const url = error.split(' ')[1];
      return (
        !url.includes('google-analytics.com') &&
        !url.includes('googletagmanager.com') &&
        !url.includes('facebook.com') &&
        !url.includes('twitter.com') &&
        !url.includes('linkedin.com') &&
        !url.includes('instagram.com')
      );
    });

    if (criticalErrors.length > 0) {
      console.log('❌ Resource loading errors:', criticalErrors);
    }

    expect(criticalErrors, 'Should not have critical resource loading errors').toHaveLength(0);
  });

  test('should not have JavaScript runtime errors during interactions', async ({ page }) => {
    const jsErrors: string[] = [];

    page.on('pageerror', (error) => {
      jsErrors.push(`JavaScript Error: ${error.message}`);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test common interactions that might trigger JS errors
    await test.step('Test navigation interactions', async () => {
      // Test mobile menu toggle with proper mobile viewport
      const mobileToggle = page.locator('[data-aw-toggle-menu]');
      if ((await mobileToggle.count()) > 0) {
        // Set mobile viewport to make hamburger menu visible
        await page.setViewportSize({ width: 390, height: 844 });
        await page.waitForTimeout(200); // Let responsive CSS settle

        // Wait for element to be visible before clicking
        try {
          await mobileToggle.waitFor({ state: 'visible', timeout: 5000 });
          await mobileToggle.click();
          await page.waitForTimeout(500);
          await mobileToggle.click(); // Close menu
        } catch {
          console.log('Mobile toggle not visible, skipping interaction');
        }

        // Reset to desktop viewport
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.waitForTimeout(200);
      }

      // Try theme toggle if it exists and is visible
      const themeToggle = page.locator('[data-aw-toggle-color-scheme]');
      if ((await themeToggle.count()) > 0) {
        try {
          await themeToggle.waitFor({ state: 'visible', timeout: 3000 });
          await themeToggle.click();
          await page.waitForTimeout(500);
        } catch {
          console.log('Theme toggle not visible, skipping interaction');
        }
      }

      // Test form interactions if forms exist
      const forms = page.locator('form');
      if ((await forms.count()) > 0) {
        const firstForm = forms.first();
        const inputs = firstForm.locator('input, textarea');
        const inputCount = await inputs.count();

        if (inputCount > 0) {
          // Test first input
          await inputs.first().click();
          await inputs.first().fill('test');
          await page.waitForTimeout(200);
        }
      }
    });

    if (jsErrors.length > 0) {
      console.log('❌ JavaScript runtime errors:', jsErrors);
    }

    expect(jsErrors, 'Should not have JavaScript runtime errors during interactions').toHaveLength(0);
  });
});
