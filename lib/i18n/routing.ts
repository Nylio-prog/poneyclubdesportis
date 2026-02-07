import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

// Create navigation utilities with i18n support
// The Link component has prefetching enabled by default (wraps Next.js Link)
// This improves navigation performance by prefetching linked pages on hover
// Requirements: 6.7
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
