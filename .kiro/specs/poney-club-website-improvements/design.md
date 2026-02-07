# Design Document: Poney Club Desportis Website Improvements

## Overview

This design document outlines the technical approach for enhancing the Poney Club Desportis website with improvements to mobile experience, internationalization, aesthetics, and SEO. The solution maintains the existing Next.js 16 App Router architecture while adding new capabilities through modular enhancements.

### Design Principles

1. **Maintain Simplicity**: Keep the static, file-based content management approach
2. **Progressive Enhancement**: Add features without breaking existing functionality
3. **Performance First**: Ensure all improvements maintain or improve performance metrics
4. **Accessibility**: Meet WCAG 2.1 AA standards throughout
5. **Mobile-First**: Design and implement with mobile devices as the primary target

### Technology Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **Internationalization**: next-intl (lightweight i18n library for Next.js App Router)
- **Image Optimization**: Next.js Image component with Sharp
- **Analytics**: Vercel Analytics & Speed Insights

## Architecture

### High-Level Structure

The application follows Next.js 16 App Router conventions with the following enhancements:

```
app/
├── [locale]/                    # Dynamic locale segment for i18n
│   ├── layout.tsx              # Locale-specific layout
│   ├── page.tsx                # Homepage
│   ├── le-club/
│   ├── photos/
│   ├── cavalerie/
│   ├── actualites/
│   ├── cours/
│   ├── pensions/
│   └── contact/
├── layout.tsx                   # Root layout
└── proxy.ts                     # Locale detection and routing (renamed from middleware)

components/
├── ui/                          # Reusable UI components
├── mobile/                      # Mobile-specific components
├── LanguageSwitcher.tsx        # Language toggle component
└── [existing components]

lib/
├── i18n/
│   ├── config.ts               # i18n configuration
│   ├── request.ts              # Server-side i18n utilities
│   └── routing.ts              # Locale routing utilities
└── utils.ts

messages/
├── fr.json                      # French translations
└── en.json                      # English translations

data/
├── events.ts                    # Event data with i18n support
└── animals.ts                   # Animal data with i18n support
```

### Internationalization Architecture

The i18n implementation uses a proxy-based approach with locale prefixes in URLs:

- **URL Structure**: `/{locale}/path` (e.g., `/fr/le-club`, `/en/le-club`)
- **Default Locale**: French (`fr`) - no prefix in URL for cleaner French URLs
- **Supported Locales**: `fr`, `en`
- **Translation Storage**: JSON files in `messages/` directory
- **Server Components**: Use `getTranslations()` for server-side translations
- **Client Components**: Use `useTranslations()` hook for client-side translations

### Mobile-First Responsive Strategy

The design uses a mobile-first approach with breakpoints:

- **Mobile**: < 768px (base styles)
- **Tablet**: 768px - 1024px (md: prefix)
- **Desktop**: > 1024px (lg: prefix)

Key mobile optimizations:
- Touch targets minimum 44x44px
- Simplified navigation with hamburger menu
- Optimized image sizes for mobile viewports
- Reduced motion for users with motion sensitivity preferences

## Components and Interfaces

### 1. Language Switcher Component

**Purpose**: Allow users to toggle between French and English

**Location**: `components/LanguageSwitcher.tsx`

**Interface**:
```typescript
interface LanguageSwitcherProps {
  currentLocale: string;
  className?: string;
}
```

**Behavior**:
- Displays current language flag/icon
- Toggles between `fr` and `en` on click
- Updates URL with new locale prefix
- Persists selection via cookies
- Accessible with keyboard navigation and ARIA labels

**Implementation Details**:
- Uses Next.js `useRouter` and `usePathname` for navigation
- Stores preference in cookie with 1-year expiration
- Smooth transition without page reload using client-side navigation
- Position: Fixed in header, visible on all pages

### 2. Enhanced Calendar Component

**Purpose**: Display events in mobile-friendly and desktop-optimized views

**Location**: `components/Calendar.tsx`

**Interface**:
```typescript
interface CalendarProps {
  events: Event[];
  locale: string;
  view?: 'month' | 'agenda';
}

interface Event {
  title: string;
  titleEn?: string;
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
  description: string;
  descriptionEn?: string;
  image?: string;
}
```

