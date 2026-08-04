import type { Ecosystem } from '@/types/content';

/**
 * The EverLoop umbrella.
 *
 * Rewritten 2026-08-02 after the Course Release Guide (F77–F80), the interview
 * answers on origin and attribution (F81–F83) and the Monday cross-check
 * (F84–F86). Cut roughly in half at Xiu Wen's request — the areas are now
 * two or three short paragraphs each, with the release lifecycle drawn rather
 * than described.
 *
 * FRAMING RULES ENFORCED HERE:
 *  - The decision to build in-house was the director's, not hers (F82). She is
 *    never shown making the build-versus-buy call for EverLoop. Contrast
 *    CAdmin, where she did write the evaluation (F45).
 *  - Only quizzes and e-Bucks are claimed as her idea (F83). Everything else is
 *    described without attributing origin.
 *  - No sync hour, no internal bug-report link, no example student names
 *    (sensitive register, 2026-08-02).
 *  - Still no impact or efficiency claim anywhere (F26).
 *
 * STILL MISSING, pending interview: what she would do differently across the
 * ecosystem, who else worked on it in roles, and the launch date.
 */
export const ecosystem: Ecosystem = {
  slug: 'everloop',
  navLabel: 'EverLoop Ecosystem',
  title: 'EverLoop Ecosystem',
  summary:
    'A connected learning platform for administrators, teachers, students and parents.',
  status: 'launched-ongoing',
  chips: ['product definition', 'multi-surface', 'requirements', 'QA'],

  overview: [
    'Students used to be on Thinkific. My director decided to build in-house instead, and that decision is how I was brought into technology work in the first place.',
    'It went live on 11 March 2025. For the first year it was three web developers and me, and nobody else.',
    'EverLoop is not one project. It is five connected surfaces — admin, teacher web and mobile, student and parent web and mobile — that all have to agree with each other, with communications running across them. Most of my work on it has been deciding what belongs on which surface, who is allowed to change what, and when a student can see it.',
  ],

  areas: [
    {
      id: 'platform',
      navLabel: 'Platform and users',
      heading: 'Platform and users',
      body: [
        'Student data is keyed in CAdmin, our centre management system. EverLoop reads it. The line I put at the top of the guide our admins work from is “CAdmin is the engine, EverLoop is the display” — because the practical instruction that follows is the whole point: fix the data in CAdmin and EverLoop updates itself. Never correct the same record in two places.',
        'Access, release timing and withdrawal all fall out of that one set of records rather than being maintained per surface.',
      ],
      parts: [
        {
          heading: 'Keeping two systems in agreement',
          body: [
      'The same student records kept going wrong across different centres — withdrawn students still in active lists, transfers not showing up, duplicate profiles for students who already existed. Each arrived as an individual complaint, and each could be fixed by hand, which is exactly why it took a while for anyone to ask whether they were the same problem.',
      'What changed my mind was the repetition. Data entry error looks random and clusters around particular people; these followed a consistent pattern, in the same way, in the same places. That points at the system’s data logic, not at the person typing.',
      'So I built the case with records rather than an opinion — the affected students, their class history, the withdrawal and transfer dates, and exactly where the wrong data surfaced — and set out what it was costing operationally. That reframed a list of complaints as one recurring data-integrity issue, and it got prioritised as one. Duplicate detection and prevention logic shipped; corrections still happen, but they are corrections rather than a queue.',
      'It turned out not to be confined to student lists. The same question kept surfacing everywhere the business had grown past a single centre — which outlet does this record belong to, and who should therefore be able to see it. A teacher working across three outlets receiving one combined timesheet. Announcements reaching families at the wrong branch. Staff able to see records from centres they do not work at. Different symptoms, one unresolved question, and it has been the most persistent design theme across every system we run.',
      'Naming the pattern is what changed how I write requirements. Anything multi-site now gets the ownership question answered explicitly up front — which outlet owns this record, who sees it, what happens when someone belongs to more than one — rather than discovered later through a complaint.',
          ],
        },
      ],
    },

    {
      id: 'delivery',
      navLabel: 'Product delivery',
      heading: 'Product delivery',
      parts: [
    {
      heading: 'How the work gets defined — and who tested it',
      body: [
        'Features are not all specified up front. The base gets built, and what should go into it next is worked out afterwards — that part is mine. I think through what the thing needs, write it up as items on our board, and it goes into a sprint with acceptance criteria attached.',
        'For most of that time I was also the QA. There was no dedicated tester on CAdmin or EverLoop until one joined in February 2026, so the person who wrote the requirement was the person who checked the build against it. That is why the acceptance stage on our board is named after me — it sat on top of testing I had already done. A QA now runs testing before it reaches that stage, and the stage still exists.',
      ],
    },
    {
      heading: 'Course release — and the sheet it replaced',
      body: [
        'Course release used to run through a shared Google request sheet: someone asked, someone else actioned it. It now keys strictly on the class start date held in CAdmin. Nothing appears early, nothing needs requesting, and if a parent logs in before day one they correctly see an empty course list.',
        'Academic continuity is a rule rather than a favour. A returning student keeps last year’s lessons, filtered to the months they were actually enrolled, and three levels of past papers and practice packs unlock for the same subject.',
      ],
    },
      ],
    },

    {
      id: 'content-access',
      navLabel: 'Content and access',
      heading: 'Content and access',
      parts: [
    {
      heading: 'Admin — content and course management',
      body: [
        'The admin side is the part nobody demos. I shaped the states a course moves through, who can change them, and what happens to student access when they do.',
        'It matters because of the volume. Thousands of course records across levels, subjects and terms, and every one has to reach the right students at the right time. Get the rule wrong and a child either loses material they paid for or sees next term’s work early.',
      ],
      visuals: [
        {
          src: '/images/everloop-admin-courses.webp',
          alt: 'The EverLoop admin course list, showing courses tagged by term, level and subject, with published status, public-access state, and archive and duplicate actions.',
          caption:
            'Every course carries a term, level, subject and tag, a published state and a separate public-access state — the two controls that decide what a student can open, and when.',
          width: 1440,
          height: 900,
        },
      ],
    },
    {
      heading: 'Access control and permissions',
      body: [
        'Every function is switched on or off per role. Sixty-two permissions across four roles is more than anyone can hold in their head, which is precisely why it needs testing rather than reasoning about.',
        'So I tested the boundaries deliberately rather than waiting for someone to find a gap — including whether restricted areas could be reached directly by anyone who knew the address.',
      ],
      visuals: [
        {
          src: '/images/everloop-access-management.webp',
          alt: 'The EverLoop access management matrix: platform functions listed down the left, four roles across the top, and a checkbox for each combination showing full, partial or no access.',
          caption:
            'Functions down the side, roles across the top. Partial states matter as much as on and off — most real permission bugs live in a role that has some of a function rather than all or none.',
          width: 1440,
          height: 900,
        },
      ],
    },
      ],
    },

    {
      id: 'learning',
      navLabel: 'Learning experience',
      heading: 'Learning experience',
      parts: [
    {
      heading: 'Courses and learning resources',
      body: [
        'Students use EverLoop for course content, videos, quizzes and revision materials. What a student can open at any moment is the product of the release rules above — the term, the level, the subject, the published state and the separate public-access state.',
      ],
      visuals: [
        {
          src: '/images/everloop-student-courses.webp',
          alt: 'The EverLoop student course library, showing course cards with lesson and chapter counts, filters for level, subject and course type, and a continue-learning prompt on each card.',
          caption:
            'What a student sees. Every card here is the product of a release rule — level, subject, term, start date — rather than of anyone deciding to grant access.',
          width: 1440,
          height: 900,
        },
      ],
    },
    {
      heading: 'Quizzes and e-Bucks',
      body: [
        'The in-app reward currency was my idea: students earn e-Bucks through quizzes, which gives practice a reason to happen outside class.',
        'It also taught me something about designing anything that pays out. The first version could be earned in a way we had not intended, including from a shared centre account, so a review step now sits between finishing a quiz and the currency being issued. Anything that awards value needs the payout gate designed at the same time as the reward, not after someone finds the gap.',
      ],
    },
    /*
     * Added 2026-08-04 (refinement doc §7). Placed here rather than as its own
     * case study, at Xiu Wen's instruction — it is a workflow inside EverLoop,
     * not a project beside it.
     *
     * It sits directly after "Quizzes and e-Bucks" because it is the second
     * gate on the same currency. The first is the review step above, which
     * exists because the reward could be gamed. This one exists because
     * rewarding completion was the wrong target. Two different problems, so
     * both are named rather than merged into one paragraph about e-Bucks.
     *
     * The refinement document offered a verification line crediting "the
     * developer and QA", marked "add only if accurate". Confirmed 2026-08-04:
     * there was no dedicated QA before February 2026, so she did the testing
     * herself. The line is included in that form — same fact, correct
     * attribution, and consistent with "who tested it" under Product delivery.
     */
    {
      heading: 'Topical quizzes and remedial learning',
      body: [
        'Topical quizzes are the practice students do on their own, mostly as multiple-choice questions. I helped define what happens after they submit: the system works out which questions they got wrong and assigns the explanation videos for those specific questions.',
        'The reward is what makes that stick. e-Bucks are held until the assigned videos have actually been watched, and skipping and fast-forwarding are disabled — so the currency is not paid for finishing the quiz, it is paid for going back over the thing you got wrong. A quiz that only reports a score tells a student what they do not know and then leaves them there.',
        'My contribution was the student workflow, the conditions the reward is released under, the viewing restrictions that make those conditions mean anything, and validating the end-to-end behaviour before release. There was no dedicated QA at the time, so that verification was mine: I checked that a wrong answer assigned the video that explained it, and that no e-Bucks appeared before the required viewing was finished.',
      ],
      diagram: 'topical-quiz',
      rules: [
        { term: 'Quiz format', definition: 'Mainly multiple-choice practice' },
        {
          term: 'Trigger',
          definition: 'Incorrect answers assign the relevant explanation videos',
        },
        { term: 'Video control', definition: 'Skipping and fast-forwarding are disabled' },
        {
          term: 'Reward condition',
          definition: 'e-Bucks are released only after the required videos are completed',
        },
      ],
    },
      ],
    },

    {
      id: 'reporting',
      navLabel: 'Reports and calendar',
      heading: 'Reports and calendar',
      parts: [
    {
      heading: 'Diagnostic and progress reports',
      body: [
        'Diagnostic reports were written by hand — thirty to forty-five minutes per student, per subject, per term, and the quality depended on how strong a writer each teacher happened to be.',
        'Parents never see it labelled as AI-generated, because by the time it reaches them it is the teacher’s professional judgement rather than the model’s.',
        'The part I got wrong first time was the form. Version 1.0 of my brief ruled out a Google Form; I reversed it in v1.1, because assessment topics change every year and the education team needed to change the form themselves rather than raise a ticket and wait.',
      ],
      visuals: [
        {
          /*
           * Deliberate exception to the no-name-lists rule in types/content.ts,
           * decided 2026-08-02 before the repository was made public.
           *
           * The roster is the point of the screenshot — the submission states
           * are what the caption is about — so cropping it would leave nothing
           * worth showing. The names are seeded on a test centre. Reviewed and
           * kept knowingly; not an oversight, and not a precedent for images
           * where the roster is incidental.
           */
          src: '/images/everloop-teacher-report-editor.webp',
          alt: 'The teacher’s report editor: a class roster down the left showing each student’s submission state, and a two-step wizard on the right with conduct criteria scored one to five.',
          caption:
            'The teacher’s side. The roster tracks who is submitted, acknowledged or still pending — chasing that by memory across five classes is how reports get missed.',
          width: 1440,
          height: 900,
        },
        {
          src: '/images/everloop-progress-report.webp',
          alt: 'The same report as a parent sees it: the child and class at the top, conduct scored out of five, and a teacher’s remarks section in continuous prose.',
          /* The AI-drafts-teacher-approves point is made in the paragraph
             above, in the flow diagram and in its caption. Four times was
             three too many (§7). */
          caption:
            'The parent’s side. The same report, with the conduct scores and the remarks the teacher signed off.',
          width: 1440,
          height: 900,
        },
      ],
    },
    {
      heading: 'Parent class calendar',
      status: 'prototype',
      body: [
        'Parents were getting their child’s weekly lessons as a broadcast notice. A personalised calendar is the obvious replacement, and the obvious build assembles the schedule on the device.',
        'I designed it the other way, and the constraint behind that is one I learned the hard way on the app launch: anything that has to change quickly cannot live behind a store release.',
        'The prototype ships with every awkward case pre-seeded: a suspended lesson, a class moved and moved back, a trial student, a public holiday, an outlet closure landing on top of a suspension. Reviewing a rule should not require setting it up first.',
      ],
      visuals: [
        {
          src: '/images/everloop-class-calendar.webp',
          alt: 'The class calendar prototype: a month grid on the left, a day’s lessons listed on the right with time, child, subject and outlet, and a panel of seeded test states along the far edge.',
          caption:
            'Working prototype, demo data. The panel on the right jumps straight to the cases that break calendars.',
          width: 1400,
          height: 800,
        },
      ],
    },
      ],
    },

    {
      id: 'writewise',
      navLabel: 'WriteWise',
      heading: 'AI-enabled learning — WriteWise',
      status: 'prototype',
      body: [
        'WriteWise scans a handwritten composition, transcribes it and produces feedback against the marking rubric, with the teacher in charge of everything the student sees.',
        'I built the prototype myself — product definition, application, database, tests and deployment — and hosted it on Railway with the code on GitHub. Our web developer is now taking it from that repository and integrating it into EverLoop, which is how it joins the ecosystem rather than sitting beside it.',
      ],
      link: { href: '/work/writewise/', label: 'Read the WriteWise case study' },
    },

    {
      id: 'outcomes',
      navLabel: 'Outcomes',
      heading: 'Outcomes',
      body: [
        /* The five surfaces are enumerated in the overview and drawn in the
           map above. Naming them a third time here was the repetition the
           brief asks to cut (§7). */
        'Live since 11 March 2025, replacing Thinkific, and still shipping. All five surfaces run on it, and the two mobile ones also ship as apps — four app-store listings between them.',
        'Two manual processes are gone rather than improved. Course release no longer runs through a shared request sheet, and diagnostic reports are no longer written by hand. A dedicated QA joined in February 2026, the first on either system.',
        'No adoption or usage figures, for the reason given in About: this shipped without instrumentation.',
      ],
    },

    {
      id: 'differently',
      navLabel: 'What I’d do differently',
      heading: 'What I’d do differently',
      body: [
        'Looking at the ecosystem as a whole rather than at any single feature, four things would change.',
        'Prioritise against the whole surface area, not the loudest request. A feature that touches admin, teacher, student and parent is four pieces of work and four sets of edge cases, not one. Ranking by what a change actually costs across the ecosystem would have kept a queue in which almost everything was urgent from behaving as if nothing was.',
        'Define success before building rather than after. EverLoop shipped without instrumentation, so what to build next came from what people reported rather than from what they did. I write measurable targets into briefs now; they belonged at the start.',
        'Validate across all four user groups earlier. They each see a version of the same thing, and for the first year I was the only person testing any of it. Putting a change in front of each group before release rather than after a complaint is the cheapest correction available.',
        'Write down the decision, not only the rule. The guide our admins work from explains what the system does; what it does not carry is why each rule was chosen over the alternative. That reasoning is what gets re-argued a year later, and it is cheapest to capture at the moment it is decided.',
      ],
    },
  ],
};
