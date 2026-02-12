
'use client';

import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';
import type { Member } from '@/lib/members/types';

interface MemberCardProps {
  member: Member;
  index: number;
}

export default function MemberCard({ member, index }: MemberCardProps) {
  const getVariantStyles = () => {
    const colorCycle = index % 3;
    switch (colorCycle) {
      case 0: return { '--glow-color': 'hsl(var(--accent))' } as React.CSSProperties;
      case 1: return { '--glow-color': 'hsl(var(--primary))' } as React.CSSProperties;
      case 2: return { '--glow-color': '#00ff00' } as React.CSSProperties;
      default: return { '--glow-color': 'hsl(var(--accent))' } as React.CSSProperties;
    }
  };
  const colorStyle = getVariantStyles();

  return (
    <div className="group/card w-full h-full" style={colorStyle}>
      <div className="cyber-card-container animate-cyber-glow-flicker h-full">
        <div className="cyber-card-content cyber-card-shimmer p-4 flex flex-col gap-4 h-full">
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--glow-color)] animate-spin-slow" />
              <div className="absolute inset-1 rounded-full border border-[var(--glow-color)]/50" />
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="96px"
                loading="lazy"
                quality={85}
                className="object-cover rounded-full p-2"
                data-ai-hint={member.aiHint}
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-headline font-bold tracking-wide text-foreground transition-colors group-hover/card:text-[var(--glow-color)]">{member.name}</h3>
              <p className="font-code text-sm font-semibold tracking-cyber-wide text-[var(--glow-color)]">{member.role}</p>
            </div>
          </div>

          <div className="text-center bg-card/50 p-3 rounded-md border border-border">
            <p className="text-sm uppercase tracking-widest text-muted-foreground font-code">Avatar Name</p>
            <p className="font-headline font-semibold text-lg text-foreground mt-1">{`"${member.specialAbility}"`}</p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed text-justify flex-grow">
            {member.bio}
          </p>

          <div className="flex justify-center items-center gap-6 pt-4 border-t border-border">
            {member.githubUrl && (
              <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[var(--glow-color)] transition-colors">
                <Github className="w-6 h-6" />
              </a>
            )}
            {member.linkedinUrl && (
              <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[var(--glow-color)] transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
