import type { CaseStudy, SupportingCard } from '@/types/content';
import { appLinks } from "./snapshot";

/**
 * Approved copy from PORTFOLIO_CONTENT.md.
 *
 * Framing rules enforced here (PRD §12):
 *  - "defined / coordinated / configured", never "developed"        (F11)
 *  - CS-3 phasing is her own decision                               (F42, F45)
 *  - CS-4 described at the level she gave it, no dramatisation      (F44)
 *  - no impact, efficiency or time-saved claims anywhere            (F26)
 *  - no student, parent, teacher or colleague names                 (PRD §22)
 */

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-1",
    slug: "mobile-launch",
    navLabel: "Mobile Product Launch",
    title: "From web platform to four app-store listings",
    summary:
      "Took our web learning platform to a shipped mobile product. Two apps across iOS and Android — four listings, all live. The student app launched in December 2025, the teacher app in early 2026.",
    status: "launched",
    chips: [
      "product definition",
      "release management",
      "app store submission",
      "3 developers",
    ],
    context: [
      "EverLoop is our learning platform. Students use it for course content, videos, quizzes and revision materials; parents use it to follow their child’s progress. It worked on the web, but parents were checking it on their phones, and a browser is not where people live.",
    ],
    problem: [
      "Moving a web platform to mobile is not a port. A phone screen forces you to decide what actually earns its place, and everything you bring across makes the app slower to use for the things people open it for.",
    ],
    role: [
      "Wrote the dev brief and the feature breakdown for both apps",
      "Made the case for building them — the parent view and the business view",
      "Coordinated three developers across iOS and Android",
      "Tested builds, recorded the faults, ran the acceptance review before each release",
      "Set up the developer organisation account and took both apps through review to listing",
      "Wrote the privacy policy, the store descriptions and the review demo, and reviewed the licence agreements",
    ],
    involved:
      "Three developers and the centre teams who would use the teacher app. There was no dedicated QA at the time — I did the testing myself. One joined in February 2026, after these apps were live.",
    constraints: [
      "A small team building for two platforms at once",
      "App store review timelines we did not control",
      "The web platform kept shipping throughout — mobile could not freeze it",
    ],
    decisions: [
      {
        heading: "Two separate apps, not one that switches by role",
        body: [
          "Students and teachers barely overlap. One app is learning content, videos, quizzes and reports; the other is attendance, student records and classroom administration.",
          "Role switching would have put every teacher-only function inside the app a student had installed, guarded by a permission check. Separating them meant that data was never in there to begin with.",
        ],
      },
      {
        heading: "Time-sensitive tasks on mobile. Heavy admin stays on the web",
        body: [
          "Course management, bulk uploads and configuration did not come across — those are jobs people do sitting down, with a keyboard.",
          "The argument was about teachers. Every request for more mobile functionality was reasonable on its own; together they would have made the app slower for the things teachers actually open between classes. Essential in-class tasks first, the rest on the web.",
        ],
      },
    ],
    produced:
      "A dev brief and feature scope for both apps, wireframes and a design guide, screen-recorded test evidence, and the release acceptance for each build. Then everything publishing actually requires and nobody mentions: the developer organisation account, a privacy policy, store descriptions, the visual assets for two listings, a navigation demo for app review, and the licence agreements.",
    outcome: [
      "Four listings, live and public. The student app launched first, in December 2025; the teacher app followed on Android in February 2026 and on iOS in March. Both were updated again in July 2026 — the student app now on version 1.4.0, the teacher app on 1.3.0 — so both have kept shipping since launch.",
    ],
    outcomeLinks: appLinks,
    /*
     * Store galleries, captured from the public listings on 2026-08-02. These
     * are AGrader's own published marketing assets, which is the one image
     * source the confidentiality rules allow besides Xiu Wen's own builds
     * (D3) — nothing here is a production system screenshot.
     */
    launch: {
      body: [
        'Publishing is its own project. Beyond the builds there was a developer organisation account to set up, a privacy policy to write, store descriptions and visual assets for four listings, a navigation demo so a reviewer who has never seen the product can find their way through it, and licence agreements to read.',
      ],
      visuals: [
        {
          src: '/images/agrader-student-app-store.webp',
          alt: 'The AGrader LC student app listing on the App Store, showing four marketing screenshots: announcements, messaging teachers, the EverLoop modules library, and worksheet access.',
          caption:
            'The student and parent app as it appears on the App Store. Announcements, teacher messaging, the modules library and worksheets — the same platform, decided down to what earns a place on a phone.',
          width: 1108,
          height: 549,
        },
        {
          src: '/images/agrader-teacher-app-store.webp',
          alt: 'The AGrader Teacher app listing on the App Store, showing four marketing screenshots: class resources, switching between outlets, EverLoop courses, and teacher announcements.',
          caption:
            'The teacher app. Switching between outlets is the second panel — the multi-outlet question again, this time as a feature rather than a defect.',
          width: 1108,
          height: 549,
        },
      ],
    },
    visual: {
      src: "/images/everloop-student-courses.webp",
      alt: "The EverLoop student course library, showing course cards with lesson and chapter counts, filters for level, subject and course type, and a continue-learning prompt on each card.",
      caption:
        "The web platform the apps were built from. Deciding what earned a place on a phone meant deciding which of this a parent actually opens between school pickup and dinner.",
      width: 1440,
      height: 900,
    },
    measurement: {
      body: [
        "There is no adoption or usage figure for these apps, because none was ever collected. Instrumentation did not go in before release, so there is nothing recorded to report here.",
        "What to instrument is a release decision, not a later one. It costs very little at the time and cannot be recovered afterwards, which is the whole argument for making it early.",
      ],
    },
    lessons:
      "Usage tracking goes in before release, not after it. We shipped without a way to see which features people actually open, which means what to build next rests on what users say rather than what they do. That is the first thing I set up next time.",
  },

  {
    id: "cs-3",
    slug: "cadmin-migration",
    navLabel: "CAdmin Migration",
    title: "Migrating a live system without stopping the business",
    summary:
      "CAdmin runs attendance, enrolment and student records for 20 centres. The version it replaced had been running for seven years and had reached end of life. We rebuilt it in four phases while everyone kept using it.",
    status: "partially-launched",
    chips: [
      "project management",
      "phased rollout",
      "pilot",
      "change management",
    ],
    context: [
      "CAdmin is the system our centres run on — attendance, student records, class management, and now HR. Every centre uses it daily. The version it replaced had been in service for seven to eight years.",
      "I was the project manager, working with a backend developer and a frontend developer.",
    ],
    problem: [
      "Two problems at once.",
      "The stack had aged out, and it held student records — names, contact details, class histories. Under Singapore’s PDPA that is not a position you want to stay in, and it was getting worse rather than better with time.",
      "The second problem set the shape of the whole project. Attendance happens every day and payroll happens every month, and neither waits for a migration, so whatever replaced it had to be built underneath people still working in the old one.",
    ],
    role: [
      "Project manager for the rebuild, across four phases",
      "Ran the evaluation of enhancing the old system against replacing it",
      "Decided the migration approach and the phase sequence",
      "Identified which workflows needed validating first",
      "Led in-house testing through each phase",
      "Ran the HR and payroll pilot at the centre I manage",
      "Wrote rollout instructions and trained staff across HQ and operator outlets",
    ],
    involved:
      "The developers building it, centre managers across the chain, HR, and the teachers whose attendance and claims depend on it.",
    constraints: [
      "No acceptable downtime",
      "Payroll has to be correct — there is no tolerance for approximately right",
      "Seven to eight years of historical data had to come across intact",
      "Staff across 20 centres with a wide range of system confidence",
      "A three-person team: me, a backend developer and a frontend developer",
      "A long delivery horizon, so people have to keep trusting it phase after phase",
    ],
    decisions: [
      {
        heading: "Rebuild rather than keep patching",
        body: [
          "The cheaper-looking option was to keep enhancing what we had. I wrote the evaluation comparing that against replacement, and the answer was clear once it was on paper.",
          "The stack had no security support, so every new feature widened the exposure on a system holding student data — and anything substantial would have needed most of it rewritten anyway. Patching was cheaper for about a year and more expensive after that. I recommended replacing it.",
        ],
      },
      {
        heading: "Phased, not a single cutover",
        body: [
          "The evaluation put both options side by side: everything at once during a downtime window, or incrementally with both systems running in parallel. I took the slower one — a single cutover could have disrupted attendance, student records and outlet operations simultaneously.",
          "I sequenced by operational risk: whichever workflows would hurt most if they broke had to be proven before anything else moved. Core modules as the backbone, then quick wins, then enhancements, then new features. Parallel testing at each phase, because migrating data and migrating it correctly are different results, and payroll is not where you find that out afterwards.",
        ],
      },
      {
        heading:
          "The HR module had to sit on the attendance data, not beside it",
        body: [
          "Teachers already mark attendance in CAdmin, and student counts come out of those same records. But freelance payroll was worked out separately — HR re-deriving hours and headcounts by hand from data the system had already captured. That is manual work that looks like a staffing problem and is actually a design problem.",
          "So the module was built onto the attendance input rather than beside it. Pay computation reads the record instead of someone reading the record and retyping it, which also removes a class of disputes: when payroll and attendance disagree, the answer is in one place.",
          "Reviewing it with HR caught a modelling error too. A teacher working at three outlets was getting one combined timesheet — fine until you try to run payroll per outlet. Timesheets are now split by outlet.",
        ],
      },
      {
        heading: "A checkbox that was really a legal safeguard",
        body: [
          "Our teachers are freelance — independent contractors rather than employees. That distinction matters at tax time, and it is clear to the company while not necessarily clear to someone submitting a timesheet at the end of a long day.",
          "So I specified a mandatory acknowledgement: submit stays disabled until it is ticked, and the confirmation is written to the audit trail with a timestamp and user ID. One checkbox, one paragraph in a requirements document — and now for any payment the company has made, there is a record that the person was told. Most of the value in a payroll system sits in the parts nobody notices until they are needed.",
        ],
      },
      {
        heading: "I ran the pilot at the centre I manage",
        body: [
          "HR and payroll went live at Clementi first. I chose it because I manage that outlet directly, so I could watch it closely, guide the teachers through the change, verify the payroll output myself, and catch problems the same day instead of waiting for them to be escalated.",
          "It was the right call. The pilot found things testing had not. Some users were missing access they needed. Claims were auto-generating incorrectly. And two faults would have been quietly damaging: a teacher could submit a timesheet and see no status change — believing it was filed while HR never received it — and an approval did not always move the record out of the pending list.",
          "Neither of those throws an error. Both would have surfaced a month later as a payroll dispute, which is the worst possible way to find them. We fixed them before expanding, so the next centres received a workflow that had already met real payroll rather than a test case.",
        ],
      },
    ],
    produced:
      "The enhance-versus-rebuild evaluation, requirements per module, workflow validation, test coverage, rollout instructions, training materials, and the collected feedback from centre managers after their first two weeks on V2.",
    outcome: [
      "All outlets now run on V2. Phase 4 is in progress — the HR module, relief teaching, and the rest of a twelve-module plan I scoped.",
    ],
    diagram: "rollout",
    lessons:
      "The pilot goes earlier. It found things no amount of testing had, and every week it ran before wider rollout was a week of problems another centre never had to see.",
  },

  {
    id: "cs-5",
    slug: "writewise",
    navLabel: "WriteWise",
    title: "WriteWise — designing an AI marking product that knows its limits",
    summary:
      "A composition marking and feedback platform for teachers and students. I wrote the product definition and built it. Working and deployed; not yet live to students.",
    status: "prototype",
    chips: [
      "product definition",
      "AI product design",
      "OCR",
      "built it myself",
    ],
    context: [
      "Marking compositions is slow, and the useful part is not the score. It is the specific feedback on this child’s piece of writing — which is exactly the part that gets thinnest when a teacher has a stack of thirty to get through.",
      "WriteWise scans a handwritten composition, transcribes it, and produces feedback against the marking rubric. The teacher stays in charge of everything the student sees.",
    ],
    problem: [
      "The obvious version of this product is a machine that marks essays. That version is also the one nobody should trust, because handwriting transcription is imperfect, AI marking is confident whether or not it is right, and the people receiving the result are children and their parents.",
      "So the design problem was not how to make the AI mark well. It was how to build something whose output a teacher can check, correct and stand behind.",
    ],
    role: [
      "Wrote the product definition, workflows and rubric structure",
      "Designed the role model — admin authors, teacher marks, student receives",
      "Built it: application, database, tests, deployment",
      "Wrote the end-to-end test suite covering each workflow",
    ],
    involved:
      "Me, working from the marking rubrics our teachers already use. Built alongside the day job.",
    constraints: [
      "Children’s written work, so nothing can be released to a student without a teacher approving it",
      "Handwriting transcription is never perfectly accurate",
      "It has to fit how teachers already mark, not ask them to change it",
      "One person, evenings and weekends",
    ],
    decisions: [
      {
        heading:
          "The teacher confirms the transcript, with the original beside it",
        body: [
          "Every point where the system has read handwriting, the scanned page is shown next to what it thinks the words are, and a human confirms it before anything proceeds.",
          "The scans stay visible on the review and report screens too, so a mark can always be checked against the original. If the transcription drops a sentence, that is a wrong mark on a child’s work, and the only reliable defence is that someone who can read the handwriting looked at both.",
        ],
      },
      {
        heading:
          "Three separate workflows, not one workflow with steps removed",
        body: [
          "There are three real situations: a student practising alone, a teacher running a full draft-one-then-draft-two marking cycle, and a teacher marking a one-off script that never had a first draft.",
          "It would have been tidier to build the full cycle and let people skip stages. I kept them separate, with their own states and permissions, because a shortcut through a workflow leaves records in states the workflow never intended — half-finished cycles that look finished. Practice mode produces no score at all, which keeps it unmistakably different from assessment.",
        ],
      },
      {
        heading: "The model answer is never sent to the AI",
        body: [
          "A composition in the bank carries a question, picture prompts, marking context, common pitfalls, teacher notes and sometimes a model answer. Two of those — the notes and the model answer — are written for adults and are deliberately withheld.",
          "A model answer in the prompt pulls a child’s storyline toward someone else’s, which is the opposite of what it is for. And whoever writes a composition can see exactly what the engine will receive, so the boundary is visible rather than assumed.",
        ],
      },
      {
        heading: "It does not own the students",
        body: [
          "WriteWise reads classes and rosters from the school’s existing system. It does not create classes, add students or invite families, and nothing in it edits the roster — corrections happen upstream, in the system that owns that data.",
          "The real integration is not connected yet, so it currently mirrors that data locally. But every mirrored row carries the upstream identifier, and the data access sits behind one seam, so connecting the live feed changes how the mirror is filled and nothing above it. Building a second place where student records live would have recreated exactly the problem I spend my working life fixing.",
        ],
      },
    ],
    produced:
      "A product requirements document, workflow specifications, a composition bank architecture, the marking rubric structure, a design system, an end-to-end test suite covering every workflow, and the deployed application itself.",
    outcome: [
      "Working and deployed, with teacher, student and admin roles, the full two-draft marking cycle, and reports that show parents the reasoning behind each band rather than only the score.",
      "It is not yet live to students. I built and hosted the prototype myself — Railway for the deployment, GitHub for the code — and our web developer is now taking it from that repository and integrating it into EverLoop.",
    ],
    visual: {
      src: "/images/writewise-engine-preview.webp",
      alt: "The composition editor in WriteWise, showing a panel headed “Preview: what the engine receives” with the exact prompt text that will accompany a child’s writing.",
      caption:
        "Admin view. Whoever writes a composition sees the exact text the engine will receive alongside the child’s own writing — so what the AI is given is inspectable, not assumed.",
      width: 1280,
      height: 900,
    },
    lessons:
      "Writing the workflows down before building saved me twice over. Both times I was tempted to merge two flows that looked similar, and both times the written version showed they ended in different places. The document was faster to change than the code would have been.",
  },

  {
    id: "cs-6",
    slug: "erp",
    navLabel: "ERP Specification",
    title: "Specifying an ERP for a business I do not work in",
    summary:
      "Inventory and procurement for a consumer-products company, built on Odoo by a single developer working outside their specialty. I wrote what it had to do.",
    status: "launched",
    chips: ["requirements", "process mapping", "QA", "documentation"],
    context: [
      "This one is not AGrader. It belongs to my director’s sister company — Decorably, Strongcore and Superaura — a consumer-products business that sells physical goods rather than lessons.",
      "It runs two fulfilment models at once. One has no warehouse at all: suppliers manufacture, freight forwarders ship, and Amazon holds and sends the stock. The other is a physical warehouse where goods arrive, sit in zones and are picked, packed and shipped by a team. Both run on the same system.",
    ],
    problem: [
      "Two models that different in one system is where stock records go wrong. The same question — where is this stock, and has it entered our system yet — has a different answer depending on which model you are in, and the people answering it are purchasers, warehouse staff and finance, not systems people.",
      "So the risk was never really the software. It was six roles each doing the plausible-but-wrong thing at the point where the two models diverge.",
    ],
    role: [
      "Wrote the requirements and developer briefs",
      "Mapped the process flows across both fulfilment models",
      "Answered functional clarifications while it was being built",
      "Wrote the tester scope guide and ran the QA issue log",
      "Wrote the operations handbook the team works from",
    ],
    involved:
      "One developer, who built the whole system. A frontend developer, working outside their specialty.",
    constraints: [
      "A single developer, and not a specialist in the domain they were building for",
      "Two fulfilment models that had to share one receipt rule",
      "Six roles using it daily, none of them technical",
      "Live stock and real money — a wrong movement is not a display bug",
    ],
    decisions: [
      {
        heading: "One receipt rule, stated once and repeated everywhere",
        body: [
          "Stock is receipted at the manufacturer the moment the factory confirms goods are ready, whichever model you are in. Everything after that is an internal transfer — to a forwarder, to Amazon, to our own warehouse.",
          "Fixing the rule at the earliest common point is what lets two very different models share one system. The alternative was a receipt step per model, which would have meant two mental models for staff who move between both.",
        ],
      },
      {
        heading: "The handbook is organised by role, not by feature",
        body: [
          "A system six roles touch cannot be explained once. The guide has a Find Your Role table at the front that sends a purchaser, an operations lead, logistics, finance or the warehouse to one section each, and tells them to read only that one.",
          "Documentation organised by feature is written for the person who built it. Organised by role, it is written for the person who has to do something in the next five minutes.",
        ],
      },
      {
        heading: "Every section says what not to do",
        body: [
          "Each role section ends with a list of the actions that look reasonable and are wrong — adjusting stock to fix a location, receipting goods that are already in the system, editing a validated transfer.",
          "In a stock system the damaging actions are never the obviously silly ones. They are the ones a sensible person would try.",
        ],
      },
      {
        heading: "What the release does not do is written down",
        body: [
          "One section lists five features that are deliberately out of scope, with the instruction not to expect them to work: packing selection on sales orders, barcode scanning per packing level, label printing, automated repack triggers and packing-level price lists.",
          "Unstated absence gets read as a bug and generates a support queue. Stating it turns the same gap into a known boundary, and it is the same in-and-out-of-scope habit I use in a brief, applied to a document people read at a desk.",
        ],
      },
    ],
    produced:
      "Requirements and developer briefs, process flow charts across both fulfilment models, functional clarifications during the build, a tester scope guide, the QA issue log, and a fifteen-section operations handbook organised by role. Two parts of the system came from requirements I wrote: the packing and unit-of-measure configuration, which lets a case of twenty-four be counted as both a case and twenty-four units without anyone doing the arithmetic twice, and a production pipeline that tracks a manufacturing order through named stages with a progress figure and an audit trail.",
    outcome: [
      "Live, with the handbook in daily use across purchasing, operations, logistics, finance and the warehouse.",
    ],
    /* Xiu Wen's own words, supplied 2026-08-02. The line that stood here was
       inferred from the artefact list and has been replaced. */
    lessons:
      "This project taught me to look beyond individual features and understand how data, workflows and people must align for an ERP system to work in practice.",
  },
];

/**
 * Reading order, set by PORTFOLIO_SIDEBAR_FLOW_REVISION.md (2026-08-02).
 *
 * Only three full case studies remain. Data integrity and Nova were compressed
 * into short entries on Other Work at Xiu Wen's instruction; WriteWise is still
 * a full page but is reached through the EverLoop ecosystem rather than from
 * the rail, because it is being integrated into EverLoop (F68).
 */
const ORDER = ['cadmin-migration', 'mobile-launch', 'erp', 'writewise'];

caseStudies.sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));

/**
 * Route lookups. Kept beside the content so a slug can never drift from the
 * study it names — /work/[slug] reads this array and nothing else.
 */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export const supportingCards: SupportingCard[] = [
  {
    id: "sc-4",
    title: "Specifying an ERP I did not build",
    status: "launched",
    body: [
      "Our inventory and procurement runs on a separate ERP. We dedicated a developer to building it, and I did the analysis around it: requirements and dev briefs, process flow charts, functional clarifications, the tester scope guide, the QA issue log, and the user handbook the team works from.",
      "That split is worth naming as its own skill. Someone has to work out what the business actually needs, write it down precisely enough to build from, then check that what comes back does the thing — and do all of that for a system they are not writing themselves.",
    ],
  },
  ];
