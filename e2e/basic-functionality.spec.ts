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
    await page.waitForLoadState('domcontentloaded');
    
    // Check no console errors
    expect(errors).toHaveLength(0);
    
    // Check page title exists
    await expect(page).toHaveTitle(/Poney Club/i);
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
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
      await page.waitForURL(`**${link.url}`);
      expect(page.url()).toContain(link.url);
    }
  });

  test('should link the bilingual registration banner to its full event', async ({ page }) => {
    await page.goto('/');
    const frenchOfferLink = page.getByRole('link', { name: "Découvrir l'offre" });
    await expect(frenchOfferLink).toHaveAttribute(
      'href',
      '/actualites#offre-rentree-2026'
    );
    await frenchOfferLink.click();
    await page.waitForURL('**/actualites#offre-rentree-2026');
    await expect(page.locator('#offre-rentree-2026')).toContainText('10 % de réduction');

    await page.goto('/en');
    const englishOfferLink = page.getByRole('link', { name: 'View the offer' });
    await expect(englishOfferLink).toHaveAttribute(
      'href',
      '/en/actualites#offre-rentree-2026'
    );
    await englishOfferLink.click();
    await page.waitForURL('**/en/actualites#offre-rentree-2026');
    await expect(page.locator('#offre-rentree-2026')).toContainText('10% off');
  });

  test('should only show calendar-enabled events in the calendar', async ({ page }) => {
    await page.goto('/en');

    const calendarSection = page.getByRole('heading', { name: 'Upcoming Events' }).locator('..');
    const calendar = calendarSection.locator('.rbc-calendar');
    await expect(calendar).toBeVisible();

    const viewSelector = page.getByRole('group', { name: 'Calendar view selection' });
    await viewSelector.getByRole('button', { name: 'Agenda', exact: true }).click();

    await expect(
      calendarSection.getByText('Summer Half-Board Package - July and August', { exact: true })
    ).toHaveCount(0);
    await expect(
      calendarSection.getByText('Galop Preparation and Assessment Courses', { exact: true })
    ).toHaveCount(0);
    await expect(
      calendarSection.getByText('Special 2026 Registration Offer', { exact: true })
    ).toHaveCount(0);

    const defaultVisibleEvent = calendarSection.getByText(
      "Children's Shetland Courses - Summer Holidays",
      { exact: true }
    );
    await expect(defaultVisibleEvent).toBeVisible();

    await page.goto('/en/actualites');
    await expect(
      page.getByText('Summer Half-Board Package - July and August', { exact: true }).first()
    ).toBeVisible();
    await expect(
      page.getByText('Galop Preparation and Assessment Courses', { exact: true }).first()
    ).toBeVisible();
  });

  test('should display images correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Check hero image loads
    const heroImage = page.locator('img[alt*="Poney"]').first();
    await expect(heroImage).toBeVisible();
    
    // Verify image has loaded (naturalWidth > 0)
    const isLoaded = await heroImage.evaluate((img: HTMLImageElement) => img.naturalWidth > 0);
    expect(isLoaded).toBe(true);
  });

  test('should have accessible skip link', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Focus the skip link by pressing Tab
    await page.keyboard.press('Tab');
    
    // Wait a moment for focus to settle
    await page.waitForTimeout(100);
    
    // Skip link should exist and be focusable
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible();
    
    // Click skip link
    await skipLink.click();
    
    // Main content should exist
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Should have exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // H1 should not be empty
    const h1Text = await page.locator('h1').first().textContent();
    expect(h1Text?.trim().length).toBeGreaterThan(0);
  });

  test('should have contact information in footer', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
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

  test('should load events on actualites page', async ({ page }) => {
    await page.goto('/actualites');
    await page.waitForLoadState('domcontentloaded');
    
    // Page title should be visible
    const pageTitle = page.locator('h1');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText(/Actualités|News/);
    
    // Should have event cards (look for Card components)
    const eventCards = page.locator('[class*="card"]').first();
    await expect(eventCards).toBeVisible({ timeout: 10000 });
  });

  test('should display the September events in French and English', async ({ page }) => {
    await page.goto('/actualites');

    const frenchForum = page.locator('#forum-associations-cadenet-2026');
    await expect(frenchForum).toContainText('Forum des associations de Cadenet');
    await expect(frenchForum).toContainText('Horaires à venir');

    const frenchOpenHouse = page.locator('#portes-ouvertes-2026');
    await expect(frenchOpenHouse).toContainText('Portes ouvertes au club');
    await expect(frenchOpenHouse).toContainText('Dès 14:30');

    await page.goto('/en/actualites');

    const englishForum = page.locator('#forum-associations-cadenet-2026');
    await expect(englishForum).toContainText('Cadenet Associations Forum');
    await expect(englishForum).toContainText('Time to be announced');

    const englishOpenHouse = page.locator('#portes-ouvertes-2026');
    await expect(englishOpenHouse).toContainText('Pony Club Open House');
    await expect(englishOpenHouse).toContainText('From 2:30 PM');
  });

  test('should display animal cards on cavalerie page', async ({ page }) => {
    await page.goto('/cavalerie');
    await page.waitForLoadState('domcontentloaded');
    
    // Page title should be visible
    const pageTitle = page.locator('h1');
    await expect(pageTitle).toBeVisible();
    
    // Should have multiple animal images (look for any images on the page)
    const images = page.locator('img');
    const count = await images.count();
    // Should have at least a few images (hero + animals)
    expect(count).toBeGreaterThan(3);
  });

  test('should have working contact links', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('domcontentloaded');
    
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
    await page.waitForLoadState('domcontentloaded');
    
    // Should have no hydration errors
    expect(hydrationErrors).toHaveLength(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Page should load without horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // +1 for rounding
  });
});
