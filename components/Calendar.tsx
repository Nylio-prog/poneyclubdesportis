"use client";

import { useState, useMemo } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";
import "moment/locale/en-gb";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useLocale, useTranslations } from 'next-intl';
import EventListView from "./EventListView";
import EventModal from "./EventModal";
import { Monitor, List } from 'lucide-react';
import { isPast, isToday } from 'date-fns';

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

interface Event {
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  image?: string;
}

interface CalendarProps {
  events: Event[];
  view?: 'month' | 'agenda';
}

const Calendar = ({ events, view: initialView }: CalendarProps) => {
  const locale = useLocale();
  const t = useTranslations('calendar');
  const isDesktop = useMediaQuery('(min-width: 768px)');
  
  // User preference for view (can override responsive default)
  const [userViewPreference, setUserViewPreference] = useState<'month' | 'list' | null>(null);
  const [currentView, setCurrentView] = useState("month");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set moment locale
  moment.locale(locale === 'fr' ? 'fr' : 'en-gb');

  // Determine which view to show based on screen size and user preference
  const shouldShowMonthView = userViewPreference 
    ? userViewPreference === 'month' 
    : isDesktop;

  // Convert events to the format expected by react-big-calendar
  const calendarEvents = useMemo(() => {
    return events.map((event) => {
      const startDateTime = moment(
        `${event.startDate} ${event.startHour}`,
        "YYYY-MM-DD HH:mm"
      ).toDate();
      const endDateTime = moment(
        `${event.endDate} ${event.endHour}`,
        "YYYY-MM-DD HH:mm"
      ).toDate();
      
      const title = locale === 'en' && event.titleEn ? event.titleEn : event.title;
      
      return {
        title,
        start: startDateTime,
        end: endDateTime,
        allDay: false,
        resource: event, // Store original event data
      };
    });
  }, [events, locale]);

  const handleSelectEvent = (calendarEvent: any) => {
    setSelectedEvent(calendarEvent.resource);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
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

  const EventComponent = ({ event }: { event: any }) => {
    const past = isPastEvent(event.end);
    
    return (
      <Tippy
        content={`${event.title}\n${moment(event.start).format(
          locale === 'fr' ? 'HH:mm' : 'h:mm a'
        )} - ${moment(event.end).format(locale === 'fr' ? 'HH:mm' : 'h:mm a')}`}
      >
        <button
          title=""
          className={`bg-[var(--deep-burgundy)] text-[var(--ivory)] p-1 rounded max-w-full overflow-hidden text-ellipsis break-words ${
            past ? 'opacity-60 grayscale' : ''
          }`}
        >
          {event.title}
          <br />
          {moment(event.start).format(locale === 'fr' ? 'HH:mm' : 'h:mm a')} -{" "}
          {moment(event.end).format(locale === 'fr' ? 'HH:mm' : 'h:mm a')}
        </button>
      </Tippy>
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

  const customEventPropGetter = (
    event: any,
    start: Date,
    end: Date,
    isSelected: boolean
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
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setUserViewPreference('month')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            shouldShowMonthView
              ? 'bg-[var(--deep-burgundy)] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label={t('viewMonth')}
        >
          <Monitor className="w-4 h-4" />
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
        >
          <List className="w-4 h-4" />
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
          events={events} 
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
