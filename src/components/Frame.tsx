import type { ReactNode,  } from "react";

import Navigation from "./Navigation";

type FrameProps = {
  title: string;
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  
};

export default function Frame({ title, children, activeTab, onTabChange }: FrameProps) {
  return (
    <div className="screen-frame">
      <header className="frame-top">
        <span className="title">{title}</span>
      </header>

      <div className="frame-content">
        {children}
      </div>

      <div className="frame-bottom">
        <Navigation activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  );
}