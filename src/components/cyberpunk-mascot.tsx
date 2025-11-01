
'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import { cn } from '@/lib/utils';
import type { Group, Mesh, PointLight } from 'three';

const sectionMessages: Record<string, string> = {
  about: 'Scanning core identity... We are creators, innovators, and dreamers, pushing the boundaries of interactive entertainment.',
  games: 'Accessing game archives... These are the worlds we have built. Each one a testament to our passion.',
  achievements: 'Compiling Hall of Fame... Celebrating the milestones and legendary feats of our members.',
  contact: 'Establishing secure connection... Ready to interface. Send us your transmission.',
};

// Define positions for each section the mascot will travel to
const sectionPositions: Record<string, React.CSSProperties> = {
  about: { top: '50vh', left: 'calc(100vw - 12rem - 4vw)', transform: 'translateY(-50%)' },
  games: { top: '12rem', left: '4vw' },
  achievements: { top: 'calc(100vh - 20rem)', left: '5vw' },
  contact: { top: '15rem', left: 'calc(100vw - 12rem - 6vw)' },
};

// Initial position (off-screen/invisible) and default visible position
const initialPosition: React.CSSProperties = { top: 'calc(100vh - 13rem)', left: 'calc(100vw - 13rem)', opacity: 0 };
const defaultPosition: React.CSSProperties = { top: 'calc(100vh - 13rem)', left: 'calc(100vw - 13rem)', opacity: 1 };

