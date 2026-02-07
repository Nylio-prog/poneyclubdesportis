# Implementation Plan: Poney Club Desportis Website Improvements

## Overview

This implementation plan breaks down the website improvements into discrete, actionable tasks. The approach follows a phased strategy: foundation (i18n setup), mobile optimization, component enhancements, performance/SEO, and testing. Each task builds incrementally on previous work, with property-based tests integrated close to implementation to catch errors early.

## Tasks

- [x] 1. Set up internationalization infrastructure
  - [x] 1.1 Install and configure next-intl library
    - Install next-intl package
    - Create `lib/i18n/config.ts` with locale configuration (fr, en)
    - Create `lib/i18n/request.ts` for server-side i18n utilities
    - Create `lib/i18n/routing.ts` for locale routing utilities
    - _Requirements: 2.1_

  - [x] 1.2 Create proxy for locale detection and routing
    - Create `proxy.ts` in app root (renamed from middleware.ts in Next.js 16)
    - Implement locale detection from URL, cookie, and Accept-Language header
    - Implement automatic redirection to appropriate locale
    - Set locale cookie with 1-year expiration
    - _Requirements: 2.2, 2.4, 2.9_

  - [x] 1.3 Create base translation files
    - Create `messages/fr.json` with all existing French content
    - Create `messages/en.json` with English translations
    - Include navigation, page content, calendar, animals, and contact sections
    - Ensure consistent key structure between files
    - _Requirements: 2.1, 2.5, 2.6_

  - [x] 1.4 Restructure app directory for locale routing
    - Create `app/[locale]` directory
    - Move existing route folders into `[locale]` directory
    - Update `app/[locale]/layout.tsx` to use locale-aware translations
    - Update `app/layout.tsx` as root layout
    - _Requirements: 2.1_

  - [ ]* 1.5 Write property test for translation coverage
    - **Property 11: Comprehensive Translation Coverage**
    - **Validates: Requirements 2.5, 2.6, 2.7, 4.10, 8.5, 9.7**

  - [ ]* 1.6 Write property test for locale persistence
    - **Property 10: Locale Persistence Round Trip**
    - **Validates: Requirements 2.4**

- [x] 2. Implement language switcher component
  - [x] 2.1 Create LanguageSwitcher component
    - Create `components/LanguageSwitcher.tsx`
    - Implement toggle between fr and en locales
    - Use Next.js useRouter and usePathname for navigation
    - Display current language flag/icon
    - Add keyboard navigation support
    - Add ARIA labels for accessibility
    - _Requirements: 2.3, 2.8_

  - [x] 2.2 Integrate language switcher into header
    - Update `components/Header.tsx` to include LanguageSwitcher
    - Position switcher in header (visible on all pages)
    - Ensure responsive styling for mobile and desktop
    - _Requirements: 2.8_

  - [ ]* 2.3 Write property test for language switching performance
    - **Property 9: Language Switching Performance**
    - **Validates: Requirements 2.3**

  - [ ]* 2.4 Write unit tests for LanguageSwitcher component
    - Test rendering in both locales
    - Test click interaction and navigation
    - Test keyboard navigation
    - Test ARIA attributes
    - _Requirements: 2.3, 2.8_

- [x] 3. Enhance data models with i18n support
  - [x] 3.1 Update events data model
    - Modify `data/events.ts` Event interface
    - Add optional titleEn and descriptionEn fields
    - Add English translations to existing events
    - Add category field for event types
    - _Requirements: 2.5, 10.2, 10.5, 10.10_

  - [x] 3.2 Update animals data model
    - Modify `data/animals.ts` Animal interface
    - Add optional descriptionEn and breedEn fields
    - Add English translations to existing animals
    - Add age and breed fields where applicable
    - _Requirements: 2.5, 8.1_

  - [ ]* 3.3 Write property test for event chronological sorting
    - **Property 50: Event Chronological Sorting**
    - **Validates: Requirements 10.6**

