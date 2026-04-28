import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";

// Floating grocery-themed 3D object
function GroceryItem({ position, color, speed, size, shape }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t * speed * 0.4) * 0.3;
    ref.current.rotation.y += speed * 0.008;
    ref.current.position.y = position[1] + Math.sin(t * speed * 0.5) * 0.3;
  });

  const meshProps = { ref, position, castShadow: true };

  if (shape === "sphere") {
    return (
      <Float speed={speed} rotationIntensity={0.6} floatIntensity={0.8}>
        <Sphere args={[size, 32, 32]} {...meshProps}>
          <MeshDistortMaterial color={color} distort={0.3} speed={2} roughness={0.2} metalness={0.1} />
        </Sphere>
      </Float>
    );
  }
  if (shape === "box") {
    return (
      <Float speed={speed} rotationIntensity={0.8} floatIntensity={0.6}>
        <Box args={[size * 1.4, size * 1.4, size * 1.4]} {...meshProps}>
          <MeshWobbleMaterial color={color} factor={0.3} speed={1.5} roughness={0.3} metalness={0.1} />
        </Box>
      </Float>
    );
  }
  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={0.7}>
      <Torus args={[size, size * 0.4, 16, 32]} {...meshProps}>
        <MeshDistortMaterial color={color} distort={0.2} speed={3} roughness={0.2} metalness={0.15} />
      </Torus>
    </Float>
  );
}

// Floating particles
function Particles({ count = 80 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#88dda7" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// Glowing ring
function GlowRing() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.15;
    ref.current.rotation.x = Math.PI * 0.5 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
  });
  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <torusGeometry args={[3, 0.02, 16, 100]} />
      <meshBasicMaterial color="#22c55e" transparent opacity={0.3} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} intensity={0.6} color="#22c55e" />
        <pointLight position={[3, -2, 3]} intensity={0.4} color="#fbbf24" />

        {/* Grocery-themed floating objects */}
        <GroceryItem position={[-3.5, 1, 0]} color="#22c55e" speed={1.2} size={0.45} shape="sphere" />
        <GroceryItem position={[3.8, -0.5, -1]} color="#f59e0b" speed={0.9} size={0.4} shape="sphere" />
        <GroceryItem position={[-2, -1.2, 1]} color="#ef4444" speed={1.5} size={0.35} shape="sphere" />
        <GroceryItem position={[2.5, 1.5, -0.5]} color="#3b82f6" speed={1.1} size={0.35} shape="box" />
        <GroceryItem position={[-4, 0, -2]} color="#8b5cf6" speed={0.8} size={0.3} shape="torus" />
        <GroceryItem position={[4.5, 0.8, -1.5]} color="#ec4899" speed={1.3} size={0.3} shape="torus" />
        <GroceryItem position={[0, -1.8, 0.5]} color="#14b8a6" speed={1} size={0.38} shape="sphere" />
        <GroceryItem position={[-1.5, 2, -1]} color="#f97316" speed={0.7} size={0.28} shape="box" />

        <Particles count={100} />
        <GlowRing />
      </Canvas>
    </div>
  );
}
