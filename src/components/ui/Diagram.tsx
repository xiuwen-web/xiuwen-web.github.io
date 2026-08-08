import type { ReactNode } from 'react';
import type { BeforeAfterData, FlowStep, HandoffStep, SystemBranch } from '@/types/content';
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

/* ------------------------------------------------------- Handoff chain --- */

/**
 * The developer-collaboration sequence. Same grid and connectors as every
 * other flow on the site, with two additions that carry the point:
 *
 *  - each node states who holds the work, as a word rather than a colour, and
 *    the ones that are hers take the accent ground the acceptance gate used to
 *  - each node also states what she is doing, including on the two steps she
 *    hands over — which is the difference between this and a lifecycle chart
 *
 * A reader scanning only the owner chips sees the shape immediately: hers,
 * hers, hers, theirs, theirs, hers, hers. The claim is the pattern, so it does
 * not have to be asserted in prose.
 */
export function HandoffChain({ steps }: { steps: HandoffStep[] }) {
  return (
    <ol className="flow">
      {steps.map((step, i) => {
        const mine = step.owner === 'Mine';
        return (
          <li
            key={step.stage}
            className="flex min-w-0 flex-col rounded-[var(--radius)] border px-3.5 py-3"
            style={{
              borderColor: mine ? 'var(--accent)' : 'var(--rule)',
              background: mine ? 'var(--accent-soft)' : 'var(--surface)',
            }}
          >
            <span className="flex items-baseline gap-2">
              <span
                className="font-mono text-[0.6875rem] tabular-nums"
                style={{ color: 'var(--text-muted)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase"
                style={{ color: mine ? 'var(--accent-ink)' : 'var(--text-muted)' }}
              >
                {step.owner}
              </span>
            </span>

            <span className="mt-1.5 text-[length:var(--text-small)] leading-snug font-medium text-pretty">
              {step.stage}
            </span>

            <span
              className="mt-1.5 text-[length:var(--text-label)] leading-snug text-pretty"
              style={{ color: 'var(--text-muted)' }}
            >
              {step.mine}
            </span>
          </li>
        );
      })}
    </ol>
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

/**
 * The featured-card media for the EverLoop entry.
 *
 * That card used to render the EverLoop logo — an owl mascot in a yellow
 * roundel, contained on a sunk panel. It is the product's real identity, so it
 * was not wrong, but it sat on a card whose own intro sentence says this is one
 * of the two bodies of work that "carry most of what I do", and a mascot shows
 * a reader nothing about the work. Next to a screenshot of a login form on the
 * card beside it, the pair were the two least product-specific images on the
 * page, in the two most valuable slots.
 *
 * This draws the fact the case study opens with instead: EverLoop is not one
 * product but five connected surfaces that all have to agree with each other,
 * which is what makes deciding "what belongs on which surface, who is allowed
 * to change what, and when a student can see it" the actual job.
 *
 * Deliberately the same shape as PhaseStrip — five rows, mono label left,
 * qualifier right, on a sunk ground — so the two featured cards read as one
 * system rather than as two unrelated pictures.
 *
 * Sourced from ecosystem.ts's overview ("five connected surfaces — admin,
 * teacher web and mobile, student and parent web and mobile") and it agrees
 * with the "5 user surfaces" figure in the credibility strip. Neither is
 * allowed to drift without the other.
 */
const SURFACES: { surface: string; client: string }[] = [
  { surface: 'Admin', client: 'web' },
  { surface: 'Teacher', client: 'web' },
  { surface: 'Teacher', client: 'mobile' },
  { surface: 'Student & parent', client: 'web' },
  { surface: 'Student & parent', client: 'mobile' },
];

export function SurfaceStrip() {
  return (
    <div
      className="flex h-44 flex-col justify-center gap-2 border-b px-5 sm:h-52 sm:px-6"
      style={{ background: 'var(--surface-sunk)', borderColor: 'var(--rule)' }}
      aria-hidden="true"
    >
      {SURFACES.map((row, i) => (
        <div key={`${row.surface}-${row.client}`} className="flex items-center gap-3">
          <span
            className="w-[1.5rem] shrink-0 font-mono text-[length:var(--text-label)] tabular-nums"
            style={{ color: 'var(--text-muted)' }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="min-w-0 flex-1 truncate text-[length:var(--text-small)] font-medium">
            {row.surface}
          </span>
          <span
            className="shrink-0 font-mono text-[length:var(--text-label)]"
            style={{ color: 'var(--text-muted)' }}
          >
            {row.client}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * The handoff chain, compressed to fit beside the hero copy.
 *
 * The full HandoffChain is the strongest artefact on the site — it makes the
 * limits of the claim visible, which is what makes the rest of it believable —
 * and it sat at roughly the middle of the page, behind the entire work grid. A
 * reader deciding in thirty seconds never reached it.
 *
 * This is the same seven steps and the same ownership colouring with the
 * per-step description dropped, so it reads as a shape rather than as prose:
 * five tiles that are hers, two that are not. The detail is unchanged and
 * still lives in #process, one anchor away.
 *
 * aria-hidden, following PhaseStrip and SurfaceStrip. It states nothing the
 * full chain below does not state with more detail, and a screen reader
 * meeting all seven stages twice on one page is worse served than one that
 * meets them once, in full. The link beneath it is the route there.
 */
export function HandoffSummary({ steps }: { steps: HandoffStep[] }) {
  return (
    <ol aria-hidden="true" className="space-y-[3px]">
      {steps.map((step, i) => {
        const mine = step.owner === 'Mine';
        return (
          <li
            key={step.stage}
            className="relative flex items-center gap-2.5 rounded-[6px] border px-3 py-2"
            style={{
              borderColor: mine ? 'var(--accent)' : 'var(--rule)',
              /*
               * Mixed rather than --accent-soft. In dark mode that token is
               * #1a3239 against a #162a3a surface — about a 1% step, so the
               * five-versus-two shape that is the entire point of showing this
               * stopped reading at a glance. Mixing the accent into the
               * surface is the recipe Badge already uses and it holds in both
               * themes from one expression.
               */
              background: mine
                ? 'color-mix(in srgb, var(--accent) 14%, var(--surface))'
                : 'var(--surface)',
            }}
          >
            {/* Connector, in the 3px gap below each tile. */}
            {i < steps.length - 1 && (
              <span
                className="absolute -bottom-[3px] left-1/2 h-[3px] w-px"
                style={{ background: 'var(--accent)' }}
              />
            )}
            <span
              className="w-[1.25rem] shrink-0 font-mono text-[0.6875rem] tabular-nums"
              style={{ color: 'var(--text-muted)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0 flex-1 truncate text-[length:var(--text-label)] font-medium">
              {step.stage}
            </span>
            <span
              className="shrink-0 font-mono text-[0.625rem] tracking-[0.08em] uppercase"
              style={{ color: mine ? 'var(--accent-ink)' : 'var(--text-muted)' }}
            >
              {step.owner}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
