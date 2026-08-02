/**
 * The CAdmin → EverLoop lifecycle, drawn rather than screenshotted.
 *
 * Hand-authored markup rather than SVG or an image: it reflows to one column
 * on a phone, themes from CSS variables, and a screen reader reads it as an
 * ordered list of paired steps without a separate text equivalent to keep in
 * sync.
 *
 * Source: the EverLoop Course Release Guide (F77–F80). Two things from that
 * document are deliberately not here — the daily sync hour and the internal
 * bug-report link. Both are operational detail with no portfolio value and
 * some operational risk (sensitive register, 2026-08-02).
 */

type Step = {
  trigger: string;
  effect: string;
  /** Marks the rule that most often surprises people. */
  emphasis?: boolean;
};

const STEPS: Step[] = [
  {
    trigger: 'Student created',
    effect: 'Account created, credentials sent to the parent. No courses yet.',
  },
  {
    trigger: 'Class start date arrives',
    effect: 'Courses appear, scoped to the child’s level and subject.',
    emphasis: true,
  },
  {
    trigger: 'Previously enrolled',
    effect:
      'Past-year lessons unlock, filtered to the months actually attended, plus three levels back for papers and packs.',
  },
  {
    trigger: 'Final class ends',
    effect: 'Content stays visible through to that date, not from when a withdrawal is keyed.',
  },
  {
    trigger: 'Five days, no active classes',
    effect: 'The student is deregistered. Nothing new is released after this.',
  },
  {
    trigger: 'After deregistration',
    effect: 'The account stays live for at least six months. Nothing already unlocked is lost.',
  },
];

export function ReleaseFlow() {
  return (
    <figure>
      <div
        className="overflow-hidden rounded-[var(--radius)] border"
        style={{ borderColor: 'var(--rule)', background: 'var(--surface)' }}
      >
        <div
          className="grid grid-cols-[1fr] border-b sm:grid-cols-[minmax(0,13rem)_1fr]"
          style={{ borderColor: 'var(--rule)', background: 'var(--surface-sunk)' }}
        >
          {/* Stacked, the two-column headings would label only the first half
              of each pair, so one combined label takes over. */}
          <ColumnLabel className="sm:hidden">CAdmin V2 → EverLoop</ColumnLabel>
          <ColumnLabel className="hidden sm:block">CAdmin V2 — the engine</ColumnLabel>
          <ColumnLabel className="hidden sm:block sm:border-l">
            EverLoop — the display
          </ColumnLabel>
        </div>

        <ol>
          {STEPS.map((step, i) => (
            <li
              key={step.trigger}
              className={`grid grid-cols-[1fr] sm:grid-cols-[minmax(0,13rem)_1fr] ${
                i > 0 ? 'border-t' : ''
              }`}
              style={{ borderColor: 'var(--rule)' }}
            >
              <div className="flex items-start gap-2.5 px-4 py-3">
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] h-[6px] w-[6px] shrink-0 rounded-full"
                  style={{
                    background: step.emphasis ? 'var(--accent)' : 'transparent',
                    border: `1.5px solid ${step.emphasis ? 'var(--accent)' : 'var(--text-muted)'}`,
                  }}
                />
                <span
                  className="font-mono text-[length:var(--text-label)] leading-relaxed"
                  style={{ color: step.emphasis ? 'var(--accent-ink)' : 'var(--text-muted)' }}
                >
                  {step.trigger}
                </span>
              </div>

              <div
                className="px-4 pb-3 text-[length:var(--text-small)] sm:border-l sm:py-3"
                style={{ borderColor: 'var(--rule)' }}
              >
                {/* Only meaningful on the stacked layout, where the two halves
                    would otherwise run together as one paragraph. */}
                <span aria-hidden="true" className="mr-1.5 sm:hidden" style={{ color: 'var(--accent)' }}>
                  →
                </span>
                {step.effect}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <figcaption
        className="mt-3 max-w-[60ch] text-[length:var(--text-small)]"
        style={{ color: 'var(--text-muted)' }}
      >
        One source of truth. Every rule above is keyed in CAdmin and read by EverLoop, so a record
        is never corrected in two places — and nobody has to remember to release anything.
      </figcaption>
    </figure>
  );
}

function ColumnLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`px-4 py-2 font-mono text-[0.6875rem] tracking-[0.1em] uppercase ${className}`}
      style={{ color: 'var(--text-muted)', borderColor: 'var(--rule)' }}
    >
      {children}
    </span>
  );
}
