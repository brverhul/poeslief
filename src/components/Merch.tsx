import { useState, useRef, useCallback } from "react";
import tshirtBlack from "../assets/tshirt_black (1).png";
import tshirtGreen from "../assets/tshirt_green.png";
import tshirtWhite from "../assets/tshirt_white.png";

const shirts = [
  { src: tshirtBlack, alt: "Black t-shirt" },
  { src: tshirtGreen, alt: "Green t-shirt" },
  { src: tshirtWhite, alt: "White t-shirt" },
];

export default function Merch() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const startX = useRef(0);
  const nextIndex = useRef(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const go = useCallback((direction: 1 | -1) => {
    if (phase !== "idle") return;
    nextIndex.current = (index + direction + shirts.length) % shirts.length;
    setPhase("out");
  }, [index, phase]);

  const handleTransitionEnd = () => {
    if (phase === "out") {
      setIndex(nextIndex.current);
      setPhase("in");
      requestAnimationFrame(() => {
        imgRef.current?.getBoundingClientRect();
        setPhase("idle");
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) go(delta > 0 ? 1 : -1);
  };

  const itemClass = `merch-item${phase === "out" ? " merch-item--out" : ""}${phase === "in" ? " merch-item--in" : ""}`;

  return (
    <div className="merch">
      <div className="merch-dots-spacer" />
      <div
        className="merch-carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button type="button" className="merch-arrow merch-arrow--left" onClick={() => go(-1)}>
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><polyline points="15,4 7,12 15,20" /></svg>
        </button>
        <img
          ref={imgRef}
          src={shirts[index].src}
          className={itemClass}
          alt={shirts[index].alt}
          draggable={false}
          onTransitionEnd={handleTransitionEnd}
        />
        <button type="button" className="merch-arrow merch-arrow--right" onClick={() => go(1)}>
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><polyline points="9,4 17,12 9,20" /></svg>
        </button>
      </div>
      <div className="merch-dots">
        {shirts.map((_, i) => (
          <span key={i} className={`merch-dot${i === index ? " merch-dot--active" : ""}`} />
        ))}
      </div>
    </div>
  );
}
