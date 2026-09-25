import type { ClubEvent } from '@/lib/events';

/**
 * Calendar helpers working on "YYYY-MM-DD" / "YYYY-MM" keys and UTC dates, so the
 * server and the browser always build the same grid regardless of their time zones.
 */

export type MonthKey = string; // "YYYY-MM"
export type DayKey = string; // "YYYY-MM-DD"

const MS_PER_DAY = 86_400_000;

export function toDayKey(date: Date): DayKey {
  return date.toISOString().slice(0, 10);
}

export function dayKeyToDate(key: DayKey): Date {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function monthKeyToDate(key: MonthKey): Date {
  const [year, month] = key.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, 1));
}

export function addMonths(key: MonthKey, amount: number): MonthKey {
  const date = monthKeyToDate(key);
  date.setUTCMonth(date.getUTCMonth() + amount);
  return date.toISOString().slice(0, 7);
}

/** Today's date as seen in the given time zone (defaults to the runtime's). */
export function getTodayKey(timeZone?: string): DayKey {
  // en-CA formats dates as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

export interface CalendarDay {
  key: DayKey;
  day: number;
  inMonth: boolean;
}

/** Monday-first weeks covering the whole month. */
export function getMonthGrid(month: MonthKey): CalendarDay[] {
  const first = monthKeyToDate(month);
  const offset = (first.getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
  const cellCount = Math.ceil((offset + daysInMonth) / 7) * 7;
  const start = first.getTime() - offset * MS_PER_DAY;

  return Array.from({ length: cellCount }, (_, index) => {
    const date = new Date(start + index * MS_PER_DAY);
    return {
      key: toDayKey(date),
      day: date.getUTCDate(),
      inMonth: date.getUTCMonth() === first.getUTCMonth(),
    };
  });
}

/** Maps every day covered by an event (multi-day events included) to that event. */
export function groupEventsByDay(events: ClubEvent[]): Map<DayKey, ClubEvent[]> {
  const byDay = new Map<DayKey, ClubEvent[]>();

  for (const event of events) {
    const end = dayKeyToDate(event.endDate).getTime();
    for (let time = dayKeyToDate(event.startDate).getTime(); time <= end; time += MS_PER_DAY) {
      const key = toDayKey(new Date(time));
      byDay.set(key, [...(byDay.get(key) ?? []), event]);
    }
  }

  return byDay;
}

/** Events overlapping the given month, sorted by start date. */
export function getMonthEvents(events: ClubEvent[], month: MonthKey): ClubEvent[] {
  const monthStart = `${month}-01`;
  const monthEnd = `${addMonths(month, 1)}-01`;
  return events
    .filter((event) => event.startDate < monthEnd && event.endDate >= monthStart)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function formatDayKey(key: DayKey, locale: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', { ...options, timeZone: 'UTC' }).format(dayKeyToDate(key));
}
