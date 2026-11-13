import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Maximize2, X } from 'lucide-react';
import usePageMeta from '../utils/usePageMeta.js';
import CompareSlider from '../components/CompareSlider.jsx';
import { SETS } from '../data.js';
import { BIZ, smsLink, QUICK_QUOTE } from '../config.js';

function SetCard({ s, onOpen }) {
  const [view, setView] = useState(() => (window.matchMedia('(min-width:900px)').matches ? 'side' : 'slider'));
  return (
    <figure className="card gal-card">
      <div className="gal-head">
        <b>{s.title}</b>
        <div className="seg">
          <button className={view === 'slider' ? 'on' : ''} onClick={() => setView('slider')}>Slider</button>
          <button className={view === 'side' ? 'on' : ''} onClick={() => setView('side')}>Side by side</button>
        </div>
      </div>
      {view === 'slider' ? (
        <CompareSlider {...s} />
      ) : (
        <div className="side">
          <div><img src={s.before} alt={`Before: ${s.alt}`} loading="lazy" /><span className="tag tag-b">Before</span></div>
          <div><img src={s.after} alt={`After: ${s.alt}`} loading="lazy" /><span className="tag tag-a">After</span></div>
        </div>
      )}
      <figcaption>
        <span className="muted">{s.service}</span>
        <button className="icon-btn" onClick={() => onOpen(s)} aria-label={`Expand ${s.title}`}><Maximize2 size={18} /></button>
      </figcaption>
    </figure>
  );
}

export default function Gallery() {
  usePageMeta(
    'Before & After Gallery | SSS Detailing Co. Mobile, AL',
    'See real before and after results from SSS Detailing Co. mobile car detailing in Mobile, Alabama.'
  );
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  const cats = ['All', ...new Set(SETS.map((s) => s.cat))];
  const shown = SETS.filter((s) => cat === 'All' || s.cat === cat);

  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">Gallery</p>
        <h1 className="h1s">Before &amp; After</h1>
        <p className="lead">Real photos from our own jobs. Tap the expand icon to see them larger.</p>
        <div className="seg big">{cats.map((c) => <button key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}</div>
        <div className="gal-grid">{shown.map((s) => <SetCard key={s.id} s={s} onOpen={setOpen} />)}</div>

        <div className="center final-inline">
          <h2>Want Results Like These? Text Us for a Free Quote.</h2>
          <div className="btns">
            <a className="btn btn-primary" href={smsLink(QUICK_QUOTE)}>Text for a Free Quote</a>
            <a className="btn btn-ghost" href={BIZ.tel}>Call Now</a>
            <Link className="btn btn-ghost" to="/book">Book an Appointment</Link>
          </div>
        </div>
      </div>

      {open && (
        <div className="modal" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <button className="modal-x" aria-label="Close"><X /></button>
          <div onClick={(e) => e.stopPropagation()}><CompareSlider {...open} className="big" /></div>
        </div>
      )}
    </section>
  );
}
