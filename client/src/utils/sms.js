export const isMobileDevice = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

const line = (label, v) => (v ? `${label}: ${v}\n` : '');

export function formatQuote(d, serviceLabels) {
  return (
    'SSS Detailing - FREE QUOTE REQUEST\n\n' +
    line('Name', d.name) + line('Phone', d.phone) + line('Email', d.email) +
    line('Services', serviceLabels.join(', ')) +
    line('Vehicle type', d.vehicleType) + line('Make/Model', d.vehicle) +
    line('Condition', d.condition) +
    line('Message', d.message) + line('Special requirements', d.special)
  ).trim();
}

export function formatDate(iso) {
  if (!iso) return '';
  const [y, m, day] = iso.split('-').map(Number);
  return new Date(y, m - 1, day).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });
}

export function formatBooking(d, serviceLabels) {
  return (
    'SSS Detailing - APPOINTMENT REQUEST\n\n' +
    line('Name', d.name) + line('Phone', d.phone) + line('Email', d.email) +
    line('Services', serviceLabels.join(', ')) +
    line('Vehicle type', d.vehicleType) + line('Make/Model', d.vehicle) +
    line('Condition', d.condition) +
    line('Preferred date', formatDate(d.date)) +
    line('Preferred time', [d.time, d.timeNote].filter(Boolean).join(' - ')) +
    line('ZIP', d.zip) + line('Address', d.address) +
    line('Come to my location', d.comeToMe ? 'Yes' : 'No') +
    line('Extras', d.extras.join(', ')) +
    line('Message', d.message)
  ).trim();
}
