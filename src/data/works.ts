import { Work } from '@/components/common/WorksGrid';

export const works: Work[] = [
  {
    id: '1',
    title: 'ポートフォリオサイト',
    description: 'Next.jsとSanity CMSを使用したレスポンシブなポートフォリオサイト',
    image: '/images/portfolio-site.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity CMS'],
    githubUrl: 'https://github.com/username/portfolio',
    demoUrl: 'https://example.com'
  },
  {
    id: '2',
    title: 'ブログサイト構築',
    description: 'Next.jsとFastAPIを使用したブログサイトの構築',
    image: '/images/portfolio-site.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Python', 'Render', 'Vercel'],
    githubUrl: 'https://github.com/TA1851/blog-api-main',
    githubUrl2: 'https://github.com/TA1851/nextjs-app',
    demoUrl: 'https://nextjs-app-yvfr.vercel.app/'
  },
  {
    id: '3',
    title: '家計簿アプリを開発中',
    description: 'SpringBootを使用した家計簿アプリ',
    image: '/images/portfolio-site.jpg',
    technologies: ['Java', 'SpringWebFlux', 'Next.js', 'Emotion', 'MUI'],
    githubUrl: 'https://github.com/TA1851/ai-chatbot',
  },
];