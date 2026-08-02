import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import {
  ACTIVE_KEY_TO_HREF,
  PRIMARY_NAV,
  workEntries,
  workNumber,
} from '@/content/navigation';
import { profile, socialLinks } from '@/content/profile';

/**
 * The rail (PORTFOLIO_SIDEBAR_FLOW_REVISION.md, 2026-08-02).
 *
 *   Identity → primary navigation → the four case studies → Connect → footer
 *
 * On a case-study page the four-item list is replaced by an in-page table of
 * contents, per §"Case Study In-Page Navigation". Primary navigation stays
 * visible in both modes so a reader is never stranded on a subpage with no way
 * back into the site — the TOC replaces the project list, not the whole rail.
 */

export type TocItem = { id: string; label: string };

export function Sidebar({
  active,
  toc,
  tocTitle,
  backHref = '/#work',
  backLabel = 'All work',
}: {
  active?: string;
  toc?: TocItem[];
  tocTitle?: string;
  /** WriteWise goes back to the ecosystem it belongs to, not to the index. */
  backHref?: string;
  backLabel?: string;
}) {
  const activeHref = active ? ACTIVE_KEY_TO_HREF[active] : undefined;
  // "Keep global navigation more compact on case-study pages" and "the local
  // case-study navigation should take priority over the global navigation".
  const onCaseStudy = Boolean(toc && toc.length);

  return (
    <aside
      className="relative hidden w-[19rem] shrink-0 lg:block"
      style={{ background: 'var(--rail-bg)' }}
    >
      <div className="sticky top-0 h-screen overflow-y-auto">
        {/*
          Inside the sticky box, not the column. The column is as tall as the
          page and a canvas that size would be drawn almost entirely off screen
          at real cost. Decorative: sized and drawn by script, harmless without.
        */}
        <canvas
          id="rail-glow"
          aria-hidden="true"
          // Sized in device pixels by script before React hydrates, so React
          // finds two attributes it did not render. Deliberate.
          suppressHydrationWarning
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        <div className="relative flex min-h-full flex-col px-5 py-6">
          <Identity compact={onCaseStudy} />

          <nav aria-label="Sections" className={onCaseStudy ? 'mt-5' : 'mt-7'}>
            <ul className="space-y-px">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <RailLink
                    href={item.href}
                    current={active === item.key}
                    compact={onCaseStudy}
                  >
                    {item.label}
                  </RailLink>
                </li>
              ))}
            </ul>
          </nav>

          {toc && toc.length > 0 ? (
            <nav
              aria-label="On this page"
              className="mt-5 border-t pt-4"
              style={{ borderColor: 'var(--rail-rule)' }}
            >
              <RailLink href={backHref} muted compact>
                <span aria-hidden="true">← </span>
                {backLabel}
              </RailLink>
              <div className="mt-4">
                <RailHeading>{tocTitle ?? 'On this page'}</RailHeading>
              </div>
              <ul className="mt-2 space-y-px">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      data-toc-link={item.id}
                      // The scroll-spy writes colour and weight onto these
                      // before React hydrates, so React finds inline styles it
                      // did not render. Deliberate, and the same reason the
                      // rail canvas carries this.
                      suppressHydrationWarning
                      className={LINK_COMPACT}
                      style={{ color: 'var(--rail-muted)', paddingLeft: '1rem' }}
                    >
                      <span
                        aria-hidden="true"
                        data-toc-bar
                        suppressHydrationWarning
                        className="absolute top-1 bottom-1 left-0 w-[2px] rounded-full opacity-0"
                        style={{ background: 'var(--rail-accent)' }}
                      />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <nav aria-label="Case studies" className="mt-8">
              <RailHeading>Case studies</RailHeading>
              <ul className="mt-2 space-y-px">
                {workEntries.map((entry) => (
                  <li key={entry.href}>
                    <RailLink
                      href={entry.href}
                      current={activeHref === entry.href}
                      number={workNumber(entry.href)}
                    >
                      {entry.navLabel}
                    </RailLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {!onCaseStudy && (
            <div className={onCaseStudy ? 'mt-6' : 'mt-8'}>
              <RailHeading>Connect</RailHeading>
              <ul className="mt-2 space-y-px">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <RailLink href={link.href} external>
                      {link.label}
                    </RailLink>
                  </li>
                ))}
                <li>
                  <RailLink href={`mailto:${profile.email}`} external>
                    Email
                  </RailLink>
                </li>
              </ul>
            </div>
          )}

          <div
            className="mt-auto flex items-center justify-between border-t pt-4"
            style={{ borderColor: 'var(--rail-rule)' }}
          >
            <span
              className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
              style={{ color: 'var(--rail-muted)' }}
            >
              {profile.location}
            </span>
            <ThemeToggle onRail />
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------ Identity --- */

export function Identity({ compact = false }: { compact?: boolean }) {
  return (
    // min-w-0 so the name can truncate rather than push the mobile header
    // wider than the viewport. Without it every page scrolled 1px sideways.
    <div className="min-w-0">
      <Link prefetch={false} href="/#top" className="flex min-w-0 items-center gap-3">
        {/*
          Monogram, not a photograph — there is no photograph yet. A blank
          circle reads as a broken image; two letters read as a decision.
          Deliberately quieter than the name beside it: the revision asks for
          the name and positioning to carry more visual weight than the badge.
        */}
        <span
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center rounded-full border font-mono font-medium ${
            compact
              ? 'h-8 w-8 text-[0.625rem]'
              : 'h-10 w-10 text-[0.75rem] tracking-[0.02em]'
          }`}
          style={{
            borderColor: 'color-mix(in srgb, var(--rail-accent) 45%, transparent)',
            color: 'var(--rail-accent)',
          }}
        >
          XW
        </span>
        <span className="min-w-0">
          <span
            className={`block font-display leading-tight font-semibold ${
              compact ? 'text-[0.9375rem]' : 'text-[1.0625rem]'
            }`}
            style={{ color: 'var(--rail-text)' }}
          >
            {profile.name}
          </span>
          <span
            className="mt-0.5 block truncate text-[length:var(--text-label)] leading-tight"
            style={{ color: 'var(--rail-muted)' }}
          >
            {profile.role}
          </span>
        </span>
      </Link>

      {!compact && (
        <p
          className="mt-3 text-[length:var(--text-label)] leading-relaxed"
          style={{ color: 'var(--rail-muted)' }}
        >
          {profile.tagline}
        </p>
      )}
    </div>
  );
}

/* ----------------------------------------------------------- Fragments --- */

export function RailHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="px-3 font-mono text-[0.6875rem] tracking-[0.12em] uppercase"
      style={{ color: 'color-mix(in srgb, var(--rail-accent) 55%, var(--rail-muted))' }}
    >
      {children}
    </p>
  );
}

/**
 * Two sizes (SIDEBAR_REFINEMENT §Global Navigation Styling, §Sidebar Density).
 *
 *   roomy    44px tall, 16px left padding, 6px radius, 18px text. Global
 *            navigation and the four case studies.
 *   compact  the in-page table of contents, and the global navigation once a
 *            case study is open — the refinement asks for local navigation to
 *            take priority there, and for the rail not to need scrolling.
 */
const LINK_BASE = 'relative block truncate pr-3 transition-colors';

const LINK_ROOMY = `${LINK_BASE} min-h-[44px] flex items-center rounded-md text-[1.125rem]`;

const LINK_COMPACT = `${LINK_BASE} py-1 rounded-[4px] text-[length:var(--text-small)]`;

/**
 * Active state: a 2px teal rule on the left, a faint ground and brighter text.
 * The previous treatment was a full-width rounded pill, which the revision
 * asked to lose — at rail width it read as a button rather than as "you are
 * here".
 */
export function RailLink({
  href,
  current = false,
  external = false,
  muted = false,
  compact = false,
  number,
  children,
}: {
  href: string;
  compact?: boolean;
  current?: boolean;
  external?: boolean;
  muted?: boolean;
  number?: string | null;
  children: React.ReactNode;
}) {
  const style: React.CSSProperties = {
    color: current ? 'var(--rail-text)' : 'var(--rail-muted)',
    background: current
      ? 'color-mix(in srgb, var(--rail-accent) 9%, transparent)'
      : undefined,
    fontWeight: current ? 500 : 400,
    paddingLeft: '1rem',
    opacity: muted ? 0.85 : 1,
  };

  const inner = (
    <>
      {current && (
        <span
          aria-hidden="true"
          className="absolute top-1 bottom-1 left-0 w-[2px] rounded-full"
          style={{ background: 'var(--rail-accent)' }}
        />
      )}
      {number && (
        <span
          className="mr-2.5 font-mono text-[0.6875rem] tabular-nums"
          // No opacity: dimming --rail-muted to 0.7 put these at 3.91:1.
          // The mono face and smaller size already separate them from the label.
          style={{ color: current ? 'var(--rail-accent)' : 'inherit' }}
        >
          {number}
        </span>
      )}
      {children}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={compact ? LINK_COMPACT : LINK_ROOMY}
        style={style}
        {...(href.startsWith('mailto:')
          ? {}
          : { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      prefetch={false}
      href={href}
      className={compact ? LINK_COMPACT : LINK_ROOMY}
      style={style}
      aria-current={current ? 'page' : undefined}
    >
      {inner}
    </Link>
  );
}
