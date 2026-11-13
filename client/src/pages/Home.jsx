import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Car, ThumbsUp, Clock, BadgeCheck } from 'lucide-react';
import usePageMeta from '../utils/usePageMeta.js';
import { CtaRow } from '../components/Layout.jsx';
import CompareSlider from '../components/CompareSlider.jsx';
import Reviews from '../components/Reviews.jsx';
import { SERVICES, SETS } from '../data.js';

const WHY = [
  [Car, 'Convenient mobile detailing', 'We come to your location, so you never have to drop off your vehicle.'],
  [Sparkles, 'Attention to detail', 'We focus on the small areas that make the biggest difference.'],
  [ShieldCheck, 'Reliable and professional', 'Dependable service from a founder-led business.'],
  [BadgeCheck, 'Honest pricing', 'Free quotes with no pressure.'],
  [Car, 'Interior and exterior cleaning', 'One visit can cover the whole vehicle.'],
  [ThumbsUp, 'Customer-focused', 'We want you to love the result.']
];

export default function Home() {
  usePageMeta(
    'Mobile Car Detailing in Mobile, AL | SSS Detailing Co.',
    'Professional mobile car detailing in Mobile, Alabama. Interior and exterior detailing, headlight restoration, pressure washing and window cleaning. We come to you.'
  );
  return (
    <>
      <section className="hero">
        <div className="wrap hero-in">
          <div>
            <p className="eyebrow">Mobile Detailing · Mobile, Alabama</p>
            <h1>Your Vehicle Deserves a <em>Fresh Start.</em></h1>
            <p className="lead">Professional mobile detailing in Mobile, Alabama. We bring the shine, cleanliness, and attention to detail directly to your doorstep.</p>
            <CtaRow />
            <p className="trust">Convenient Mobile Service | Professional Results | Customer Satisfaction</p>
          </div>
          <figure className="hero-img">
            <img src="/images/door-panel-after.jpg" alt="Freshly detailed rear door panel of a pickup truck" />
          </figure>
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="eyebrow">What We Do</p>
          <h2>Services</h2>
          <div className="grid3">
            {SERVICES.map((s) => (
              <Link to="/services" className="card svc" key={s.id}>
                <s.icon className="ico" />
                <h3>{s.title}</h3>
                <p className="muted">{s.desc}</p>
                <span className="more">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">Real Results</p>
          <h2>Before &amp; After</h2>
          <p className="lead">Real photos from real jobs. Drag the slider to see the difference.</p>
          <div className="grid3">
            {SETS.map((s) => (
              <figure key={s.id}>
                <CompareSlider {...s} />
                <figcaption><b>{s.title}</b><span className="muted"> · {s.service}</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="btns"><Link className="btn btn-ghost" to="/gallery">View Full Gallery</Link></div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="eyebrow">Why SSS</p>
          <h2>Why Choose SSS?</h2>
          <div className="grid3">
            {WHY.map(([Icon, t, d]) => (
              <div className="card" key={t}><Icon className="ico" /><h3>{t}</h3><p className="muted">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      <section>
        <div className="wrap">
          <p className="eyebrow">Simple Process</p>
          <h2>How It Works</h2>
          <div className="grid3 steps">
            {['Choose Your Service', 'Request a Free Quote', 'Enjoy a Freshly Detailed Vehicle'].map((t, i) => (
              <div className="card" key={t}><span className="num">{i + 1}</span><h3>{t}</h3></div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap band-in">
          <img src="/images/foam-wash-mobile.jpg" alt="Foam wash being applied to a car in a driveway" loading="lazy" />
          <div>
            <h2>We Come to You!</h2>
            <p className="lead">Your driveway, your workplace, your schedule. We handle the rest.</p>
            <Link className="btn btn-ghost" to="/contact">Service Area &amp; Map</Link>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="wrap center">
          <h2>Ready to Make Your Vehicle Look Brand New Again?</h2>
          <CtaRow book={false} />
        </div>
      </section>
    </>
  );
}
