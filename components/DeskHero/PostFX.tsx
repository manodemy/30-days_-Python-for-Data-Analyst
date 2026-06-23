"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette,
  Noise,
  ChromaticAberration,
  BrightnessContrast
} from "@react-three/postprocessing";

interface PostFXProps {
  focusDistanceRef: React.MutableRefObject<number>;
  isMobile: boolean;
}

export function PostFX({ focusDistanceRef, isMobile }: PostFXProps) {
  const dofRef = useRef<any>(null);

  // Frame tick to dynamically update focus distance on Depth of Field effect
  useFrame(() => {
    if (dofRef.current && !isMobile) {
      dofRef.current.target = focusDistanceRef.current;
    }
  });

  // Mobile optimization fallback: disable expensive DepthOfField & ChromaticAberration
  if (isMobile) {
    return (
      <EffectComposer>
        {/* Soft Bloom */}
        <Bloom
          luminanceThreshold={0.82}
          luminanceSmoothing={0.3}
          intensity={0.25}
        />
        {/* Ambient Vignette */}
        <Vignette eskil={false} offset={0.5} darkness={0.3} />
        {/* Cheap contrast modifier */}
        <BrightnessContrast brightness={0.02} contrast={0.08} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer>
      {/* 1. Depth of Field (cinematic rack focus) */}
      <DepthOfField
        ref={dofRef}
        focusDistance={1.7} // initial focus distance
        focalLength={0.06} // lens size
        bokehScale={2.5}
      />

      {/* 2. Emissive Bloom */}
      <Bloom
        luminanceThreshold={0.82}
        luminanceSmoothing={0.1}
        intensity={0.35}
      />

      {/* 3. Color Contrast Grade */}
      <BrightnessContrast brightness={0.01} contrast={0.06} />

      {/* 4. Film Grain Noise (breaks clean digital renders) */}
      <Noise opacity={0.035} premultiply />

      {/* 5. Lens Chromatic Aberration */}
      <ChromaticAberration
        offset={new THREE.Vector2(0.0006, 0.0006)}
        radialModulation={true}
        modulationOffset={0.5}
      />

      {/* 6. Cinematic Vignette */}
      <Vignette eskil={false} offset={0.5} darkness={0.3} />
    </EffectComposer>
  );
}

// Fallback for THREE module imports
import * as THREE from "three";
