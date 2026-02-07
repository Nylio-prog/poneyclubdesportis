"use client";

import { useTranslations } from 'next-intl';

/**
 * Skip to content link for keyboard accessibility
 * Allows keyboard users to skip navigation and jump directly to main content
 * Only visible when focused via keyboard navigation
 */
export default function SkipToContent() {
  const t = useTranslations('accessibility');
  
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[var(--deep-burgundy)] focus:text-[var(--ivory)] focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-3 focus:ring-[var(--vivid-burgundy)] focus:ring-offset-2"
    >
      {t('skipToContent')}
    </a>
  );
}
