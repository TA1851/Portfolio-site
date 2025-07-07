'use client';

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

// 画像パスを正規化する関数
const normalizeImagePath = (imagePath: string): string => {
  if (!imagePath || typeof imagePath !== 'string') return '';
  
  const trimmed = imagePath.trim();
  
  // 相対パスを絶対パスに変換
  if (trimmed.startsWith('../../public/')) {
    return trimmed.replace('../../public/', '/');
  }
  
  if (trimmed.startsWith('../public/')) {
    return trimmed.replace('../public/', '/');
  }
  
  if (trimmed.startsWith('./public/')) {
    return trimmed.replace('./public/', '/');
  }
  
  return trimmed;
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

// スキルのカテゴリ別色設定
const getSkillColor = (skill: string) => {
  const lowerSkill = skill.toLowerCase();
  
  // プログラミング言語（小文字で定義）
  const languages = ['typescript', 'python', 'java', 'javascript'];
  // フレームワーク・ライブラリ（小文字で定義）
  const frameworks = ['react', 'fastapi', 'springboot', 'next.js', 'nextjs', 'springwebflux'];
  // CSS関連（小文字で定義）
  const styling = ['tailwind css', 'tailwindcss', 'emotion', 'css'];
  // その他のツール・技術（小文字で定義）
  const tools = ['sanity cms', 'sanitycms', 'render', 'vercel', 'mui', 'ec2', 'rds'];
  
  if (languages.includes(lowerSkill)) {
    return 'px-2 py-1 bg-green-100 dark:bg-green-500 text-black rounded text-sm';
  } else if (frameworks.includes(lowerSkill)) {
    return 'px-2 py-1 bg-yellow-100 dark:bg-yellow-400 text-black rounded text-sm';
  } else if (styling.includes(lowerSkill)) {
    return 'px-2 py-1 bg-blue-100 dark:bg-blue-600 text-black rounded text-sm';
  } else if (tools.includes(lowerSkill)) {
    return 'px-2 py-1 bg-purple-100 dark:bg-purple-500 text-black rounded text-sm';
  } else {
    // デフォルト（その他）
    return 'px-2 py-1 bg-red-100 dark:bg-red-900 text-black rounded text-sm';
  }
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
                key={work.id}
                className="work-card overflow-hidden"
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
                      {work.technologies.map((tech) => (
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorksGrid;