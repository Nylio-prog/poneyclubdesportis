"use client";

import { useLocale } from 'next-intl';
import { Locale, locales, localeFlags, localeNames } from '@/lib/i18n/config';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from '@/lib/i18n/routing';

interface LanguageSwitcherProps {
  className?: string;
  /** "light" for use over photos or dark backgrounds, "dark" on paper. */
  tone?: 'light' | 'dark';
}

export default function LanguageSwitcher({ className = '', tone = 'dark' }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    // Set announcement for screen readers
    const newLanguageName = localeNames[newLocale];
    setAnnouncement(
      locale === 'fr' 
        ? `Langue changée en ${newLanguageName}` 
        : `Language changed to ${newLanguageName}`
    );
    
    setIsOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  // Clear announcement after it's been read
  useEffect(() => {
    if (announcement) {
      const timer = setTimeout(() => setAnnouncement(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [announcement]);

  return (
    <>
      {/* Screen reader announcement for language changes */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      
      <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-11 items-center justify-center gap-1.5 rounded-full border px-3 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-200 ${
          tone === 'light' ? 'border-paper/50 hover:bg-paper/10' : 'border-ink/20 hover:bg-ink/5'
        }`}
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{localeFlags[locale as keyof typeof localeFlags]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 z-20 mt-2 w-48 border border-ink/10 bg-paper text-ink shadow-xl">
            <div className="py-1">
              {locales.map((loc) => (
                <button
                  type="button"
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={`flex min-h-11 w-full items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-ink/5 ${
                    locale === loc ? 'text-wine' : ''
                  }`}
                >
                  <span className="text-xs font-semibold tracking-[0.15em]">{localeFlags[loc]}</span>
                  <span className="font-medium">{localeNames[loc]}</span>
                  {locale === loc && (
                    <svg
                      className="w-4 h-4 ml-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
}
