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
  { id: 2, title: "Prive", date: "30-05-2026", venue: "", city: "Lede" },
  { id: 3, title: "Herderrock", date: "05-09-2026", venue: "", city: "Herdersem", ticketUrl: "https://herderrock.eventsquare.store/nl/pejb165bui3f/9wi5btsspvmv" },
  { id: 4, title: "TBA", date: "??-??-????", venue: "", city: ""},
];

export default function App() {
  const [activeTab, setActiveTab] = useState("homepage");
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  function updatePosition(
    clientX: number,
    clientY: number,
    element: HTMLDivElement
  ) {
    const rect = element.getBoundingClientRect();

    setCursorPos({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  }

  return (
    <main className="app">
      <div
        className="screen-container"
        onPointerDown={(e) => {
          updatePosition(e.clientX, e.clientY, e.currentTarget);
        }}
        onPointerMove={(e) => {
          updatePosition(e.clientX, e.clientY, e.currentTarget);
        }}
        onPointerLeave={() => {
          setCursorPos(null);
        }}
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
              : "none",
            WebkitMaskImage: cursorPos
              ? `radial-gradient(circle 120px at ${cursorPos.x}px ${cursorPos.y}px, transparent 60px, black 100px)`
              : "none",
          }}
        >
          <source src="poeslief_test.mp4" type="video/mp4" />
        </video>

        <Frame
          title="Poeslief"
          activeTab={activeTab}
          onTabChange={setActiveTab}
        >
          <CRTReveal activeTab={activeTab}>
            {activeTab === "homepage" && (
              <Placeholder
                message="TIK NU en vecht!"
                sub="TEGEN INDIVIDUALISME"
              />
            )}

            {activeTab === "gigs" && <GigList gigs={GIGS} />}

            {activeTab === "merch" && (
              <Placeholder
                message="COMING SOON"
                sub="ongeduldige poesjes..."
              />
            )}

            {activeTab === "songs" && (
              <Placeholder
                message="SOOOON.."
                sub="eerst nog wat aan mijn ballen lekken"
              />
            )}
          </CRTReveal>
        </Frame>
      </div>
    </main>
  );
}