**Behavior**:
- **Desktop**: Month grid view with react-big-calendar
- **Mobile**: Agenda/list view with cards
- Responsive breakpoint at 768px
- Event details modal on click
- Translated event information based on locale
- Past events visually distinguished (opacity/grayscale)

**Implementation Details**:
- Use `useMediaQuery` hook to detect screen size
- Conditional rendering based on viewport width
- Event cards with touch-friendly spacing on mobile
- Lazy load event images
- Format dates using `date-fns` with locale support

### 3. Mobile Navigation Component

**Purpose**: Provide touch-optimized navigation for mobile devices

**Location**: `components/mobile/MobileNav.tsx`

**Interface**:
```typescript
interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}
```

**Behavior**:
- Hamburger icon in header (visible < 768px)
- Slide-in menu from right side
- Overlay backdrop with blur effect
- Touch-friendly menu items (min 44px height)
- Smooth open/close animations (< 300ms)
- Close on route change or backdrop click

**Implementation Details**:
- Use Framer Motion for animations
- Portal rendering for overlay
- Focus trap when open
- Escape key to close
- Prevent body scroll when open

### 4. Responsive Image Component

**Purpose**: Serve optimized images for different devices and screen sizes

**Location**: `components/ResponsiveImage.tsx`

**Interface**:
```typescript
interface ResponsiveImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  objectFit?: 'cover' | 'contain';
  objectPosition?: string;
}
```

**Behavior**:
- Automatic format selection (WebP, AVIF)
- Responsive sizing based on viewport
- Lazy loading for below-fold images
- Blur placeholder during load
- Optimized focal points for mobile vs desktop

**Implementation Details**:
- Wraps Next.js Image component
- Default sizes: `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`
- Priority prop for above-fold images
- Sharp for image optimization
- Placeholder blur data URL generation

### 5. Enhanced Animal Card Component

**Purpose**: Display animal profiles with responsive layout and animations

**Location**: `components/AnimalCard.tsx`

**Interface**:
```typescript
interface AnimalCardProps {
  animal: Animal;
  locale: string;
  category: 'horse' | 'pony' | 'retired' | 'other';
}

interface Animal {
  name: string;
  image: string;
  description: string;
  descriptionEn?: string;
  age?: number;
  breed?: string;
  breedEn?: string;
}
```

**Behavior**:
- Card layout with image and text
- Hover scale animation on desktop (1.02x)
- Touch feedback on mobile
- Translated descriptions based on locale
- Visual distinction for retired animals (border/badge)
- Responsive grid: 1 column mobile, 2-3 columns desktop

**Implementation Details**:
- Framer Motion for hover animations
- Tailwind for responsive grid
- Lazy load images with blur placeholder
- Semantic HTML with proper heading hierarchy

## Data Models

### Translation Files Structure

**messages/fr.json**:
```json
{
  "nav": {
    "home": "Accueil",
    "club": "Le Club",
    "photos": "Photos",
    "horses": "Cavalerie",
    "news": "Actualités",
    "lessons": "Cours",
    "boarding": "Pensions",
    "contact": "Contact"
  },
  "home": {
    "hero": {
      "title": "Bienvenue au Poney Club Desportis",
      "subtitle": "Centre équestre à Cadenet, Vaucluse"
    },
    "about": {
      "title": "Poney Club à Cadenet",
      "description": "..."
    }
  },
  "calendar": {
    "title": "Évènements planifiés",
    "viewMonth": "Mois",
    "viewAgenda": "Liste",
    "noEvents": "Aucun événement prévu"
  },
  "animals": {
    "horses": "Chevaux",
    "ponies": "Poneys",
    "retired": "Retraités",
    "other": "Autres animaux"
  },
  "contact": {
    "phone": "Téléphone",
    "email": "Email",
    "address": "Adresse",
    "hours": "Horaires"
  }
}
```

