import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
  test('should default to French on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check URL is French (no /en prefix)
    expect(page.url()).toBe('http://localhost:3000/');
    
    // Check HTML lang attribute
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('fr');
    
    // Check French flag is visible in language switcher
    const languageSwitcher = page.locator('button[aria-label="Change language"]');
    await expect(languageSwitcher).toBeVisible();
    await expect(languageSwitcher).toContainText('🇫🇷');
  });

  test('should switch from French to English', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Click language switcher
    await page.click('button[aria-label="Change language"]');
    
    // Wait for dropdown to appear
    await page.waitForSelector('text=English', { state: 'visible' });
    
    // Click English option
    await page.click('text=English');
    
    // Wait for navigation
    await page.waitForURL('**/en');
    await page.waitForLoadState('networkidle');
    
    // Verify URL has /en prefix
    expect(page.url()).toBe('http://localhost:3000/en');
    
    // Verify HTML lang attribute changed
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('en');
    
    // Verify English flag is now shown
    const languageSwitcher = page.locator('button[aria-label="Change language"]');
    await expect(languageSwitcher).toContainText('🇬🇧');
  });

  test('should switch from English back to French', async ({ page }) => {
    // Start on English page
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Verify we're on English
    expect(page.url()).toBe('http://localhost:3000/en');
    
    // Click language switcher
    await page.click('button[aria-label="Change language"]');
    
    // Wait for dropdown
    await page.waitForSelector('text=Français', { state: 'visible' });
    
    // Click French option
    await page.click('text=Français');
    
    // Wait for navigation
    await page.waitForURL('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    
    // Verify URL has no /en prefix (French default)
    expect(page.url()).toBe('http://localhost:3000/');
    
    // Verify HTML lang attribute changed
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('fr');
    
    // Verify French flag is now shown
    const languageSwitcher = page.locator('button[aria-label="Change language"]');
    await expect(languageSwitcher).toContainText('🇫🇷');
  });

  test('should maintain language when navigating between pages', async ({ page }) => {
    // Switch to English
    await page.goto('/');
    await page.click('button[aria-label="Change language"]');
    await page.click('text=English');
    await page.waitForURL('**/en');
    
    // Navigate to another page
    await page.click('text=Lessons');
    await page.waitForLoadState('networkidle');
    
    // Verify still on English
    expect(page.url()).toContain('/en/cours');
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('en');
  });

  test('should work on subpages (cours page)', async ({ page }) => {
    // Go to French cours page
    await page.goto('/cours');
    await page.waitForLoadState('networkidle');
    
    // Switch to English
    await page.click('button[aria-label="Change language"]');
    await page.click('text=English');
    await page.waitForURL('**/en/cours');
    
    // Verify on English cours page
    expect(page.url()).toBe('http://localhost:3000/en/cours');
    
    // Switch back to French
    await page.click('button[aria-label="Change language"]');
    await page.click('text=Français');
    await page.waitForURL('**/cours');
    
    // Verify back on French cours page (no /en prefix)
    expect(page.url()).toBe('http://localhost:3000/cours');
  });
});
