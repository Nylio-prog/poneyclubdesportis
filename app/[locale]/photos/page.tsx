import ResponsiveImage from "@/components/ResponsiveImage";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import photo5975 from '@/public/photos/IMG_5975.jpeg';
import photo5981 from '@/public/photos/IMG_5981.jpeg';
import photo6056 from '@/public/photos/IMG_6056.jpeg';
import photo20250216A from '@/public/photos/IMG-20250216-WA0000.jpg';
import photo20250216B from '@/public/photos/IMG-20250216-WA0001.jpg';
import photo20260502 from '@/public/photos/IMG-20260502-WA0000.jpg';
import photo20260628A from '@/public/photos/IMG-20260628-WA0000.jpg';
import photo20260628B from '@/public/photos/IMG-20260628-WA0002.jpg';
import photo20260628C from '@/public/photos/IMG-20260628-WA0003.jpg';
import photo20260628D from '@/public/photos/IMG-20260628-WA0004.jpg';
import photo20260628E from '@/public/photos/IMG-20260628-WA0005.jpg';
import photo20260628F from '@/public/photos/IMG-20260628-WA0008.jpg';
import photo20260628G from '@/public/photos/IMG-20260628-WA0009.jpg';
import photoCollage from '@/public/photos/Minimal Square Photo Collage Photography Instagram Post.png';

const photos = [
  photo5975,
  photo5981,
  photo6056,
  photo20250216A,
  photo20250216B,
  photo20260502,
  photo20260628A,
  photo20260628B,
  photo20260628C,
  photo20260628D,
  photo20260628E,
  photo20260628F,
  photo20260628G,
  photoCollage,
];

export default async function MasonryPhotoGallery({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('photos');

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-12 text-center">{t('title')}</h1>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            className="photo-fade-in relative mb-4 break-inside-avoid group"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <ResponsiveImage
              src={photo}
              alt={`${t('altText')} ${index + 1}`}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-auto w-full rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
