import React from 'react';
import { About } from '@/types';

interface AboutSectionProps {
  about?: About;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  const defaultSkills = [
    'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Next.js', 'Node.js',
    'Python', 'FastAPI', 'ExcelVBA', 'SQL', 'Git', 'Docker'
  ];
  // aboutデータがあればそれを使用、なければデフォルトを使用
  const skills = about?.skills || defaultSkills;
  const content = about?.content?.[0]?.children?.[0]?.text || '札幌出身のエンジニアです。';

  return (
    <section className="about-section py-16">
      <div className="container mx-auto px-4">
        <h1 className='text-4xl font-bold text-center mb-2 text-gray-900 dark:text-white'>Tatuhiko Osaka&apos;s Portfolio</h1>
        <p className='text-center mb-8'>Welcome to my portfolio-site!</p>
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {about?.title || 'ABOUT'}
        </h2>
        <div className="about-content grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="about-text">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              {content}
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              以前は、半導体製造メーカに勤務しており、ExcelVBAで自動化ツールを開発したり、Pythonでデータ加工やGUI操作自動化ツールの開発を行ってきました。 <br />
              その後、技術派遣会社に転職し、開発に携わりながらながら、自己学習を続けてきました。<br />
              その中で、フロントエンド開発にも興味を持ち、ReactやVueを学習後、バックエンドにFastAPIを使用したブログAPIを開発し、フロントエンドはReactとNext.jsでアプリを作成しました。<br />
              このポートフォリオサイトは、Next.js + Sanity CMSを使用して作成しました。
            </p>
          </div>
          <div className="about-image">
            {/* <img src="/path/to/your/photo.jpg" alt="Profile" /> */}
          </div>
        </div>
        <div className="skills mt-12">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            スキル
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;