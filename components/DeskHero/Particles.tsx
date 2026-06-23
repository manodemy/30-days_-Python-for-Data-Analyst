"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function Particles({ count = 300 }) {
  const pointsRef = useRef<THREE.Points | null>(null);
  const particleTextureRef = useRef<THREE.CanvasTexture | null>(null);

  // Generate soft circular particle sprite dynamically
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
      grad.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
      grad.addColorStop(0.8, "rgba(255, 255, 255, 0.1)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0.0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const tex = new THREE.CanvasTexture(canvas);
    particleTextureRef.current = tex;
    return () => tex.dispose();
  }, []);

  const geomRef = useRef<THREE.BufferGeometry | null>(null);
  const positionsArr = useRef<Float32Array | null>(null);
  const speedsArr = useRef<Float32Array | null>(null);

  // Initialize random particle coordinates
  useEffect(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spread coordinates around desk area
      positions[i * 3] = Math.random() * 3.0 - 1.5;     // X: -1.5m to +1.5m
      positions[i * 3 + 1] = Math.random() * 2.0;       // Y: 0m to 2m
      positions[i * 3 + 2] = Math.random() * 2.0 - 1.0; // Z: -1m to +1m
      
      speeds[i] = Math.random() * 0.05 + 0.02; // rise speed
    }

    positionsArr.current = positions;
    speedsArr.current = speeds;
  }, [count]);

  // Frame tick animation loop
  useFrame((state) => {
    if (!pointsRef.current || !positionsArr.current || !speedsArr.current) return;

    const positions = positionsArr.current;
    const speeds = speedsArr.current;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Drift upward
      positions[i * 3 + 1] += speeds[i] * 0.04;

      // Subtle horizontal sway using sin waves
      positions[i * 3] += Math.sin(time * 1.5 + i) * 0.001;
      positions[i * 3 + 2] += Math.cos(time * 1.2 + i) * 0.001;

      // Recycle at ceiling boundary (y=2.0)
      if (positions[i * 3 + 1] > 2.0) {
        positions[i * 3 + 1] = 0.0;
        positions[i * 3] = Math.random() * 3.0 - 1.5;
        positions[i * 3 + 2] = Math.random() * 2.0 - 1.0;
      }
    }

    // Force R3F buffer refresh
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positionsArr.current || new Float32Array(), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        map={particleTextureRef.current || undefined}
        transparent={true}
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
