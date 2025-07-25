import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Work } from '@/types';
import { getSkillColor } from '@/utils/skillColors';

interface WorksSectionProps {
  works: Work[];
}

const WorksSection: React.FC<WorksSectionProps> = ({ works }) => {
  return (
    <section className="works-section py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => {
            const CardContent = (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
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
                      {work.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={getSkillColor(tech)}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
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
                    {(work.projectUrl) && (
                      <Link
                        href={work.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors duration-200"
                      >
                        Blog
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );

            return (
              <div key={work._id} className="hover:shadow-lg transition-shadow duration-300">
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;