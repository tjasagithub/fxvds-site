import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Pricing = React.lazy(() => import('@/components/sections/pricing'));
const IncludedFeatures = React.lazy(() => import('@/components/sections/included-features'));
const WhyFxvds = React.lazy(() => import('@/components/sections/why-fxvds'));
const AiRecommender = React.lazy(() => import('@/components/sections/ai-recommender'));
const GetStarted = React.lazy(() => import('@/components/sections/get-started'));
const Cta = React.lazy(() => import('@/components/sections/cta'));
const Faq = React.lazy(() => import('@/components/sections/faq'));
const Contact = React.lazy(() => import('@/components/sections/contact'));

const SectionSkeleton = () => <Skeleton className="h-96 w-full" />;

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        <Hero />
        <Suspense fallback={<SectionSkeleton />}>
          <Pricing />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <IncludedFeatures />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <WhyFxvds />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AiRecommender />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <GetStarted />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Cta />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Faq />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
