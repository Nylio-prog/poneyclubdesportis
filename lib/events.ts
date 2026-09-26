import type { Locale } from '@/lib/i18n/config';

export interface ClubEvent {
  id?: string;
  title: string;
  titleEn?: string;
  startDate: string;
  endDate: string;
  startHour?: string;
  endHour?: string;
  description: string;
  descriptionEn?: string;
  image?: string;
  showInCalendar?: boolean;
}

export function getEventDateTime(date: string, time = '00:00'): Date {
  return new Date(`${date}T${time}:00`);
}

export function getEventStartDateTime(event: ClubEvent): Date {
  return getEventDateTime(event.startDate, event.startHour);
}

export function getEventEndDateTime(event: ClubEvent): Date {
  return getEventDateTime(event.endDate, event.endHour ?? '23:59');
}

function formatEventTime(time: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(getEventDateTime('2000-01-01', time));
}

export function getEventTimeLabel(event: ClubEvent, locale: Locale): string {
  if (!event.startHour) {
    return locale === 'fr' ? 'Horaires à venir' : 'Time to be announced';
  }

  const startTime = formatEventTime(event.startHour, locale);

  if (!event.endHour) {
    return locale === 'fr' ? `Dès ${startTime}` : `From ${startTime}`;
  }

  return `${startTime} - ${formatEventTime(event.endHour, locale)}`;
}

export function getEventTitle(event: ClubEvent, locale: Locale): string {
  return locale === 'en' && event.titleEn ? event.titleEn : event.title;
}

export function getEventDescription(event: ClubEvent, locale: Locale): string {
  return locale === 'en' && event.descriptionEn
    ? event.descriptionEn
    : event.description;
}

/**
 * Upcoming events first (soonest first), topped up with the most recent past events.
 */
export function getFeaturedEvents(
  allEvents: ClubEvent[],
  count = 3,
  now = new Date(),
): ClubEvent[] {
  const visible = allEvents.filter((event) => event.showInCalendar !== false);
  const upcoming = visible
    .filter((event) => getEventEndDateTime(event) >= now)
    .sort((a, b) => getEventStartDateTime(a).getTime() - getEventStartDateTime(b).getTime());
  const past = visible
    .filter((event) => getEventEndDateTime(event) < now)
    .sort((a, b) => getEventStartDateTime(b).getTime() - getEventStartDateTime(a).getTime());

  return [...upcoming, ...past].slice(0, count);
}

export function formatEventDay(event: ClubEvent, locale: Locale): { day: string; month: string } {
  const start = getEventStartDateTime(event);
  const intlLocale = locale === 'fr' ? 'fr-FR' : 'en-GB';
  return {
    day: new Intl.DateTimeFormat(intlLocale, { day: '2-digit' }).format(start),
    month: new Intl.DateTimeFormat(intlLocale, { month: 'short' }).format(start).replace('.', ''),
  };
}
