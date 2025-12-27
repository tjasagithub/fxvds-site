
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from '@/i18n.config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string {
  // Check for a language cookie
  const langCookie = request.cookies.get('lang');
  if (langCookie && i18n.locales.includes(langCookie.value as any)) {
    return langCookie.value;
  }

  // If no cookie, check the accept-language header
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
  } catch (error) {
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Let static assets and API routes pass
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|json)$/)
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  
  // Redirect if there is no locale in the pathname
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // Form the new URL
    const newUrl = new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url);
    
    // Add search parameters if they exist
    if (request.nextUrl.search) {
      newUrl.search = request.nextUrl.search;
    }
    
    return NextResponse.redirect(newUrl);
  }

  // Set the preference cookie if a user visits a localized path without a cookie
  const langCookie = request.cookies.get('lang');
  const currentLocale = i18n.locales.find(locale => pathname.startsWith(`/${locale}`));
  
  if (currentLocale && (!langCookie || langCookie.value !== currentLocale)) {
    const response = NextResponse.next();
    response.cookies.set('lang', currentLocale, { path: '/', maxAge: 31536000 });
    return response;
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
