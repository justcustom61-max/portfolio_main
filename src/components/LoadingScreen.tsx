import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

function LoadingSphere() {
  const group = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!group.current || !sphereRef.current) return;
    sphereRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    sphereRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    group.current.children.forEach((child, i) => {
      if (child !== sphereRef.current) {
        child.rotation.x = state.clock.elapsedTime * (0.2 + i * 0.1);
        child.rotation.y = state.clock.elapsedTime * (0.3 + i * 0.05);
      }
    });
  });

  return (
    <group ref={group}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#00d4ff"
          transparent
          opacity={0.15}
          wireframe
          emissive="#00d4ff"
          emissiveIntensity={0.5}
        />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} rotation={[Math.PI / 4 * i, Math.PI / 6 * i, 0]}>
          <torusGeometry args={[2 + i * 0.3, 0.02, 16, 100]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00d4ff' : '#a855f7'}
            transparent
            opacity={0.4}
            emissive={i % 2 === 0 ? '#00d4ff' : '#a855f7'}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
      {Array.from({ length: 50 }, (_, i) => (
        <mesh
          key={`p-${i}`}
          position={[
            Math.cos((i / 50) * Math.PI * 2) * 2.5,
            Math.sin((i / 50) * Math.PI * 2) * 2.5,
            Math.sin((i / 50) * Math.PI * 4) * 0.5,
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1} />
        </mesh>
      ))}
    </group>
  );
}

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.to(containerRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.inOut',
      });
    }
  }, [progress, onComplete]);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.querySelectorAll('.char'),
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          delay: 0.3,
        }
      );
    }
  }, []);

  const nameChars = 'DIVYAM JAIN'.split('');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
    >
      <div className="absolute inset-0 bg-gradient-radial from-navy/50 via-void to-void" />

      <div className="relative w-64 h-64 mb-12">
        <Canvas camera={{ position: [0, 0, 6] }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
          <LoadingSphere />
        </Canvas>
      </div>

      <div ref={textRef} className="relative perspective-1000">
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-wider mb-4">
          {nameChars.map((char, i) => (
            <span
              key={i}
              className="char inline-block gradient-text"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </div>

      <p className="text-electric-blue/60 text-sm tracking-[0.3em] uppercase mb-8 font-display">
        Initializing Portfolio...
      </p>

      <div ref={progressRef} className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-electric-blue via-purple-glow to-cyan-glow rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-scan-line" />
      </div>

      <p className="text-white/30 text-xs mt-3 font-mono">
        {Math.min(Math.round(progress), 100)}%
      </p>
    </div>
  );
}
