
import Link from 'next/link';
import Logo from '@/components/logo';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>['footer'];

const Footer = ({ lang, dictionary }: { lang: Locale, dictionary: Dictionary }) => {
  return (
    <footer className="bg-black/50 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Logo className="h-10 w-40" />
            <p className="text-sm text-gray-400 max-w-sm">
              {dictionary.tagline}
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-4">{dictionary.company.title}</h3>
            <ul className="space-y-2">
              <li><Link href={`/${lang}/#why-us`} className="text-sm text-gray-400 hover:text-white transition-colors">{dictionary.company.about}</Link></li>
              <li><Link href={`/${lang}/#pricing`} className="text-sm text-gray-400 hover:text-white transition-colors">{dictionary.company.plans}</Link></li>
              <li><Link href={`/${lang}/#contact`} className="text-sm text-gray-400 hover:text-white transition-colors">{dictionary.company.contact}</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <Link href={`/${lang}/legal`}>
                <h3 className="font-semibold text-white mb-4 hover:text-primary transition-colors">
                {dictionary.legal.title}
                </h3>
            </Link>
            <ul className="space-y-2">
              <li><Link href={`/${lang}/legal#privacy-policy`} className="text-sm text-gray-400 hover:text-white transition-colors">{dictionary.legal.privacy}</Link></li>
              <li><Link href={`/${lang}/legal#terms-of-service`} className="text-sm text-gray-400 hover:text-white transition-colors">{dictionary.legal.terms}</Link></li>
              <li><Link href={`/${lang}/legal#cookies`} className="text-sm text-gray-400 hover:text-white transition-colors">{dictionary.legal.cookies}</Link></li>
              <li><Link href={`/${lang}/legal#impressum`} className="text-sm text-gray-400 hover:text-white transition-colors">{dictionary.legal.impressum}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} FXVDS. {dictionary.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
