import { Work } from '@/types';

export const works: Work[] = [
  {
    _id: '1',
    title: 'ポートフォリオサイト',
    description: 'Next.jsとSanity CMSを使用したレスポンシブなポートフォリオサイト',
    image: {
      asset: {
        _ref: 'image-portfolio',
        url: '/images/portfolio.png'
      },
      alt: 'ポートフォリオサイトのスクリーンショット'
    },
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Sanity CMS'],
    githubUrl: 'https://github.com/TA1851/Portfolio-site',
  },
  {
    _id: '2',
    title: 'ブログサイト構築',
    description: 'Next.jsとFastAPIを使用したブログサイトの構築',
    image: {
      asset: {
        _ref: 'image-fastapi',
        url: '/images/fastapi.png'
      },
      alt: 'ブログサイトのスクリーンショット'
    },
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Python', 'FastAPI', 'MUI', 'Render', 'Vercel'],
    githubUrl: 'https://github.com/TA1851/blog-api-main',
    githubUrl2: 'https://github.com/TA1851/nextjs-app',
    projectUrl: 'https://nextjs-app-yvfr.vercel.app/'
  },
  {
    _id: '3',
    title: '家計簿アプリ（開発中）',
    description: 'SpringBootを使用した家計簿アプリの構築',
    image: {
      asset: {
        _ref: '',
        url: ''
      },
      alt: '家計簿アプリのスクリーンショット'
    },
    technologies: ['Java', 'SpringWebFlux', 'TypeScript','Next.js', 'Emotion', 'MUI', 'EC2', 'RDS'],
    githubUrl: '',
    projectUrl: ''
  },
];