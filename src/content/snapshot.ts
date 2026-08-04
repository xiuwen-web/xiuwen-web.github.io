import type { ExternalLink, SnapshotFact } from '@/types/content';

/**
 * Four verifiable facts. No percentages, no impact claims.
 * Each figure carries a qualifier so nothing is ambiguous.
 * Facts: F28, F22, M13, F16/F21.
 *
 * Cut from six to four on 2026-08-04, with the wording fixed by the refinement
 * document. Two changes matter:
 *
 *  - "4 apps live" is gone. There are two apps, published twice each; a
 *    recruiter counting App Store entries and a recruiter counting products
 *    were reading the same figure and getting different answers. The unit is
 *    the listing, and it says so.
 *  - The months and sprint-growth figures moved to the delivery log intro,
 *    where the entries they summarise actually are. They were evidence about
 *    the log, sitting four sections above it.
 */
export const snapshot: SnapshotFact[] = [
  { figure: '20', label: 'centres supported', qualifier: '11 company-owned, 9 franchise' },
  { figure: '4', label: 'app-store listings', qualifier: 'two apps across iOS and Android' },
  {
    figure: '5',
    label: 'product surfaces',
    qualifier: 'admin, teacher web and mobile, student web and mobile',
  },
  /*
   * "Final" is not in this label. It is accurate in the hero, where there is
   * room to say what the gate is; as a four-word metric it reads as sole
   * authority over the deploy, which is more than the record supports
   * (FINAL_REFINEMENT_BRIEF §14.15).
   */
  { figure: '1', label: 'business-validation gate', qualifier: 'before a release goes live' },
];

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
