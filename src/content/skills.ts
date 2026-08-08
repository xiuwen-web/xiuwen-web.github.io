import type { JourneyPhase, SkillGroup } from '@/types/content';

/**
 * Capabilities. No ratings, bars or percentages anywhere — PRD §23.
 *
 * Cut from five groups of eight to eleven items down to four groups on
 * 2026-08-08 (PORTFOLIO_ABOUT_PAGE_REVISION.md §9). The old list read as a
 * keyword dump: "user personas", "stakeholder mapping" and "pilot management"
 * are all real, all evidenced in the case studies, and all indistinguishable
 * from every other list of the same words. What is left is the shape of the
 * job — define it, analyse it, ship it, and the research method underneath.
 *
 * The research group keeps SPSS and MAXQDA because a named instrument is what
 * makes "statistical analysis" checkable rather than aspirational.
 */
export const skillGroups: SkillGroup[] = [
  {
    heading: 'Product & delivery',
    items: [
      'Requirements',
      'User stories',
      'Acceptance criteria',
      'Scope definition',
      'Release planning',
      'Phased rollout',
      'Developer coordination',
      'Stakeholder communication',
    ],
  },
  {
    heading: 'Business analysis',
    items: [
      'Problem framing',
      'Root-cause analysis',
      'Workflow mapping',
      'Process improvement',
      'Data integrity',
      'Cross-system integration',
    ],
  },
  {
    heading: 'Quality & release',
    items: [
      'UAT',
      'Defect reporting',
      'Release acceptance',
      'Production validation',
      'Permission and access testing',
      'App-store delivery',
    ],
  },
  {
    heading: 'Research',
    items: [
      'Mixed methods',
      'Interviews',
      'Thematic analysis',
      'Survey design',
      'Statistical analysis',
      'SPSS',
      'MAXQDA',
    ],
  },
];

/**
 * Tools, grouped by what they are for.
 *
 * Split out of the old "Tools & platforms" skill group, which ran eleven
 * product names in one line — Monday.com next to TypeScript next to Google
 * Workspace — and invited a reader to guess at the depth of each.
 */
export const toolGroups: SkillGroup[] = [
  {
    heading: 'Planning & collaboration',
    items: ['Notion', 'Monday.com', 'Figma', 'Slack', 'Google Workspace'],
  },
  { heading: 'Delivery & release', items: ['Git', 'App Store Connect', 'Google Play Console'] },
  { heading: 'Business systems', items: ['Odoo'] },
  { heading: 'AI & prototyping', items: ['Claude API'] },
];

/**
 * TypeScript, stated as exposure rather than as a capability.
 *
 * It was listed beside Figma and Slack as though it were another tool she
 * works in. The WriteWise case study is explicit about where the line falls —
 * "Claude wrote the code; the product definition, the workflows, the role
 * model and the data decisions are mine" — so a plain TypeScript entry claims
 * more than the page itself does, on the one page arguing that its claims can
 * be checked. Named here, in the weakest available frame, because she did
 * specify, build, deploy and hand over a working application and pretending
 * otherwise would be its own distortion.
 */
export const technicalExposure = {
  label: 'Technical exposure',
  items: ['TypeScript'],
  note: 'Prototyping only — I specify and validate software, I am not a developer.',
};

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
/*
 * "2021 to 2026" until 2026-08-05, which disagreed with the LinkedIn profile's
 * January 2021 – December 2025. Both were describing something true: the
 * programme finished in December 2025 and the degree was conferred in 2026.
 * Picking either one on its own leaves a date a reader can check and find
 * wrong, so it now says both.
 */
export const journeyAlongside =
  'Throughout — a Master of Applied Research in Social Sciences, 2021 to 2025, conferred in 2026, taken alongside the day job. The thesis was a mixed-methods study of career aspirations among young workers.';

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
      /*
       * Months added 2026-08-05, on four entries and no others. Each is
       * evidenced: the launch date recorded twice in ecosystem.ts, the testing
       * month and the QA month already stated in these bodies, and the store
       * release dates in snapshot.ts. The earlier entries keep bare years
       * because no month is on record for them, and a timeline that guesses at
       * precision is worse than one that varies in it.
       *
       * Where the month moved up into the label it comes out of the body, so
       * the same fact is not stated twice on one line.
       */
      {
        year: 'March 2025',
        body: 'EverLoop goes live. Three web developers and me.',
        milestone: true,
      },
      {
        year: 'May 2025',
        body: 'CAdmin V2 phased migration begins. First launch in August.',
      },
      {
        /*
         * Was "Two apps listed on the App Store, December", which was wrong
         * twice: only the iOS listing is on the App Store — the other is
         * Google Play — and it is one product on two stores rather than two
         * products. snapshot.ts has both dates, 13 and 10 December 2025.
         */
        year: 'December 2025',
        body: 'The student app goes live on both stores, iOS and Android.',
        milestone: true,
      },
      {
        year: 'February 2026',
        body: 'The first QA on either system joins. Current scope — five product surfaces, three developers, release acceptance.',
      },
    ],
  },
];
