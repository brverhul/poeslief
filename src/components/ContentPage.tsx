import { useRef, useEffect, useCallback } from "react";
import type { GigProps } from "./Gigs.tsx";
import { GigList } from "./Gigs.tsx";
import Placeholder from "./Placeholder.tsx";
import Merch from "./Merch.tsx";
import catImage from "../assets/POESLIEF-Kat-Zwart-removebg-preview.png";
import "../styles/content.css";
import "../styles/merch.css";

const SECTIONS = ["gigs", "merch", "songs"] as const;
type Section = (typeof SECTIONS)[number];

type ContentPageProps = {
  gigs: GigProps[];
  onSectionChange: (section: string) => void;
  scrollTarget: string | null;
  onScrolled: () => void;
};

export default function ContentPage({ gigs, onSectionChange, scrollTarget, onScrolled }: ContentPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<Section, HTMLDivElement | null>>({
    gigs: null,
    merch: null,
    songs: null,
  });

  const updateActiveSection = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const mid = container.scrollTop + container.clientHeight / 2;
    let active: Section = SECTIONS[0];
    for (const section of SECTIONS) {
      const el = sectionRefs.current[section];
      if (el && el.offsetTop <= mid) active = section;
    }
    onSectionChange(active);
  }, [onSectionChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection();
    return () => container.removeEventListener("scroll", updateActiveSection);
  }, [updateActiveSection]);

  useEffect(() => {
    if (!scrollTarget) return;
    const el = sectionRefs.current[scrollTarget as Section];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    onScrolled();
  }, [scrollTarget, onScrolled]);

  return (
    <div ref={containerRef} className="content-page">
      {SECTIONS.map((section) => (
        <div
          key={section}
          ref={(el) => { sectionRefs.current[section] = el; }}
          className={`content-section${section === "gigs" ? " content-section--top" : ""}`}
        >
          {section === "gigs" && (
            <>
              <GigList gigs={gigs} />
              <div className="gig-section-cat-wrapper">
                <img src={catImage} className="gig-section-cat" alt="" />
              </div>
            </>
          )}
          {section === "merch" && <Merch />}
          {section === "songs" && (
            <Placeholder message="SOOOON.." sub="eerst nog wat aan mijn ballen lekken" />
          )}
        </div>
      ))}
    </div>
  );
}
