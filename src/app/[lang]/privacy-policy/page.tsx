
import { redirect } from 'next/navigation';
import { Locale } from '@/i18n.config';

export default function PrivacyPolicyPage({ params: { lang } }: { params: { lang: Locale } }) {
  redirect(`/${lang}/legal#privacy-policy`);
}
