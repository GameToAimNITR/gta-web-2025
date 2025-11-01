
'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import AchievementsSection from '@/components/sections/achievements';
import ContactSection from '@/components/sections/contact';
import GamesSection from '@/components/sections/games';
import HackerOverlay from '@/components/hacker-overlay';
import { useAnimation } from '@/context/animation-context';
import { useLenis } from '@studio-freight/react-lenis';

const BioIDTerminal = dynamic(() => import('@/components/bio-id-terminal'), {
  ssr: false,
});

export default function Home() {
  const { sequenceComplete } = useAnimation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {!sequenceComplete && <HackerOverlay />}
      <HeroSection />
      <AboutSection />
      <GamesSection />
      <AchievementsSection />
      <ContactSection />
      <section id="member-access" className="py-24">
        <div className="container mx-auto px-4">
          {isClient && <BioIDTerminal />}
        </div>
      </section>
    </>
  );
}
