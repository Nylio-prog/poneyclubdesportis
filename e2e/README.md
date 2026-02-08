# E2E Tests for Poney Club Desportis

This directory contains end-to-end tests using Playwright to verify the website's functionality.

## Running Tests

### Prerequisites
Make sure Playwright browsers are installed:
```bash
npx playwright install chromium
```

### Run all tests (headless)
```bash
npm run test:e2e
```

### Run tests with UI mode (recommended for development)
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### View test report
```bash
npm run test:e2e:report
```

## Test Suites

### 1. Language Switching (`language-switching.spec.ts`)
Tests the internationalization functionality:
- ✅ Default to French on homepage
- ✅ Switch from French to English
- ✅ Switch from English back to French
- ✅ Maintain language when navigating between pages
- ✅ Work on subpages (e.g., cours page)

### 2. Mobile Navigation (`mobile-navigation.spec.ts`)
Tests mobile-specific functionality:
- ✅ Show hamburger menu on mobile
- ✅ Open and close mobile menu
- ✅ Navigate to pages from mobile menu
- ✅ Close menu on escape key
- ✅ Touch-friendly menu items (min 44px height)

### 3. Basic Functionality (`basic-functionality.spec.ts`)
Tests core website features:
- ✅ Load homepage without errors
- ✅ Working navigation links
- ✅ Display images correctly
- ✅ Accessible skip link
- ✅ Proper heading hierarchy
- ✅ Contact information in footer
- ✅ Load calendar on actualites page
- ✅ Display animal cards on cavalerie page
- ✅ Working contact links (tel:, mailto:)
- ✅ No hydration errors
- ✅ Responsive on mobile

## Test Configuration

Tests are configured in `playwright.config.ts`:
- **Base URL**: http://localhost:3000
- **Browser**: Chromium (Chrome)
- **Web Server**: Automatically starts `npm run dev` before tests
- **Screenshots**: Captured on failure
- **Traces**: Captured on first retry

## Debugging Tests

### Debug a specific test
```bash
npx playwright test --debug language-switching
```

### Debug in UI mode
```bash
npm run test:e2e:ui
```

### View traces
If a test fails, traces are automatically captured. View them with:
```bash
npx playwright show-trace trace.zip
```

## CI/CD Integration

Tests can be run in CI with:
```bash
CI=true npm run test:e2e
```

This will:
- Run tests with 2 retries
- Use a single worker
- Fail if `.only` is used in tests

## Writing New Tests

1. Create a new file in `e2e/` directory: `my-feature.spec.ts`
2. Import test utilities:
   ```typescript
   import { test, expect } from '@playwright/test';
   ```
3. Write your tests:
   ```typescript
   test.describe('My Feature', () => {
     test('should do something', async ({ page }) => {
       await page.goto('/');
       // ... test code
     });
   });
   ```

## Best Practices

1. **Wait for network idle**: Use `await page.waitForLoadState('networkidle')` after navigation
2. **Use semantic selectors**: Prefer `text=`, `role=`, `aria-label` over CSS selectors
3. **Check for visibility**: Use `await expect(element).toBeVisible()` before interacting
4. **Handle timeouts**: Increase timeout for slow operations: `{ timeout: 10000 }`
5. **Clean state**: Each test should be independent and not rely on previous tests

## Troubleshooting

### Tests fail with "Target closed"
- Make sure dev server is running
- Increase timeout in `playwright.config.ts`

### Tests fail with "Element not found"
- Add `await page.waitForLoadState('networkidle')`
- Increase timeout for slow-loading elements

### Hydration errors in tests
- Check browser console in headed mode: `npm run test:e2e:headed`
- Fix hydration issues in the code

## Coverage

Current test coverage:
- ✅ Language switching (French ↔ English)
- ✅ Mobile navigation
- ✅ All page routes
- ✅ Image loading
- ✅ Accessibility features
- ✅ Contact links
- ✅ Calendar functionality
- ✅ Animal cards
- ✅ No console errors
- ✅ No hydration errors
- ✅ Responsive design
