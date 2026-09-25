import Image from "next/image";
import { useLocale, useTranslations } from 'next-intl';
import { Link } from "@/lib/i18n/routing";
import { events } from "@/data/events";
import {
  formatEventDay,
  getEventEndDateTime,
  getEventTimeLabel,
  getEventTitle,
  getFeaturedEvents,
} from "@/lib/events";
import type { Locale } from "@/lib/i18n/config";
import { club, labels, photos } from "@/lib/site";

const offerKeys = ['lessons', 'camps', 'rides', 'boarding'] as const;
const offerMedia = {
  lessons: { href: '/cours', image: photos.kidsLesson },
  camps: { href: '/actualites', image: photos.babyPony },
  rides: { href: '/le-club', image: photos.broom },
  boarding: { href: '/pensions', image: photos.hay },
};
const statKeys = ['founded', 'area', 'age', 'labels'] as const;
const testimonialKeys = ['testimonial1', 'testimonial2', 'testimonial3'] as const;
const gallery = [
  { src: photos.jump, className: 'col-span-2 row-span-2 aspect-square md:aspect-auto' },
  { src: photos.shetlands, className: 'aspect-square' },
  { src: photos.hug, className: 'aspect-square' },
  { src: photos.groundWork, className: 'aspect-square' },
  { src: photos.christmas, className: 'aspect-square' },
];

