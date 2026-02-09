'use client';

import { useEffect, useRef, useState, memo } from 'react';
import { cn } from '@/lib/utils';
import { usePowerPerformance } from '@/hooks/use-power-performance';

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

// Spatial hash for O(1) neighbor lookups instead of O(n²)
class SpatialHash {
  private cellSize: number;
  private grid: Map<string, number[]>;

  constructor(cellSize: number) {
    this.cellSize = cellSize;
    this.grid = new Map();
  }

  private key(x: number, y: number): string {
    return `${Math.floor(x / this.cellSize)},${Math.floor(y / this.cellSize)}`;
  }

  clear() {
    this.grid.clear();
  }

  insert(index: number, x: number, y: number) {
    const k = this.key(x, y);
    const list = this.grid.get(k);
    if (list) {
      list.push(index);
    } else {
      this.grid.set(k, [index]);
    }
  }

  query(x: number, y: number, radius: number): number[] {
    const results: number[] = [];
    const minCX = Math.floor((x - radius) / this.cellSize);
    const maxCX = Math.floor((x + radius) / this.cellSize);
    const minCY = Math.floor((y - radius) / this.cellSize);
    const maxCY = Math.floor((y + radius) / this.cellSize);

    for (let cx = minCX; cx <= maxCX; cx++) {
      for (let cy = minCY; cy <= maxCY; cy++) {
        const list = this.grid.get(`${cx},${cy}`);
        if (list) {
          for (const idx of list) results.push(idx);
        }
      }
    }
    return results;
  }
}

