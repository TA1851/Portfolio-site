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
  skills: ['TypeScript', 'Python', 'Java', 'React', 'FastAPI', 'SpringBoot', 'Tailwind CSS', 'Emotion'],
  timeline: [
    {
      year: '以前',
      title: '半導体製造メーカー',
      company: 'メーカー',
      description: '外資系半導体製造メーカーで半導体製造装置エンジニアとして品質管理部門で勤務していました。' +
                   '日々の業務ではExcelを使った業務が多かったので、VBAを学び業務効率化に取り組んでいました。' +
                   'そこでプログラミングの楽しさを知り、大学でPythonを学んだことをきっかけにCSの勉強を始めました。' 
    },
    {
      year: 'その後',
      title: '技術派遣会社',
      company: '技術派遣',
      description: '地元札幌にUターン後、技術派遣会社に転職し、PythonやExcelVBAを使った開発に携わりながら、プロジェクトに応じて様々な技術を学習してきました。' +
                   '個人的にはフロントエンド、バックエンド開発を一人称で行えるようになりたいと考えており、ReactやFastAPIを学習して、ポートフォリオを作成しました。'
    },
    {
      year: '現在',
      title: '社内SE',
      company: '運送、建設事業',
      description: 'ポートフォリオを作成後、社内SEとして転職し、現在は、C#、Access、ExcelVBAをメインに使って社内システムの保守や開発を行っています。' +
                    '最近はAI関連の技術にも興味を持ち、AI駆動開発に取り組んでいます。好きな言語はPythonとTypeScriptで、趣味で色々作って遊んでいます。'
    }
  ]
};
