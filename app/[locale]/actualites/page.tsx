import ResponsiveImage from "@/components/ResponsiveImage";
import PageHeader from "@/components/PageHeader";
import CalendarSection from "@/components/CalendarSection";
import { useLocale, useTranslations } from 'next-intl';
import { events } from "@/data/events";
import { formatDate } from "@/lib/utils";
import Script from 'next/script';
import { getEventSchema } from "@/lib/structured-data";
import { Locale } from "@/lib/i18n/config";
import {
  ClubEvent,
  formatEventDay,
  getEventDescription,
  getEventEndDateTime,
  getEventStartDateTime,
  getEventTimeLabel,
  getEventTitle,
} from '@/lib/events';

const EventCard = ({ event, locale, isPast }: { event: ClubEvent; locale: Locale; isPast: boolean }) => {
  const title = getEventTitle(event, locale);
  const description = getEventDescription(event, locale);
  const { day, month } = formatEventDay(event, locale);

  return (
    <article
      id={event.id}
      className={`event-card grid gap-6 border-b border-ink/15 py-12 md:grid-cols-12 md:gap-8 ${isPast ? 'opacity-60' : ''}`}
      style={{ scrollMarginTop: '7rem' }}
    >
      <p className="font-serif text-5xl font-light text-wine md:col-span-2">
        {day}
        <span className="mt-1 block text-lg uppercase tracking-[0.1em] text-ink/60">{month}</span>
      </p>
      <div className={event.image ? "md:col-span-6" : "md:col-span-9"}>
        <h3>{title}</h3>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-ink/60">
          {event.startDate === event.endDate
            ? `${formatDate(event.startDate, locale)} · ${getEventTimeLabel(event, locale)}`
            : `${formatDate(event.startDate, locale)} - ${formatDate(event.endDate, locale)}`}
        </p>
        <p className="mt-5 whitespace-pre-line leading-relaxed text-ink/75">{description}</p>
      </div>
      {event.image && (
        <div className="relative aspect-[4/3] overflow-hidden bg-ink/5 md:col-span-4">
          <ResponsiveImage
            src={event.image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            objectFit="cover"
          />
        </div>
      )}
    </article>
  );
};

export default function ActualitesPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations('news');
  const currentDate = new Date();
  const sortedEvents = [...events].sort(
    (a, b) =>
      getEventStartDateTime(a).getTime() -
      getEventStartDateTime(b).getTime()
  );

  const upcomingEvents = sortedEvents.filter(
    (event) => getEventEndDateTime(event) >= currentDate
  );
  const pastEvents = sortedEvents.filter(
    (event) => getEventEndDateTime(event) < currentDate
  );

  // Generate structured data for upcoming events
  const eventSchemas = upcomingEvents.map((event) => getEventSchema(event, locale));

  return (
    <>
      {eventSchemas.map((schema, index) => (
        <Script
          key={index}
          id={`event-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      <div className="pb-24">
        <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />

        <section className="mx-auto max-w-7xl px-5 pt-20 md:px-10 md:pt-28">
          <h2 className="border-b border-ink/15 pb-6">{t('upcoming')}</h2>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <EventCard
                key={event.id ?? `${event.startDate}-${event.title}`}
                event={event}
                locale={locale}
                isPast={false}
              />
            ))
          ) : (
            <p className="border-b border-ink/15 py-12 font-serif text-2xl font-light text-ink/70">{t('noUpcoming')}</p>
          )}
        </section>

        <CalendarSection title={t('agenda')} />

        {pastEvents.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 pt-20 md:px-10 md:pt-28">
            <h2 className="border-b border-ink/15 pb-6">{t('past')}</h2>
            {pastEvents.reverse().map((event) => (
              <EventCard
                key={event.id ?? `${event.startDate}-${event.title}`}
                event={event}
                locale={locale}
                isPast
              />
            ))}
          </section>
        )}
      </div>
    </>
  );
}
