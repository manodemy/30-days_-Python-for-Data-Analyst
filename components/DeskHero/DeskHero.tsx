"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { SceneContent } from "./Scene";
import { PostFX } from "./PostFX";
import { useTimeline } from "./useTimeline";

export default function DeskHero() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Monitor resize event for mobile optimization
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const timeline = useTimeline();

  if (!mounted) {
    // Return placeholder during server-side hydration to prevent mismatch
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#060913",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <span style={{ color: "#8F9CAE", fontFamily: "monospace" }}>Loading Scene...</span>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMappingExposure: 1.0
        }}
        shadows={!isMobile ? "soft" : false}
        dpr={isMobile ? 1.0 : [1, 2]}
        camera={{ fov: 40, position: [0, 1.35, 1.8] }}
      >
        {/* Render R3F Desk Scene Elements */}
        <SceneContent
          stage={timeline.stage}
          lampIntensityRef={timeline.lampIntensityRef}
          screenGlowIntensityRef={timeline.screenGlowIntensityRef}
          screenGlowColorRef={timeline.screenGlowColorRef}
          sunriseIntensityRef={timeline.sunriseIntensityRef}
          sunriseColorRef={timeline.sunriseColorRef}
          certOpacityRef={timeline.certOpacityRef}
          cameraOffsetPosRef={timeline.cameraOffsetPosRef}
          cameraOffsetRotRef={timeline.cameraOffsetRotRef}
          isMobile={isMobile}
        />

        {/* Post-Processing Composer Stack */}
        <PostFX
          focusDistanceRef={timeline.focusDistanceRef}
          isMobile={isMobile}
        />
      </Canvas>

      {/* Floating CTA Skip-intro indicator if needed */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 10,
          pointerEvents: "none"
        }}
      >
        <div
          style={{
            background: "rgba(11, 15, 25, 0.75)",
            padding: "8px 16px",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "20px",
            fontSize: "12px",
            color: "#8F9CAE",
            fontFamily: "monospace"
          }}
        >
          {timeline.stage === "off" && "t = 0s // The Struggle"}
          {timeline.stage === "sql" && "t = 2s // SQL Challenge"}
          {timeline.stage === "excel" && "t = 4s // Excel Formula"}
          {timeline.stage === "python" && "t = 6s // Python Wrangling"}
          {timeline.stage === "phone" && "t = 7s // Interview Confirmed"}
          {timeline.stage === "finale" && "t = 9s // Certified Hired"}
        </div>
      </div>
    </div>
  );
}