**messages/en.json**:
```json
{
  "nav": {
    "home": "Home",
    "club": "The Club",
    "photos": "Photos",
    "horses": "Horses",
    "news": "News",
    "lessons": "Lessons",
    "boarding": "Boarding",
    "contact": "Contact"
  },
  "home": {
    "hero": {
      "title": "Welcome to Poney Club Desportis",
      "subtitle": "Equestrian center in Cadenet, Vaucluse"
    },
    "about": {
      "title": "Pony Club in Cadenet",
      "description": "..."
    }
  },
  "calendar": {
    "title": "Upcoming Events",
    "viewMonth": "Month",
    "viewAgenda": "List",
    "noEvents": "No upcoming events"
  },
  "animals": {
    "horses": "Horses",
    "ponies": "Ponies",
    "retired": "Retired",
    "other": "Other Animals"
  },
  "contact": {
    "phone": "Phone",
    "email": "Email",
    "address": "Address",
    "hours": "Hours"
  }
}
```

### Enhanced Event Data Model

**data/events.ts**:
```typescript
export interface Event {
  title: string;
  titleEn?: string;
  startDate: string;  // ISO 8601 format
  endDate: string;
  startHour: string;  // HH:mm format
  endHour: string;
  description: string;
  descriptionEn?: string;
  image?: string;
  category?: 'lesson' | 'competition' | 'workshop' | 'open-house' | 'stage';
}

export const events: Event[] = [
  // Existing events with added English translations
];
```

### Enhanced Animal Data Model

**data/animals.ts**:
```typescript
export interface Animal {
  name: string;
  image: string;
  description: string;
  descriptionEn?: string;
  age?: number;
  breed?: string;
  breedEn?: string;
  personality?: string[];
  personalityEn?: string[];
}

export const horses: Animal[] = [];
export const ponies: Animal[] = [];
export const retiredAnimals: Animal[] = [];
export const otherAnimals: Animal[] = [];
```

### i18n Configuration

