import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { getReviews, startReviewRefresh } from './services/reviews.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '../client/dist');
const app = express();

app.set('trust proxy', 1);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'upgrade-insecure-requests': null,
        'img-src': ["'self'", 'data:'],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com'],
        'frame-src': ['https://www.google.com']
      }
    }
  })
);
app.use(compression());

app.get('/healthz', (_req, res) => res.json({ ok: true }));

app.use('/api', rateLimit({ windowMs: 15 * 60e3, limit: 120, standardHeaders: true, legacyHeaders: false }));
app.get('/api/reviews', async (_req, res) => {
  res.set('Cache-Control', 'public, max-age=300');
  res.json(await getReviews());
});
app.get('/api/config', (_req, res) =>
  res.json({
    placeId: process.env.GOOGLE_PLACE_ID || null,
    mapsEmbedKey: process.env.GOOGLE_MAPS_EMBED_KEY || null
  })
);
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

app.use(
  express.static(dist, {
    maxAge: '7d',
    setHeaders: (res, p) => p.endsWith('.html') && res.setHeader('Cache-Control', 'no-cache')
  })
);
app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`SSS site running on port ${port}`);
  startReviewRefresh();
});
