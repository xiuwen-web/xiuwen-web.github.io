import type { ReactNode } from 'react';
import type { BeforeAfterData, FlowStep, SystemBranch } from '@/types/content';
import { Container } from '@/components/layout/Section';

/**
 * The three diagram types from PORTFOLIO_FLOWCHART_VISUAL_STORYTELLING_PLAN.md
 * — flowchart, system map, before-and-after — plus the frame they all sit in.
 *
 * All three are data-driven so the visual language cannot drift between case
 * studies, and all three are plain semantic markup rather than SVG or images:
 * they reflow to a single column on a phone, theme from the same CSS variables
 * as the rest of the site, and are read by a screen reader as an ordered or
 * unordered list without a separate text equivalent to keep in sync.
 *
 * Status is never carried by colour alone. Every node that has one prints the
 * word as well, because a teal node and an amber node are the same node to a
 * reader who cannot distinguish them.
 */

const STATUS_STYLE: Record<
  NonNullable<FlowStep['status']>,
  { label: string; colour: string; ground: string }
> = {
  legacy: { label: 'legacy', colour: 'var(--badge-personal)', ground: 'var(--surface-sunk)' },
  pilot: { label: 'pilot', colour: 'var(--badge-progress)', ground: 'var(--surface)' },
  shipped: { label: 'shipped', colour: 'var(--badge-launched)', ground: 'var(--surface)' },
  'in-progress': { label: 'in progress', colour: 'var(--badge-progress)', ground: 'var(--surface)' },
  mine: { label: 'my gate', colour: 'var(--accent-ink)', ground: 'var(--accent-soft)' },
  /*
   * Not a delivery state: a condition the flow stops at. Amber, because it is
   * the step where something is deliberately withheld — and it prints the word
   * "gate" like every other coloured node, so the meaning does not depend on
   * being able to tell amber from teal.
   */
  gate: { label: 'gate', colour: 'var(--badge-progress)', ground: 'var(--surface)' },
};

/* --------------------------------------------------------------- Frame --- */

/**
 * Every diagram gets a heading, one line of supporting text and a caption —
 * the accessibility requirements in the plan, applied in one place so no
 * diagram can be added without them.
 */
export function Diagram({
  heading,
  intro,
  caption,
  width = 'content',
  children,
}: {
  heading: string;
  intro?: string;
  caption?: string;
  width?: 'prose' | 'content' | 'wide';
  children: ReactNode;
}) {
  return (
    <Container width={width} className="mt-8">
      <figure>
        <h3 className="font-display text-[length:var(--text-h3)] leading-snug font-semibold">
          {heading}
        </h3>
        {intro && (
          <p
            className="mt-2 max-w-[60ch] text-[length:var(--text-small)]"
            style={{ color: 'var(--text-muted)' }}
          >
            {intro}
          </p>
        )}

        <div className="mt-5">{children}</div>

        {caption && (
          <figcaption
            className="mt-4 max-w-[60ch] text-[length:var(--text-small)]"
            style={{ color: 'var(--text-muted)' }}
          >
            {caption}
          </figcaption>
        )}
      </figure>
    </Container>
  );
}

/* ----------------------------------------------------------- Flowchart --- */

export function FlowChart({
  steps,
  dense = false,
  columns = 4,
}: {
  steps: FlowStep[];
  dense?: boolean;
  /** Desktop columns. Three is for six-step flows, which 4 would break 4 + 2. */
  columns?: 3 | 4;
}) {
  return (
    <ol className={columns === 3 ? 'flow flow-3' : 'flow'}>
      {steps.map((step) => (
        <FlowNode key={step.title + (step.note ?? '')} step={step} dense={dense} />
      ))}
    </ol>
  );
}

function FlowNode({ step, dense }: { step: FlowStep; dense: boolean }) {
  const s = step.status ? STATUS_STYLE[step.status] : null;
  return (
    <li
      className={`flex min-w-0 flex-col justify-center rounded-[var(--radius)] border ${
        dense ? 'px-3 py-2.5' : 'px-3.5 py-3'
      }`}
      style={{
        borderColor: s ? s.colour : 'var(--rule)',
        background: s ? s.ground : 'var(--surface)',
      }}
    >
      <span className="text-[length:var(--text-small)] leading-snug font-medium text-pretty">
        {step.title}
      </span>
      {step.note && (
        <span
          className="mt-1 text-[length:var(--text-label)] leading-snug"
          style={{ color: 'var(--text-muted)' }}
        >
          {step.note}
        </span>
      )}
      {s && (
        <span
          className="mt-1.5 font-mono text-[0.6875rem] tracking-[0.08em] uppercase"
          style={{ color: s.colour }}
        >
          {s.label}
        </span>
      )}
    </li>
  );
}

