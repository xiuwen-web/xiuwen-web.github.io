import type { WorkLogGroup } from '@/types/content';

/**
 * Dense by design. The case studies carry the depth; this carries the breadth,
 * and it has to be skimmable in about twenty seconds. One line per item, no
 * prose, year and artefact type as fixed columns so the eye can scan either.
 *
 * The per-group count badge went with the cut to twelve entries — "3 items"
 * next to a list of three is noise.
 */
export function WorkLog({ groups }: { groups: WorkLogGroup[] }) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.system}>
          <h3 className="font-display text-[length:var(--text-h3)] font-semibold">{group.system}</h3>
          <p className="mt-1 text-[length:var(--text-small)]" style={{ color: 'var(--text-muted)' }}>
            {group.note}
          </p>

          <ul className="mt-4">
            {group.entries.map((entry) => (
              <li
                key={`${group.system}-${entry.title}`}
                className="flex items-baseline gap-3 border-t py-2 text-[length:var(--text-small)] sm:gap-5"
                style={{ borderColor: 'var(--rule)' }}
              >
                <span
                  className="w-[2.5rem] shrink-0 font-mono text-[length:var(--text-label)] tabular-nums"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {entry.year}
                </span>
                <span className="flex-1">{entry.title}</span>
                <span
                  className="shrink-0 font-mono text-[length:var(--text-label)] tracking-wide uppercase"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {entry.kind}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
