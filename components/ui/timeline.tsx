interface TimelineEvent {
  year: number;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {events.map((event, index) => (
        <div key={index} className="flex mb-8">
          <div className="flex-shrink-0 w-24 text-right pr-4">
            <span className="font-bold text-[var(--deep-burgundy)]">
              {event.year}
            </span>
          </div>
          <div className="flex-grow border-l-2 border-[var(--deep-burgundy)] pl-4">
            <p>{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
