import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import WorksGrid from '@/components/common/WorksGrid';
import { works } from '@/data/works';

export default function Works() {
  return (
    <div className="min-h-screen bg-transparent pt-20">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Works</h1>
      </div>
      <WorksGrid works={works} showTitle={false} className="py-0" />
      <Footer />
    </div>
  );
}