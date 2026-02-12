
'use client';

import { games } from '@/lib/games-data';
import type { Game } from '@/lib/games-data';
import GameCard from '@/components/game-card';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Users, Code, Gamepad2, ArrowLeft, X, Terminal, Cpu } from 'lucide-react';
import Link from 'next/link';
import { useLenis } from 'lenis/react';
import { cn } from '@/lib/utils';

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

  // ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDialogOpen) {
        setIsDialogOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDialogOpen]);

  return (
    <>
      <div className="min-h-screen w-full pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <Link href="/#games" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-glow-accent-strong uppercase tracking-cyber-wide cyber-heading mb-4">
              Complete Game Archives
            </h1>
            <p className="text-lg font-headline text-muted-foreground max-w-3xl">
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

      {/* Cyberpunk Game Terminal Modal */}
      <div
        className={cn(
          "fixed inset-0 z-50 transition-all duration-300",
          isDialogOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        data-lenis-prevent
      >
        {/* Backdrop with scanlines effect */}
        <div 
          className="absolute inset-0 bg-background/90 backdrop-blur-md"
          onClick={() => setIsDialogOpen(false)}
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              hsl(var(--primary) / 0.03) 2px,
              hsl(var(--primary) / 0.03) 4px
            )`
          }}
        />
        
        {/* Modal Container */}
        <div className="absolute inset-4 md:inset-8 lg:inset-12 flex items-center justify-center">
          <div 
            className={cn(
              "relative w-full max-w-5xl max-h-full flex flex-col transition-all duration-500",
              isDialogOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
            )}
          >
            {/* Cyber Frame - Outer Glow */}
            <div 
              className="absolute -inset-[2px] opacity-75"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))',
                clipPath: 'polygon(0 30px, 30px 0, calc(100% - 30px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0 calc(100% - 30px))',
                filter: 'blur(4px)',
              }}
            />
            
            {/* Main Frame Border */}
            <div 
              className="absolute -inset-[1px]"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                clipPath: 'polygon(0 30px, 30px 0, calc(100% - 30px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0 calc(100% - 30px))',
              }}
            />
            
            {/* Inner Content Container */}
            <div 
              className="relative bg-background flex flex-col max-h-[85vh] md:max-h-[80vh]"
              style={{
                clipPath: 'polygon(0 30px, 30px 0, calc(100% - 30px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0 calc(100% - 30px))',
              }}
            >
              {selectedGame && (
                <>
                  {/* Header */}
                  <div className="flex-shrink-0 bg-card/80 border-b border-primary/30 px-4 md:px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-primary tracking-cyber-wide uppercase text-glow-primary">
                        {selectedGame.title}
                      </h2>
                      <button
                        onClick={() => setIsDialogOpen(false)}
                        className="group relative p-2 hover:bg-primary/20 transition-colors rounded-sm"
                      >
                        <X className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div 
                    className="flex-1 overflow-y-auto overscroll-contain game-modal-scrollbar"
                    data-lenis-prevent
                    style={{ 
                      WebkitOverflowScrolling: 'touch',
                    }}
                    onWheel={(e) => {
                      // Ensure wheel events scroll the container
                      e.stopPropagation();
                    }}
                  >
                    <div className="p-4 md:p-6 space-y-5">
                      
                      {/* Hero Section - Image + Title Side by Side */}
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        {/* Game Image - Smaller */}
                        <div className="relative group/image w-full md:w-2/5 flex-shrink-0">
                          <div 
                            className="absolute -inset-[1px] bg-gradient-to-br from-primary via-accent to-primary opacity-60 group-hover/image:opacity-100 transition-opacity animate-cyber-glow-flicker"
                            style={{
                              clipPath: 'polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))',
                            }}
                          />
                          <div 
                            className="relative aspect-[4/3] overflow-hidden bg-card"
                            style={{
                              clipPath: 'polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))',
                            }}
                          >
                            <Image
                              src={selectedGame.image}
                              alt={selectedGame.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover/image:scale-105"
                            />
                            {/* Scanline overlay */}
                            <div 
                              className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay"
                              style={{
                                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--accent) / 0.05) 2px, hsl(var(--accent) / 0.05) 4px)`
                              }}
                            />
                          </div>
                        </div>

                        {/* Quick Info Panel */}
                        <div className="flex-1 flex flex-col gap-3">
                          {/* Description Box - Hero Inspired */}
                          <div className="cyber-section-box group/desc flex-1">
                            <div className="cyber-section-box-border" />
                            <div className="cyber-section-box-content">
                              <div className="flex items-center gap-2 mb-2">
                                <Terminal className="w-4 h-4 text-accent" />
                                <span className="text-accent font-code text-[10px] uppercase tracking-[0.2em]">// MISSION_BRIEF</span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {selectedGame.longDescription || selectedGame.description}
                              </p>
                            </div>
                          </div>

                          {/* Play Button - If available, show here for quick access */}
                          {selectedGame.playUrl && (
                            <Link 
                              href={selectedGame.playUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="cyber-button group w-full"
                            >
                              <div className="cyber-button-content justify-center py-3">
                                <Gamepad2 className="w-5 h-5" />
                                <span className="cyber-button-text">Launch Game</span>
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Info Grid - Two Column */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Developers Section */}
                        {selectedGame.developers && selectedGame.developers.length > 0 && (
                          <div className="cyber-section-box group/dev">
                            <div className="cyber-section-box-border" />
                            <div className="cyber-section-box-content">
                              <div className="flex items-center gap-2 mb-3">
                                <Users className="w-4 h-4 text-primary" />
                                <span className="text-primary font-code text-[10px] uppercase tracking-[0.2em]">// DEV_TEAM</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {selectedGame.developers.map((dev, i) => (
                                  <span 
                                    key={i}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 border border-primary/30 text-sm text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all"
                                    style={{
                                      clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
                                    }}
                                  >
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    {dev}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Tech Stack Section */}
                        {selectedGame.techStack && selectedGame.techStack.length > 0 && (
                          <div className="cyber-section-box group/tech">
                            <div className="cyber-section-box-border" />
                            <div className="cyber-section-box-content">
                              <div className="flex items-center gap-2 mb-3">
                                <Code className="w-4 h-4 text-accent" />
                                <span className="text-accent font-code text-[10px] uppercase tracking-[0.2em]">// TECH_STACK</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {selectedGame.techStack.map((tech) => (
                                  <span 
                                    key={tech}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/5 border border-accent/30 text-sm text-foreground hover:bg-accent/10 hover:border-accent/50 transition-all"
                                    style={{
                                      clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 100%, 6px 100%)',
                                    }}
                                  >
                                    <Cpu className="w-3 h-3 text-accent" />
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Footer Bar */}
                  <div className="flex-shrink-0 bg-card/80 border-t border-primary/30 px-4 md:px-6 py-2">
                    <div className="flex items-center justify-between text-xs font-code text-muted-foreground tracking-cyber-wide">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                        GAME_TO_AIM // NIT ROURKELA
                      </span>
                      <span className="hidden md:block text-primary/60">
                        [ ESC to close ]
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
