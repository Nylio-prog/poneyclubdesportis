import Image from "next/image";
import Calendar from "@/components/Calendar";
import { Testimonial } from "@/components/Testimonial";

import { events } from "@/data/events";

export default function Accueil() {
  const testimonials = [
    {
      name: "Sarah J.",
      text: "Ma fille a tellement gagné en confiance depuis qu'elle a rejoint le Poney Club Desportis. Les instructeurs sont fantastiques !",
    },
    {
      name: "Mike T.",
      text: "Les installations sont excellentes et les poneys sont bien entretenus. C'est un environnement idéal pour apprendre ",
    },
    {
      name: " Emma L. ",
      text: " Je fais de l'équitation ici depuis des années et je me réjouis toujours de chaque leçon. Hautement recommandé ! ",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="h-screen relative">
        <Image
          src="/hero-image.jpg"
          alt="Poney Club Desportis"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-[var(--ivory)]">
            Bienvenue au Poney Club Desportis
          </h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold mb-8">Présentation</h2>
        <p className="text-lg mb-16">
          Le Poney Club Desportis est un centre équestre situé à Cadenet, dans
          un domaine de 30 hectares où l'attention et l'amour portés aux chevaux
          est la priorité. Des cours sont dispensés toute l'année pour tous
          niveaux dès 3 ans. Nous proposons également des services de pensions
          et demi-pensions.
        </p>
        <h3 className="text-4xl font-bold mb-4">Évènements planifiés</h3>
        <Calendar events={events} />
      </section>
      <section className="bg-[var(--ivory)] pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-4xl font-bold mb-12 text-center">
            Ce que nos cavaliers disent
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                name={testimonial.name}
                text={testimonial.text}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
