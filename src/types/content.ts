/**
 * Content type contracts.
 *
 * These exist to make the rules from the brief structural rather than
 * remembered. `status`, `decisions` and `lessons` are deliberately NOT
 * optional: the brief requires completed / in-progress / prototype work to
 * stay visibly separated, and every case study to show reasoning. A future
 * edit that drops one fails the build instead of quietly shipping.
 */

export type ProjectStatus =
  | 'launched'
  | 'launched-ongoing'
  | 'partially-launched'
  | 'in-progress'
  | 'prototype'
  | 'personal-project';

export interface StatusMeta {
  label: string;
  tone: 'launched' | 'progress' | 'personal';
}

export const STATUS_META: Record<ProjectStatus, StatusMeta> = {
  launched: { label: 'Launched', tone: 'launched' },
  'launched-ongoing': { label: 'Launched · ongoing', tone: 'launched' },
  /*
   * Shortened from "Phases 1–3 launched · Phase 4 in progress", which wrapped
   * to three lines inside a card. Same facts: the amber tone and "of 4" both
   * say it is unfinished, and the case study gives the phase detail.
   */
  'partially-launched': {
    label: '3 of 4 phases live',
    tone: 'progress',
  },
  'in-progress': { label: 'In progress', tone: 'progress' },
  prototype: { label: 'Prototype · in development', tone: 'personal' },
  'personal-project': { label: 'Personal project', tone: 'personal' },
};

export interface ExternalLink {
  label: string;
  href: string;
  /** Shown as a small qualifier, e.g. the platform or release date. */
  note?: string;
}

export interface Decision {
  heading: string;
  /** Paragraphs: decision, then reasoning, then the trade-off accepted. */
  body: string[];
}

/**
 * Only two sources are permitted (D3, clarified 2026-08-01):
 *   - Xiu Wen's own builds, showing seeded data
 *   - imagery AGrader has already published publicly
 * Company production systems are never screenshotted.
 *
 * Additional rule learned the hard way: no image may show a list of person
 * names, even seeded ones. A screen that looks like it exposes student data
 * does the same reputational damage as one that does.
 */
export interface Visual {
  src: string;
  alt: string;
  caption: string;
  /**
   * Brand marks are letterboxed on a neutral ground rather than cropped to
   * fill. A logo cropped by object-cover loses the thing that makes it a logo.
   */
  contain?: boolean;
  /** Rendered width in px; images are pre-sized, not optimised at request time. */
  width: number;
  height: number;
}

/**
 * The honest-metrics disclosure, per case study rather than as one homepage
 * section (directive 2, 2026-08-01). Every sentence in one of these must
 * already exist in approved copy — this block relocates the admission, it does
 * not add a new claim.
 */
export interface Measurement {
  body: string[];
}

/**
 * One store-analytics figure, with the screenshot it was read from.
 *
 * Apple and Google do not measure the same thing, and the four figures here
 * are three different units — downloads, installed audience, product-page
 * views. They are therefore never summed, never averaged and never presented
 * as one adoption total; `metric` is rendered next to every value so the unit
 * travels with the number.
 */
export interface AnalyticsEvidence {
  /** Groups the cards, and is a real heading rather than a colour. */
  product: string;
  platform: 'iOS' | 'Android';
  /** Exactly as the console reports it — "2.03K" is not rewritten to "2,030". */
  value: string;
  metric: string;
  period: string;
  source: 'App Store Connect' | 'Google Play Console';
  /** Cropped so no account name is present. See scripts note in the commit. */
  image: Visual;
}

export interface CaseStudy {
  id: string;
  /** URL segment: /work/[slug]. Stable — treat as a published address. */
  slug: string;
  title: string;
  /** Two or three words. Full titles do not fit a 260px rail. */
  navLabel: string;
  summary: string;
  status: ProjectStatus;
  chips: string[];
  context: string[];
  problem: string[];
  role: string[];
  /** Roles only. Never names — see PRD §22. */
  involved: string;
  constraints: string[];
  /** Required, minimum one. The reason the site exists. */
  decisions: Decision[];
  produced: string;
  outcome: string[];
  /**
   * The outcome as scannable figures, above the prose (refinement doc §5).
   * Only where the result is genuinely countable — a study whose outcome is
   * "it is live and in daily use" gets no figures rather than invented ones.
   */
  outcomeFacts?: SnapshotFact[];
  outcomeLinks?: ExternalLink[];
  /** Store analytics, shown as its own Post-launch adoption section. */
  analytics?: AnalyticsEvidence[];
  visual?: Visual;
  /** For systems that can never be screenshotted — drawn instead. */
  diagram?: 'rollout';
  /** Only where a specific measurement gap exists. Not every study has one. */
  measurement?: Measurement;
  /**
   * How the release was actually coordinated. Only the mobile launch has one —
   * it is the study where getting it out of the door was the work.
   */
  launch?: { body: string[]; visuals?: Visual[] };
  /**
   * The reflection the project left behind, as opposed to `lessons`, which is
   * what would be done differently. One looks back at what the work meant, the
   * other forward at what would change — a study that ends only on the second
   * reads as a list of corrections.
   */
  learned?: string;
  /** Forward-facing, per F46. Required. */
  lessons: string;
}

