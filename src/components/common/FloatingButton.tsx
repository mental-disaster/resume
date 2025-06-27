'use client';

import { usePathname, useRouter } from 'next/navigation';
import { IconArrowUp, IconPalette, IconFileText } from '@tabler/icons-react';

export default function FloatingButton() {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleRoute = () => {
    if (pathname === '/styled') {
      router.push('/');
    } else {
      router.push('/styled');
    }
  };

  const isStyledRoute = pathname === '/styled';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 print:hidden">
      <button
        onClick={toggleRoute}
        className="w-8 sm:w-10 h-8 sm:h-10 bg-success/80 hover:bg-success rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label={isStyledRoute ? 'Switch to resume view' : 'Switch to styled view'}
      >
        {isStyledRoute ? (
          <IconFileText className="w-4 sm:w-5 h-4 sm:h-5 text-white group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <IconPalette className="w-4 sm:w-5 h-4 sm:h-5 text-white group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>

      <button
        onClick={scrollToTop}
        className="w-8 sm:w-10 h-8 sm:h-10 bg-info hover:bg-accent rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Scroll to top"
      >
        <IconArrowUp className="w-4 sm:w-5 h-4 sm:h-5 text-white group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </div>
  );
}
