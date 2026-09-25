import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import PricingAndDocuments from "@/components/PricingAndDocuments";
import { useTranslations } from 'next-intl';
import { photos } from "@/lib/site";

type Activity = string;
type HourSchedule = Partial<Record<(typeof hours)[number], Activity>>;
type WeekSchedule = Record<string, HourSchedule>;

const hours = [
  "9h30-10h30",
  "10h30-11h30",
  "11h30-12h30",
  "12h30-14h00",
  "14h00-15h00",
  "15h00-16h00",
  "16h00-17h00",
  "17h00-18h00",
];

export default function PricesSchedulesPage() {
  const t = useTranslations('cours');
  
  const days = [
    t('days.monday'),
    t('days.tuesday'),
    t('days.wednesday'),
    t('days.thursday'),
    t('days.friday'),
    t('days.saturday')
  ];

  const schedule: WeekSchedule = {
    [t('days.monday')]: {
      "9h30-10h30": t('activities.private'),
      "10h30-11h30": t('activities.private'),
      "11h30-12h30": t('activities.private'),
      "14h00-15h00": t('activities.private'),
      "15h00-16h00": t('activities.private'),
      "16h00-17h00": t('activities.private'),
      "17h00-18h00": t('activities.private'),
    },
    [t('days.tuesday')]: {
      "9h30-10h30": t('activities.private'),
      "10h30-11h30": t('activities.private'),
      "11h30-12h30": t('activities.private'),
      "14h00-15h00": t('activities.private'),
      "15h00-16h00": t('activities.private'),
      "16h00-17h00": t('activities.private'),
      "17h00-18h00": t('activities.private'),
    },
    [t('days.wednesday')]: {
      "9h30-10h30": t('activities.children'),
      "10h30-11h30": t('activities.babyPony'),
      "14h00-15h00": t('activities.childrenTeens'),
      "15h00-16h00": t('activities.childrenTeens2'),
      "16h00-17h00": t('activities.teensLevel1'),
    },
    [t('days.thursday')]: {
      "9h30-10h30": t('activities.private'),
      "10h30-11h30": t('activities.private'),
      "11h30-12h30": t('activities.private'),
      "14h00-15h00": t('activities.private'),
      "15h00-16h00": t('activities.private'),
      "16h00-17h00": t('activities.private'),
      "17h00-18h00": t('activities.private'),
    },
    [t('days.friday')]: {
      "9h30-10h30": t('activities.private'),
      "10h30-11h30": t('activities.private'),
      "11h30-12h30": t('activities.private'),
      "14h00-15h00": t('activities.private'),
      "15h00-16h00": t('activities.private'),
      "16h00-17h00": t('activities.private'),
      "17h00-18h00": t('activities.private'),
    },
    [t('days.saturday')]: {
      "9h30-10h30": t('activities.childrenCompetition'),
      "10h30-11h30": t('activities.teensLevel3'),
      "11h30-12h30": t('activities.teensBaby'),
      "14h00-15h00": t('activities.teensChildren'),
      "15h00-16h00": t('activities.teensLevel2'),
      "16h00-17h00": t('activities.teensLevel1'),
    },
  };

  const privateLesson = t('activities.private');
  const levels = [
    { key: 'babyPony', image: photos.babyPony },
    { key: 'children', image: photos.kidsLine },
    { key: 'teens', image: photos.competition },
    { key: 'adults', image: photos.ring },
  ] as const;

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        lead={t('lead')}
        image={photos.jump}
        imageAlt={t('imageAlt')}
        imagePosition="center 45%"
      />

      {/* Levels */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <h2>{t('levelsTitle')}</h2>
        <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((level) => (
            <li key={level.key}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={level.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" quality={60} placeholder="blur" className="object-cover" />
              </div>
              <p className="eyebrow mt-6 text-wine">{t(`levels.${level.key}.age`)}</p>
              <h3 className="mt-2 text-3xl">{t(`levels.${level.key}.title`)}</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{t(`levels.${level.key}.text`)}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Weekly schedule */}
      <section className="border-t border-ink/15">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <h2 className="md:col-span-7">{t('schedule')}</h2>
            <p className="text-lg text-ink/70 md:col-span-5">{t('scheduleLead')}</p>
          </div>

          {/* Desktop: full week grid */}
          <div className="mt-14 hidden overflow-x-auto md:block">
            <table className="w-full table-fixed border-collapse text-sm">
              <thead>
                <tr>
                  <th scope="col" className="w-28 border-b border-ink/30 pb-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-ink/60">
                    {t('hours')}
                  </th>
                  {days.map((day) => (
                    <th key={day} scope="col" className="border-b border-ink/30 pb-4 text-left font-serif text-xl font-normal">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hours.map((hour) => (
                  <tr key={hour} className="border-b border-ink/10">
                    <th scope="row" className="py-2 pr-4 text-left text-xs font-semibold tabular-nums text-ink/60">
                      {hour}
                    </th>
                    {days.map((day) => {
                      const activity = schedule[day]?.[hour];
                      const isGroup = activity && activity !== privateLesson;
                      return (
                        <td key={`${day}-${hour}`} className="p-1 align-top">
                          {activity && (
                            <span
                              className={`block h-full px-2 py-2 leading-snug ${
                                isGroup ? "bg-wine font-semibold text-paper" : "bg-ink/5 text-ink/60"
                              }`}
                            >
                              {activity}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: day-by-day group lessons */}
          <div className="mt-12 space-y-10 md:hidden">
            {days.map((day) => {
              const groupSlots = hours.filter((hour) => {
                const activity = schedule[day]?.[hour];
                return activity && activity !== privateLesson;
              });
              return (
                <div key={day}>
                  <h3 className="border-b border-ink/15 pb-3 text-2xl">{day}</h3>
                  {groupSlots.length > 0 ? (
                    <ul className="divide-y divide-ink/10">
                      {groupSlots.map((hour) => (
                        <li key={hour} className="flex gap-4 py-3">
                          <span className="w-28 shrink-0 text-sm font-semibold tabular-nums text-ink/60">{hour}</span>
                          <span className="font-medium">{schedule[day]?.[hour]}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="py-3 text-ink/60">{privateLesson}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PricingAndDocuments />
    </div>
  );
}
