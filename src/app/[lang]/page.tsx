
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import PlatformSlider from '@/components/sections/platform-slider';
import SecurityHighlight from '@/components/sections/security-highlight';

const Pricing = React.lazy(() => import('@/components/sections/pricing'));
const IncludedFeatures = React.lazy(() => import('@/components/sections/included-features'));
const WhyFxvds = React.lazy(() => import('@/components/sections/why-fxvds'));
const VdsVsVps = React.lazy(() => import('@/components/sections/vds-vs-vps'));
const AiRecommender = React.lazy(() => import('@/components/sections/ai-recommender'));
const GetStarted = React.lazy(() => import('@/components/sections/get-started'));
const Cta = React.lazy(() => import('@/components/sections/cta'));
const Faq = React.lazy(() => import('@/components/sections/faq'));
const Contact = React.lazy(() => import('@/components/sections/contact'));

const SectionSkeleton = () => <Skeleton className="h-96 w-full" />;

export default async function Home({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-dvh">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-1">
        <Hero dictionary={dictionary.hero} />
        <SecurityHighlight dictionary={dictionary.securityHighlight} />
        <PlatformSlider />
        <Suspense fallback={<SectionSkeleton />}>
          <Pricing dictionary={dictionary.pricing} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <IncludedFeatures dictionary={dictionary.includedFeatures} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <WhyFxvds dictionary={dictionary.whyFxvds} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <VdsVsVps dictionary={dictionary.vdsVsVps} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AiRecommender dictionary={dictionary.aiRecommender} lang={lang} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <GetStarted dictionary={dictionary.getStarted} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Cta dictionary={dictionary.cta} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Faq dictionary={dictionary.faq} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact dictionary={dictionary.contact} lang={lang} />
        </Suspense>
      </main>
      <Footer lang={lang} dictionary={dictionary.footer} />
    </div>
  );
}
