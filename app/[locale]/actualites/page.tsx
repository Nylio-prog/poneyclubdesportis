import ResponsiveImage from "@/components/ResponsiveImage";
import { useLocale } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/data/events";
import { formatDate, formatTime } from "@/lib/utils";
import Script from 'next/script';
import { getEventSchema } from "@/lib/structured-data";
import { Locale } from "@/lib/i18n/config";
import {
  ClubEvent,
  getEventDateTime,
  getEventDescription,
  getEventTitle,
} from '@/lib/events';

const EventCard: React.FC<{ event: ClubEvent; locale: Locale }> = ({ event, locale }) => {
  const title = getEventTitle(event, locale);
  const description = getEventDescription(event, locale);
  
  return (
    <Card id={event.id} className="overflow-hidden" style={{ scrollMarginTop: '7rem' }}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="md:flex">
          {event.image && (
            <div className="relative w-full max-w-[500px] min-h-[300px] flex-shrink-0 mb-4 md:mb-0 md:mr-4">
              <ResponsiveImage
                src={event.image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                objectFit="contain"
              />
            </div>
          )}
          <div className={event.image ? "" : "w-full"}>
            <p className="text-sm text-gray-500 mb-2">
              {event.startDate === event.endDate
                ? `${formatDate(event.startDate, locale)} ${formatTime(event.startHour, locale)} - ${formatTime(event.endHour, locale)}`
                : `${formatDate(event.startDate, locale)} - ${formatDate(event.endDate, locale)}`}
            </p>
            <p className="whitespace-pre-line">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ActualitesPage() {
  const locale = useLocale() as Locale;
  const currentDate = new Date();
  const sortedEvents = [...events].sort(
    (a, b) =>
      getEventDateTime(a.startDate, a.startHour).getTime() -
      getEventDateTime(b.startDate, b.startHour).getTime()
  );

  const upcomingEvents = sortedEvents.filter(
    (event) => getEventDateTime(event.endDate, event.endHour) >= currentDate
  );
  const pastEvents = sortedEvents.filter(
    (event) => getEventDateTime(event.endDate, event.endHour) < currentDate
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
      <div className="min-h-screen py-16 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {locale === 'fr' ? 'Actualités et Événements' : 'News and Events'}
        </h1>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            {locale === 'fr' ? 'Événements à venir' : 'Upcoming Events'}
          </h2>
          <div className="grid gap-6 mb-12">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id ?? `${event.startDate}-${event.title}`}
                event={event}
                locale={locale}
              />
            ))}
          </div>

          {pastEvents.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'fr' ? 'Événements passés' : 'Past Events'}
              </h2>
              <div className="grid gap-6 opacity-60">
                {pastEvents.reverse().map((event) => (
                  <EventCard
                    key={event.id ?? `${event.startDate}-${event.title}`}
                    event={event}
                    locale={locale}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
