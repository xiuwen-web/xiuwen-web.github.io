import type { SnapshotFact } from '@/types/content';

/**
 * No border, no fill. A figure in tabular mono, a label, and a qualifier so no
 * number is ambiguous. Deliberately the quietest component on the page — the
 * figures should read as facts rather than as marketing.
 */
export function Metric({ fact }: { fact: SnapshotFact }) {
  return (
    <div>
      <dt className="font-mono text-[1.5rem] leading-none font-medium tabular-nums">
        {fact.figure}
      </dt>
      <dd className="mt-2">
        <span className="block text-[length:var(--text-small)] font-medium">{fact.label}</span>
        <span
          className="mt-0.5 block text-[length:var(--text-label)] leading-snug"
          style={{ color: 'var(--text-muted)' }}
        >
          {fact.qualifier}
        </span>
      </dd>
    </div>
  );
}

export function MetricRow({ facts }: { facts: SnapshotFact[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
      {facts.map((fact) => (
        <Metric key={fact.label} fact={fact} />
      ))}
    </dl>
  );
}
