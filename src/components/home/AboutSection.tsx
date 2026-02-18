import React from 'react';
import { About } from '@/types';
import { aboutData } from '../../data/about';
// import { getSkillColor } from '@/utils/skillColors';

interface AboutSectionProps {
  about?: About;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  // const skills = aboutData.skills;
  const timeline = aboutData.timeline;
  
  return (
    <section className="about-section py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          {about?.title || 'ABOUT'}
        </h2>
        <div className="about-content flex flex-col items-start max-w-4xl mx-auto">
          <div className="about-text w-full mb-8">
            <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-3">
              {timeline?.map((item, index) => (
                <li key={index} className="mb-10 ml-6">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {item.year}
                  </time>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-300 dark:text-gray-400">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div className="about-image w-full flex justify-center">
            {/* <img src="/path/to/your/photo.jpg" alt="Profile" className="max-w-sm rounded-lg shadow-lg" /> */}
          </div>
        </div>
        {/* <div className="skills mt-44">
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
              <p className="text-white">スキル情報がありません</p>
            )}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default AboutSection;