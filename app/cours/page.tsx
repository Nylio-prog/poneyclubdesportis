import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PricingAndDocuments from "@/components/PricingAndDocuments";

type Activity = string;
type HourSchedule = Partial<Record<(typeof hours)[number], Activity>>;
type WeekSchedule = Record<(typeof days)[number], HourSchedule>;

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const hours = [
  "9h30-10h30",
  "10h30-11h30",
  "11h30-12h30",
  "13h30-14h00",
  "14h00-15h00",
  "15h00-16h00",
  "16h00-17h00",
  "17h00-18h00",
];

const schedule: WeekSchedule = {
  Lundi: {
    "9h30-10h30": "Réservation cours particulier",
    "10h30-11h30": "Réservation cours particulier",
    "11h30-12h30": "Réservation cours particulier",
    "14h00-15h00": "Réservation cours particulier",
    "15h00-16h00": "Réservation cours particulier",
    "16h00-17h00": "Réservation cours particulier",
    "17h00-18h00": "Réservation cours particulier",
  },
  Mardi: {
    "9h30-10h30": "Réservation cours particulier",
    "10h30-11h30": "Réservation cours particulier",
    "11h30-12h30": "Réservation cours particulier",
    "14h00-15h00": "Réservation cours particulier",
    "15h00-16h00": "Réservation cours particulier",
    "16h00-17h00": "Réservation cours particulier",
    "17h00-18h00": "Réservation cours particulier",
  },
  Mercredi: {
    "9h30-10h30": "Enfants 4-10 ans",
    "10h30-11h30": "Baby poney",
    "14h00-15h00": "Ado galop 3-4 / Enfant 4-10 ans",
    "15h00-16h00": "Ado galop 2-3 / Enfant 4-10 ans",
    "16h00-17h00": "Ado galop 1-2",
  },
  Jeudi: {
    "9h30-10h30": "Réservation cours particulier",
    "10h30-11h30": "Réservation cours particulier",
    "11h30-12h30": "Réservation cours particulier",
    "14h00-15h00": "Réservation cours particulier",
    "15h00-16h00": "Réservation cours particulier",
    "16h00-17h00": "Réservation cours particulier",
    "17h00-18h00": "Réservation cours particulier",
  },
  Vendredi: {
    "9h30-10h30": "Réservation cours particulier",
    "10h30-11h30": "Réservation cours particulier",
    "11h30-12h30": "Réservation cours particulier",
    "14h00-15h00": "Réservation cours particulier",
    "15h00-16h00": "Réservation cours particulier",
    "16h00-17h00": "Réservation cours particulier",
    "17h00-18h00": "Réservation cours particulier",
  },
  Samedi: {
    "9h30-10h30": "Enfant 4-10 ans / Cours compétition",
    "10h30-11h30": "Ado galop 2-3-4",
    "11h30-12h30": "Ado galop 4-5-6 / Baby poney",
    "14h00-15h00": "Ado galop 4-5-6 / Enfant 4-10 ans",
    "15h00-16h00": "Ado galop 2-3",
    "16h00-17h00": "Ado galop 1-2",
  },
};

export default function PricesSchedulesPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Informations sur les cours
      </h1>
      <div className="max-w-6xl mx-auto grid gap-8">
        <div className="w-[80%] relative mx-auto mb-12 max-h-[70vh] overflow-hidden rounded-lg shadow-lg aspect-[16/9]">
          <Image
            src="/cours/clemence_jump.jpg"
            alt="Clemence Medail saut à cheval"
            fill
            className="object-cover object-[center_50%] rounded-lg"
          />
        </div>
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
