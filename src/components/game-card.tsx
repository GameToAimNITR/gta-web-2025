
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Game } from '@/lib/games-data';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { games } from '@/lib/games-data';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface GameCardProps {
  game: Game;
  isVisible: boolean;
  index: number;
  onMouseEnter: () => void;
  onClick: (game: Game) => void;
  isHovered: boolean;
  isDimmed: boolean;
}

export default function GameCard({ game, isVisible, index, onMouseEnter, onClick, isHovered, isDimmed }: GameCardProps) {
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getTransformOrigin = (i: number) => {
    if (!isMounted) return 'origin-center';

    const cols = isMobile ? 2 : 5;
    const numRows = Math.ceil(games.length / cols);
    const row = Math.floor(i / cols);

    if (row < numRows / 2 - 0.5) {
      return 'origin-bottom';
    }
    if (row > numRows / 2 - 0.5) {
      return 'origin-top';
    }
    return 'origin-center';
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={() => onClick(game)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(game);
        }
      }}
      className={cn(
        "relative w-full group h-full game-card-clickable",
        'transition-all duration-150 ease-in-out',
        getTransformOrigin(index),
        !isVisible || !isMounted ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100',
      )}
      style={{ transitionDelay: `${index * 30}ms` }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${game.title}`}
    >
      <Card
        className={cn(
            "h-full w-full overflow-hidden border-primary/20 transition-all duration-150 group-hover:border-primary flex flex-col",
            isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDelay: `${(index * 30) + 100}ms`}}
      >
        <CardHeader className="p-0">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={game.image}
              alt={game.title}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              loading="lazy"
              quality={85}
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              data-ai-hint={game.aiHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-1 flex flex-col justify-center">
            <h3 className="font-headline font-bold text-lg md:text-xl tracking-wide text-primary text-glow-primary transition-all duration-150 group-hover:text-accent">
                {game.title}
            </h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {game.description}
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
