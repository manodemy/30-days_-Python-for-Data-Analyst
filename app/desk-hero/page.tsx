"use client";

import dynamic from "next/dynamic";

const DeskHero = dynamic(() => import("../../components/DeskHero/DeskHero"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#060913",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <span style={{ color: "#8F9CAE", fontFamily: "monospace" }}>Loading 3D Engine...</span>
    </div>
  )
});

export default function DeskHeroPage() {
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        background: "#060913",
        margin: 0,
        padding: 0,
        overflow: "hidden"
      }}
    >
      <DeskHero />
    </main>
  );
}
