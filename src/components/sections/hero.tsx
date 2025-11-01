
'use client';

import { useState } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import { Gamepad2, Component, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import Cybertype from '@/components/cybertype';

export default function HeroSection() {
  const buttons = ['games', 'showcase', 'join'] as const;
  type SelectedButton = (typeof buttons)[number];

  const [selectedButton, setSelectedButton] = useState<SelectedButton>('games');

  const lenis = useLenis();

  const handleNavigation = (targetId: string) => {
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
    { id: 'games', label: 'Explore Games', icon: <Gamepad2 />, target: '#games' },
    { id: 'showcase', label: 'Explore Showcase', icon: <Component />, target: '#showcase' },
    { id: 'join', label: 'Join Us', icon: <UserPlus />, target: '#contact' },
  ];

  return (
    <section id="hero" className="relative h-[100vh] w-full flex items-center justify-center text-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-full h-full object-cover"
        src="/gta_intro.webm"
        aria-label="Promotional video for Game To Aim club"
      />
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="z-10 flex flex-col items-center p-4">
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
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {buttonData.map((btn, index) => (
              <div
                key={btn.id}
                className={cn('animate-entry is-visible',
                  index === 0 ? 'animate-slide-in-left' : index === 1 ? 'animate-fade-in' : 'animate-slide-in-right'
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <button
                  className={cn(
                    'cyber-button group flex-shrink-0',
                    { 'is-selected': selectedButton === btn.id }
                  )}
                  onClick={() => handleNavigation(btn.target)}
                  onMouseEnter={() => setSelectedButton(btn.id as SelectedButton)}
                  aria-label={btn.label}
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
