import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePageMeta from '../utils/usePageMeta.js';
import { Field, Pick, SmsReady } from '../components/FormBits.jsx';
import { SERVICE_OPTIONS, VEHICLE_TYPES, CONDITIONS } from '../data.js';
import { formatQuote, isMobileDevice } from '../utils/sms.js';
import { smsLink } from '../config.js';

export default function Quote() {
  usePageMeta('Free Quote | SSS Detailing Co. Mobile, AL', 'Request a free mobile car detailing quote in Mobile, Alabama. Fill out the form and text it to us in one tap.');
  const [params] = useSearchParams();
  const pre = params.get('service');
  const [d, setD] = useState({
    name: '', phone: '', email: '',
    services: pre && SERVICE_OPTIONS.some((s) => s.id === pre) ? [pre] : [],
    vehicleType: '', vehicle: '', condition: '', message: '', special: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const toggle = (id) => set('services', d.services.includes(id) ? d.services.filter((x) => x !== id) : [...d.services, id]);

  function submit(e) {
    e.preventDefault();
    const er = {};
    if (!d.name.trim()) er.name = 'Please enter your name.';
    if (d.phone.replace(/\D/g, '').length < 10) er.phone = 'Please enter a valid phone number.';
    if (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) er.email = 'That email looks incorrect.';
    if (!d.services.length) er.services = 'Choose at least one service.';
    setErrors(er);
    if (Object.keys(er).length) return;

    const labels = SERVICE_OPTIONS.filter((s) => d.services.includes(s.id)).map((s) => s.label);
    const msg = formatQuote(d, labels);
    setMessage(msg);
    if (isMobileDevice()) window.location.href = smsLink(msg);
  }

  if (message)
    return (
      <section><div className="wrap narrow">
        <SmsReady
          title="Your quote request is ready!"
          intro="Press Send in your messaging app and Slavko will get back to you with your free quote."
          message={message} onEdit={() => setMessage(null)}
        />
      </div></section>
    );

  return (
    <section>
      <div className="wrap narrow">
        <p className="eyebrow">Free Quote</p>
        <h1 className="h1s">Get Your Free Quote</h1>
        <form className="card form" onSubmit={submit} noValidate>
          <Field label="Full Name" required error={errors.name}>
            <input value={d.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
          </Field>
          <Field label="Phone Number" required error={errors.phone}>
            <input type="tel" value={d.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" />
          </Field>
          <Field label="Email (optional)" error={errors.email}>
            <input type="email" value={d.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />
          </Field>

          <Field label="Services" required error={errors.services}>
            <div className="picks">
              {SERVICE_OPTIONS.map((s) => <Pick key={s.id} checked={d.services.includes(s.id)} onChange={() => toggle(s.id)}>{s.label}</Pick>)}
            </div>
          </Field>

          <div className="two">
            <Field label="Vehicle Type">
              <select value={d.vehicleType} onChange={(e) => set('vehicleType', e.target.value)}>
                <option value="">Select…</option>
                {VEHICLE_TYPES.map((v) => <option key={v}>{v}</option>)}
              </select>
            </Field>
            <Field label="Make & Model (optional)">
              <input value={d.vehicle} onChange={(e) => set('vehicle', e.target.value)} />
            </Field>
          </div>

          <Field label="Vehicle Condition">
            <div className="picks">
              {CONDITIONS.map((c) => <Pick key={c} type="radio" name="cond" checked={d.condition === c} onChange={() => set('condition', c)}>{c}</Pick>)}
            </div>
          </Field>

          <Field label="Message (optional)"><textarea rows="3" value={d.message} onChange={(e) => set('message', e.target.value)} /></Field>
          <Field label="Special requirements (optional)"><input value={d.special} onChange={(e) => set('special', e.target.value)} /></Field>

          <button className="btn btn-primary wide" type="submit">Get My Free Quote</button>
        </form>
      </div>
    </section>
  );
}