function MascotModel() {
  const groupRef = useRef<Group>(null!);
  const leftEyeRef = useRef<Mesh>(null!);
  const rightEyeRef = useRef<Mesh>(null!);
  const leftLightRef = useRef<PointLight>(null!);
  const rightLightRef = useRef<PointLight>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle bobbing motion
      groupRef.current.position.y = Math.sin(time * 2) * 0.05;
      // New glancing and nodding animation instead of constant rotation
      groupRef.current.rotation.y = Math.sin(time * 0.7) * 0.4;
      groupRef.current.rotation.x = Math.cos(time) * 0.15;
    }
    
    // Animate eyes and lights
    if (leftEyeRef.current && rightEyeRef.current && leftLightRef.current && rightLightRef.current) {
        // Pulsating glow effect for both eyes
        const pulse = (Math.sin(time * 5) + 1) / 2; // value from 0 to 1
        const emissiveIntensity = pulse * 10 + 5; // emissive from 5 to 15
        const lightIntensity = pulse * 40 + 20; // light from 20 to 60

        (leftEyeRef.current.material as any).emissiveIntensity = emissiveIntensity;
        (rightEyeRef.current.material as any).emissiveIntensity = emissiveIntensity;
        leftLightRef.current.intensity = lightIntensity;
        rightLightRef.current.intensity = lightIntensity;
        
        // Occasional blink
        const blink = Math.sin(time * 2.5) > 0.98;
        const scaleY = blink ? 0.1 : 1;
        const scaleX = blink ? 1.1 : 1;
        
        // Smooth transition for blinking
        // We scale on z because the cylinder is rotated 90deg on x to face forward
        leftEyeRef.current.scale.z += (scaleY - leftEyeRef.current.scale.z) * 0.3;
        rightEyeRef.current.scale.z += (scaleY - rightEyeRef.current.scale.z) * 0.3;
        leftEyeRef.current.scale.x += (scaleX - leftEyeRef.current.scale.x) * 0.3;
        rightEyeRef.current.scale.x += (scaleX - rightEyeRef.current.scale.x) * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
        {/* Head */}
        <Box args={[1, 1, 1]} castShadow receiveShadow>
            <meshStandardMaterial 
                color="#FFFFFF" 
                metalness={0.8}
                roughness={0.2}
            />
        </Box>

        {/* Left Glowing Eye */}
        <mesh ref={leftEyeRef} position={[-0.25, 0.1, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
            <Cylinder args={[0.15, 0.15, 0.05, 16]}>
                <meshStandardMaterial
                    color="#BE29EC"
                    emissive="#BE29EC"
                    emissiveIntensity={15}
                />
            </Cylinder>
            <pointLight ref={leftLightRef} color="#BE29EC" intensity={60} distance={2} decay={2} />
        </mesh>

        {/* Right Glowing Eye */}
        <mesh ref={rightEyeRef} position={[0.25, 0.1, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
            <Cylinder args={[0.15, 0.15, 0.05, 16]}>
                <meshStandardMaterial
                    color="#BE29EC"
                    emissive="#BE29EC"
                    emissiveIntensity={15}
                />
            </Cylinder>
            <pointLight ref={rightLightRef} color="#BE29EC" intensity={60} distance={2} decay={2} />
        </mesh>

        {/* Antennae */}
        <mesh position={[-0.3, 0.65, 0]} rotation={[0, 0, 0.2]} castShadow>
            <Cylinder args={[0.02, 0.02, 0.3, 8]}>
                <meshStandardMaterial color="#00FFFF" metalness={0.5} roughness={0.5} />
            </Cylinder>
        </mesh>
         <mesh position={[0.3, 0.65, 0]} rotation={[0, 0, -0.2]} castShadow>
            <Cylinder args={[0.02, 0.02, 0.3, 8]}>
                <meshStandardMaterial color="#00FFFF" metalness={0.5} roughness={0.5} />
            </Cylinder>
        </mesh>

        {/* Side Details */}
        <Box args={[0.1, 0.4, 0.1]} position={[-0.6, 0, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#999999" metalness={0.8} roughness={0.2} />
        </Box>
        <Box args={[0.1, 0.4, 0.1]} position={[0.6, 0, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#999999" metalness={0.8} roughness={0.2} />
        </Box>
    </group>
  );
}


export default function CyberpunkMascot({ sectionIds }: { sectionIds: string[] }) {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  const [position, setPosition] = useState<React.CSSProperties>(initialPosition);

  const currentTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastShownSection = useRef<string | null>(null);
  const intersectingSections = useRef(new Set<string>());
  
  useEffect(() => {
    // Animate the mascot into view when the component mounts
    const entryTimer = setTimeout(() => {
        setPosition(defaultPosition);
    }, 300);

    const showMessage = (text: string, newPosition: React.CSSProperties) => {
      if (currentTimeout.current) {
        clearTimeout(currentTimeout.current);
      }
      setPosition(newPosition); // Move to the new section's position
      setMessage(text);
      setTypedMessage('');
      setIsVisible(true);
      setIsTyping(true);
    };

    const hideMascot = () => {
      setIsVisible(false);
      setPosition(defaultPosition);
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          intersectingSections.current.add(entry.target.id);
        } else {
          intersectingSections.current.delete(entry.target.id);
        }
      });
      
      const lastIntersectingId = [...sectionIds].reverse().find(id => intersectingSections.current.has(id));

      if (lastIntersectingId) {
        if (sectionMessages[lastIntersectingId] && lastShownSection.current !== lastIntersectingId) {
          lastShownSection.current = lastIntersectingId;
          showMessage(sectionMessages[lastIntersectingId], { ...sectionPositions[lastIntersectingId], opacity: 1 });
          
          // Debounce to prevent rapid firing for the same section
          setTimeout(() => {
            if (lastShownSection.current === lastIntersectingId) {
              lastShownSection.current = null;
            }
          }, 5000);
        }
      } else if (intersectingSections.current.size === 0) {
        // No relevant sections are intersecting, so hide the mascot and reset its position
        hideMascot();
        lastShownSection.current = null;
      }
    };
    
    // Defer observer setup to client-side only
    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-50% 0px -50% 0px', // Triggers when section is in the middle of the viewport
      threshold: 0,
    });

    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    sections.forEach(sec => observer.observe(sec!));

    return () => {
      clearTimeout(entryTimer);
      if (currentTimeout.current) {
        clearTimeout(currentTimeout.current);
      }
      // Cleanup observer
      sections.forEach(sec => {
        if (sec) {
            observer.unobserve(sec);
        }
      });
      observer.disconnect();
    };
  }, [sectionIds]);

  useEffect(() => {
    if (isTyping) {
      if (typedMessage.length < message.length) {
        const timeout = setTimeout(() => {
          setTypedMessage(message.slice(0, typedMessage.length + 1));
        }, 20);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        currentTimeout.current = setTimeout(() => {
          setIsVisible(false);
        }, 5000); // Hide message after a delay
      }
    }
  }, [isTyping, message, typedMessage]);

  return (
    <div
      className="fixed w-48 h-48 z-50 pointer-events-none transition-all duration-1000 ease-in-out"
      style={position}
    >
      <Canvas shadows camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.8} />
        {/* A distant fill light to cast shadows */}
        <directionalLight 
          castShadow 
          position={[5, 10, 7]} 
          intensity={1.5}
          color={"#000FFF"}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* A soft fill light from the other side */}
        <pointLight position={[10, 10, 10]} intensity={5.5} color="#FF0000" />
        <pointLight position={[-10, -10, -10]} intensity={5.5} color="#00FFFF" />
        <Suspense fallback={null}>
          <MascotModel />
        </Suspense>
      </Canvas>
      <div className={cn(
        "absolute bottom-full mb-4 w-64 p-4 rounded-lg bg-card backdrop-blur-sm border border-primary/50 text-sm text-primary-foreground transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        <p>
          {typedMessage}
          {isTyping && <span className="terminal-caret-inline"></span>}
        </p>
      </div>
    </div>
  );
}
