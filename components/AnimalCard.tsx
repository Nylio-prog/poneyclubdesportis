'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ResponsiveImage from '@/components/ResponsiveImage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Animal } from '@/data/animals';

interface AnimalCardProps {
  animal: Animal;
  locale: string;
  category: 'horse' | 'pony' | 'retired' | 'other';
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, locale, category }) => {
  const { name, image, description, descriptionEn, age, breed, breedEn } = animal;
  
  // Use translated content based on locale
  const displayDescription = locale === 'en' && descriptionEn ? descriptionEn : description;
  const displayBreed = locale === 'en' && breedEn ? breedEn : breed;
  
  // Determine if this is a retired animal for special styling
  const isRetired = category === 'retired';
  
  return (
    <motion.div
      // Hover scale animation for desktop (1.02x)
      whileHover={{ scale: 1.02 }}
      // Touch feedback for mobile
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card 
        className={`flex flex-col h-full ${
          isRetired 
            ? 'border-2 border-burgundy-deep opacity-90 relative' 
            : ''
        }`}
      >
        {/* Retired badge */}
        {isRetired && (
          <div className="absolute top-2 right-2 z-10 bg-burgundy-deep text-ivory px-3 py-1 rounded-full text-xs font-semibold">
            {locale === 'en' ? 'Retired' : 'Retraité'}
          </div>
        )}
        
        <CardHeader className="w-full p-0 flex items-center justify-center overflow-hidden">
          <div className="relative w-full aspect-[3/4]">
            <ResponsiveImage
              src={image}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33.3vw, 25vw"
              objectFit="cover"
              objectPosition="center center"
              placeholder="blur"
              blurDataURL="/blurred.avif"
              className="rounded-t-lg"
            />
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-4">
          <CardTitle className="text-lg font-bold mb-2 text-center">
            {name}
          </CardTitle>
          
          {/* Age and breed information */}
          {(age || displayBreed) && (
            <div className="text-sm text-gray-600 mb-2 text-center">
              {age && (
                <span>
                  {age} {locale === 'en' ? 'years old' : 'ans'}
                </span>
              )}
              {age && displayBreed && <span> • </span>}
              {displayBreed && <span>{displayBreed}</span>}
            </div>
          )}
          
          {/* Description */}
          <p className="text-sm text-gray-700 text-center flex-1">
            {displayDescription}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnimalCard;
