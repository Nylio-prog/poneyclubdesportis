# Lighthouse Manual Audit Checklist

## Pages to Audit

### French Pages
- [ ] Homepage: http://localhost:3000/
- [ ] Le Club: http://localhost:3000/le-club
- [ ] Photos: http://localhost:3000/photos
- [ ] Cavalerie: http://localhost:3000/cavalerie
- [ ] Actualités: http://localhost:3000/actualites
- [ ] Cours: http://localhost:3000/cours
- [ ] Pensions: http://localhost:3000/pensions
- [ ] Contact: http://localhost:3000/contact

### English Pages
- [ ] Homepage: http://localhost:3000/en
- [ ] Le Club: http://localhost:3000/en/le-club
- [ ] Photos: http://localhost:3000/en/photos
- [ ] Cavalerie: http://localhost:3000/en/cavalerie
- [ ] Actualités: http://localhost:3000/en/actualites
- [ ] Cours: http://localhost:3000/en/cours
- [ ] Pensions: http://localhost:3000/en/pensions
- [ ] Contact: http://localhost:3000/en/contact

## Audit Configurations

### Desktop Configuration
- Form Factor: Desktop
- Screen: 1350x940
- Throttling: Fast 3G (40ms RTT, 10240 Kbps)
- CPU: No slowdown

### Mobile Configuration
- Form Factor: Mobile
- Screen: 375x667
- Throttling: Slow 4G (150ms RTT, 1638.4 Kbps)
- CPU: 4x slowdown

## Metrics to Record

For each page and configuration, record:

### Performance
- [ ] Performance Score (Target: ≥90 desktop, ≥80 mobile)
- [ ] First Contentful Paint (Target: ≤1.5s)
- [ ] Largest Contentful Paint (Target: ≤2.5s)
- [ ] Time to Interactive (Target: ≤3.5s)
- [ ] Cumulative Layout Shift (Target: ≤0.1)
- [ ] Total Blocking Time

### Accessibility
- [ ] Accessibility Score (Target: ≥95)
- [ ] Color contrast issues
- [ ] ARIA attribute issues
- [ ] Form label issues
- [ ] Heading hierarchy issues
- [ ] Alt text issues

### Best Practices
- [ ] Best Practices Score (Target: ≥90)
- [ ] HTTPS usage
- [ ] Console errors
- [ ] Image aspect ratio issues
- [ ] Deprecated APIs

### SEO
- [ ] SEO Score (Target: ≥95)
- [ ] Meta description
- [ ] Title tag
- [ ] Crawlable links
- [ ] robots.txt
- [ ] Structured data
- [ ] hreflang tags

## How to Run Manual Audit

1. Open Chrome/Edge DevTools (F12)
2. Go to Lighthouse tab
3. Select categories: Performance, Accessibility, Best Practices, SEO
4. Select device: Desktop or Mobile
5. Click "Analyze page load"
6. Record scores and issues
7. Export report (JSON or HTML)

## Common Issues to Check

### Performance
- [ ] Unoptimized images
- [ ] Large JavaScript bundles
- [ ] Render-blocking resources
- [ ] Unused CSS/JS
- [ ] Missing cache headers
- [ ] No lazy loading for images

### Accessibility
- [ ] Missing alt text on images
- [ ] Insufficient color contrast
- [ ] Missing ARIA labels
- [ ] Form inputs without labels
- [ ] Skipped heading levels
- [ ] No focus indicators

### SEO
- [ ] Missing meta descriptions
- [ ] Title too long/short
- [ ] Missing structured data
- [ ] No hreflang tags
- [ ] Images without alt text
- [ ] Non-crawlable links

## Automated Audit (When Available)

If automated audits work, use:
```bash
# Desktop audit
npx lighthouse http://localhost:3000/ --preset=desktop --output=html --output-path=./lighthouse-reports/home-desktop.html

# Mobile audit
npx lighthouse http://localhost:3000/ --output=html --output-path=./lighthouse-reports/home-mobile.html
```

## Notes

- Run audits on production build for accurate results
- Clear cache between audits
- Close other tabs to reduce interference
- Run multiple times and average results
- Focus on consistent issues across pages
