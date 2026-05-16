
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import LegalPageContent from '@/components/sections/legal-page-content';

const LegalPage = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header lang={lang} dictionary={dictionary.header} />
      <LegalPageContent dictionary={{ legal: dictionary.legal, footer: dictionary.footer }} />
      <Footer lang={lang} dictionary={dictionary.footer} />
    </div>
  );
};

export default LegalPage;
