"use client";

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import ResponsiveImage from './ResponsiveImage';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/lib/i18n/config';
import { formatDayKey } from '@/lib/calendar';
import {
  ClubEvent,
  getEventDescription,
  getEventTimeLabel,
  getEventTitle,
} from '@/lib/events';

interface EventModalProps {
  event: ClubEvent | null;
  onClose: () => void;
  locale: Locale;
}

export default function EventModal({ event, onClose, locale }: EventModalProps) {
  const t = useTranslations('common');
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = event !== null;

  // Escape to close, lock page scroll, move focus in and give it back on close.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!event) return null;

  const title = getEventTitle(event, locale);
  const description = getEventDescription(event, locale);
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const dateLabel = event.startDate === event.endDate
    ? `${formatDayKey(event.startDate, locale, dateOptions)} · ${getEventTimeLabel(event, locale)}`
    : `${formatDayKey(event.startDate, locale, dateOptions)} → ${formatDayKey(event.endDate, locale, dateOptions)}`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 md:items-center md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 bg-paper transition-colors hover:border-ink"
          aria-label={t('close')}
        >
          <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>

        {event.image && (
          <div className="relative aspect-[16/9] w-full bg-ink/5">
            <ResponsiveImage
              src={event.image}
              alt={title}
              fill
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        )}

        <div className="p-6 md:p-10">
          <p className="eyebrow pr-12 text-wine first-letter:uppercase">{dateLabel}</p>
          <h2 id="event-modal-title" className="mt-4 pr-12 text-3xl md:text-4xl">{title}</h2>
          <p className="mt-6 whitespace-pre-line leading-relaxed text-ink/75">{description}</p>
        </div>
      </div>
    </div>
  );
}
