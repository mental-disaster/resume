import type { Metadata } from 'next';
import './globals.css';

import { MotionConfig } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import FloatingButton from '@/components/common/FloatingButton';

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
        <MotionConfig reducedMotion="user">
          <ReactLenis root>{children}</ReactLenis>
          <FloatingButton />
        </MotionConfig>
      </body>
    </html>
  );
}
