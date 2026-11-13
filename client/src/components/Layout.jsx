import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, CalendarCheck } from 'lucide-react';
import { BIZ, smsLink, QUICK_QUOTE } from '../config.js';

const LINKS = [
  ['/', 'Home'], ['/services', 'Services'], ['/gallery', 'Gallery'],
  ['/about', 'About'], ['/contact', 'Contact']
];

export function CtaRow({ book = true }) {
  return (
    <div className="btns">
      <a className="btn btn-primary" href={smsLink(QUICK_QUOTE)}><MessageSquare size={18} /> Text for a Free Quote</a>
      <a className="btn btn-ghost" href={BIZ.tel}><Phone size={18} /> Call Now</a>
      {book && <Link className="btn btn-ghost" to="/book"><CalendarCheck size={18} /> Book an Appointment</Link>}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Link to="/" className="brand" aria-label="SSS Detailing Co. home"><b>SSS</b><span>Detailing Co.</span></Link>
        <nav className={`nav ${open ? 'open' : ''}`}>
          {LINKS.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}
          <Link to="/book" className="btn btn-ghost nav-book">Book Appointment</Link>
        </nav>
        <a className="btn btn-primary hdr-cta" href={smsLink(QUICK_QUOTE)}>Text for a Free Quote</a>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr-grid">
        <div>
          <h3>{BIZ.name}</h3>
          <p className="muted">{BIZ.tagline}</p>
          <p>Serving Mobile, AL | Mobile Detailing – We Come to You!</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p><a href={BIZ.tel}>Call: {BIZ.phoneDisplay}</a></p>
          <p><a href={smsLink(QUICK_QUOTE)}>Text: {BIZ.phoneDisplay}</a></p>
          <p><a href={`mailto:${BIZ.email}`}>{BIZ.email}</a></p>
          <p><a href={BIZ.maps} target="_blank" rel="noopener noreferrer">View on Google Maps</a></p>
        </div>
        <div>
          <h3>Quick Links</h3>
          {LINKS.map(([to, label]) => <p key={to}><Link to={to}>{label}</Link></p>)}
          <p><Link to="/quote">Free Quote</Link></p>
          <p><Link to="/book">Book Appointment</Link></p>
        </div>
        <div>
          <h3>Follow</h3>
          <div className="socials">
            <a href={BIZ.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={BIZ.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href={BIZ.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
      </div>
      <p className="copy">© {new Date().getFullYear()} {BIZ.name}. All rights reserved.</p>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="mbar">
      <a href={BIZ.tel}><Phone size={18} /> Call Now</a>
      <a href={smsLink(QUICK_QUOTE)} className="p"><MessageSquare size={18} /> Text for Quote</a>
    </div>
  );
}
