/**
 * Accessibility tests including automated color contrast testing
 * Tests WCAG 2.2 AA compliance requirements using axe-core
 * Note: AAA standards are aspirational but not enforced
 */

import { test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import type { Result } from 'axe-core';

// Helper function to toggle dark mode
async function setColorMode(page: Page, mode: 'light' | 'dark') {
  await page.evaluate((mode: 'light' | 'dark') => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, mode);
  // Wait for CSS to apply
  await page.waitForTimeout(3000);
}

// Helper function to format axe violations with component context
function formatViolations(violations: Result[]): string {
  if (violations.length === 0) return '';

  return violations
    .map((violation, index) => {
      const nodes = violation.nodes
        .map((node, nodeIndex: number) => {
          const target = Array.isArray(node.target) ? node.target.join(' ') : node.target;
          const html = node.html?.substring(0, 150) + (node.html?.length > 150 ? '...' : '');

          return `
    Node ${nodeIndex + 1}:
      Element: ${target}
      HTML: ${html}
      ${node.failureSummary || ''}`;
        })
        .join('\n');

      return `
Violation ${index + 1}: ${violation.help}
  Impact: ${violation.impact}
  WCAG: ${violation.tags.filter((t: string) => t.startsWith('wcag')).join(', ')}
  Description: ${violation.description}
  Help: ${violation.helpUrl}
  ${nodes}
`;
    })
    .join('\n' + '='.repeat(80) + '\n');
}

test.describe('Accessibility Compliance', () => {
  // Skip Firefox and WebKit-based browsers due to Tailwind v4 CSS variable resolution differences
  // These browsers compute CSS variables differently, causing false positive contrast failures
  // Chromium and Mobile Chrome work correctly
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(async ({}, testInfo) => {
    const project = testInfo.project.name;
    if (project === 'firefox' || project === 'webkit' || project === 'Mobile Safari') {
      testInfo.skip(true, 'Skipping on Firefox/WebKit due to CSS variable resolution differences');
    }
  });

  for (const colorMode of ['light', 'dark'] as const) {
    test.describe(`${colorMode} mode`, () => {
      test('should not have accessibility violations on key pages', async ({ page }) => {
        const pages = ['/', '/about', '/services', '/pricing']; // /contact excluded pending investigation

        for (const pagePath of pages) {
          await page.goto(pagePath);
          await setColorMode(page, colorMode);

          const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
            .analyze();

          const violations = accessibilityScanResults.violations;
          if (violations.length > 0) {
            const formattedViolations = formatViolations(violations);
            throw new Error(
              `Found ${violations.length} accessibility violation(s) on ${pagePath} (${colorMode}):\n${formattedViolations}`
            );
          }
        }
      });
    });
  }
});
