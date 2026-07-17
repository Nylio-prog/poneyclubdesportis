"use client";

import { useMemo } from 'react';
import { format, isPast, isToday } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import ResponsiveImage from './ResponsiveImage';
import { Calendar, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/lib/i18n/config';
import {
  ClubEvent,
  getEventDateTime,
  getEventDescription,
  getEventTitle,
} from '@/lib/events';

interface EventListViewProps {
  events: ClubEvent[];
  locale: Locale;
  onEventClick: (event: ClubEvent) => void;
}

const isPastEvent = (event: ClubEvent) => {
  const endDateTime = getEventDateTime(event.endDate, event.endHour);
  return isPast(endDateTime) && !isToday(endDateTime);
};

const isTodayEvent = (event: ClubEvent) => (
  isToday(getEventDateTime(event.startDate))
);

function getNearestEvents(events: ClubEvent[], limit = 3): ClubEvent[] {
  const now = new Date();
  const ongoingEvents: ClubEvent[] = [];
  const futureEvents: ClubEvent[] = [];
  const pastEvents: ClubEvent[] = [];

  events.forEach((event) => {
    const startDateTime = getEventDateTime(event.startDate, event.startHour);
    const endDateTime = getEventDateTime(event.endDate, event.endHour);

    if (isPast(endDateTime) && !isToday(endDateTime)) {
      pastEvents.push(event);
    } else if (startDateTime <= now && endDateTime >= now) {
      ongoingEvents.push(event);
    } else {
      futureEvents.push(event);
    }
  });

  ongoingEvents.sort((a, b) => (
    getEventDateTime(a.startDate, a.startHour).getTime() -
    getEventDateTime(b.startDate, b.startHour).getTime()
  ));
  futureEvents.sort((a, b) => (
    getEventDateTime(a.startDate, a.startHour).getTime() -
    getEventDateTime(b.startDate, b.startHour).getTime()
  ));
  pastEvents.sort((a, b) => (
    getEventDateTime(b.endDate, b.endHour).getTime() -
    getEventDateTime(a.endDate, a.endHour).getTime()
  ));

  return [...ongoingEvents, ...futureEvents, ...pastEvents].slice(0, limit);
}

export default function EventListView({ events, locale, onEventClick }: EventListViewProps) {
  const t = useTranslations('calendar');
  const dateLocale = locale === 'fr' ? fr : enUS;
  const dateFormat = locale === 'fr' ? 'dd/MM/yyyy' : 'MM/dd/yyyy';
  const sortedEvents = useMemo(() => getNearestEvents(events), [events]);

  if (sortedEvents.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {t('noEvents')}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedEvents.map((event) => {
        const title = getEventTitle(event, locale);
        const description = getEventDescription(event, locale);
        const startDate = getEventDateTime(event.startDate);
        const endDate = getEventDateTime(event.endDate);
        const isSameDay = event.startDate === event.endDate;
        const past = isPastEvent(event);
        const today = isTodayEvent(event);

        return (
          <button
            key={event.id ?? `${event.startDate}-${event.title}`}
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
