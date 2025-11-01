
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Typewriter from '@/components/typewriter';
import { useAnimation } from '@/context/animation-context';

const sequence = [
  { id: 1, text: '[Log] Kernel.Boot: Initializing...', duration: 250 },
  { id: 2, text: '[Log] RenderPipeline: Booting...\n[Log] RenderPipeline: Pre-caching asset Cityscape_Geo...', duration: 500 },
  { id: 3, text: '[Compiler] Compiling Header.GameObject... Success.', duration: 375 },
  { id: 4, text: '[Coroutine] Starting <HeroSubtitle_Cybertype>...', duration: 375 },
  { id: 5, text: '[UI] Instantiating Button_Prefab(3)...', duration: 500 },
  { id: 6, text: '[Kernel] Boot sequence complete. Handing control to user.', duration: 250 },
];

export default function HackerOverlay() {
  const { setSequenceState, setSequenceComplete, sequenceComplete } = useAnimation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Immediately update the context with the current step.
    setSequenceState(currentStep);

    if (currentStep >= sequence.length) {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setSequenceComplete(true);
      }, 1000); // Match fade-out duration
      return () => clearTimeout(timer);
    }

    const currentItem = sequence[currentStep];
    if (!currentItem) return; // Guard clause to ensure currentItem is defined

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, currentItem.duration);

    return () => clearTimeout(timer);
  }, [currentStep, setSequenceState, setSequenceComplete]);
  
  const displayedLines = sequence.slice(0, currentStep);
  const staticTextForGlitch = displayedLines.map(line => line.text).join('\n');

  if (sequenceComplete) return null;

  return (
    <div className={cn('hacker-overlay', { 'is-fading-out': isFadingOut })}>
      <div className="p-8 text-lg text-accent text-left">
        <div className="hacker-overlay-content" data-text={staticTextForGlitch}>
          <div className="whitespace-pre-wrap">
            {staticTextForGlitch}
          </div>
          {currentStep < sequence.length && sequence[currentStep] && (
            <div className="whitespace-pre-wrap">
                <Typewriter text={sequence[currentStep]!.text} speed={25} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
