import { STATUS_META, type ProjectStatus } from '@/types/content';

const TONE: Record<string, string> = {
  launched: 'var(--badge-launched)',
  progress: 'var(--badge-progress)',
  personal: 'var(--badge-personal)',
};

/**
 * Pill, mono uppercase label, colour from the semantic token. The dot is
 * decorative — the text carries the meaning, so status is never communicated
 * by colour alone.
 *
 * The ground is mixed from the badge's own colour rather than shared. All
 * three pills used to sit on the teal --accent-soft, which put amber "in
 * progress" text on a teal ground: incoherent under a palette where teal means
 * validated, and 4.48:1, just under AA. Mixing 12% of the tone into the
 * surface keeps each pill in its own hue and works in both themes from one
 * expression.
 */
export function Badge({ status }: { status: ProjectStatus }) {
  const meta = STATUS_META[status];
  const colour = TONE[meta.tone];

  return (
    <span
      className="inline-flex items-start gap-1.5 rounded-[var(--radius-pill)] px-2.5 py-1 font-mono text-[length:var(--text-label)] tracking-[0.06em] uppercase"
      style={{ background: `color-mix(in srgb, ${colour} 12%, var(--surface))`, color: colour }}
    >
      {/* items-start, not items-center: a label that wraps would otherwise
          float the dot to the middle of the pill. */}
      <span
        aria-hidden="true"
        className="mt-[0.45em] inline-block h-[6px] w-[6px] shrink-0 rounded-full"
        style={{ background: colour }}
      />
      {meta.label}
    </span>
  );
}

/** Chips are badges without semantics — used for skills and constraints. */
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-[var(--radius-pill)] border px-2.5 py-1 font-mono text-[length:var(--text-label)]"
      style={{ borderColor: 'var(--rule)', color: 'var(--text-muted)' }}
    >
      {children}
    </span>
  );
}
