// スキルのカテゴリ別色設定ユーティリティ

export const SKILL_CATEGORIES = {
  languages: ['typescript', 'python', 'java', 'javascript', 'html', 'css'],
  frameworks: ['react', 'fastapi', 'springboot', 'next.js', 'nextjs', 'springwebflux', 'nodejs', 'node.js'],
  styling: ['tailwind css', 'tailwindcss', 'emotion', 'css', 'sass', 'styled-components'],
  tools: ['sanity cms', 'sanitycms', 'render', 'vercel', 'mui', 'ec2', 'rds', 'git', 'github', 'docker', 'vscode']
};

/**
 * スキルに基づいてTailwind CSSクラスを返す
 * @param skill - 技術スキル名
 * @param variant - スタイルバリアント ('default' | 'rounded')
 * @returns Tailwind CSSクラス文字列
 */
export const getSkillColor = (skill: string, variant: 'default' | 'rounded' = 'default'): string => {
  const lowerSkill = skill.toLowerCase();
  
  const baseClasses = 'px-2 py-1 text-sm font-medium transition-colors duration-200';
  const roundedClasses = variant === 'rounded' ? 'rounded-full px-4 py-2' : 'rounded';
  
  if (SKILL_CATEGORIES.languages.includes(lowerSkill)) {
    return `${baseClasses} bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 text-black dark:text-white ${roundedClasses}`;
  } else if (SKILL_CATEGORIES.frameworks.includes(lowerSkill)) {
    return `${baseClasses} bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-black dark:text-white ${roundedClasses}`;
  } else if (SKILL_CATEGORIES.styling.includes(lowerSkill)) {
    return `${baseClasses} bg-purple-100 hover:bg-purple-200 dark:bg-purple-800 dark:hover:bg-purple-700 text-black dark:text-white ${roundedClasses}`;
  } else if (SKILL_CATEGORIES.tools.includes(lowerSkill)) {
    return `${baseClasses} bg-orange-100 hover:bg-orange-200 dark:bg-orange-800 dark:hover:bg-orange-700 text-black dark:text-white ${roundedClasses}`;
  } else {
    // デフォルト（その他）
    return `${baseClasses} bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white ${roundedClasses}`;
  }
};
