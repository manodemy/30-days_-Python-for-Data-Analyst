"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function useTimeline() {
  const [stage, setStage] = useState<"off" | "sql" | "excel" | "python" | "phone" | "finale">("off");
  
  // Refs for WebGL material/lighting properties (animating values via refs is much faster than state in R3F)
  const lampIntensityRef = useRef(0);
  const screenGlowIntensityRef = useRef(0);
  const screenGlowColorRef = useRef("#DCE8FF");
  const sunriseIntensityRef = useRef(0.05);
  const sunriseColorRef = useRef("#2B3B5E");
  const certOpacityRef = useRef(0);
  
  // Camera offsets
  const cameraOffsetPosRef = useRef<[number, number, number]>([0, 0, 0]);
  const cameraOffsetRotRef = useRef<[number, number, number]>([0, 0, 0]);
  
  // Post-processing focal distance
  const focusDistanceRef = useRef(1.7); // start focus on screen

  useEffect(() => {
    // Master GSAP Timeline (10 seconds total, loops seamlessly)
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut" }
    });

    // Reset initial values
    tl.set({}, {
      onStart: () => {
        setStage("off");
        lampIntensityRef.current = 0;
        screenGlowIntensityRef.current = 0;
        screenGlowColorRef.current = "#DCE8FF";
        sunriseIntensityRef.current = 0.05;
        sunriseColorRef.current = "#2B3B5E";
        certOpacityRef.current = 0;
        focusDistanceRef.current = 1.7;
        cameraOffsetPosRef.current = [0, 0, 0];
        cameraOffsetRotRef.current = [0, 0, 0];
      }
    });

    // ────────────────────────────────────────────────────────
    // TIMELINE CONFIGURATION (10 Seconds)
    // ────────────────────────────────────────────────────────

    // t=0s - 1.0s: The Struggle (Dark room, screen off)
    tl.to({}, { duration: 1.0 });

    // t=1.0s - 2.5s: Active Coding — SQL Room (Screen turns on, query executes)
    tl.to({}, {
      duration: 0.1,
      onStart: () => setStage("sql")
    }, 1.0);
    
    tl.to(screenGlowIntensityRef, {
      current: 3.5,
      duration: 0.4,
      ease: "power1.out"
    }, 1.0);

    // t=2.5s - 4.0s: Active Coding — Excel Room (Hard cut texture, lamp turns on)
    tl.to({}, {
      duration: 0.1,
      onStart: () => {
        setStage("excel");
        screenGlowColorRef.current = "#D8FADF";
      }
    }, 2.5);

    tl.to(screenGlowIntensityRef, { current: 3.0, duration: 0.2 }, 2.5);

    tl.to(lampIntensityRef, {
      current: 8.0,
      duration: 1.5,
      ease: "power2.out"
    }, 2.0); // start lamp slightly early at t=2.0s

    // t=4.0s - 5.5s: Active Coding — Python Room (Hard cut texture, amber glow)
    tl.to({}, {
      duration: 0.1,
      onStart: () => {
        setStage("python");
        screenGlowColorRef.current = "#FFF2D2";
      }
    }, 4.0);

    tl.to(screenGlowIntensityRef, { current: 3.8, duration: 0.2 }, 4.0);

    // t=5.5s - 7.0s: The Outcome — Phone Glow / Focus Shift (Reframe slightly)
    tl.to({}, {
      duration: 0.1,
      onStart: () => setStage("phone")
    }, 5.5);

    // Focus shifting down-right to phone
    tl.to(focusDistanceRef, {
      current: 1.5,
      duration: 1.5
    }, 5.5);

    // Slight camera reframe towards phone
    tl.to(cameraOffsetPosRef.current, {
      0: 0.08,  // X offset
      1: -0.06, // Y offset
      2: -0.05, // Z offset
      duration: 1.5
    }, 5.5);

    tl.to(cameraOffsetRotRef.current, {
      0: -0.04, // tilt down
      1: 0.05,  // pan right
      duration: 1.5
    }, 5.5);

    // t=7.0s - 9.0s: The Outcome — Sunrise & Certificate Reveal
    tl.to({}, {
      duration: 0.1,
      onStart: () => setStage("finale")
    }, 7.0);

    // Focus shifting to certificate in the foreground
    tl.to(focusDistanceRef, {
      current: 1.1,
      duration: 2.0
    }, 7.0);

    // Camera pivots to certificate
    tl.to(cameraOffsetPosRef.current, {
      0: -0.1,
      1: -0.02,
      2: 0.1,
      duration: 2.0
    }, 7.0);

    tl.to(cameraOffsetRotRef.current, {
      0: -0.08,
      1: -0.08,
      duration: 2.0
    }, 7.0);

    // Fade in certificate paper
    tl.to(certOpacityRef, {
      current: 1.0,
      duration: 1.5
    }, 7.0);

    // Sunrise directional light ramps to warm bright
    tl.to(sunriseIntensityRef, {
      current: 1.4,
      duration: 2.0
    }, 6.5); // start sunrise slightly early at 6.5s

    tl.to(sunriseColorRef, {
      current: "#FFE2BD",
      duration: 2.0
    }, 6.5);

    // t=9.0s - 10.0s: Hold on final morning glory state
    tl.to({}, { duration: 1.0 }, 9.0);

    return () => {
      tl.kill();
    };
  }, []);

  return {
    stage,
    lampIntensityRef,
    screenGlowIntensityRef,
    screenGlowColorRef,
    sunriseIntensityRef,
    sunriseColorRef,
    certOpacityRef,
    cameraOffsetPosRef,
    cameraOffsetRotRef,
    focusDistanceRef
  };
}
