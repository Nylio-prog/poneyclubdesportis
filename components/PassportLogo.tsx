"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import logo_passport from "@/public/logos/Logo_passport.jpg";

const PassSportLogo = () => {
  const t = useTranslations('home.passSport');
  
  return (
    <div className="flex flex-col items-center mt-8">
      <h3 className="text-2xl font-bold mb-4">Pass'Sport</h3>
      <p className="text-center mb-4">
        {t('eligible')}
      </p>
      <Image
        src={logo_passport}
        alt="Logo Pass'Sport"
        width={100}
        height={100}
        className="object-contain"
      />
    </div>
  );
};

export default PassSportLogo;
