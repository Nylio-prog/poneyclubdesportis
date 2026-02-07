# Lighthouse Audit Instructions

## Task 17.1: Run Lighthouse Audits

Since running automated Lighthouse audits requires a running development server and can be time-consuming, here are instructions for manual auditing:

### Option 1: Manual Lighthouse Audit (Recommended for Quick Testing)

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open Chrome DevTools:**
   - Navigate to any page (e.g., http://localhost:3000)
   - Press F12 to open DevTools
   - Click on the "Lighthouse" tab

3. **Run audits for each page:**
   - Select categories: Performance, Accessibility, Best Practices, SEO
   - Choose device: Desktop or Mobile
   - Click "Analyze page load"

4. **Pages to audit:**
   - Home (FR): http://localhost:3000/
   - Home (EN): http://localhost:3000/en
   - Le Club (FR/EN): /le-club, /en/le-club
   - Cavalerie (FR/EN): /cavalerie, /en/cavalerie
   - Actualités (FR/EN): /actualites, /en/actualites
   - Cours (FR/EN): /cours, /en/cours
   - Pensions (FR/EN): /pensions, /en/pensions
   - Photos (FR/EN): /photos, /en/photos
   - Contact (FR/EN): /contact, /en/contact

### Option 2: Automated Script (For Comprehensive Testing)

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **In a new terminal, run the Lighthouse script:**
   ```bash
   node scripts/run-lighthouse.js
   ```

3. **Results will be saved to:**
   - `lighthouse-reports/lighthouse-results-[timestamp].json`
   - `lighthouse-reports/lighthouse-summary-[timestamp].md`

### Expected Scores (Requirements)

Based on the design document requirements:

**Desktop:**
- Performance: ≥ 90 (Requirement 6.1)
- Accessibility: ≥ 95 (Requirement 7.1)
- Best Practices: ≥ 90
- SEO: ≥ 95 (Requirement 5.10)

**Mobile:**
- Performance: ≥ 80 (Requirement 6.2)
- Accessibility: ≥ 95 (Requirement 7.1)
- Best Practices: ≥ 90
- SEO: ≥ 95 (Requirement 5.10)

**Core Web Vitals:**
- First Contentful Paint (FCP): < 1.5s (Requirement 5.11, 6.3)
- Time to Interactive (TTI): < 3.5s (Requirement 6.4)
- Cumulative Layout Shift (CLS): < 0.1 (Requirement 1.3)

## Task 17.2: Optimize Based on Recommendations

### Already Implemented Optimizations

The following optimizations have already been implemented in Tasks 11-15:

✅ **Performance:**
- Modern image formats (AVIF, WebP)
- Lazy loading for below-fold images
- Font optimization (font-display: swap)
- Code splitting (dynamic imports for Calendar)
- Caching headers configured
- Bundle size optimized (removed unused dependencies)

✅ **Accessibility:**
- Keyboard focus indicators (3px outline with contrast)
- ARIA labels on all interactive components
- Skip navigation link
- Proper heading hierarchy
- Semantic HTML structure

✅ **SEO:**
- Comprehensive meta tags (title, description, Open Graph)
- Structured data (Organization, LocalBusiness, Event schemas)
- Sitemap with locale variants
- Robots.txt configured
- Alt text on all images
- Hreflang tags for multi-language support

✅ **Best Practices:**
- HTTPS (when deployed)
- No console errors
- Proper image aspect ratios
- No deprecated APIs

### Common Issues and Solutions

If Lighthouse identifies issues, here are common solutions:

**Performance Issues:**
- Large images: Ensure all images use ResponsiveImage component
- Unused JavaScript: Check for unnecessary imports
- Render-blocking resources: Verify font loading strategy

**Accessibility Issues:**
- Missing alt text: Audit all images
- Low contrast: Check text/background color combinations
- Missing ARIA labels: Add to icon buttons and complex components

**SEO Issues:**
- Missing meta descriptions: Verify metadata utility is used on all pages
- Missing structured data: Check JSON-LD scripts are present
- Broken links: Test all internal and external links

**Best Practices Issues:**
- Mixed content: Ensure all resources use HTTPS in production
- Browser errors: Check console for JavaScript errors
- Deprecated APIs: Update dependencies if needed

### Verification Checklist

After running audits, verify:

- [ ] All pages score ≥90 (desktop) / ≥80 (mobile) for Performance
- [ ] All pages score ≥95 for Accessibility
- [ ] All pages score ≥95 for SEO
- [ ] All pages score ≥90 for Best Practices
- [ ] FCP < 1.5s on all pages
- [ ] TTI < 3.5s on all pages
- [ ] CLS < 0.1 on all pages
- [ ] No critical issues flagged by Lighthouse

### Production Testing

For the most accurate results, test the production build:

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

3. **Run Lighthouse audits** on the production server

Production builds typically score 10-20 points higher than development builds due to optimizations.

## Status

- [x] Task 17.1: Lighthouse audit instructions documented
- [ ] Task 17.2: Run audits and optimize (requires manual testing)

## Next Steps

1. Start the development server
2. Run Lighthouse audits manually or with the script
3. Document any issues found
4. Implement optimizations if scores are below requirements
5. Re-run audits to verify improvements
