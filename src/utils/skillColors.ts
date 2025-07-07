// スキルのカテゴリ別色設定ユーティリティ

export const SKILL_CATEGORIES = {
  languages: ['typescript', 'python', 'java', 'javascript'],
  frameworks: ['react', 'fastapi', 'springboot', 'next.js', 'nextjs', 'springwebflux'],
  styling: ['tailwind css', 'tailwindcss', 'emotion', 'css'],
  tools: ['sanity cms', 'sanitycms', 'render', 'vercel', 'mui', 'ec2', 'rds']
};

/**
 * スキルに基づいてTailwind CSSクラスを返す
 * @param skill - 技術スキル名
 * @param variant - スタイルバリアント ('default' | 'rounded')
 * @returns Tailwind CSSクラス文字列
 */
export const getSkillColor = (skill: string, variant: 'default' | 'rounded' = 'default'): string => {
  const lowerSkill = skill.toLowerCase();
  
  const baseClasses = 'px-2 py-1 text-black text-sm';
  const roundedClasses = variant === 'rounded' ? 'rounded-full font-medium px-4 py-2' : 'rounded';
  
  if (SKILL_CATEGORIES.languages.includes(lowerSkill)) {
    return `${baseClasses} bg-green-100 dark:bg-green-500 ${roundedClasses}`;
  } else if (SKILL_CATEGORIES.frameworks.includes(lowerSkill)) {
    return `${baseClasses} bg-yellow-100 dark:bg-yellow-400 ${roundedClasses}`;
  } else if (SKILL_CATEGORIES.styling.includes(lowerSkill)) {
    return `${baseClasses} bg-blue-100 dark:bg-blue-600 ${roundedClasses}`;
  } else if (SKILL_CATEGORIES.tools.includes(lowerSkill)) {
    return `${baseClasses} bg-purple-100 dark:bg-purple-500 ${roundedClasses}`;
  } else {
    // デフォルト（その他）
    return `${baseClasses} bg-red-100 dark:bg-red-900 ${roundedClasses}`;
  }
};
