import React from 'react';
import Link from 'next/link';
import { Hero } from '@/types';

interface HeroSectionProps {
  hero: Hero;
}

const HeroSection: React.FC<HeroSectionProps> = ({ hero }) => {
  return (
    <section className="hero-section py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          {hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 mb-6">
          {hero.subtitle}
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {hero.description}
        </p>
        {hero.ctaText && hero.ctaUrl && (
          <Link
            href={hero.ctaUrl}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            {hero.ctaText}
          </Link>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
