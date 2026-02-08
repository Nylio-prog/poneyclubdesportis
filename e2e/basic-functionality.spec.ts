import { test, expect } from '@playwright/test';

test.describe('Basic Website Functionality', () => {
  test('should load homepage without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check no console errors
    expect(errors).toHaveLength(0);
    
    // Check page title exists
    await expect(page).toHaveTitle(/Poney Club/i);
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test each main navigation link
    const links = [
      { text: 'Le Club', url: '/le-club' },
      { text: 'Cours', url: '/cours' },
      { text: 'Cavalerie', url: '/cavalerie' },
      { text: 'Pensions', url: '/pensions' },
      { text: 'Actualités', url: '/actualites' },
      { text: 'Photos', url: '/photos' },
      { text: 'Contact', url: '/contact' },
    ];
    
    for (const link of links) {
      await page.goto('/');
      await page.click(`text=${link.text}`);
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain(link.url);
    }
  });

  test('should display images correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check hero image loads
    const heroImage = page.locator('img[alt*="Poney"]').first();
    await expect(heroImage).toBeVisible();
    
    // Verify image has loaded (naturalWidth > 0)
    const isLoaded = await heroImage.evaluate((img: HTMLImageElement) => img.naturalWidth > 0);
    expect(isLoaded).toBe(true);
  });

  test('should have accessible skip link', async ({ page }) => {
    await page.goto('/');
    
    // Tab to skip link
    await page.keyboard.press('Tab');
    
    // Skip link should be focused
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();
    
    // Click skip link
    await skipLink.click();
    
    // Main content should be focused
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should have exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // H1 should not be empty
    const h1Text = await page.locator('h1').first().textContent();
    expect(h1Text?.trim().length).toBeGreaterThan(0);
  });

  test('should have contact information in footer', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check footer exists
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check for phone link
    const phoneLink = footer.locator('a[href^="tel:"]');
    await expect(phoneLink).toBeVisible();
    
    // Check for email link
    const emailLink = footer.locator('a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();
  });

  test('should load calendar on actualites page', async ({ page }) => {
    await page.goto('/actualites');
    await page.waitForLoadState('networkidle');
    
    // Calendar should be visible
    const calendar = page.locator('[class*="calendar"]').first();
    await expect(calendar).toBeVisible({ timeout: 10000 });
  });

  test('should display animal cards on cavalerie page', async ({ page }) => {
    await page.goto('/cavalerie');
    await page.waitForLoadState('networkidle');
    
    // Should have multiple animal cards
    const animalCards = page.locator('[class*="animal"]');
    const count = await animalCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have working contact links', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    
    // Phone link should exist and have correct format
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();
    const phoneHref = await phoneLink.getAttribute('href');
    expect(phoneHref).toMatch(/^tel:\+?[\d\s]+$/);
    
    // Email link should exist and have correct format
    const emailLink = page.locator('a[href^="mailto:"]').first();
    await expect(emailLink).toBeVisible();
    const emailHref = await emailLink.getAttribute('href');
    expect(emailHref).toMatch(/^mailto:.+@.+\..+$/);
  });

  test('should have no hydration errors', async ({ page }) => {
    const hydrationErrors: string[] = [];
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('hydration') || text.includes('Hydration')) {
        hydrationErrors.push(text);
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should have no hydration errors
    expect(hydrationErrors).toHaveLength(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Page should load without horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // +1 for rounding
  });
});
