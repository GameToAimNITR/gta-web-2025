
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
import { useLenis } from '@studio-freight/react-lenis';

export default function GamesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const lenis = useLenis();

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
        className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 parallax-section overflow-hidden"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-glow-accent">Game Archives</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Browse our complete library of digital worlds. Hover over any project to see the details.
          </p>
        </div>

        <div 
          className="grid grid-cols-2 md:grid-cols-5 gap-8 w-full"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {games.map((game, index) => (
            <GameCard
              key={game.title}
              game={game}
              isVisible={isVisible}
              index={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={handleGameClick}
              isHovered={hoveredIndex === index}
              isDimmed={hoveredIndex !== null && hoveredIndex !== index}
            />
          ))}
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-0 border-accent box-glow-accent">
          {selectedGame && (
            <>
              <div className="relative aspect-video md:aspect-auto">
                <Image
                  src={selectedGame.image}
                  alt={selectedGame.title}
                  fill
                  className="object-cover rounded-l-lg"
                  data-ai-hint={selectedGame.aiHint}
                />
              </div>
              <div className="p-8 flex flex-col gap-4">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold text-primary text-glow-primary">{selectedGame.title}</DialogTitle>
                  <DialogDescription className="text-muted-foreground text-base">
                    {selectedGame.longDescription}
                  </DialogDescription>
                </DialogHeader>

                <div>
                  <h4 className="font-semibold text-lg flex items-center gap-2 mb-2 text-accent">
                    <Code /> Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedGame.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-secondary/50 text-secondary-foreground border-border">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg flex items-center gap-2 mb-2 text-accent">
                    <Users /> Developers
                  </h4>
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
