import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test('should show hamburger menu on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Hamburger button should be visible (using correct aria-label)
    const hamburger = page.locator('button[aria-label="Toggle menu"]');
    await expect(hamburger).toBeVisible();
  });

  test('should open and close mobile menu', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Open menu
    await page.click('button[aria-label="Toggle menu"]');
    
    // Menu should be visible (check for mobile navigation container)
    const mobileNav = page.locator('#mobile-navigation');
    await expect(mobileNav).toBeVisible();
    
    // Close menu by clicking the close button inside the menu
    await page.locator('button[aria-label="Close menu"]').click();
    
    // Menu should be hidden
    await expect(mobileNav).not.toBeVisible();
  });

  test('should navigate to pages from mobile menu', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Open menu
    await page.click('button[aria-label="Toggle menu"]');
    
    // Wait for menu to be visible
    await page.waitForSelector('#mobile-navigation', { state: 'visible' });
    
    // Click on a navigation link (look for link inside mobile nav)
    await page.locator('#mobile-navigation a:has-text("Cours")').click();
    
    // Should navigate to cours page
    await page.waitForURL('**/cours');
    expect(page.url()).toContain('/cours');
  });

  test('should close menu on escape key', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Open menu
    await page.click('button[aria-label="Toggle menu"]');
    
    // Menu should be visible
    const mobileNav = page.locator('#mobile-navigation');
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
    await page.click('button[aria-label="Toggle menu"]');
    
    // Wait for menu to be visible
    await page.waitForSelector('#mobile-navigation', { state: 'visible' });
    
    // Get all navigation links in mobile menu
    const navLinks = page.locator('#mobile-navigation a');
    const count = await navLinks.count();
    
    // Check each link has minimum height
    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      const box = await link.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});
