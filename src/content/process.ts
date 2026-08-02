import type { FlowStep, MethodRule, Specimen, TraceStep } from '@/types/content';

/**
 * The real delivery pipeline (F16, F21). Recreated as a diagram — never a
 * screenshot of the actual board (PRD §22, mock-ups only).
 *
 * Exactly one stage is emphasised. One emphasis, so it lands.
 */
export const pipeline: FlowStep[] = [
  { title: 'Backlog' },
  { title: 'Ready to start' },
  { title: 'In progress' },
  { title: 'Ready for QA' },
  { title: 'QA testing' },
  { title: 'Revision' },
  { title: 'Ready for final check' },
  { title: 'Acceptance review', status: 'mine' },
  { title: 'Final testing' },
  { title: 'Pending deploy' },
  { title: 'Store review' },
  { title: 'Deployed' },
  { title: 'Done', status: 'shipped' },
];

export const processIntro =
  'Every change goes through the same path, from an idea or a reported problem to something running in production. I sit at the point where it gets accepted.';

export const pipelineCaption =
  'On our actual board, that stage is named after me. It sits after QA testing and before deployment — I check what QA has finished testing, and decide whether it goes out.';

/**
 * F79/F81 — how a requirement actually gets written.
 *
 * Replaced a twelve-item list of artefact nouns on 2026-08-02. Every candidate
 * for these roles claims user stories and acceptance criteria; a method is the
 * more hireable thing, and this one is drawn from the written record rather
 * than composed for the site.
 */
export const methodIntro =
  'Most of my work happens before anyone writes code. A requirement that is precise enough the first time costs a conversation; one that is not costs a build. Six things I do every time:';

export const method: MethodRule[] = [
  {
    heading: 'Start from what I watched, not what I was told',
    body: 'Requests arrive already shaped as solutions. I go back to the observation — a screen recording, a conversation with the person doing the job, the date it happened — and write that down first, so the reasoning can be checked later by someone who was not there.',
  },
  {
    heading: 'Give options and a recommendation, not a decree',
    body: 'Where there are several reasonable designs, I write them out, say which I would choose and why, then ask the developers which is more sensible to build. They know the implementation cost and I do not. A recommendation invites that expertise; an instruction wastes it.',
  },
  {
    heading: 'Specify what should not happen',
    body: 'Most rework I have seen comes from unstated cases, not wrong ones. So the spec says what a user with only one outlet sees, and what happens to records already in the target state. The negative case is where the ambiguity actually lives.',
  },
  {
    heading: 'Write the words the user will read',
    body: 'If a confirmation dialog is needed, I write the sentence that goes in it. Interface copy carries the meaning of the feature, and leaving it as "add a confirmation" hands a product decision to whoever is closest to the keyboard at the time.',
  },
  {
    heading: 'Acceptance criteria are the contract',
    body: 'Every requirement ends in a list of things that must be demonstrably true. That list is what I check against at the acceptance review, so the standard the work is judged by is agreed before it starts rather than argued about afterwards.',
  },
  {
    heading: 'Name the outcome, not the mechanism',
    body: 'A feature named after its operational result is understood by everyone who has to use it. Named after its implementation, it is understood only by the people who built it — and it quietly narrows what the feature is allowed to become.',
  },
];

/**
 * A recreated requirement (F13 — recreated, never the real document).
 * Structure, section order and reasoning are faithful to one written in
 * July 2026; the product specifics are neutralised.
 */
export const specimenIntro =
  'One of mine, recreated. The internal document is confidential, so this is rebuilt with the same structure and reasoning and the identifying detail removed — an ordinary request that turns out to have a rule problem underneath it.';

