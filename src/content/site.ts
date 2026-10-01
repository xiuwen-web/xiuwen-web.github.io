/**
 * The one place the public origin is written down.
 *
 * It used to live as a private const inside layout.tsx, which was fine until
 * robots.txt and the sitemap needed it too — and a second copy of an origin is
 * how a site ends up half-canonicalised to an address it no longer uses. The
 * previous value pointed at a Vercel deployment that served an unrelated site,
 * so this constant has already been wrong once.
 *
 * GitHub Pages is the only host. A second auto-deployed copy on Railway
 * (wen-portfolio.up.railway.app) was retired on 2026-10-01; its canonical tags
 * pointed here, so any search engine that indexed it was already told this
 * origin is the authoritative one.
 */
export const SITE_URL = 'https://xiuwen-web.github.io';
