
'use client';

import Link from 'next/link';
import type { getDictionary } from '@/lib/get-dictionary';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export default function LegalPageContent({ dictionary }: { dictionary: Dictionary }) {
    if (!dictionary) {
        return (
           <div className="flex flex-col min-h-dvh bg-background text-foreground">
             <div className="flex-1" />
           </div>
        )
      }
    
    const { legal } = dictionary;

    return (
        <main className="flex-1 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold font-headline text-white mb-16 text-center">{legal.title}</h1>

          <section id="privacy-policy" className="mb-24 scroll-mt-24">
            <h2 className="text-4xl font-bold font-headline text-white mb-8 border-b border-border/50 pb-4">{legal.privacy.title}</h2>
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

          <section id="terms-of-service" className="mb-24 scroll-mt-24">
            <h2 className="text-4xl font-bold font-headline text-white mb-8 border-b border-border/50 pb-4">{legal.terms.title}</h2>
            <div className="space-y-6 text-gray-300 prose prose-invert prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white">
              <p>{legal.terms.intro}</p>
              
              <h3 className="text-2xl font-semibold text-white mt-8">{legal.terms.serviceDescriptionTitle}</h3>
              <p>{legal.terms.serviceDescriptionText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{legal.terms.eligibilityTitle}</h3>
              <p>{legal.terms.eligibilityText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{legal.terms.accountRegistrationTitle}</h3>
              <p>{legal.terms.accountRegistrationText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{legal.terms.paymentsTitle}</h3>
              <p>{legal.terms.paymentsText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{legal.terms.freeTrialTitle}</h3>
              <p>{legal.terms.freeTrialText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{legal.terms.cancellationsTitle}</h3>
              <p>{legal.terms.cancellationsText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{legal.terms.addOnsTitle}</h3>
              <p>{legal.terms.addOnsText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{legal.terms.availabilityTitle}</h3>
              <p>{legal.terms.availabilityText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{legal.terms.dataBackupsTitle}</h3>
              <p>{legal.terms.dataBackupsText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{legal.terms.liabilityTitle}</h3>
              <p>{legal.terms.liabilityText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{legal.terms.serviceChangesTitle}</h3>
              <p>{legal.terms.serviceChangesText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{legal.terms.termsChangesTitle}</h3>
              <p>{legal.terms.termsChangesText}</p>

              <h3 className="text-2xl font-semibold text-white mt-8">{legal.terms.contactTitle}</h3>
              <p dangerouslySetInnerHTML={{ __html: legal.terms.contactText.replace('{email}', '<a href="mailto:info@fxvds.com">info@fxvds.com</a>') }}></p>
            </div>
          </section>

          <section id="cookies" className="mb-24 scroll-mt-24">
            <h2 className="text-4xl font-bold font-headline text-white mb-8 border-b border-border/50 pb-4">{legal.cookies.title}</h2>
            <div className="space-y-6 text-gray-300 prose prose-invert prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white">
                <p>{legal.cookies.intro}</p>

                <h3 className="text-2xl font-semibold text-white mt-8">{legal.cookies.whatAreCookiesTitle}</h3>
                <p>{legal.cookies.whatAreCookiesText}</p>
                
                <h3 className="text-2xl font-semibold text-white mt-8">{legal.cookies.howWeUseTitle}</h3>
                <p>{legal.cookies.howWeUseIntro}</p>
                <ul className="list-disc pl-6 space-y-2">
                   {legal.cookies.howWeUseList.map((item, i) => <li key={i}><strong>{item.title}:</strong> {item.text}</li>)}
                </ul>
                <p>{legal.cookies.enablingText}</p>
                
                <h3 className="text-2xl font-semibold text-white mt-8">{legal.cookies.howToControlTitle}</h3>
                <p dangerouslySetInnerHTML={{ __html: legal.cookies.howToControlText.replace('{link}', '<a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">aboutcookies.org</a>') }}></p>

                <h3 className="text-2xl font-semibold text-white mt-8">{legal.cookies.changesToPolicyTitle}</h3>
                <p>{legal.cookies.changesToPolicyText}</p>
            </div>
          </section>

          <section id="impressum" className="mb-16 scroll-mt-24">
            <h2 className="text-4xl font-bold font-headline text-white mb-8 border-b border-border/50 pb-4">{legal.impressum.title}</h2>
            <div className="space-y-6 text-gray-300 prose prose-invert prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white">
                <p>{legal.impressum.infoText}</p>
                
                <p><strong>{legal.impressum.companyDescriptionTitle}</strong><br/>
                {legal.impressum.companyDescriptionText}</p>
                
                <p><strong>{legal.impressum.responsibleTitle}</strong><br/>
                FXVDS<br/>
                Email: <a href="mailto:info@fxvds.com">info@fxvds.com</a><br/>
                Website: <a href="https://fxvds.com" target="_blank" rel="noopener noreferrer">https://fxvds.com</a></p>

                <h3 className="text-2xl font-semibold text-white mt-8">{legal.impressum.liabilityLinksTitle}</h3>
                <p>{legal.impressum.liabilityLinksText}</p>

                <h3 className="text-2xl font-semibold text-white mt-8">{legal.impressum.copyrightTitle}</h3>
                <p>{legal.impressum.copyrightText}</p>
            </div>
          </section>
          
          <div className="text-center mt-24">
            <Link href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-primary hover:underline">
              {legal.backToTop}
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
    )
}
