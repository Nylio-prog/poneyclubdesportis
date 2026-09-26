"use client";

import Image from "next/image";
import { Link, usePathname } from "@/lib/i18n/routing";
import { useTranslations } from 'next-intl';
import { useState } from "react";
import { logoSize, navItems } from "@/lib/site";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./mobile/MobileNav";
import logoFfe from "@/public/logos/Logo_FFE_transparent.png";

const Header = () => {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // The home page header floats over the full-screen hero photo.
  const isOverlay = pathname === "/";
  const isActive = (path: string): boolean => pathname === path;

  const items = navItems.map(({ href, key }) => ({ href, label: t(key) }));

  return (
    <header
      className={
        isOverlay
          ? "absolute inset-x-0 top-0 z-50 text-paper"
          : "sticky top-0 z-50 border-b border-ink/10 bg-paper text-ink"
      }
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-5" aria-label="Navigation">
        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className={`flex h-11 w-11 items-center justify-center rounded-full ${isOverlay ? "" : "bg-wine"}`}>
              <Image src="/icon-ivory.png" alt="" width={40} height={40} />
            </span>
            <span className="font-serif text-xl tracking-tight">
              <span className="hidden sm:inline">Poney Club </span>Desportis
            </span>
          </Link>
          {/* FFE affiliation mark: on a paper badge over the hero photo, behind a thin rule elsewhere */}
          <span
            title={t('ffe')}
            className={
              isOverlay
                ? "flex items-center rounded-md bg-paper/95 px-1.5 py-1 shadow-sm"
                : "flex items-center border-l border-ink/15 pl-3 md:pl-4"
            }
          >
            <Image src={logoFfe} alt={t('ffe')} {...logoSize(logoFfe, 26)} />
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7 text-sm tracking-wide">
            {items.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`underline-offset-8 transition-opacity ${
                    isActive(href)
                      ? "underline decoration-1"
                      : "opacity-85 hover:underline hover:opacity-100"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher tone={isOverlay ? "light" : "dark"} />
        </div>

        {/* Mobile Menu Button and Language Switcher */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher tone={isOverlay ? "light" : "dark"} />
          <button
            className={`flex h-11 w-11 items-center justify-center rounded-full border ${
              isOverlay ? "border-paper/50" : "border-ink/20"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentPath={pathname}
        navItems={[{ href: "/", label: t('home') }, ...items]}
      />
    </header>
  );
};

export default Header;
