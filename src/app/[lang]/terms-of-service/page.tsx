
import { redirect } from 'next/navigation';
import { Locale } from '@/i18n.config';

export default async function TermsOfServicePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  redirect(`/${lang}/legal#terms-of-service`);
}
