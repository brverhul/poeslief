import { ReactNode } from "react";

type PlaceholderProps = {
  message: string;
  sub?: ReactNode;
};

export default function Placeholder({ message, sub }: PlaceholderProps) {
  return (
    <div className="placeholder">
      <div className="placeholder-message">{message}</div>

      {sub && <div className="placeholder-sub">{sub}</div>}
    </div>
  );
}