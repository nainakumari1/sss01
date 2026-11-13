import { useEffect, useState } from 'react';
import { MapPin, Phone, MessageSquare } from 'lucide-react';
import { BIZ, smsLink, QUICK_QUOTE } from '../config.js';

export default function MapSection() {
  const [cfg, setCfg] = useState(null);
  useEffect(() => {
    fetch('/api/config').then((r) => r.json()).then(setCfg).catch(() => {});
  }, []);

  const src = cfg?.mapsEmbedKey && cfg?.placeId
    ? `https://www.google.com/maps/embed/v1/place?key=${cfg.mapsEmbedKey}&q=place_id:${cfg.placeId}`
    : null;

  return (
    <section>
      <div className="wrap map-grid">
        <div>
          <p className="eyebrow">Service Area</p>
          <h2>We Come to You!</h2>
          <p className="lead">SSS is a mobile service based in Mobile, Alabama. We bring everything needed to your home, work or wherever your vehicle is parked.</p>
          <p><MapPin size={16} /> Serving Mobile, AL</p>
          <div className="btns">
            <a className="btn btn-primary" href={BIZ.maps} target="_blank" rel="noopener noreferrer">Get Directions</a>
            <a className="btn btn-ghost" href={BIZ.tel}><Phone size={18} /> Call Now</a>
            <a className="btn btn-ghost" href={smsLink(QUICK_QUOTE)}><MessageSquare size={18} /> Text Us</a>
          </div>
        </div>
        <div className="map">
          {src ? (
            <iframe title="SSS Detailing Co. on Google Maps" src={src} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <div className="map-fallback">
              <MapPin size={36} />
              <p>View our location on Google Maps</p>
              <a className="btn btn-primary" href={BIZ.maps} target="_blank" rel="noopener noreferrer">Open Google Maps</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
