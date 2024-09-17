import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/data/events";
import { formatDate } from "@/lib/utils";

interface Event {
  title: string;
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
  description: string;
  image?: string;
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => (
  <Card className="overflow-hidden">
    <CardHeader>
      <CardTitle>{event.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="md:flex">
        {event.image && (
          <div className="relative w-full max-w-[500px] min-h-[300px] flex-shrink-0 mb-4 md:mb-0 md:mr-4">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, 192px"
              className="object-contain"
            />
          </div>
        )}
        <div className={event.image ? "" : "w-full"}>
          <p className="text-sm text-gray-500 mb-2">
            {event.startDate === event.endDate
              ? `${formatDate(event.startDate)} ${event.startHour} - ${
                  event.endHour
                }`
              : `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`}
          </p>
          <p>{event.description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function ActualitesPage() {
  const currentDate = new Date();
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const upcomingEvents = sortedEvents.filter(
    (event) => new Date(event.endDate) >= currentDate
  );
  const pastEvents = sortedEvents.filter(
    (event) => new Date(event.endDate) < currentDate
  );

  return (
    <div className="min-h-screen py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Actualités et Événements
      </h1>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Événements à venir</h2>
        <div className="grid gap-6 mb-12">
          {upcomingEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>

        {pastEvents.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Événements passés</h2>
            <div className="grid gap-6">
              {pastEvents.reverse().map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
