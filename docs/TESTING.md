# Testing Guide - Poney Club Desportis

## Overview

This project includes comprehensive E2E (End-to-End) tests using Playwright to verify all basic functionality automatically.

## Quick Start

### 1. Run All Tests (Automatic Server Management)
```bash
npm run test:e2e
```

This will:
- Automatically start the dev server on `localhost:3000`
- Run all E2E tests in headless mode
- Generate an HTML report
- **Note**: May hang at the end - press Ctrl+C to exit after tests complete

### 2. Run Tests Against Running Server (Recommended)
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run tests
npm run test:e2e:no-server
```

This approach:
- Gives you full control over the dev server
- Tests exit cleanly when complete
- Faster for iterative testing

### 3. Run Tests with UI (Best for Debugging)
```bash
npm run test:e2e:ui
```

This opens Playwright's UI mode where you can:
- See all tests
- Run tests individually
- Watch tests execute in real-time
- Debug failures easily

### 4. View Test Report
```bash
npm run test:e2e:report
```

### 5. Run Tests with Coverage
```bash
npm run test:e2e:coverage
```

Generates both HTML and JSON reports for test coverage analysis.

## What Gets Tested

### ✅ Language Switching (5 tests)
- Default to French on homepage
- Switch from French to English
- Switch from English back to French
- Language persists across page navigation
- Works on all subpages

### ✅ Mobile Navigation (5 tests)
- Hamburger menu appears on mobile
- Menu opens and closes correctly
- Navigation works from mobile menu
- Escape key closes menu
- Touch targets are 44px minimum (accessibility)

### ✅ Basic Functionality (11 tests)
- Homepage loads without errors
- All navigation links work (7 pages)
- Images load correctly
- Skip link for accessibility
- Proper heading hierarchy (single h1)
- Contact info in footer
- Events display on actualites page
- Animal cards display on cavalerie page
- Contact links (tel:, mailto:) work correctly
- No hydration errors
- Responsive on mobile (no horizontal scroll)

**Total: 21 E2E tests**

## Test Files

- `e2e/language-switching.spec.ts` - Internationalization tests (5 tests)
- `e2e/mobile-navigation.spec.ts` - Mobile-specific tests (5 tests)
- `e2e/basic-functionality.spec.ts` - Core functionality tests (11 tests)

## Configuration Files

- `playwright.config.ts` - Main config with automatic server management
- `playwright.config.no-server.ts` - Config for running against existing server

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

### Issue: Tests hang at the end
**Solution**: Use the no-server config or press Ctrl+C after tests complete
```bash
npm run test:e2e:no-server
```

### Issue: "Target closed" error
**Solution**: Make sure no other process is using port 3000
```bash
# Kill any process on port 3000
npx kill-port 3000
```

### Issue: Tests timeout
**Solution**: Timeout is set to 30 seconds per test. If needed, increase in `playwright.config.ts`:
```typescript
timeout: 60000, // 60 seconds
```

### Issue: Element not found
**Solution**: Tests already include proper waits. If issues persist, check:
- Element selector is correct
- Element is actually rendered on the page
- No JavaScript errors preventing render

## CI/CD

To run tests in CI:
```bash
CI=true npm run test:e2e
```

In CI mode:
- Retries failed tests 2 times
- Uses single worker (no parallelization)
- Starts fresh server (doesn't reuse existing)

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

## Test Improvements Made

### Recent Fixes (February 2026)
1. **Language Switching Tests**
   - Fixed flag emoji references (🇫🇷/🇬🇧 → "FR"/"EN")
   - Added `.first()` for language switcher (appears twice: desktop + mobile)
   - Added proper wait for HTML lang attribute updates
   - Fixed dropdown interactions

2. **Mobile Navigation Tests**
   - Updated ARIA label from "Open menu" to "Toggle menu"
   - Changed selector from `[role="dialog"]` to `#mobile-navigation`
   - All mobile tests now pass reliably

3. **Basic Functionality Tests**
   - Renamed "calendar" test to "events" (page uses event cards)
   - Updated selectors to match actual page structure
   - Added proper waits for dynamic content

4. **Configuration Improvements**
   - Added 30-second timeout per test
   - Added 10-second action timeout
   - Created separate config for running without server management
   - Added coverage script

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
- Touch target sizes (44px minimum)

For comprehensive accessibility testing, use:
- Browser DevTools Accessibility panel
- axe DevTools extension
- Manual keyboard navigation testing

## Resources

- [Playwright Documentation](https://playwright.dev)
- [E2E Test README](../e2e/README.md)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

