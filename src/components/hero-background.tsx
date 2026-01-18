'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

interface GridCell {
  x: number;
  y: number;
  active: boolean;
  activationTime: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const gridRef = useRef<GridCell[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGrid();
    };

    // Initialize grid for background pattern
    const initGrid = () => {
      gridRef.current = [];
      const spacing = 60;
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          gridRef.current.push({
            x: i * spacing,
            y: j * spacing,
            active: Math.random() > 0.95,
            activationTime: Date.now() + Math.random() * 5000,
          });
        }
      }
    };

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(80, Math.floor(canvas.width / 20));
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 2.5 + 0.8,
          opacity: Math.random() * 0.6 + 0.4,
          hue: Math.random() * 60 + 160, // Cyan to blue range
        });
      }
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(13, 13, 13, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();

      // Draw grid
      gridRef.current.forEach((cell) => {
        // Random activation
        if (now > cell.activationTime) {
          cell.active = !cell.active;
          cell.activationTime = now + Math.random() * 3000 + 2000;
        }

        // Mouse proximity activation
        const dx = cell.x - mouseRef.current.x;
        const dy = cell.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const mouseActive = distance < 150;

        if (cell.active || mouseActive) {
          const opacity = mouseActive ? Math.max(0.1, 1 - distance / 150) : 0.05;
          
          ctx.beginPath();
          ctx.arc(cell.x, cell.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(280, 80%, 60%, ${opacity})`;
          ctx.fill();

          // Draw connecting lines to nearby active cells
          if (mouseActive) {
            gridRef.current.forEach((other) => {
              if (other === cell) return;
              const dx2 = other.x - cell.x;
              const dy2 = other.y - cell.y;
              const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
              
              if (dist < 100) {
                const odx = other.x - mouseRef.current.x;
                const ody = other.y - mouseRef.current.y;
                const otherDist = Math.sqrt(odx * odx + ody * ody);
                
                if (otherDist < 150) {
                  ctx.beginPath();
                  ctx.moveTo(cell.x, cell.y);
                  ctx.lineTo(other.x, other.y);
                  ctx.strokeStyle = `hsla(180, 100%, 50%, ${0.1 * (1 - dist / 100)})`;
                  ctx.lineWidth = 1;
                  ctx.stroke();
                }
              }
            });
          }
        }
      });

      // Draw and update particles
      particlesRef.current.forEach((particle, index) => {
        // Constant drift for continuous movement
        const baseDriftX = Math.sin(now * 0.0003 + index * 0.1) * 0.15;
        const baseDriftY = Math.cos(now * 0.0003 + index * 0.15) * 0.15;
        
        // Update position with base drift
        particle.x += particle.vx + baseDriftX;
        particle.y += particle.vy + baseDriftY;

        // Wrap around screen
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Mouse interaction - stronger repulsion
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 250) {
          const force = (250 - distance) / 250;
          particle.vx += (dx / distance) * force * 0.02;
          particle.vy += (dy / distance) * force * 0.02;
        }

        // Damping - allow more movement
        particle.vx *= 0.985;
        particle.vy *= 0.985;
        
        // Limit velocity
        const maxVel = 2;
        const vel = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (vel > maxVel) {
          particle.vx = (particle.vx / vel) * maxVel;
          particle.vy = (particle.vy / vel) * maxVel;
        }

        // Draw particle with pulsing effect
        const pulse = Math.sin(now * 0.002 + index * 0.5) * 0.2 + 0.8;
        const particleSize = particle.size * pulse;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${particle.opacity * pulse})`;
        ctx.fill();

        // Draw enhanced glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particleSize * 4
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${particle.opacity * 0.4 * pulse})`);
        gradient.addColorStop(0.5, `hsla(${particle.hue}, 100%, 60%, ${particle.opacity * 0.15 * pulse})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw trailing connections between nearby particles
        particlesRef.current.forEach((other, otherIndex) => {
          if (otherIndex <= index) return;
          const dx2 = other.x - particle.x;
          const dy2 = other.y - particle.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            const lineOpacity = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = `hsla(180, 100%, 50%, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Draw floating code-like elements
      const time = Date.now() * 0.001;
      const symbols = ['<>', '{}', '[]', '//', '::'];
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width * (i + 0.5)) / 5;
        const y = canvas.height / 2 + Math.sin(time + i) * 50;
        const opacity = 0.05 + Math.sin(time * 2 + i) * 0.02;

        ctx.font = '20px monospace';
        ctx.fillStyle = `hsla(280, 80%, 60%, ${opacity})`;
        ctx.fillText(symbols[i] || '', x, y);
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={cn(
          'absolute inset-0 z-0 transition-opacity duration-1000',
          mounted ? 'opacity-100' : 'opacity-0'
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background z-0" />
      
      {/* Accent gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl z-0 animate-pulse" style={{ animationDuration: '6s' }} />
    </>
  );
}
