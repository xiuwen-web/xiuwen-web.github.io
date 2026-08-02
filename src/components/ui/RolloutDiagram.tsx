/**
 * The CAdmin V2 rollout, drawn rather than screenshotted — that system holds
 * live student records and is never captured (PRD §22).
 *
 * Plain markup rather than SVG so it reflows on a phone, themes from CSS
 * variables, and is read correctly by a screen reader without a separate text
 * equivalent to keep in sync.
 */

type Phase = {
  name: string;
  /** Without the "Phase N —" prefix, for the narrow card strip. */
  short: string;
  objective: string;
  when: string;
  shipped: boolean;
};

const PHASES: Phase[] = [
  {
    name: 'Phase 1 — Core modules',
    short: 'Core modules',
    objective: 'The backbone: centres, users, classes, students, attendance, and the historical data migration',
    when: 'Tested 30 May · live 4 Aug 2025',
    shipped: true,
  },
  {
    name: 'Phase 2 — Quick wins',
    short: 'Quick wins',
    objective: 'Small improvements to workflows people already used every day',
    when: 'Extended 8 Sep 2025',
    shipped: true,
  },
  {
    name: 'Phase 3 — Enhancements',
    short: 'Enhancements',
    objective: 'Extending what existed: suspensions, transfers, exports, dashboards',
    when: 'Released to everyone 22 Oct 2025',
    shipped: true,
  },
  {
    name: 'Phase 4 — New features',
    short: 'New features',
    objective: 'Twelve modules that did not exist before, HR and payroll first',
    when: 'In progress',
    shipped: false,
  },
];

/**
 * The featured-card stand-in for CAdmin, which has no screenshot and never
 * will — it holds live student records (PRD §22). A card with an empty media
 * slot beside one with a screenshot reads as a missing image, so the phases
 * fill it instead: four states, three of them shipped.
 */
export function PhaseStrip() {
  return (
    <div
      className="flex h-44 flex-col justify-center gap-2.5 border-b px-5 sm:h-52 sm:px-6"
      style={{ background: 'var(--surface-sunk)', borderColor: 'var(--rule)' }}
      aria-hidden="true"
    >
      {PHASES.map((phase, i) => (
        <div key={phase.name} className="flex items-center gap-3">
          <span
            className="w-[1.5rem] shrink-0 font-mono text-[length:var(--text-label)] tabular-nums"
            style={{ color: 'var(--text-muted)' }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="min-w-0 flex-1 truncate text-[length:var(--text-small)] font-medium">
            {phase.short}
          </span>
          <span
            className="shrink-0 font-mono text-[length:var(--text-label)]"
            style={{ color: phase.shipped ? 'var(--text-muted)' : 'var(--badge-progress)' }}
          >
            {phase.shipped ? 'shipped' : 'in progress'}
          </span>
        </div>
      ))}
    </div>
  );
}

export function RolloutDiagram() {
  return (
    <figure>
      <ol className="space-y-0">
        {PHASES.map((phase, i) => (
          <li key={phase.name} className="relative flex gap-4 pb-6 last:pb-0">
            {/* connector */}
            {i < PHASES.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-4 bottom-0 left-[5px] w-px"
                style={{ background: 'var(--rule)' }}
              />
            )}

            <span
              aria-hidden="true"
              className="mt-[5px] h-[11px] w-[11px] shrink-0 rounded-full"
              style={{
                background: phase.shipped ? 'var(--accent)' : 'var(--bg)',
                border: `1.5px solid ${phase.shipped ? 'var(--accent)' : 'var(--text-muted)'}`,
              }}
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[length:var(--text-small)] font-semibold">{phase.name}</span>
                <span
                  className="font-mono text-[length:var(--text-label)]"
                  style={{ color: phase.shipped ? 'var(--text-muted)' : 'var(--badge-progress)' }}
                >
                  {phase.when}
                </span>
              </div>
              <p className="mt-1 text-[length:var(--text-small)]" style={{ color: 'var(--text-muted)' }}>
                {phase.objective}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <figcaption
        className="mt-5 max-w-[60ch] text-[length:var(--text-small)]"
        style={{ color: 'var(--text-muted)' }}
      >
        Each phase had a stated objective and had to be proven before the next moved. Company-owned
        outlets first, then operators, then teachers behind them.
      </figcaption>
    </figure>
  );
}
