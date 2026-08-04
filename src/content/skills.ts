import type { JourneyPhase, SkillGroup } from '@/types/content';

/** No ratings, bars or percentages anywhere — PRD §23. */
export const skillGroups: SkillGroup[] = [
  {
    heading: 'Product & delivery',
    items: [
      'Requirements gathering',
      'User stories',
      'Acceptance criteria',
      'Scope definition',
      'Sprint planning',
      'Release coordination',
      'Phased rollouts',
      'Pilot management',
      'Stakeholder communication',
      'Developer coordination',
    ],
  },
  {
    heading: 'Business analysis',
    items: [
      'Problem definition',
      'Root cause analysis',
      'Workflow mapping',
      'Process improvement',
      'User personas',
      'Stakeholder mapping',
      'Data integrity analysis',
      'Cross-system integration',
    ],
  },
  /*
   * Added 2026-08-04. These are the techniques behind the Masters in applied
   * research, listed as capability rather than left implied by a qualification
   * — a hiring manager can check "thematic coding" against the data-integrity
   * story on the EverLoop page, which is the one that shows it being used.
   */
  {
    heading: 'Research methods',
    items: [
      'Interview design',
      'Mixed-methods study design',
      'Thematic and qualitative coding',
      'Survey design',
      'Statistical analysis (SPSS)',
      'Qualitative analysis (MAXQDA)',
    ],
  },
  {
    heading: 'Quality & release',
    items: [
      'Test planning',
      'UAT coordination',
      'Defect reporting',
      'Release acceptance',
      'Production validation',
      'Permission and access testing',
      'App store submission',
    ],
  },
  {
    heading: 'Tools & platforms',
    items: [
      'Monday.com',
      'Notion',
      'Figma',
      'Slack',
      'Google Workspace',
      'Odoo',
      'Claude API',
      'TypeScript',
      'Git',
      'App Store Connect',
      'Google Play Console',
    ],
  },
];

/**
 * F19, F31, F30, F15, F12, plus the origin story added 2026-08-04
 * (PORTFOLIO_CAREER_ORIGIN_STORY.md).
 *
 * The director appears here and in About only — never in a case study (F45),
 * and the attribution stays as given: the director assigned the technology
 * projects and arranged the mentoring. Nothing here says she invented the role
 * for herself, and nothing overstates the franchise work beyond helping set the
 * outlet up and run it.
 *
 * The pre-2020 entries are deliberately three lines. They exist to answer "how
 * does someone running a tuition centre end up writing software requirements",
 * which is a fair question a recruiter will have — not to become a biography.
 */
export const journeySubtitle =
  'From helping set up a franchise outlet to shaping the systems behind a 20-centre business.';

/**
 * The Masters sits outside both phases because it genuinely spans them: it
 * started in 2021, during the operations-only years, and finished in 2026,
 * after both platforms had shipped. Slotting it into either group would put a
 * five-year commitment on one line of a chronology and lose the only thing
 * about it a hiring manager cares about — that it ran through all of it.
 */
export const journeyAlongside =
  'Throughout — a Master of Applied Research in Social Sciences, 2021 to 2026, taken alongside the day job. The thesis was a mixed-methods study of career aspirations among young workers.';

/**
 * Closes the timeline. Deliberately the only reflective line in it — the
 * entries themselves stay factual, and the meaning is drawn once, at the end,
 * where the dates have already made the case.
 */
export const journeyClosing =
  'I did not begin in product or technology. I began close to the work itself, and learned that the people who understand a problem most deeply are often the ones best placed to shape the solution.';

export const journey: JourneyPhase[] = [
  {
    label: 'Into operations',
    entries: [
      {
        year: 'Before 2020',
        body: 'Freelancing, alongside part-time and coaching work. I helped a friend’s employer set up and run an AGrader franchise outlet.',
      },
      {
        year: '2020',
        body: 'The business was affected during COVID-19 and the outlet was transferred back to AGrader headquarters. The director took it on, and offered me a full-time role.',
      },
      {
        year: 'July 2020',
        body: 'I accepted, and began managing centre operations full time. A practical decision about stability at the time — it turned out to be the ground everything since has been built on.',
        milestone: true,
      },
    ],
  },
  {
    label: 'Into product delivery',
    entries: [
      {
        year: '2024',
        /* "Still running" matters: the operations half never stopped, which is
           the whole argument About makes for why the requirements hold up. */
        /*
         * Aloysius is named at Xiu Wen's instruction, 2026-08-05 — the one
         * exception to the no-names rule (PRD §22), which exists to protect
         * students, parents and colleagues from exposure. This is a credit
         * rather than an exposure, and it is a first name only.
         */
        body: 'Still running centre operations. My director begins assigning technology projects, and arranges for Aloysius to mentor me in requirements, delivery and system thinking.',
        milestone: true,
      },
      {
        year: '2024',
        body: 'First platform milestone — the admin panel for course and content management.',
      },
      {
        year: '2024–25',
        body: 'Sprint delivery across the learning platform: quizzes, rewards, communications, public access.',
      },
      {
        year: '2025',
        body: 'EverLoop goes live, 11 March. Three web developers and me.',
        milestone: true,
      },
      {
        year: '2025',
        body: 'CAdmin V2 phased migration begins — testing in May, first launch in August.',
      },
      {
        year: '2025',
        body: 'Two apps listed on the App Store, December.',
        milestone: true,
      },
      {
        year: '2026',
        body: 'A QA joins in February, the first on either system. Current scope — five product surfaces, three developers, release acceptance.',
      },
    ],
  },
];
