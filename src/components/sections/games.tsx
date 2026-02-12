
'use client';

import { games } from '@/lib/games-data';
import type { Game } from '@/lib/games-data';
import GameCard from '@/components/game-card';
import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Users, Code, Gamepad2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useLenis } from 'lenis/react';

export default function GamesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const lenis = useLenis();
  
  // Show only top 3 games on homepage
  const displayedGames = games.slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
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
  
  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    if (isDialogOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isDialogOpen, lenis]);

  return (
    <>
            <section
        id="games"
        ref={sectionRef}
        className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 parallax-section overflow-hidden"
      >
        <div className="text-center mb-8 md:mb-12 px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-glow-accent-strong uppercase tracking-cyber-wide cyber-heading">Featured Games</h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg font-headline text-muted-foreground max-w-3xl mx-auto">
            Check out some of our latest student-made games. Click to view details.
          </p>
        </div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full max-w-6xl mb-12"
        >
          {displayedGames.map((game, index) => (
            <GameCard
              key={game.title}
              game={game}
              isVisible={isVisible}
              index={index}
              onMouseEnter={() => {}}
              onClick={handleGameClick}
              isHovered={false}
              isDimmed={false}
            />
          ))}
        </div>
        
        <div className="flex justify-center relative z-10 mt-8">
          <Link 
            href="/games"
            onClick={() => {
              // Ensure we start at the top of the new page
              lenis?.scrollTo(0, { immediate: true });
            }}
            className="group relative px-8 py-4 text-lg font-headline font-bold overflow-hidden transition-all duration-300 hover:scale-105"
          >
            {/* Animated border effect */}
            <span className="absolute inset-0 border-2 border-primary/50 group-hover:border-accent transition-colors duration-300"></span>
            <span className="absolute inset-0 bg-primary/10 group-hover:bg-accent/20 transition-all duration-300"></span>
            
            {/* Scanning line animation */}
            <span className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/30 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700"></span>
            
            {/* Content */}
            <span className="relative flex items-center gap-3 text-primary group-hover:text-accent transition-colors duration-300">
              <Gamepad2 className="w-6 h-6" />
              <span className="tracking-cyber-wide">EXPLORE ALL GAMES</span>
              <svg className="w-5 h-5 translate-x-0 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-0 border-accent box-glow-accent">
          {selectedGame && (
            <>
              <div className="relative aspect-video md:aspect-auto">
                <Image
                  src={selectedGame.image}
                  alt={`Gameplay screenshot of ${selectedGame.title}`}
                  fill
                  className="object-cover rounded-l-lg"
                  data-ai-hint={selectedGame.aiHint}
                />
              </div>
              <div className="p-8 flex flex-col gap-4">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-display font-bold text-primary text-glow-primary-strong uppercase tracking-wide">{selectedGame.title}</DialogTitle>
                  <DialogDescription className="text-muted-foreground text-base leading-relaxed">
                    {selectedGame.longDescription}
                  </DialogDescription>
                </DialogHeader>

                <div>
                  <h3 className="font-headline font-semibold text-lg flex items-center gap-2 mb-2 text-accent tracking-wide uppercase">
                    <Code /> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedGame.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-secondary/50 text-secondary-foreground border-border">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-headline font-semibold text-lg flex items-center gap-2 mb-2 text-accent tracking-wide uppercase">
                    <Users /> Developers
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedGame.developers.map((dev) => (
                      <Badge key={dev} variant="outline" className="text-foreground border-border">
                        {dev}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-2">
                  {selectedGame.playUrl && selectedGame.playUrl !== '#' ? (
                    <Button asChild className="w-full">
                      <Link href={selectedGame.playUrl} target="_blank" rel="noopener noreferrer">
                        <Gamepad2 className="mr-2 h-4 w-4" />
                        Play Game
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="secondary" onClick={() => setIsDialogOpen(false)} className="w-full">
                      Close
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
