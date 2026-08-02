import type { ExternalLink, SnapshotFact } from '@/types/content';

/**
 * Six verifiable facts. No percentages, no impact claims.
 * Each figure carries a qualifier so nothing is ambiguous.
 * Facts: F28, F22, M13, F12, F17/F70, F31.
 * Months figure raised 24 → 25 on 2026-08-02: the GitHub record shows unbroken
 * delivery 14 Jun 2024 → 31 Jul 2026, so 24 understated it (F70).
 */
export const snapshot: SnapshotFact[] = [
  { figure: '20', label: 'centres', qualifier: '11 company-owned, 9 franchise' },
  { figure: '4', label: 'apps live', qualifier: 'iOS and Android' },
  { figure: '5', label: 'product surfaces', qualifier: 'web and mobile, three user types' },
  { figure: '3', label: 'developers', qualifier: 'plus one QA' },
  { figure: '25', label: 'months', qualifier: 'of documented delivery' },
  { figure: '3 → 14', label: 'sprints', qualifier: 'each with a stated objective' },
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
