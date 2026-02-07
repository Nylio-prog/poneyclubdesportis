import ResponsiveImage from "@/components/ResponsiveImage";
import { useTranslations } from 'next-intl';
import Calendar from "@/components/Calendar";
import { Testimonial } from "@/components/Testimonial";
import CertificationLogos from "@/components/CertificationLogos";
import PassSportLogo from "@/components/PassportLogo";
import { events } from "@/data/events";
import CertificationBar from "@/components/CertificationBar";

export default function Accueil() {
  const t = useTranslations('home');
  
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
      <CertificationBar />
      <section className="relative w-full h-screen md:h-100vh">
        <div className="absolute inset-0 overflow-hidden">
          <ResponsiveImage
            src="/hero-image.jpg"
            alt="Poney Club Desportis"
            fill
            objectFit="cover"
            objectPosition="63% center"
            priority
            placeholder="blur"
            blurDataURL="/hero-image-blur.jpg"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center px-4">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--ivory)] text-center">
            {t('hero.title')}
          </h1>
          
          {/* New year 2026 */}
          <p className="mt-6 text-lg md:text-2xl font-light uppercase tracking-[0.25em] text-[var(--ivory)] text-center opacity-90">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold mb-8">{t('about.title')}</h2>
        <CertificationLogos />
        <div className="space-y-4 text-lg mb-16">
          <p>{t('about.description1')}</p>
          <p>{t('about.description2')}</p>
          <p>{t('about.description3')}</p>
          <p>{t('about.description4')}</p>
        </div>

        <PassSportLogo />
        <h3 className="text-4xl font-bold mb-4 mt-16">{t('events.title')}</h3>
        <Calendar events={events} />
      </section>

      <section className="bg-[var(--ivory)] pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-4xl font-bold mb-12 text-center">
            {t('testimonials.title')}
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
