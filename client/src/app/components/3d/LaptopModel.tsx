"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Laptop() {
  const { scene } = useGLTF("/laptop/laptop.glb");

  const laptopRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!laptopRef.current) return;

    // Only use horizontal mouse movement.
    // Vertical mouse movement / scrolling won't affect rotation.
    const mouseX = THREE.MathUtils.clamp(state.pointer.x, -1, 1);

    const targetRotationY = mouseX * 0.16;

    // Smooth horizontal rotation
    laptopRef.current.rotation.y = THREE.MathUtils.lerp(
      laptopRef.current.rotation.y,
      targetRotationY,
      0.035
    );

    // Keep vertical rotation stable
    laptopRef.current.rotation.x = THREE.MathUtils.lerp(
      laptopRef.current.rotation.x,
      0,
      0.035
    );
  });

  return (
    <group ref={laptopRef}>
      <Float
        speed={1}
        rotationIntensity={0.015}
        floatIntensity={0.08}
      >
        <primitive
          object={scene}
          scale={2.2}
          position={[0, -1.1, 0]}
          rotation={[0, 4, 0]}
        />
      </Float>
    </group>
  );
}

function LaptopScene() {
  return (
    <>
      <ambientLight intensity={1.1} />

      <directionalLight
        position={[4, 5, 5]}
        intensity={2}
        color="#ffffff"
      />

      {/* Orange DevPulse light */}
      <pointLight
        position={[-3, 2, 3]}
        intensity={5}
        color="#FF7700"
      />

      {/* Yellow DevPulse light */}
      <pointLight
        position={[3, 1, 2]}
        intensity={4}
        color="#FFDD00"
      />

      <Laptop />

      <Environment preset="city" />
    </>
  );
}

export default function LaptopModel() {
  return (
    <div
      className="relative h-[320px] w-full sm:h-[380px] lg:h-[460px] overflow-hidden">
      <Canvas
        camera={{
          position: [0, 1.5, 6],
          fov: 35,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <Suspense fallback={null}>
          <LaptopScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/laptop/laptop.glb");