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
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Python', 'FastAPI', 'MUI', 'Render', 'Vercel', 'PostgreSQL'],
    githubUrl: 'https://github.com/TA1851/blog_api',
    githubUrl2: 'https://github.com/TA1851/nextjs-app',
    projectUrl: 'https://nextjs-app-yvfr.vercel.app/'
  },
  {
    _id: '3',
    title: '家計簿アプリ',
    description: 'SpringBootを使用した家計簿アプリの構築。認証はAWSのCognitoを使用。データベースはRDSを使用。',
    image: {
      asset: {
        _ref: '',
        url: '/images/kakeibo.png'
      },
      alt: '家計簿アプリのスクリーンショット'
    },
    technologies: ['Java', 'SpringWebFlux', 'TypeScript','Next.js', 'Emotion', 'MUI', 'EC2', 'RDS', 'mysql', 'Cognito'],
    githubUrl: '',
    projectUrl: ''
  },
  {
    _id: '4',
    title: 'PDFコンバーター',
    description: 'flaskを使用したPDFコンバーターの構築。画像をPDFに変換する機能を実装。',
    image: {
      asset: {
        _ref: '',
        url: '/images/png_pdf.png'
      },
      alt: 'PDFコンバーターのスクリーンショット'
    },
    technologies: ['Python', 'Flask', 'htmx'],
    githubUrl: 'https://github.com/TA1851/pdf_converterApp',
    projectUrl: ''
  },
  {
    _id: '5',
    title: 'スキーマ検証ツール',
    description: 'SQLiteのDDLスクリプトを解析し、データベース設計上の問題を検出するWPFアプリケーション',
    image: {
      asset: {
        _ref: '',
        url: '/images/sqlApp.png'
      },
      alt: 'スキーマ検証ツールのスクリーンショット'
    },
    technologies: ['C#', 'WPF', 'SQLite'],
    githubUrl: 'https://github.com/TA1851/DataBaseValidationApp',
    projectUrl: ''
  }
];