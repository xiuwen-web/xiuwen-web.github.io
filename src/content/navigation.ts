import type { WorkEntry } from '@/types/content';
import { getCaseStudy } from './caseStudies';
import { ecosystem } from './ecosystem';

/**
 * The information architecture, in one place
 * (PORTFOLIO_SIDEBAR_FLOW_REVISION.md, 2026-08-02).
 *
 * The rail, the homepage cards and the numbering all read this array, so the
 * order and the numbers can never disagree. Numbering is positional.
 */

export const PRIMARY_NAV = [
  { href: '/#top', label: 'Overview', key: 'overview' },
  { href: '/#work', label: 'Selected Work', key: 'work' },
  { href: '/#process', label: 'How I Work', key: 'process' },
  { href: '/#about', label: 'About', key: 'about' },
];

const cadmin = getCaseStudy('cadmin-migration');
const mobile = getCaseStudy('mobile-launch');
const erp = getCaseStudy('erp');
const writewise = getCaseStudy('writewise');

if (!cadmin || !mobile || !erp || !writewise) {
  throw new Error('navigation.ts: a case study named in the IA is missing');
}

export const workEntries: WorkEntry[] = [
  {
    href: '/work/cadmin-migration/',
    navLabel: 'CAdmin Migration',
    title: cadmin.title,
    description: 'Migrating a live operational system without stopping the business.',
    status: cadmin.status,
    chips: cadmin.chips,
    diagram: 'rollout',
    /*
     * The only CAdmin screen that can be published. The system holds live
     * student records and its interior is never captured (PRD §22) — the front
     * door holds no data, so it is the one safe frame. Browser chrome cropped:
     * the address bar showed the internal hostname.
     */
    visual: {
      src: '/images/cadmin-login.webp',
      alt: 'The CAdmin sign-in screen, branded AGrader, with email and password fields.',
      caption: 'CAdmin, at the front door.',
      width: 1440,
      height: 775,
    },
    featured: true,
  },
  {
    href: '/work/everloop/',
    navLabel: ecosystem.navLabel,
    title: ecosystem.title,
    description: ecosystem.summary,
    status: ecosystem.status,
    chips: ecosystem.chips,
    /*
     * Set explicitly. This previously read the first visual out of the area
     * with id 'admin', and when that area was consolidated into
     * 'content-access' the lookup silently returned undefined — the card lost
     * its image and nothing failed. The guard below now catches that class of
     * regression; this no longer depends on an area id at all.
     */
    visual: {
      src: '/images/everloop-logo.webp',
      alt: 'The EverLoop logo: an owl mascot in a navy roundel reading “Improvement Starts Here”, above the EverLoop wordmark.',
      caption: 'EverLoop.',
      width: 900,
      height: 748,
      contain: true,
    },
    featured: true,
  },
  {
    href: '/work/mobile-launch/',
    navLabel: 'Mobile Product Launch',
    title: mobile.title,
    description: 'Taking the EverLoop web platform to four app-store listings.',
    status: mobile.status,
    chips: mobile.chips,
    visual: {
      src: '/images/agrader-student-app-store.webp',
      alt: 'Four App Store screenshots of the AGrader student app.',
      caption: 'The student app on the App Store.',
      width: 1108,
      height: 549,
    },
    featured: false,
  },
  /*
   * Promoted to the homepage 2026-08-05. It had lived only inside the EverLoop
   * page, reachable by opening one case study and finding a link within it —
   * so the one project Xiu Wen specified, built, deployed and handed over was
   * the one nothing on the homepage pointed at.
   *
   * It sits fourth because the first four are all AGrader systems and the ERP
   * is external work. The numbering is positional, so ERP and Product
   * Experiments shift down on their own; neither URL changes.
   */
  {
    href: '/work/writewise/',
    navLabel: writewise.navLabel,
    title: writewise.title,
    /*
     * The arc, not the subject. Every other card can say what the system does;
     * this one has to say what she did to it, because "specified it, built it,
     * deployed it, handed it to a developer" is the whole reason it earns a
     * place next to work that shipped to twenty centres.
     */
    description:
      'An AI marking prototype I specified, built and deployed myself — now being taken into EverLoop by one of our developers.',
    status: writewise.status,
    chips: writewise.chips,
    /*
     * Not the case study's visual. That is the full admin screen at 1280x900,
     * and cropped to a 112px band it lands on the empty textarea at the top —
     * the card rendered as a blank rectangle beside three with real artwork.
     *
     * This is the same screenshot cut to the panel the caption is about, at an
     * aspect that matches the band so object-cover crops nothing. Text in a
     * card image is a compromise, but an unreadable blank is worse, and this
     * one at least shows the thing the case study argues about.
     */
    visual: {
      src: '/images/writewise-card.webp',
      alt: 'The WriteWise composition editor, showing a panel headed “Preview: what the engine receives” above the exact prompt text sent with a child’s writing.',
      caption: 'WriteWise — what the engine is given, shown rather than assumed.',
      width: 593,
      height: 200,
    },
    featured: false,
  },
  {
    href: '/work/erp/',
    navLabel: erp.navLabel,
    title: erp.title,
    description:
      'Requirements, process maps and the operations handbook for a consumer-products ERP.',
    status: erp.status,
    chips: erp.chips,
    /*
     * The dashboard with every figure masked. The source shows revenue,
     * average order value, order counts and a monthly sales trend for a
     * business that is not AGrader and not Xiu Wen's — internal financial data,
     * which the register excludes. What is published is the shell: the module
     * structure, and that this is a real Odoo instance.
     */
    visual: {
      src: '/images/erp-odoo.webp',
      alt: 'An Odoo dashboard for the ERP, showing the Sales, Finance and Logistics module navigation. All figures are masked.',
      caption: 'The ERP, figures masked.',
      width: 1300,
      height: 777,
    },
    featured: false,
  },
  {
    href: '/work/other/',
    /*
     * Renamed from "Other Work" 2026-08-05. That name defined the entry by
     * exclusion and read as leftovers; what is actually in it is a product
     * built and then deliberately cut back. The URL stays /work/other/ — a
     * published address is not renamed for a label change.
     */
    navLabel: 'Product Experiments',
    title: 'Product Experiments',
    /*
     * "Everything that belongs under neither CAdmin, EverLoop nor the ERP"
     * defined the entry by what it was not, which made 05 read as the drawer
     * the other four did not fit in. It is a deliberate selection, so it now
     * says what is in it (FINAL_REFINEMENT_BRIEF §11).
     */
    description:
      'Selected experiments and smaller systems work — product prototypes, internal workflow improvements, and decisions where I deliberately reduced scope.',
    /*
     * Cropped to the row band rather than letterboxed. The source is a square
     * illustration, and contained in a 3.8:1 plate it rendered 112px wide — a
     * thumbnail, with its wordmark and its subject both too small to read. The
     * asset is cut to 3.79:1 against a 3.78:1 plate, so object-cover crops
     * essentially nothing and the face fills the band at full height.
     */
    visual: {
      src: '/images/nova-pa.webp',
      alt: 'Nova PA: a friendly robot mascot wearing headphones, framed by mail, calendar and checklist icons.',
      caption: 'Nova.',
      width: 640,
      height: 169,
    },
    featured: false,
  },
];

