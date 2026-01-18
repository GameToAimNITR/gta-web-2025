'use client';

import { useEffect, useState } from 'react';

export function usePerformance() {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const checkPerformance = () => {
      // Check hardware capabilities
      const cores = navigator.hardwareConcurrency || 2;
      const memory = (navigator as any).deviceMemory || 4;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      // Consider device low-end if:
      // - Mobile with <= 4 cores or <= 4GB RAM
      // - Desktop with <= 2 cores
      const lowEnd =
        (isMobile && (cores <= 4 || memory <= 4)) ||
        (!isMobile && cores <= 2);

      setIsLowEnd(lowEnd);
    };

    checkPerformance();
  }, []);

  return { isLowEnd };
}
