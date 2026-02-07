"use client";

import { format, isPast, isToday } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import ResponsiveImage from './ResponsiveImage';
import { Calendar, Clock } from 'lucide-react';

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

interface EventListViewProps {
  events: Event[];
  locale: string;
  onEventClick: (event: Event) => void;
}

export default function EventListView({ events, locale, onEventClick }: EventListViewProps) {
  const dateLocale = locale === 'fr' ? fr : enUS;
  const timeFormat = locale === 'fr' ? 'HH:mm' : 'h:mm a';
  const dateFormat = locale === 'fr' ? 'dd/MM/yyyy' : 'MM/dd/yyyy';

  // Sort events chronologically
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.startDate} ${a.startHour}`);
    const dateB = new Date(`${b.startDate} ${b.startHour}`);
    return dateA.getTime() - dateB.getTime();
  });

  const isPastEvent = (event: Event) => {
    const endDateTime = new Date(`${event.endDate} ${event.endHour}`);
    return isPast(endDateTime) && !isToday(endDateTime);
  };

  const isTodayEvent = (event: Event) => {
    const startDate = new Date(event.startDate);
    return isToday(startDate);
  };

  if (sortedEvents.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {locale === 'fr' 
          ? 'Aucun événement de prévu sur la période sélectionnée'
          : 'No events scheduled for the selected period'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedEvents.map((event, index) => {
        const title = locale === 'en' && event.titleEn ? event.titleEn : event.title;
        const description = locale === 'en' && event.descriptionEn ? event.descriptionEn : event.description;
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        const isSameDay = event.startDate === event.endDate;
        const past = isPastEvent(event);
        const today = isTodayEvent(event);

        return (
          <button
            key={index}
            onClick={() => onEventClick(event)}
            className={`w-full text-left bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden ${
              past ? 'opacity-60 grayscale' : ''
            } ${today ? 'ring-2 ring-[var(--vivid-burgundy)]' : ''}`}
            style={{ minHeight: '44px' }} // Touch-friendly minimum height
          >
            <div className="flex flex-col sm:flex-row">
              {/* Event image */}
              {event.image && (
                <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                  <ResponsiveImage
                    src={event.image}
                    alt={title}
                    fill
                    objectFit="cover"
                    sizes="(max-width: 640px) 100vw, 128px"
                  />
                </div>
              )}

              {/* Event details */}
              <div className="flex-1 p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  {title}
                </h3>

                {/* Date */}
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>
                    {isSameDay
                      ? format(startDate, dateFormat, { locale: dateLocale })
                      : `${format(startDate, dateFormat, { locale: dateLocale })} - ${format(endDate, dateFormat, { locale: dateLocale })}`
                    }
                  </span>
                </div>

                {/* Time */}
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{event.startHour} - {event.endHour}</span>
                </div>

                {/* Description preview */}
                <p className="text-sm text-gray-700 line-clamp-2">
                  {description}
                </p>

                {/* Past event indicator */}
                {past && (
                  <span className="inline-block mt-2 text-xs text-gray-500 italic">
                    {locale === 'fr' ? 'Événement passé' : 'Past event'}
                  </span>
                )}

                {/* Today indicator */}
                {today && (
                  <span className="inline-block mt-2 text-xs font-semibold text-[var(--vivid-burgundy)]">
                    {locale === 'fr' ? "Aujourd'hui" : 'Today'}
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
