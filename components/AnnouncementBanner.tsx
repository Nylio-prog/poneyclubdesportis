"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const bannerClosed = sessionStorage.getItem("announcementBannerClosed");
    if (bannerClosed === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("announcementBannerClosed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-[82px] left-0 right-0 bg-gradient-to-r from-amber-300 to-amber-500 text-gray-900 z-40 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1">
            {/* Icon */}
            <span className="text-2xl animate-pulse" aria-hidden="true">
              🐴
            </span>

            {/* Announcement Text */}
            <p className="text-sm sm:text-base font-medium">
              <span className="font-bold">Portes ouvertes</span> ce Samedi 6
              Septembre de 15h à 18h avec baptêmes de poney
            </p>

            {/* Link to Actualités */}
            <Link
              href="/actualites"
              className="ml-2 inline-flex items-center text-sm sm:text-base font-semibold underline hover:no-underline transition-all duration-200 whitespace-nowrap"
            >
              En savoir plus
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="ml-4 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-amber-400 rounded-full p-1"
            aria-label="Fermer l'annonce"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
