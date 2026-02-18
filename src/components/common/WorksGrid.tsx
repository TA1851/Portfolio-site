'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Work } from '@/types';
import { getSkillColor } from '@/utils/skillColors';

interface WorksGridProps {
  works: Work[];
  showTitle?: boolean;
  className?: string;
}

// 画像パスを正規化する関数
const normalizeImagePath = (image: Work['image']): string => {
  if (!image) return '';
  
  // Sanity CMSの画像URLがある場合
  if (image.asset?.url) {
    return image.asset.url;
  }
  
  return '';
};

// URLの有効性をチェックする関数
const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  // 相対パスの場合
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
    return true;
  }
  
  // 絶対URLの場合（HTTPまたはHTTPSのみ許可）
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  
  return false;
};

const WorksGrid: React.FC<WorksGridProps> = ({ works, showTitle = true, className = '' }) => {
  return (
    <section className={`works-section py-16 bg-transparent ${className}`}>
      <div className="container mx-auto px-4">
        {showTitle && (
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Works
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => {
            // 画像パスを正規化
            const normalizedImagePath = normalizeImagePath(work.image);
            const hasValidImage = normalizedImagePath && isValidUrl(normalizedImagePath);
            
            return (
              <div
                key={work._id}
                className="work-card bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                {hasValidImage ? (
                  <Image
                    src={normalizedImagePath}
                    alt={work.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      // フォールバック画像を設定
                      e.currentTarget.src = '/images/placeholder.jpg';
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">画像なし</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {work.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200 mb-4">
                    {work.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2 text-gray-800 dark:text-white">使用技術</h4>
                    <div className="flex flex-wrap gap-2">
                      {work.technologies && work.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={getSkillColor(tech)}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
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
                    {work.githubUrl2 && (
                      <Link
                        href={work.githubUrl2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors duration-200"
                      >
                        Github-FrontEnd
                      </Link>
                    )}
                    {work.projectUrl && (
                      <Link
                        href={work.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors duration-200"
                      >
                        Blog-site
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorksGrid;