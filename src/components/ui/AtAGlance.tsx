import type { AtAGlance as Glance } from '@/types/content';

/**
 * The summary card under a case study title: role, team, timeline, scale,
 * result, and the skills the page evidences. Two columns from sm up, one on a
 * phone, where it has to fit in roughly one screen under the header.
 */
export function AtAGlance({ glance }: { glance: Glance }) {
  const rows: [string, string | undefined][] = [
    ['Role', glance.role],
    ['Team', glance.team],
    ['Timeline', glance.timeline],
    ['Scale', glance.scale],
    ['Result', glance.result],
  ];

  return (
    <div className="px-tray-sm mt-8">
      <div className="px-core-sm p-5 sm:p-6">
        <p className="px-label text-[0.625rem]" style={{ color: 'var(--text-muted)' }}>
          At a glance
        </p>
        <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {rows
            .filter((row): row is [string, string] => Boolean(row[1]))
            .map(([label, value]) => (
              <div key={label} className="min-w-0">
                <dt
                  className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {label}
                </dt>
                <dd className="mt-1 text-[length:var(--text-small)] leading-relaxed text-pretty">
                  {value}
                </dd>
              </div>
            ))}
        </dl>
        <div className="mt-5 border-t pt-4" style={{ borderColor: 'var(--rule)' }}>
          <p
            className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            Skills shown
          </p>
          <p className="mt-1 text-[length:var(--text-small)] leading-relaxed">
            {glance.skills.join(' · ')}
          </p>
        </div>
      </div>
    </div>
  );
}
