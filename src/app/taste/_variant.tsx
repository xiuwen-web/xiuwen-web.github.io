import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { workEntries, workNumber } from '@/content/navigation';
import { profile } from '@/content/profile';
import { SITE_URL } from '@/content/site';
import { snapshot, snapshotClosing } from '@/content/snapshot';
import { specimen, specimenIntro } from '@/content/process';

/**
 * Building blocks shared by the three taste variants under /taste.
 *
 * Nothing here is imported by the live site. These are proposals rendered
 * against the real tokens, the real content and the real Shell so the
 * comparison is honest — a variant built on invented copy or a different
 * palette would only be testing whether new copy is nicer than old copy.
 */

/* ---------------------------------------------------- Section headings --- */

/**
 * A section header with no mono eyebrow above it.
 *
 * The live page opens every section with `[ WORK ]`, `[ PROCESS ]`,
 * `[ ABOUT ]`, and repeats the same 12px mono-caps label a dozen more times
 * inside them. It was the one gesture that made hierarchy legible when it
 * appeared three times; at fifteen it is the page's default texture and it
 * flattens the thing it was meant to structure. The section's position on the
 * page already says which section it is.
 */
export function PlainHeading({
  title,
  intro,
  kicker,
}: {
  title: string;
  intro?: string;
  /** For the rare section that genuinely needs a label. Used at most twice. */
  kicker?: string;
}) {
  return (
    <header>
      {kicker && (
        <p
          className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          {kicker}
        </p>
      )}
      <h2
        className={`text-[length:var(--text-h2)] leading-tight font-semibold ${kicker ? 'mt-1' : ''}`}
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-3 max-w-[60ch] text-pretty" style={{ color: 'var(--text-muted)' }}>
          {intro}
        </p>
      )}
    </header>
  );
}

/* ------------------------------------------------------- Credibility --- */

/**
 * The four verifiable figures, at the size of a claim rather than the size of
 * a footnote.
 *
 * On the live page these are set in 24px mono in a thin white band, which is
 * quieter than the body copy three sections below them. They are the only
 * numbers on the site a reader can check in ten seconds, and the band is the
 * most screenshot-shaped element here, so it is worth the vertical space it
 * takes to make them read as the anchor they are.
 *
 * `tone="navy"` is the page's single tonal break. It borrows the rail's
 * palette rather than inventing one, so the band reads as the same system the
 * navigation is drawn in.
 */
