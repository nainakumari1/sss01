import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Mail } from 'lucide-react';
import usePageMeta from '../utils/usePageMeta.js';
import MapSection from '../components/MapSection.jsx';
import { BIZ, smsLink, QUICK_QUOTE } from '../config.js';

export default function Contact() {
  usePageMeta(
    'Contact SSS Detailing Co. | Mobile Detailing in Mobile, AL',
    'Call, text or email SSS Detailing Co. for a free quote on mobile car detailing in Mobile, Alabama.'
  );
  return (
    <>
      <section>
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h1 className="h1s">{BIZ.name}</h1>
          <div className="grid3">
            <a className="card" href={BIZ.tel}><Phone className="ico" /><h3>Call</h3><p className="muted">{BIZ.phoneDisplay}</p></a>
            <a className="card" href={smsLink(QUICK_QUOTE)}><MessageSquare className="ico" /><h3>Text for a Free Quote</h3><p className="muted">{BIZ.phoneDisplay}</p></a>
            <a className="card" href={`mailto:${BIZ.email}`}><Mail className="ico" /><h3>Email</h3><p className="muted">{BIZ.email}</p></a>
          </div>
          <p>Serving Mobile, AL | Mobile Detailing – We Come to You!</p>
          <div className="socials">
            <a href={BIZ.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={BIZ.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href={BIZ.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
          <div className="btns">
            <Link className="btn btn-primary" to="/quote">Get a Free Quote</Link>
            <Link className="btn btn-ghost" to="/book">Book an Appointment</Link>
          </div>
        </div>
      </section>
      <MapSection />
    </>
  );
}
