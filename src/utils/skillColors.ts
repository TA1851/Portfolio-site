// スキルのカテゴリ別色設定ユーティリティ

export const SKILL_CATEGORIES = {
  languages: ['typescript', 'python', 'java', 'javascript'],
  frameworks: ['react', 'springboot', 'next.js', 'nextjs', 'springwebflux'],
  styling: ['tailwind css', 'emotion'],
  tools: ['sanity cms', 'render', 'vercel', 'mui', 'ec2', 'rds', 'git', 'github', 'docker'],
  backend: ['fastapi']
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
  
  // 強化されたデバッグ（本番では削除）
  if (typeof window !== 'undefined') {
    console.log(`=== スキル分析 ===`);
    console.log(`原文: "${skill}"`);
    console.log(`小文字: "${lowerSkill}"`);
    console.log(`Languages配列に含まれる?: ${SKILL_CATEGORIES.languages.includes(lowerSkill)}`);
    console.log(`Frameworks配列に含まれる?: ${SKILL_CATEGORIES.frameworks.includes(lowerSkill)}`);
    console.log(`Styling配列に含まれる?: ${SKILL_CATEGORIES.styling.includes(lowerSkill)}`);
    console.log(`Tools配列に含まれる?: ${SKILL_CATEGORIES.tools.includes(lowerSkill)}`);
    console.log(`Backend配列に含まれる?: ${SKILL_CATEGORIES.backend.includes(lowerSkill)}`);
    console.log(`Frameworks配列:`, SKILL_CATEGORIES.frameworks);
    console.log(`Backend配列:`, SKILL_CATEGORIES.backend);
  }
  
  if (SKILL_CATEGORIES.languages.includes(lowerSkill)) {
    // 緑色 (TypeScript, Python, Java)
    return `${baseClasses} bg-green-500 hover:bg-green-600 text-white ${roundedClasses}`;
  } else if (SKILL_CATEGORIES.frameworks.includes(lowerSkill)) {
    // 黄色 (React, SpringBoot)
    return `${baseClasses} bg-yellow-500 hover:bg-yellow-600 text-black ${roundedClasses}`;
  } else if (SKILL_CATEGORIES.styling.includes(lowerSkill)) {
    // 青色 (Tailwind CSS, Emotion)
    return `${baseClasses} bg-blue-500 hover:bg-blue-600 text-white ${roundedClasses}`;
  } else if (SKILL_CATEGORIES.tools.includes(lowerSkill)) {
    // 紫色 (MUI, Render, Vercel, EC2, RDS)
    return `${baseClasses} bg-purple-500 hover:bg-purple-600 text-white ${roundedClasses}`;
  } else if (SKILL_CATEGORIES.backend.includes(lowerSkill)) {
    // オレンジ色 (FastAPI)
    return `${baseClasses} bg-orange-500 hover:bg-orange-600 text-white ${roundedClasses}`;
  } else {
    // デフォルト（その他）
    if (typeof window !== 'undefined') {
      console.log(`❌ マッチしないスキル: "${skill}" -> デフォルト（グレー）を適用`);
    }
    return `${baseClasses} bg-gray-500 hover:bg-gray-600 text-white ${roundedClasses}`;
  }
};
