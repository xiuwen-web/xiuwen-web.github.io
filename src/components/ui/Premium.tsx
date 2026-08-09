import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Section';
import { Badge, Chip } from '@/components/ui/Badge';
import { HandoffSummary } from '@/components/ui/Diagram';
import { PhaseStrip } from '@/components/ui/RolloutDiagram';
import { SurfaceStrip } from '@/components/ui/Diagram';
import { Portrait } from '@/components/ui/Portrait';
import { workEntries, workNumber } from '@/content/navigation';
import { profile } from '@/content/profile';
import { handoff } from '@/content/process';
import { hasResume, RESUME_ARIA, RESUME_LABEL } from '@/content/resume';
import { SITE_URL } from '@/content/site';
import { appLinks, snapshot, snapshotClosing } from '@/content/snapshot';

/**
 * Premium components for Variant D. Same content and same tokens as the
 * rest of the site; different materials.
 */

/* ---------------------------------------------------------- Buttons --- */

/**
 * The island button. Label, then the arrow in its own circular well
 * flush with the right inner padding, so the control has an interior
 * rather than being a rectangle with a glyph after the text.
 */
export function IslandButton({
  href,
  external = false,
  variant = 'primary',
  ariaLabel,
  children,
}: {
  href: string;
  external?: boolean;
  variant?: 'primary' | 'secondary';
  ariaLabel?: string;
  children: ReactNode;
}) {
  const primary = variant === 'primary';

  const style: React.CSSProperties = primary
    ? {
        background: 'var(--accent-ink)',
        color: '#fff',
        boxShadow: 'var(--px-elev-2), inset 0 1px 0 rgb(255 255 255 / 0.18)',
      }
    : {
        background: 'var(--surface)',
        color: 'var(--text)',
        boxShadow: 'var(--px-elev-1), inset 0 0 0 1px color-mix(in srgb, var(--text) 12%, transparent)',
      };

  const wellStyle: React.CSSProperties = primary
    ? { background: 'rgb(255 255 255 / 0.18)', color: '#fff' }
    : { background: 'color-mix(in srgb, var(--text) 7%, transparent)', color: 'var(--text)' };

  const inner = (
    <>
      <span>{children}</span>
      <span className="px-btn-well" style={wellStyle} aria-hidden="true">
        <Arrow />
      </span>
    </>
  );

  const cls = 'px-btn text-[length:var(--text-small)] sm:text-[length:var(--text-body)]';

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={cls}
        style={style}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link prefetch={false} href={href} aria-label={ariaLabel} className={cls} style={style}>
      {inner}
    </Link>
  );
}

/** Ultra-light stroke, per the icon rule. Nothing heavier than 1.4. */
function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 12.5 12.5 3.5M6 3.5h6.5V10" />
    </svg>
  );
}

/* -------------------------------------------------------------- Hero --- */

/**
 * Structurally the hero that shipped. Materially, everything changed:
 * display type at 50px with -0.032em tracking instead of 44px at
 * default, the portrait in a bezel, the handoff summary in a machined
 * tray, island buttons, and the store listings as trayed tiles rather
 * than as four underlined links.
 */
