import type { MetadataRoute } from 'next';
import { caseStudies } from '@/content/caseStudies';
import { workEntries } from '@/content/navigation';
import { SITE_URL } from '@/content/site';

/**
 * Emitted as a static /sitemap.xml by `output: 'export'`.
 *
 * Built from caseStudies rather than a hand-written list, so a new case study
 * cannot ship indexed nowhere. That matters most for WriteWise, which is only
 * reachable from inside the EverLoop page — a crawler that gives up before that
 * link never sees it at all.
 *
 * URLs carry the trailing slash because next.config sets trailingSlash: true,
 * and a sitemap listing /work/erp against a site serving /work/erp/ advertises
 * a redirect on every entry.
 *
 * No lastModified. The honest value would be per-page git history; a build-time
 * timestamp would tell crawlers every page changed on every deploy, which is
 * both false and the reason they learn to ignore the field.
 */
/*
 * EverLoop and Product Experiments have their own route files rather than
 * coming from caseStudies, so they have to be named here. The assertion below
 * is what stops that from rotting.
 */
const STANDALONE = ['everloop', 'other'];

/* As in robots.ts — required for a metadata route to build into `out/`. */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = [
    { url: `${SITE_URL}/`, priority: 1 },
    ...caseStudies.map((study) => ({
      url: `${SITE_URL}/work/${study.slug}/`,
      priority: 0.8,
    })),
    ...STANDALONE.map((slug) => ({ url: `${SITE_URL}/work/${slug}/`, priority: 0.8 })),
  ];

  /*
   * Anything the rail links to must be in here. A page left out of the sitemap
   * fails silently — it renders, it just never gets found — so the build is the
   * only place this can be caught.
   */
  const listed = new Set(entries.map((entry) => entry.url));
  for (const entry of workEntries) {
    if (!listed.has(`${SITE_URL}${entry.href}`)) {
      throw new Error(`sitemap.ts: ${entry.href} is in the nav but not the sitemap`);
    }
  }

  return entries;
}