export function ProofBand({ tone = 'light' }: { tone?: 'light' | 'navy' }) {
  const navy = tone === 'navy';
  /*
   * --band and its siblings resolve to the navy family in light and to the
   * raised surface in dark, so the band reads as a break in both themes
   * rather than dissolving into the page background in one of them. The
   * tokens are defined in taste.css; see the note there.
   */
  const text = navy ? 'var(--band-text)' : 'var(--text)';
  const muted = navy ? 'var(--band-muted)' : 'var(--text-muted)';
  const rule = navy ? 'var(--band-rule)' : 'var(--rule)';

  return (
    <section
      id="snapshot"
      className="relative border-y"
      style={{
        borderColor: rule,
        background: navy ? 'var(--band)' : 'var(--surface)',
        color: text,
      }}
    >
      <span
        aria-hidden="true"
        className="blueprint blueprint-fade pointer-events-none absolute inset-0"
        style={{ opacity: navy ? 'var(--band-grid)' : 0.6 }}
      />

      <Container width="wide" className="relative py-12 sm:py-16">
        {/* The four arrive as a set, because they are one claim in four
            parts rather than four separate facts. */}
        <dl
          className="tv-stagger grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          data-reveal
        >
          {snapshot.map((fact) => (
            <div key={fact.label}>
              <dt
                className="font-mono text-[2.25rem] leading-none font-medium tabular-nums sm:text-[2.75rem]"
                style={{ color: navy ? 'var(--band-figure)' : 'var(--text)' }}
              >
                {fact.figure}
              </dt>
              <dd className="mt-3">
                <span className="block text-[length:var(--text-body)] font-medium">
                  {fact.label}
                </span>
                <span
                  className="mt-1 block text-[length:var(--text-small)] leading-snug"
                  style={{ color: muted }}
                >
                  {fact.qualifier}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div
          className="mt-10 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          style={{ borderColor: rule }}
        >
          <p className="max-w-[45rem] text-[length:var(--text-small)] text-pretty" style={{ color: muted }}>
            {snapshotClosing}
          </p>
          <p
            className="shrink-0 font-mono text-[length:var(--text-label)] tracking-tight"
            style={{ color: muted }}
          >
            {profile.fullName}
            <span aria-hidden="true"> · </span>
            {SITE_URL.replace(/^https?:\/\//, '')}
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------ Shipped --- */

/**
 * Four screens from the systems the page spends nine thousand pixels arguing
 * about.
 *
 * The live landing page contains exactly one image: a 100px portrait. Every
 * screenshot in public/images is reachable only by opening a case study, so a
 * reader who does not click never sees a single thing that was built. For a
 * portfolio whose whole case is "these shipped and you can check", that is the
 * largest omission on the page.
 */
/**
 * Each tile links to the case study the screen belongs to.
 *
 * They were captions under pictures in the first pass, which put four
 * pieces of the best evidence on the page at the exact point a reader is
 * most interested and gave them nowhere to go with it. A screenshot that
 * cannot be clicked is a dead end directly above the section a reader
 * would have clicked into.
 */
const SHIPPED: {
  src: string;
  w: number;
  h: number;
  alt: string;
  caption: string;
  href: string;
}[] = [
  {
    src: '/images/everloop-student-courses.webp',
    w: 1440,
    h: 900,
    alt: 'The EverLoop student course list, showing enrolled courses and their terms.',
    caption: 'EverLoop, student web',
    href: '/work/everloop/',
  },
  {
    src: '/images/everloop-teacher-report-editor.webp',
    w: 1440,
    h: 900,
    alt: 'The EverLoop teacher report editor, showing a progress report being written.',
    caption: 'Teacher report editor',
    href: '/work/everloop/',
  },
  {
    src: '/images/agrader-student-app-store.webp',
    w: 1108,
    h: 549,
    alt: 'Four App Store screenshots of the AGrader student app.',
    caption: 'The student app, App Store',
    href: '/work/mobile-launch/',
  },
  {
    src: '/images/erp-odoo.webp',
    w: 1300,
    h: 777,
    alt: 'An Odoo dashboard for the ERP, showing Sales, Finance and Logistics modules. All figures are masked.',
    caption: 'The ERP, figures masked',
    href: '/work/erp/',
  },
];

export function ShippedStrip() {
  return (
    <section
      className="border-t"
      style={{ borderColor: 'var(--rule)', background: 'var(--surface-sunk)' }}
    >
      <Container width="wide" className="py-10 sm:py-14">
        <PlainHeading
          title="What is actually running"
          intro="Four of the surfaces behind the figures above. Two internal platforms, one store listing and the external ERP."
        />

        <ul
          className="tv-stagger mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          data-reveal
        >
          {SHIPPED.map((shot) => (
            <li key={shot.src + shot.caption}>
              <Link prefetch={false} href={shot.href} className="group block">
                <figure>
                  <div
                    className="tv-lift tv-zoom overflow-hidden rounded-[var(--radius)] border"
                    style={{ borderColor: 'var(--rule)', background: 'var(--surface)' }}
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.w}
                      height={shot.h}
                      loading="lazy"
                      /* 16:10, which is the native ratio of the EverLoop
                         captures, so the two screens that matter most are shown
                         whole rather than cropped to a corner. A 4:3 window on a
                         16:10 screenshot lands on the navigation bar and renders
                         as a white rectangle. */
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                  </div>
                  <figcaption
                    className="mt-2.5 text-[length:var(--text-small)] transition-colors group-hover:text-[color:var(--accent-ink)]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {shot.caption}
                  </figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------- Work tiles --- */

/**
 * The four non-featured entries as tiles with their real media, instead of as
 * four rows of text under a hairline.
 *
 * The live page demotes them to a divided list, which is the right call for
 * hierarchy and the wrong one for evidence: three of the four have a real
 * screenshot sitting unused in public/images, and the list renders none of
 * them. A tile is a fifth of a featured card and still shows the work.
 */
export function WorkTiles() {
  const rest = workEntries.filter((e) => !e.featured);

  return (
    <ul className="tv-stagger mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2" data-reveal>
      {rest.map((entry) => (
        <li
          key={entry.href}
          className="tv-lift tv-zoom relative overflow-hidden rounded-[var(--radius)] border"
          style={{ borderColor: 'var(--rule)', background: 'var(--surface)' }}
        >
          <div className="flex gap-4 p-4">
            {entry.visual && (
              <div
                className="hidden h-[4.5rem] w-[6.5rem] shrink-0 overflow-hidden rounded-[6px] border sm:block"
                style={{ borderColor: 'var(--rule)' }}
              >
                <Image
                  src={entry.visual.src}
                  alt=""
                  width={entry.visual.width}
                  height={entry.visual.height}
                  loading="lazy"
                  className="h-full w-full object-cover object-left-top"
                />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-[length:var(--text-label)] tabular-nums"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {workNumber(entry.href)}
                </span>
                {entry.status && <Badge status={entry.status} />}
              </div>

              <h3 className="mt-2 font-display text-[length:var(--text-h3)] leading-snug font-semibold">
                <Link
                  prefetch={false}
                  href={entry.href}
                  className="transition-opacity after:absolute after:inset-0 after:content-[''] hover:opacity-70"
                >
                  {entry.navLabel}
                </Link>
              </h3>

              <p
                className="mt-1.5 text-[length:var(--text-small)] text-pretty"
                style={{ color: 'var(--text-muted)' }}
              >
                {entry.description}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------- Specimen --- */

/**
 * The recreated requirement, on the page rather than behind a summary element.
 *
 * The live page folds this, along with the six method rules, the trace chain,
 * the delivery log and the timeline: five disclosures on one landing page. A
 * reader spending forty seconds opens none of them, which means the single
 * artefact that demonstrates the skill the whole page claims is, in practice,
 * not on the page. Folding is the right treatment for the log. It is the wrong
 * treatment for the one worked example.
 */
export function SpecimenPanel() {
  return (
    <div>
      <h3 className="font-display text-[length:var(--text-h3)] font-semibold">
        A requirement I wrote
      </h3>
      <p
        className="mt-2 max-w-[60ch] text-[length:var(--text-small)]"
        style={{ color: 'var(--text-muted)' }}
      >
        {specimenIntro}
      </p>

      <article
        className="mt-6 rounded-[var(--radius)] p-6 sm:p-8"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <h4 className="text-[length:var(--text-body)] font-medium">{specimen.title}</h4>
        <p
          className="mt-2 max-w-[42rem] text-[length:var(--text-small)]"
          style={{ color: 'var(--text-muted)' }}
        >
          {specimen.standfirst}
        </p>

        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          {specimen.sections.map((section) => (
            <section key={section.heading}>
              <h5
                className="text-[length:var(--text-label)] font-medium tracking-wide uppercase"
                style={{ color: 'var(--text-muted)' }}
              >
                {section.heading}
              </h5>
              <ul className="mt-2 space-y-1.5">
                {section.lines.map((line) => (
                  <li
                    key={line.slice(0, 40)}
                    className="pl-4 text-[length:var(--text-small)] leading-relaxed"
                    style={{ borderLeft: '1px solid var(--border)' }}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p
          className="mt-7 max-w-[42rem] text-[length:var(--text-small)] leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          {specimen.footnote}
        </p>
      </article>
    </div>
  );
}
