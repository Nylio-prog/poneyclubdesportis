"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string): boolean => pathname === path;

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/le-club", label: "Le Club" },
    { href: "/photos", label: "Photos" },
    { href: "/cavalerie", label: "Cavalerie" },
    { href: "/actualites", label: "Actualités" },
    { href: "/cours", label: "Cours" },
    { href: "/pensions", label: "Pensions" },
    { href: "/contact", label: "Contact" },
  ];

  const certifications = [
    {
      src: "/logos/Logo_FFE.jpg",
      alt: "Label FFE",
    },
    {
      src: "/logos/Logo_bien_etre_animal.png",
      alt: "Label Bien-être animal",
    },
    {
      src: "/logos/Logo_poney_de_france.png",
      alt: "Label Poney de France",
    },
    {
      src: "/logos/Logo_qualite.png",
      alt: "Label École Française d'Équitation",
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-[var(--deep-burgundy)] text-[var(--ivory)] z-50 border-b border-[var(--ivory)]/10 shadow-md">
      {/* Main Navigation */}
      <nav className="p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* LEFT: Logo & Title */}
          <Link href="/" className="text-2xl font-bold z-50">
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

          {/* RIGHT (Desktop): Nav + Certifications */}
          <div className="hidden lg:flex items-center gap-6">
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

            {/* Vertical Separator */}
            <div className="h-6 w-px bg-[var(--ivory)]/20"></div>

            {/* Certification Logos (No Text) */}
            <div className="flex items-center gap-2">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-[var(--ivory)] rounded p-0.5 flex items-center justify-center w-8 h-8"
                >
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    width={32}
                    height={32}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Hamburger Menu Icon (Mobile Only) */}
          <button
            className="lg:hidden text-[var(--ivory)] focus:outline-none z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-[82px] right-0 bottom-0 w-64 bg-[var(--deep-burgundy)] text-[var(--ivory)] border-t border-[var(--ivory)]/10 transition-transform transform ease-in-out duration-300 z-40 flex flex-col justify-between p-4 pb-8">
          
          {/* Top: Navigation Links */}
          <ul className="space-y-4">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block ${
                    isActive(href)
                      ? "underline decoration-2 underline-offset-4"
                      : "hover:underline hover:decoration-2 hover:underline-offset-4"
                  } transition-all duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom: Certifications Logos */}
          <div>
            <div className="border-t border-[var(--ivory)]/10 mb-4"></div>
            <p className="text-xs text-[var(--ivory)]/70 mb-2 text-center">Nos labels</p>
            <div className="flex items-center justify-center gap-3">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-[var(--ivory)] rounded p-1 flex items-center justify-center w-10 h-10"
                >
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    width={40}
                    height={40}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;