
'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function CursorFX() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isShooting, setIsShooting] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const lastPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check for touch device on mount to disable the cursor
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      
      // Throttle updates using requestAnimationFrame
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setPosition(lastPosRef.current);
          rafRef.current = undefined;
        });
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

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
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

  if (isTouchDevice) {
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
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
}

    