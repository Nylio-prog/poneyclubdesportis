import type { Locale } from '@/lib/i18n/config';

export interface ClubEvent {
  id?: string;
  title: string;
  titleEn?: string;
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
  description: string;
  descriptionEn?: string;
  image?: string;
  showInCalendar?: boolean;
}

export function getEventDateTime(date: string, time = '00:00'): Date {
  return new Date(`${date}T${time}:00`);
}

export function getEventTitle(event: ClubEvent, locale: Locale): string {
  return locale === 'en' && event.titleEn ? event.titleEn : event.title;
}

export function getEventDescription(event: ClubEvent, locale: Locale): string {
  return locale === 'en' && event.descriptionEn
    ? event.descriptionEn
    : event.description;
}
