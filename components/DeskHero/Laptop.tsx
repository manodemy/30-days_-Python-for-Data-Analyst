"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface LaptopProps {
  screenTexture: THREE.CanvasTexture | null;
  glowIntensity: number;
  glowColor: string;
}

export function Laptop({ screenTexture, glowIntensity, glowColor }: LaptopProps) {
  const smudgeTextureRef = useRef<THREE.CanvasTexture | null>(null);

  // Generate Procedural Smudge/Fingerprint Texture
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillRect(0, 0, 256, 256);

      // Faint organic grey smears and fingerprints
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const r = Math.random() * 25 + 5;
        
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add horizontal streaks (wipe lines)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 15;
      for (let i = 0; i < 5; i++) {
        const y = Math.random() * 256;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(256, y + Math.random() * 40 - 20);
        ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    smudgeTextureRef.current = tex;

    return () => {
      tex.dispose();
    };
  }, []);

  return (
    <group position={[0, 0.001, -0.2]}>
      {/* 1. Base Shell (Anodized Aluminum) */}
      <mesh castShadow receiveShadow position={[0, 0.01, 0.2]}>
        <boxGeometry args={[1.4, 0.02, 1.0]} />
        <meshPhysicalMaterial
          color="#CFD8DC"
          metalness={0.95}
          roughness={0.28}
          clearcoat={0.1}
        />
      </mesh>

      {/* 2. Keyboard Tray Area Mock */}
      <mesh position={[0, 0.021, 0.2]} receiveShadow>
        <boxGeometry args={[1.2, 0.002, 0.45]} />
        <meshStandardMaterial color="#1A202C" roughness={0.6} />
      </mesh>

      {/* 3. Screen Hinge Pivot */}
      <group position={[0, 0.02, -0.3]} rotation={[-Math.PI * 0.12, 0, 0]}>
        {/* Screen Back Cover */}
        <mesh castShadow position={[0, 0.45, -0.01]}>
          <boxGeometry args={[1.4, 0.9, 0.02]} />
          <meshPhysicalMaterial
            color="#CFD8DC"
            metalness={0.95}
            roughness={0.28}
          />
        </mesh>

        {/* Screen Bezel (Dark Matte) */}
        <mesh position={[0, 0.45, 0.001]}>
          <boxGeometry args={[1.36, 0.86, 0.002]} />
          <meshStandardMaterial color="#0A0E17" roughness={0.8} />
        </mesh>

        {/* ────────── THREE-LAYERED SCREEN ────────── */}
        {/* Layer 1: Emissive Base Canvas Texture */}
        <mesh position={[0, 0.45, 0.003]}>
          <planeGeometry args={[1.3, 0.8]} />
          <meshBasicMaterial
            key={screenTexture ? screenTexture.uuid : "none"}
            map={screenTexture || undefined}
            color={screenTexture ? "#ffffff" : "#000000"}
          />
        </mesh>

        {/* Layer 2: Glass Overlay (Reflections + Clearcoat) */}
        <mesh position={[0, 0.45, 0.004]}>
          <planeGeometry args={[1.3, 0.8]} />
          <meshPhysicalMaterial
            roughness={0.05}
            metalness={0.0}
            transmission={0.95}
            thickness={0.02}
            ior={1.5}
            transparent={true}
            opacity={0.9}
          />
        </mesh>

        {/* Layer 3: Fingerprints & Smudge Overlay */}
        <mesh position={[0, 0.45, 0.005]}>
          <planeGeometry args={[1.3, 0.8]} />
          <meshStandardMaterial
            key={smudgeTextureRef.current ? smudgeTextureRef.current.uuid : "none"}
            alphaMap={smudgeTextureRef.current || undefined}
            transparent={true}
            opacity={0.05}
            color="#ffffff"
            blending={THREE.AdditiveBlending}
            roughness={0.9}
          />
        </mesh>

        {/* Emissive Screen Rim Glow (Soft Spotlight Spill) */}
        <rectAreaLight
          args={[glowColor, glowIntensity * 0.8, 1.3, 0.8]}
          position={[0, 0.45, 0.01]}
          rotation={[0, Math.PI, 0]} // facing forward towards desk
        />
      </group>
    </group>
  );
}
