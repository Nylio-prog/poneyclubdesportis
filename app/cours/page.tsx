import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const prices = [
  { service: "Leçon de groupe (1 heure)", price: "50 €" },
  { service: "Leçon privée (1 heure)", price: "80 €" },
  { service: "Stage demi-journée", price: "120 €" },
  { service: "Stage journée complète", price: "200 €" },
];

type Activity = string;
type HourSchedule = Partial<Record<(typeof hours)[number], Activity>>;
type WeekSchedule = Record<(typeof days)[number], HourSchedule>;

const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
const hours = ["10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h"];

const schedule: WeekSchedule = {
  Lundi: {
    "10h": "Cours débutants",
    "14h": "Cours intermédiaires",
    "16h": "Cours avancés",
  },
  Mardi: {
    "11h": "Cours enfants",
    "15h": "Cours adultes",
  },
  Mercredi: {
    "10h": "Stage demi-journée",
    "14h": "Cours particuliers",
  },
  Jeudi: {
    "11h": "Cours seniors",
    "16h": "Entraînement compétition",
  },
  Vendredi: {
    "10h": "Cours débutants",
    "15h": "Cours intermédiaires",
  },
  Samedi: {
    "10h": "Stage journée complète",
    "14h": "Cours familles",
  },
  Dimanche: {
    "11h": "Balade à cheval",
    "15h": "Cours particuliers",
  },
};

export default function PricesSchedulesPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Prix et Horaires</h1>
      <div className="max-w-6xl mx-auto grid gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Agenda</h2>
          <div className="overflow-x-auto">
            <Table className="border-collapse border border-gray-300">
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r border-b border-gray-300 bg-gray-100">
                    Heures
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
                              ? "rounded-lg bg-[var(--deep-burgundy)] text-[var(--ivory)]"
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
        <div>
          <h2 className="text-2xl font-bold mb-4">Prix</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Prix</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prices.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.service}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
