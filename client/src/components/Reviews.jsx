import { useEffect, useState } from 'react';
import { BIZ } from '../config.js';

export default function Reviews() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ error: true, reviews: [] }));
  }, []);

  const reviews = data?.reviews || [];
  const placeId = null; // review link comes from the Google Maps listing below
  const readAll = data?.mapsUri || BIZ.maps;

  return (
    <section className="alt" id="reviews">
      <div className="wrap">
        <p className="eyebrow">Customer Reviews</p>
        <h2>What Customers Say on Google</h2>
        {data?.rating && (
          <p className="rating"><b>{data.rating.toFixed(1)}</b> ★ <span className="muted">from {data.total} Google reviews</span></p>
        )}

        {reviews.length > 0 ? (
          <div className="rev-row">
            {reviews.map((r, i) => (
              <article className="card rev" key={i}>
                <div className="stars" aria-label={`${r.rating} out of 5 stars`}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                <p>{r.text || '(Rating only)'}</p>
                <footer>
                  <b>{r.author}</b>
                  <span className="muted">{r.when}</span>
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <div className="card">
            <p>{data ? 'Our Google reviews will appear here soon.' : 'Loading reviews…'} You can always read them directly on Google.</p>
          </div>
        )}

        <p className="muted small">Reviews from Google. Updated periodically and may not show every review.</p>
        <div className="btns">
          <a className="btn btn-primary" href={readAll} target="_blank" rel="noopener noreferrer">Read All Google Reviews</a>
          <a className="btn btn-ghost" href={BIZ.maps} target="_blank" rel="noopener noreferrer">Leave Us a Google Review</a>
        </div>
      </div>
    </section>
  );
}
