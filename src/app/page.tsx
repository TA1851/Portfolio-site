import AboutSection from '@/components/home/AboutSection'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Hero from '@/components/home/HeroSection'
import WorksGrid from '@/components/common/WorksGrid'
import { works } from '@/data/works'

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent pt-20">
      <div>
        <Header />
      </div>
      <div className='mt-43'>
        <Hero />
      </div>
      <div>
        <AboutSection />
      </div>
      <div className="mt-44">
        <WorksGrid works={works} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}