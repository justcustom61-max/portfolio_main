import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ArrowRight, Mail } from 'lucide-react';

function HeroSphere() {
  const group = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particlePositions = new Float32Array(200 * 3);
  for (let i = 0; i < 200; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2 + Math.random() * 0.5;
    particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = r * Math.cos(phi);
  }

  useFrame((state) => {
    if (!group.current || !sphereRef.current) return;
    const time = state.clock.elapsedTime;
    sphereRef.current.rotation.y = time * 0.2;
    sphereRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;

    group.current.children.forEach((child, i) => {
      if (child !== sphereRef.current && child !== particlesRef.current) {
        child.rotation.x = time * (0.1 + i * 0.05);
        child.rotation.y = time * (0.15 + i * 0.03);
      }
    });

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshStandardMaterial
          color="#00d4ff"
          transparent
          opacity={0.08}
          emissive="#00d4ff"
          emissiveIntensity={0.3}
        />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} rotation={[Math.PI / 5 * i, Math.PI / 7 * i, 0]}>
          <torusGeometry args={[2.2 + i * 0.25, 0.015, 16, 100]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00d4ff' : '#a855f7'}
            transparent
            opacity={0.5 - i * 0.08}
            emissive={i % 2 === 0 ? '#00d4ff' : '#a855f7'}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#00d4ff" transparent opacity={0.8} sizeAttenuation />
      </points>
    </group>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out' }
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.6'
      );
    }

    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );
    }

    if (buttonsRef.current) {
      tl.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
        '-=0.3'
      );
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
          <HeroSphere />
        </Canvas>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight mb-2 opacity-0"
        >
          <span className="gradient-text">DIVYAM</span>
        </h1>
        <h1
          ref={subtitleRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight mb-8 opacity-0"
        >
          <span className="text-white/90">JAIN</span>
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-electric-blue/80 tracking-[0.2em] uppercase mb-6">
          Web Developer
        </h2>

        <p
          ref={taglineRef}
          className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed opacity-0"
        >
          Building immersive digital experiences with creativity, code, and modern web technologies.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollToSection('projects')}
            className="group relative px-8 py-4 bg-electric-blue/10 border border-electric-blue/30 rounded-full text-electric-blue font-display font-medium tracking-wide hover:bg-electric-blue/20 hover:border-electric-blue/50 transition-all duration-300 flex items-center gap-2 glow-blue"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="group relative px-8 py-4 bg-purple-glow/10 border border-purple-glow/30 rounded-full text-purple-glow font-display font-medium tracking-wide hover:bg-purple-glow/20 hover:border-purple-glow/50 transition-all duration-300 flex items-center gap-2 glow-purple"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Me</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-electric-blue to-transparent animate-pulse" />
      </div>
    </section>
  );
}
