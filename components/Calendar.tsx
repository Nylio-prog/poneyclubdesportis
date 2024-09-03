"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

interface Event {
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
  title: string;
  description: string;
  image: string;
}

interface CalendarProps {
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const router = useRouter();
  const [currentView, setCurrentView] = React.useState("month");

  // Convert events to the format expected by react-big-calendar
  const calendarEvents = events.map((event) => {
    const startDateTime = moment(
      `${event.startDate} ${event.startHour}`,
      "YYYY-MM-DD HH:mm"
    ).toDate();
    const endDateTime = moment(
      `${event.endDate} ${event.endHour}`,
      "YYYY-MM-DD HH:mm"
    ).toDate();
    return {
      title: event.title,
      start: startDateTime,
      end: endDateTime,
      allDay: false,
    };
  });

  const handleSelectEvent = () => {
    router.push("/actualites");
  };

  const EventComponent = ({ event }: { event: any }) => (
    <Tippy
      content={`${event.title}\n${moment(event.start).format(
        "HH:mm"
      )} - ${moment(event.end).format("HH:mm")}`}
    >
      <button
        title=""
        className="bg-[var(--deep-burgundy)] text-[var(--ivory)] p-1 rounded max-w-full overflow-hidden text-ellipsis break-words"
      >
        {event.title}
        <br />
        {moment(event.start).format("HH:mm")} -{" "}
        {moment(event.end).format("HH:mm")}
      </button>
    </Tippy>
  );

  const customDayPropGetter = (date: Date) => {
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
    const baseStyle = {
      backgroundColor: "var(--deep-burgundy)",
      border: "none",
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
      min-height: 130px; /* Adjust this value for desired height */
    }
    .rbc-month-view .rbc-event {
      font-size: 12px;
      padding: 2px 3px;
      border-radius: 3px;
      margin-top: 1px;
      margin-bottom: 1px;
    }
  `;

  return (
    <div className="min-h-[500px] h-[90vh] md:h-[75vh] max-h-[900px] w-full">
      <style>{customStyles}</style>
      <BigCalendar
        messages={{
          next: "Suivant",
          previous: "Précédent",
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          agenda: "Agenda",
          allDay: "Toute la journée",
          noEventsInRange:
            "Aucun évènement de prévu sur la période sélectionnée",
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
  );
};

export default Calendar;
