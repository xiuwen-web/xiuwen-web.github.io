import type { JourneyEntry, SkillGroup } from '@/types/content';

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
 * F19, F31, F30, F15, F12.
 * The director appears here and in About only — never in a case study (F45).
 */
export const journey: JourneyEntry[] = [
  {
    year: '2024',
    body: 'Centre operations. My director begins assigning technology projects, and arranges mentoring.',
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
];
