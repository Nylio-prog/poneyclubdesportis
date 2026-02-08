import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test('should show hamburger menu on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Hamburger button should be visible
    const hamburger = page.locator('button[aria-label="Open menu"]');
    await expect(hamburger).toBeVisible();
  });

  test('should open and close mobile menu', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Open menu
    await page.click('button[aria-label="Open menu"]');
    
    // Menu should be visible
    const mobileNav = page.locator('[role="dialog"]');
    await expect(mobileNav).toBeVisible();
    
    // Close button should be visible
    const closeButton = page.locator('button[aria-label="Close menu"]');
    await expect(closeButton).toBeVisible();
    
    // Close menu
    await closeButton.click();
    
    // Menu should be hidden
    await expect(mobileNav).not.toBeVisible();
  });

  test('should navigate to pages from mobile menu', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Open menu
    await page.click('button[aria-label="Open menu"]');
    
    // Click on a navigation link
    await page.click('text=Cours');
    
    // Should navigate to cours page
    await page.waitForURL('**/cours');
    expect(page.url()).toContain('/cours');
  });

  test('should close menu on escape key', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Open menu
    await page.click('button[aria-label="Open menu"]');
    
    // Menu should be visible
    const mobileNav = page.locator('[role="dialog"]');
    await expect(mobileNav).toBeVisible();
    
    // Press escape
    await page.keyboard.press('Escape');
    
    // Menu should be hidden
    await expect(mobileNav).not.toBeVisible();
  });

  test('should have touch-friendly menu items (min 44px)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Open menu
    await page.click('button[aria-label="Open menu"]');
    
    // Get all navigation links
    const navLinks = page.locator('[role="dialog"] a');
    const count = await navLinks.count();
    
    // Check each link has minimum height
    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      const box = await link.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
    }
  });
});
