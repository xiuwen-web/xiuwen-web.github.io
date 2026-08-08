import type { Principle, Profile } from '@/types/content';

/**
 * All copy here is approved in PORTFOLIO_CONTENT.md and traces to a numbered
 * fact in PORTFOLIO_DISCOVERY.md. No impact, efficiency or time-saved claim
 * appears anywhere on this site (F26).
 */
export const profile: Profile = {
  name: 'Xiu Wen',
  /*
   * Added 2026-08-05. Until then the surname appeared nowhere on the site —
   * only inside the email address and the LinkedIn slug — so a recruiter given
   * "Chng Xiu Wen" could not search their way here, and a reader who arrived
   * could not match the page against the résumé or the LinkedIn profile.
   *
   * Spelling taken from the résumé PDF, which prints CHNG XIU WEN. Singapore
   * convention, surname first.
   *
   * `name` stays the short form. It is the display identity in the rail and the
   * footer, where a full name would read as a letterhead rather than a person.
   * The full form is used where identity has to be unambiguous: the page title,
   * the structured data, and the introduction beside the portrait.
   */
  fullName: 'Chng Xiu Wen',
  role: 'Operations & Product Delivery',

  /*
   * The employment fact, stated plainly — added 2026-08-05.
   *
   * The site described capability everywhere and never once said what the job
   * is called or how long it has been held, which made "what is your actual
   * title?" the first question on any screening call. `role` above is
   * positioning; this is the record. Both are true and they are not the same
   * kind of statement, so they are kept apart rather than merged into one
   * hyphenated line that is neither.
   *
   * Modest title, substantial work: the case studies are right there to argue
   * the level. Hiding it would only move the conversation, not win it.
   */
  currentRole: {
    title: 'Tuition Centre Manager',
    employer: 'AGrader Learning Centre',
    since: 'July 2020',
  },
  employer: 'AGrader Learning Centre',
  location: 'Singapore',

  /*
   * F5, F28, F12, F21. Rewritten 2026-08-08.
   *
   * The previous line — "I turn operational problems into systems that work" —
   * was a claim of the class this page's own principles distrust: true, but
   * unfalsifiable, and interchangeable with any consultant's. It also named no
   * job, so a reader scrolling for one found three different answers and
   * settled on the smallest and most specific.
   *
   * This leads with position rather than with capability. "I work inside the
   * operation" is the fact that makes the second line credible and the one a
   * neighbouring candidate cannot copy — the requirements hold up because the
   * person writing them does the job they describe. Stating it first means the
   * operations half is the argument rather than the thing to look past.
   *
   * Note what it does not carry: the twenty-centre scope. That bound now rests
   * entirely on the credential row directly beneath and on the credibility
   * strip below it, so neither is optional any more.
   *
   * Two array entries, so the break falls between the sentences rather than
   * wherever the measure happens to put it.
   */
  heroHeadline: [
    'I work inside the operation.',
    'I turn frontline problems into systems you can rely on.',
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
  /*
   * Four verbs in the order the work happens: run it, specify it, coordinate
   * it, accept it. "Frontline" carries the scope the old line spent a clause
   * on, and the twenty centres now sit in the credibility strip directly
   * below, where a figure belongs.
   */
  /*
   * Cut to the delivery half on 2026-08-08. The headline now carries the
   * operations half and the twenty-centre scope, so repeating "frontline
   * operations" and "multiple centres" here said the same thing a third time
   * in a third register. What is left is the part the headline does not cover:
   * what she actually does to a release.
   *
   * "validate releases" rather than "sign off releases" — she is the business
   * validation, which is not sole authority over a production deploy.
   */
  heroSupport:
    'I define the requirements, coordinate the developers and QA, and validate the releases.',

  /*
   * The About narrative, restructured 2026-08-08 from a six-paragraph
   * biography into a positioning page (PORTFOLIO_ABOUT_PAGE_REVISION.md).
   *
   * The old shape front-loaded prose: a reader met six paragraphs before
   * reaching the one thing that actually explains the job, which is the
   * 40/40/20 split. The lede and the split now come first and the narrative
   * follows as named sections a reader can enter at any point.
   *
   * F5, F19, F20 still hold — every fact here was already on the page.
   */

  /** The whole position in one line. Everything under it is evidence for it. */
  aboutLede: 'I operate the business and help build the systems behind it.',

  /*
   * "Those two halves are about even" is gone. It was doing the 40/40/20
   * bar's job in words, and doing it less precisely — "even" reads as a
   * 50/50 split, which is not what the bar shows.
   */
  aboutSupport:
    'I manage operations at one of AGrader’s tuition centres while working on the systems used across the wider organisation. My role sits between frontline operations, product delivery and technology coordination — which means I often experience the problem first, define what needs to change, and help carry the solution through to release.',

  aboutSections: [
    {
      id: 'how-i-got-here',
      heading: 'How I got here',
      body: [
        'I did not originally set out to work in product or technology. My director began assigning technology projects to me and arranged for me to learn from someone experienced in the area. I started with requirements gathering, then moved into developer coordination, testing, rollout and delivery. Over time the role became a combination of operations and technology.',
      ],
    },
    {
      /*
       * The differentiator, and the reason the page is ordered the way it is.
       * It sits before the research section because the research explains the
       * method and this explains why the method has anything to work with.
       */
      id: 'why-operations',
      heading: 'Why operations still matters',
      body: [
        'The part I would not give up is operations. It is why the requirements I write tend to hold up: I am specifying systems for a job I do myself.',
        'Working close to teachers, parents, administrators and daily centre workflows gives me direct exposure to the friction behind a feature request. I am not only documenting what someone asks for — I am trying to understand why the problem exists, and whether the proposed solution will actually work in practice.',
      ],
    },
    {
      /*
       * Rewritten from the old education paragraph, which listed the degree,
       * the methods and the thesis and read as a CV entry. The qualification
       * itself is on the timeline and the résumé; what belongs here is what it
       * changed about how she works.
       */
      id: 'research',
      heading: 'How research shaped my approach',
      body: [
        'My background in psychology and applied research shaped how I approach product problems: observe behaviour, gather evidence, look for patterns, and separate symptoms from root causes. The same discipline applies when turning an operational complaint into something a developer can build from.',
        'Research taught me to be careful with assumptions. Operations taught me that even a technically correct solution can fail if it does not fit how people actually work.',
      ],
    },
  ],

  /*
   * The closing of the About narrative, and the last thing before the
   * capability lists. Replaces "I believe recurring problems deserve more than
   * temporary fixes. They deserve a system that makes the work clearer the
   * next time around." — same idea, half the words.
   *
   * Set larger with more space around it, not as a quotation. It is a working
   * principle, not a motto.
   */
  closingPrinciple: {
    line: 'Recurring problems deserve systems, not repeated fixes.',
    support: 'That principle sits behind most of the work I choose to do.',
  },

  timeSplit: [
    { label: 'Centre operations', value: 40 },
    { label: 'Project & product delivery', value: 40 },
    { label: 'Technology coordination', value: 20 },
  ],

  /*
   * The last thing anyone reads, so it says what the page has been building
   * towards rather than "let's connect". A pleasantry at the conversion point
   * asks the reader to work out what to do with the site they just read; a
   * statement of direction answers it.
   */
  contactLede:
    'I am interested in roles where operations, product delivery and technology meet.',

  // F37 — personal address. The work address never appears on this site.
  /*
   * Switched from a Yahoo address on 2026-08-05. Nothing was wrong with it
   * mechanically — but on a page whose whole argument is that she keeps
   * systems current, a Yahoo address is the one detail that quietly says
   * otherwise, and this one was already on her LinkedIn anyway.
   */
  email: 'chng.xiuwen01@gmail.com',
  /*
   * Nothing is served from here yet — see content/resume.ts. The path is the
   * published name rather than whatever the source file happened to be called,
   * because the filename is part of what gets exposed.
   */
  resumePath: '/documents/Xiu-Wen-Resume.pdf',
  photoPath: '/images/xiu-wen-profile.webp',
  photoAlt: 'Xiu Wen, Operations and Product Delivery',
};

/**
 * Principles I work by.
 *
 * Kept apart from the six method rules in the Process section, which are
 * techniques for writing a requirement. These are the beliefs underneath them,
 * and two lists of rules in the same section would cancel each other out.
 *
 * The last one carries no body on purpose. It is the conclusion the other
 * three arrive at, and explaining it would weaken it.
 */
export const principles: Principle[] = [
  {
    heading: 'Understand before building',
    body: 'A clear problem is worth more than a fast solution. Most of the rework I have seen was decided before anyone opened an editor.',
  },
  {
    heading: 'Design for reality',
    body: 'Workflows should reflect how people actually behave, not how a process diagram assumes they behave. The gap between those two is where systems get abandoned.',
  },
  {
    heading: 'Details are operational',
    body: 'A small edge case becomes a large problem once a system scales. At twenty centres, the case that happens rarely happens somewhere every week.',
  },
  { heading: 'Technology is only useful when people can trust it' },
];

/** Rendered only when a URL exists — see outstanding assets. */
export const socialLinks: { label: string; href: string }[] = [
  {
    label: 'LinkedIn',
    /*
     * Custom URL set by Xiu Wen on 2026-08-05, replacing the auto-generated
     * /in/chng-x-090171205. LinkedIn does not redirect the old slug — it
     * releases it — so anything still printing the old one is a dead link.
     * The résumé PDF is the outstanding case.
     */
    href: 'https://www.linkedin.com/in/chng-xiu-wen/',
  },
];
