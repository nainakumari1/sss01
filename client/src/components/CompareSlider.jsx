import { useState } from 'react';

export default function CompareSlider({ before, after, alt, className = '' }) {
  const [pos, setPos] = useState(50);
  return (
    <div className={`cmp ${className}`} style={{ '--pos': `${pos}%` }}>
      <img src={after} alt={`After: ${alt}`} loading="lazy" draggable="false" />
      <img className="cmp-before" src={before} alt={`Before: ${alt}`} loading="lazy" draggable="false" />
      <span className="tag tag-b">Before</span>
      <span className="tag tag-a">After</span>
      <div className="cmp-line"><span>‹ ›</span></div>
      <input
        type="range" min="0" max="100" value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Drag to compare before and after"
      />
    </div>
  );
}