function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const gridRef = useRef<GridCell[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | undefined>(undefined);
  const lastFrameTimeRef = useRef(0);
  const spatialHashRef = useRef(new SpatialHash(130));
  const perf = usePowerPerformance();
  const perfRef = useRef(perf);
  perfRef.current = perf;

  useEffect(() => {
    setMounted(true);
    if (!perfRef.current.enableParticles) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // On mobile, cap to 30fps max even on high tier to save battery
    const rawFPS = perfRef.current.targetFPS;
    const targetFPS = isMobileDevice ? Math.min(rawFPS, 30) : rawFPS;
    const frameInterval = targetFPS > 0 ? 1000 / targetFPS : 16;
    const particleMul = perfRef.current.particleMultiplier;

    // Set canvas size — use visualViewport for accurate mobile dimensions
    // (avoids 100vh including the URL bar which causes canvas to be larger than visible area)
    const getViewportSize = () => {
      const vv = window.visualViewport;
      return {
        w: vv ? vv.width : window.innerWidth,
        h: vv ? vv.height : window.innerHeight,
      };
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, perfRef.current.maxDPR);
      const { w, h } = getViewportSize();
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      initGrid();
    };

    // Initialize grid for background pattern
    const initGrid = () => {
      gridRef.current = [];
      const spacing = perfRef.current.tier === 'medium' ? 80 : 60;
      const { w, h } = getViewportSize();
      const cols = Math.ceil(w / spacing);
      const rows = Math.ceil(h / spacing);

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

    // Initialize particles — count scaled by power tier
    const initParticles = () => {
      particlesRef.current = [];
      const { w, h } = getViewportSize();
      const baseCount = Math.min(80, Math.floor(w / 20));
      const particleCount = Math.max(8, Math.floor(baseCount * particleMul));

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 2.5 + 0.8,
          opacity: Math.random() * 0.6 + 0.4,
          hue: Math.random() * 60 + 160,
        });
      }
    };

    // Mouse/touch move handler — only store, no work done here
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      // Move "mouse" off-screen so touch effects disappear
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    // Skip glow gradients on medium tier for perf
    const drawGlow = perfRef.current.tier === 'high';
    const connectionRadius = 120;
    const mouseRadius = 150;
    const mouseRadiusSq = mouseRadius * mouseRadius;

    // Animation loop with frame budget
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      frameRef.current = requestAnimationFrame(animate);

      // Frame rate limiting
      const elapsed = timestamp - lastFrameTimeRef.current;
      if (elapsed < frameInterval) return;
      lastFrameTimeRef.current = timestamp - (elapsed % frameInterval);

      // Bail if page hidden
      if (!perfRef.current.isPageVisible) return;

      const { w, h } = getViewportSize();

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(13, 13, 13, 0.1)';
      ctx.fillRect(0, 0, w, h);

      const now = timestamp;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles = particlesRef.current;
      const grid = gridRef.current;

      // — Draw grid (batch paths) —
      ctx.fillStyle = 'hsla(280, 80%, 60%, 0.05)';
      ctx.beginPath();
      const activeCellsNearMouse: GridCell[] = [];

      for (let i = 0, len = grid.length; i < len; i++) {
        const cell = grid[i]!;
        if (now > cell.activationTime) {
          cell.active = !cell.active;
          cell.activationTime = now + Math.random() * 3000 + 2000;
        }

        const dx = cell.x - mx;
        const dy = cell.y - my;
        const distSq = dx * dx + dy * dy;
        const mouseActive = distSq < mouseRadiusSq;

        if (mouseActive) {
          activeCellsNearMouse.push(cell);
          const dist = Math.sqrt(distSq);
          const opacity = Math.max(0.1, 1 - dist / mouseRadius);
          // Draw mouse-activated cells individually for varied opacity
          ctx.fill(); // flush batch
          ctx.beginPath();
          ctx.arc(cell.x, cell.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(280, 80%, 60%, ${opacity})`;
          ctx.fill();
          ctx.fillStyle = 'hsla(280, 80%, 60%, 0.05)';
          ctx.beginPath();
        } else if (cell.active) {
          ctx.moveTo(cell.x + 2, cell.y);
          ctx.arc(cell.x, cell.y, 2, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // Draw grid connection lines near mouse (limited set, not O(n²))
      if (activeCellsNearMouse.length > 0 && activeCellsNearMouse.length < 30) {
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < activeCellsNearMouse.length; i++) {
          const cellA = activeCellsNearMouse[i]!;
          for (let j = i + 1; j < activeCellsNearMouse.length; j++) {
            const cellB = activeCellsNearMouse[j]!;
            const dx2 = cellB.x - cellA.x;
            const dy2 = cellB.y - cellA.y;
            const distSq2 = dx2 * dx2 + dy2 * dy2;
            if (distSq2 < 10000) { // 100²
              ctx.moveTo(cellA.x, cellA.y);
              ctx.lineTo(cellB.x, cellB.y);
            }
          }
        }
        ctx.strokeStyle = 'hsla(180, 100%, 50%, 0.08)';
        ctx.stroke();
      }

      // — Build spatial hash for particles —
      const hash = spatialHashRef.current;
      hash.clear();
      for (let i = 0; i < particles.length; i++) {
        hash.insert(i, particles[i]!.x, particles[i]!.y);
      }

      // — Update & draw particles —
      // Batch the connection lines
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'hsla(180, 100%, 50%, 0.1)';
      ctx.beginPath();
      let hasLines = false;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]!;

        // Drift
        const baseDriftX = Math.sin(now * 0.0003 + i * 0.1) * 0.15;
        const baseDriftY = Math.cos(now * 0.0003 + i * 0.15) * 0.15;
        particle.x += particle.vx + baseDriftX;
        particle.y += particle.vy + baseDriftY;

        // Wrap
        if (particle.x < -10) particle.x = w + 10;
        else if (particle.x > w + 10) particle.x = -10;
        if (particle.y < -10) particle.y = h + 10;
        else if (particle.y > h + 10) particle.y = -10;

        // Mouse repulsion
        const dx = particle.x - mx;
        const dy = particle.y - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < 62500 && distSq > 0) { // 250²
          const dist = Math.sqrt(distSq);
          const force = (250 - dist) / 250;
          particle.vx += (dx / dist) * force * 0.02;
          particle.vy += (dy / dist) * force * 0.02;
        }

        // Damping + velocity cap
        particle.vx *= 0.985;
        particle.vy *= 0.985;
        const velSq = particle.vx * particle.vx + particle.vy * particle.vy;
        if (velSq > 4) { // 2²
          const s = 2 / Math.sqrt(velSq);
          particle.vx *= s;
          particle.vy *= s;
        }

        // Draw particle
        const pulse = Math.sin(now * 0.002 + i * 0.5) * 0.2 + 0.8;
        const particleSize = particle.size * pulse;
        const alpha = particle.opacity * pulse;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${alpha})`;
        ctx.fill();

        // Draw glow only on high tier (skip gradient creation on battery)
        if (drawGlow) {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particleSize * 4
          );
          gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${alpha * 0.4})`);
          gradient.addColorStop(0.5, `hsla(${particle.hue}, 100%, 60%, ${alpha * 0.15})`);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particleSize * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Connection lines via spatial hash — O(neighbors) instead of O(n²)
        const neighbors = hash.query(particle.x, particle.y, connectionRadius);
        for (const ni of neighbors) {
          if (ni <= i) continue;
          const other = particles[ni]!;
          const ddx = other.x - particle.x;
          const ddy = other.y - particle.y;
          const dSq = ddx * ddx + ddy * ddy;
          if (dSq < connectionRadius * connectionRadius) {
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            hasLines = true;
          }
        }
      }
      if (hasLines) ctx.stroke();

      // Draw floating code-like elements (cheap — keep as-is but throttle)
      const time = now * 0.001;
      const symbols = ['<>', '{}', '[]', '//', '::'];
      ctx.font = '20px monospace';
      for (let i = 0; i < 5; i++) {
        const x = (w * (i + 0.5)) / 5;
        const y = h / 2 + Math.sin(time + i) * 50;
        const opacity = 0.05 + Math.sin(time * 2 + i) * 0.02;
        ctx.fillStyle = `hsla(280, 80%, 60%, ${opacity})`;
        ctx.fillText(symbols[i]!, x, y);
      }
    };

    resizeCanvas();
    initParticles();

    // Debounce resize
    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvas();
        initParticles();
      }, 200);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(resizeTimer);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [perf.enableParticles, perf.tier]);

  // If particles disabled, render a visible CSS-only fallback
  if (!perf.enableParticles) {
    return (
      <>
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Radial gradient backdrop for color depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background/40 to-background" />
          {/* Visible accent glow blobs */}
          <div className="absolute top-[10%] left-[15%] w-72 h-72 sm:w-96 sm:h-96 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute bottom-[15%] right-[10%] w-72 h-72 sm:w-96 sm:h-96 bg-accent/15 rounded-full blur-3xl" />
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-64 h-64 bg-accent/10 rounded-full blur-2xl" />
        </div>
      </>
    );
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className={cn(
          'absolute inset-0 z-0 transition-opacity duration-1000 pointer-events-none',
          mounted ? 'opacity-100' : 'opacity-0'
        )}
        style={{ willChange: 'contents' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background z-0 pointer-events-none" />

      {/* Accent gradients — static on medium/low tier, animated on high */}
      <div
        className={cn(
          'absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0 pointer-events-none',
          perf.tier === 'high' && 'animate-pulse'
        )}
        style={perf.tier === 'high' ? { animationDuration: '4s' } : undefined}
      />
      <div
        className={cn(
          'absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl z-0 pointer-events-none',
          perf.tier === 'high' && 'animate-pulse'
        )}
        style={perf.tier === 'high' ? { animationDuration: '6s' } : undefined}
      />
    </>
  );
}

export default memo(HeroBackground);
