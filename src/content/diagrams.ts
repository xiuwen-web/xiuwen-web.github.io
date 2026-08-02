import type { BeforeAfterData, FlowStep, SystemBranch } from '@/types/content';

/**
 * Diagram data, one place for all of it.
 *
 * RULE APPLIED THROUGHOUT: a diagram compresses the record, it never adds to
 * it. Every node below restates something already approved in caseStudies.ts,
 * ecosystem.ts or the discovery register. Where the plan document suggested a
 * step the record does not support, the step was changed rather than invented —
 * noted individually below.
 */

/* ------------------------------------------------- 01 CAdmin Migration --- */

/**
 * The plan asked for "Process and data review" and "Module mapping". Both are
 * evidenced: she wrote the enhance-versus-rebuild evaluation (F45) and scoped a
 * twelve-module plan (CS-3 outcome).
 */
export const cadminMigrationFlow: FlowStep[] = [
  { title: 'CAdmin V1', note: 'seven to eight years old', status: 'legacy' },
  { title: 'Enhance-or-rebuild evaluation' },
  { title: 'Module scope', note: 'twelve modules' },
  { title: 'Build', note: 'April to July 2025' },
  { title: 'Pilot at one outlet', note: 'HR and payroll', status: 'pilot' },
  { title: 'Parallel testing', note: 'both systems live' },
  { title: 'Fix what the pilot found' },
  { title: 'Rollout by group', status: 'shipped' },
];

export const cadminBeforeAfter: BeforeAfterData = {
  beforeLabel: 'CAdmin V1',
  afterLabel: 'CAdmin V2',
  before: [
    'A stack no longer receiving security patches, holding student records',
    'Freelance pay re-derived by hand from attendance the system already held',
    'One combined timesheet for a teacher working across three outlets',
    'Any replacement risked stopping attendance and payroll at once',
  ],
  after: [
    'Rebuilt on a supported stack',
    'Pay computed from the attendance record rather than retyped',
    'Timesheets split by outlet',
    'Rolled out group by group, with both systems running in parallel',
  ],
};

/** Why phased rather than one cutover — CS-3, decision two. */
export const cadminPilotFlow: FlowStep[] = [
  { title: 'Attendance is daily, payroll is monthly' },
  { title: 'No acceptable downtime' },
  { title: 'A single cutover risks all of it at once' },
  { title: 'Phase by operational risk' },
  { title: 'Prove the riskiest workflows first' },
  { title: 'Pilot where I manage the outlet', status: 'pilot' },
];

/* ------------------------------------------------ 02 EverLoop Ecosystem --- */

export const everloopMap: SystemBranch[] = [
  {
    title: 'Admin',
    note: 'the education and operations team',
    items: ['Course setup and tagging', 'Publishing and public access', 'Permissions across four roles', 'Report completion tracking'],
  },
  {
    title: 'Teachers',
    note: 'web and mobile',
    items: ['Attendance and classes', 'Diagnostic and progress reports', 'Resources across outlets', 'Announcements'],
  },
  {
    title: 'Students and parents',
    note: 'web and mobile',
    items: [
      'Courses, videos and papers',
      'Quizzes and e-Bucks',
      'Progress reports',
      'Class calendar',
      'WriteWise',
    ],
  },
];

/**
 * The plan's version had "Access assigned automatically" and "Progress visible
 * to parent". Both hold: release is keyed on the class start date in CAdmin
 * (F78) and the report lands in the parent app (reporting area).
 */
export const contentDeliveryFlow: FlowStep[] = [
  { title: 'Admin builds the course' },
  { title: 'Tagged by term, level and subject' },
  { title: 'Published, and opened to public access separately' },
  { title: 'CAdmin holds the class start date' },
  { title: 'Access opens on day one', note: 'nothing is released early', status: 'shipped' },
  { title: 'Student opens courses, videos and papers' },
  { title: 'Quiz completed, e-Bucks issued after review' },
  { title: 'Progress reaches the parent', status: 'shipped' },
];

/**
 * Changed from the plan. It proposed "System validates entries"; nothing in the
 * record evidences validation. What is evidenced is the AI draft and the
 * teacher approval gate, which is the more important step anyway.
 */
export const reportFlow: FlowStep[] = [
  { title: 'Education team maintains the form' },
  { title: 'Teacher scores conduct and reviews the draft' },
  { title: 'AI drafts, the teacher approves', note: 'nothing goes out unsigned' },
  { title: 'Admin tracks completion across classes' },
  { title: 'Report lands in the parent app', status: 'shipped' },
];

export const calendarFlow: FlowStep[] = [
  { title: 'CAdmin holds the class schedule' },
  { title: 'Enrolment and student status checked' },
  { title: 'Suspensions, holidays and outlet closures applied' },
  { title: 'Merged on the server, not on the device' },
  { title: 'Every client renders the same calendar', status: 'in-progress' },
];

/** AI supports, it does not replace — CS-5, decision one. */
export const writewiseResponsibility: FlowStep[] = [
  { title: 'Student', note: 'writes by hand' },
  { title: 'System', note: 'scans and transcribes' },
  { title: 'Teacher', note: 'confirms the transcript against the original' },
  { title: 'Teacher', note: 'approves before anything reaches the student' },
];

export const writewiseFlow: FlowStep[] = [
  { title: 'Composition written by hand' },
  { title: 'Scanned and transcribed' },
  { title: 'Teacher confirms the text, original alongside' },
  { title: 'Feedback generated against the rubric' },
  { title: 'Model answer and teacher notes withheld', note: 'never sent to the engine' },
  { title: 'Teacher reviews, then the student sees it', status: 'in-progress' },
];

/* -------------------------------------------- 03 Mobile Product Launch --- */

export const storeListings: SystemBranch[] = [
  {
    title: 'Student and parent app',
    note: 'AGrader LC: Online App',
    items: ['iOS — App Store', 'Android — Google Play'],
  },
  {
    title: 'Teacher app',
    note: 'AGrader Teacher, internal use',
    items: ['iOS — App Store', 'Android — Google Play'],
  },
];

export const launchPipeline: FlowStep[] = [
  { title: 'EverLoop web platform', status: 'shipped' },
  { title: 'Decide what earns a place on a phone' },
  { title: 'Split into two apps, not one that switches role' },
  { title: 'Build for iOS and Android' },
  { title: 'Test and accept each build', note: 'no dedicated QA at the time' },
  { title: 'Store review', note: 'timelines outside my control' },
  { title: 'Four listings live', note: 'December 2025', status: 'shipped' },
  { title: 'Post-launch releases', note: 'student app now on 1.4.0', status: 'in-progress' },
];

/** Product judgement, not duplication — CS-1, decision two. */
export const prioritisationFlow: FlowStep[] = [
  { title: 'Every web feature is a candidate' },
  { title: 'Each request is reasonable on its own' },
  { title: 'Together they slow the app down' },
  { title: 'Keep what a teacher opens between classes' },
  { title: 'Leave bulk admin on the web', note: 'jobs done sitting down' },
];
