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
   * Reworded 2026-08-04 to Xiu Wen's own text, tidied. Three claims are
   * deliberately bounded (FINAL_REFINEMENT_BRIEF §1, §14.15):
   *
   *  - "running operations at one of the outlets" — she does not oversee all
   *    twenty. The chain is the scale of the systems, not of her remit.
   *  - "coordinate delivery across developers and QA" — no head count and no
   *    possessive. Coordinating delivery is not a reporting line.
   *  - "provide the final business validation" — she is the business sign-off,
   *    which is not the same as solely authorising a production deploy.
   *
   * Kept in the present tense, like every other sentence on the site.
   */
  heroSupport:
    'I work at AGrader Learning Centre, a chain of 20 tuition centres in Singapore, running operations at one of the outlets. I translate operational needs into software requirements, coordinate delivery across developers and QA, and provide the final business validation before releases go live.',

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
  /*
   * Nothing is served from here yet — see content/resume.ts. The path is the
   * published name rather than whatever the source file happened to be called,
   * because the filename is part of what gets exposed.
   */
  resumePath: '/documents/Xiu-Wen-Resume.pdf',
  photoPath: '/images/xiu-wen-profile.webp',
  photoAlt: 'Xiu Wen, Operations and Product Delivery',
};

/** Rendered only when a URL exists — see outstanding assets. */
export const socialLinks: { label: string; href: string }[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/chng-x-090171205/',
  },
];
