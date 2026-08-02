import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Three variants, one size. 40px high (compact rhythm), radius 8, 14px/500.
 *
 * Replaces the two ad-hoc button styles that were defined inline in the hero
 * and reused nowhere.
 */
type Variant = 'primary' | 'secondary' | 'quiet';

const BASE =
  'inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius)] px-4 text-[length:var(--text-small)] font-medium transition-colors';

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
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  download?: boolean;
  children: ReactNode;
}) {
  const v = VARIANT[variant];

  // Route navigation goes through next/link so moving between case studies is
  // instant. A download or an external target must stay a plain anchor.
  if (href.startsWith('/') && !download && !external) {
    return (
      <Link prefetch={false} href={href} className={v.className} style={v.style}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={v.className}
      style={v.style}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: '' } : {})}
    >
      {children}
    </a>
  );
}
