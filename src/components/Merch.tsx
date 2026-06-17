import { useState, useRef, useCallback } from "react";

type MerchProps = {
  images: string[];
  name: string;
  onBack: () => void;
};

export default function Merch({ images, name, onBack }: MerchProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const startX = useRef(0);
  const nextIndex = useRef(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const go = useCallback((direction: 1 | -1) => {
    if (phase !== "idle") return;
    nextIndex.current = (index + direction + images.length) % images.length;
    setPhase("out");
  }, [index, phase, images.length]);

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
          src={images[index]}
          className={itemClass}
          alt={name}
          draggable={false}
          onTransitionEnd={handleTransitionEnd}
        />
        <button type="button" className="merch-arrow merch-arrow--right" onClick={() => go(1)}>
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><polyline points="9,4 17,12 9,20" /></svg>
        </button>
      </div>
      <div className="merch-dots">
        {images.map((_, i) => (
          <span key={i} className={`merch-dot${i === index ? " merch-dot--active" : ""}`} />
        ))}
      </div>
      <button type="button" className="merch-back" onClick={onBack}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><polyline points="15,4 7,12 15,20" /></svg>
        Terug
      </button>
    </div>
  );
}