**lib/i18n/config.ts**:
```typescript
export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Before defining the correctness properties, I need to analyze the acceptance criteria from the requirements document to determine which are testable as properties, examples, or edge cases.


### Property Reflection

After analyzing all acceptance criteria, I've identified the following areas where properties can be consolidated:

**Redundancies Identified:**
1. **Alt text properties (5.7 and 7.7)**: These test the same thing - that all images have alt text. Will combine into one property.
2. **Translation properties (2.5, 2.6, 2.7, 4.10, 8.5, 9.7)**: Multiple properties test that different content types are translated. Can combine into a comprehensive translation property.
3. **Responsive layout properties (1.1, 8.7, 8.8)**: Multiple properties test responsive behavior. Can combine into a general responsive layout property.
4. **Performance metrics (5.10, 5.11, 6.1, 6.2, 6.3, 6.4, 7.1)**: Multiple Lighthouse score properties. Will keep separate as they test different aspects (SEO, Performance, Accessibility).
5. **Image optimization properties (1.8, 6.5, 6.6, 8.6)**: Multiple properties about image handling. Can combine into comprehensive image optimization property.
6. **Touch target and button sizing (1.2, 3.9)**: Both test minimum sizes for interactive elements. Can combine.
7. **Spacing consistency (1.9, 3.7)**: Both test consistent spacing. Can combine.
8. **Meta tag properties (5.1, 5.2, 5.6, 5.9, 5.12)**: Multiple properties about meta tags. Can combine into comprehensive meta tag property.

**Properties to Keep Separate:**
- Animation timing properties (1.4, 1.7, 2.3, 3.2, 4.6) - Each tests different interactions
- Locale persistence (2.4) - Unique round-trip property
- Calendar view switching (4.1, 4.2) - Device-specific behavior
- Event sorting and filtering (10.6, 10.7) - Different operations
- Accessibility properties (7.2, 7.3, 7.4, 7.5, 7.8, 7.10) - Each tests different accessibility aspects

### Correctness Properties

Property 1: Responsive Layout Adaptation
*For any* page and viewport width, when the viewport is below 768px, the layout should adapt to mobile-optimized single-column format, and when above 768px, the layout should display multi-column desktop format.
**Validates: Requirements 1.1, 8.7, 8.8**

Property 2: Touch Target Minimum Size
*For all* interactive elements (buttons, links, form inputs), the rendered dimensions should be at least 44x44 pixels to ensure touch accessibility.
**Validates: Requirements 1.2, 3.9**

Property 3: Layout Stability
*For any* page load, the Cumulative Layout Shift (CLS) score should be less than 0.1 to ensure smooth scrolling without unexpected layout shifts.
**Validates: Requirements 1.3**

Property 4: Navigation Animation Performance
*For any* hamburger menu interaction on mobile, the time from click event to fully expanded state should be less than 300ms.
**Validates: Requirements 1.4**

Property 5: Interactive Feedback Timing
*For all* touch interactions on mobile devices, visual feedback (state change, animation) should occur within 100ms of the touchstart event.
**Validates: Requirements 1.7**

Property 6: Image Optimization
*For all* images on the website, the Next.js Image component should be used with appropriate srcset attributes, lazy loading for below-fold images, and blur placeholders for smooth loading transitions.
**Validates: Requirements 1.8, 6.5, 6.6, 8.6**

Property 7: Consistent Spacing System
*For all* elements with padding or margin, the spacing values should be multiples of 8 pixels to maintain consistent visual rhythm.
**Validates: Requirements 1.9, 3.7**

Property 8: Minimum Body Text Size
*For all* body text elements, the computed font-size should be at least 16px on mobile devices to ensure readability.
**Validates: Requirements 1.10**

Property 9: Language Switching Performance
*For any* language switcher interaction, the time from click to complete content translation should be less than 500ms.
**Validates: Requirements 2.3**

Property 10: Locale Persistence Round Trip
*For any* language selection, after navigating to a different page and returning, the selected language should remain active (round-trip property).
**Validates: Requirements 2.4**

Property 11: Comprehensive Translation Coverage
*For all* content types (navigation, static content, events, animals, metadata, dates), when a locale is selected, all visible text should display in the selected language with no untranslated strings.
**Validates: Requirements 2.5, 2.6, 2.7, 4.10, 8.5, 9.7**

Property 12: Language Switcher Visibility
*For all* pages in the application, the language switcher component should be present and visible in the header.
**Validates: Requirements 2.8**

Property 13: Locale URL Structure
*For any* page URL, the locale should be either included as a URL prefix (e.g., /en/page) or preserved via a locale cookie with appropriate expiration.
**Validates: Requirements 2.9**

Property 14: Locale-Aware Date Formatting
*For all* displayed dates and times, the format should match the selected locale's conventions (24-hour for French, 12-hour for English).
**Validates: Requirements 2.10**

Property 15: Typography Consistency
*For all* text elements across the website, the font-family should be 'Geist Sans' or the defined fallback stack.
**Validates: Requirements 3.1**

Property 16: Hover Transition Timing
*For all* interactive elements with hover states, CSS transitions should complete within 200ms for smooth visual feedback.
**Validates: Requirements 3.2**

Property 17: Text Contrast Ratio
*For all* text elements, the color contrast ratio between text and background should be at least 4.5:1 for normal text and 3:1 for large text.
**Validates: Requirements 3.4, 7.4**

Property 18: Design Token Consistency
*For all* styled elements, border-radius, shadow, and color values should use only the defined design tokens from the Tailwind configuration.
**Validates: Requirements 3.5, 3.6**

Property 19: Event Details Display
*For any* event in the calendar, clicking the event should display a modal or expanded view containing the event's title, date, time, description, and image (if available).
**Validates: Requirements 4.3, 4.4**

Property 20: Calendar Month Navigation Performance
*For any* month navigation action in the calendar, the transition animation should complete within 300ms.
**Validates: Requirements 4.6**

Property 21: Multi-Day Event Rendering
*For all* events with different start and end dates, the calendar should display the event spanning across all dates in the range.
**Validates: Requirements 4.7**

Property 22: Past Event Visual Distinction
*For all* events with end dates before the current date, the visual styling should differ from upcoming events (e.g., reduced opacity, grayscale, or different color).
**Validates: Requirements 4.8**

Property 23: Event Time Format by Locale
*For all* displayed event times, the format should be 24-hour (HH:mm) for French locale and 12-hour (h:mm a) for English locale.
**Validates: Requirements 4.9**

Property 24: Comprehensive Meta Tags
*For all* pages, the HTML head should include meta title (≤60 chars), meta description (≤160 chars), Open Graph tags, canonical URL, and hreflang tags for supported locales.
**Validates: Requirements 5.1, 5.2, 5.6, 5.9, 5.12**

Property 25: Structured Data Presence
*For all* pages, valid JSON-LD structured data should be present for organization, events (on event pages), and location information.
**Validates: Requirements 5.3**

Property 26: Sitemap Completeness
*For all* public routes in the application, the generated sitemap.xml should include an entry with the correct URL and locale variants.
**Validates: Requirements 5.4**

Property 27: Image Alt Text Coverage
*For all* image elements in the DOM, the alt attribute should be present and contain descriptive text (or be empty for decorative images).
**Validates: Requirements 5.7, 7.7**

Property 28: Semantic HTML Structure
*For all* pages, the HTML structure should use semantic elements (header, nav, main, section, article, footer) in appropriate hierarchy.
**Validates: Requirements 5.8**

Property 29: Lighthouse SEO Score
*For all* pages, the Lighthouse SEO audit score should be at least 95 out of 100.
**Validates: Requirements 5.10**

Property 30: First Contentful Paint Performance
*For all* pages under 3G network conditions, the First Contentful Paint metric should occur within 1.5 seconds.
**Validates: Requirements 5.11, 6.3**

Property 31: Lighthouse Performance Score Desktop
*For all* pages tested on desktop configuration, the Lighthouse Performance score should be at least 90 out of 100.
**Validates: Requirements 6.1**

Property 32: Lighthouse Performance Score Mobile
*For all* pages tested on mobile configuration, the Lighthouse Performance score should be at least 80 out of 100.
**Validates: Requirements 6.2**

Property 33: Time to Interactive
*For all* pages, the Time to Interactive metric should be achieved within 3.5 seconds of page load.
**Validates: Requirements 6.4**

Property 34: Link Prefetching
*For all* Next.js Link components, the prefetch behavior should be enabled (default) to improve navigation performance.
**Validates: Requirements 6.7**

Property 35: JavaScript Bundle Size
*For the* initial page load, the total JavaScript bundle size should be less than 200KB (gzipped).
**Validates: Requirements 6.8**

Property 36: Font Display Strategy
*For all* custom font declarations, the CSS should include font-display: swap to prevent invisible text during font loading.
**Validates: Requirements 6.9**

Property 37: Static Asset Caching
*For all* static assets (images, fonts, CSS, JS), the HTTP response should include appropriate Cache-Control headers for browser caching.
**Validates: Requirements 6.10**

Property 38: Lighthouse Accessibility Score
*For all* pages, the Lighthouse Accessibility audit score should be at least 95 out of 100.
**Validates: Requirements 7.1**

Property 39: Keyboard Focus Indicators
*For all* interactive elements, when focused via keyboard navigation, a visible focus indicator should be displayed with sufficient contrast.
**Validates: Requirements 7.2**

Property 40: ARIA Label Coverage
*For all* interactive components without visible text labels, appropriate ARIA attributes (aria-label, aria-labelledby, or aria-describedby) should be present.
**Validates: Requirements 7.3**

Property 41: Form Label Association
*For all* form input elements, an associated label element should be present using either the for attribute or by wrapping the input.
**Validates: Requirements 7.5**

Property 42: Heading Hierarchy
*For all* pages, heading elements should follow a logical hierarchy (h1 → h2 → h3) without skipping levels.
**Validates: Requirements 7.8**

Property 43: Menu ARIA Attributes
*For the* hamburger menu component, appropriate ARIA attributes (aria-expanded, aria-controls, aria-label) should be present and update based on menu state.
**Validates: Requirements 7.10**

Property 44: Animal Profile Data Display
*For all* animal profiles, the rendered card should display all available data fields (name, image, description, age, breed) in the selected locale.
**Validates: Requirements 8.1, 8.2**

Property 45: Retired Animal Visual Distinction
*For all* animals in the retired category, the card styling should include a visual indicator (border, badge, or opacity) distinguishing them from active animals.
**Validates: Requirements 8.9**

Property 46: Animal Card Styling Consistency
*For all* animal cards across all categories, the CSS classes for border-radius, padding, shadow, and typography should be identical.
**Validates: Requirements 8.10**

Property 47: Contact Link Protocols
*For all* phone numbers, the href attribute should use the tel: protocol, and for all email addresses, the href should use the mailto: protocol.
**Validates: Requirements 9.2, 9.3**

Property 48: External Link Target
*For all* social media links and external links, the target attribute should be set to "_blank" and include rel="noopener noreferrer" for security.
**Validates: Requirements 9.5**

Property 49: Footer Contact Information
*For all* pages, the footer component should contain contact information (phone, email, address) visible on every page.
**Validates: Requirements 9.9**

Property 50: Event Chronological Sorting
*For all* event lists displayed on the website, events should be sorted in ascending chronological order by start date.
**Validates: Requirements 10.6**

Property 51: Past Event Handling
*For all* events with end dates before the current date, the system should either filter them from the main display or show them in a separate "past events" section.
**Validates: Requirements 10.7**

Property 52: Event Description Multi-Paragraph Support
*For all* event descriptions containing line breaks or multiple paragraphs, the rendered HTML should preserve the paragraph structure using appropriate elements (p tags or br tags).
**Validates: Requirements 10.9**

## Error Handling

### Translation Fallback Strategy

**Missing Translation Keys**:
- If a translation key is missing in the selected locale, fall back to the default locale (French)
- Log warning in development mode for missing keys
- Never display raw translation keys to users

**Example Implementation**:
```typescript
function getTranslation(key: string, locale: Locale): string {
  const translations = getTranslations(locale);
  if (translations[key]) {
    return translations[key];
  }
  
  // Fallback to default locale
  const defaultTranslations = getTranslations(defaultLocale);
  if (defaultTranslations[key]) {
    console.warn(`Missing translation for key "${key}" in locale "${locale}"`);
    return defaultTranslations[key];
  }
  
  // Last resort: return key
  console.error(`Missing translation for key "${key}" in all locales`);
  return key;
}
```

### Image Loading Error Handling

**Failed Image Loads**:
- Display fallback placeholder image
- Log error for monitoring
- Maintain layout stability (no layout shift)

**Example Implementation**:
```typescript
<Image
  src={imageSrc}
  alt={altText}
  onError={(e) => {
    e.currentTarget.src = '/images/placeholder.jpg';
    console.error(`Failed to load image: ${imageSrc}`);
  }}
  placeholder="blur"
  blurDataURL="/images/blur-placeholder.jpg"
