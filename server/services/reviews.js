const hours = () => Number(process.env.REVIEWS_REFRESH_HOURS) || 6;
let cache = { data: null, at: 0 };

async function fetchFromGoogle() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const id = process.env.GOOGLE_PLACE_ID;
  if (!key || !id) return { configured: false, reviews: [] };

  const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(id)}`, {
    headers: {
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews'
    }
  });
  if (!res.ok) throw new Error(`Places API ${res.status}`);
  const p = await res.json();

  const reviews = (p.reviews || [])
    .map((r) => ({
      author: r.authorAttribution?.displayName || 'Google user',
      authorUri: r.authorAttribution?.uri || null,
      rating: r.rating,
      text: r.text?.text || r.originalText?.text || '',
      when: r.relativePublishTimeDescription || '',
      publishTime: r.publishTime || ''
    }))
    .sort((a, b) => (b.publishTime > a.publishTime ? 1 : -1));

  return {
    configured: true,
    rating: p.rating ?? null,
    total: p.userRatingCount ?? null,
    mapsUri: p.googleMapsUri || null,
    reviews,
    updatedAt: new Date().toISOString()
  };
}

export async function getReviews(force = false) {
  const fresh = Date.now() - cache.at < hours() * 3600e3;
  if (!force && cache.data && fresh) return cache.data;
  try {
    cache = { data: await fetchFromGoogle(), at: Date.now() };
  } catch (err) {
    console.error('Reviews refresh failed:', err.message);
    if (cache.data) return cache.data; // serve stale rather than nothing
    return { configured: true, error: true, reviews: [] };
  }
  return cache.data;
}

export function startReviewRefresh() {
  getReviews(true);
  setInterval(() => getReviews(true), hours() * 3600e3).unref();
}
