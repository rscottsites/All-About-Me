import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = [
  { path: '/', title: 'Home' },
  { path: '/services', title: 'Services & Packages' },
  { path: '/about', title: 'About' },
  { path: '/examples', title: 'Examples' },
  { path: '/contact', title: 'Contact' },
];

test.describe('E2E Real Browser WCAG 2.1/2.2 AA Accessibility Audits', () => {
  for (const pageInfo of PAGES) {
    test(`Page "${pageInfo.title}" (${pageInfo.path}) passes automated axe WCAG audit`, async ({ page }) => {
      await page.goto(pageInfo.path);

      // Run real browser Axe audit with WCAG 2.1 AA & 2.2 AA tag rules
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
