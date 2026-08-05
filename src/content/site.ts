/**
 * The one place the public origin is written down.
 *
 * It used to live as a private const inside layout.tsx, which was fine until
 * robots.txt and the sitemap needed it too — and a second copy of an origin is
 * how a site ends up half-canonicalised to an address it no longer uses. The
 * previous value pointed at a Vercel deployment that served an unrelated site,
 * so this constant has already been wrong once.
 *
 * Note there is a second live copy of this site at wen-portfolio.up.railway.app,
 * auto-deployed from the same repository. That is deliberate and harmless: it
 * builds from these files too, so its canonical tags point back here and search
 * engines are told which of the two is authoritative.
 */
export const SITE_URL = 'https://xiuwen-web.github.io';
