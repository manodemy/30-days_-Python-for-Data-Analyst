"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Desk } from "./Desk";
import { Laptop } from "./Laptop";
import { Props } from "./Props";
import { Particles } from "./Particles";
import { useScreenTextures } from "./ScreenTextures";

interface SceneConfig {
  stage: "off" | "sql" | "excel" | "python" | "phone" | "finale";
  lampIntensityRef: React.MutableRefObject<number>;
  screenGlowIntensityRef: React.MutableRefObject<number>;
  screenGlowColorRef: React.MutableRefObject<string>;
  sunriseIntensityRef: React.MutableRefObject<number>;
  sunriseColorRef: React.MutableRefObject<string>;
  certOpacityRef: React.MutableRefObject<number>;
  cameraOffsetPosRef: React.MutableRefObject<[number, number, number]>;
  cameraOffsetRotRef: React.MutableRefObject<[number, number, number]>;
  isMobile: boolean;
}

export function SceneContent({
  stage,
  lampIntensityRef,
  screenGlowIntensityRef,
  screenGlowColorRef,
  sunriseIntensityRef,
  sunriseColorRef,
  certOpacityRef,
  cameraOffsetPosRef,
  cameraOffsetRotRef,
  isMobile
}: SceneConfig) {
  // Screen/Glow references
  const textures = useScreenTextures(stage);
  const lampLightRef = useRef<THREE.PointLight | null>(null);
  const rectLampRef = useRef<THREE.RectAreaLight | null>(null);
  const screenLightRef = useRef<THREE.RectAreaLight | null>(null);
  const sunriseLightRef = useRef<THREE.DirectionalLight | null>(null);

  // Dynamic values binding in the frame loop (extremely high performance)
  useFrame((state) => {
    // 1. Lamp Intensity update
    const lampVal = lampIntensityRef.current;
    if (lampLightRef.current) lampLightRef.current.intensity = lampVal * 0.8;
    if (rectLampRef.current) rectLampRef.current.intensity = lampVal * 1.5;

    // 2. Screen Glow update
    if (screenLightRef.current) {
      screenLightRef.current.intensity = screenGlowIntensityRef.current;
      screenLightRef.current.color.set(screenGlowColorRef.current);
    }

    // 3. Sunrise/Morning Light update
    if (sunriseLightRef.current) {
      sunriseLightRef.current.intensity = sunriseIntensityRef.current;
      sunriseLightRef.current.color.set(sunriseColorRef.current);
    }

    // 4. Camera positioning & Handheld breathing noise
    const time = state.clock.getElapsedTime();
    const camera = state.camera;

    // Base position = [0, 1.35, 1.8]
    const basePos: [number, number, number] = [0, 1.35, 1.8];
    const offsetPos = cameraOffsetPosRef.current;
    const offsetRot = cameraOffsetRotRef.current;

    // Simplex/Sin handheld jitter (subtle breathing feel)
    const jitterX = Math.sin(time * 1.8) * 0.004;
    const jitterY = Math.cos(time * 1.3) * 0.003;
    const jitterZ = Math.sin(time * 0.9) * 0.002;

    camera.position.set(
      basePos[0] + offsetPos[0] + jitterX,
      basePos[1] + offsetPos[1] + jitterY,
      basePos[2] + offsetPos[2] + jitterZ
    );

    // Look at target: centers on Laptop (-0.2 Z) or slides towards props
    const targetX = offsetPos[0] * 0.5;
    const targetY = 0.45 + offsetPos[1] * 0.5;
    const targetZ = -0.2 + offsetPos[2] * 0.5;

    camera.lookAt(targetX + jitterX * 0.2, targetY, targetZ);
    camera.rotation.x += offsetRot[0];
    camera.rotation.y += offsetRot[1];
  });

  // Decide active screen texture
  let activeTexture = null;
  if (stage === "sql") activeTexture = textures.sql;
  else if (stage === "excel") activeTexture = textures.excel;
  else if (stage === "python") activeTexture = textures.python;
  else if (stage === "phone" || stage === "finale") activeTexture = textures.python; // Python runs in bg

  return (
    <group>
      {/* 1. General ambient fill light */}
      <ambientLight color="#0F1524" intensity={0.15} />

      {/* 2. Sunrise / Morning light (Transitions cool dim -> warm bright) */}
      <directionalLight
        ref={sunriseLightRef}
        position={[5, 4, 3]}
        intensity={0.05}
        color="#2B3B5E"
        castShadow={!isMobile}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0005}
      />

      {/* 3. Practical Desk Lamp Lighting:
          Combination of PointLight (for casting shadows) and RectAreaLight (for realistic area reflections) */}
      <group position={[-0.98, 0.9, -0.6]}>
        {/* PointLight for shadow cast */}
        <pointLight
          ref={lampLightRef}
          color="#FFA75B"
          intensity={0}
          distance={5}
          decay={2}
          castShadow={!isMobile}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0005}
        />
        {/* RectAreaLight for warm area light fill */}
        <rectAreaLight
          ref={rectLampRef}
          args={["#FFA75B", 0, 0.15, 0.2]}
          rotation={[Math.PI / 4, 0, 0]}
        />
      </group>

      {/* 4. Desk Surface & coffee cup stain decal */}
      <Desk />

      {/* 5. Laptop (Body, Bezel, Keyboard, Screen glass, Emissive canvas textures) */}
      <Laptop
        screenTexture={activeTexture}
        glowIntensity={screenGlowIntensityRef.current}
        glowColor={screenGlowColorRef.current}
      />

      {/* 6. Desk Props (Cup with steam shader, Phone, Certificate, Lamp) */}
      <Props
        stage={stage}
        phoneTexture={textures.phone}
        certOpacityRef={certOpacityRef}
      />

      {/* 7. Volumetric dust particle system */}
      <Particles count={isMobile ? 80 : 300} />
    </group>
  );
}
