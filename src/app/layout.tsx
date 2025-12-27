
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: { lang: string };
};

// This layout is a server component, it does not contain the root <html> and <body> tags
// since those are defined in the /[lang]/layout.tsx file.
export default function RootLayout({ children }: Props) {
  // The check for valid languages should be done in middleware or at the page level,
  // not in the root layout which would cause a rendering loop with notFound().
  return children;
}