/*
 * A featured card is mostly its media. One without any is not a featured card,
 * and the failure is invisible — it just renders a bit shorter. Fail the build
 * instead.
 */
for (const entry of workEntries) {
  if (entry.featured && !entry.visual && !entry.diagram) {
    throw new Error(`navigation.ts: featured entry ${entry.href} has no visual or diagram`);
  }
}

/** '02' — positional, so it cannot contradict the order above. */
export function workNumber(href: string): string | null {
  const i = workEntries.findIndex((entry) => entry.href === href);
  return i === -1 ? null : String(i + 1).padStart(2, '0');
}

/**
 * Which rail entry to mark as current. Case studies reached from inside the
 * ecosystem — WriteWise — highlight EverLoop, because that is where the reader
 * came from and where the rail says they are.
 */
export const ACTIVE_KEY_TO_HREF: Record<string, string> = {
  'cadmin-migration': '/work/cadmin-migration/',
  everloop: '/work/everloop/',
  /*
   * Was '/work/everloop/' — correct while WriteWise could only be reached from
   * inside the ecosystem page. It has its own rail entry now, so the rail
   * should highlight itself rather than its former parent.
   */
  writewise: '/work/writewise/',
  'mobile-launch': '/work/mobile-launch/',
  erp: '/work/erp/',
  other: '/work/other/',
};
