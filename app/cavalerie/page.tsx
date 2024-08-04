import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Animal,
  horses,
  ponies,
  retiredAnimals,
  otherAnimals,
} from "@/data/animals";

// Reusable AnimalCard component
const AnimalCard: React.FC<Animal> = ({ name, image, description }) => (
  <Card className="flex flex-col items-center">
    <CardHeader className="w-full">
      <Image
        src={image}
        alt={name}
        width={300}
        height={400}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33.3vw, 25vw"
        className="object-cover w-full"
        placeholder="blur"
        blurDataURL="/blurred.avif"
      />
    </CardHeader>
    <CardContent className="text-center">
      <CardTitle className="font-bold mb-2">{name}</CardTitle>
      <p>{description}</p>
    </CardContent>
  </Card>
);

// Component to display a grid of animals
interface AnimalGridProps {
  animals: Animal[];
}

const AnimalGrid: React.FC<AnimalGridProps> = ({ animals }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {animals.map((animal, index) => (
      <AnimalCard key={index} {...animal} />
    ))}
  </div>
);

const CavaleriePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Notre Cavalerie</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Nos Poneys</h2>
        <AnimalGrid animals={ponies} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Nos Chevaux</h2>
        <AnimalGrid animals={horses} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Nos Retraités</h2>
        <AnimalGrid animals={retiredAnimals} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Autres Animaux du Club</h2>
        <AnimalGrid animals={otherAnimals} />
      </section>
    </div>
  );
};

export default CavaleriePage;
