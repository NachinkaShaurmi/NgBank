import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should display login form', async ({ page }) => {
    await page.goto('/login');
    
    await expect(page.locator('h1')).toContainText('Sign In');
    await expect(page.locator('input[formControlName="login"]')).toBeVisible();
    await expect(page.locator('input[formControlName="password"]')).toBeVisible();
    await expect(page.locator('button')).toContainText('Sign In');
  });

  test('should navigate to sign up', async ({ page }) => {
    await page.goto('/login');
    
    await page.click('a[routerLink="/sign-up"]');
    await expect(page).toHaveURL('/sign-up');
  });
});