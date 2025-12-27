
'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { useEffect, useState } from 'react';

// Define a type for the dictionary structure
type LegalPageDictionary = Awaited<ReturnType<typeof getDictionary>>['legal'];
type HeaderDictionary = Awaited<ReturnType<typeof getDictionary>>['header'];
type FooterDictionary = Awaited<ReturnType<typeof getDictionary>>['footer'];

const LegalPage = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const [dictionary, setDictionary] = useState<LegalPageDictionary | null>(null);
  const [headerDict, setHeaderDict] = useState<HeaderDictionary | null>(null);
  const [footerDict, setFooterDict] = useState<FooterDictionary | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const fullDict = await getDictionary(lang);
      setDictionary(fullDict.legal);
      setHeaderDict(fullDict.header);
      setFooterDict(fullDict.footer);
    };
    fetchDictionary();
  }, [lang]);

  if (!dictionary || !headerDict || !footerDict) {
    return (
       <div className="flex flex-col min-h-dvh bg-background text-foreground">
         <div className="flex-1" />
       </div>
    )
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header lang={lang} dictionary={headerDict} />
      <main className="flex-1 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold font-headline text-white mb-16 text-center">{dictionary.title}</h1>

          <section id="privacy-policy" className="mb-24 scroll-mt-24">
            <h2 className="text-4xl font-bold font-headline text-white mb-8 border-b border-border/50 pb-4">{dictionary.privacy.title}</h2>
            <div className="space-y-6 text-gray-300 prose prose-invert prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white">
              <p>{dictionary.privacy.intro}</p>
              
              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.privacy.whatWeCollectTitle}</h3>
              <p>{dictionary.privacy.whatWeCollectText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.privacy.whenWeCollectTitle}</h3>
              <p>{dictionary.privacy.whenWeCollectText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.privacy.howWeUseTitle}</h3>
              <p>{dictionary.privacy.howWeUseText}</p>
              <ul className="list-disc pl-6 space-y-2">
                {dictionary.privacy.howWeUseList.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.privacy.howWeProtectTitle}</h3>
              <p>{dictionary.privacy.howWeProtectText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.privacy.cookiesTitle}</h3>
              <p>{dictionary.privacy.cookiesText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.privacy.thirdPartyDisclosureTitle}</h3>
              <p>{dictionary.privacy.thirdPartyDisclosureText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.privacy.thirdPartyLinksTitle}</h3>
              <p>{dictionary.privacy.thirdPartyLinksText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.privacy.gdprTitle}</h3>
              <p>{dictionary.privacy.gdprText}</p>
            </div>
          </section>

          <section id="terms-of-service" className="mb-24 scroll-mt-24">
            <h2 className="text-4xl font-bold font-headline text-white mb-8 border-b border-border/50 pb-4">{dictionary.terms.title}</h2>
            <div className="space-y-6 text-gray-300 prose prose-invert prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white">
              <p>{dictionary.terms.intro}</p>
              
              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.terms.serviceDescriptionTitle}</h3>
              <p>{dictionary.terms.serviceDescriptionText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.terms.eligibilityTitle}</h3>
              <p>{dictionary.terms.eligibilityText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.terms.accountRegistrationTitle}</h3>
              <p>{dictionary.terms.accountRegistrationText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.terms.paymentsTitle}</h3>
              <p>{dictionary.terms.paymentsText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.terms.freeTrialTitle}</h3>
              <p>{dictionary.terms.freeTrialText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.terms.cancellationsTitle}</h3>
              <p>{dictionary.terms.cancellationsText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.terms.addOnsTitle}</h3>
              <p>{dictionary.terms.addOnsText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.terms.availabilityTitle}</h3>
              <p>{dictionary.terms.availabilityText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.terms.dataBackupsTitle}</h3>
              <p>{dictionary.terms.dataBackupsText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.terms.liabilityTitle}</h3>
              <p>{dictionary.terms.liabilityText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.terms.serviceChangesTitle}</h3>
              <p>{dictionary.terms.serviceChangesText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.terms.termsChangesTitle}</h3>
              <p>{dictionary.terms.termsChangesText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.terms.contactTitle}</h3>
              <p dangerouslySetInnerHTML={{ __html: dictionary.terms.contactText.replace('{email}', '<a href="mailto:info@fxvds.com">info@fxvds.com</a>') }}></p>
            </div>
          </section>

          <section id="cookies" className="mb-24 scroll-mt-24">
            <h2 className="text-4xl font-bold font-headline text-white mb-8 border-b border-border/50 pb-4">{dictionary.cookies.title}</h2>
            <div className="space-y-6 text-gray-300 prose prose-invert prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white">
                <p>{dictionary.cookies.intro}</p>

                <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.cookies.whatAreCookiesTitle}</h3>
                <p>{dictionary.cookies.whatAreCookiesText}</p>
                
                <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.cookies.howWeUseTitle}</h3>
                <p>{dictionary.cookies.howWeUseIntro}</p>
                <ul className="list-disc pl-6 space-y-2">
                   {dictionary.cookies.howWeUseList.map((item, i) => <li key={i}><strong>{item.title}:</strong> {item.text}</li>)}
                </ul>
                <p>{dictionary.cookies.enablingText}</p>
                
                <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.cookies.howToControlTitle}</h3>
                <p dangerouslySetInnerHTML={{ __html: dictionary.cookies.howToControlText.replace('{link}', '<a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">aboutcookies.org</a>') }}></p>

                <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.cookies.changesToPolicyTitle}</h3>
                <p>{dictionary.cookies.changesToPolicyText}</p>
            </div>
          </section>

          <section id="impressum" className="mb-16 scroll-mt-24">
            <h2 className="text-4xl font-bold font-headline text-white mb-8 border-b border-border/50 pb-4">{dictionary.impressum.title}</h2>
            <div className="space-y-6 text-gray-300 prose prose-invert prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white">
                <p>{dictionary.impressum.infoText}</p>
                
                <p><strong>{dictionary.impressum.companyDescriptionTitle}</strong><br/>
                {dictionary.impressum.companyDescriptionText}</p>
                
                <p><strong>{dictionary.impressum.responsibleTitle}</strong><br/>
                FXVDS<br/>
                Email: <a href="mailto:info@fxvds.com">info@fxvds.com</a><br/>
                Website: <a href="https://fxvds.com" target="_blank" rel="noopener noreferrer">https://fxvds.com</a></p>

                <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.impressum.liabilityLinksTitle}</h3>
                <p>{dictionary.impressum.liabilityLinksText}</p>

                <h3 className="text-2xl font-semibold text-white mt-8">{dictionary.impressum.copyrightTitle}</h3>
                <p>{dictionary.impressum.copyrightText}</p>
            </div>
          </section>
          
          <div className="text-center mt-24">
            <Link href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-primary hover:underline">
              {dictionary.backToTop}
            </Link>
          </div>

          <div className="mt-24 pt-16 border-t border-border/50 text-sm text-gray-400">
            <h3 className="font-semibold text-white mb-4">{dictionary.footer.legalInfoTitle}</h3>
            <p>{dictionary.footer.brandInfo}</p>
            <p className="mt-2">{dictionary.footer.addressTitle}<br />Obentrautstraße 45, 10963 Berlin, Germany</p>
            <p className="mt-2">{dictionary.footer.courtTitle}: Amtsgericht Charlottenburg<br />{dictionary.footer.registerNumberTitle}: HRB 262157 B</p>
            <p className="mt-2">{dictionary.footer.contactTitle}: <a href="mailto:info@fxvds.com" className="text-primary hover:underline">info@fxvds.com</a><br />
            Website: <a href="https://fxvds.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://fxvds.com</a></p>
          </div>

        </div>
      </main>
      <Footer lang={lang} dictionary={footerDict} />
    </div>
  );
};

export default LegalPage;

    