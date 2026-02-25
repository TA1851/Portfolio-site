// スキルのカテゴリ別色設定ユーティリティ

export const SKILL_CATEGORIES = {
  languages: ['typescript', 'python', 'java', 'javascript', 'c#', 'htmx'],
  frameworks: ['react', 'springboot', 'spring boot',
              'next.js', 'nextjs', 'springwebflux', 'fastapi', 'flask', 'wpf'],
  styling: ['tailwind css', 'emotion'],
  tools: ['sanity cms', 'render', 'vercel', 'mui', 'ec2', 'rds', 'git', 'github', 'docker'],
  backend: ['fastapi', 'flask'],
  databases: ['sqlite', 'rds', 'mysql', 'postgresql']
};

/**
 * スキルに基づいてTailwind CSSクラスを返す
 * @param skill - 技術スキル名
 * @param variant - スタイルバリアント ('default' | 'rounded')
 * @returns Tailwind CSSクラス文字列
 */
export const getSkillColor = (skill: string, variant: 'default' | 'rounded' = 'default'): string => {
  const lowerSkill = skill.toLowerCase();
  const normalizedSkill = lowerSkill.replace(/\s+/g, ' ').trim();
  
  const baseClasses = 'px-2 py-1 text-sm font-medium transition-colors duration-200';
  const roundedClasses = variant === 'rounded' ? 'rounded-full px-4 py-2' : 'rounded';
  
  // 特別なケースを先に処理
  if (normalizedSkill === 'springboot' || normalizedSkill === 'spring boot') {
    return `${baseClasses} bg-yellow-500 hover:bg-yellow-600 text-white ${roundedClasses}`;
  }
  
  
  if (SKILL_CATEGORIES.languages.includes(normalizedSkill)) {
    // 緑色 (TypeScript, Python, Java)
    return `${baseClasses} bg-green-500 hover:bg-green-600 text-white ${roundedClasses}`;
  } else if (SKILL_CATEGORIES.frameworks.includes(normalizedSkill)) {
    // 黄色 (React, SpringBoot)
    return `${baseClasses} bg-yellow-500 hover:bg-yellow-600 text-white ${roundedClasses}`;
  } else if (SKILL_CATEGORIES.styling.includes(normalizedSkill)) {
    // 青色 (Tailwind CSS, Emotion)
    return `${baseClasses} bg-blue-500 hover:bg-blue-600 text-white ${roundedClasses}`;
  } else if (SKILL_CATEGORIES.tools.includes(normalizedSkill)) {
    // 紫色 (MUI, Render, Vercel, EC2, RDS)
    return `${baseClasses} bg-purple-500 hover:bg-purple-600 text-white ${roundedClasses}`;
  } else if (SKILL_CATEGORIES.backend.includes(normalizedSkill)) {
    // オレンジ色 (FastAPI)
    return `${baseClasses} bg-orange-500 hover:bg-orange-600 text-white ${roundedClasses}`;
  } else {
    // デフォルト（その他）
    return `${baseClasses} bg-gray-500 hover:bg-gray-600 text-white ${roundedClasses}`;
  }
};
