import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Three variants, one size. 44px high, radius 8, 14px/500.
 *
 * Replaces the two ad-hoc button styles that were defined inline in the hero
 * and reused nowhere.
 *
 * Was h-10. 40px is a perfectly good desktop button and 4px under the touch
 * minimum, and these are the two buttons a recruiter reaches for on a phone.
 * The compact rhythm survives the change — at 14px text the box still reads
 * tight rather than chunky.
 */
type Variant = 'primary' | 'secondary' | 'quiet';

const BASE =
  'inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius)] px-4 text-[length:var(--text-small)] font-medium transition-colors';

const VARIANT: Record<Variant, { className: string; style: React.CSSProperties }> = {
  primary: {
    className: `${BASE} hover:opacity-90`,
    // --accent-ink, not --accent. As a text ground the supplied teal gives
    // 4.36:1 against the page colour, which axe correctly flags at 14px; the
    // ink variant is 5.12:1. Dark mode resolves both tokens to mist teal, so
    // this is a light-theme correction only.
    style: { background: 'var(--accent-ink)', color: 'var(--bg)' },
  },
  secondary: {
    className: `${BASE} border hover:bg-[var(--surface-sunk)]`,
    style: { borderColor: 'var(--rule)', color: 'var(--text)' },
  },
  quiet: {
    className:
      'inline-flex items-center gap-1.5 text-[length:var(--text-small)] font-medium underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70',
    style: { color: 'var(--accent-ink)' },
  },
};

export function Button({
  href,
  variant = 'secondary',
  external = false,
  download = false,
  ariaLabel,
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  download?: boolean;
  /** For a label that needs to say more than the visible text, e.g. a file type. */
  ariaLabel?: string;
  children: ReactNode;
}) {
  const v = VARIANT[variant];

  // Route navigation goes through next/link so moving between case studies is
  // instant. A download or an external target must stay a plain anchor.
  if (href.startsWith('/') && !download && !external) {
    return (
      <Link prefetch={false} href={href} className={v.className} style={v.style} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={v.className}
      style={v.style}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: '' } : {})}
    >
      {children}
    </a>
  );
}

/**
 * A document. It carried a download arrow while the label said "Download";
 * the label now says "View" and the link opens a tab, so the arrow went with
 * it rather than promising a save that never happens.
 *
 * Sized to the button's 14px text rather than to a fixed pixel value, so it
 * tracks the label if the type scale ever moves.
 */
export function DocumentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[1.05em] shrink-0"
    >
      <path d="M9 1.75H4.25a1.5 1.5 0 0 0-1.5 1.5v9.5a1.5 1.5 0 0 0 1.5 1.5h7.5a1.5 1.5 0 0 0 1.5-1.5V6z" />
      <path d="M9 1.75V6h4.25" />
      <path d="M5.5 8.75h5M5.5 11.25h3" />
    </svg>
  );
}
