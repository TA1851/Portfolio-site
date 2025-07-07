import React from 'react';
import Link from 'next/link';
import { Hero } from '@/types';

interface HeroSectionProps {
  hero?: Hero;
}

const HeroSection: React.FC<HeroSectionProps> = ({ hero }) => {
  return (
    <section className="hero-section py-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>
            <span className='inline-block bg-gradient-to-r
            from-gray-400 via-emerald-500 via-green-500 via-emerald-500 to-gray-400
            bg-clip-text text-transparent'>
              Tatuhiko Osaka&apos;s Portfolio
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-center mb-8 text-blue-600 dark:text-blue-400'>
            {hero?.subtitle || 'Welcome to my portfolio-site!'}
          </p>
          {hero?.ctaText && hero?.ctaUrl && (
            <Link
              href={hero.ctaUrl}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              {hero.ctaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;