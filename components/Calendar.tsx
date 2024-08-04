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
  title: string;
  description: string;
  image: string;
}

interface CalendarProps {
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const router = useRouter();

  // Convert events to the format expected by react-big-calendar
  const calendarEvents = events.map((event) => ({
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    allDay: true,
  }));

  const handleSelectEvent = (event: any) => {
    router.push("/actualites");
  };

  const EventComponent = (event: any) => (
    <Tippy content={event.title}>
      <button
        title=""
        className="bg-[var(--deep-burgundy)] text-[var(--ivory)] p-1 rounded max-w-full overflow-hidden text-ellipsis break-words"
      >
        {event.title}
      </button>
    </Tippy>
  );

  return (
    <div className="min-h-[500px] h-[90vh] md:h-[75vh] max-h-[900px] w-full">
      <BigCalendar
        messages={{
          next: "Suivant",
          previous: "Précédent",
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
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
        components={{
          event: EventComponent,
        }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: "var(--deep-burgundy)",
            border: "none",
          },
        })}
      />
    </div>
  );
};

export default Calendar;
