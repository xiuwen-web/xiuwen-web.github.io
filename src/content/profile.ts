import type { Profile } from '@/types/content';

/**
 * All copy here is approved in PORTFOLIO_CONTENT.md and traces to a numbered
 * fact in PORTFOLIO_DISCOVERY.md. No impact, efficiency or time-saved claim
 * appears anywhere on this site (F26).
 */
export const profile: Profile = {
  name: 'Xiu Wen',
  role: 'Operations & Product Delivery',
  employer: 'AGrader Learning Centre',
  location: 'Singapore',

  // F5, F28, F12, F21
  heroHeadline: [
    'I run tuition centre operations.',
    'I also specify the software that runs them.',
  ],
  /** Rail identity block. Xiu Wen's own line, supplied 2026-08-02. */
  tagline: 'Turning operational complexity into working digital products.',

  /*
   * Reworded 2026-08-04. The previous line opened "I'm the Operations Manager
   * at AGrader Learning Centre", which reads as chain-wide; About says plainly
   * that the operations half is one centre. Same facts, no implied scope.
   */
  heroSupport:
    'I manage centre operations at AGrader Learning Centre, a chain of 20 tuition centres in Singapore. I translate operational needs into software requirements, coordinate delivery across three developers and a QA, and provide the final business validation before a release goes live.',

  // F5, F19, F20
  about: [
    'I manage operations at one of AGrader’s tuition centres, and I work on the systems the whole chain runs on. Those two halves are about even.',
    'Roughly 40% of my time goes to centre operations — teachers, parents, and the things that go wrong on a Tuesday morning. Another 40% goes to project and product delivery: requirements, coordinating developers, testing, rollouts. The remaining 20% is technology coordination, testing and documentation. That balance shifts when a release is going out or something breaks.',
    'I did not set out to do this. My director started assigning technology projects to me and arranged for me to learn from someone experienced in the area. I took it from there — requirements gathering, then developer coordination, then testing and delivery — until the role had become an operations and technology one.',
    'The part I would not give up is the operations half. It is why the requirements I write tend to hold up: I am specifying systems for a job I do myself.',
  ],

  timeSplit: [
    { label: 'Centre operations', value: 40 },
    { label: 'Project & product delivery', value: 40 },
    { label: 'Technology coordination', value: 20 },
  ],

  // F37 — personal address. The work address never appears on this site.
  email: 'xwchng@yahoo.com',
  resumePath: '/resume/xiu-wen-cv.pdf',
  photoPath: '/images/xiu-wen.jpg',
  photoAlt: 'Xiu Wen',
};

/** Rendered only when a URL exists — see outstanding assets. */
export const socialLinks: { label: string; href: string }[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/chng-x-090171205/',
  },
];
