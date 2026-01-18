
'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/hero';
import HackerOverlay from '@/components/hacker-overlay';
import { useAnimation } from '@/context/animation-context';
import OrganizationSchema from '@/components/page-specific/organization-schema';
import { SectionSkeleton } from '@/components/loading-skeletons';

// Lazy load non-critical sections
const AboutSection = dynamic(() => import('@/components/sections/about'), {
  loading: () => <SectionSkeleton />,
});

const GamesSection = dynamic(() => import('@/components/sections/games'), {
  loading: () => <SectionSkeleton />,
});

// const ShowcaseSection = dynamic(() => import('@/components/sections/showcase'), {
//   loading: () => <SectionSkeleton />,
//   ssr: false,
// });

const AchievementsSection = dynamic(() => import('@/components/sections/achievements'), {
  loading: () => <SectionSkeleton />,
});

const ContactSection = dynamic(() => import('@/components/sections/contact'), {
  loading: () => <SectionSkeleton />,
});

const BioIDTerminal = dynamic(() => import('@/components/bio-id-terminal'), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

export default function Home() {
  const { sequenceComplete } = useAnimation();

  return (
    <>
      <OrganizationSchema />
      {!sequenceComplete && <HackerOverlay />}
      <HeroSection />
      <AboutSection />
      <GamesSection />
      {/* <ShowcaseSection /> */}
      <AchievementsSection />
      <ContactSection />
      <section id="member-access" className="py-24">
        <div className="container mx-auto px-4">
          <BioIDTerminal />
        </div>
      </section>
    </>
  );
}
