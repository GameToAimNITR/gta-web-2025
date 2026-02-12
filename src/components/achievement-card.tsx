
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';
import type { Achievement } from '@/lib/achievements-data';
import AnimatedCounter from '@/components/animated-counter';

interface AchievementCardProps {
  achievement: Achievement;
  onCardClick: (achievement: Achievement) => void;
}


export default function AchievementCard({ achievement, onCardClick }: AchievementCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isHovered) {
      // Small delay to sync with CSS transition
      timeout = setTimeout(() => setProgressValue(achievement.progress), 50);
    } else {
      setProgressValue(0);
    }
    return () => clearTimeout(timeout);
  }, [isHovered, achievement.progress]);

  return (
    <div
      className="h-full"
      role="button"
      tabIndex={0}
      onClick={() => onCardClick(achievement)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onCardClick(achievement)}
      aria-label={`View details for ${achievement.title}`}
    >
      <Card
        className="overflow-hidden group border-primary/20 hover:border-primary transition-all duration-300 flex flex-col h-full hover:box-glow-primary"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="p-0 relative h-48 w-full">
          <Image
            src={achievement.image}
            alt={achievement.title}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            quality={85}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            data-ai-hint={achievement.aiHint}
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-300"></div>
          <div className="absolute top-4 right-4 bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 backdrop-blur-sm">
            <Trophy className="w-4 h-4" />
            <span>
              <AnimatedCounter value={achievement.xp} /> XP
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-6 flex flex-col flex-grow bg-card">
          <CardTitle className="text-xl font-headline font-bold tracking-wide group-hover:text-accent transition-all">
            {achievement.title}
          </CardTitle>
          <CardDescription className="mt-2 text-muted-foreground leading-relaxed">
            {achievement.description}
          </CardDescription>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1 text-xs text-muted-foreground font-code tracking-cyber-wide">
              <span>Progress</span>
              <span>{isHovered ? achievement.progress : 0}%</span>
            </div>
            <Progress value={progressValue} className="h-2 w-full [&>div]:bg-accent" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