- [x] 4. Checkpoint - Ensure i18n foundation works
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Optimize mobile navigation
  - [x] 5.1 Create mobile navigation component
    - Create `components/mobile/MobileNav.tsx`
    - Implement slide-in menu with Framer Motion
    - Add overlay backdrop with blur effect
    - Implement focus trap when open
    - Add escape key and backdrop click to close
    - Prevent body scroll when menu is open
    - _Requirements: 1.4_

  - [x] 5.2 Update Header component for mobile
    - Update `components/Header.tsx` with hamburger icon
    - Show hamburger menu below 768px breakpoint
    - Integrate MobileNav component
    - Ensure touch-friendly menu items (min 44px height)
    - _Requirements: 1.2, 1.4_

  - [ ]* 5.3 Write property test for navigation animation performance
    - **Property 4: Navigation Animation Performance**
    - **Validates: Requirements 1.4**

  - [ ]* 5.4 Write property test for touch target sizes
    - **Property 2: Touch Target Minimum Size**
    - **Validates: Requirements 1.2, 3.9**

  - [ ]* 5.5 Write unit tests for mobile navigation
    - Test menu open/close behavior
    - Test keyboard interactions (escape key)
    - Test focus trap
    - Test body scroll prevention
    - _Requirements: 1.4_

- [x] 6. Implement responsive image component
  - [x] 6.1 Create ResponsiveImage component
    - Create `components/ResponsiveImage.tsx`
    - Wrap Next.js Image component with optimized defaults
    - Set default sizes prop for responsive behavior
    - Add blur placeholder support
    - Add priority prop for above-fold images
    - Support custom objectFit and objectPosition
    - _Requirements: 1.5, 1.8, 6.5, 6.6_

  - [x] 6.2 Replace existing Image components
    - Update hero section to use ResponsiveImage
    - Update animal cards to use ResponsiveImage
    - Update event images to use ResponsiveImage
    - Update photo gallery to use ResponsiveImage
    - Set appropriate priority for above-fold images
    - _Requirements: 1.8, 6.5, 6.6_

  - [ ]* 6.3 Write property test for image optimization
    - **Property 6: Image Optimization**
    - **Validates: Requirements 1.8, 6.5, 6.6, 8.6**

- [x] 7. Enhance calendar component for mobile
  - [x] 7.1 Add responsive view switching to Calendar
    - Update `components/Calendar.tsx`
    - Implement useMediaQuery hook for breakpoint detection
    - Show month view on desktop (≥768px)
    - Show agenda/list view on mobile (<768px)
    - Add view toggle button for user preference
    - _Requirements: 1.6, 4.1, 4.2_

  - [x] 7.2 Create mobile-friendly event list view
    - Create event card component for list view
    - Display events chronologically in cards
    - Include event image, title, date, time in cards
    - Make cards touch-friendly with adequate spacing
    - _Requirements: 1.6, 4.1, 4.2_

  - [x] 7.3 Implement event details modal
    - Create event modal component
    - Show full event details on click
    - Display title, date, time, description, image
    - Support translated content based on locale
    - Add close button and backdrop click to close
    - _Requirements: 4.3, 4.4_

  - [x] 7.4 Add locale-aware date formatting
    - Use date-fns with locale support
    - Format dates according to selected locale
    - Use 24-hour format for French, 12-hour for English
    - Highlight current date in calendar
    - _Requirements: 2.10, 4.5, 4.9_

  - [x] 7.5 Implement past event visual distinction
    - Add logic to identify past events (endDate < today)
    - Apply different styling (opacity, grayscale, or color)
    - Optionally filter past events from main view
    - _Requirements: 4.8, 10.7_

  - [ ]* 7.6 Write property test for multi-day event rendering
    - **Property 21: Multi-Day Event Rendering**
    - **Validates: Requirements 4.7**

  - [ ]* 7.7 Write property test for past event visual distinction
    - **Property 22: Past Event Visual Distinction**
    - **Validates: Requirements 4.8**

  - [ ]* 7.8 Write property test for event time format by locale
    - **Property 23: Event Time Format by Locale**
    - **Validates: Requirements 4.9**

  - [ ]* 7.9 Write unit tests for calendar component
    - Test view switching at breakpoint
    - Test event modal opening/closing
    - Test date formatting for both locales
    - Test past event filtering
    - _Requirements: 4.1, 4.2, 4.3, 4.8_