/* ---------------------------------------------------------- System map --- */

export function SystemMap({
  root,
  branches,
  upstream,
}: {
  root: string;
  branches: SystemBranch[];
  /**
   * The system the root reads from, drawn above it. EverLoop displays what
   * CAdmin holds, and a map that starts at EverLoop makes it look like the
   * origin of the data rather than the display for it.
   */
  upstream?: { title: string; edge: string };
}) {
  /*
   * The root, the connectors and the branches share one grid, so the root is
   * centred on the branch group rather than on the container. Centring it
   * independently is what put it over the right-hand card: the branches were
   * in a three-column grid and there were only two of them.
   *
   * Three columns is the widest the cards stay readable at, and the map is
   * only ever drawn as a single row of branches.
   */
  const columns = Math.min(branches.length, 3);

  return (
    <div className="sysmap" data-cols={columns}>
      {upstream && (
        <>
          <p
            className="sysmap-node w-fit rounded-[var(--radius)] border px-4 py-2 text-center text-[length:var(--text-small)] font-medium"
            style={{ borderColor: 'var(--rule)', background: 'var(--surface)' }}
          >
            {upstream.title}
          </p>
          <p
            className="sysmap-node flex flex-col items-center gap-1 py-2 text-[length:var(--text-label)]"
            style={{ color: 'var(--text-muted)' }}
          >
            <span aria-hidden="true" className="h-3 w-px" style={{ background: 'var(--rule)' }} />
            {upstream.edge}
            <span aria-hidden="true" className="h-3 w-px" style={{ background: 'var(--rule)' }} />
          </p>
        </>
      )}

      <p
        className="sysmap-node w-fit rounded-[var(--radius)] border px-4 py-2 text-center text-[length:var(--text-small)] font-medium"
        style={{ borderColor: 'var(--accent)', background: 'var(--accent-soft)' }}
      >
        {root}
      </p>

      {/* Decorative. One cell per branch, so the stem, the crossbar and the
          branches are drawn off the same column track the cards use — see the
          system map block in globals.css. The list below carries the
          relationship for anyone who cannot see it. */}
      <div className="sysmap-rails" aria-hidden="true">
        {branches.map((branch) => (
          <span key={branch.title} />
        ))}
      </div>

      <ul className="sysmap-branches">
        {branches.map((branch) => (
          <li
            key={branch.title}
            className="rounded-[var(--radius)] border p-4"
            style={{ borderColor: 'var(--rule)', background: 'var(--surface)' }}
          >
            <p className="text-[length:var(--text-small)] font-semibold">{branch.title}</p>
            {branch.note && (
              <p
                className="mt-0.5 text-[length:var(--text-label)]"
                style={{ color: 'var(--text-muted)' }}
              >
                {branch.note}
              </p>
            )}
            <ul className="mt-3 space-y-1.5">
              {branch.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-[length:var(--text-small)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------- Before / after --- */

export function BeforeAfter({ data }: { data: BeforeAfterData }) {
  return (
    <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
      <Panel title={data.beforeLabel ?? 'Before'} items={data.before} tone="before" />

      <div className="flex items-center justify-center" aria-hidden="true">
        <svg
          className="h-5 w-5 rotate-90 md:rotate-0"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--accent)' }}
        >
          <path d="M2 8h11M9 4l4 4-4 4" />
        </svg>
      </div>

      <Panel title={data.afterLabel ?? 'After'} items={data.after} tone="after" />
    </div>
  );
}

function Panel({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: 'before' | 'after';
}) {
  const accent = tone === 'after' ? 'var(--badge-launched)' : 'var(--text-muted)';
  return (
    <section
      className="rounded-[var(--radius)] border p-4"
      style={{
        borderColor: tone === 'after' ? 'var(--accent)' : 'var(--rule)',
        background: tone === 'after' ? 'var(--surface)' : 'var(--surface-sunk)',
      }}
    >
      <h4
        className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase"
        style={{ color: accent }}
      >
        {title}
      </h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[length:var(--text-small)] leading-snug">
            <span aria-hidden="true" className="mt-[0.45em] h-[5px] w-[5px] shrink-0 rounded-full"
              style={{ background: accent }} />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
