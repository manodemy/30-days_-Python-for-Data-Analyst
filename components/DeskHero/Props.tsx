"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface PropsConfig {
  stage: "off" | "sql" | "excel" | "python" | "phone" | "finale";
  phoneTexture: THREE.CanvasTexture | null;
  certOpacityRef: React.MutableRefObject<number>;
}

// ────────────────────────────────────────────────────────
// STEAM SHADER MATERIAL CONFIG
// ────────────────────────────────────────────────────────
const SteamShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#e2ebf0") }
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Rising smoke wave movement
      float wave = sin(uTime * 3.0 + pos.y * 6.0) * 0.08;
      pos.x += wave * (pos.y + 0.1); // sway increases towards top
      pos.y += wave * 0.02;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      // Soft smoke fade out at the edges
      float alpha = sin(vUv.y * 3.14159) * (1.0 - vUv.y);
      float horizontalFade = sin(vUv.x * 3.14159);
      float finalAlpha = alpha * horizontalFade * 0.12;
      
      gl_FragColor = vec4(uColor, finalAlpha);
    }
  `
};

export function Props({ stage, phoneTexture, certOpacityRef }: PropsConfig) {
  const steamMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const certMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const [certTexture, setCertTexture] = useState<THREE.CanvasTexture | null>(null);
  const [logoTexture, setLogoTexture] = useState<THREE.CanvasTexture | null>(null);

  // Animate Steam Shader Uniform Time & Certificate Opacity
  useFrame((state) => {
    if (steamMaterialRef.current) {
      // Steam is only active after the lamp is turned on (t > 3s)
      const isWarm = stage !== "off" && stage !== "sql";
      steamMaterialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      steamMaterialRef.current.visible = isWarm;
    }
    if (certMaterialRef.current) {
      certMaterialRef.current.opacity = certOpacityRef.current;
    }
  });

  // Generate Procedural Logo for Coffee Mug
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillRect(0, 0, 256, 128);
      ctx.fillStyle = "#D4AF37"; // Gold/copper logo color
      ctx.font = "bold 48px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Mano", 128, 75);
    }
    const tex = new THREE.CanvasTexture(canvas);
    setLogoTexture(tex);
    return () => {
      setLogoTexture(null);
      tex.dispose();
    };
  }, []);

  // Generate Procedural Certificate of Completion
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 768;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Textured paper color
      ctx.fillStyle = "#FDFBF7";
      ctx.fillRect(0, 0, 768, 1024);

      // Gold border
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 16;
      ctx.strokeRect(30, 30, 708, 964);
      ctx.lineWidth = 4;
      ctx.strokeRect(45, 45, 678, 934);

      // Certificate content text
      ctx.fillStyle = "#0C111C";
      ctx.textAlign = "center";
      ctx.font = "bold 42px Georgia";
      ctx.fillText("CERTIFICATE OF COMPLETION", 384, 180);

      ctx.fillStyle = "#5A6E85";
      ctx.font = "italic 26px Georgia";
      ctx.fillText("This certifies that the recipient is fully job-ready", 384, 280);

      ctx.fillStyle = "#0C111C";
      ctx.font = "bold 34px sans-serif";
      ctx.fillText("DATA ANALYST SPECIALIST", 384, 380);

      ctx.fillStyle = "#5A6E85";
      ctx.font = "24px sans-serif";
      ctx.fillText("Mastered SQL · Excel · Python in 60 Days", 384, 460);

      // Signature lines
      ctx.strokeStyle = "#8F9CAE";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(150, 750); ctx.lineTo(320, 750);
      ctx.moveTo(448, 750); ctx.lineTo(618, 750);
      ctx.stroke();

      ctx.fillStyle = "#0C111C";
      ctx.font = "20px sans-serif";
      ctx.fillText("Lead Instructor", 235, 790);
      ctx.fillText("Manodemy Director", 533, 790);

      // Gold Seal star crest
      ctx.fillStyle = "#D4AF37";
      ctx.beginPath();
      ctx.arc(384, 620, 50, 0, Math.PI * 2);
      ctx.fill();

      // Ribbon shapes
      ctx.beginPath();
      ctx.moveTo(354, 650); ctx.lineTo(344, 760); ctx.lineTo(384, 730); ctx.lineTo(424, 760); ctx.lineTo(414, 650);
      ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    setCertTexture(tex);
    return () => {
      setCertTexture(null);
      tex.dispose();
    };
  }, []);

  return (
    <group>
      {/* 1. Recessed Table Lamp (Key Light Source) */}
      <group position={[-1.2, 0, -0.6]}>
        {/* Lamp Base */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.2, 0.04, 16]} />
          <meshStandardMaterial color="#1A202C" roughness={0.4} />
        </mesh>
        {/* Lamp Neck */}
        <mesh position={[0.1, 0.45, 0]} rotation={[0, 0, -0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.9, 8]} />
          <meshStandardMaterial color="#2D3748" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Lamp Hood */}
        <mesh position={[0.22, 0.9, 0]} rotation={[0, 0, -0.6]} castShadow>
          <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
          <meshStandardMaterial color="#1A202C" roughness={0.4} />
        </mesh>
        {/* Light bulb filament representation */}
        <mesh position={[0.22, 0.8, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#FFE2C4" />
        </mesh>
      </group>

      {/* 2. Coffee Mug (Ceramic) */}
      <group position={[-0.45, 0.001, 0.25]}>
        {/* Mug Cylinder */}
        <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.13, 0.13, 0.32, 24]} />
          <meshPhysicalMaterial
            color="#0E1320"
            roughness={0.15}
            clearcoat={0.8}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Embossed Logo plane */}
        <mesh position={[0, 0.16, 0.131]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.2, 0.1]} />
          <meshStandardMaterial
            key={logoTexture ? logoTexture.uuid : "none"}
            map={logoTexture || undefined}
            transparent={true}
            opacity={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Coffee Liquid Plane inside the mug */}
        <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.12, 16]} />
          <meshStandardMaterial color="#4A3528" roughness={0.1} />
        </mesh>

        {/* Custom Steam Shader Mesh */}
        <mesh position={[0, 0.32, 0]}>
          <planeGeometry args={[0.25, 0.6]} />
          <shaderMaterial
            ref={steamMaterialRef}
            transparent={true}
            depthWrite={false}
            vertexShader={SteamShader.vertexShader}
            fragmentShader={SteamShader.fragmentShader}
            uniforms={SteamShader.uniforms}
          />
        </mesh>
      </group>

      {/* 3. Phone (Tempered Glass Overlay) */}
      <group position={[0.45, 0.01, 0.3]} rotation={[0, -Math.PI * 0.08, 0]}>
        {/* Phone Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.02, 0.68]} />
          <meshPhysicalMaterial color="#121824" metalness={0.9} roughness={0.3} />
        </mesh>

        {/* Phone Screen Base */}
        <mesh position={[0, 0.011, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.31, 0.65]} />
          <meshBasicMaterial
            key={phoneTexture ? phoneTexture.uuid : "none"}
            map={phoneTexture || undefined}
            color={stage === "phone" || stage === "finale" ? "#ffffff" : "#000000"}
          />
        </mesh>

        {/* Glass Screen Reflection Layer */}
        <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.31, 0.65]} />
          <meshPhysicalMaterial
            roughness={0.02}
            transmission={0.98}
            transparent={true}
            opacity={0.95}
          />
        </mesh>
      </group>

      {/* 4. Certificate of Completion */}
      <group position={[0, 0.002, 0.95]} rotation={[-Math.PI / 2, 0, -Math.PI * 0.04]}>
        <mesh castShadow receiveShadow>
          <planeGeometry args={[0.75, 1.0]} />
          <meshPhysicalMaterial
            ref={certMaterialRef}
            key={certTexture ? certTexture.uuid : "none"}
            map={certTexture || undefined}
            roughness={0.85}
            transparent={true}
            opacity={0} // animated via ref
          />
        </mesh>
      </group>
    </group>
  );
}
