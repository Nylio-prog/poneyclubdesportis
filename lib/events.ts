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
