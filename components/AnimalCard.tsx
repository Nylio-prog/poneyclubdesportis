import ResponsiveImage from '@/components/ResponsiveImage';
import { Animal } from '@/data/animals';

interface AnimalCardProps {
  animal: Animal;
  locale: string;
  category: 'horse' | 'pony' | 'retired' | 'other';
  retiredLabel: string;
  yearsOldLabel: string;
}

const AnimalCard = ({ animal, locale, category, retiredLabel, yearsOldLabel }: AnimalCardProps) => {
  const { name, image, description, descriptionEn, age, breed, breedEn } = animal;

  // Use translated content based on locale
  const displayDescription = locale === 'en' && descriptionEn ? descriptionEn : description;
  const displayBreed = locale === 'en' && breedEn ? breedEn : breed;
  const meta = [age ? `${age} ${yearsOldLabel}` : null, displayBreed].filter(Boolean).join(' · ');

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink/5">
        <ResponsiveImage
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          objectFit="cover"
          objectPosition="center center"
          placeholder="blur"
          blurDataURL="/blurred.avif"
          className="transition duration-700 group-hover:scale-105"
        />
        {category === 'retired' && (
          <span className="absolute left-4 top-4 bg-paper px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-wine">
            {retiredLabel}
          </span>
        )}
      </div>
      <h3 className="mt-5 text-3xl">{name}</h3>
      {meta && <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-ink/60">{meta}</p>}
      <p className="mt-3 leading-relaxed text-ink/75">{displayDescription}</p>
    </article>
  );
};

export default AnimalCard;
