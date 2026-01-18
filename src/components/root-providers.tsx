
'use client';

import { AnimationProvider } from '@/context/animation-context';
import LenisProvider from '@/components/lenis-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import dynamic from 'next/dynamic';

const BackgroundFX = dynamic(() => import('@/components/background-fx'), {
  ssr: false,
});

const CursorFX = dynamic(() => import('@/components/cursor-fx'), {
  ssr: false,
});

const ScrollToTop = dynamic(() => import('@/components/scroll-to-top'), {
  ssr: false,
});


export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <AnimationProvider>
      <LenisProvider>
        <CursorFX />
        <BackgroundFX />
        <ScrollToTop />
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </LenisProvider>
    </AnimationProvider>
  );
}