- [x] 8. Checkpoint - Ensure mobile experience is optimized
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Enhance animal card components
  - [x] 9.1 Create enhanced AnimalCard component
    - Create or update `components/AnimalCard.tsx`
    - Display name, image, description, age, breed
    - Support translated descriptions based on locale
    - Add hover scale animation for desktop (1.02x)
    - Add touch feedback for mobile
    - Use ResponsiveImage for animal photos
    - _Requirements: 8.1, 8.2, 8.4, 8.5, 8.6_

  - [x] 9.2 Add visual distinction for retired animals
    - Add category prop to AnimalCard
    - Apply special styling for retired category
    - Add border, badge, or opacity to indicate retired status
    - _Requirements: 8.9_

  - [x] 9.3 Update cavalerie page with responsive grid
    - Update `app/[locale]/cavalerie/page.tsx`
    - Organize animals into sections (horses, ponies, retired, other)
    - Use responsive grid: 1 column mobile, 2-3 columns desktop
    - Ensure consistent card styling across categories
    - _Requirements: 8.3, 8.7, 8.8, 8.10_

  - [ ]* 9.4 Write property test for animal profile data display
    - **Property 44: Animal Profile Data Display**
    - **Validates: Requirements 8.1, 8.2**

  - [ ]* 9.5 Write property test for retired animal visual distinction
    - **Property 45: Retired Animal Visual Distinction**
    - **Validates: Requirements 8.9**

  - [ ]* 9.6 Write property test for animal card styling consistency
    - **Property 46: Animal Card Styling Consistency**
    - **Validates: Requirements 8.10**

- [x] 10. Improve contact page
  - [x] 10.1 Enhance contact information display
    - Update `app/[locale]/contact/page.tsx`
    - Display phone, email, address, social media links
    - Use tel: protocol for phone numbers
    - Use mailto: protocol for email addresses
    - Add target="_blank" and rel="noopener noreferrer" for external links
    - Support translated labels based on locale
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.7_

  - [x] 10.2 Add embedded map for location
    - Add Google Maps or OpenStreetMap embed
    - Display club location on map
    - Ensure responsive sizing for mobile and desktop
    - _Requirements: 9.6_

  - [x] 10.3 Optimize contact page for mobile
    - Make contact methods large, tappable buttons on mobile
    - Ensure adequate spacing between elements
    - Test on real mobile devices
    - _Requirements: 9.8_

  - [x] 10.4 Update footer with contact information
    - Update `components/Footer.tsx`
    - Include phone, email, address in footer
    - Display on all pages
    - Support translated labels
    - _Requirements: 9.9_

  - [ ]* 10.5 Write property test for contact link protocols
    - **Property 47: Contact Link Protocols**
    - **Validates: Requirements 9.2, 9.3**

  - [ ]* 10.6 Write property test for external link target
    - **Property 48: External Link Target**
    - **Validates: Requirements 9.5**

  - [ ]* 10.7 Write property test for footer contact information
    - **Property 49: Footer Contact Information**
    - **Validates: Requirements 9.9**

