import { useTranslations, useLocale } from 'next-intl';
import AnimalCard from '@/components/AnimalCard';
import {
  Animal,
  horses,
  ponies,
  retiredAnimals,
  otherAnimals,
} from "@/data/animals";

// Component to display a responsive grid of animals
interface AnimalGridProps {
  animals: Animal[];
  locale: string;
  category: 'horse' | 'pony' | 'retired' | 'other';
}

const AnimalGrid: React.FC<AnimalGridProps> = ({ animals, locale, category }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {animals.map((animal, index) => (
      <AnimalCard 
        key={index} 
        animal={animal} 
        locale={locale} 
        category={category}
      />
    ))}
  </div>
);

const CavaleriePage: React.FC = () => {
  const t = useTranslations('animals');
  const locale = useLocale();
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">{t('title')}</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('ponies')}</h2>
        <AnimalGrid animals={ponies} locale={locale} category="pony" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('horses')}</h2>
        <AnimalGrid animals={horses} locale={locale} category="horse" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('retired')}</h2>
        <AnimalGrid animals={retiredAnimals} locale={locale} category="retired" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t('other')}</h2>
        <AnimalGrid animals={otherAnimals} locale={locale} category="other" />
      </section>
    </div>
  );
};

export default CavaleriePage;
