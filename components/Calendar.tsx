"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import EventModal from "./EventModal";
import type { Locale } from "@/lib/i18n/config";
import { ClubEvent, getEventTimeLabel, getEventTitle } from "@/lib/events";
import {
  addMonths,
  formatDayKey,
  getMonthEvents,
  getMonthGrid,
  getTodayKey,
  groupEventsByDay,
  type DayKey,
  type MonthKey,
} from "@/lib/calendar";

interface CalendarProps {
  events: ClubEvent[];
  /** Month shown first ("YYYY-MM"), computed on the server. */
  initialMonth: MonthKey;
}

// Monday 5 to Sunday 11 January 2026, used to label the weekday columns.
const WEEKDAY_KEYS = Array.from({ length: 7 }, (_, index) => `2026-01-${String(5 + index).padStart(2, "0")}`);

const noopSubscribe = () => () => {};

/** Today's date in the visitor's browser; null during server rendering to avoid hydration mismatches. */
function useTodayKey(): DayKey | null {
  return useSyncExternalStore(noopSubscribe, () => getTodayKey(), () => null);
}

const Calendar = ({ events, initialMonth }: CalendarProps) => {
  const locale = useLocale() as Locale;
  const t = useTranslations("calendar");
  const todayKey = useTodayKey();

  const [month, setMonth] = useState<MonthKey>(initialMonth);
  const [selectedDay, setSelectedDay] = useState<DayKey | null>(null);
  const [openEvent, setOpenEvent] = useState<ClubEvent | null>(null);

  const visibleEvents = useMemo(
    () => events.filter((event) => event.showInCalendar !== false),
    [events],
  );
  const eventsByDay = useMemo(() => groupEventsByDay(visibleEvents), [visibleEvents]);
  const grid = useMemo(() => getMonthGrid(month), [month]);
  const monthEvents = useMemo(() => getMonthEvents(visibleEvents, month), [visibleEvents, month]);
  const listedEvents = selectedDay ? eventsByDay.get(selectedDay) ?? [] : monthEvents;

  const monthLabel = formatDayKey(`${month}-01`, locale, { month: "long", year: "numeric" });
  const weeks = Array.from({ length: grid.length / 7 }, (_, index) => grid.slice(index * 7, index * 7 + 7));

  // When the month is empty, offer a jump to the closest event after (or before) it.
  const monthStart = `${month}-01`;
  const nextMonthStart = `${addMonths(month, 1)}-01`;
  const sortedByStart = [...visibleEvents].sort((a, b) => a.startDate.localeCompare(b.startDate));
  const nextEvent = sortedByStart.find((event) => event.startDate >= nextMonthStart);
  const lastEvent = [...sortedByStart].reverse().find((event) => event.endDate < monthStart);
  const jumpTarget = nextEvent ?? lastEvent;

  const goToMonth = (target: MonthKey) => {
    setMonth(target);
    setSelectedDay(null);
  };

  const isPast = (event: ClubEvent) => todayKey !== null && event.endDate < todayKey;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 border-b border-ink/15 pb-6">
        <h3 className="min-w-0 text-3xl capitalize md:text-5xl" aria-live="polite">
          {monthLabel}
        </h3>
        <div className="flex shrink-0 items-center gap-2">
          {todayKey && todayKey.slice(0, 7) !== month && (
            <button type="button" onClick={() => goToMonth(todayKey.slice(0, 7))} className="editorial-link mr-4 hidden sm:inline-block">
              {t("today")}
            </button>
          )}
          <button
            type="button"
            onClick={() => goToMonth(addMonths(month, -1))}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            aria-label={t("previousMonth")}
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goToMonth(addMonths(month, 1))}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            aria-label={t("nextMonth")}
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-12 lg:grid-cols-12">
        {/* Month grid */}
        <div className="lg:col-span-8">
          <table className="w-full table-fixed border-collapse">
            <caption className="sr-only">{monthLabel}</caption>
            <thead>
              <tr>
                {WEEKDAY_KEYS.map((key) => (
                  <th key={key} scope="col" className="pb-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-ink/50">
                    <abbr title={formatDayKey(key, locale, { weekday: "long" })} className="no-underline">
                      <span className="md:hidden">{formatDayKey(key, locale, { weekday: "narrow" })}</span>
                      <span className="hidden md:inline">{formatDayKey(key, locale, { weekday: "short" }).replace(".", "")}</span>
                    </abbr>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week) => (
                <tr key={week[0].key}>
                  {week.map((day) => {
                    const dayEvents = eventsByDay.get(day.key) ?? [];
                    const isToday = day.key === todayKey;
                    const isSelected = day.key === selectedDay;
                    const isPastDay = todayKey !== null && day.key < todayKey;

                    const number = (
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm tabular-nums ${
                          isToday
                            ? "bg-wine font-semibold text-paper"
                            : isSelected
                              ? "font-semibold"
                              : !day.inMonth
                              ? "text-ink/25"
                              : isPastDay
                                ? "text-ink/45"
                                : ""
                        }`}
                      >
                        {day.day}
                      </span>
                    );

                    return (
                      <td
                        key={day.key}
                        className={`h-14 border border-ink/10 p-0 align-top md:h-28 ${day.inMonth ? "bg-white/60" : ""}`}
                      >
                        {dayEvents.length > 0 ? (
                          <button
                            type="button"
                            onClick={() => setSelectedDay(isSelected ? null : day.key)}
                            aria-pressed={isSelected}
                            aria-label={`${formatDayKey(day.key, locale, { weekday: "long", day: "numeric", month: "long" })} : ${dayEvents
                              .map((event) => getEventTitle(event, locale))
                              .join(", ")}`}
                            className={`flex h-full w-full flex-col gap-1 p-1 text-left transition-colors md:p-2 ${
                              isSelected ? "bg-ink text-paper" : "bg-wine/[0.06] hover:bg-wine/10"
                            }`}
                          >
                            {number}
                            {/* Mobile: dots */}
                            <span className="flex gap-1 px-1.5 md:hidden" aria-hidden="true">
                              {dayEvents.slice(0, 3).map((event) => (
                                <span key={`${event.startDate}-${event.title}`} className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-paper" : "bg-wine"}`} />
                              ))}
                            </span>
                            {/* Desktop: titles */}
                            <span className="hidden w-full space-y-1 md:block" aria-hidden="true">
                              {dayEvents.slice(0, 2).map((event) => (
                                <span
                                  key={`${event.startDate}-${event.title}`}
                                  className={`block truncate border-l-2 px-1.5 py-0.5 text-[11px] font-medium leading-tight ${
                                    isSelected ? "border-paper" : "border-wine text-wine"
                                  } ${isPast(event) && !isSelected ? "opacity-60" : ""}`}
                                >
                                  {getEventTitle(event, locale)}
                                </span>
                              ))}
                              {dayEvents.length > 2 && (
                                <span className="block px-1.5 text-[11px] text-ink/60">
                                  {t("more", { count: dayEvents.length - 2 })}
                                </span>
                              )}
                            </span>
                          </button>
                        ) : (
                          <div className="p-1 md:p-2">{number}</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Event list for the month or the selected day */}
        <div className="lg:col-span-4">
          <div className="flex items-baseline justify-between gap-4 border-b border-ink/15 pb-4">
            <p className="eyebrow text-wine">
              {selectedDay
                ? t("eventsOn", { date: formatDayKey(selectedDay, locale, { day: "numeric", month: "long" }) })
                : t("thisMonth")}
            </p>
            {selectedDay && (
              <button type="button" onClick={() => setSelectedDay(null)} className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/60 hover:text-wine">
                {t("allMonth")}
              </button>
            )}
          </div>

          {listedEvents.length > 0 ? (
            <ul>
              {listedEvents.map((event) => {
                const multiDay = event.startDate !== event.endDate;
                return (
                  <li key={`${event.startDate}-${event.title}`}>
                    <button
                      type="button"
                      onClick={() => setOpenEvent(event)}
                      className={`group grid w-full grid-cols-[4rem_1fr] gap-4 border-b border-ink/15 py-6 text-left transition-colors hover:bg-ink/[0.03] ${
                        isPast(event) ? "opacity-60" : ""
                      }`}
                    >
                      <span className="font-serif text-4xl font-light leading-none text-wine">
                        {formatDayKey(event.startDate, locale, { day: "2-digit" })}
                        <span className="mt-1 block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-ink/60">
                          {formatDayKey(event.startDate, locale, { month: "short" }).replace(".", "")}
                        </span>
                      </span>
                      <span>
                        <span className="block font-serif text-xl leading-snug">{getEventTitle(event, locale)}</span>
                        <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.15em] text-ink/60">
                          {multiDay
                            ? `${formatDayKey(event.startDate, locale, { day: "numeric", month: "short" })} → ${formatDayKey(event.endDate, locale, { day: "numeric", month: "short" })}`
                            : getEventTimeLabel(event, locale)}
                        </span>
                        <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.15em] group-hover:text-wine">
                          {t("details")} →
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="py-8">
              <p className="font-serif text-2xl font-light text-ink/70">{t("noEvents")}</p>
              {jumpTarget && (
                <button type="button" onClick={() => goToMonth(jumpTarget.startDate.slice(0, 7))} className="editorial-link mt-6">
                  {nextEvent ? `${t("nextEvent")} →` : `← ${t("lastEvent")}`}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <EventModal event={openEvent} onClose={() => setOpenEvent(null)} locale={locale} />
    </div>
  );
};

export default Calendar;
