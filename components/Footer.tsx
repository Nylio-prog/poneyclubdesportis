import Image from "next/image";
import { Link } from "@/lib/i18n/routing";
import { useTranslations } from 'next-intl';
import { club, labels, navItems } from "@/lib/site";

const Footer = () => {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Club */}
          <div className="md:col-span-4">
            <p className="font-serif text-3xl font-light">{club.name}</p>
            <p className="mt-4 max-w-xs text-paper/60">{t('tagline')}</p>
            <p className="mt-8 flex gap-6 text-sm">
              <a href={club.facebook} target="_blank" rel="noopener noreferrer" className="editorial-link hover:text-sand">
                Facebook
              </a>
              <a href={club.instagram} target="_blank" rel="noopener noreferrer" className="editorial-link hover:text-sand">
                Instagram
              </a>
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h2 className="eyebrow font-sans text-sand">{t('explore')}</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {navItems.map(({ href, key }) => (
                <li key={href}>
                  <Link href={href} className="text-paper/80 hover:text-paper hover:underline hover:underline-offset-4">
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-5">
            <h2 className="eyebrow font-sans text-sand">{t('contact')}</h2>
            <a href={club.phoneHref} className="mt-5 block font-serif text-3xl font-light hover:text-sand md:text-4xl">
              {club.phone}
            </a>
            <a href={club.emailHref} className="mt-3 block break-all text-paper/80 hover:text-paper hover:underline hover:underline-offset-4">
              {club.email}
            </a>
            <address className="mt-6 not-italic text-paper/60">
              {club.street}
              <br />
              {club.city}, {club.country}
            </address>
            <a href={club.mapsHref} target="_blank" rel="noopener noreferrer" className="editorial-link mt-6 hover:text-sand">
              {tCommon('directions')}&nbsp;↗
            </a>
          </div>
        </div>

        {/* Labels */}
        <div className="mt-16 flex flex-col gap-6 border-t border-paper/15 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="eyebrow font-sans text-paper/50">{t('labels')}</p>
          <ul className="flex flex-wrap items-center gap-3">
            {labels.map((label) => (
              <li key={label.name} className="flex h-14 w-14 items-center justify-center rounded-full bg-paper p-2">
                <Image src={label.src} alt={label.name} width={40} height={40} className="h-full w-full object-contain mix-blend-multiply" />
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-sm text-paper/50">
          &copy; {new Date().getFullYear()} {club.name}. {t('rights')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
