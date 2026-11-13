import usePageMeta from '../utils/usePageMeta.js';
import { CtaRow } from '../components/Layout.jsx';

export default function About() {
  usePageMeta(
    "About Slavko's Surface Solutions | Mobile Detailing in Mobile, AL",
    "Meet Slavko's Surface Solutions (SSS Detailing Co.), a founder-led mobile detailing business serving Mobile, Alabama."
  );
  return (
    <section>
      <div className="wrap about">
        <div>
          <p className="eyebrow">About Us</p>
          <h1 className="h1s">Founder-Led. Customer-Focused.</h1>
          <p className="lead">
            At Slavko's Surface Solutions, our goal is simple: make every surface look its best. We believe in reliable service,
            honest pricing, attention to detail, and results our customers can appreciate. From everyday vehicles to heavily
            soiled interiors, we bring professional care directly to you.
          </p>
          <p className="muted">SSS is a mobile detailing business founded by Slavko and based in Mobile, Alabama.</p>
          <CtaRow />
        </div>
        <img src="/images/foam-wash-mobile.jpg" alt="Foam wash being applied to a car at a customer's home" loading="lazy" />
      </div>
    </section>
  );
}
