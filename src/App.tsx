import "./styles/globals.css";
import "./styles/frame.css";
import "./styles/crt.css";
import "./styles/nav-items.css"
import "./styles/placeholder.css"

import { useState } from "react";

import catImage from "./assets/POESLIEF-Kat-Zwart-removebg-preview.png";


import type { GigProps } from "./components/Gigs.tsx";

import Frame from "./components/Frame.tsx";
// import CRTImage from "./components/CRTImage.tsx";
import { GigList } from "./components/Gigs.tsx";
import CRTReveal from "./components/CRTReveal.tsx";
import Placeholder from "./components/Placeholder.tsx";

const GIGS: GigProps[] = [
  { id: 1, title: "SmurPunx", date: "24-05-2026", venue: "Netwerk", city: "Aalst" },
  { id: 2, title: "Herderrock", date: "05-09-2026", venue: "", city: "Herdersem" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("homepage");
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function handleMouseLeave() {
    setCursorPos(null);
  }

  return (
    <main className="app">
      <div
        className="screen-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        
        <img src={catImage} className="bg-image" alt="" />


        <video
          autoPlay
          muted
          loop
          playsInline
          className="video-bg"
          style={{
            maskImage: cursorPos
              ? `radial-gradient(circle 120px at ${cursorPos.x}px ${cursorPos.y}px, transparent 60px, black 100px)`
              : 'none',
            WebkitMaskImage: cursorPos
              ? `radial-gradient(circle 120px at ${cursorPos.x}px ${cursorPos.y}px, transparent 60px, black 100px)`
              : 'none',
          }}
        >
          <source src="poeslief_test.mp4" type="video/mp4" />
        </video>

        <Frame title="Poeslief" activeTab={activeTab} onTabChange={setActiveTab}>
          <CRTReveal activeTab={activeTab}>
            {activeTab === "homepage" && <Placeholder message="RRAAWTCH " sub="5 KATERS IN EEN PUNKBAND" />}
            {activeTab === "gigs" && <GigList gigs={GIGS} />}
            {activeTab === "merch" && <Placeholder message="COMING SOON" sub="ongeduldige poesjes..." />}
            {activeTab === "songs" && <Placeholder message="SOOOON.." sub="eerst nog wat aan mijn ballen lekken" />}
          </CRTReveal>
        </Frame>

      </div>
    </main>
  );
}
