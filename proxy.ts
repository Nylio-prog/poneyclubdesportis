import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

export default createMiddleware({
  ...routing,
  // Disable automatic locale detection based on Accept-Language header
  // This ensures the site always defaults to French unless explicitly
  // navigating to /en or having a NEXT_LOCALE cookie set
  localeDetection: false,
});

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /public files (public folder)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
