'use client';

import Image from "next/image";
import { useTranslations } from 'next-intl';

import logo_poney_de_france from "@/public/logos/Logo_poney_de_france.png";
import logo_qualite from "@/public/logos/Logo_qualite.png";
import logo_ffe from "@/public/logos/Logo_FFE.jpg";
import logo_bien_etre_animal from "@/public/logos/Logo_bien_etre_animal.png";

const CertificationLogos = () => {
  const t = useTranslations('home.certifications');
  
  const ffeLogos = [
    { src: logo_ffe, alt: "Logo Fédération Française d'Équitation" },
  ];

  const labels = [
    { src: logo_bien_etre_animal, alt: "Logo Bien-être animal" },
    { src: logo_poney_de_france, alt: "Logo Poney de France" },
    { src: logo_qualite, alt: "Logo qualité" },
  ];

  return (
    <div className="mb-12">
      <div className="flex justify-around items-center">
        <div className="flex-1 text-center">
          <p className="mb-4 font-semibold">{t('ourAffiliation')}</p>
          {ffeLogos.map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={120}
              className="object-contain mx-auto"
            />
          ))}
        </div>
        <div className="flex-1">
          <div className=" p-4 rounded-lg max-w-sm mx-auto">
            <p className="text-center mb-4 font-semibold">
              {t('proudOfLabels')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {labels.map((logo, index) => (
                <Image
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationLogos;
