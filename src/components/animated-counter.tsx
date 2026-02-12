'use client';

import { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const end = value;
          if (end === 0) {
            setCount(end);
            return;
          }
          const steps = 20;
          const duration = 800;
          const increment = end / steps;
          const stepDuration = duration / steps;
          let currentStep = 0;
          let accumulated = 0;

          const timer = setInterval(() => {
            currentStep++;
            accumulated += increment;
            if (currentStep >= steps) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(accumulated));
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
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [value]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}