- [x] 11. Implement aesthetic improvements
  - [x] 11.1 Create Tailwind design tokens
    - Update `tailwind.config.ts`
    - Define color palette (burgundy shades, ivory)
    - Define spacing scale (8px grid system)
    - Define typography scale
    - Define border radius and shadow tokens
    - _Requirements: 3.5, 3.6, 3.7_

  - [x] 11.2 Apply consistent typography
    - Ensure Geist Sans font is applied globally
    - Set minimum 16px font size for body text on mobile
    - Apply consistent font weights and line heights
    - _Requirements: 3.1, 1.10_

  - [x] 11.3 Add hover transitions to interactive elements
    - Apply CSS transitions to buttons, links, cards
    - Set transition duration to 200ms or less
    - Use ease-in-out timing function
    - _Requirements: 3.2_

  - [x] 11.4 Implement scroll animations
    - Add Framer Motion animations to content sections
    - Use IntersectionObserver for scroll-triggered animations
    - Respect prefers-reduced-motion preference
    - Add subtle entrance animations (fade-in, slide-up)
    - _Requirements: 3.3, 3.10_

  - [x] 11.5 Optimize hero section contrast
    - Ensure text over hero image has sufficient contrast
    - Add overlay or text shadow if needed
    - Test contrast ratio meets WCAG 4.5:1 standard
    - _Requirements: 3.4_

  - [ ]* 11.6 Write property test for typography consistency
    - **Property 15: Typography Consistency**
    - **Validates: Requirements 3.1**

  - [ ]* 11.7 Write property test for hover transition timing
    - **Property 16: Hover Transition Timing**
    - **Validates: Requirements 3.2**

  - [ ]* 11.8 Write property test for text contrast ratio
    - **Property 17: Text Contrast Ratio**
    - **Validates: Requirements 3.4, 7.4**

  - [ ]* 11.9 Write property test for design token consistency
    - **Property 18: Design Token Consistency**
    - **Validates: Requirements 3.5, 3.6**

  - [ ]* 11.10 Write property test for consistent spacing system
    - **Property 7: Consistent Spacing System**
    - **Validates: Requirements 1.9, 3.7**

- [x] 12. Checkpoint - Ensure aesthetic improvements are applied
  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Implement SEO optimizations
  - [x] 13.1 Add comprehensive meta tags to all pages
    - Update metadata in each page's layout or page file
    - Include title (≤60 chars) and description (≤160 chars)
    - Add Open Graph tags for social sharing
    - Add canonical URLs
    - Add hreflang tags for fr and en versions
    - Support locale-specific metadata
    - _Requirements: 5.1, 5.2, 5.6, 5.9, 5.12, 2.7_

  - [x] 13.2 Implement structured data markup
    - Create JSON-LD structured data for Organization
    - Add Event structured data to event pages
    - Add LocalBusiness structured data with location
    - Validate structured data with Google's Rich Results Test
    - _Requirements: 5.3_

  - [x] 13.3 Enhance sitemap generation
    - Update `app/sitemap.ts`
    - Include all public routes
    - Add locale variants for each route
    - Set appropriate priority and changefreq
    - _Requirements: 5.4_

  - [x] 13.4 Verify robots.txt configuration
    - Ensure `app/robots.ts` allows crawling
    - Include sitemap URL
    - _Requirements: 5.5_

  - [x] 13.5 Add alt text to all images
    - Audit all images for alt text
    - Add descriptive alt text where missing
    - Mark decorative images with empty alt=""
    - _Requirements: 5.7, 7.7_

  - [x] 13.6 Ensure semantic HTML structure
    - Audit pages for semantic elements
    - Use header, nav, main, section, article, footer appropriately
    - Ensure proper heading hierarchy (h1 → h2 → h3)
    - _Requirements: 5.8, 7.8_

  - [ ]* 13.7 Write property test for comprehensive meta tags
    - **Property 24: Comprehensive Meta Tags**
    - **Validates: Requirements 5.1, 5.2, 5.6, 5.9, 5.12**

  - [ ]* 13.8 Write property test for structured data presence
    - **Property 25: Structured Data Presence**
    - **Validates: Requirements 5.3**

  - [ ]* 13.9 Write property test for sitemap completeness
    - **Property 26: Sitemap Completeness**
    - **Validates: Requirements 5.4**

  - [ ]* 13.10 Write property test for image alt text coverage
    - **Property 27: Image Alt Text Coverage**
    - **Validates: Requirements 5.7, 7.7**

  - [ ]* 13.11 Write property test for semantic HTML structure
    - **Property 28: Semantic HTML Structure**
    - **Validates: Requirements 5.8**

  - [ ]* 13.12 Write property test for heading hierarchy
    - **Property 42: Heading Hierarchy**
    - **Validates: Requirements 7.8**

