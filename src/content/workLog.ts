import type { WorkLogGroup } from '@/types/content';

/**
 * Cut from fifty entries to twelve (directive 3, 2026-08-01). The full list is
 * in PORTFOLIO_CONTENT.md and in this file's git history; nothing was found to
 * be wrong, it was simply more than anyone would read.
 *
 * What survived the cut: work the case studies do not already describe, spread
 * across all five systems and every artefact kind. Anything already named in a
 * case study's "what I produced" was dropped as a duplicate — the mobile app
 * brief and the CAdmin system evaluation both go, because they are told
 * properly elsewhere.
 *
 * Every entry corresponds to a real document, test cycle, guide or release.
 * Titles are generalised where the original names an outlet, a person or an
 * internal system detail (PRD §22).
 */

export const workLogHeading = 'Selected delivery log';

/*
 * The months and sprint-growth figures were two of the six homepage metrics
 * until 2026-08-04. They are evidence about this log rather than about the
 * business, so they moved to sit with the entries they summarise (F70, F17).
 */
export const workLogIntro =
  'Five projects above, in depth. Behind them sit around fifty briefs, test cycles, guides and rollouts across 25 months of unbroken delivery, over sprints 3 to 14, each with a stated objective. Twelve are listed here — a sample rather than the archive.';

export const workLog: WorkLogGroup[] = [
  {
    system: 'EverLoop',
    note: 'Learning platform — student and teacher web, two mobile apps, communications',
    entries: [
      { year: '2024', title: 'User testing sessions, recorded', kind: 'Research' },
      { year: '2025', title: 'Course visibility and withdrawal logic', kind: 'Spec' },
      { year: '2026', title: 'Platform audit', kind: 'Analysis' },
    ],
  },
  {
    system: 'CAdmin',
    note: 'Centre management system — the rebuild and everything after it',
    entries: [
      { year: '2025', title: 'Attendance migration verification', kind: 'QA' },
      { year: '2026', title: 'Notification system blueprint', kind: 'Spec' },
      { year: '2026', title: 'Trial monitoring module — user feedback', kind: 'Research' },
    ],
  },
  {
    system: 'Mobile apps',
    note: 'Two apps to two stores — and everything publishing actually requires',
    entries: [
      { year: '2026', title: 'Internal rollout — onboarding operations staff', kind: 'Rollout' },
      { year: '2026', title: 'Licence agreement review', kind: 'Analysis' },
    ],
  },
  {
    system: 'Diagnostic reports',
    note: 'Replacing a paper reporting process across five interfaces',
    entries: [
      { year: '2026', title: 'Four user-flow drafts before final', kind: 'Design' },
      { year: '2026', title: 'Clickable prototypes — three surfaces', kind: 'Prototype' },
    ],
  },
  {
    system: 'ERP',
    note: 'Inventory and procurement — a dedicated developer built it, I specified and tested it',
    entries: [
      { year: '2026', title: 'Product family and variants — dev brief', kind: 'Spec' },
      { year: '2026', title: 'User operations handbook', kind: 'Guide' },
    ],
  },
];
