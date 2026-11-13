import { Car, Sparkles, Droplets, Lightbulb, Waves, Square } from 'lucide-react';

export const SERVICES = [
  {
    id: 'full', group: 'core', icon: Car,
    title: 'Full Interior & Exterior Detailing',
    desc: 'Complete vehicle detailing covering both the inside and outside of your vehicle.',
    points: ['Full interior detail', 'Foam and hand wash', 'Wheels and tires', 'Finishing touches inside and out']
  },
  {
    id: 'interior', group: 'core', icon: Sparkles,
    title: 'Interior Detailing',
    desc: 'A deep clean for the cabin, from everyday dirt to heavily soiled interiors.',
    points: ['Vacuuming', 'Carpet and floorboard cleaning', 'Floor mat cleaning', 'Door panel cleaning', 'Steering wheel cleaning', 'Leather cleaning', 'Pet hair removal', 'Deep interior cleaning']
  },
  {
    id: 'exterior', group: 'core', icon: Droplets, img: '/images/foam-lexus.jpg',
    title: 'Exterior Detailing',
    desc: 'A thorough wash and finish that brings the shine back.',
    points: ['Foam wash', 'Hand wash', 'Exterior surface cleaning', 'Wheel cleaning', 'Tire cleaning and shine', 'Exterior finishing']
  },
  {
    id: 'headlight', group: 'core', icon: Lightbulb,
    title: 'Headlight Restoration',
    desc: 'Take cloudy, yellowed headlights back to clear through sanding, polishing and a protective finish.',
    points: ['Sanding', 'Polishing', 'Protective finish']
  },
  {
    id: 'pressure', group: 'extra', icon: Waves,
    title: 'Pressure Washing',
    desc: 'Exterior surface cleaning to make dirty surfaces look new again.',
    points: ['Exterior surface cleaning']
  },
  {
    id: 'window', group: 'extra', icon: Square,
    title: 'Window Cleaning',
    desc: 'Clean, clear windows with a streak-free finish.',
    points: ['Window cleaning']
  }
];

export const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => ({ id: s.id, label: s.id === 'full' ? 'Full Interior & Exterior Detail' : s.title })),
  { id: 'other', label: 'Other' }
];

export const VEHICLE_TYPES = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Van', 'Other'];
export const CONDITIONS = ['Lightly Dirty', 'Moderately Dirty', 'Heavily Soiled'];

export const SETS = [
  {
    id: 'door-panel', cat: 'Interior', service: 'Interior Detailing',
    title: 'Door Panel & Trim',
    alt: 'rear door panel of a pickup truck',
    before: '/images/door-panel-before.jpg', after: '/images/door-panel-after.jpg'
  },
  {
    id: 'rear-floor', cat: 'Interior', service: 'Pet Hair & Carpet Cleaning',
    title: 'Rear Floor & Carpet',
    alt: 'rear carpet of a pickup truck',
    before: '/images/rear-floor-before.jpg', after: '/images/rear-floor-after.jpg'
  },
  {
    id: 'wheel', cat: 'Exterior', service: 'Wheel & Tire Cleaning',
    title: 'Wheel & Tire',
    alt: 'Honda alloy wheel and tire',
    before: '/images/wheel-before.jpg', after: '/images/wheel-after.jpg'
  }
];
