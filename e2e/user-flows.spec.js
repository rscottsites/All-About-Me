import { test, expect } from '@playwright/test';

test.describe('E2E Real Browser User Flows & Keyboard Navigation', () => {
  test('User can navigate between all 5 pages using header links', async ({ page }) => {
    await page.goto('/');

    const nav = page.getByLabel('Primary navigation');

    // Verify Home Page Heading
    await expect(page.getByRole('heading', { level: 1, name: /End-to-End Digital Accessibility Engineering/i })).toBeVisible();

    // Click Services & Packages link in primary nav
    await nav.getByRole('link', { name: /^Services & Packages$/i }).click();
    await expect(page).toHaveURL('/services');
    await expect(page.getByRole('heading', { level: 1, name: /Core Services & Service Packages/i })).toBeVisible();

    // Click About link in primary nav
    await nav.getByRole('link', { name: /^About$/i }).click();
    await expect(page).toHaveURL('/about');
    await expect(page.getByRole('heading', { level: 1, name: /About Ryan Scott/i })).toBeVisible();

    // Click Examples link in primary nav
    await nav.getByRole('link', { name: /^Examples$/i }).click();
    await expect(page).toHaveURL('/examples');
    await expect(page.getByRole('heading', { level: 1, name: /Accessibility Engineering Portfolio/i })).toBeVisible();

    // Click Contact link in primary nav
    await nav.getByRole('link', { name: /Request Mini-Audit/i }).click();
    await expect(page).toHaveURL('/contact');
    await expect(page.getByRole('heading', { level: 1, name: /Request a Free Mini-Audit & Get in Touch/i })).toBeVisible();
  });

  test('Skip link is visible on focus and jumps to main content target', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.getByRole('link', { name: /Skip to main content/i });

    // Focus skip link with keyboard
    await skipLink.focus();
    await expect(skipLink).toBeVisible();

    // Programmatically activate skip link
    await skipLink.evaluate(el => el.click());
    await expect(page).toHaveURL(/#main-content$/);
  });

  test('Mini-audit form performs validation and displays confirmation state', async ({ page }) => {
    // Intercept backend /api/contact API request for E2E testing
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Request received' }),
      });
    });

    await page.goto('/contact');

    // Submit empty form to trigger validation
    await page.getByRole('button', { name: /Request Free Mini-Audit/i }).click();
    await expect(page.getByRole('alert')).toBeVisible();

    // Fill valid form fields
    await page.getByLabel(/Full Name/i).fill('Taylor Swift');
    await page.getByLabel(/Work Email Address/i).fill('taylor@example.com');
    await page.getByLabel(/Website or App URL/i).fill('https://example.com');

    // Submit form
    await page.getByRole('button', { name: /Request Free Mini-Audit/i }).click();

    // Verify confirmation message
    await expect(page.getByRole('heading', { level: 3, name: /Request Received!/i })).toBeVisible();
    await expect(page.getByText(/Taylor Swift/i)).toBeVisible();
  });
});