/**
 * EverLoop is an ecosystem, not a project, so it does not fit the CaseStudy
 * shape — there is no single problem, no single set of constraints and no one
 * decision that covers admin, teacher, student, parent, reporting and AI.
 *
 * Forcing it into CaseStudy would mean inventing a `problem`, `involved` and
 * `lessons` to satisfy required fields. This type describes what it actually
 * is: an umbrella with areas under it.
 */
/**
 * A sub-section inside a consolidated area.
 *
 * The sidebar refinement (2026-08-02) merged ten navigation entries into six.
 * Merging the *navigation* must not flatten the *content*, and in particular
 * must not lose a status: the class calendar is a prototype and has to stay
 * visibly labelled as one even though it now shares a heading with shipped
 * reporting work. Parts keep their own heading and badge under one anchor.
 */
export interface EcosystemPart {
  heading: string;
  status?: ProjectStatus;
  body: string[];
  visuals?: Visual[];
  link?: { href: string; label: string };
  /**
   * A diagram belonging to this part rather than to the area above it. Area
   * diagrams render before the parts, which is the wrong place for one that
   * illustrates the third part down.
   */
  diagram?: 'topical-quiz';
  /**
   * The rules a feature runs on, as a term list. For behaviour that is a set
   * of conditions rather than a narrative — prose turns four rules into one
   * paragraph nobody can check a build against.
   */
  rules?: { term: string; definition: string }[];
}

export interface EcosystemArea {
  /** Anchor id — the in-page table of contents links to these. */
  id: string;
  heading: string;
  /**
   * What the rail calls it. Explicit rather than derived from the heading:
   * splitting "Course release — and the sheet it replaced" on the dash gave a
   * contents entry beginning "And the sheet it replaced".
   */
  navLabel: string;
  body?: string[];
  visuals?: Visual[];
  /** For an area that has a full page of its own, e.g. WriteWise. */
  link?: { href: string; label: string };
  status?: ProjectStatus;
  /** Consolidated areas hold their merged sections here. */
  parts?: EcosystemPart[];
}

export interface Ecosystem {
  slug: string;
  navLabel: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  chips: string[];
  overview: string[];
  areas: EcosystemArea[];
}

/**
 * The four numbered entries in the rail and on the homepage. Numbering is
 * positional so it can never contradict the order (PORTFOLIO_SIDEBAR_FLOW
 * _REVISION.md, 2026-08-02).
 */
export interface WorkEntry {
  href: string;
  navLabel: string;
  title: string;
  description: string;
  status?: ProjectStatus;
  chips?: string[];
  visual?: Visual;
  diagram?: 'rollout';
  /** Featured entries carry media and a raised card; the rest are compact. */
  featured: boolean;
}

/** Short cards with no expansion — breadth without competing for attention. */
export interface SupportingCard {
  id: string;
  title: string;
  status: ProjectStatus;
  body: string[];
  /** One or two images. Two is for showing both ends of a flow. */
  visuals?: Visual[];
}

export interface SnapshotFact {
  figure: string;
  label: string;
  qualifier: string;
}

/**
 * How a requirement gets written (F79). Replaced a flat list of artefact nouns
 * on 2026-08-02 — a method is more hireable than an inventory, and this one is
 * evidenced in the written record rather than claimed.
 */
/**
 * One stage of the spec-to-shipped chain. The chain is the site's own thesis
 * applied to itself: everything else describes the method, this shows a single
 * requirement at four checkable points.
 */
export interface TraceStep {
  stage: string;
  /** What exists at this stage — a brief, board items, a gate, live screens. */
  artefact: string;
  detail: string;
  /** Surfaces, versions or item names. Never a person's name (PRD §22). */
  items?: string[];
}

