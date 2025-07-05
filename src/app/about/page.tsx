import { client } from '@/lib/sanity'
import { aboutQuery } from '@/lib/queries'
import { About } from '@/types'
import AboutSection from '@/components/home/AboutSection'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { Metadata } from 'next'
import { aboutData } from '@/data/about'

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

    console.log('About data from Sanity:', about);

    return (
      <div className="min-h-screen bg-transparent pt-20">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <AboutSection about={aboutData} />
          </div>
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Error fetching about data:', error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
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
