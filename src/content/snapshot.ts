import type { ExternalLink, SnapshotFact } from '@/types/content';

/**
 * Four verifiable facts. No percentages, no impact claims.
 * Facts: F28, M13, F16/F21.
 *
 * Rewritten 2026-08-04 as a credibility strip: every figure is now paired with
 * the scope it covers rather than left as a bare count. "20" on its own is a
 * number; "20 centres — systems and workflows supported" is a claim about
 * reach, and it is the second one a recruiter can act on.
 *
 * Two figures were cut rather than reworded. "25 months of delivery" moved to
 * the delivery log intro, where the entries it summarises are — a duration is
 * weak evidence on its own, and it was four sections from anything supporting
 * it. "4 app-store listings" went because the Live now block immediately above
 * lists all four with their release dates and links; the number added nothing
 * the reader could not already click.
 */
export const snapshot: SnapshotFact[] = [
  { figure: '20', label: 'centres', qualifier: 'systems and workflows supported' },
  { figure: '2', label: 'internal platforms', qualifier: 'CAdmin and EverLoop' },
  {
    figure: '5',
    label: 'user surfaces',
    qualifier: 'admin, teacher and student, web and mobile',
  },
  /*
   * Three developers and one QA, not four developers. The QA joined in
   * February 2026 and is the first on either system; every case study says
   * three, and a team size is the kind of figure someone checks.
   */
  { figure: '3 + 1', label: 'developers and QA', qualifier: 'the delivery team I coordinate' },
];

/**
 * The claim the four figures add up to, given its own line rather than a fifth
 * card. "End to end" is not a quantity, and set in 24px mono beside four
 * numerals it reads as a broken statistic; as a sentence under them it reads
 * as the point.
 *
 * It also replaces the old "1 business-validation gate" card, which said the
 * same thing in a shape that implied sole authority over the deploy.
 */
export const snapshotClosing =
  'End to end — I take work from requirements through QA to release acceptance.';

/**
 * The verifiable anchor of the whole site (F22, F23).
 * A recruiter can confirm these in ten seconds without trusting a word here.
 */
export const appLinks: ExternalLink[] = [
  {
    label: 'AGrader LC: Online App',
    href: 'https://apps.apple.com/sg/app/agrader-lc-online-app/id6754583802',
    note: 'iOS · released 13 Dec 2025',
  },
  {
    label: 'AGrader EverLoop',
    href: 'https://play.google.com/store/apps/details?id=sg.agrader.everloop',
    note: 'Android · released 10 Dec 2025',
  },
  {
    label: 'AGrader Teacher',
    href: 'https://apps.apple.com/sg/app/agrader-teacher/id6758031598',
    note: 'iOS · released 2 Mar 2026',
  },
  {
    label: 'AGrader Teacher',
    href: 'https://play.google.com/store/apps/details?id=sg.agrader.teacher',
    note: 'Android · released 19 Feb 2026',
  },
];
