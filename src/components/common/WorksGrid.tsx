import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  githubUrl2?: string;
  demoUrl?: string;
}

interface WorksGridProps {
  works: Work[];
  showTitle?: boolean;
  className?: string;
}

const WorksGrid: React.FC<WorksGridProps> = ({ works, showTitle = true, className = '' }) => {
  return (
    <section className={`works-section py-16 bg-transparent ${className}`}>
      <div className="container mx-auto px-4">
        {showTitle && (
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Works
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => (
            <div
              key={work.id}
              className="work-card overflow-hidden"
            >
              <Image
                src={work.image}
                alt={work.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {work.title}
                </h3>
                <p className="text-gray-200 mb-4">
                  {work.description}
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2 text-white">使用技術</h4>
                  <div className="flex flex-wrap gap-2">
                    {work.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={work.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors duration-200"
                  >
                    GitHub
                  </Link>
                  {work.githubUrl2 && (
                    <Link
                      href={work.githubUrl2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors duration-200"
                    >
                      GitHub Nextjs
                    </Link>
                  )}
                  {work.demoUrl && (
                    <Link
                      href={work.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors duration-200"
                    >
                      Demo
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

export default WorksGrid;