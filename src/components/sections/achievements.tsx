
'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { achievements } from '@/lib/achievements-data';
import Script from 'next/script';

export default function AchievementsSection() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const onResize = () => {
      if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const parentWidth = carouselRef.current.parentElement?.offsetWidth || 0;
        // Calculate the total distance the carousel needs to move.
        // It's the total width minus the width of the visible area (the parent).
        // To center the last card, we need to scroll a bit less.
        // We subtract half the parent's width to leave that much space on the right.
        // We also need to account for the card's own width to center it properly.
        // A simpler approach for centering is to scroll until the end of the carousel is at the center of the screen.
        setCarouselWidth(scrollWidth - parentWidth / 2);
      }
    };

    // Run once on mount and on every resize
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Map the vertical scroll progress (0 to 1) to a horizontal movement (0 to -carouselWidth)
  const x = useTransform(scrollYProgress, [0, 1], [0, -carouselWidth]);

  // Generate JSON-LD schema for each achievement as an "Event"
  const eventSchemas = achievements.map(achievement => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": achievement.title,
    "description": achievement.description,
    "image": `https://game-to-aim-cyber.web.app${achievement.image}`,
    "organizer": {
      "@type": "Organization",
      "name": "Game To Aim",
      "url": "https://game-to-aim-cyber.web.app"
    }
  }));

  return (
    <>
    <Script
        id="achievements-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchemas) }}
    />
    <section ref={targetRef} id="achievements" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-16 pt-16 md:pt-24 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-glow-accent tracking-wider uppercase">
              Hall of Fame
            </h2>
            <p className="mt-4 font-code text-lg text-foreground/80 max-w-3xl mx-auto">
            Achievements unlocked! Here’s where our XP, trophies, and epic moments live on.
            </p>
          </div>
        </div>

        <div className="relative mt-16">
          <motion.div ref={carouselRef} style={{ x }} className="flex gap-8 pl-16">
            {achievements.map((achievement, index) => (
               <div key={achievement.title} className="group relative h-[350px] w-[280px] md:h-[400px] md:w-[320px] flex-shrink-0">
                 <div className="cyber-card-container h-full w-full">
                   <div className="cyber-card-content flex flex-col bg-opacity-70">
                    <div className="relative w-full h-48 cyber-card-shimmer" style={{ clipPath: 'polygon(0 20px, 20px 0, 100% 0, 100% 100%, 0 100%)' }}>
                      <Image
                        src={achievement.image}
                        alt={achievement.description}
                        fill
                        sizes="(max-width: 768px) 50vw, 320px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={achievement.aiHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-bold text-xl text-primary text-glow-primary transition-all duration-300 group-hover:text-accent mb-2">
                          {achievement.title}
                      </h3>
                      <p className="text-muted-foreground text-sm flex-grow">
                          {achievement.description}
                      </p>
                    </div>
                   </div>
                 </div>
               </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}
