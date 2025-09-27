import { test, expect } from '@playwright/test';

test.describe('Complete User Flow', () => {
  test('should complete full user journey: signup -> login -> create accounts -> transaction', async ({
    page,
  }) => {
    const timestamp = Date.now();
    const testUser = {
      name: `Test User ${timestamp}`,
      login: `testuser${timestamp}`,
      email: `test${timestamp}@example.com`,
      password: 'testpass123',
    };

    // 1. Sign Up
    await page.goto('/sign-up');
    await page.fill('input[formControlName="name"]', testUser.name);
    await page.fill('input[formControlName="login"]', testUser.login);
    await page.fill('input[formControlName="email"]', testUser.email);
    await page.fill('input[formControlName="password"]', testUser.password);
    await page.click('input[type="submit"]');

    // Should redirect to login
    await expect(page).toHaveURL('/login');

    // 2. Login
    await page.fill('input[formControlName="login"]', testUser.login);
    await page.fill('input[formControlName="password"]', testUser.password);
    await page.click('button:has-text("Sign In")');

    // Should redirect to home
    await expect(page).toHaveURL('/home');
    await expect(page.locator('h2')).toContainText('Your Accounts');

    // 3. Create first account
    await page.click('button:has-text("New Account")');
    await page.fill('input[formControlName="name"]', 'Savings Account');
    await page.click('mat-select[formControlName="currency"]');
    await page.click('mat-option[value="EUR"]');
    await page.fill('input[formControlName="balance"]', '1000');
    await page.click('button:has-text("Create")');

    // Wait for dialog to close and account to appear
    await page.waitForSelector('.account-card', { timeout: 10000 });
    await expect(page.locator('.account-card')).toHaveCount(1);

    // 4. Create second account
    await page.click('button:has-text("New Account")');
    await page.fill('input[formControlName="name"]', 'Checking Account');
    await page.click('mat-select[formControlName="currency"]');
    await page.click('mat-option[value="EUR"]');
    await page.fill('input[formControlName="balance"]', '500');
    await page.click('button:has-text("Create")', { force: true });

    // Wait for second account to appear
    await page.waitForFunction(
      () => document.querySelectorAll('.account-card').length === 2,
      { timeout: 10000 }
    );
    await expect(page.locator('.account-card')).toHaveCount(2);

    // 5. Navigate to first account and create transaction
    await page.evaluate(() => {
      document
        .querySelectorAll('.cdk-overlay-backdrop')
        .forEach((el) => (el as HTMLElement).click());
    });
    await page.waitForTimeout(1000);
    await page.locator('.account-card').first().click({ force: true });
    await expect(page).toHaveURL(/\/account\/.+/);

    await page.click('button:has-text("New Transaction")');
    await expect(page.locator('h1:has-text("New Transaction")')).toBeVisible();
  });
});
