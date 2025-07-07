import { Work } from '@/components/common/WorksGrid';

export const works: Work[] = [
  {
    id: '1',
    title: 'ポートフォリオサイト',
    description: 'Next.jsとSanity CMSを使用したレスポンシブなポートフォリオサイト',
    image: '../../public/images/portfolio.png',
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Sanity CMS'],
    githubUrl: 'https://github.com/TA1851/Portfolio-site',
  },
  {
    id: '2',
    title: 'ブログサイト構築',
    description: 'Next.jsとFastAPIを使用したブログサイトの構築',
    image: '../../public/images/fastapi.png',
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Python', 'FastAPI', 'MUI', 'Render', 'Vercel'],
    githubUrl: 'https://github.com/TA1851/blog-api-main',
    githubUrl2: 'https://github.com/TA1851/nextjs-app',
    demoUrl: 'https://nextjs-app-yvfr.vercel.app/'
  },
  {
    id: '3',
    title: '家計簿アプリを開発中',
    description: 'SpringBootを使用した家計簿アプリ',
    image: '/images/portfolio-site.jpg',
    technologies: ['Java', 'SpringWebFlux', 'TypeScript','Next.js', 'Emotion', 'MUI', 'EC2', 'RDS'],
    githubUrl: 'https://github.com/TA1851/ai-chatbot',
  },
];