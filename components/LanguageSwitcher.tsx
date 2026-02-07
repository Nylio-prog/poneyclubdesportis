"use client";

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { locales, localeFlags, localeNames } from '@/lib/i18n/config';
import { useState, useEffect } from 'react';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const handleLocaleChange = (newLocale: string) => {
    // Set announcement for screen readers
    const newLanguageName = localeNames[newLocale as keyof typeof localeNames];
    setAnnouncement(
      locale === 'fr' 
        ? `Langue changée en ${newLanguageName}` 
        : `Language changed to ${newLanguageName}`
    );
    
    setIsOpen(false);
    
    // Get the current full pathname from window.location
    const currentPath = window.location.pathname;
    let pathWithoutLocale = currentPath;
    
    // Remove current locale prefix if it exists
    if (currentPath.startsWith('/fr/')) {
      pathWithoutLocale = currentPath.slice(3);
    } else if (currentPath === '/fr') {
      pathWithoutLocale = '/';
    } else if (currentPath.startsWith('/en/')) {
      pathWithoutLocale = currentPath.slice(3);
    } else if (currentPath === '/en') {
      pathWithoutLocale = '/';
    }
    
    // Build new URL: French (default) has no prefix, English has /en prefix
    const newUrl = newLocale === 'fr' ? pathWithoutLocale : `/en${pathWithoutLocale}`;
    
    // Navigate to new URL
    window.location.href = newUrl;
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
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-[var(--ivory)]/10 hover:bg-[var(--ivory)]/20 transition-colors duration-200"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-2xl">{localeFlags[locale as keyof typeof localeFlags]}</span>
        <span className="hidden sm:inline text-sm font-medium">{localeNames[locale as keyof typeof localeNames]}</span>
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
          <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-[var(--deep-burgundy)] border border-[var(--ivory)]/20 z-20">
            <div className="py-1">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-[var(--ivory)]/10 transition-colors ${
                    locale === loc ? 'bg-[var(--ivory)]/5' : ''
                  }`}
                >
                  <span className="text-2xl">{localeFlags[loc]}</span>
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