- [x] 14. Implement performance optimizations
  - [x] 14.1 Optimize font loading
    - Ensure font-display: swap is set for Geist Sans
    - Preload critical fonts
    - Use font subsetting if possible
    - _Requirements: 6.9_

  - [x] 14.2 Configure Next.js Image optimization
    - Update `next.config.mjs` with image domains
    - Enable image optimization for all images
    - Set appropriate image formats (WebP, AVIF)
    - Configure image sizes for responsive breakpoints
    - _Requirements: 6.5_

  - [x] 14.3 Implement lazy loading for below-fold images
    - Ensure non-priority images have loading="lazy"
    - Use priority prop only for above-fold images
    - Test lazy loading behavior
    - _Requirements: 6.6_

  - [x] 14.4 Enable link prefetching
    - Ensure Next.js Link components have prefetch enabled
    - Test prefetching behavior on hover
    - _Requirements: 6.7_

  - [x] 14.5 Optimize JavaScript bundle size
    - Analyze bundle with Next.js bundle analyzer
    - Implement code splitting where appropriate
    - Remove unused dependencies
    - Ensure initial bundle is under 200KB gzipped
    - _Requirements: 6.8_

  - [x] 14.6 Configure caching headers
    - Set Cache-Control headers for static assets
    - Configure appropriate cache durations
    - Test caching behavior
    - _Requirements: 6.10_

  - [ ]* 14.7 Write property test for link prefetching
    - **Property 34: Link Prefetching**
    - **Validates: Requirements 6.7**

  - [ ]* 14.8 Write property test for JavaScript bundle size
    - **Property 35: JavaScript Bundle Size**
    - **Validates: Requirements 6.8**

  - [ ]* 14.9 Write property test for font display strategy
    - **Property 36: Font Display Strategy**
    - **Validates: Requirements 6.9**

  - [ ]* 14.10 Write property test for static asset caching
    - **Property 37: Static Asset Caching**
    - **Validates: Requirements 6.10**

- [x] 15. Implement accessibility improvements
  - [x] 15.1 Add keyboard focus indicators
    - Define visible focus styles in global CSS
    - Ensure focus indicators have sufficient contrast
    - Test keyboard navigation through all interactive elements
    - _Requirements: 7.2_

  - [x] 15.2 Add ARIA labels to interactive components
    - Add aria-label to icon buttons
    - Add aria-labelledby to complex components
    - Add aria-describedby for additional context
    - _Requirements: 7.3_

  - [x] 15.3 Ensure form accessibility
    - Associate labels with form inputs
    - Add appropriate input types
    - Add error messages with aria-live
    - _Requirements: 7.5_

  - [x] 15.4 Add skip navigation link
    - Create skip-to-content link at top of page
    - Make it visible on keyboard focus
    - Link to main content area
    - _Requirements: 7.6_

  - [x] 15.5 Add ARIA attributes to hamburger menu
    - Add aria-expanded to menu button
    - Add aria-controls linking to menu
    - Add aria-label for screen readers
    - Update aria-expanded on state change
    - _Requirements: 7.10_

  - [x] 15.6 Implement language change announcements
    - Add aria-live region for language changes
    - Announce language change to screen readers
    - _Requirements: 7.9_

  - [ ]* 15.7 Write property test for keyboard focus indicators
    - **Property 39: Keyboard Focus Indicators**
    - **Validates: Requirements 7.2**

  - [ ]* 15.8 Write property test for ARIA label coverage
    - **Property 40: ARIA Label Coverage**
    - **Validates: Requirements 7.3**

  - [ ]* 15.9 Write property test for form label association
    - **Property 41: Form Label Association**
    - **Validates: Requirements 7.5**

  - [ ]* 15.10 Write property test for menu ARIA attributes
    - **Property 43: Menu ARIA Attributes**
    - **Validates: Requirements 7.10**

- [x] 16. Checkpoint - Ensure performance and accessibility standards are met
  - Ensure all tests pass, ask the user if questions arise.

