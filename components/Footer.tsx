import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@/lib/i18n/routing";
import { useTranslations } from 'next-intl';

const FacebookIcon = ({ size = 32 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 32 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Footer = () => {
  const t = useTranslations('footer');
  
  return (
    <footer className="bg-[var(--deep-burgundy)] text-[var(--ivory)] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Club Info */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold mb-4">Poney Club Desportis</h2>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link
                href="https://www.facebook.com/p/Poney-Club-Desportis-100027924560857/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--vivid-burgundy)] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={32} />
              </Link>
              <Link
                href="https://www.instagram.com/poneyclubdesportis/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--vivid-burgundy)] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={32} />
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start">
                <Phone size={16} className="mr-2 flex-shrink-0" />
                <Link href="tel:+33642878958" className="hover:underline">
                  +33 6 42 87 89 58
                </Link>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                <Link
                  href="mailto:poneyclub.desportis@free.fr"
                  className="hover:underline break-all"
                >
                  poneyclub.desportis@free.fr
                </Link>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">{t('address')}</h3>
            <div className="flex items-start justify-center md:justify-start">
              <MapPin size={16} className="mr-2 flex-shrink-0 mt-1" />
              <address className="not-italic">
                1070, Chemin Vidau<br />
                84160 Cadenet<br />
                France
              </address>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[var(--ivory)]/20 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Poney Club Desportis. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
