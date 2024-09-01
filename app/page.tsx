import Image from "next/image";
import Calendar from "@/components/Calendar";
import { Testimonial } from "@/components/Testimonial";

import { events } from "@/data/events";

import logo_ffe from "@/public/logos/Logo_FFE.jpg";
import logo_bien_etre_animal from "@/public/logos/Logo_bien_etre_animal.png";
import logo_passport from "@/public/logos/Logo_passport.jpg";
import logo_poney_de_france from "@/public/logos/Logo_poney_de_france.png";
import logo_qualite from "@/public/logos/Logo_qualite.png";

const CertificationLogos = () => {
  const logos = [
    { src: logo_ffe, alt: "Logo Fédération Française d'Équitation" },
    { src: logo_bien_etre_animal, alt: "Logo Bien-être animal" },
    { src: logo_passport, alt: "Logo Passport" },
    { src: logo_poney_de_france, alt: "Logo Poney de France" },
    { src: logo_qualite, alt: "Logo qualité" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 my-8">
      {logos.map((logo, index) => (
        <Image
          key={index}
          src={logo.src}
          alt={logo.alt}
          width={100}
          height={100}
          className="object-contain"
        />
      ))}
    </div>
  );
};

export default function Accueil() {
  const testimonials = [
    {
      name: "Charlie K.",
      text: "Un Poney Club où il fait bon vivre, où les animaux évoluent dans le respect, où les enfants s'épanouissent en apprenant à se responsabiliser au travers de ce merveilleux sport individuel qui se pratique à deux 🐎 et tout cela dans un cadre magnifique en pleine nature 🌱",
    },
    {
      name: "Eugénie K.",
      text: "Club très accueillant, deux superbes coachs, des cours pour les petits comme pour les grands, des cours variés, des super poneys et chevaux adaptés à tous les niveaux. De nombreuses balades et super point de vue !",
    },
    {
      name: " Emma L. ",
      text: " Je fais de l'équitation ici depuis des années et je me réjouis toujours de chaque leçon. Hautement recommandé ! ",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative w-full h-screen md:h-[calc(100vh-80px)]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/hero-image.jpg"
            alt="Poney Club Desportis"
            fill
            className="object-cover object-[70%_center] md:object-[center_30%]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--ivory)] text-center">
            Bienvenue au Poney Club Desportis
          </h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold mb-8">Présentation</h2>
        <CertificationLogos />
        <p className="text-lg mb-16">
          Bienvenue au Poney Club Desportis ! Nous sommes heureux de vous
          accueillir dans notre magnifique domaine de 30 hectares à Cadenet. En
          tant que membre de la Fédération Française d'Équitation (FFE), nous
          nous engageons à offrir une expérience équestre de qualité. Chez nous,
          le bien-être de nos équidés est primordial. Notre certification
          "Bien-être animal" témoigne de l'attention particulière que nous leur
          portons. Nous sommes également fiers de notre label "Poney de France",
          qui garantit la qualité de notre enseignement et de nos installations,
          spécialement adaptées à la pratique du poney. Nous proposons des cours
          pour tous les niveaux, des débutants de 3 ans aux cavaliers
          expérimentés. Notre équipe passionnée et qualifiée assure des cours
          tout au long de l'année, permettant à chacun de progresser à son
          rythme. Pour les propriétaires, nous offrons aussi des services de
          pension et demi-pension. Le Poney Club Desportis, c'est plus qu'un
          simple centre équestre. C'est un lieu où l'amour des chevaux se
          conjugue avec un enseignement de qualité. Notre label "Qualité" et
          notre participation au programme "Poney École" reflètent notre
          engagement envers l'excellence et l'éducation équestre. Nous sommes
          dévoués à créer un environnement où la passion de l'équitation
          s'épanouit dans le respect et la sécurité. Que vous soyez débutant ou
          cavalier confirmé, nous avons à cœur de vous offrir une expérience
          équestre enrichissante et joyeuse.
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
