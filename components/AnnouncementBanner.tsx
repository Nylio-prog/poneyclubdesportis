'use client';

import { CalendarDays } from 'lucide-react';
import { useTranslations } from 'next-intl';

const AnnouncementBanner = () => {
  const t = useTranslations('announcement');

  return (
    <aside
      aria-label={t('title')}
      className="border-b border-amber-700/20 bg-amber-100 text-gray-900 shadow-sm"
    >
      <div className="mx-auto max-w-6xl px-4 py-5 sm:py-6">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-900">
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-5 sm:text-base">{t('title')}</p>
            <p className="mt-1 text-sm leading-5 sm:text-base">{t('summary')}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AnnouncementBanner;
