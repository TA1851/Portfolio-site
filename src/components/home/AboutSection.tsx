import React from 'react';
import { About } from '@/types';
import { aboutData } from '../../data/about';

interface AboutSectionProps {
  about?: About;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  
  // デバッグ情報を追加
  console.log('AboutSection received about:', about);
  console.log('Content structure:', about?.content);

  // aboutデータがあればそれを使用、なければデフォルトを使用
  const skills = aboutData.skills;
  
  // コンテンツの取得を修正
  const content = aboutData.content?.[0]?.children?.[0]?.text;

  console.log('自己紹介:', content);
  console.log('スキル:', skills);
  
  return (
    <section className="about-section py-16">
      <div className="container mx-auto px-4">
        <h1 className='text-4xl font-bold text-center mb-2 text-gray-900 dark:text-white'>
          <span className='inline-block text-2xl bg-gradient-to-r
          from-gray-400 via-emerald-500 via-green-500 via-emerald-500 to-gray-400
          bg-clip-text text-transparent w-fit'>
            Tatuhiko Osaka&apos;s Portfolio
          </span>
        </h1>
        <p className='text-center mb-8'>Welcome to my portfolio-site!</p>
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {about?.title || 'ABOUT'}
        </h2>
        <div className="about-content flex flex-col items-center max-w-4xl mx-auto">
          <div className="about-text w-full mb-8">
            <p className="mb-4 text-gray-700 dark:text-gray-300 about-profile-text text-lg leading-relaxed">
              {content}
            </p>
          </div>
          <div className="about-image w-full flex justify-center">
            {/* <img src="/path/to/your/photo.jpg" alt="Profile" className="max-w-sm rounded-lg shadow-lg" /> */}
          </div>
        </div>
        <div className="skills mt-12">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            スキル
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">スキル情報がありません</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;