/>
```

### Calendar Event Rendering Errors

**Invalid Date Formats**:
- Validate date strings before parsing
- Display error message for invalid events
- Continue rendering valid events

**Missing Required Fields**:
- Check for required fields (title, startDate, endDate)
- Skip events with missing required data
- Log warnings for data quality issues

### Locale Detection Errors

**Invalid Locale in URL**:
- Redirect to default locale if URL contains unsupported locale
- Preserve the rest of the URL path
- Set appropriate HTTP status code (301 or 302)

**Cookie Parsing Errors**:
- If locale cookie is corrupted, ignore and use default
- Set new cookie with valid locale
- Don't crash the application

### Network and Performance Errors

**Slow Network Conditions**:
- Show loading skeletons for content
- Implement timeout for image loading
- Provide feedback to users on slow connections

**JavaScript Bundle Loading Failures**:
- Implement error boundaries for component failures
- Provide fallback UI for critical errors
- Log errors to monitoring service

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests**: Focus on specific examples, edge cases, and integration points
- Specific component rendering scenarios
- Edge cases (empty data, missing translations, invalid dates)
- Error conditions and fallback behavior
- Integration between components

**Property-Based Tests**: Verify universal properties across all inputs
- Responsive behavior across viewport ranges
- Translation coverage across all locales
- Performance metrics across all pages
- Accessibility compliance across all components

### Property-Based Testing Configuration

**Library**: fast-check (for TypeScript/JavaScript property-based testing)

**Configuration**:
- Minimum 100 iterations per property test
- Seed-based reproducibility for failed tests
- Shrinking enabled to find minimal failing cases

**Test Tagging Format**:
Each property test must include a comment referencing the design property:
```typescript
// Feature: poney-club-website-improvements, Property 1: Responsive Layout Adaptation
test('responsive layout adapts to viewport width', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 320, max: 2560 }), // viewport width
      (width) => {
        // Test implementation
      }
    ),
    { numRuns: 100 }
  );
});
```

### Testing Tools and Frameworks

**Unit Testing**:
- **Framework**: Jest with React Testing Library
- **Component Testing**: @testing-library/react
- **DOM Queries**: @testing-library/dom
- **User Interactions**: @testing-library/user-event

**Property-Based Testing**:
- **Library**: fast-check
- **Generators**: Custom generators for viewport sizes, locales, dates, events, animals

**E2E Testing**:
- **Framework**: Playwright
- **Visual Regression**: Playwright screenshots
- **Accessibility**: axe-core integration

**Performance Testing**:
- **Tool**: Lighthouse CI
- **Metrics**: FCP, LCP, TTI, CLS, TBT
- **Thresholds**: Defined in lighthouserc.json

### Test Organization

```
__tests__/
├── unit/
│   ├── components/
│   │   ├── LanguageSwitcher.test.tsx
│   │   ├── Calendar.test.tsx
│   │   ├── MobileNav.test.tsx
│   │   └── AnimalCard.test.tsx
│   ├── lib/
│   │   └── i18n.test.ts
│   └── pages/
│       └── [...routes].test.tsx
├── properties/
│   ├── responsive.property.test.ts
│   ├── i18n.property.test.ts
│   ├── performance.property.test.ts
│   ├── accessibility.property.test.ts
│   └── seo.property.test.ts
└── e2e/
    ├── navigation.spec.ts
    ├── language-switching.spec.ts
    ├── calendar-interaction.spec.ts
    └── mobile-experience.spec.ts
```

### Key Test Scenarios

**Responsive Design Tests**:
- Property: Test layout adaptation across viewport range (320px - 2560px)
- Unit: Test specific breakpoint behaviors (767px, 768px, 1023px, 1024px)
- E2E: Visual regression tests at key breakpoints

**Internationalization Tests**:
- Property: Test translation coverage for all content types and locales
- Unit: Test language switcher component behavior
- Unit: Test date/time formatting for different locales
- E2E: Test full user journey in both languages

**Performance Tests**:
- Property: Test Lighthouse scores across all pages
- Property: Test bundle size stays under threshold
- Unit: Test image optimization (lazy loading, srcset)
- E2E: Test real-world performance with network throttling

**Accessibility Tests**:
- Property: Test ARIA attributes on all interactive components
- Property: Test color contrast ratios for all text
- Property: Test keyboard navigation through all interactive elements
- Unit: Test screen reader announcements
- E2E: Test with actual screen reader (manual testing)

**Calendar Tests**:
- Property: Test event sorting for any event list
- Property: Test multi-day event rendering for various date ranges
- Unit: Test calendar view switching at breakpoint
- Unit: Test event modal opening and closing
- E2E: Test full calendar interaction flow

### Continuous Integration

**Pre-commit Hooks**:
- Run unit tests
- Run linting and type checking
- Run fast property tests (10 iterations)

**Pull Request Checks**:
- Run full unit test suite
- Run full property test suite (100 iterations)
- Run Lighthouse CI on preview deployment
- Run accessibility audits

**Post-deployment**:
- Run E2E tests on production
- Monitor real user metrics (Core Web Vitals)
- Alert on performance regressions

### Test Data Generators

**Custom Generators for Property Tests**:

```typescript
// Viewport width generator
const viewportWidth = fc.integer({ min: 320, max: 2560 });

