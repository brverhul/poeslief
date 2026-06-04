import "../styles/gig.css";

export interface GigProps {
  id: number;
  title: string;
  date: string;
  venue: string;
  city: string;
  ticketUrl?: string;
}

export function Gig({ title, date, venue, city, ticketUrl }: GigProps) {

  const isPast = (() => {
    const [day, month, year] = date.split("-").map(Number);
    return new Date(year, month - 1, day) < new Date();
  })();

  return (
    <div className={`gig ${isPast ? 'past' : ''}`}>
      <span className="gig-date">{date}</span>
      <div className="gig-info">
        <span className="gig-title">{title}</span>
        <div className="gig-meta">
          {venue && <span className="gig-venue">{venue}</span>}
          {venue && <span className="gig-sep">/</span>}
          <span className="gig-city">{city}</span>
        </div>
        {ticketUrl && !isPast && (
          <a className="gig-tickets" href={ticketUrl} target="_blank" rel="noopener noreferrer">
            TICKETS
          </a>
        )}
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
