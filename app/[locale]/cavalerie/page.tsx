import { useTranslations, useLocale } from 'next-intl';
import AnimalCard from '@/components/AnimalCard';
import PageHeader from '@/components/PageHeader';
import {
  Animal,
  horses,
  ponies,
  retiredAnimals,
  otherAnimals,
} from "@/data/animals";
import { photos } from '@/lib/site';

type Category = 'pony' | 'horse' | 'retired' | 'other';

const CavaleriePage = () => {
  const t = useTranslations('animals');
  const locale = useLocale();

  const groups: { id: string; category: Category; title: string; animals: Animal[] }[] = [
    { id: 'poneys', category: 'pony', title: t('ponies'), animals: ponies },
    { id: 'chevaux', category: 'horse', title: t('horses'), animals: horses },
    { id: 'retraites', category: 'retired', title: t('retired'), animals: retiredAnimals },
    { id: 'autres', category: 'other', title: t('other'), animals: otherAnimals },
  ];

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        lead={t('lead')}
        image={photos.shetlands}
        imagePosition="center 40%"
      />

      {/* Category index */}
      <nav aria-label={t('title')} className="mx-auto mt-12 max-w-7xl px-5 md:px-10">
        <ul className="flex flex-wrap gap-x-8 gap-y-3 border-b border-ink/15 pb-6">
          {groups.map((group) => (
            <li key={group.id}>
              <a href={`#${group.id}`} className="text-sm font-semibold uppercase tracking-[0.15em] hover:text-wine">
                {group.title} <span className="text-sand">{group.animals.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {groups.map((group) => (
        <section key={group.id} id={group.id} className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-20 md:px-10 md:pt-28">
          <div className="flex items-baseline justify-between border-b border-ink/15 pb-6">
            <h2>{group.title}</h2>
            <span className="font-serif text-4xl text-sand">{String(group.animals.length).padStart(2, '0')}</span>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {group.animals.map((animal) => (
              <AnimalCard
                key={animal.name}
                animal={animal}
                locale={locale}
                category={group.category}
                retiredLabel={t('retiredBadge')}
                yearsOldLabel={t('yearsOld')}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default CavaleriePage;
