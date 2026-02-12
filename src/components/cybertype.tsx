
'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const CHAR_POOL = '`¡™£¢∞§¶•ªº–≠⁄€‹›ﬁﬂ‡°·‚—±~@#$%^&*()_+-=[]{}|;:,.<>?/\\';

interface CybertypeProps {
  texts: string[];
  className?: string;
  revealDelay?: number;
  revealSpeed?: number;
  loopDelay?: number;
}

export default function Cybertype({
  texts,
  className,
  revealDelay = 500,
  revealSpeed = 25,
  loopDelay = 2500,
}: CybertypeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);

  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (animationRef.current) clearInterval(animationRef.current);
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);

    const targetText = texts[currentIndex];
    if (!targetText) {
      setIsAnimating(false);
      return;
    }
    setIsAnimating(true);

    // An array to track which character indices have been revealed
    const revealed = new Array(targetText.length).fill(false);
    // An array of indices from 0 to length-1, which we will shuffle
    const shuffleOrder = Array.from(Array(targetText.length).keys());
    // Shuffle the indices using Fisher-Yates algorithm
    for (let i = shuffleOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffleOrder[i]!;
        shuffleOrder[i] = shuffleOrder[j]!;
        shuffleOrder[j] = temp;
    }

    let revealedCount = 0;

    const initialDelay = currentIndex === 0 ? revealDelay : 0;

    const startTimer = setTimeout(() => {
      animationRef.current = setInterval(() => {
        // Reveal one new character per frame in shuffled order
        if (revealedCount < shuffleOrder.length) {
            const indexToReveal = shuffleOrder[revealedCount];
            if (indexToReveal !== undefined) {
              revealed[indexToReveal] = true;
            }
            revealedCount++;
        }

        const nextText = targetText
          .split('')
          .map((char, index) => {
            if (revealed[index]) {
              return targetText[index];
            }
            // For spaces, don't show a random character, just a space. It looks better.
            if (char === ' ') {
                return ' ';
            }
            return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
          })
          .join('');

        setDisplayedText(nextText);

        if (revealedCount >= targetText.length) {
          if (animationRef.current) clearInterval(animationRef.current);
          // Final set to ensure correct text is displayed
          setDisplayedText(targetText);
setIsAnimating(false);

          loopTimeoutRef.current = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }, loopDelay);
        }
      }, revealSpeed);
    }, initialDelay);

    return () => {
      clearTimeout(startTimer);
      if (animationRef.current) clearInterval(animationRef.current);
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    };
  }, [currentIndex, revealDelay, revealSpeed, loopDelay, texts]);

  return (
    <p className={cn('font-code text-xl md:text-2xl text-accent text-glow-accent-strong text-center h-16 flex items-center justify-center tracking-cyber-tight', className)}>
      <span>{displayedText}</span>
      {isAnimating && <span className="terminal-caret-inline"></span>}
    </p>
  );
}
