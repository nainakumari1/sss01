import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import usePageMeta from '../utils/usePageMeta.js';
import { Field, Pick, SmsReady } from '../components/FormBits.jsx';
import { SERVICE_OPTIONS, VEHICLE_TYPES, CONDITIONS } from '../data.js';
import { formatBooking, formatDate, isMobileDevice } from '../utils/sms.js';
import { smsLink } from '../config.js';

const STEPS = ['Your Info', 'Service', 'Vehicle', 'Date', 'Time', 'Location', 'Extras'];
const TIMES = ['Morning', 'Afternoon', 'Evening'];
const EXTRAS = ['Pet Hair Removal', 'Deep Carpet Cleaning', 'Floor Mat Cleaning', 'Wheel & Tire Cleaning', 'Other Special Requests'];
const pad = (n) => String(n).padStart(2, '0');

function Calendar({ value, onChange }) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [view, setView] = useState(thisMonth);
  const y = view.getFullYear(), m = view.getMonth();
  const pads = new Date(y, m, 1).getDay();
  const count = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(pads).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];

  return (
    <div className="cal">
      <div className="cal-head">
        <button type="button" disabled={view <= thisMonth} onClick={() => setView(new Date(y, m - 1, 1))} aria-label="Previous month"><ChevronLeft /></button>
        <b>{view.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</b>
        <button type="button" onClick={() => setView(new Date(y, m + 1, 1))} aria-label="Next month"><ChevronRight /></button>
      </div>
      <div className="cal-grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i} className="dow">{d}</span>)}
        {cells.map((day, i) => {
          if (!day) return <span key={i} />;
          const iso = `${y}-${pad(m + 1)}-${pad(day)}`;
          const past = new Date(y, m, day) < today;
          return (
            <button type="button" key={i} disabled={past} className={value === iso ? 'on' : ''} onClick={() => onChange(iso)}>{day}</button>
          );
        })}
      </div>
    </div>
  );
}

