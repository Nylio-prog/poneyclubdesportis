import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/data/events"; // Adjust the import path as needed

export default function ActualitesPage() {
  return (
    <div className="min-h-screen pt-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Dernières nouvelles
      </h1>
      <div className="max-w-4xl mx-auto grid gap-6">
        {events.map((event, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="md:flex">
                <div className="relative w-full md:w-48 h-48 flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 192px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    {event.startDate === event.endDate
                      ? event.startDate
                      : `${event.startDate} - ${event.endDate}`}
                  </p>
                  <p>{event.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
