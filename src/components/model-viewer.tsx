
'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import type { ModelInfo } from '@/lib/modelInfo';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Skeleton } from './ui/skeleton';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { Vector3 } from 'three';


function FallbackModel({ model }: { model: ModelInfo }) {
  if (!model?.fallback) return null;

  const getGeometry = () => {
    switch (model.fallback.geometry) {
      case 'box':
        return <boxGeometry args={[2, 2, 2]} />;
      case 'sphere':
        return <sphereGeometry args={[1.5, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[1.2, 0.4, 16, 100]} />;
      default:
        return <boxGeometry />;
    }
  };

  return (
    <mesh>
      {getGeometry()}
      <meshStandardMaterial
        color={model.fallback.color}
        metalness={0.6}
        roughness={0.2}
        emissive={model.fallback.color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function LoadedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

// Helper component to contain the useFrame hook
function SceneUpdater({
  controlsRef,
  setZoom,
  isInteracting,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  setZoom: (zoom: number) => void;
  isInteracting: boolean;
}) {
  useFrame(() => {
    if (controlsRef.current) {
      if (!isInteracting) {
        const currentZoom = controlsRef.current.getDistance();
        // Normalize zoom to a 0-100 scale for the slider
        const maxDistance = 7;
        const minDistance = 0.7;
        const newZoom = 100 * (1 - (currentZoom - minDistance) / (maxDistance - minDistance));
        setZoom(Math.max(0, Math.min(100, newZoom)));
      }
    }
  });

  return null; // This component doesn't render anything itself
}

export default function ModelViewer({ model }: { model: ModelInfo }) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [zoom, setZoom] = useState(50);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    setZoom(50);
    controlsRef.current?.reset();
  }, [model]);

  const handlePan = (dx: number, dy: number) => {
    if (!controlsRef.current) return;

    const controls = controlsRef.current;
    const camera = controls.object;

    const offset = new Vector3();
    offset.copy(camera.position).sub(controls.target);

    // Y-axis for up/down, X-axis for left/right
    const target = new Vector3();
    target.copy(controls.target);

    const panLeft = new Vector3();
    panLeft.crossVectors(camera.up, offset).normalize();
    panLeft.multiplyScalar(dx * -0.05);

    const panUp = new Vector3();
    panUp.copy(camera.up).multiplyScalar(dy * 0.05);

    const pan = new Vector3();
    pan.add(panLeft).add(panUp);

    camera.position.add(pan);
    controls.target.add(pan);

    controls.update();
  };

  const handleZoomChange = (newZoomValue: number[]) => {
    const newZoom = newZoomValue[0];
    const controls = controlsRef.current;
    if (controls && newZoom !== undefined) {
      const maxDistance = 7;
      const minDistance = 0.7;
      const newDistance = minDistance + (1 - newZoom / 100) * (maxDistance - minDistance);

      const direction = new Vector3();
      controls.object.getWorldDirection(direction);
      const newPosition = new Vector3();
      direction.multiplyScalar(-newDistance);
      newPosition.copy(controls.target).add(direction);

      controls.object.position.copy(newPosition);
      controls.update();

      setZoom(newZoom);
    }
  };


  return (
    <div className="relative w-full h-[500px] rounded-lg border-2 border-primary/30 bg-card box-glow-primary overflow-hidden">
      <Canvas 
        dpr={[1, 1.5]} 
        camera={{ position: [0, 1, 8], fov: 45 }} 
        key={model.id}
        performance={{ min: 0.3 }}
        gl={{ 
          antialias: false,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: true,
        }}
      >
        <ambientLight intensity={3.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        {model?.fallback?.color && (
          <pointLight
            position={[-10, -10, -10]}
            intensity={1.5}
            color={model.fallback.color}
          />
        )}
        <Suspense fallback={<FallbackModel model={model} />}>
          {model.url ? (
            <LoadedModel url={model.url} />
          ) : (
            <FallbackModel model={model} />
          )}
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableZoom={true}
          enablePan={true}
          minDistance={0.7}
          maxDistance={7}
          onStart={() => setIsInteracting(true)}
          onEnd={() => setIsInteracting(false)}
        />
        <SceneUpdater controlsRef={controlsRef} setZoom={setZoom} isInteracting={isInteracting} />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xs px-4">
        <div className="p-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border flex flex-col gap-2">
          <div className="grid grid-cols-3 grid-rows-3 gap-1 h-24 w-24 mx-auto">
            <div className="col-start-2 row-start-1 flex justify-center items-center">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handlePan(0, 1)}>
                  <ArrowUp className="w-5 h-5" />
                </Button>
            </div>
            <div className="col-start-1 row-start-2 flex justify-center items-center">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handlePan(1, 0)}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
            </div>
            <div className="col-start-2 row-start-2 flex justify-center items-center">
                {/* Center empty */}
            </div>
            <div className="col-start-3 row-start-2 flex justify-center items-center">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handlePan(-1, 0)}>
                  <ArrowRight className="w-5 h-5" />
                </Button>
            </div>
            <div className="col-start-2 row-start-3 flex justify-center items-center">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handlePan(0, -1)}>
                  <ArrowDown className="w-5 h-5" />
                </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 px-2">
            <ZoomOut className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={[zoom]}
              onValueChange={handleZoomChange}
              onValueCommit={() => setIsInteracting(false)}
              onPointerDown={() => setIsInteracting(true)}
              max={100}
              step={1}
            />
            <ZoomIn className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
