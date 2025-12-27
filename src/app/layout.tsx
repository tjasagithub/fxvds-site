
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';

type Props = {
  children: ReactNode;
  params: { lang: string };
};

// This layout is a server component, it does not contain the root <html> and <body> tags
// since those are defined in the /[lang]/layout.tsx file.
export default function RootLayout({ children, params }: Props) {
  if (!['en', 'de'].includes(params.lang)) {
    notFound();
  }
  return children;
}
