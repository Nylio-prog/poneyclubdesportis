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

  const marqueeCertifications = [
    ...certifications,
    ...certifications,
    ...certifications,
  ];

  return (
    <section className="w-full bg-[var(--ivory)] text-[var(--deep-burgundy)] py-2 pt-6 shadow-md relative z-40 border-b border-[#5A0F1D]/10">
      
      {/* Container matched to Header width (max-w-6xl) */}
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center h-12">
        
        {/* UNIFIED LABEL BLOCK (Mobile & Desktop) */}
        {/* - 'flex': Visible on all screens
           - 'border-r-2': Vertical line on all screens
           - 'pr-4 mr-4': Slightly tighter spacing on mobile
           - 'md:pr-6 md:mr-6': Wider spacing on desktop 
        */}
        <div className="flex items-center border-r-2 border-[#5A0F1D]/10 pr-4 mr-4 md:pr-6 md:mr-6 h-full flex-shrink-0">
           <span className="text-xs md:text-sm font-black uppercase tracking-widest opacity-80">
            Nos Labels
          </span>
        </div>
        
        {/* Marquee Window */}
        <div className="relative overflow-hidden flex-1 h-full flex items-center">
          
          {/* Gradients */}
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[#FDFBF7] to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Track */}
          <div className="flex w-max animate-marquee hover:pause items-center">
            {marqueeCertifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-3 flex-shrink-0 mx-6 md:mx-8 group cursor-default"
              >
                {/* Logo Image */}
                <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    width={40}
                    height={40}
                    className="object-contain max-w-full max-h-full mix-blend-multiply"
                  />
                </div>
                {/* Text Label */}
                <span className="text-xs md:text-sm font-semibold whitespace-nowrap">
                  {cert.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .hover\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default CertificationBar;