
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
import { Users, Code, Gamepad2, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useLenis } from '@studio-freight/react-lenis';

export default function GamesArchivePage() {
  const [isVisible, setIsVisible] = useState(false);
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
      <div className="min-h-screen w-full pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <Link href="/#games" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-glow-accent mb-4">
              Complete Game Archives
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Explore our full collection of student-made games. Click on any project to learn more about the team and gameplay.
            </p>
          </div>

          <div 
            ref={sectionRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 w-full"
          >
            {games.map((game, index) => (
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
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedGame && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-primary">
                  {selectedGame.title}
                </DialogTitle>
                <DialogDescription className="text-lg mt-2">
                  {selectedGame.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 space-y-6">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-primary/30">
                  <Image
                    src={selectedGame.image}
                    alt={selectedGame.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {selectedGame.longDescription && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">About the Game</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedGame.longDescription}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedGame.developers && selectedGame.developers.length > 0 && (
                    <div className="flex items-start gap-3 p-4 bg-card/50 rounded-lg border border-border">
                      <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Developers</h4>
                        <p className="text-sm text-muted-foreground">{selectedGame.developers.join(', ')}</p>
                      </div>
                    </div>
                  )}

                  {selectedGame.techStack && selectedGame.techStack.length > 0 && (
                    <div className="flex items-start gap-3 p-4 bg-card/50 rounded-lg border border-border">
                      <Code className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Technology Stack</h4>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {selectedGame.techStack.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {selectedGame.playUrl && (
                  <div className="flex gap-4 pt-4">
                    <Button asChild className="flex-1">
                      <Link href={selectedGame.playUrl} target="_blank" rel="noopener noreferrer">
                        <Gamepad2 className="w-4 h-4 mr-2" />
                        Play Game
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