/**
 * Diagram data (PORTFOLIO_FLOWCHART_VISUAL_STORYTELLING_PLAN.md).
 *
 * Every diagram on the site is one of three shapes, driven by data rather than
 * hand-built markup, so the visual language cannot drift between case studies.
 * Every claim inside one traces to the same approved copy as the prose it
 * replaces — a diagram is a compression of the record, never an addition to it.
 */
export interface FlowStep {
  title: string;
  /** One short qualifier. Long sentences do not belong inside a node. */
  note?: string;
  /**
   * Mostly delivery state. Two values name a role in the flow instead:
   * 'mine' is the acceptance gate, and 'gate' is a rule the flow cannot pass
   * until it is satisfied. Both still print a word — see Diagram.tsx.
   */
  status?: 'legacy' | 'pilot' | 'shipped' | 'in-progress' | 'mine' | 'gate';
}

/**
 * One step in the developer-collaboration sequence.
 *
 * `owner` is who holds the work; `mine` is what she is doing at that moment,
 * and it is required on every step including the two she does not own. That is
 * the whole point of the diagram — a lifecycle where the middle reads
 * "developers build it" says nothing a hundred other portfolios do not.
 */
export interface HandoffStep {
  stage: string;
  owner: 'Mine' | 'Developers' | 'QA';
  mine: string;
}

export interface SystemBranch {
  title: string;
  note?: string;
  items: string[];
}

export interface BeforeAfterData {
  beforeLabel?: string;
  afterLabel?: string;
  before: string[];
  after: string[];
}

export interface MethodRule {
  heading: string;
  body: string;
}

/**
 * A stated belief about the work, as distinct from MethodRule, which is a
 * technique. "Understand before building" is a principle; "specify what should
 * not happen" is how that principle gets carried out. They are deliberately in
 * different sections, because a reader who meets two lists of rules in a row
 * stops reading either.
 */
export interface Principle {
  heading: string;
  body?: string;
}

/**
 * A recreated requirement (F13 — mock-ups only, never the real document).
 * Structure and reasoning are faithful; identifying specifics are removed.
 */
export interface SpecimenSection {
  heading: string;
  lines: string[];
}

export interface Specimen {
  title: string;
  standfirst: string;
  sections: SpecimenSection[];
  footnote: string;
}

/**
 * The work log exists to show breadth without spending the reader's attention.
 * Five deep case studies prove depth; this proves it was sustained. Entries are
 * one line each and deliberately carry no prose.
 */
export type ArtefactKind =
  | 'PRD'
  | 'Spec'
  | 'Analysis'
  | 'QA'
  | 'Guide'
  | 'Rollout'
  | 'Research'
  | 'Design'
  | 'Prototype';

export interface WorkLogEntry {
  year: string;
  title: string;
  kind: ArtefactKind;
}

export interface WorkLogGroup {
  system: string;
  note: string;
  entries: WorkLogEntry[];
}

export interface SkillGroup {
  heading: string;
  items: string[];
}

export interface JourneyEntry {
  year: string;
  body: string;
  /** A turning point — a career one or a launch. Filled marker, heavier text. */
  milestone?: boolean;
}

/**
 * The timeline is grouped rather than continuous.
 *
 * The origin story (PORTFOLIO_CAREER_ORIGIN_STORY.md) has one accuracy
 * requirement that wording alone keeps losing: full-time operations began in
 * July 2020, and the technology work came four years later. Two labelled
 * groups with a break between them make that structural — a reader skimming
 * dates cannot merge the two into "joined and started building software".
 */
export interface JourneyPhase {
  /** Short. It sits above the group as a mono label, not as a heading. */
  label: string;
  entries: JourneyEntry[];
}

export interface Profile {
  /** Short display form — rail, footer, anywhere the name is chrome. */
  name: string;
  /** Full legal form, as printed on the résumé. Used where identity has to be
      searchable and verifiable: page title, structured data, the hero. */
  fullName: string;
  role: string;
  employer: string;
  location: string;
  tagline: string;
  heroHeadline: string[];
  heroSupport: string;
  /** The quiet line under the headline — why the work is shaped this way. */
  heroSubline: string;
  about: string[];
  timeSplit: { label: string; value: number }[];
  /** Opens the Contact section — a statement of direction, not a greeting. */
  contactLede: string;
  email: string;
  resumePath: string;
  photoPath: string;
  photoAlt: string;
}
