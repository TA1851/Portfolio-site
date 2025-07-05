import AboutSection from '@/components/home/AboutSection'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import WorksGrid from '@/components/common/WorksGrid'
import { works } from '@/data/works'

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <AboutSection />
      <WorksGrid works={works} />
      <Footer />
    </div>
  )
}