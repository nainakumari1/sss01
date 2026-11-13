export const BIZ = {
  name: "Slavko's Surface Solutions",
  short: 'SSS Detailing Co.',
  tagline: 'We make surfaces look brand new again!',
  phoneDisplay: '251-272-9442',
  tel: 'tel:+12512729442',
  smsNumber: '+12512729442',
  email: 'slavkossurfacesolutions@gmail.com',
  instagram: 'https://www.instagram.com/sss_detailingco/',
  tiktok: 'https://www.tiktok.com/@sssdetailing',
  facebook: 'https://www.facebook.com/sssdetails',
  maps: 'https://maps.app.goo.gl/r2H2dBLW93c8pLqT6'
};

// "?&body=" works on both iOS and Android
export const smsLink = (body = '') =>
  `sms:${BIZ.smsNumber}${body ? `?&body=${encodeURIComponent(body)}` : ''}`;

export const QUICK_QUOTE = "Hi SSS Detailing! I'd like a free quote.";
