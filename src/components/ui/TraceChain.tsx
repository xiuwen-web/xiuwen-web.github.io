import type { TraceStep } from '@/types/content';

/**
 * One requirement followed from written spec to shipped screen.
 *
 * The rest of the site asks a reader to believe a description of the method.
 * This shows the same piece of work at four stages, each of which exists
 * somewhere checkable — a versioned brief, items on the delivery board, an
 * acceptance gate, and screens already on this site.
 *
 * Nothing here is a screenshot of the board or the brief. Both are internal
 * (PRD §22). What is published is the shape: how many items, across which
 * surfaces, in what order.
 */
export function TraceChain({ steps }: { steps: TraceStep[] }) {
  return (
    <ol className="mt-6">
      {steps.map((step, i) => (
        <li
          key={step.stage}
          className={`grid grid-cols-[auto_1fr] gap-x-4 ${i > 0 ? 'pt-6' : ''}`}
        >
          {/* Rail: numbered node with a connector running to the next step. */}
          <div className="relative flex flex-col items-center">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[0.6875rem] tabular-nums"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--accent-ink)',
                background: 'var(--surface)',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="mt-1 w-px flex-1"
                style={{ background: 'var(--rule)' }}
              />
            )}
          </div>

          <div className="min-w-0 pb-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h4 className="font-display text-[length:var(--text-h3)] leading-snug font-semibold">
                {step.stage}
              </h4>
              <span
                className="font-mono text-[length:var(--text-label)]"
                style={{ color: 'var(--text-muted)' }}
              >
                {step.artefact}
              </span>
            </div>

            <p
              className="mt-2 max-w-[60ch] text-[length:var(--text-small)]"
              style={{ color: 'var(--text-muted)' }}
            >
              {step.detail}
            </p>

            {step.items && (
              <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                {step.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-[3px] px-2 py-1 font-mono text-[0.6875rem]"
                    style={{
                      background: 'var(--surface-sunk)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
