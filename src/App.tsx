import "./styles/globals.css";
import "./styles/frame.css";
import "./styles/crt.css";
import "./styles/nav-items.css"
import "./styles/placeholder.css"

import { useState, useCallback } from "react";

import catImage from "./assets/POESLIEF-Kat-Zwart-removebg-preview.png";

import type { GigProps } from "./components/Gigs.tsx";

import Frame from "./components/Frame.tsx";
import CRTReveal from "./components/CRTReveal.tsx";
import Placeholder from "./components/Placeholder.tsx";
import ContentPage from "./components/ContentPage.tsx";

const GIGS: GigProps[] = [
  { id: 1, title: "SmurPunx", date: "24-05-2026", venue: "Netwerk", city: "Aalst" },
  { id: 2, title: "Prive", date: "30-05-2026", venue: "", city: "Lede" },
  { id: 3, title: "Herderrock", date: "05-09-2026", venue: "", city: "Herdersem", ticketUrl: "https://herderrock.eventsquare.store/nl/pejb165bui3f/9wi5btsspvmv" },
  { id: 4, title: "TBA", date: "??-??-????", venue: "", city: ""},
];

export default function App() {
  const [activeTab, setActiveTab] = useState("homepage");
  const [activeSection, setActiveSection] = useState("gigs");
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  const handleTabChange = useCallback((tab: string) => {
    if (activeTab !== "content") setActiveTab("content");
    setScrollTarget(tab);
  }, [activeTab]);

  const clearScrollTarget = useCallback(() => setScrollTarget(null), []);

  return (
    <main className="app">
      <div
        className="screen-container"
        onClick={activeTab === "homepage" ? () => { setActiveTab("content"); setScrollTarget("merch"); } : undefined}
        style={activeTab === "homepage" ? { cursor: "pointer" } : undefined}
      >
        <img src={catImage} className="bg-image" alt="" />

        <video
          autoPlay
          muted
          loop
          playsInline
          className={`video-bg${activeTab !== "homepage" ? " video-bg--blurred" : ""}`}
        >
          <source src="poeslief_test.mp4" type="video/mp4" />
        </video>

        <Frame
          title="Poeslief"
          activeTab={activeTab === "content" ? activeSection : ""}
          onTabChange={handleTabChange}
        >
          <CRTReveal activeTab={activeTab}>
            {activeTab === "homepage" && (
              <Placeholder
                message="TIK NU"
                sub="en vindt de verborgen schatten van deze site"
              />
            )}

            {activeTab === "content" && (
              <ContentPage
                gigs={GIGS}
                onSectionChange={setActiveSection}
                scrollTarget={scrollTarget}
                onScrolled={clearScrollTarget}
              />
            )}
          </CRTReveal>
        </Frame>
      </div>
    </main>
  );
}
