"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Photo = {
  src: string;
  loading: "lazy";
};

export default function MasonryPhotoGallery(): JSX.Element {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const importPhotos = () => {
      const context = require.context(
        "../../public/photos",
        false,
        /\.(png|jpe?g|webp)$/
      );
      const keys = context.keys();
      const images = keys.map((key) => ({
        src: `/photos/${key.replace("./", "")}`,
        loading: "lazy" as const,
      }));
      setPhotos(images);
    };
    importPhotos();
  }, []);

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-12 text-center">Galerie Photo</h1>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            className="relative mb-4 break-inside-avoid group"
            style={{
              animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            <Image
              src={photo.src}
              alt={`Gallery photo ${index + 1}`}
              width={300}
              height={200}
              className="w-full rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
              loading={photo.loading}
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .group:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