export default function Book() {
  usePageMeta('Book an Appointment | SSS Detailing Co. Mobile, AL', 'Request a mobile car detailing appointment in Mobile, Alabama. Pick your service, date and time, then text us the details.');
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const top = useRef(null);
  const [d, setD] = useState({
    name: '', phone: '', email: '', services: [], vehicleType: '', vehicle: '', condition: '',
    date: '', time: '', timeNote: '', zip: '', address: '', comeToMe: true, extras: [], message: ''
  });
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const toggle = (k, v) => set(k, d[k].includes(v) ? d[k].filter((x) => x !== v) : [...d[k], v]);

  function validate(s) {
    const er = {};
    if (s === 0) {
      if (!d.name.trim()) er.name = 'Please enter your name.';
      if (d.phone.replace(/\D/g, '').length < 10) er.phone = 'Please enter a valid phone number.';
      if (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) er.email = 'That email looks incorrect.';
    }
    if (s === 1 && !d.services.length) er.services = 'Choose at least one service.';
    if (s === 2) {
      if (!d.vehicleType) er.vehicleType = 'Select a vehicle type.';
      if (!d.condition) er.condition = 'Select the vehicle condition.';
    }
    if (s === 3 && !d.date) er.date = 'Pick a preferred date.';
    if (s === 4 && !d.time) er.time = 'Pick a preferred time of day.';
    if (s === 5) {
      if (!/^\d{5}$/.test(d.zip)) er.zip = 'Enter a 5-digit ZIP code.';
      if (!d.comeToMe) er.comeToMe = 'SSS is a mobile service. Please confirm we can come to you.';
    }
    return er;
  }

  const go = (n) => { setStep(n); top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  function next() {
    const er = validate(step);
    setErrors(er);
    if (!Object.keys(er).length) go(step + 1);
  }
  function submit() {
    const er = validate(step);
    setErrors(er);
    if (Object.keys(er).length) return;
    const labels = SERVICE_OPTIONS.filter((s) => d.services.includes(s.id)).map((s) => s.label);
    const msg = formatBooking(d, labels);
    setMessage(msg);
    if (isMobileDevice()) window.location.href = smsLink(msg);
  }

  if (message)
    return (
      <section><div className="wrap narrow">
        <SmsReady
          title="Your appointment request is ready!"
          intro="Send your message and Slavko will contact you to confirm availability. This is a request, not a confirmed booking."
          message={message} onEdit={() => setMessage(null)}
        />
      </div></section>
    );

  return (
    <section>
      <div className="wrap narrow" ref={top}>
        <p className="eyebrow">Appointment Request</p>
        <h1 className="h1s">Request an Appointment</h1>
        <div className="progress" aria-hidden="true"><span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></div>
        <p className="muted small">Step {step + 1} of {STEPS.length}: {STEPS[step]}</p>

        <div className="card form">
          {step === 0 && (<>
            <Field label="Full Name" required error={errors.name}><input value={d.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" /></Field>
            <Field label="Phone Number" required error={errors.phone}><input type="tel" value={d.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" /></Field>
            <Field label="Email (optional)" error={errors.email}><input type="email" value={d.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" /></Field>
          </>)}

          {step === 1 && (
            <Field label="Select your service(s)" required error={errors.services}>
              <div className="picks">{SERVICE_OPTIONS.map((s) => <Pick key={s.id} checked={d.services.includes(s.id)} onChange={() => toggle('services', s.id)}>{s.label}</Pick>)}</div>
            </Field>
          )}

          {step === 2 && (<>
            <Field label="Vehicle Type" required error={errors.vehicleType}>
              <select value={d.vehicleType} onChange={(e) => set('vehicleType', e.target.value)}>
                <option value="">Select…</option>{VEHICLE_TYPES.map((v) => <option key={v}>{v}</option>)}
              </select>
            </Field>
            <Field label="Make & Model"><input value={d.vehicle} onChange={(e) => set('vehicle', e.target.value)} /></Field>
            <Field label="Vehicle Condition" required error={errors.condition}>
              <div className="picks">{CONDITIONS.map((c) => <Pick key={c} type="radio" name="cond" checked={d.condition === c} onChange={() => set('condition', c)}>{c}</Pick>)}</div>
            </Field>
          </>)}

          {step === 3 && (
            <Field label={d.date ? `Preferred date: ${formatDate(d.date)}` : 'Preferred date'} required error={errors.date}>
              <Calendar value={d.date} onChange={(v) => set('date', v)} />
            </Field>
          )}

          {step === 4 && (<>
            <Field label="Preferred time of day" required error={errors.time}>
              <div className="picks">{TIMES.map((t) => <Pick key={t} type="radio" name="time" checked={d.time === t} onChange={() => set('time', t)}>{t}</Pick>)}</div>
            </Field>
            <Field label="Anything specific about timing? (optional)"><input value={d.timeNote} onChange={(e) => set('timeNote', e.target.value)} placeholder="e.g. after 4 PM" /></Field>
            <p className="muted small">This is a preferred time only. Slavko will confirm availability with you.</p>
          </>)}

          {step === 5 && (<>
            <p className="muted">SSS is a mobile service. We come to you.</p>
            <Field label="ZIP Code" required error={errors.zip}><input inputMode="numeric" maxLength={5} value={d.zip} onChange={(e) => set('zip', e.target.value.replace(/\D/g, ''))} autoComplete="postal-code" /></Field>
            <Field label="Service Address (optional)"><input value={d.address} onChange={(e) => set('address', e.target.value)} autoComplete="street-address" /></Field>
            <Field error={errors.comeToMe}>
              <Pick checked={d.comeToMe} onChange={() => set('comeToMe', !d.comeToMe)}>I would like SSS to come to my location</Pick>
            </Field>
          </>)}

          {step === 6 && (<>
            <Field label="Additional requirements">
              <div className="picks">{EXTRAS.map((x) => <Pick key={x} checked={d.extras.includes(x)} onChange={() => toggle('extras', x)}>{x}</Pick>)}</div>
            </Field>
            <Field label="Message (optional)"><textarea rows="3" value={d.message} onChange={(e) => set('message', e.target.value)} /></Field>
          </>)}

          <div className="nav-btns">
            {step > 0 ? <button type="button" className="btn btn-ghost" onClick={() => go(step - 1)}>Back</button> : <span />}
            {step < STEPS.length - 1
              ? <button type="button" className="btn btn-primary" onClick={next}>Next</button>
              : <button type="button" className="btn btn-primary" onClick={submit}>Request My Appointment</button>}
          </div>
        </div>
      </div>
    </section>
  );
}
