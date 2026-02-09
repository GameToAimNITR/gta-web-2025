
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { usePowerPerformance } from '@/hooks/use-power-performance';

export default function CursorFX() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isShooting, setIsShooting] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const { enableCursor } = usePowerPerformance();

  useEffect(() => {
    // Check for touch device on mount to disable the cursor
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch) {
      setIsTouchDevice(true);
      return;
    }

    // Use direct DOM transform instead of React state to avoid re-renders
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, .flip-card-container, .game-card-clickable, .event-card-clickable, input, textarea, select, .bio-id-scanner')) {
        setIsPointer(true);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest('a, button, .flip-card-container, .game-card-clickable, .event-card-clickable, input, textarea, select, .bio-id-scanner')) {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    const handleMouseDown = () => {
      setIsClicked(true);
      setIsShooting(true);
    };
    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleAnimationEnd = () => {
      setIsShooting(false);
    };

    const el = cursorRef.current;
    if (el) {
      el.addEventListener('animationend', handleAnimationEnd);
    }

    // passive: true avoids blocking the main thread
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (el) {
        el.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, []);

  if (isTouchDevice || !enableCursor) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={cn(
        'custom-cursor', 
        { 
          'is-pointer': isPointer, 
          'is-hidden': isHidden,
          'is-clicked': isClicked,
          'is-shooting': isShooting
        }
      )}
      style={{ left: '-100px', top: '-100px', willChange: 'left, top' }}
    />
  );
}

    