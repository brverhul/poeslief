import { ReactNode, useEffect, useState } from "react";

type CRTRevealProps = {
  children: ReactNode;
  activeTab: string;
};

export default function CRTReveal({ children, activeTab }: CRTRevealProps) {
  const [boot, setBoot] = useState(true);

  useEffect(() => {
    setBoot(true);

    const t = setTimeout(() => setBoot(false), 300);

    return () => clearTimeout(t);
  }, [activeTab]);

  return (
    <div className={`crt-appear ${boot ? "boot" : ""}`} style={{ width: "100%", height: "100%" }}>
      {children}
    </div>
  );
}