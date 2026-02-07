"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Link } from "@/lib/i18n/routing";
import { useTranslations } from 'next-intl';
import { useState } from "react";
import { useLocale } from 'next-intl';
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./mobile/MobileNav";

const Header = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string): boolean => pathname === path;

  const navItems = [
    { href: "/", label: t('home') },
    { href: "/le-club", label: t('club') },
    { href: "/photos", label: t('photos') },
    { href: "/cavalerie", label: t('horses') },
    { href: "/actualites", label: t('news') },
    { href: "/cours", label: t('lessons') },
    { href: "/pensions", label: t('boarding') },
    { href: "/contact", label: t('contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-[var(--deep-burgundy)] text-[var(--ivory)] z-50 border-b border-[var(--ivory)]/10 shadow-md">
      {/* Main Navigation */}
      <nav className="p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link href="/" className="text-2xl font-bold">
            <div className="flex items-center">
              <Image
                src="/icon-ivory.png"
                alt="Poney Club Desportis logo"
                width={50}
                height={50}
              />
              <span className="ml-2 text-sm sm:text-base md:text-xl">
                Poney Club Desportis
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <ul className="flex space-x-4">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`${
                      isActive(href)
                        ? "underline decoration-2 underline-offset-4"
                        : "hover:underline hover:decoration-2 hover:underline-offset-4"
                    } transition-all duration-200`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button and Language Switcher */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              className="text-[var(--ivory)] focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileNav 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        currentPath={pathname}
      />
    </header>
  );
};

export default Header;