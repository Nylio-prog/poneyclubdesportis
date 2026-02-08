import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
  test('should default to French on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check URL is French (no /en prefix)
    expect(page.url()).toBe('http://localhost:3000/');
    
    // Check FR text is visible in language switcher (use .first() since there are 2 - desktop and mobile)
    const languageSwitcher = page.locator('button[aria-label="Change language"]').first();
    await expect(languageSwitcher).toBeVisible();
    await expect(languageSwitcher).toContainText('FR');
    
    // Verify page content is in French by checking for French text (use .first() since it appears multiple times)
    await expect(page.locator('text=Bienvenue').first()).toBeVisible({ timeout: 5000 });
  });

  test('should switch from French to English', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Click language switcher (use .first() for desktop version)
    await page.locator('button[aria-label="Change language"]').first().click();
    
    // Wait for dropdown to appear and click English
    await page.locator('button:has-text("English")').click();
    
    // Wait for navigation (full page reload happens)
    await page.waitForURL('**/en', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    // Verify URL has /en prefix
    expect(page.url()).toBe('http://localhost:3000/en');
    
    // Verify EN text is now shown in language switcher
    const languageSwitcher = page.locator('button[aria-label="Change language"]').first();
    await expect(languageSwitcher).toContainText('EN');
    
    // Verify page content is in English by checking for English text (use .first() since it appears multiple times)
    await expect(page.locator('text=Welcome').first()).toBeVisible({ timeout: 5000 });
  });

  test('should switch from English back to French', async ({ page }) => {
    // Start on English page
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Verify we're on English
    expect(page.url()).toBe('http://localhost:3000/en');
    
    // Click language switcher
    await page.locator('button[aria-label="Change language"]').first().click();
    
    // Wait for dropdown and click French
    await page.locator('button:has-text("Français")').click();
    
    // Wait for navigation
    await page.waitForURL('http://localhost:3000/', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    // Verify URL has no /en prefix (French default)
    expect(page.url()).toBe('http://localhost:3000/');
    
    // Verify FR text is now shown
    const languageSwitcher = page.locator('button[aria-label="Change language"]').first();
    await expect(languageSwitcher).toContainText('FR');
    
    // Verify page content is in French (use .first() since it appears multiple times)
    await expect(page.locator('text=Bienvenue').first()).toBeVisible({ timeout: 5000 });
  });

  test('should maintain language when navigating between pages', async ({ page }) => {
    // Switch to English
    await page.goto('/');
    await page.locator('button[aria-label="Change language"]').first().click();
    await page.locator('button:has-text("English")').click();
    await page.waitForURL('**/en', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    // Navigate to another page by clicking a navigation link
    // Find any link in the navigation and click it
    const navLink = page.locator('nav a').first();
    await navLink.click();
    await page.waitForLoadState('networkidle');
    
    // Verify still on English version (URL should contain /en)
    expect(page.url()).toContain('/en');
    
    // Verify language switcher still shows EN
    const languageSwitcher = page.locator('button[aria-label="Change language"]').first();
    await expect(languageSwitcher).toContainText('EN');
  });

  test('should work on subpages (cours page)', async ({ page }) => {
    // Go to French cours page
    await page.goto('/cours');
    await page.waitForLoadState('networkidle');
    
    // Switch to English
    await page.locator('button[aria-label="Change language"]').first().click();
    await page.locator('button:has-text("English")').click();
    await page.waitForURL('**/en/cours', { timeout: 5000 });
    
    // Verify on English cours page
    expect(page.url()).toBe('http://localhost:3000/en/cours');
    
    // Switch back to French
    await page.locator('button[aria-label="Change language"]').first().click();
    await page.locator('button:has-text("Français")').click();
    await page.waitForURL('**/cours', { timeout: 5000 });
    
    // Verify back on French cours page (no /en prefix)
    expect(page.url()).toBe('http://localhost:3000/cours');
  });
});
