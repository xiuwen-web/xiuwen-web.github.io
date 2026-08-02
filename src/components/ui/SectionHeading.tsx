/**
 * The three-part pattern:
 *
 *   [ WORK ]              eyebrow — mono, uppercase, muted
 *   Selected projects     h2
 *   Three in detail…      lede — small, muted, capped at 60ch
 *
 * The bracketed eyebrow is the single change that most fixes hierarchy. Every
 * section previously opened identically, so nothing signalled where you were.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <header>
      <p
        className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
        style={{ color: 'var(--text-muted)' }}
      >
        <span aria-hidden="true">[ </span>
        {eyebrow}
        <span aria-hidden="true"> ]</span>
      </p>

      <h2 className="mt-1 text-[length:var(--text-h2)] leading-tight font-semibold">{title}</h2>

      {lede && (
        <p
          className="mt-2 max-w-[60ch] text-[length:var(--text-small)]"
          style={{ color: 'var(--text-muted)' }}
        >
          {lede}
        </p>
      )}
    </header>
  );
}
