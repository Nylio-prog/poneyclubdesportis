import dynamic from "next/dynamic";
import { events } from "@/data/events";

// Load the calendar only where it is displayed to keep other pages light.
const Calendar = dynamic(() => import("@/components/Calendar"), {
  loading: () => <div className="flex h-96 items-center justify-center text-ink/60">…</div>,
});

export default function CalendarSection({ title }: { title: string }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-20 md:px-10 md:pt-28">
      <h2 className="mb-10 border-b border-ink/15 pb-6">{title}</h2>
      <Calendar events={events} />
    </section>
  );
}
