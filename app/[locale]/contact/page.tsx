import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.038558399275!2d5.397516076655587!3d43.73052584742539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ca1f4bcddefc0b%3A0x973c8086050cd94!2sPoney%20Club%20Desportis!5e0!3m2!1sfr!2sfr!4v1722784871710!5m2!1sfr!2sfr`;
  const mapLinkUrl = `https://www.google.com/maps/place/Pony+Club+Desportis/@43.730522,5.3975161,17z/data=!3m1!4b1!4m6!3m5!1s0x12ca1f4bcddefc0b:0x973c8086050cd94!8m2!3d43.730522!4d5.400091!16s%2Fg%2F1tlnghz7?entry=ttu&g_ep=EgoyMDI0MDkwNC4wIKXMDSoASAFQAw%3D%3D`;

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-900">{t('title')}</h1>
        
        {/* Contact Methods - Large tappable buttons for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {/* Phone Button */}
          <a
            href="tel:+33642878958"
            className="flex items-center justify-center gap-3 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 min-h-[60px] border-2 border-transparent hover:border-[var(--deep-burgundy)]"
          >
            <Phone className="w-6 h-6 text-[var(--deep-burgundy)]" />
            <div className="text-left">
              <div className="text-sm text-gray-600">{t('phone')}</div>
              <div className="text-lg font-semibold text-gray-900">+33 6 42 87 89 58</div>
            </div>
          </a>

          {/* Email Button */}
          <a
            href="mailto:poneyclub.desportis@free.fr"
            className="flex items-center justify-center gap-3 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 min-h-[60px] border-2 border-transparent hover:border-[var(--deep-burgundy)]"
          >
            <Mail className="w-6 h-6 text-[var(--deep-burgundy)]" />
            <div className="text-left">
              <div className="text-sm text-gray-600">{t('email')}</div>
              <div className="text-lg font-semibold text-gray-900 break-all">poneyclub.desportis@free.fr</div>
            </div>
          </a>
        </div>

        {/* Address Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-start gap-3 mb-6">
            <MapPin className="w-6 h-6 text-[var(--deep-burgundy)] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('address')}</h2>
              <p className="text-lg text-gray-700">
                1070, Chemin Vidau<br />
                84160 Cadenet<br />
                France
              </p>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg w-full"
              title={t('mapTitle')}
            ></iframe>
          </div>

          {/* Open in Maps Button */}
          <div className="text-center">
            <a
              href={mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--deep-burgundy)] text-[var(--ivory)] px-6 py-3 rounded-lg hover:bg-[var(--vivid-burgundy)] transition-colors text-lg font-semibold min-h-[44px]"
            >
              <MapPin className="w-5 h-5" />
              {t('openMaps')}
            </a>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">{t('followUs')}</h2>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.facebook.com/p/Poney-Club-Desportis-100027924560857/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1877F2] text-white px-6 py-3 rounded-lg hover:bg-[#166FE5] transition-colors min-h-[44px]"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
              <span className="font-semibold">Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/poneyclubdesportis/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity min-h-[44px]"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-semibold">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
