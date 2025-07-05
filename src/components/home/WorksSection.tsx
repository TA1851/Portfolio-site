import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Work } from '@/types';

interface WorksSectionProps {
  works: Work[];
}

const WorksSection: React.FC<WorksSectionProps> = ({ works }) => {
  return (
    <section className="works-section py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => (
            <div
              key={work._id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {work.image && (
                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                  <Image
                    src={work.image.asset.url}
                    alt={work.image.alt || work.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {work.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {work.description}
                </p>
                {work.technologies && work.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {work.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  {work.projectUrl && (
                    <Link
                      href={work.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors duration-200"
                    >
                      Demo
                    </Link>
                  )}
                  {work.githubUrl && (
                    <Link
                      href={work.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors duration-200"
                    >
                      GitHub
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
