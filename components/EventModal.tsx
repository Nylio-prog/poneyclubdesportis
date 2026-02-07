"use client";

import { useEffect } from 'react';
import { X } from 'lucide-react';
import ResponsiveImage from './ResponsiveImage';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    title: string;
    titleEn?: string;
    startDate: string;
    endDate: string;
    startHour: string;
    endHour: string;
    description: string;
    descriptionEn?: string;
    image?: string;
  } | null;
  locale: string;
}

export default function EventModal({ isOpen, onClose, event, locale }: EventModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const dateLocale = locale === 'fr' ? fr : enUS;
  const title = locale === 'en' && event.titleEn ? event.titleEn : event.title;
  const description = locale === 'en' && event.descriptionEn ? event.descriptionEn : event.description;

  // Format dates according to locale
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const isSameDay = event.startDate === event.endDate;

  // Format time according to locale (24h for French, 12h for English)
  const timeFormat = locale === 'fr' ? 'HH:mm' : 'h:mm a';
  const dateFormat = locale === 'fr' ? 'dd/MM/yyyy' : 'MM/dd/yyyy';

  const formattedStartDate = format(startDate, dateFormat, { locale: dateLocale });
  const formattedEndDate = format(endDate, dateFormat, { locale: dateLocale });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-900 pr-8">{title}</h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
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