// Locale generator
const locale = fc.constantFrom('fr', 'en');

// Event generator
const event = fc.record({
  title: fc.string({ minLength: 5, maxLength: 100 }),
  startDate: fc.date({ min: new Date('2024-01-01'), max: new Date('2026-12-31') }),
  endDate: fc.date({ min: new Date('2024-01-01'), max: new Date('2026-12-31') }),
  startHour: fc.string({ minLength: 5, maxLength: 5 }), // HH:mm
  endHour: fc.string({ minLength: 5, maxLength: 5 }),
  description: fc.string({ minLength: 20, maxLength: 500 }),
  image: fc.option(fc.webUrl(), { nil: undefined }),
});

// Animal generator
const animal = fc.record({
  name: fc.string({ minLength: 3, maxLength: 30 }),
  image: fc.webUrl(),
  description: fc.string({ minLength: 20, maxLength: 200 }),
  age: fc.option(fc.integer({ min: 1, max: 35 }), { nil: undefined }),
  breed: fc.option(fc.string({ minLength: 5, maxLength: 50 }), { nil: undefined }),
});
```

### Performance Budgets

**Lighthouse Thresholds**:
- Performance (Desktop): ≥ 90
- Performance (Mobile): ≥ 80
- Accessibility: ≥ 95
- SEO: ≥ 95
- Best Practices: ≥ 90

**Core Web Vitals**:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Bundle Size Budgets**:
- Initial JS: < 200KB (gzipped)
- Initial CSS: < 50KB (gzipped)
- Total Page Weight: < 1MB

### Accessibility Testing Checklist

- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus indicators are visible and have sufficient contrast
- [ ] Screen reader announces all important content and state changes
- [ ] Color contrast meets WCAG 2.1 AA standards (4.5:1 for normal text)
- [ ] All images have descriptive alt text
- [ ] Form inputs have associated labels
- [ ] Heading hierarchy is logical and doesn't skip levels
- [ ] ARIA attributes are used correctly and appropriately
- [ ] No keyboard traps exist in the interface
- [ ] Skip navigation link is present and functional
- [ ] Language of page is declared in HTML lang attribute
- [ ] Language changes are announced to screen readers

## Implementation Notes

### Migration Strategy

The implementation should follow a phased approach to minimize risk:

**Phase 1: Foundation (Week 1-2)**
- Set up i18n infrastructure (next-intl, middleware, translation files)
- Create base translation files with existing content
- Implement language switcher component
- Test locale routing and persistence

**Phase 2: Mobile Optimization (Week 2-3)**
- Enhance mobile navigation component
- Optimize touch targets and spacing
- Implement responsive image component
- Test on real devices

**Phase 3: Component Enhancement (Week 3-4)**
- Enhance calendar component with mobile view
- Improve animal card components
- Add animations and transitions
- Implement error boundaries

**Phase 4: Performance & SEO (Week 4-5)**
- Optimize images and lazy loading
- Add structured data markup
- Implement meta tags for all pages
- Run Lighthouse audits and optimize

**Phase 5: Testing & Polish (Week 5-6)**
- Write property-based tests
- Write unit tests for components
- Run E2E tests
- Fix bugs and polish UI

### Deployment Considerations

**Environment Variables**:
```env
NEXT_PUBLIC_DEFAULT_LOCALE=fr
NEXT_PUBLIC_SUPPORTED_LOCALES=fr,en
NEXT_PUBLIC_SITE_URL=https://poneyclubdesportis-cadenet.fr
```

**Build Configuration**:
- Enable Next.js Image optimization
- Configure image domains in next.config.js
- Set up proper caching headers
- Enable compression for static assets

**Monitoring**:
- Set up Vercel Analytics for real user monitoring
- Configure error tracking (e.g., Sentry)
- Monitor Core Web Vitals
- Set up alerts for performance regressions

### Browser Support

**Target Browsers**:
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 13+
- Chrome Mobile: Android 8+

**Progressive Enhancement**:
- Core functionality works without JavaScript
- Animations respect prefers-reduced-motion
- Fallbacks for unsupported CSS features

### Content Management Workflow

**Adding New Events**:
1. Edit `data/events.ts`
2. Add event object with French content
3. Add optional English translations (titleEn, descriptionEn)
4. Add event image to `/public/events/` if available
5. Commit and push to trigger rebuild

**Adding New Animals**:
1. Edit `data/animals.ts`
2. Add animal object to appropriate array
3. Add optional English translations
4. Add animal image to `/public/animals/`
5. Commit and push to trigger rebuild

**Updating Translations**:
1. Edit `messages/fr.json` or `messages/en.json`
2. Maintain consistent key structure
3. Test on preview deployment
4. Commit and push to production

## Conclusion

This design provides a comprehensive approach to enhancing the Poney Club Desportis website with mobile optimization, internationalization, aesthetic improvements, and SEO enhancements. The architecture maintains the simplicity of the existing static site while adding powerful new capabilities through modular, well-tested components.

The property-based testing strategy ensures that the improvements work correctly across a wide range of inputs and conditions, while the phased implementation approach minimizes risk and allows for iterative refinement.
