import Image from "next/image";
import { useTranslations } from 'next-intl';
import PageHeader from "@/components/PageHeader";
import { photos } from "@/lib/site";

const diplomas = [
  { key: 'bpjepsBB', url: "/le-club/BPJEPS_BB.jpg" },
  { key: 'bpjepsCM', url: "/le-club/BPJEPS_AE_A_CM.jpg" },
  { key: 'bfeehBB', url: "/le-club/BFEEH_BB.jpg" },
  { key: 'bfee2BB', url: "/le-club/BFEE2_BB.jpg" },
] as const;

const timelineYears = ['2008', '2009', '2010', '2014', '2016', '2017', '2020'] as const;
const serviceKeys = ['service1', 'service2', 'service3', 'service4'] as const;

export default function LeClubPage() {
  const t = useTranslations('leClub');

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        lead={t('lead')}
        image={photos.aerial}
        imageAlt={t('imageAlt')}
      />

      {/* Introduction and services */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <p className="eyebrow text-wine md:col-span-3">{t('servicesTitle')}</p>
        <div className="md:col-span-9">
          <p className="font-serif text-3xl font-light leading-snug md:text-4xl md:leading-[1.2]">{t('intro1')}</p>
          <p className="mt-10 text-lg text-ink/70">{t('intro2')}</p>
          <ol className="mt-8 grid gap-px border-y border-ink/15 bg-ink/15 sm:grid-cols-2">
            {serviceKeys.map((key, index) => (
              <li key={key} className="flex gap-5 bg-paper py-6 sm:pr-6">
                <span className="font-serif text-3xl text-sand" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="pt-1 text-lg">{t(key)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Estate and welfare */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <div className="relative aspect-[4/5] md:col-span-5">
            <Image src={photos.roundPen} alt="" fill sizes="(max-width: 768px) 100vw, 40vw" quality={60} placeholder="blur" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
            <h2>{t('estateTitle')}</h2>
            <p className="mt-6 text-lg leading-relaxed text-paper/75">{t('facilities')}</p>
            <h3 className="mt-14 text-3xl">{t('welfareTitle')}</h3>
            <p className="mt-4 text-lg leading-relaxed text-paper/75">{t('welfare')}</p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <h2>{t('history')}</h2>
        <ol className="mt-14 border-t border-ink/15">
          {timelineYears.map((year) => (
            <li key={year} className="grid gap-3 border-b border-ink/15 py-10 md:grid-cols-12 md:gap-8">
              <p className="font-serif text-5xl font-light text-wine md:col-span-3 md:text-6xl">{year}</p>
              <div className="md:col-span-8 md:col-start-5">
                <h3>{t(`timeline.${year}.title`)}</h3>
                <p className="mt-3 text-lg leading-relaxed text-ink/70">{t(`timeline.${year}.description`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Diplomas */}
      <section className="border-t border-ink/15">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <h2 className="md:col-span-7">{t('diplomasTitle')}</h2>
            <p className="text-ink/70 md:col-span-5">{t('diplomasIntro')}</p>
          </div>
          <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {diplomas.map((diploma) => (
              <li key={diploma.key}>
                <a href={diploma.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-white ring-1 ring-ink/10">
                    <Image src={diploma.url} alt={t(`diplomas.${diploma.key}`)} fill sizes="(max-width: 768px) 50vw, 25vw" quality={60} className="object-contain p-3 transition duration-500 group-hover:scale-105" />
                  </div>
                  <p className="mt-4 font-medium leading-snug">{t(`diplomas.${diploma.key}`)}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-wine">{t('viewDiploma')}&nbsp;↗</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Rules */}
      <section className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-8 border-y border-ink/15 py-16 md:grid-cols-12 md:items-center">
          <h2 className="text-3xl md:col-span-4 md:text-4xl">{t('rules')}</h2>
          <p className="text-lg text-ink/70 md:col-span-5">
            {t('rulesText')} {t('rulesLink')}{t('rulesText2')}
          </p>
          <div className="md:col-span-3 md:text-right">
            <a href="/le-club/reglement_interieur.pdf" target="_blank" rel="noopener noreferrer" className="editorial-link">
              {t('rulesCta')}&nbsp;↗
            </a>
          </div>
        </div>
      </section>

      {/* Partner */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-wine">{t('partner')}</p>
            <h2 className="mt-5 text-4xl md:text-5xl">
              {t('partnerName')}
              <span className="mt-3 block font-serif text-2xl italic text-wine md:text-3xl">
                &amp; {t('partnerName2')}
              </span>
            </h2>
            <p className="mt-4 text-ink/70">{t('since')}</p>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:pt-10">
            <address className="not-italic text-lg">
              79 Rue Denis Papin
              <br />
              84120 {t('partnerCity')}
            </address>
            <a href="tel:+33490097333" className="mt-6 block font-serif text-3xl text-wine hover:underline">
              04 90 09 73 33
            </a>
            <a href="tel:+33490097333" className="editorial-link mt-6">
              {t('contact')}
            </a>
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section className="mx-auto max-w-4xl px-5 text-center md:px-10">
        <span className="font-serif text-8xl leading-none text-wine" aria-hidden="true">“</span>
        <p className="font-serif text-2xl font-light leading-snug md:text-4xl">{t('conclusion')}</p>
      </section>
    </div>
  );
}
