import { useState, useRef } from "react";
import Merch from "./Merch.tsx";
import tshirtBlack from "../assets/tshirt_black (1).png";
import tshirtCharcoal from "../assets/tshirt_charcoal.png";
import tshirtGreen from "../assets/tshirt_green.png";
import tshirtGrey from "../assets/tshirt_grey.png";
import tshirtNavy from "../assets/tshirt_navy.png";
import tshirtOlive from "../assets/tshirt_olive.png";
import tshirtPurple from "../assets/tshirt_purple.png";
import tshirtRoyalblue from "../assets/tshirt_royalblue.png";
import tshirtSand from "../assets/tshirt_sand.png";
import tshirtSkyblue from "../assets/tshirt_skyblue.png";
import tshirtTeal from "../assets/tshirt_teal.png";
import tshirtWhite from "../assets/tshirt_white.png";
import tshirtYellow from "../assets/tshirt_yellow.png";
import backBlack from "../assets/shirts_back/back_black.png";
import backCharcoal from "../assets/shirts_back/back_charcoal.png";
import backGreen from "../assets/shirts_back/back_green.png";
import backGrey from "../assets/shirts_back/back_grey.png";
import backNavy from "../assets/shirts_back/back_navy.png";
import backOlive from "../assets/shirts_back/back_olive.png";
import backPurple from "../assets/shirts_back/back_purple.png";
import backRoyalblue from "../assets/shirts_back/back_royalblue.png";
import backSand from "../assets/shirts_back/back_sand.png";
import backSkyblue from "../assets/shirts_back/back_skyblue.png";
import backTeal from "../assets/shirts_back/back_teal.png";
import backWhite from "../assets/shirts_back/back_white.png";
import backYellow from "../assets/shirts_back/back_yellow.png";
import "../styles/merch-page.css";

const shirts = [
  { name: "Black tee", images: [tshirtBlack, backBlack] },
  { name: "Charcoal tee", images: [tshirtCharcoal, backCharcoal] },
  { name: "Green tee", images: [tshirtGreen, backGreen] },
  { name: "Grey tee", images: [tshirtGrey, backGrey] },
  { name: "Navy tee", images: [tshirtNavy, backNavy] },
  { name: "Olive tee", images: [tshirtOlive, backOlive] },
  { name: "Purple tee", images: [tshirtPurple, backPurple] },
  { name: "Royal blue tee", images: [tshirtRoyalblue, backRoyalblue] },
  { name: "Sand tee", images: [tshirtSand, backSand] },
  { name: "Sky blue tee", images: [tshirtSkyblue, backSkyblue] },
  { name: "Teal tee", images: [tshirtTeal, backTeal] },
  { name: "White tee", images: [tshirtWhite, backWhite] },
  { name: "Yellow tee", images: [tshirtYellow, backYellow] },
];

type View = "grid" | "detail";
type Phase = "idle" | "out" | "in";

export default function MerchPage() {
  const [view, setView] = useState<View>("grid");
  const [phase, setPhase] = useState<Phase>("idle");
  const [selected, setSelected] = useState(0);
  const nextView = useRef<View>("grid");
  const nextSelected = useRef(0);

  const transitionTo = (target: View, shirtIndex: number) => {
    if (phase !== "idle") return;
    nextView.current = target;
    nextSelected.current = shirtIndex;
    setPhase("out");
  };

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName !== "opacity") return;
    if (phase === "out") {
      setView(nextView.current);
      setSelected(nextSelected.current);
      setPhase("in");
      requestAnimationFrame(() => {
        setPhase("idle");
      });
    }
  };

  const dissolve = phase === "out" ? " merch-dissolve--out" : phase === "in" ? " merch-dissolve--in" : "";

  if (view === "detail") {
    const shirt = shirts[selected];
    return (
      <div className={`merch-dissolve${dissolve}`} onTransitionEnd={handleTransitionEnd}>
        <Merch
          images={shirt.images}
          name={shirt.name}
          onBack={() => transitionTo("grid", selected)}
        />
      </div>
    );
  }

  return (
    <div className={`merch-page merch-dissolve${dissolve}`} onTransitionEnd={handleTransitionEnd}>
      <h2 className="merch-page-title">Van elke shirt is maar 1 exemplaar. 
        bestel snel!</h2>
      <div className="merch-grid">
        {shirts.map((shirt, i) => (
          <div key={i} className="merch-grid-item" onClick={() => transitionTo("detail", i)}>
            <img src={shirt.images[0]} alt={shirt.name} className="merch-grid-img" />
            <span className="merch-grid-name">{shirt.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
