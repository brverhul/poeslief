import { useEffect } from "react";
import catImage from "../assets/POESLIEF-Kat-Zwart-removebg-preview.png";
import { useState } from "react";

export default function CRTImage() {
const [isMobile, setIsMobile] = useState(false);
  // Responsive SVG viewBox
  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
    };

    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  // Load font
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Audiowide&display=swap";
    link.rel = "stylesheet";

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div
      className="crt-screen"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "black",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          inset: 0,
          backgroundImage: `
            linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.8) 10%),
            linear-gradient(90deg, transparent 80%, rgba(0,0,0,0.8) 10%)
          `,
          backgroundSize: "3px 3px",
          pointerEvents: "none",
        }}
      />

      <svg
        viewBox="0 0 300 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          fontFamily: "'Audiowide', cursive",
          position: "absolute",
          width: "100%",
          height: "100%",
          filter: "url(#screen-noise)",
        }}
      >
        <defs>
          <filter id="screen-noise">
            <feTurbulence
              type="turbulence"
              result="noise"
              baseFrequency="0.2"
              numOctaves={1}
              seed={2}
              stitchTiles="noStitch"
            />

            <feOffset in="noise" dx="0" dy="0" result="offsetNoise">
              <animate
                attributeName="dy"
                values="0;-5"
                dur=".3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="dx"
                values="0;20"
                dur=".3s"
                repeatCount="indefinite"
              />
            </feOffset>

            <feComponentTransfer in="offsetNoise" result="coloredNoise">
              <feFuncR type="linear" slope={1} intercept={-0.4} />
              <feFuncG type="linear" slope={1} intercept={-0.4} />
              <feFuncB type="linear" slope={1} intercept={-0.4} />
            </feComponentTransfer>

            <feBlend
              in="SourceGraphic"
              in2="coloredNoise"
              mode="multiply"
              result="screen-content"
            />

            <feTurbulence
              baseFrequency="0.01 1"
              result="waves"
              numOctaves={2}
            />

            <feDisplacementMap
              in="screen-content"
              in2="waves"
              scale={2}
              xChannelSelector="R"
              yChannelSelector="R"
            >
              <animate
                attributeName="scale"
                values="0;2;0;50;1"
                dur="15s"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>

          <filter id="Glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6 2" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <image
          href={catImage}
          x={isMobile ? (300 - 620) / 2 : (300 - 400) / 2}
          y={isMobile ? "10" : "50"}
          width={isMobile ? "620" : "400"}
          height={isMobile ? "220" : "100"}
          style={{ filter: "url(#Glow)" }}
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="translate"
            values="0,0;0,1;0,-1;0,0;0,2;0,0;0,-1"
            dur="3s"
            repeatCount="indefinite"
          />
        </image>
      </svg>
    </div>
  );
}