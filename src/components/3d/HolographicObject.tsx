"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";

const RotatingGeo = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { mouse } = useThree();

  useFrame((state, delta) => {
    // Continuous Rotation - Slower
    meshRef.current.rotation.x += delta * 0.05;
    meshRef.current.rotation.y += delta * 0.08;

    // Mouse Interaction (Parallax) - Subtler
    const x = (mouse.x * window.innerWidth) / 1000;
    const y = (mouse.y * window.innerHeight) / 1000;
    
    meshRef.current.rotation.x += y * 0.02;
    meshRef.current.rotation.y += x * 0.02;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        {/* Wireframe Material for Holographic look */}
        <meshBasicMaterial
          color="#22c55e" // green-500
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
      {/* Inner solid core for depth */}
      <mesh scale={1.75}>
         <icosahedronGeometry args={[1, 1]} />
         <meshBasicMaterial
            color="#22c55e"
            transparent={true}
            opacity={0.05}
            side={THREE.DoubleSide}
         />
      </mesh>
    </Float>
  );
};

interface HologramCanvasProps {
  className?: string;
}

export const HologramCanvas = ({ className = "" }: HologramCanvasProps) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        
        {/* Floating Particles (Cyber Dust) */}
        <Stars 
          radius={50} 
          depth={50} 
          count={2000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
        
        <RotatingGeo />
      </Canvas>
    </div>
  );
};

export default HologramCanvas;
