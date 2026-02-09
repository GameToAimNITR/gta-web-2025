'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

export type PerformanceTier = 'high' | 'medium' | 'low';

export interface PowerPerformanceState {
  /** Overall performance tier based on hardware + power state */
  tier: PerformanceTier;
  /** True when running on battery (not charging) */
  isOnBattery: boolean;
  /** Battery level 0-1, null if unavailable */
  batteryLevel: number | null;
  /** True if user prefers reduced motion */
  prefersReducedMotion: boolean;
  /** True if tab/page is currently visible */
  isPageVisible: boolean;
  /** True on low-end hardware regardless of power */
  isLowEndHardware: boolean;
  /** Recommended target FPS for canvas animations */
  targetFPS: number;
  /** Recommended particle count multiplier (0-1) */
  particleMultiplier: number;
  /** Whether to enable 3D/WebGL rendering */
  enable3D: boolean;
  /** Whether to enable canvas particle effects */
  enableParticles: boolean;
  /** Whether to enable the custom cursor */
  enableCursor: boolean;
  /** Whether to enable smooth scrolling */
  enableSmoothScroll: boolean;
  /** DPR cap for canvas rendering */
  maxDPR: number;
}

// Singleton store to avoid multiple Battery API subscriptions
let cachedState: PowerPerformanceState | null = null;
let listeners: Set<() => void> = new Set();
let initialized = false;

function getDefaultState(): PowerPerformanceState {
  return {
    tier: 'high',
    isOnBattery: false,
    batteryLevel: null,
    prefersReducedMotion: false,
    isPageVisible: true,
    isLowEndHardware: false,
    targetFPS: 60,
    particleMultiplier: 1,
    enable3D: true,
    enableParticles: true,
    enableCursor: true,
    enableSmoothScroll: true,
    maxDPR: 2,
  };
}

function computeState(overrides: Partial<PowerPerformanceState> = {}): PowerPerformanceState {
  const base = cachedState || getDefaultState();
  const merged = { ...base, ...overrides };

  // Compute derived values based on combined signals
  const { isOnBattery, batteryLevel, prefersReducedMotion, isLowEndHardware, isPageVisible } = merged;

  // Determine tier
  let tier: PerformanceTier = 'high';
  if (prefersReducedMotion || isLowEndHardware) {
    tier = 'low';
  } else if (isOnBattery) {
    tier = batteryLevel !== null && batteryLevel < 0.2 ? 'low' : 'medium';
  }

  // Compute recommendations based on tier + visibility
  const visible = isPageVisible;
  const isMobileDevice = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return {
    ...merged,
    tier,
    targetFPS: !visible ? 0 : tier === 'low' ? 15 : tier === 'medium' ? 30 : 60,
    // On mobile medium tier, still show particles but fewer
    particleMultiplier: !visible ? 0 : tier === 'low' ? 0.25 : tier === 'medium' ? 0.4 : 1,
    // On mobile, skip 3D only for low-tier devices; medium/high mobile
    // devices can handle the lightweight Fresnel shader model
    enable3D: visible && tier !== 'low',
    enableParticles: visible && (tier !== 'low' || isMobileDevice),
    enableCursor: tier !== 'low' && !isMobileDevice,
    enableSmoothScroll: tier === 'high',
    maxDPR: tier === 'low' ? 1 : tier === 'medium' ? 1 : 1.5,
  };
}

function emitChange() {
  listeners.forEach((l) => l());
}

function updateState(overrides: Partial<PowerPerformanceState>) {
  cachedState = computeState(overrides);
  emitChange();
}

function initStore() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  cachedState = getDefaultState();

  // 1. Hardware detection (once)
  const cores = navigator.hardwareConcurrency || 2;
  const memory = (navigator as any).deviceMemory || 4;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  // Relaxed thresholds: most modern phones have 4+ cores and Chrome caps
  // deviceMemory at 4GB. Only flag truly low-end devices.
  const isLowEndHardware =
    (isMobile && cores <= 2 && memory <= 2) ||
    (!isMobile && (cores <= 2 || memory <= 2));

  // 2. prefers-reduced-motion
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = motionQuery.matches;
  motionQuery.addEventListener('change', (e) => {
    updateState({ prefersReducedMotion: e.matches });
  });

  // 3. Page Visibility
  const isPageVisible = document.visibilityState === 'visible';
  document.addEventListener('visibilitychange', () => {
    updateState({ isPageVisible: document.visibilityState === 'visible' });
  });

  // Apply initial non-battery state
  updateState({ isLowEndHardware, prefersReducedMotion, isPageVisible });

  // 4. Battery API (async)
  if ('getBattery' in navigator) {
    (navigator as any).getBattery().then((battery: any) => {
      const update = () => {
        updateState({
          isOnBattery: !battery.charging,
          batteryLevel: battery.level,
        });
      };
      battery.addEventListener('chargingchange', update);
      battery.addEventListener('levelchange', update);
      update();
    }).catch(() => {
      // Battery API not available, assume plugged in
    });
  }
}

function subscribe(listener: () => void) {
  initStore();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): PowerPerformanceState {
  if (!cachedState) {
    cachedState = getDefaultState();
  }
  return cachedState;
}

// Must be a stable reference — creating a new object each call causes an infinite loop
const serverSnapshot = getDefaultState();
function getServerSnapshot(): PowerPerformanceState {
  return serverSnapshot;
}

/**
 * Power-aware performance hook. Uses Battery API, hardware detection,
 * prefers-reduced-motion, and Page Visibility API to determine the
 * optimal rendering tier and provide concrete recommendations.
 *
 * Singleton store — multiple consumers share a single subscription.
 */
export function usePowerPerformance(): PowerPerformanceState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
