
'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';
import type { Achievement } from '@/lib/achievements-data';

interface AchievementCardProps {
  achievement: Achievement;
  onCardClick: (achievement: Achievement) => void;
}

const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const end = value;
          if (start === end) {
            setCount(end);
            return;
          }
          const duration = 800; // Reduced from 1000ms
          const steps = 20; // Reduced from continuous updates
          const increment = end / steps;
          const stepDuration = duration / steps;
          
          let currentStep = 0;
          const timer = setInterval(() => {
            currentStep++;
            start += increment;
            if (currentStep >= steps) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, stepDuration);
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if(currentRef) {
        observer.unobserve(currentRef)
      }
    };
  }, [value]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};


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
          <CardTitle className="text-xl font-bold group-hover:text-accent transition-all">
            {achievement.title}
          </CardTitle>
          <CardDescription className="mt-2 text-muted-foreground flex-grow">
            {achievement.description}
          </CardDescription>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1 text-xs text-muted-foreground font-code">
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
