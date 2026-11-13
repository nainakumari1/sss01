import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import usePageMeta from '../utils/usePageMeta.js';
import { SERVICES } from '../data.js';

function Card({ s }) {
  return (
    <article className="card svc-full" id={s.id}>
      {s.img && <img src={s.img} alt="Foam wash on a car during exterior detailing" loading="lazy" />}
      <s.icon className="ico" />
      <h3>{s.title}</h3>
      <p className="muted">{s.desc}</p>
      <ul>{s.points.map((p) => <li key={p}><Check size={16} /> {p}</li>)}</ul>
      <Link className="btn btn-primary" to={`/quote?service=${s.id}`}>Request a Free Quote</Link>
    </article>
  );
}

export default function Services() {
  usePageMeta(
    'Car Detailing Services in Mobile, AL | SSS Detailing Co.',
    'Interior detailing, exterior detailing, full detail, headlight restoration, pressure washing and window cleaning in Mobile, Alabama. Mobile service.'
  );
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">Services</p>
        <h1 className="h1s">Mobile Car Detailing in Mobile, AL</h1>
        <h2>Core Detailing Services</h2>
        <div className="grid2">{SERVICES.filter((s) => s.group === 'core').map((s) => <Card key={s.id} s={s} />)}</div>
        <h2 className="gap">Additional Surface Cleaning</h2>
        <div className="grid2">{SERVICES.filter((s) => s.group === 'extra').map((s) => <Card key={s.id} s={s} />)}</div>
      </div>
    </section>
  );
}
