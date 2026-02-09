'use client'
import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'
import { usePowerPerformance } from '@/hooks/use-power-performance'

function LenisProvider({ children }: { children: ReactNode }) {
  const { enableSmoothScroll } = usePowerPerformance()

  // Disable smooth scrolling on low-end devices and when on battery
  if (!enableSmoothScroll) {
    return <>{children as any}</>
  }

  const options = {
    lerp: 0.08,
    duration: 1.0,
    smoothTouch: false,
  }

  return (
    <ReactLenis root options={options}>
      {children as any}
    </ReactLenis>
  )
}

export default LenisProvider
