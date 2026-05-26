import "../styles/gig.css";

export interface GigProps {
  id: number;
  title: string;
  date: string;
  venue: string;
  city: string;
}

export function Gig({ title, date, venue, city }: GigProps) {
  return (
    <div className="gig">
      <span className="gig-date">{date}</span>
      <div className="gig-info">
        <span className="gig-title">{title}</span>
        <div className="gig-meta">
          {venue && <span className="gig-venue">{venue}</span>}
          {venue && <span className="gig-sep">/</span>}
          <span className="gig-city">{city}</span>
        </div>
      </div>
    </div>
  );
}

export function GigList({ gigs }: { gigs: GigProps[] }) {
  return (
    <div className="gig-list">
      {gigs.map((gig) => (
        <Gig key={gig.id} {...gig} />
      ))}
    </div>
  );
}
