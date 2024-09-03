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
    { href: "/a-propos", label: "À Propos" },
    { href: "/cavalerie", label: "Cavalerie" },
    { href: "/actualites", label: "Actualités" },
    { href: "/cours", label: "Cours" },
    { href: "/pensions", label: "Pensions" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-[var(--deep-burgundy)] text-[var(--ivory)] p-4 z-50">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
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
        <ul className="hidden lg:flex space-x-4">
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

        {/* Hamburger Menu Icon */}
        <button
          className="lg:hidden text-[var(--ivory)] focus:outline-none"
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
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            ></path>
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-[68px] right-0 bottom-0 w-64 bg-[var(--deep-burgundy)] text-[var(--ivory)] p-4 transition-transform transform ease-in-out duration-300 z-10">
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
        </div>
      )}
    </header>
  );
};

export default Header;
