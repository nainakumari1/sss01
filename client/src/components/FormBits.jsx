import { useState } from 'react';
import { Phone, MessageSquare, Copy, Check } from 'lucide-react';
import { BIZ, smsLink } from '../config.js';
import { copyText } from '../utils/sms.js';

export function Field({ label, error, required, children }) {
  return (
    <div className="field">
      <label>{label}{required && <i> *</i>}</label>
      {children}
      {error && <p className="err" role="alert">{error}</p>}
    </div>
  );
}

export function Pick({ type = 'checkbox', name, checked, onChange, children }) {
  return (
    <label className={`pick ${checked ? 'on' : ''}`}>
      <input type={type} name={name} checked={checked} onChange={onChange} />
      <span>{children}</span>
    </label>
  );
}

export function SmsReady({ title, intro, message, onEdit }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="card ready">
      <h2>{title}</h2>
      <p>{intro}</p>
      <pre>{message}</pre>
      <div className="btns">
        <a className="btn btn-primary" href={smsLink(message)}><MessageSquare size={18} /> Text Us</a>
        <button type="button" className="btn btn-ghost" onClick={async () => { setCopied(await copyText(message)); }}>
          {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Copied!' : 'Copy Details'}
        </button>
        <a className="btn btn-ghost" href={BIZ.tel}><Phone size={18} /> Call Now</a>
      </div>
      <p className="muted small">Nothing has been sent yet. Your messaging app opens with this text ready, and you just press Send.</p>
      <button type="button" className="link" onClick={onEdit}>← Edit my details</button>
    </div>
  );
}
