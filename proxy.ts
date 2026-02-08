import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

export default createMiddleware({
  ...routing,
  // Locale detection strategy:
  // 1. Check URL path first (e.g., /en/page)
  // 2. Check NEXT_LOCALE cookie
  // 3. Only then check Accept-Language header
  // This ensures explicit user choices (URL, cookie) take precedence
  localeDetection: true,
});

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /public files (public folder)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
