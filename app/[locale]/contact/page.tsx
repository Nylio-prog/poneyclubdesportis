import { useTranslations } from 'next-intl';
import PageHeader from '@/components/PageHeader';
import { club } from '@/lib/site';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="pb-24">
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />

      <section className="mx-auto mt-14 grid max-w-7xl gap-12 px-5 md:mt-20 md:grid-cols-12 md:px-10">
        <div className="space-y-12 md:col-span-5">
          <div className="border-t border-ink/15 pt-6">
            <p className="eyebrow text-wine">{t('callUs')}</p>
            <a href={club.phoneHref} className="mt-4 block font-serif text-4xl font-light hover:text-wine md:text-5xl">
              {club.phone}
            </a>
          </div>

          <div className="border-t border-ink/15 pt-6">
            <p className="eyebrow text-wine">{t('emailUs')}</p>
            <a href={club.emailHref} className="mt-4 block break-all font-serif text-2xl font-light hover:text-wine md:text-3xl">
              {club.email}
            </a>
          </div>

          <div className="border-t border-ink/15 pt-6">
            <p className="eyebrow text-wine">{t('visitUs')}</p>
            <address className="mt-4 font-serif text-2xl font-light not-italic md:text-3xl">
              {club.street}
              <br />
              {club.city}
              <br />
              {club.country}
            </address>
            <a href={club.mapsHref} target="_blank" rel="noopener noreferrer" className="editorial-link mt-6">
              {t('openMaps')}&nbsp;↗
            </a>
          </div>

          <div className="border-t border-ink/15 pt-6">
            <p className="eyebrow text-wine">{t('followUs')}</p>
            <p className="mt-4 flex gap-8">
              <a href={club.facebook} target="_blank" rel="noopener noreferrer" className="editorial-link">
                Facebook
              </a>
              <a href={club.instagram} target="_blank" rel="noopener noreferrer" className="editorial-link">
                Instagram
              </a>
            </p>
          </div>
        </div>

        <div className="md:col-span-7">
          <iframe
            src={club.mapEmbedSrc}
            width="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/5] h-auto w-full grayscale-[30%] md:aspect-auto md:h-full md:min-h-[560px]"
            title={t('mapTitle')}
          ></iframe>
        </div>
      </section>
    </div>
  );
}
