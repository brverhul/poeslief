const links = ["gigs", "merch", "songs"];

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navigation({
  activeTab,
  onTabChange,
}: NavigationProps): React.ReactElement {
  return (
    <>
      {links.map((tab) => (
        <a
          key={tab}
          className={`nav-item ${activeTab === tab ? "active" : ""}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </a>
      ))}
    </>
  );
}