import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';

/**
 * Emitted as a static /robots.txt by `output: 'export'`.
 *
 * Everything here is public and meant to be found, including the résumé — the
 * published PDF is the redacted one, so there is nothing to hold back. The file
 * exists mainly to carry the sitemap line; without it a crawler has to discover
 * the case studies by following links from the homepage.
 */
/* Next 16 treats metadata routes as dynamic until told otherwise, and refuses
   to build them under `output: 'export'` without this. */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
