import { client } from '@/lib/sanity'
import { aboutQuery } from '@/lib/queries'
import { About } from '@/types'
import AboutSection from '@/components/home/AboutSection'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ABOUT',
  description: 'プロフィールとスキルについて',
}

async function getAbout(): Promise<About | null> {
  return client.fetch(aboutQuery)
}

export default async function AboutPage() {
  try {
    const about = await getAbout()

    // Temporary test data when no data is available
    const AboutPage: About = {
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
              text: '札幌出身のエンジニアです。以前は、半導体製造メーカに勤務しており、ExcelVBAで自動化ツールを開発したり、Pythonでデータ加工やGUI操作自動化ツールの開発を行ってきました。' +
                    'その後、技術派遣会社に転職し、開発に携わりながらながら、自己学習を続けてきました。' +
                    'その中で、フロントエンド開発に興味を持ち、Reactを学習後、バックエンドにFastAPIを使用したブログAPIを開発し、フロントエンドにNext.jsを使ってアプリを作成しました。'+
                    '現在はAI大学で生成AIに関する知識を学びながら、AIを活用した開発に取り組んでいます。',
              marks: []
            }
          ]
        },
      ],
      skills: ['React', 'TypeScript', 'Python', 'FastAPI', 'Java','SpringBoot','Tailwind CSS', 'Emotion','Sanity CMS']
    }

    console.log('About data from Sanity:', about);

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <AboutSection about={AboutPage} />
          </div>
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Error fetching about data:', error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Failed to load about data. Please check the console for details.
          </p>
        </div>
      </div>
    )
  }
}
