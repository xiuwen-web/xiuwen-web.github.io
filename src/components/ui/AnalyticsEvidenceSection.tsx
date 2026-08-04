import { Container } from '@/components/layout/Section';
import { EvidenceGallery } from './EvidenceGallery';
import {
  analyticsInsight,
  analyticsIntro,
  analyticsNote,
  analyticsReflection,
  analyticsSummary,
} from '@/content/analytics';
import type { AnalyticsEvidence } from '@/types/content';

/**
 * Post-launch adoption — the store analytics as product evidence
 * (MOBILE_LAUNCH_ANALYTICS_EVIDENCE_DESIGN_BRIEF.md).
 *
 * Two constraints shape this more than the styling does:
 *
 *  1. The figures are in three different units, so the layout must make
 *     combining them feel wrong. Cards are grouped by product and each prints
 *     its own unit, date basis and source; there is no total anywhere, and
 *     the note above the grid says why.
 *  2. Student and teacher are distinguished by a real heading, not by colour
 *     (§14). Nothing here depends on telling two hues apart.
 *
 * Numbers are HTML text. The screenshots corroborate them; they never carry
 * them.
 */
export function AnalyticsEvidenceSection({ items }: { items: AnalyticsEvidence[] }) {
  // Preserves the authored order within each product rather than sorting.
  const products = items.reduce<{ product: string; rows: AnalyticsEvidence[] }[]>((acc, item) => {
    const group = acc.find((g) => g.product === item.product);
    if (group) group.rows.push(item);
    else acc.push({ product: item.product, rows: [item] });
    return acc;
  }, []);

  /*
   * Prose sits at the prose measure so this section's headings line up with
   * every other section on the page; only the card grid and the gallery take
   * the wider content measure, which is exactly how diagrams behave elsewhere.
   * A section that sets its own left edge reads as a different page.
   */
  return (
    <section id="adoption" className="scroll-mt-24">
      <Container>
        <p
          className="inline-flex rounded-[var(--radius-pill)] px-2.5 py-1 font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
          style={{ background: 'var(--accent-soft)', color: 'var(--accent-ink)' }}
        >
          Post-launch evidence
        </p>

        <h2 className="mt-4 font-display text-[length:var(--text-h2)] leading-snug font-semibold">
          Post-launch adoption
        </h2>

        <p className="mt-3 text-pretty">{analyticsIntro}</p>

        <p
          className="mt-3 text-[length:var(--text-small)]"
          style={{ color: 'var(--text-muted)' }}
        >
          {analyticsNote}
        </p>
      </Container>

      <Container width="content" className="mt-8">
        <div className="space-y-6">
          {products.map((group) => (
            <div key={group.product}>
              <h3
                className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
                style={{ color: 'var(--text-muted)' }}
              >
                {group.product}
              </h3>
              <ul className="mt-3 grid gap-4 sm:grid-cols-2">
                {group.rows.map((row) => (
                  <MetricCard key={row.image.src} item={row} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-8">
        <p className="text-pretty">{analyticsSummary}</p>
      </Container>

      <Container width="content" className="mt-12">
        <h3 className="font-display text-[length:var(--text-h3)] font-semibold">
          The screenshots behind the figures
        </h3>
        <p
          className="mt-2 max-w-[60ch] text-[length:var(--text-small)]"
          style={{ color: 'var(--text-muted)' }}
        >
          Cropped to the metric and its date range, with the account details removed. Select one to
          enlarge it.
        </p>

        <EvidenceGallery items={items} />
      </Container>

      <Container className="mt-10">
        <InsightCallout>{analyticsInsight}</InsightCallout>

        <p
          className="mt-8 text-[length:var(--text-small)] text-pretty"
          style={{ color: 'var(--text-muted)' }}
        >
          {analyticsReflection}
        </p>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------- Metric card --- */

/**
 * Platform label, value, unit, date basis, source — in that order, because
 * that is the order in which the number stops being ambiguous.
 */
function MetricCard({ item }: { item: AnalyticsEvidence }) {
  return (
    <li
      className="flex flex-col rounded-[var(--radius)] border p-5"
      style={{ borderColor: 'var(--rule)', background: 'var(--surface)' }}
    >
      <p
        className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
        style={{ color: 'var(--accent-ink)' }}
      >
        {item.platform}
      </p>

      <p className="mt-2 font-display text-[2.25rem] leading-none font-semibold tabular-nums">
        {item.value}
      </p>

      <p className="mt-2 text-[length:var(--text-body)] font-medium text-pretty">{item.metric}</p>

      <p
        className="mt-1 text-[length:var(--text-small)]"
        style={{ color: 'var(--text-muted)' }}
      >
        {item.period}
      </p>

      <p
        className="mt-4 border-t pt-3 text-[length:var(--text-label)]"
        style={{ borderColor: 'var(--rule)', color: 'var(--text-muted)' }}
      >
        Source: {item.source}
      </p>
    </li>
  );
}

/* ------------------------------------------------------ Insight callout --- */

function InsightCallout({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="rounded-r-[var(--radius)] py-3 pr-4 pl-4 text-[length:var(--text-small)] text-pretty"
      style={{
        background: 'var(--surface-sunk)',
        borderLeft: '2px solid var(--accent)',
      }}
    >
      {children}
    </p>
  );
}
