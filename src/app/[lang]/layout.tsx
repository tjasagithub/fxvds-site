
import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { getDictionary } from '@/lib/get-dictionary';
import { i18n, Locale } from '@/i18n.config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fxvds.com';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const currentPath = ''; // Root layout

  const alternates: { [key: string]: string } = {};
  i18n.locales.forEach(l => {
    alternates[l] = `${siteUrl}/${l}${currentPath}`;
  });

  return {
    metadataBase: new URL(siteUrl),
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    alternates: {
      canonical: `${siteUrl}/${lang}${currentPath}`,
      languages: alternates,
    },
  };
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg?v=1" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-background text-foreground antialiased" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
