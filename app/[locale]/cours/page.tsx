import ResponsiveImage from "@/components/ResponsiveImage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PricingAndDocuments from "@/components/PricingAndDocuments";
import { useTranslations } from 'next-intl';

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

  return (
    <div className="min-h-screen py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {t('title')}
      </h1>
      <div className="max-w-6xl mx-auto grid gap-8">
        <div className="w-[80%] relative mx-auto mb-12 max-h-[70vh] overflow-hidden rounded-lg shadow-lg aspect-[16/9]">
          <ResponsiveImage
            src="/cours/clemence_jump.jpg"
            alt={t('imageAlt')}
            fill
            sizes="80vw"
            objectFit="cover"
            objectPosition="center 50%"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('schedule')}</h2>
          <div className="overflow-x-auto">
            <Table className="border-collapse border border-gray-300">
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r border-b border-gray-300 bg-gray-100">
                    {t('hours')}
                  </TableHead>
                  {days.map((day, index) => (
                    <TableHead
                      key={index}
                      className={`border-b border-gray-300 bg-gray-100 ${
                        index < days.length - 1 ? "border-r" : ""
                      }`}
                    >
                      {day}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {hours.map((hour, rowIndex) => (
                  <TableRow
                    key={hour}
                    className={rowIndex % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <TableCell className="border-r border-gray-300 font-medium">
                      {hour}
                    </TableCell>
                    {days.map((day, index) => {
                      const scheduleItem =
                        schedule[day]?.[hour as keyof HourSchedule];
                      return (
                        <TableCell
                          key={`${day}-${hour}`}
                          className={`border-gray-300 ${
                            index < days.length - 1 ? "border-r" : ""
                          } ${
                            scheduleItem
                              ? "rounded-lg bg-[var(--deep-burgundy)] text-[var(--ivory)] font-semibold"
                              : ""
                          }`}
                        >
                          {scheduleItem || ""}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <PricingAndDocuments />
      </div>
    </div>
  );
}
