
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, BookOpenText, Glasses, Users, Swords, FolderGit2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import AnimatedCounter from '@/components/animated-counter';


const focusAreas = [
  {
    icon: <Glasses className="h-10 w-10 text-primary" />,
    title: 'Virtual & Augmented Reality',
    description: 'Crafting immersive experiences that blur the line between the digital and physical worlds.',
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: 'Multiplayer & Networked Experiences',
    description: 'Building connected worlds where players can collaborate, compete, and create shared memories.',
  },
  {
    icon: <BookOpenText className="h-10 w-10 text-primary" />,
    title: 'Community & Collaboration',
    description: 'Fostering a space where developers, artists, and storytellers come together to learn, build, and grow.',
  },
];

const stats = [
    { icon: <Users className="h-8 w-8 text-accent" />, value: `40+`, label: 'Members' },
    { icon: <FolderGit2 className="h-8 w-8 text-accent" />, value: '500+', label: 'Players Reached' },
    { icon: <Swords className="h-8 w-8 text-accent" />, value: '10+', label: 'Projects Shipped' },
];


export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="about" ref={sectionRef} className="py-12 md:py-16 lg:py-24 px-4 parallax-section">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={cn(
              'text-4xl md:text-5xl font-display font-bold uppercase tracking-cyber-wide text-glow-accent-strong cyber-heading animate-entry animate-slide-up-fade',
              { 'is-visible': isVisible }
            )}
            style={{ animationDelay: '100ms' }}
          >
            Who We Are
          </h2>
          <p
            className={cn(
              'mt-4 text-lg font-headline text-muted-foreground max-w-3xl mx-auto animate-entry animate-slide-up-fade',
              { 'is-visible': isVisible }
            )}
            style={{ animationDelay: '200ms' }}
          >
          Game to Aim is the official game development club of NIT Rourkela, founded in 2020. We are a community of passionate developers, artists, and storytellers creating games across platforms — from Play Store releases to Virtual Reality experiences — using Unity, Unreal, and more.
          </p>
        </div>

        {/* Infographic Panel */}
        <div
          className={cn(
            'mb-16 animate-entry animate-fade-in',
            { 'is-visible': isVisible }
          )}
          style={{ animationDelay: '300ms' }}
        >
          <Card className="bg-card border-accent/30 backdrop-blur-sm box-glow-accent p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border/50">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center pt-6 md:pt-0">
                  {stat.icon}
                  <p className="text-4xl font-bold font-display mt-2 text-primary text-glow-primary tracking-tight">
                    <AnimatedCounter value={parseInt(stat.value, 10)} />
                    {stat.value.endsWith('+') && '+'}
                  </p>
                  <p className="text-muted-foreground mt-1 font-code text-sm tracking-cyber-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {focusAreas.map((area, index) => (
            <div
              key={area.title}
              className={cn(
                "animate-entry animate-slide-up-fade h-full",
                { "is-visible": isVisible }
              )}
              style={{ animationDelay: `${500 + index * 150}ms` }}
            >
              <Card className="bg-card border-primary/20 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:scale-105 hover:box-glow-primary h-full">
                <CardHeader className="items-center">
                  {area.icon}
                  <CardTitle as="h3" className="mt-4 text-2xl font-bold text-center font-headline tracking-wide">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">{area.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
