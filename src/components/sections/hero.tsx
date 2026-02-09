
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { Gamepad2, Trophy, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import Cybertype from '@/components/cybertype';
import HeroBackground from '@/components/hero-background';

export default function HeroSection() {
  const buttons = ['games', 'achievements', 'join'] as const;
  type SelectedButton = (typeof buttons)[number];

  const [selectedButton, setSelectedButton] = useState<SelectedButton>('games');

  const lenis = useLenis();
  const router = useRouter();

  const handleNavigation = (targetId: string) => {
    // Route to /games page for the Explore Games button
    if (targetId === '/games') {
      router.push('/games');
      return;
    }

    document.body.classList.add('is-nav-scrolling');
    setTimeout(() => {
      document.body.classList.remove('is-nav-scrolling');
    }, 800);

    lenis?.scrollTo(targetId, {
      offset: -80,
      duration: 1.5,
    });
  };

  const buttonData = [
    { id: 'games', label: 'Explore Games', icon: <Gamepad2 />, target: '/games' },
    { id: 'achievements', label: 'Achievements', icon: <Trophy />, target: '#achievements' },
    { id: 'join', label: 'Join Us', icon: <UserPlus />, target: '#contact' },
  ];

  return (
    <section id="hero" className="relative h-[100vh] w-full flex items-center justify-center text-center overflow-hidden isolate">
      <HeroBackground />
      <div className="z-10 flex flex-col items-center p-4 relative pointer-events-none">
        <div
          className={'animate-entry animate-slide-in-top is-visible'}
        >
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider text-glow-primary glitch-layers"
            data-text="GAME TO AIM"
          >
            GAME TO AIM
          </h1>
        </div>
        <div
          className={'max-w-3xl mt-8 animate-entry animate-fade-in is-visible'}
        >
          <Cybertype
            texts={[
              "NIT Rourkela's Official Game Development Club.",
              "We Don't Code. We Build Worlds.",
            ]}
          />
        </div>
        <div
          className={'flex flex-col items-center gap-4 mt-12 transition-opacity duration-500 opacity-100'}
        >
          <div className="flex flex-col sm:flex-row items-center gap-8 pointer-events-auto">
            {buttonData.map((btn, index) => (
              <div
                key={btn.id}
                className={cn('animate-entry is-visible pointer-events-auto',
                  index === 0 ? 'animate-slide-in-left' : index === 1 ? 'animate-fade-in' : 'animate-slide-in-right'
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <button
                  className={cn(
                    'cyber-button group flex-shrink-0 button-press pointer-events-auto',
                    { 'is-selected': selectedButton === btn.id }
                  )}
                  onClick={() => handleNavigation(btn.target)}
                  onMouseEnter={() => setSelectedButton(btn.id as SelectedButton)}
                  onTouchStart={() => setSelectedButton(btn.id as SelectedButton)}
                  aria-label={btn.label}
                  type="button"
                >
                  <div className="cyber-button-content">
                    {btn.icon}
                    <span className="cyber-button-text">
                      {btn.label}
                    </span>
                  </div>
                </button>
              </div>
            ))}

          </div>
          <div
            className={'animate-entry animate-fade-in is-visible'}
            style={{ animationDelay: '500ms' }}
          >
            <p className="text-sm text-muted-foreground font-code mt-4">
              Hover or click to navigate the digital frontier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
