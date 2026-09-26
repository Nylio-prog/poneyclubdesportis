import { useTranslations } from 'next-intl';

interface DocumentLinkProps {
  href: string;
  text: string;
}

const DocumentLink = ({ href, text }: DocumentLinkProps) => (
  <li>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-6 border-b border-ink/15 py-5 transition-colors hover:text-wine"
    >
      <span className="text-lg">{text}</span>
      <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.15em] text-ink/50 group-hover:text-wine">
        PDF ↗
      </span>
    </a>
  </li>
);

const PricingAndDocuments = () => {
  const t = useTranslations('cours');

  const pricingDocuments: DocumentLinkProps[] = [
    { href: "/cours/tarifs.pdf", text: t('pricing.viewRates') },
    { href: "/cours/fiche_adhesion.pdf", text: t('pricing.viewMembership') },
  ];

  const licenseDocuments: DocumentLinkProps[] = [
    { href: "/cours/ffe_autoquestionnaire_majeurs.pdf", text: t('license.viewAdults') },
    { href: "/cours/ffe_autoquestionnaire_mineurs.pdf", text: t('license.viewMinors') },
  ];

  return (
    <section className="bg-ink/[0.03]">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-10">
        <h2>{t('documentsTitle')}</h2>

        <div className="mt-14 grid gap-16 md:grid-cols-2">
          <div>
            <h3 className="text-2xl">{t('pricing.title')}</h3>
            <ul className="mt-4 border-t border-ink/15">
              {pricingDocuments.map((doc) => (
                <DocumentLink key={doc.href} {...doc} />
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl">{t('license.questionnairesTitle')}</h3>
            <ul className="mt-4 border-t border-ink/15">
              {licenseDocuments.map((doc) => (
                <DocumentLink key={doc.href} {...doc} />
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-ink/15 pt-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-wine">{t('license.title')}</p>
            <h3 className="mt-4 text-3xl">{t('license.medicalTitle')}</h3>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg text-ink/75">{t('license.medicalIntro')}</p>
            <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              <div className="grid gap-2 py-5 md:grid-cols-3">
                <dt className="font-semibold">{t('license.minors')}</dt>
                <dd className="text-ink/75 md:col-span-2">{t('license.minorsText')}</dd>
              </div>
              <div className="grid gap-2 py-5 md:grid-cols-3">
                <dt className="font-semibold">{t('license.adultsUnder40')}</dt>
                <dd className="space-y-1 text-ink/75 md:col-span-2">
                  <p>{t('license.adultsUnder40First')}</p>
                  <p>{t('license.adultsUnder40Renewal')}</p>
                </dd>
              </div>
              <div className="grid gap-2 py-5 md:grid-cols-3">
                <dt className="font-semibold">{t('license.adults40Plus')}</dt>
                <dd className="space-y-1 text-ink/75 md:col-span-2">
                  <p>{t('license.adults40PlusFirst')}</p>
                  <p>{t('license.adults40PlusBetween')}</p>
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-sm italic text-ink/60">
              {t('license.source')}{" "}
              <a
                href="https://www.ffe.com/faq/La-licence"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-wine"
              >
                {t('license.ffeLink')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingAndDocuments;
