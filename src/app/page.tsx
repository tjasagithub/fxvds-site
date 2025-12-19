import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Pricing from '@/components/sections/pricing';
import IncludedFeatures from '@/components/sections/included-features';
import WhyFxvds from '@/components/sections/why-fxvds';
import GetStarted from '@/components/sections/get-started';
import Cta from '@/components/sections/cta';
import Faq from '@/components/sections/faq';
import Contact from '@/components/sections/contact';
import AiRecommender from '@/components/sections/ai-recommender';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        <Hero />
        <Pricing />
        <IncludedFeatures />
        <WhyFxvds />
        <AiRecommender />
        <GetStarted />
        <Cta />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
