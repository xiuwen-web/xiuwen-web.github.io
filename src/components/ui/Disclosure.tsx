import type { ReactNode } from 'react';

/**
 * An expandable section (refinement doc §1: "move long process explanations and
 * detailed delivery logs into dedicated pages or expandable sections").
 *
 * Native `<details>` rather than state and a click handler. This site is a
 * static export, so a disclosure built in React costs a client component and a
 * hydration boundary to reproduce behaviour the element already has — including
 * keyboard operation, the correct ARIA semantics, and find-in-page opening the
 * section when the match is inside it.
 *
 * Closed by default. What is behind one of these is evidence for a reader who
 * wants it, not something the page depends on having read.
 */
export function Disclosure({
  summary,
  hint,
  className = '',
  children,
}: {
  summary: string;
  /** What is inside, so opening it is a decision rather than a gamble. */
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <details
      className={`group rounded-[var(--radius)] border ${className}`}
      style={{ borderColor: 'var(--rule)' }}
    >
      <summary
        className="flex cursor-pointer list-none items-start gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[length:var(--text-small)] font-medium">{summary}</span>
          {hint && (
            <span
              className="mt-1 block text-[length:var(--text-label)] leading-snug"
              style={{ color: 'var(--text-muted)' }}
            >
              {hint}
            </span>
          )}
        </span>

        {/* Rotates to point down when open. Decorative — the element already
            exposes its state to a screen reader. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-1 h-4 w-4 shrink-0 transition-transform group-open:rotate-90"
          style={{ color: 'var(--accent)' }}
        >
          <path d="M6 3l5 5-5 5" />
        </svg>
      </summary>

      <div className="border-t px-5 pt-6 pb-6" style={{ borderColor: 'var(--rule)' }}>
        {children}
      </div>
    </details>
  );
}
