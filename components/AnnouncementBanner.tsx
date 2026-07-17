'use client';

import { CalendarDays, ChevronRight } from 'lucide-react';
import { track } from '@vercel/analytics/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';

const AnnouncementBanner = () => {
  const t = useTranslations('announcement');

  const handleLinkClick = () => {
    track('Click Banner Link', {
      location: 'Announcement Banner',
      text: t('cta'),
      event: 'back-to-school-offer-2026',
    });
  };

  return (
    <div className="border-b border-amber-700/20 bg-amber-100 text-gray-900 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="flex min-w-0 items-start gap-3 sm:flex-1">
            <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-900">
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold leading-5 sm:text-base">{t('title')}</p>
              <p className="mt-1 text-sm leading-5 sm:text-base">{t('summary')}</p>
            </div>
          </div>
          <div className="flex flex-shrink-0 items-center justify-center sm:justify-end">
            <Link
              href="/actualites#offre-rentree-2026"
              className="inline-flex h-11 min-w-40 flex-shrink-0 items-center justify-center rounded-md bg-[var(--deep-burgundy)] px-5 text-sm font-semibold leading-none text-white transition-colors hover:bg-[var(--vivid-burgundy)]"
              onClick={handleLinkClick}
            >
              {t('cta')}
              <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