- [x] 17. Run Lighthouse audits and optimize
  - [x] 17.1 Run Lighthouse audits on all pages
    - Run Lighthouse on desktop configuration
    - Run Lighthouse on mobile configuration
    - Document scores for Performance, Accessibility, SEO, Best Practices
    - _Requirements: 5.10, 6.1, 6.2, 7.1_

  - [x] 17.2 Optimize based on Lighthouse recommendations
    - Address any issues flagged by Lighthouse
    - Optimize images, fonts, and assets as needed
    - Fix accessibility issues
    - Improve SEO elements
    - _Requirements: 5.10, 6.1, 6.2, 7.1_

  - [ ]* 17.3 Write property test for Lighthouse SEO score
    - **Property 29: Lighthouse SEO Score**
    - **Validates: Requirements 5.10**

  - [ ]* 17.4 Write property test for Lighthouse Performance score desktop
    - **Property 31: Lighthouse Performance Score Desktop**
    - **Validates: Requirements 6.1**

  - [ ]* 17.5 Write property test for Lighthouse Performance score mobile
    - **Property 32: Lighthouse Performance Score Mobile**
    - **Validates: Requirements 6.2**

  - [ ]* 17.6 Write property test for Lighthouse Accessibility score
    - **Property 38: Lighthouse Accessibility Score**
    - **Validates: Requirements 7.1**

  - [ ]* 17.7 Write property test for First Contentful Paint
    - **Property 30: First Contentful Paint Performance**
    - **Validates: Requirements 5.11, 6.3**

  - [ ]* 17.8 Write property test for Time to Interactive
    - **Property 33: Time to Interactive**
    - **Validates: Requirements 6.4**

  - [ ]* 17.9 Write property test for layout stability
    - **Property 3: Layout Stability**
    - **Validates: Requirements 1.3**

- [ ] 18. Write remaining property-based tests
  - [ ]* 18.1 Write property test for responsive layout adaptation
    - **Property 1: Responsive Layout Adaptation**
    - **Validates: Requirements 1.1, 8.7, 8.8**

  - [ ]* 18.2 Write property test for interactive feedback timing
    - **Property 5: Interactive Feedback Timing**
    - **Validates: Requirements 1.7**

  - [ ]* 18.3 Write property test for minimum body text size
    - **Property 8: Minimum Body Text Size**
    - **Validates: Requirements 1.10**

  - [ ]* 18.4 Write property test for language switcher visibility
    - **Property 12: Language Switcher Visibility**
    - **Validates: Requirements 2.8**

  - [ ]* 18.5 Write property test for locale URL structure
    - **Property 13: Locale URL Structure**
    - **Validates: Requirements 2.9**

  - [ ]* 18.6 Write property test for locale-aware date formatting
    - **Property 14: Locale-Aware Date Formatting**
    - **Validates: Requirements 2.10**

  - [ ]* 18.7 Write property test for event details display
    - **Property 19: Event Details Display**
    - **Validates: Requirements 4.3, 4.4**

  - [ ]* 18.8 Write property test for calendar month navigation performance
    - **Property 20: Calendar Month Navigation Performance**
    - **Validates: Requirements 4.6**

  - [ ]* 18.9 Write property test for past event handling
    - **Property 51: Past Event Handling**
    - **Validates: Requirements 10.7**

  - [ ]* 18.10 Write property test for event description multi-paragraph support
    - **Property 52: Event Description Multi-Paragraph Support**
    - **Validates: Requirements 10.9**

- [ ] 19. Write E2E tests for critical user journeys
  - [ ]* 19.1 Write E2E test for language switching journey
    - Test switching from French to English
    - Verify all content updates
    - Verify language persists across navigation
    - _Requirements: 2.3, 2.4, 2.5_

  - [ ]* 19.2 Write E2E test for mobile navigation
    - Test hamburger menu open/close
    - Test navigation to different pages
    - Test on mobile viewport
    - _Requirements: 1.4_

  - [ ]* 19.3 Write E2E test for calendar interaction
    - Test viewing events in calendar
    - Test clicking event to see details
    - Test month navigation
    - _Requirements: 4.3, 4.6_

  - [ ]* 19.4 Write E2E test for contact page
    - Test phone link on mobile
    - Test email link
    - Test social media links
    - _Requirements: 9.2, 9.3, 9.5_

- [x] 20. Final checkpoint and deployment preparation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- E2E tests validate complete user journeys
- The implementation follows a phased approach: foundation → mobile → components → performance/SEO → testing
- All property-based tests should run with minimum 100 iterations
- TypeScript is used throughout for type safety
- Next.js 16 App Router conventions are followed
