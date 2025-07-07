import { About } from '@/types';

export const aboutData: About = {
  _id: 'about_page',
  _type: 'about',
  title: 'ABOUT',
  content: [
    {
      _type: 'block',
      _key: 'block1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'span1',
          text: '以前は、半導体製造メーカに勤務しており、ExcelVBAで自動化ツールを開発したり、Pythonでデータ加工やGUI操作自動化ツールの開発を行ってきました。' +
              'その後、技術派遣会社に転職し、開発に携わりながら、自己学習を続けてきました。' +
              'その中で、フロントエンド開発に興味を持ち、Reactを学習後、バックエンドにFastAPIを使用したブログAPIを開発し、フロントエンドにNext.jsとTailwindcssを使ってアプリを作成しました。' ,
          marks: []
        }
      ]
    },
  ],
  skills: ['TypeScript', 'Python', 'Java', 'React', 'FastAPI', 'SpringBoot', 'Tailwind CSS', 'Emotion']
};
