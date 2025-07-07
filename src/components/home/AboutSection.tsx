import React from 'react';
import { About } from '@/types';
import { aboutData } from '../../data/about';
import { getSkillColor } from '@/utils/skillColors';

interface AboutSectionProps {
  about?: About;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  const skills = aboutData.skills;
  const content = aboutData.content?.[0]?.children?.[0]?.text;
  const paragraphs = content ? content.split('\n') : [];
  
  return (
    <section className="about-section py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          {about?.title || 'ABOUT'}
        </h2>
        <div className="about-content flex flex-col items-start max-w-4xl mx-auto">
          <div className="about-text w-full mb-8">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => (
                <p key={index} className="text-white about-profile-text text-lg leading-relaxed text-left">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="mb-4 text-white about-profile-text text-lg leading-relaxed text-left">
                {content}
              </p>
            )}
            <p className='text-lg text-white'>
              現在はAI大学で生成AIに関する知識を学びながら、AIを活用した開発に取り組んでいます。
            </p>
          </div>
          <div className="about-image w-full flex justify-center">
            {/* <img src="/path/to/your/photo.jpg" alt="Profile" className="max-w-sm rounded-lg shadow-lg" /> */}
          </div>
        </div>
        <div className="skills mt-44">
          <h3 className="text-2xl font-bold text-center mb-6 text-white">
            スキル
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <span
                  key={index}
                  className={getSkillColor(skill, 'rounded')}
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