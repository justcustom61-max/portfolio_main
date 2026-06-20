import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function StarField() {
  const mesh = useRef<THREE.Points>(null);
  const count = 3000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 50 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const t = Math.random();
      col[i * 3] = 0.0 + t * 0.4;
      col[i * 3 + 1] = 0.5 + t * 0.3;
      col[i * 3 + 2] = 0.8 + t * 0.2;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function FloatingCubes() {
  const group = useRef<THREE.Group>(null);
  const cubes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20 - 10,
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.3 + Math.random() * 0.5,
      speed: 0.2 + Math.random() * 0.5,
      color: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#a855f7' : '#06b6d4',
    }));
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      child.rotation.x += 0.003 * cubes[i].speed;
      child.rotation.y += 0.005 * cubes[i].speed;
      child.position.y += Math.sin(state.clock.elapsedTime * cubes[i].speed + i) * 0.002;
    });
  });

  return (
    <group ref={group}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position} rotation={cube.rotation} scale={cube.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={cube.color} transparent opacity={0.15} wireframe />
        </mesh>
      ))}
    </group>
  );
}

function FloatingRings() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      child.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.3;
      child.rotation.y += 0.003 * (i + 1);
      child.rotation.z = Math.cos(state.clock.elapsedTime * 0.15 + i) * 0.2;
    });
  });

  return (
    <group ref={group}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[(i - 1.5) * 8, Math.sin(i) * 3, -15 - i * 3]} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3 + i * 0.5, 0.02, 16, 100]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00d4ff' : '#a855f7'}
            transparent
            opacity={0.3}
            emissive={i % 2 === 0 ? '#00d4ff' : '#a855f7'}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    const material = gridRef.current.material as THREE.Material;
    if ('opacity' in material) {
      (material as THREE.Material & { opacity: number }).opacity =
        0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[100, 50, '#00d4ff', '#0a1628']}
      position={[0, -8, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function FloatingParticles() {
  const mesh = useRef<THREE.Points>(null);
  const count = 500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.01;
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#00d4ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function MouseLight() {
  const light = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!light.current) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      light.current.position.x = x * viewport.width * 0.5;
      light.current.position.y = y * viewport.height * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport]);

  return (
    <pointLight
      ref={light}
      color="#00d4ff"
      intensity={2}
      distance={30}
      position={[0, 0, 5]}
    />
  );
}

function EnergyWaves() {
  const lines = useRef<THREE.Group>(null);
  const waveCount = 5;

  useFrame((state) => {
    if (!lines.current) return;
    lines.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      mesh.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i * 0.5) * 2;
      mesh.rotation.z = Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.1;
    });
  });

  return (
    <group ref={lines}>
      {Array.from({ length: waveCount }, (_, i) => (
        <mesh key={i} position={[(i - waveCount / 2) * 6, 0, -20]} rotation={[0, 0, Math.PI / 2]}>
          <planeGeometry args={[0.02, 30]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00d4ff' : '#a855f7'}
            transparent
            opacity={0.1}
            emissive={i % 2 === 0 ? '#00d4ff' : '#a855f7'}
            emissiveIntensity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function Icosahedrons() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      child.rotation.x = state.clock.elapsedTime * 0.1 * (i + 1) * 0.3;
      child.rotation.y = state.clock.elapsedTime * 0.15 * (i + 1) * 0.2;
      child.position.y = Math.sin(state.clock.elapsedTime * 0.3 + i * 2) * 1;
    });
  });

  return (
    <group ref={group}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[(i - 1) * 10, 5, -10 - i * 5]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={i === 0 ? '#00d4ff' : i === 1 ? '#a855f7' : '#06b6d4'}
            transparent
            opacity={0.2}
            wireframe
            emissive={i === 0 ? '#00d4ff' : i === 1 ? '#a855f7' : '#06b6d4'}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.2} color="#08101a" />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a855f7" />
      <pointLight position={[10, -5, -5]} intensity={0.3} color="#06b6d4" />
      <MouseLight />
      <StarField />
      <FloatingCubes />
      <FloatingRings />
      <GridFloor />
      <FloatingParticles />
      <EnergyWaves />
      <Icosahedrons />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
