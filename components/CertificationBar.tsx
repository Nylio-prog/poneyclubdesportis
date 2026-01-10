"use client";

import Image from "next/image";

const CertificationBar = () => {
  const certifications = [
    {
      src: "/logos/Logo_FFE.jpg",
      alt: "Label FFE",
      label: "FFE",
    },
    {
      src: "/logos/Logo_bien_etre_animal.png",
      alt: "Label Bien-être animal",
      label: "Bien-être Animal",
    },
    {
      src: "/logos/Logo_poney_de_france.png",
      alt: "Label Poney de France",
      label: "Poney de France",
    },
    {
      src: "/logos/Logo_qualite.png",
      alt: "Label École Française d'Équitation",
      label: "École Française d'Équitation",
    },
  ];

  // We double the data to create the seamless infinite loop effect
  const marqueeCertifications = [...certifications, ...certifications];

  return (
    <section className="w-full border-b border-[var(--ivory)]/20 bg-[var(--deep-burgundy)] text-[var(--ivory)] pt-7 pb-3 md:pt-8 md:pb-4">
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop View (Static) */}
        <div className="hidden md:flex items-center justify-center gap-8">
          <span className="text-sm font-bold whitespace-nowrap mr-3">
            Nos labels :
          </span>
          {certifications.map((cert, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-[var(--ivory)] rounded-lg p-1.5 flex items-center justify-center">
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={48}
                  height={48}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
              <span className="text-sm font-medium opacity-90">
                {cert.label}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile View - Static Text + Auto Scrolling Carousel */}
        <div className="md:hidden flex items-center w-full">
          {/* Static Label */}
          <span className="text-sm font-bold whitespace-nowrap mr-3 z-20">
            Nos labels :
          </span>

          {/* Marquee Container */}
          <div className="relative overflow-hidden flex-1">
            {/* Gradient Fades */}
            <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-[var(--deep-burgundy)] to-transparent z-10"></div>
            <div className="absolute top-0 bottom-0 right-0 w-4 bg-gradient-to-l from-[var(--deep-burgundy)] to-transparent z-10"></div>

            <div className="flex w-max animate-marquee">
              {marqueeCertifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 flex-shrink-0 mx-4"
                >
                  <div className="relative w-9 h-9 bg-[var(--ivory)] rounded-lg p-1 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={cert.src}
                      alt={cert.alt}
                      width={36}
                      height={36}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                  <span className="text-xs opacity-90 whitespace-normal leading-tight">
                    {cert.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default CertificationBar;