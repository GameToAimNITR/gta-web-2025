
'use client';

import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import AchievementsSection from '@/components/sections/achievements';
import ContactSection from '@/components/sections/contact';
import GamesSection from '@/components/sections/games';
import HackerOverlay from '@/components/hacker-overlay';
import { useAnimation } from '@/context/animation-context';
import BioIDTerminal from '@/components/bio-id-terminal';
import ShowcaseSection from '@/components/sections/showcase';
import OrganizationSchema from '@/components/page-specific/organization-schema';

export default function Home() {
  const { sequenceComplete } = useAnimation();

  return (
    <>
      <OrganizationSchema />
      {!sequenceComplete && <HackerOverlay />}
      <HeroSection />
      <AboutSection />
      <GamesSection />
      <ShowcaseSection />
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
