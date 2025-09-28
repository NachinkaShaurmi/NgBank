import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should redirect to login from root', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/login');
  });

  test('should show 404 page for invalid routes', async ({ page }) => {
    await page.goto('/invalid-route');

    await expect(page.locator('.number')).toContainText('404');
    await expect(page.locator('a')).toBeVisible();
  });
});
