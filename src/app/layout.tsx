import type { Metadata } from 'next';
import './globals.css';

import { ReactLenis } from 'lenis/react';

export const metadata: Metadata = {
  title: "HELLO I'M LIM GYEONGHUN",
  description: 'Who is Lim Gyeonghun?',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  );
}
