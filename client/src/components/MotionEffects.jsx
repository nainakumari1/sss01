import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Adds lightweight reveal-on-scroll motion without requiring an animation library.
export default function MotionEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll(
      '.hero-in > div, .hero-img, section .wrap > .eyebrow, section .wrap > h2, .grid3 > *, .grid2 > *, .gal-grid > *, .band-in > *, .about > *, .map-grid > *, .final .wrap, .gal-card'
    );

    if (reduceMotion) {
      targets.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      targets.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    targets.forEach((element, index) => {
      element.classList.add('reveal');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 75}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
