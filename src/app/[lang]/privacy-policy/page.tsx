
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import Link from 'next/link';

const PrivacyPolicyPage = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);
  const { legal } = dictionary;

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-1 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold font-headline text-white mb-16 text-center">{legal.privacy.title}</h1>
          <section id="privacy-policy" className="mb-24 scroll-mt-24">
            <div className="space-y-6 text-gray-300 prose prose-invert prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white">
              <p>{legal.privacy.intro}</p>
              <h3 className="text-2xl font-semibold text-white mt-8">{legal.privacy.whatWeCollectTitle}</h3>
              <p>{legal.privacy.whatWeCollectText}</p>
              <h3 className="text-2xl font-semibold text-white mt-8">{legal.privacy.whenWeCollectTitle}</h3>
              <p>{legal.privacy.whenWeCollectText}</p>
              <h3 className="text-2xl font-semibold text-white mt-8">{legal.privacy.howWeUseTitle}</h3>
              <p>{legal.privacy.howWeUseText}</p>
              <ul className="list-disc pl-6 space-y-2">
                {legal.privacy.howWeUseList.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <h3 className="text-2xl font-semibold text-white mt-8">{legal.privacy.howWeProtectTitle}</h3>
              <p>{legal.privacy.howWeProtectText}</p>
              <h3 className="text-2xl font-semibold text-white mt-8">{legal.privacy.cookiesTitle}</h3>
              <p>{legal.privacy.cookiesText}</p>
              <h3 className="text-2xl font-semibold text-white mt-8">{legal.privacy.thirdPartyDisclosureTitle}</h3>
              <p>{legal.privacy.thirdPartyDisclosureText}</p>
              <h3 className="text-2xl font-semibold text-white mt-8">{legal.privacy.thirdPartyLinksTitle}</h3>
              <p>{legal.privacy.thirdPartyLinksText}</p>
              <h3 className="text-2xl font-semibold text-white mt-8">{legal.privacy.gdprTitle}</h3>
              <p>{legal.privacy.gdprText}</p>
            </div>
          </section>
          <div className="text-center mt-24">
            <Link href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-primary hover:underline">
              {legal.backToTop}
            </Link>
          </div>
        </div>
      </main>
      <Footer lang={lang} dictionary={dictionary.footer} />
    </div>
  );
};

export default PrivacyPolicyPage;
