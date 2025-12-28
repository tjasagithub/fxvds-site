
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import Link from 'next/link';

const TermsOfServicePage = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);
  const { legal } = dictionary;

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-1 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold font-headline text-white mb-16 text-center">{legal.terms.title}</h1>
          <section id="terms-of-service" className="mb-24 scroll-mt-24">
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

export default TermsOfServicePage;