export const specimen: Specimen = {
  title: 'Automated Public Course Rollover',
  standfirst:
    'Some courses are published to a public resources page so prospective parents can see the material. The request was to stop having to unpublish them by hand each year.',
  sections: [
    {
      heading: 'Current behaviour',
      lines: [
        'An admin marks selected courses as publicly visible, term by term.',
        'When a new academic year starts, they must find every course from the previous terms and remove public access from each one individually.',
        'This is repetitive and easy to get wrong. Any course overlooked stays publicly listed — last year’s material, still presented as current.',
      ],
    },
    {
      heading: 'Proposed behaviour',
      lines: [
        'Each public course carries its academic year and term alongside its public-access flag.',
        'A course appears publicly only if it is from the current academic year, within the released term, and marked as public.',
        'When a new academic year begins, courses from the previous year lose public visibility automatically.',
      ],
    },
    {
      heading: 'Worked example',
      lines: [
        'On the last day of the academic year: Term 2, Term 3 and Term 4 courses are all publicly visible.',
        'On the first day of the new one: all of them are unpublished automatically, and only the new Term 1 courses the admin has selected appear.',
      ],
    },
    {
      heading: 'Business rules',
      lines: [
        'Changing the public term must not delete or archive the course.',
        'Students already enrolled keep their access — this affects public visibility only.',
        'Courses from previous years must not reappear unless someone republishes them deliberately.',
        'Manual publish and unpublish stay available; the automation is not a lock.',
        'Scheduled changes run in local time, not the server’s.',
      ],
    },
    {
      heading: 'Acceptance criteria',
      lines: [
        'An admin can set the current academic year and the released term.',
        'An admin can set a public release date and an expiry date.',
        'Courses from the previous academic year are no longer publicly visible once the new year begins.',
        'Existing student access is unaffected.',
        'An admin can override the automation for an individual course.',
        'Every visibility change records the date, the time and who or what made it.',
        'An admin can preview exactly which courses will be published and unpublished before confirming.',
      ],
    },
  ],
  footnote:
    'The last two criteria are the ones that matter. A preview exists because an automation that silently changes what the public can see is one nobody will trust enough to switch on — and the audit line exists because the first question when something disappears is always who removed it.',
};

/**
 * The spec-to-shipped chain (F63, F65, F67, F75, F84, F87).
 *
 * The diagnostic report is the one project that closes end to end: a versioned
 * brief exists, the delivery board carries an item per surface and every one is
 * Done, and two of the resulting screens are already published on this site.
 *
 * No board screenshot and no brief screenshot — both internal (PRD §22). What
 * is published is the shape of the work: how many items, which surfaces, in
 * what order. Counts are from the board itself, not from memory.
 */
export const traceIntro =
  'The section above describes how I write a requirement. This is one followed all the way through — the same piece of work at four points where evidence exists rather than assertion.';

export const traceTitle = 'One requirement, end to end';

export const traceSubject = 'Digital diagnostic reports';

export const trace: TraceStep[] = [
  {
    stage: 'Written',
    artefact: 'Project brief, v1.0 → v1.1',
    detail:
      'A versioned brief with a changelog: the problem quantified at thirty to forty-five minutes per student per subject per term, an eight-step flow across three surfaces, an in and out of scope table, eight risks each with a mitigation, and a four-phase timeline. Version 1.1 records a reversal — Google Forms moved from out of scope to in, because assessment topics change yearly and the education team had to be able to change the form without waiting on a developer.',
    items: ['8-step flow', 'in/out of scope', '8 risks + mitigations', '4 phases', 'changelog'],
  },
  {
    stage: 'Designed',
    artefact: 'Four flow drafts, three clickable prototypes',
    detail:
      'Four numbered user-flow drafts before a final, a user-stories sheet, and hand-built clickable prototypes for admin web, teacher web and teacher mobile — so the flow could be walked before anything was built.',
    items: ['admin web', 'teacher web', 'teacher mobile'],
  },
  {
    stage: 'Delivered',
    artefact: 'Five board items, one per surface',
    detail:
      'On the delivery board this is not one ticket. It is five, one for each surface it has to land on, plus a later round of enhancement items. All are Done. That is what "one feature, five surfaces" costs, and it is the reason prioritisation across the ecosystem matters more than prioritisation within a feature.',
    items: [
      'Admin',
      'Teacher web',
      'Student web',
      'Teacher mobile',
      'Student mobile',
      '+ enhancements',
    ],
  },
  {
    stage: 'Accepted and shipped',
    artefact: 'Acceptance review, then live',
    detail:
      'Each build was checked against the acceptance criteria in the brief before release. There was no dedicated QA at the time, so the person who wrote the requirement was the person who verified it. Two of the resulting screens — the teacher’s editor and the report a parent opens — are on this site.',
    items: ['acceptance criteria', 'teacher editor', 'parent report'],
  },
];

/**
 * The honest metrics gap, approved as decision D-B.
 * Stated as a professional observation — not an apology, and not a
 * complaint about the employer.
 */
export const measureHeading = 'What I’d measure';

export const measureBody: string[] = [
  'There are no results figures on this page. Not because I don’t think in measures — the last project brief I wrote defined eight of them, including how fast a webhook has to deliver, what share of parents should open a report within 48 hours, and what percentage of teachers edit the AI draft before sending it. That last one is the honest proxy for whether they trust it.',
  'What I don’t have is measured outcomes for the systems that shipped before I started writing targets into briefs. We didn’t instrument them, so any number I put here would be reconstructed rather than recorded, and I would rather leave the space empty than fill it with something I can’t stand behind.',
  'That gap is the first thing I would close.',
];
