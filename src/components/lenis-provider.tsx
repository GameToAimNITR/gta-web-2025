'use client'
import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

function LenisProvider({ children }: { children: ReactNode }) {
  const [isLowEnd, setIsLowEnd] = useState(false)

  useEffect(() => {
    // Detect low-end devices
    const checkPerformance = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      const cores = navigator.hardwareConcurrency || 2
      const memory = (navigator as any).deviceMemory || 4
      
      // Disable smooth scrolling on low-end devices
      if (isMobile && (cores <= 4 || memory <= 4)) {
        setIsLowEnd(true)
      }
    }
    
    checkPerformance()
  }, [])

  // Don't use smooth scrolling on low-end devices
  if (isLowEnd) {
    return <>{children as any}</>
  }

  const options = {
    lerp: 0.08, // Slightly reduced for better performance
    duration: 1.0, // Reduced duration
    smoothTouch: false, // Disable on touch for better performance
  }

  return (
    <ReactLenis root options={options}>
      {children as any}
    </ReactLenis>
  )
}

export default LenisProvider
