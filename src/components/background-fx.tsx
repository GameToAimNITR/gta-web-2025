
'use client';

import { Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useGLTF, shaderMaterial } from '@react-three/drei';
import type { Group, Mesh } from 'three';
import { Color, MathUtils } from 'three';

// Define the custom Fresnel shader material with an added opacity uniform
const FresnelMaterial = shaderMaterial(
  // Uniforms
  {
    uRimColor: new Color('#00FFFF'), // Cyan rim light
    uBaseColor: new Color('#1A0033'), // Dark purple/blue base
    uRimStrength: 2.5,
    uRimPower: 3.0,
    uOpacity: 1.0, // Start visible
  },
  // Vertex Shader
  `
    varying vec3 vNormal;
    varying vec3 vViewDirection;

    void main() {
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      vViewDirection = normalize(-modelViewPosition.xyz);
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewPosition;
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uRimColor;
    uniform vec3 uBaseColor;
    uniform float uRimStrength;
    uniform float uRimPower;
    uniform float uOpacity; // New opacity uniform

    varying vec3 vNormal;
    varying vec3 vViewDirection;

    void main() {
      float fresnel = 1.0 - dot(vNormal, vViewDirection);
      fresnel = pow(fresnel, uRimPower);

      vec3 finalColor = uBaseColor + (fresnel * uRimStrength * uRimColor);
      float alpha = 0.1 + fresnel * 0.9;
      
      gl_FragColor = vec4(finalColor, alpha * uOpacity); // Apply overall opacity
    }
  `
);

// Make the custom material available to JSX
extend({ FresnelMaterial });

// Model component that animates based on scroll
function VrHeadset() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF('/models/vrheadset.glb');

  const fresnelMaterial = useMemo(() => new (FresnelMaterial as any)({ transparent: true }), []);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        (child as Mesh).material = fresnelMaterial;
      }
    });
  }, [scene, fresnelMaterial]);

  useFrame((state, delta) => {
    if (groupRef.current && delta < 0.1) {
      // Throttle scroll updates - only update every 3rd frame
      if (state.clock.elapsedTime % 0.05 < delta) {
        const scrollY = window.scrollY || 0;
        
        const scrollHeight = document.body.scrollHeight - window.innerHeight;
        if (scrollHeight > 0) {
          const scrollProgress = scrollY / scrollHeight;
          
          const targetRotationX = scrollProgress * (Math.PI / 2);
          const targetRotationY = Math.sin(scrollProgress * Math.PI) * 1.75;
          const targetRotationZ = Math.sin(scrollProgress * Math.PI * 2) * 0.25;
          
          groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.1);
          groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1);
          groupRef.current.rotation.z = MathUtils.lerp(groupRef.current.rotation.z, targetRotationZ, 0.1);
        }
      }
      
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={0.8} position={[0, -0.8, 0]} />
    </group>
  );
}

export default function BackgroundFX() {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100vh', 
        zIndex: 0,
        maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        pointerEvents: 'none'
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: false,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <VrHeadset />
        </Suspense>
      </Canvas>
    </div>
  );
}
