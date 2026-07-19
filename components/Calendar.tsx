"use client";

import { useState, useMemo } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  type EventProps,
  type EventPropGetter,
  type View,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useLocale, useTranslations } from 'next-intl';
import EventListView from "./EventListView";
import EventModal from "./EventModal";
import { Monitor, List } from 'lucide-react';
import {
  format,
  getDay,
  isPast,
  isToday,
  parse,
  startOfWeek,
} from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
import type { Locale } from '@/lib/i18n/config';
import {
  ClubEvent,
  getEventEndDateTime,
  getEventStartDateTime,
  getEventTimeLabel,
  getEventTitle,
} from '@/lib/events';

const dateLocales = {
  'en-US': enUS,
  fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: dateLocales,
});

interface CalendarProps {
  events: ClubEvent[];
}

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resource: ClubEvent;
};

const Calendar = ({ events }: CalendarProps) => {
  const locale = useLocale() as Locale;
  const t = useTranslations('calendar');
  const isDesktop = useMediaQuery('(min-width: 768px)');
  
  // User preference for view (can override responsive default)
  const [userViewPreference, setUserViewPreference] = useState<'month' | 'list' | null>(null);
  const [currentView, setCurrentView] = useState<View>("month");
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleEvents = useMemo(
    () => events.filter((event) => event.showInCalendar !== false),
    [events],
  );

  // Determine which view to show based on screen size and user preference
  const shouldShowMonthView = userViewPreference 
    ? userViewPreference === 'month' 
    : isDesktop;

  // Convert events to the format expected by react-big-calendar
  const calendarEvents = useMemo(() => {
    return visibleEvents.map((event) => {
      const startDateTime = getEventStartDateTime(event);
      const endDateTime = getEventEndDateTime(event);
      const title = getEventTitle(event, locale);
      
      return {
        title,
        start: startDateTime,
        end: endDateTime,
        allDay: !event.startHour,
        resource: event, // Store original event data
      };
    });
  }, [visibleEvents, locale]);

  const handleSelectEvent = (calendarEvent: CalendarEvent) => {
    setSelectedEvent(calendarEvent.resource);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: ClubEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const isPastEvent = (date: Date) => {
    return isPast(date) && !isToday(date);
  };

  const EventComponent = ({ event }: EventProps<CalendarEvent>) => {
    const past = isPastEvent(event.end);
    const timeLabel = getEventTimeLabel(event.resource, locale);
    const tooltipText = `${event.title}\n${timeLabel}`;
    
    return (
      <button
        title={tooltipText}
        className={`bg-[var(--deep-burgundy)] text-[var(--ivory)] p-1 rounded max-w-full overflow-hidden text-ellipsis break-words ${
          past ? 'opacity-60 grayscale' : ''
        }`}
      >
        {event.title}
        <br />
        {timeLabel}
      </button>
    );
  };

  const customDayPropGetter = (date: Date) => {
    // Highlight current date
    if (isToday(date)) {
      return {
        style: {
          backgroundColor: 'rgba(144, 0, 30, 0.1)',
          fontWeight: 'bold',
        },
      };
    }
    
    if (currentView === "agenda") {
      return {
        style: {
          backgroundColor: "var(--deep-burgundy)",
          color: "white",
        },
      };
    }
    return {};
  };

  const customEventPropGetter: EventPropGetter<CalendarEvent> = (
    _event,
    start: Date,
    end: Date,
  ) => {
    const past = isPastEvent(end);
    
    const baseStyle = {
      backgroundColor: past ? "rgba(101, 0, 21, 0.6)" : "var(--deep-burgundy)",
      border: "none",
      opacity: past ? 0.6 : 1,
    };
    
    if (currentView === "agenda") {
      return {
        style: {
          ...baseStyle,
          color: "white",
          borderRadius: "5px",
          padding: "2px 5px",
        },
      };
    }
    return { style: baseStyle };
  };

  const customStyles = `
    .rbc-calendar {
      width: 100%;
      overflow-x: auto;
    }
    .rbc-month-view, .rbc-agenda-view {
      min-width: 600px; /* Adjust this value as needed */
    }
    .rbc-month-view {
      overflow-x: auto;
    }
    .rbc-row {
      flex-wrap: nowrap;
    }
    .rbc-agenda-view table {
      width: 100%;
    }
    @media (max-width: 768px) {
      .rbc-toolbar {
        flex-direction: column;
        align-items: stretch;
      }
      .rbc-toolbar-label {
        margin: 10px 0;
      }
    }
    
    /* Higher cells with events in month view */
    .rbc-month-view .rbc-month-row {
      min-height: 100px; /* Adjust this value for desired height */
    }
    .rbc-month-view .rbc-event {
      font-size: 12px;
      padding: 2px 3px;
      border-radius: 3px;
      margin-top: 1px;
      margin-bottom: 1px;
    }
    
    /* Highlight today's date */
    .rbc-today {
      background-color: rgba(144, 0, 30, 0.1) !important;
    }
  `;

  return (
    <div className="min-h-[500px] w-full">
      <style>{customStyles}</style>
      
      {/* View toggle buttons */}
      <div className="flex justify-end gap-2 mb-4" role="group" aria-label={locale === 'fr' ? 'Sélection de la vue du calendrier' : 'Calendar view selection'}>
        <button
          onClick={() => setUserViewPreference('month')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            shouldShowMonthView
              ? 'bg-[var(--deep-burgundy)] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label={t('viewMonth')}
          aria-pressed={shouldShowMonthView}
        >
          <Monitor className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">{t('viewMonth')}</span>
        </button>
        <button
          onClick={() => setUserViewPreference('list')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            !shouldShowMonthView
              ? 'bg-[var(--deep-burgundy)] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label={t('viewAgenda')}
          aria-pressed={!shouldShowMonthView}
        >
          <List className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">{t('viewAgenda')}</span>
        </button>
      </div>

      {/* Render appropriate view */}
      {shouldShowMonthView ? (
        <div className="h-[90vh] md:h-[75vh] max-h-[900px]">
          <BigCalendar
            messages={{
              next: t('next'),
              previous: t('previous'),
              today: t('today'),
              month: t('viewMonth'),
              week: t('viewWeek'),
              agenda: t('viewAgenda'),
              allDay: t('allDay'),
              noEventsInRange: t('noEvents'),
            }}
            culture={locale === 'fr' ? 'fr' : 'en-US'}
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            views={["month", "week", "agenda"]}
            onSelectEvent={handleSelectEvent}
            onView={(view) => setCurrentView(view)}
            components={{
              event: EventComponent,
            }}
            eventPropGetter={customEventPropGetter}
            dayPropGetter={customDayPropGetter}
          />
        </div>
      ) : (
        <EventListView 
          events={visibleEvents}
          locale={locale}
          onEventClick={handleEventClick}
        />
      )}

      {/* Event details modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
        locale={locale}
      />
    </div>
  );
};

export default Calendar;
