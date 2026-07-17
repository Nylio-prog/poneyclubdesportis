"use client";

import { useEffect } from 'react';
import { X } from 'lucide-react';
import ResponsiveImage from './ResponsiveImage';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/lib/i18n/config';
import {
  ClubEvent,
  getEventDateTime,
  getEventDescription,
  getEventTitle,
} from '@/lib/events';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: ClubEvent | null;
  locale: Locale;
}

export default function EventModal({ isOpen, onClose, event, locale }: EventModalProps) {
  const t = useTranslations('common');

  // Close on escape key
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const dateLocale = locale === 'fr' ? fr : enUS;
  const title = getEventTitle(event, locale);
  const description = getEventDescription(event, locale);

  // Format dates according to locale
  const startDate = getEventDateTime(event.startDate);
  const endDate = getEventDateTime(event.endDate);
  const isSameDay = event.startDate === event.endDate;

  const dateFormat = locale === 'fr' ? 'dd/MM/yyyy' : 'MM/dd/yyyy';

  const formattedStartDate = format(startDate, dateFormat, { locale: dateLocale });
  const formattedEndDate = format(endDate, dateFormat, { locale: dateLocale });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start">
          <h2 id="event-modal-title" className="text-2xl font-bold text-gray-900 pr-8">{title}</h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={t('close')}
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Event image */}
          {event.image && (
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <ResponsiveImage
                src={event.image}
                alt={title}
                fill
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          )}

          {/* Date and time */}
          <div className="mb-4 text-gray-600">
            <p className="font-semibold">
              {isSameDay ? (
                <>
                  {formattedStartDate}
                  <br />
                  {event.startHour} - {event.endHour}
                </>
              ) : (
                <>
                  {formattedStartDate} - {formattedEndDate}
                  <br />
                  {event.startHour} - {event.endHour}
                </>
              )}
            </p>
          </div>

          {/* Description */}
          <div className="text-gray-700 whitespace-pre-line">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
