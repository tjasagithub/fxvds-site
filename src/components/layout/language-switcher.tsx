
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n, Locale } from '@/i18n.config';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathName = usePathname();

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };
  
  const setCookie = (locale: Locale) => {
    document.cookie = `lang=${locale};path=/;max-age=31536000`;
  };

  return (
    <div className="flex items-center text-sm font-medium text-gray-300">
      <Link 
        href={redirectedPathName('en')} 
        className={cn('px-2 py-1', lang === 'en' && 'text-primary font-bold')}
        onClick={() => setCookie('en')}
      >
        EN
      </Link>
      <span className="text-gray-500">|</span>
      <Link 
        href={redirectedPathName('de')} 
        className={cn('px-2 py-1', lang === 'de' && 'text-primary font-bold')}
        onClick={() => setCookie('de')}
      >
        DE
      </Link>
    </div>
  );
}
