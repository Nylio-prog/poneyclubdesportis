"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/i18n/routing";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

const MobileNav = ({ isOpen, onClose, currentPath }: MobileNavProps) => {
  const t = useTranslations('nav');
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = menuRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  // Focus first element when opened
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isOpen]);

  const isActive = (path: string): boolean => currentPath === path;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in menu */}
          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[var(--deep-burgundy)] text-[var(--ivory)] z-50 shadow-2xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Close button */}
            <div className="flex justify-end p-4 border-b border-[var(--ivory)]/10">
              <button
                ref={firstFocusableRef}
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[var(--ivory)]/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--ivory)] focus:ring-offset-2 focus:ring-offset-[var(--deep-burgundy)]"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation items */}
            <nav className="p-6">
              <ul className="space-y-2">
                {navItems.map(({ href, label }, index) => {
                  const isLast = index === navItems.length - 1;
                  return (
                    <li key={href}>
                      <Link
                        ref={isLast ? lastFocusableRef : undefined}
                        href={href}
                        className={`block py-3 px-4 rounded-lg text-lg transition-all duration-200 min-h-[44px] flex items-center ${
                          isActive(href)
                            ? "bg-[var(--ivory)]/20 font-semibold"
                            : "hover:bg-[var(--ivory)]/10"
                        } focus:outline-none focus:ring-2 focus:ring-[var(--ivory)] focus:ring-offset-2 focus:ring-offset-[var(--deep-burgundy)]`}
                        onClick={onClose}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
