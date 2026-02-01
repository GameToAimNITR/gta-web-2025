
'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { Button } from '@/components/ui/button';
import MemberCard from '@/components/member-card';
import { members, years } from '@/lib/members';
import type { Year } from '@/lib/members/types';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

// This metadata is not used because the page is client-rendered.
// For SEO, this should be a server component or use generateMetadata.
// export const metadata: Metadata = {
//     title: 'Meet the Team',
//     description: 'Meet the talented developers, artists, and designers of Game To Aim. See the students behind NIT Rourkela’s most innovative gaming projects.',
//     alternates: {
//         canonical: '/members',
//     },
// };

export default function MembersPage() {
  const [activeFilter, setActiveFilter] = useState<Year | 'All'>('All');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    document.title = 'Meet the Team | Game To Aim - NIT Rourkela';
  }, []);

  useEffect(() => {
    // Scroll to top on page load
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const filteredMembers = useMemo(() => members.filter(member => 
    activeFilter === 'All' || member.year === activeFilter
  ), [activeFilter]);

  return (
    <section id="members" ref={sectionRef} className="py-16 md:py-24 parallax-section">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Meet the Team</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            The architects of our worlds. Meet the developers, artists, and designers of Game To Aim, the game development club of NIT Rourkela.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
          <Button
            variant={activeFilter === 'All' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('All')}
            className={cn(
              "border-primary/50 hover:bg-primary/90",
              activeFilter === 'All' && "bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground border-tertiary"
            )}
          >
            All Members
          </Button>
          {years.map(year => (
            <Button
              key={year}
              variant={activeFilter === year ? 'default' : 'outline'}
              onClick={() => setActiveFilter(year)}
              className={cn(
                "border-primary/50 hover:bg-primary/90",
                activeFilter === year && "bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground border-tertiary"
              )}
            >
              {`Batch of ${year}`}
            </Button>
          ))}
        </div>

        <div className="member-grid">
          {filteredMembers.map((member, index) => (
            <div
              key={member.id}
              className={cn(
                'animate-entry animate-slide-up-fade',
                { 'is-visible': isVisible }
              )}
              style={{ animationDelay: `${100 + index * 100}ms` }}
            >
              <MemberCard member={member} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