export default function Accueil() {
  const t = useTranslations('home');
  const locale = useLocale() as Locale;
  const now = new Date();
  const showNewYearMessage = now.getMonth() === 0 || now.getMonth() === 1;
  const featuredEvents = getFeaturedEvents(events, 3, now);
  const facilities = t.raw('domain.facilities') as string[];
  const [leadTestimonial, ...otherTestimonials] = testimonialKeys;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[620px] overflow-hidden text-paper">
        <Image
          src={photos.hero}
          alt={t('hero.imageAlt')}
          fill
          preload
          fetchPriority="high"
          placeholder="blur"
          quality={75}
          sizes="100vw"
          className="object-cover object-[60%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-14 md:px-10 md:pb-20">
          <p className="eyebrow text-sand">
            {t('hero.title')} <span className="hidden sm:inline">· {t('hero.kicker')}</span>
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[0.95] md:text-8xl">{t('hero.headline')}</h1>
          {showNewYearMessage && (
            <p className="mt-4 font-serif text-2xl italic text-sand">
              {t('hero.newYear', { year: now.getFullYear() })}
            </p>
          )}
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-base leading-relaxed text-paper/85 md:text-lg">{t('hero.lead')}</p>
            <Link
              href="/cours"
              className="inline-flex items-center gap-3 self-start bg-paper px-7 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-sand"
            >
              {t('hero.cta')} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Intro + stats */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <p className="eyebrow text-wine md:col-span-3">{t('intro.eyebrow')}</p>
        <div className="md:col-span-9">
          <h2 className="text-3xl leading-snug first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-wine md:text-5xl md:leading-[1.15] md:first-letter:text-8xl">
            {t('intro.lead')} <span className="text-ink/50">{t('intro.aside')}</span>
          </h2>
          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-ink/75">{t('about.description1')}</p>
          <dl className="mt-16 grid grid-cols-2 gap-y-10 border-t border-ink/15 pt-10 md:grid-cols-4">
            {statKeys.map((key) => (
              <div key={key} className="flex flex-col-reverse pr-4">
                <dt className="mt-2 text-xs uppercase tracking-[0.2em] text-ink/60">{t(`stats.${key}.label`)}</dt>
                <dd className="font-serif text-4xl md:text-5xl">{t(`stats.${key}.value`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Offers as alternating editorial spreads */}
      <section className="border-t border-ink/15">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10">
          <div className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2>{t('offers.title')}</h2>
            <p className="max-w-sm text-ink/70">{t('offers.lead')}</p>
          </div>
          <ol className="space-y-24 md:space-y-32">
            {offerKeys.map((key, index) => (
              <li key={key} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <div className={`relative aspect-[4/5] overflow-hidden md:col-span-6 ${index % 2 ? 'md:order-2 md:col-start-7' : ''}`}>
                  <Image src={offerMedia[key].image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" quality={60} placeholder="blur" className="object-cover" />
                </div>
                <div className={`md:col-span-5 ${index % 2 ? 'md:order-1' : 'md:col-start-8'}`}>
                  <span className="font-serif text-6xl font-light text-sand" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="eyebrow mt-6 text-wine">{t(`offers.${key}.kicker`)}</p>
                  <h3 className="mt-3 text-4xl md:text-5xl">{t(`offers.${key}.title`)}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-ink/75">{t(`offers.${key}.text`)}</p>
                  <Link href={offerMedia[key].href} className="editorial-link mt-8">
                    {t(`offers.${key}.title`)} →
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The estate */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <div className="md:col-span-5">
            <h2>{t('domain.title')}</h2>
            <p className="mt-6 text-lg text-paper/70">{t('domain.lead')}</p>
            <ul className="mt-10 divide-y divide-paper/15 border-y border-paper/15">
              {facilities.map((facility) => (
                <li key={facility} className="flex items-center justify-between py-4">
                  <span>{facility}</span>
                  <span className="text-sand" aria-hidden="true">—</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] md:col-span-7 md:aspect-auto">
            <Image src={photos.aerial} alt={t('domain.imageAlt')} fill sizes="(max-width: 768px) 100vw, 60vw" quality={60} placeholder="blur" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-10">
        <div className="mb-12 flex items-end justify-between gap-4">
          <h2>{t('events.title')}</h2>
          <Link href="/actualites" className="editorial-link shrink-0">
            {t('events.all')}
          </Link>
        </div>
        <ul className="border-t border-ink/15">
          {featuredEvents.map((event) => {
            const { day, month } = formatEventDay(event, locale);
            const isUpcoming = getEventEndDateTime(event) >= now;
            return (
              <li key={event.id ?? `${event.startDate}-${event.title}`}>
                <Link
                  href={event.id ? `/actualites#${event.id}` : '/actualites'}
                  className="grid gap-2 border-b border-ink/15 py-8 transition-colors hover:bg-ink/[0.03] md:grid-cols-12 md:items-baseline md:gap-8"
                >
                  <p className="font-serif text-3xl md:col-span-2">
                    {day} <span className="text-lg uppercase text-ink/60">{month}</span>
                  </p>
                  <h3 className="text-2xl md:col-span-7 md:text-2xl">{getEventTitle(event, locale)}</h3>
                  <p className="text-sm uppercase tracking-[0.15em] text-ink/60 md:col-span-3 md:text-right">
                    {isUpcoming ? t('events.upcoming') : t('events.past')} · {getEventTimeLabel(event, locale)}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="sr-only">{t('gallery.title')}</h2>
          <Link href="/photos" className="editorial-link ml-auto">
            {t('gallery.all')}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
          {gallery.map((item, index) => (
            <div key={index} className={`relative overflow-hidden ${item.className}`}>
              <Image src={item.src} alt="" fill sizes="(max-width: 768px) 50vw, 25vw" quality={60} placeholder="blur" className="object-cover transition duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-ink/15">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <h2 className="sr-only">{t('testimonials.title')}</h2>
          <figure className="mx-auto max-w-4xl text-center">
            <span className="font-serif text-8xl leading-none text-wine" aria-hidden="true">“</span>
            <blockquote className="font-serif text-2xl font-light leading-snug md:text-4xl">
              {t(`testimonials.${leadTestimonial}.text`)}
            </blockquote>
            <figcaption className="eyebrow mt-8 text-ink/60">{t(`testimonials.${leadTestimonial}.name`)}</figcaption>
          </figure>
          <div className="mt-20 grid gap-10 md:grid-cols-2">
            {otherTestimonials.map((key) => (
              <figure key={key} className="border-l border-sand pl-6">
                <blockquote className="leading-relaxed text-ink/75">“{t(`testimonials.${key}.text`)}”</blockquote>
                <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.25em]">{t(`testimonials.${key}.name`)}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Labels */}
      <section className="border-y border-ink/15 bg-white/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-12 md:flex-row md:justify-between md:px-10">
          <div>
            <h2 className="eyebrow font-sans text-ink/60">{t('labels.title')}</h2>
            <p className="mt-2 text-sm text-ink/60">{t('labels.passSport')}</p>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-8">
            {labels.map((label) => (
              <li key={label.name}>
                <Image src={label.src} alt={label.name} width={64} height={64} className="h-14 w-auto object-contain mix-blend-multiply grayscale transition hover:grayscale-0" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Visit */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32">
        <div>
          <h2 className="text-5xl md:text-7xl">{t('visit.title')}</h2>
          <p className="mt-6 max-w-md text-lg text-ink/70">{t('visit.lead')}</p>
        </div>
        <div className="space-y-8 md:pt-4">
          <a href={club.phoneHref} className="block font-serif text-4xl text-wine hover:underline md:text-5xl">
            {club.phone}
          </a>
          <a href={club.emailHref} className="block break-all text-lg underline-offset-4 hover:underline">{club.email}</a>
          <address className="not-italic text-lg text-ink/70">
            {club.street}
            <br />
            {club.city}
          </address>
          <a href={club.mapsHref} target="_blank" rel="noopener noreferrer" className="editorial-link">
            {t('visit.directions')}&nbsp;↗
          </a>
        </div>
      </section>
    </div>
  );
}