export function PremiumHero() {
  return (
    /*
     * Premium spacing stops at the hero.
     *
     * The first pass ran pt-28 with the display at 60px, which is the
     * correct agency instinct and the wrong call here: it pushed the four
     * store listings below the fold. Those listings are the fastest thing
     * on this page for a stranger to verify, and the whole hero was
     * rebuilt once already to lift them above it. A hero that breathes
     * beautifully and hides the proof is a worse hero.
     */
    <section id="top" className="pt-12 pb-16 sm:pt-24 sm:pb-24">
      <Container width="content">
        <div className="mb-8 flex items-center gap-5">
          <div className="px-tray-sm shrink-0" style={{ borderRadius: '999px', padding: '4px' }}>
            <div className="px-core-sm" style={{ borderRadius: '999px' }}>
              <Portrait />
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-[1.125rem] leading-tight font-semibold tracking-[-0.018em] sm:text-[1.25rem]">
              {profile.fullName}
            </p>
            <p
              className="mt-1 text-[length:var(--text-small)] leading-snug"
              style={{ color: 'var(--text-muted)' }}
            >
              {profile.role}
            </p>
          </div>
        </div>

        <div className="lg:flex lg:items-start lg:gap-14">
          <div className="min-w-0 lg:flex-1">
            {/* 50px at lg, not 60. The headline is two sentences and the
                second is long; at 60px it set to five display lines. The
                tracking is doing more of the work than the size is. */}
            <h1 className="px-display text-[2rem] text-balance sm:text-[2.625rem] lg:text-[3.125rem]">
              {profile.heroHeadline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-pretty"
              style={{ color: 'var(--text-muted)' }}
            >
              {profile.heroSupport}
            </p>

            {/* The employment record, as a trayed strip rather than a mono
                run. It is the single most trust-generating line on the page
                and it was set like a footnote. */}
            <div className="px-tray-sm mt-7 inline-block">
              <div className="px-core-sm px-4 py-2.5">
                <p className="px-nums font-mono text-[length:var(--text-small)] leading-relaxed">
                  <span className="font-medium">{profile.currentRole.title}</span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    <span aria-hidden="true"> · </span>
                    {profile.currentRole.employer}
                    <span aria-hidden="true"> · </span>
                    {profile.location}
                    <span aria-hidden="true"> · </span>
                    since {profile.currentRole.since}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <IslandButton href="#work">View selected work</IslandButton>
              {hasResume && (
                <IslandButton
                  href={profile.resumePath}
                  variant="secondary"
                  external
                  ariaLabel={RESUME_ARIA}
                >
                  {RESUME_LABEL}
                </IslandButton>
              )}
            </div>
          </div>

          <div className="hidden lg:block lg:w-[20rem] lg:shrink-0">
            <p className="px-pill">How a change moves</p>
            <div className="px-tray mt-4">
              <div className="px-core p-3">
                <HandoffSummary steps={handoff} />
              </div>
            </div>
            <a
              href="#process"
              className="mt-4 inline-flex min-h-11 items-center text-[length:var(--text-label)] leading-snug underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: 'var(--accent-ink)' }}
            >
              Two of the seven are someone else&rsquo;s, see how I work
            </a>
          </div>
        </div>

        {/* The four store listings, as objects. They are the fastest thing
            on the page for a reader to verify, and they were set as the
            smallest text in the hero. */}
        <div className="mt-11">
          <p className="px-label text-[0.6875rem]" style={{ color: 'var(--text-muted)' }}>
            Live now
          </p>
          <ul className="px-stagger mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2" data-reveal>
            {appLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-tray-sm group block"
                >
                  <span className="px-core-sm flex min-h-11 items-center justify-between gap-3 px-4 py-3">
                    <span className="min-w-0">
                      <span className="block truncate text-[length:var(--text-small)] font-medium">
                        {link.label}
                      </span>
                      <span
                        className="px-nums mt-0.5 block text-[length:var(--text-label)]"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {link.note}
                      </span>
                    </span>
                    <span
                      className="px-btn-well shrink-0"
                      aria-hidden="true"
                      style={{
                        background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                        color: 'var(--accent-ink)',
                      }}
                    >
                      <Arrow />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------- Proof band --- */

/**
 * The figures at 64px in tabular Geist Mono, on the navy band that
 * variant B introduced. The band token still flips direction by theme —
 * a dark band on a light page, a raised one on a dark page.
 */
export function PremiumProofBand() {
  return (
    <section
      id="snapshot"
      className="relative"
      style={{ background: 'var(--band)', color: 'var(--band-text)' }}
    >
      <span
        aria-hidden="true"
        className="blueprint blueprint-fade pointer-events-none absolute inset-0"
        style={{ opacity: 'var(--band-grid)' }}
      />

      <Container width="wide" className="relative py-20 sm:py-28">
        <dl className="px-stagger grid grid-cols-2 gap-x-10 gap-y-14 lg:grid-cols-4" data-reveal>
          {snapshot.map((fact) => (
            <div key={fact.label}>
              <dt
                className="px-nums font-mono text-[2.75rem] leading-none font-medium sm:text-[3.5rem]"
                style={{ color: 'var(--band-figure)' }}
              >
                {fact.figure}
              </dt>
              <dd className="mt-4">
                <span className="block text-[length:var(--text-body)] font-medium tracking-[-0.012em]">
                  {fact.label}
                </span>
                <span
                  className="mt-1.5 block text-[length:var(--text-small)] leading-snug"
                  style={{ color: 'var(--band-muted)' }}
                >
                  {fact.qualifier}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div
          className="mt-16 flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          style={{ borderColor: 'var(--band-rule)' }}
        >
          <p
            className="max-w-[45rem] text-[length:var(--text-small)] text-pretty"
            style={{ color: 'var(--band-muted)' }}
          >
            {snapshotClosing}
          </p>
          <p
            className="px-nums shrink-0 font-mono text-[length:var(--text-label)]"
            style={{ color: 'var(--band-muted)' }}
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

/* ---------------------------------------------------- Featured cards --- */

/**
 * The two flagship entries, each in a tray. The media sits in the core
 * at the concentric radius, and the whole enclosure rises four pixels
 * on hover while the light beneath it spreads from elev-2 to elev-3.
 */
export function PremiumFeatured() {
  const featured = workEntries.filter((e) => e.featured);

  return (
    /*
     * items-stretch plus a flex column all the way down, so the two
     * trays are the same height and the two "Read the case study" lines
     * land on the same baseline.
     *
     * They did not in the first pass: CAdmin carries four chips that wrap
     * to two rows and EverLoop's four fit on one, so the calls to action
     * sat 15px apart. Two cards side by side with their footers at
     * different heights is the detail that makes a grid look assembled
     * rather than designed, and it is invisible until it is pointed at.
     */
    <ul className="px-stagger grid items-stretch gap-7 sm:grid-cols-2" data-reveal>
      {featured.map((entry) => (
        <li key={entry.href} className="px-tray relative flex">
          <article className="px-core flex flex-1 flex-col">
            {entry.diagram === 'rollout' && <PhaseStrip />}
            {entry.diagram === 'surfaces' && <SurfaceStrip />}

            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {entry.status && <Badge status={entry.status} />}
                <span
                  className="px-nums font-mono text-[length:var(--text-label)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {workNumber(entry.href)}
                </span>
              </div>

              <h3 className="mt-5 text-[1.375rem] leading-snug font-semibold tracking-[-0.022em] sm:text-[1.5rem]">
                <Link
                  prefetch={false}
                  href={entry.href}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {entry.navLabel}
                </Link>
              </h3>

              <p
                className="mt-3 text-[length:var(--text-small)] leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                {entry.description}
              </p>

              {entry.chips && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {entry.chips.map((chip) => (
                    <li key={chip}>
                      <Chip>{chip}</Chip>
                    </li>
                  ))}
                </ul>
              )}

              <p
                aria-hidden="true"
                className="mt-auto inline-flex items-center gap-2 pt-7 text-[length:var(--text-small)] font-medium"
                style={{ color: 'var(--accent-ink)' }}
              >
                Read the case study
                <span
                  className="px-btn-well"
                  style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                  }}
                >
                  <Arrow />
                </span>
              </p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------- Work tiles --- */

export function PremiumWorkTiles() {
  const rest = workEntries.filter((e) => !e.featured);

  return (
    <ul className="px-stagger mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2" data-reveal>
      {rest.map((entry) => (
        <li key={entry.href} className="px-tray relative">
          <div className="px-core flex gap-4 p-4">
            {entry.visual && (
              <div
                className="hidden h-[4.75rem] w-[6.75rem] shrink-0 overflow-hidden sm:block"
                style={{
                  borderRadius: 'var(--px-r-xs)',
                  boxShadow: 'inset 0 0 0 1px color-mix(in srgb, var(--text) 10%, transparent)',
                }}
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
                  className="px-nums font-mono text-[length:var(--text-label)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {workNumber(entry.href)}
                </span>
                {entry.status && <Badge status={entry.status} />}
              </div>

              <h3 className="mt-2.5 text-[length:var(--text-h3)] leading-snug font-semibold tracking-[-0.018em]">
                <Link
                  prefetch={false}
                  href={entry.href}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {entry.navLabel}
                </Link>
              </h3>

              <p
                className="mt-2 text-[length:var(--text-small)] leading-relaxed text-pretty"
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

/* ----------------------------------------------------- Shipped strip --- */

const SHIPPED = [
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

export function PremiumShipped() {
  return (
    <section
      className="relative"
      style={{ background: 'color-mix(in srgb, var(--text) 3%, var(--bg))' }}
    >
      <Container width="wide" className="py-20 sm:py-28">
        <p className="px-pill">Shipped</p>
        <h2 className="px-h2 mt-5 text-[1.875rem] sm:text-[2.25rem]">What is actually running</h2>
        <p
          className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-pretty"
          style={{ color: 'var(--text-muted)' }}
        >
          Four of the surfaces behind the figures above. Two internal platforms, one store listing
          and the external ERP.
        </p>

        <ul
          className="px-stagger mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          data-reveal
        >
          {SHIPPED.map((shot) => (
            <li key={shot.src + shot.caption}>
              <Link prefetch={false} href={shot.href} className="px-tray group block">
                <figure>
                  <div className="px-core">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.w}
                      height={shot.h}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                  </div>
                  <figcaption
                    className="mt-3.5 flex items-center justify-between gap-2 px-1 pb-1 text-[length:var(--text-small)] font-medium"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {shot.caption}
                    <span
                      aria-hidden="true"
                      className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ color: 'var(--accent-ink)' }}
                    >
                      <Arrow />
                    </span>
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
