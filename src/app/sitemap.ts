import { MetadataRoute } from 'next';
import { i18n } from '@/i18n.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fxvds.com';

  const routes = ['', '/legal'].flatMap((route) =>
    i18n.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date().toISOString(),
      alternates: {
        languages: i18n.locales.reduce((acc, lang) => {
          acc[lang] = `${siteUrl}/${lang}${route}`;
          return acc;
        }, {} as Record<string, string>),
      },
    }))
  );

  return routes;
}
