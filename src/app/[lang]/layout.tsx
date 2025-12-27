
import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n.config';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
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
