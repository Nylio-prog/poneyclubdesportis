# Testing Guide - Poney Club Desportis

## Overview

This project includes comprehensive E2E (End-to-End) tests using Playwright to verify all basic functionality automatically.

## Quick Start

### 1. Run All Tests
```bash
npm run test:e2e
```

This will:
- Automatically start the dev server on `localhost:3000`
- Run all E2E tests in headless mode
- Generate an HTML report

### 2. Run Tests with UI (Recommended)
```bash
npm run test:e2e:ui
```

This opens Playwright's UI mode where you can:
- See all tests
- Run tests individually
- Watch tests execute in real-time
- Debug failures easily

### 3. View Test Report
```bash
npm run test:e2e:report
```

## What Gets Tested

### ✅ Language Switching
- Default to French on homepage
- Switch from French to English
- Switch from English back to French
- Language persists across page navigation
- Works on all subpages

### ✅ Mobile Navigation
- Hamburger menu appears on mobile
- Menu opens and closes correctly
- Navigation works from mobile menu
- Escape key closes menu
- Touch targets are 44px minimum

### ✅ Basic Functionality
- Homepage loads without errors
- All navigation links work
- Images load correctly
- Skip link for accessibility
- Proper heading hierarchy (single h1)
- Contact info in footer
- Calendar loads on actualites page
- Animal cards display on cavalerie page
- Contact links (tel:, mailto:) work
- No hydration errors
- Responsive on mobile (no horizontal scroll)

## Test Files

- `e2e/language-switching.spec.ts` - Internationalization tests
- `e2e/mobile-navigation.spec.ts` - Mobile-specific tests
- `e2e/basic-functionality.spec.ts` - Core functionality tests

## Debugging Failed Tests

### Option 1: UI Mode (Easiest)
```bash
npm run test:e2e:ui
```
Click on a failed test to see what went wrong.

### Option 2: Headed Mode
```bash
npm run test:e2e:headed
```
Watch tests run in a real browser window.

### Option 3: Debug Mode
```bash
npx playwright test --debug language-switching
```
Step through tests line by line.

## Common Issues

### Issue: "Target closed" error
**Solution**: Make sure no other process is using port 3000
```bash
# Kill any process on port 3000
npx kill-port 3000
```

### Issue: Tests timeout
**Solution**: Increase timeout in `playwright.config.ts` or specific test:
```typescript
test('my test', async ({ page }) => {
  await page.goto('/', { timeout: 30000 });
});
```

### Issue: Element not found
**Solution**: Add wait for network idle:
```typescript
await page.waitForLoadState('networkidle');
```

## CI/CD

To run tests in CI:
```bash
CI=true npm run test:e2e
```

## Adding New Tests

1. Create a new file in `e2e/` directory
2. Follow the pattern in existing tests
3. Run your test: `npx playwright test your-test.spec.ts`

Example:
```typescript
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test('should work correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Your test code here
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

## Manual Testing Checklist

While E2E tests cover most functionality, you should also manually test:

- [ ] Language switcher works on all pages
- [ ] Mobile menu animations are smooth
- [ ] Images load with proper optimization
- [ ] Calendar events display correctly
- [ ] Contact links open correct apps (phone, email)
- [ ] All pages are accessible via keyboard
- [ ] No console errors in browser DevTools
- [ ] Site works on real mobile devices

## Performance Testing

For performance testing, use Lighthouse:
```bash
npm run build
npm start
# In another terminal:
node scripts/run-lighthouse.js
```

## Accessibility Testing

E2E tests include basic accessibility checks:
- Skip link functionality
- Heading hierarchy
- ARIA labels on interactive elements

For comprehensive accessibility testing, use:
- Browser DevTools Accessibility panel
- axe DevTools extension
- Manual keyboard navigation testing

## Resources

- [Playwright Documentation](https://playwright.dev)
- [E2E Test README](./e2e/README.md)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
