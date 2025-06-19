import Image from "next/image";
import Calendar from "@/components/Calendar";
import { Testimonial } from "@/components/Testimonial";
import CertificationLogos from "@/components/CertificationLogos";
import PassSportLogo from "@/components/PassportLogo";
import { events } from "@/data/events";
import Link from "next/link";

export default function Accueil() {
  const testimonials = [
    {
      name: "Charlie K.",
      text: "Un Poney Club où il fait bon vivre, où les animaux évoluent dans le respect, où les enfants s'épanouissent en apprenant à se responsabiliser au travers de ce merveilleux sport individuel qui se pratique à deux 🐎 et tout cela dans un cadre magnifique en pleine nature 🌱",
    },
    {
      name: " Audrey C. ",
      text: "Je remercie Béatrice de s'occuper aussi bien de ma jument qui est en pension en groupe chez elle depuis 4 ans. Cadre magnifique au milieu de la colline de cadenet. Lieu apaisant et sécurisant. Béatrice assure quotidiennement le bien être de tous les chevaux, elle propose des cours poneys dans le respect des animaux et dans la bienveillance.",
    },
    {
      name: "Eugénie K.",
      text: "Club très accueillant, deux superbes coachs, des cours pour les petits comme pour les grands, des cours variés, des super poneys et chevaux adaptés à tous les niveaux. De nombreuses balades et super point de vue !",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-screen md:h-100vh">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/hero-image.jpg"
            alt="Poney Club Desportis"
            fill
            className="object-cover object-[63%_center] md:object-[center_30%]"
            priority
            placeholder="blur"
            blurDataURL="/hero-image-blur.jpg"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--ivory)] text-center">
            Bienvenue au Poney Club Desportis
          </h1>
        </div>
      </section>

      {/* Summer Offers Section */}
      <section className="max-w-6xl mx-auto pt-16 px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-[var(--deep-burgundy)] mb-4">
            🌞 Offres d'été 2025 🐎
          </h2>
          <p className="text-[var(--vivid-burgundy)] text-lg">
            Profitez de nos offres spéciales pour les vacances d'été !
          </p>
        </div>

        {/* We use `items-stretch` to make both columns equal in height by default */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Stages d'été */}
          <div className="bg-gradient-to-br from-[var(--ivory)] to-red-50 rounded-2xl p-6 border-2 border-[var(--vivid-burgundy)] border-opacity-30 flex flex-col">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[var(--deep-burgundy)] mb-2">
                🎯 Stages d'été
              </h3>
              <p className="text-[var(--vivid-burgundy)] text-sm">
                Balades en forêt, jeux, voltige et bien plus !
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-lg">📅</span>
                <div>
                  <h4 className="font-semibold text-[var(--deep-burgundy)] text-sm">
                    Période
                  </h4>
                  <p className="text-[var(--vivid-burgundy)] text-sm">
                    Du 7 juillet au 15 août 2025
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg">⏰</span>
                <div>
                  <h4 className="font-semibold text-[var(--deep-burgundy)] text-sm">
                    Horaires
                  </h4>
                  <p className="text-[var(--vivid-burgundy)] text-sm">
                    Lundi au vendredi, 9h30 - 12h30
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg">💰</span>
                <div>
                  <h4 className="font-semibold text-[var(--deep-burgundy)] text-sm">
                    Tarifs
                  </h4>
                  <p className="text-[var(--vivid-burgundy)] text-sm">
                    <strong>40€</strong> pour 3 stages/semaine
                    <br />
                    <strong>45€</strong> le stage individuel
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-auto">
              <Link
                href="tel:+33642878958"
                className="inline-block bg-[var(--vivid-burgundy)] hover:bg-[var(--deep-burgundy)] text-[var(--ivory)] font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
              >
                Réserver un stage
              </Link>
            </div>
          </div>

          {/* Demi-pension */}
          <div className="bg-gradient-to-br from-[var(--ivory)] to-red-50 rounded-2xl p-6 border-2 border-[var(--vivid-burgundy)] border-opacity-30 flex flex-col">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[var(--deep-burgundy)] mb-2">
                🏇 Demi-pension d'été
              </h3>
              <p className="text-[var(--vivid-burgundy)] text-sm">
                Vivez une relation privilégiée tout l'été.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-lg">🎯</span>
                <div>
                  <h4 className="font-semibold text-[var(--deep-burgundy)] text-sm">
                    Niveau requis
                  </h4>
                  <p className="text-[var(--vivid-burgundy)] text-sm">
                    À partir du Galop 2
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg">📋</span>
                <div>
                  <h4 className="font-semibold text-[var(--deep-burgundy)] text-sm">
                    Programme hebdomadaire
                  </h4>
                  <p className="text-[var(--vivid-burgundy)] text-sm">
                    1 séance autonomie + 1 promenade + 1 cours
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg">💰</span>
                <div>
                  <h4 className="font-semibold text-[var(--deep-burgundy)] text-sm">
                    Tarif mensuel
                  </h4>
                  <p className="text-[var(--vivid-burgundy)] text-sm">
                    <strong>200€</strong> pour 1 mois complet
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-auto">
              <Link
                href="tel:+33642878958"
                className="inline-block bg-[var(--vivid-burgundy)] hover:bg-[var(--deep-burgundy)] text-[var(--ivory)] font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
              >
                Demander infos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold mb-8">Poney Club à Cadenet</h2>
        <CertificationLogos />
        <div className="space-y-4 text-lg mb-16">
          <p>
            Bienvenue au Poney Club Desportis ! Créé en 2008, notre centre
            équestre est situé à Cadenet (84160), au cœur de 27 hectares de
            nature préservée dans le Parc du Luberon (Vaucluse). Nous proposons
            un large choix d'activités équestres pour tous les niveaux, dès 3
            ans. Que vous soyez débutant ou cavalier confirmé, vous pouvez
            profiter de cours adaptés, de stages, de balades, ainsi que de
            services de pension pour vos chevaux et poneys.
          </p>
          <p>
            Le bien-être de nos animaux est au cœur de nos préoccupations, comme
            en témoigne notre certification "Bien-être animal". Nous sommes
            également fiers de nos labels "Poney de France" et "Qualité", qui
            garantissent un enseignement de haute qualité dans des installations
            adaptées et sécurisées.
          </p>
          <p>
            Tout au long de l'année, nous organisons des événements comme des
            stages, des concours, et des fêtes du club. Ces moments sont
            l'occasion de partager notre passion dans une ambiance conviviale.
          </p>
          <p>
            Le Poney Club Desportis, c'est bien plus qu'un simple centre
            équestre. C'est un espace où respect, sécurité et plaisir de
            l'équitation se rencontrent pour offrir une expérience inoubliable,
            que ce soit pour une balade, un cours, ou la pension de votre
            cheval.
          </p>
        </div>

        <PassSportLogo />
        <h3 className="text-4xl font-bold mb-4 mt-16">Évènements planifiés</h3>
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
