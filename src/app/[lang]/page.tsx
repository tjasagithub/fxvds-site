
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import React from 'react';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import PlatformSlider from '@/components/sections/platform-slider';
import SecurityHighlight from '@/components/sections/security-highlight';

import Pricing from '@/components/sections/pricing';
import IncludedFeatures from '@/components/sections/included-features';
import WhyFxvds from '@/components/sections/why-fxvds';
import VdsVsVps from '@/components/sections/vds-vs-vps';
import AiRecommender from '@/components/sections/ai-recommender';
import GetStarted from '@/components/sections/get-started';
import Cta from '@/components/sections/cta';
import Faq from '@/components/sections/faq';
import Contact from '@/components/sections/contact';

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-dvh">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-1">
        <Hero dictionary={dictionary.hero} lang={lang} />
        <SecurityHighlight dictionary={dictionary.securityHighlight} />
        <PlatformSlider />
        <Pricing dictionary={dictionary.pricing} />
        <IncludedFeatures dictionary={dictionary.includedFeatures} />
        <WhyFxvds dictionary={dictionary.whyFxvds} />
        <VdsVsVps dictionary={dictionary.vdsVsVps} />
        <AiRecommender dictionary={dictionary.aiRecommender} lang={lang} />
        <GetStarted dictionary={dictionary.getStarted} />
        <Cta dictionary={dictionary.cta} />
        <Faq dictionary={dictionary.faq} />
        <Contact dictionary={dictionary.contact} lang={lang} />
      </main>
      <Footer lang={lang} dictionary={dictionary.footer} />
    </div>
  );
}
