'use client';

import Link from "next/link";
import { useTranslations } from 'next-intl';

interface PDFLinkProps {
  href: string;
  text: string;
}

const PDFLink: React.FC<PDFLinkProps> = ({ href, text }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-bold text-[var(--deep-burgundy)] hover:underline block mb-2"
  >
    {text}
  </Link>
);

const PricingAndDocuments: React.FC = () => {
  const t = useTranslations('cours');
  
  const pricingDocuments: PDFLinkProps[] = [
    { href: "/cours/tarifs.pdf", text: t('pricing.viewRates') },
    {
      href: "/cours/fiche_adhesion.pdf",
      text: t('pricing.viewMembership'),
    },
  ];

  const licenseDocuments: PDFLinkProps[] = [
    {
      href: "/cours/ffe_autoquestionnaire_majeurs.pdf",
      text: t('license.viewAdults'),
    },
    {
      href: "/cours/ffe_autoquestionnaire_mineurs.pdf",
      text: t('license.viewMinors'),
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">{t('pricing.title')}</h2>
        {pricingDocuments.map((doc, index) => (
          <PDFLink key={index} {...doc} />
        ))}
      </section>

      <section className="py-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          {t('license.title')}
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            {t('license.questionnairesTitle')}
          </h3>
          {licenseDocuments.map((doc, index) => (
            <PDFLink key={index} {...doc} />
          ))}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">{t('license.medicalTitle')}</h3>
          <p className="mb-4">
            {t('license.medicalIntro')}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>{t('license.minors')}</strong> {t('license.minorsText')}
            </li>
            <li>
              <strong>{t('license.adultsUnder40')}</strong>
              <ul className="list-circle pl-6 mt-1">
                <li>
                  {t('license.adultsUnder40First')}
                </li>
                <li>
                  {t('license.adultsUnder40Renewal')}
                </li>
              </ul>
            </li>
            <li>
              <strong>{t('license.adults40Plus')}</strong>
              <ul className="list-circle pl-6 mt-1">
                <li>
                  {t('license.adults40PlusFirst')}
                </li>
                <li>
                  {t('license.adults40PlusBetween')}
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <p className="text-sm text-gray-600 italic mt-6">
          {t('license.source')}{" "}
          <Link
            href="https://www.ffe.com/faq/La-licence"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--deep-burgundy)] hover:underline"
          >
            {t('license.ffeLink')}
          </Link>
        </p>
      </section>
    </div>
  );
};

export default PricingAndDocuments;
