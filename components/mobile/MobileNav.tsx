"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/i18n/routing";
import { X } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  navItems: NavItem[];
}

const MobileNav = ({ isOpen, onClose, currentPath, navItems }: MobileNavProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);

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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink/40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Full-height editorial panel */}
          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md overflow-y-auto bg-paper text-ink shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            id="mobile-navigation"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
              <span className="eyebrow text-wine">Poney Club Desportis</span>
              <button
                ref={firstFocusableRef}
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition-colors hover:bg-ink/5"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="px-6 py-6">
              <ul className="divide-y divide-ink/10">
                {navItems.map(({ href, label }, index) => {
                  const isLast = index === navItems.length - 1;
                  return (
                    <li key={href}>
                      <Link
                        ref={isLast ? lastFocusableRef : undefined}
                        href={href}
                        aria-current={isActive(href) ? "page" : undefined}
                        className={`flex min-h-[44px] items-center justify-between py-4 font-serif text-3xl font-light transition-colors hover:text-wine ${
                          isActive(href) ? "text-wine" : ""
                        }`}
                        onClick={onClose}
                      >
                        {label}
                        <span className="text-base text-sand" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
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
