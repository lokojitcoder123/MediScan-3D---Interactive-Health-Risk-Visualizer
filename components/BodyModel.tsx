'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3, Group, Mesh } from 'three';
import { getRiskColor } from '@/lib/riskScore';

interface BodyModelProps {
  cardiovascularScore: number;
  metabolicScore: number;
  isLoading?: boolean;
}

function BodyMesh({ cardiovascularScore, metabolicScore }: BodyModelProps) {
  const groupRef = useRef<Group>(null);
  const torsoRef = useRef<Mesh>(null);
  const midsectionRef = useRef<Mesh>(null);

  // Get colors based on risk scores
  const torsoColor = getRiskColor(cardiovascularScore);
  const midsectionColor = getRiskColor(metabolicScore);

  useFrame(() => {
    if (groupRef.current && !groupRef.current.userData.isInteracting) {
      groupRef.current.rotation.y += 0.002;
    }

    // Pulsing glow effect on high-risk regions
    if (torsoRef.current && cardiovascularScore > 50) {
      const pulseIntensity = 0.8 + Math.sin(Date.now() * 0.004) * 0.2;
      (torsoRef.current.material as any).emissive.setHex(
        parseInt(torsoColor.slice(1), 16) * (pulseIntensity * 0.3)
      );
    }

    if (midsectionRef.current && metabolicScore > 50) {
      const pulseIntensity = 0.8 + Math.sin(Date.now() * 0.004 + Math.PI) * 0.2;
      (midsectionRef.current.material as any).emissive.setHex(
        parseInt(midsectionColor.slice(1), 16) * (pulseIntensity * 0.3)
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={() => {
        groupRef.current!.userData.isInteracting = true;
      }}
      onPointerLeave={() => {
        groupRef.current!.userData.isInteracting = false;
      }}
    >
      {/* Head */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshPhongMaterial color="#8b9dc3" />
      </mesh>

      {/* Torso - cardiovascular indicator */}
      <mesh ref={torsoRef} position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.4, 0.35, 1.2, 32]} />
        <meshPhongMaterial
          color={torsoColor}
          emissive={cardiovascularScore > 50 ? torsoColor : '#000000'}
          emissiveIntensity={0}
        />
      </mesh>

      {/* Midsection - metabolic/diabetes indicator */}
      <mesh ref={midsectionRef} position={[0, 0.2, 0.1]}>
        <cylinderGeometry args={[0.42, 0.38, 0.5, 32]} />
        <meshPhongMaterial
          color={midsectionColor}
          emissive={metabolicScore > 50 ? midsectionColor : '#000000'}
          emissiveIntensity={0}
        />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.65, 1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 0.9, 16]} />
        <meshPhongMaterial color="#8b9dc3" />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.65, 1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 0.9, 16]} />
        <meshPhongMaterial color="#8b9dc3" />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.3, -0.8, 0]}>
        <cylinderGeometry args={[0.18, 0.15, 1.2, 16]} />
        <meshPhongMaterial color="#7a8fa8" />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.3, -0.8, 0]}>
        <cylinderGeometry args={[0.18, 0.15, 1.2, 16]} />
        <meshPhongMaterial color="#7a8fa8" />
      </mesh>

      {/* Subtle ambient geometry accent */}
      <mesh position={[0, 1.5, -0.8]} scale={0.15}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshPhongMaterial color="#06b6d4" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export function BodyModel({
  cardiovascularScore,
  metabolicScore,
  isLoading = false,
}: BodyModelProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-background to-background-secondary rounded-lg overflow-hidden border border-background-tertiary">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
          <div className="text-accent">Loading...</div>
        </div>
      )}
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, 5]} intensity={0.4} color="#06b6d4" />

        <BodyMesh
          cardiovascularScore={cardiovascularScore}
          metabolicScore={metabolicScore}
        />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={true}
          autoRotateSpeed={2}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>
    </div>
  );
}
