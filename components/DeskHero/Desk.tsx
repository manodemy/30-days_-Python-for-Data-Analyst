"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { ReactThreeFiber } from "@react-three/fiber";

export function Desk() {
  const woodTextureRef = useRef<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    // Generate Procedural Walnut Wood Texture dynamically
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Base dark walnut color gradient
      const grad = ctx.createLinearGradient(0, 0, 1024, 0);
      grad.addColorStop(0, "#1F1510");
      grad.addColorStop(0.3, "#19110D");
      grad.addColorStop(0.5, "#231812");
      grad.addColorStop(0.8, "#1C130E");
      grad.addColorStop(1, "#150D0A");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Fine Wood Grain Fibers (noise rows)
      ctx.fillStyle = "rgba(10, 5, 2, 0.25)";
      for (let i = 0; i < 500; i++) {
        const y = Math.random() * 1024;
        const h = Math.random() * 6 + 1;
        ctx.fillRect(0, y, 1024, h);
      }

      // Large organic wood bands (curves)
      ctx.strokeStyle = "rgba(45, 30, 22, 0.15)";
      ctx.lineWidth = 15;
      for (let i = 0; i < 15; i++) {
        const xOffset = Math.random() * 200 - 100;
        ctx.beginPath();
        ctx.moveTo(xOffset, -100);
        ctx.bezierCurveTo(
          300 + xOffset, 300,
          700 + xOffset, 700,
          1024 + xOffset, 1200
        );
        ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1.5, 1);
    woodTextureRef.current = tex;

    return () => {
      tex.dispose();
    };
  }, []);

  // Faint coffee-ring stain texture decal helper
  const coffeeDecalRef = useRef<THREE.CanvasTexture | null>(null);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = "rgba(74, 53, 40, 0.4)"; // coffee stain brown
      ctx.lineWidth = 4;
      ctx.beginPath();
      // Organic irregular circle
      ctx.arc(64, 64, 42, 0, Math.PI * 2 * 0.95); // faint gap
      ctx.stroke();

      // Splatters
      ctx.fillStyle = "rgba(74, 53, 40, 0.3)";
      ctx.beginPath();
      ctx.arc(42, 85, 3, 0, Math.PI * 2);
      ctx.arc(92, 45, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    coffeeDecalRef.current = tex;

    return () => {
      tex.dispose();
    };
  }, []);

  return (
    <group>
      {/* 1. Main Desk Top Board */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.1, 2.5]} />
        <meshPhysicalMaterial
          map={woodTextureRef.current || undefined}
          roughness={0.38}
          metalness={0.0}
          clearcoat={0.2}
          clearcoatRoughness={0.15}
        />
      </mesh>

      {/* 2. Coffee Ring Decal Plane (sitting exactly 0.001m above desk surface) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.45, 0.001, 0.25]} receiveShadow>
        <planeGeometry args={[0.3, 0.3]} />
        <meshStandardMaterial
          map={coffeeDecalRef.current || undefined}
          transparent={true}
          opacity={0.8}
          roughness={0.5}
          blending={THREE.NormalBlending}
        />
      </mesh>
    </group>
  );
}
