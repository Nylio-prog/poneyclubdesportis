import Image from "next/image";
import { useTranslations } from 'next-intl';
import PageHeader from "@/components/PageHeader";
import { club, photos } from "@/lib/site";

export default function PensionsPage() {
  const t = useTranslations('pensions');

  const prix = [
    { service: t('services.groupNatural'), prix: "240 €" },
    { service: t('services.groupBuilt'), prix: "260 €" },
    { service: t('services.individual'), prix: "300 €" },
  ];

  const sections = [
    { title: t('wellbeing'), text: t('wellbeingText'), image: photos.greeting, alt: t('imageAlt.care'), position: 'center 20%' },
    { title: t('spaces'), text: t('spacesText'), image: photos.aerial, alt: t('imageAlt.estate'), position: 'center' },
    { title: t('food'), text: t('foodText'), image: photos.hay, alt: t('imageAlt.hay'), position: 'center' },
  ];

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        lead={t('lead')}
        image={photos.paddocks}
        imageAlt={t('imageAlt.parcs')}
      />

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <ol className="space-y-24 md:space-y-32">
          {sections.map((section, index) => (
            <li key={section.title} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
              <div className={`relative aspect-[4/3] overflow-hidden md:col-span-6 ${index % 2 ? 'md:order-2 md:col-start-7' : ''}`}>
                <Image src={section.image} alt={section.alt} fill sizes="(max-width: 768px) 100vw, 50vw" quality={60} placeholder="blur" className="object-cover" style={{ objectPosition: section.position }} />
              </div>
              <div className={`md:col-span-5 ${index % 2 ? 'md:order-1' : 'md:col-start-8'}`}>
                <span className="font-serif text-6xl font-light text-sand" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-4 text-4xl md:text-5xl">{section.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-ink/75">{section.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <div className="md:col-span-5">
            <h2>{t('pricing')}</h2>
            <p className="mt-6 text-lg text-paper/70">{t('ctaText')}</p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-paper/30 text-left text-xs font-semibold uppercase tracking-[0.15em] text-paper/60">
                  <th scope="col" className="pb-4 font-semibold">{t('service')}</th>
                  <th scope="col" className="pb-4 text-right font-semibold">{t('pricePerMonth')}</th>
                </tr>
              </thead>
              <tbody>
                {prix.map((item) => (
                  <tr key={item.service} className="border-b border-paper/15">
                    <td className="py-6 pr-6 text-lg">{item.service}</td>
                    <td className="whitespace-nowrap py-6 text-right font-serif text-4xl text-sand">
                      {item.prix}
                      <span className="ml-1 font-sans text-xs text-paper/60">{t('perMonth')}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="mx-auto max-w-7xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <h2 className="text-5xl md:text-7xl">{t('ctaTitle')}</h2>
          <div className="space-y-6">
            <a href={club.phoneHref} className="block font-serif text-4xl text-wine hover:underline md:text-5xl">
              {club.phone}
            </a>
            <a href={club.emailHref} className="block break-all text-lg underline-offset-4 hover:underline">
              {club.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
