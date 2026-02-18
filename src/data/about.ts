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
      description: 'Wafer測定工程で半導体製造装置エンジニアとして勤務し、エラー解析や装置ログの分析などを、ExcelVBAを使って開発を行っていました。'
    },
    {
      year: 'その後',
      title: '技術派遣会社',
      company: '技術派遣',
      description: '地元札幌にUターン後は、技術派遣会社に転職し、PythonやExcelVBAを使った開発に携わりながら、個人開発で色々な技術を学び、自己学習を続けてきました。'
    },
    {
      year: '現在',
      title: '社内SE',
      company: '運送、建設事業',
      description: '現在は、社内SEとして、C#、Access、ExcelVBAを使って社内システムの保守や開発を行っています。' +
      'また、SIGNATEというサービスを利用して、データ分析や機械学習の学習コースを受講したので、今後はコンペティションに参加していく予定です。'
    }
  ]
};
