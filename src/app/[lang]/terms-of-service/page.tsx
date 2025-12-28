
import { redirect } from 'next/navigation';
import { Locale } from '@/i18n.config';

export default function TermsOfServicePage({ params: { lang } }: { params: { lang: Locale } }) {
  redirect(`/${lang}/legal#terms-of-service`);
}
