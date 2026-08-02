import Image from 'next/image';
import Link from 'next/link';
import type { WorkEntry } from '@/types/content';
import { Card } from './Card';
import { Badge, Chip } from './Badge';
import { PhaseStrip } from './RolloutDiagram';

/**
 * Entries 01 and 02. The only raised elevation on the site, used exactly
 * twice. If a third card ever gets it, none of them are featured any more.
 *
 * Around seventy words: enough to know whether to click, not enough to
 * substitute for clicking.
 */
export function FeaturedCard({
  entry,
  number,
}: {
  entry: WorkEntry;
  number: string | null;
}) {
  return (
    <Card as="article" raised className="overflow-hidden">
      {entry.visual ? (
        <Image
          src={entry.visual.src}
          alt=""
          width={entry.visual.width}
          height={entry.visual.height}
          className={`h-44 w-full border-b sm:h-52 ${
            entry.visual.contain ? 'object-contain p-5' : 'object-cover object-left-top'
          }`}
          style={{
            borderColor: 'var(--rule)',
            background: entry.visual.contain ? 'var(--surface-sunk)' : undefined,
          }}
          // Not priority. These cards sit below the hero and the snapshot on
          // every viewport, so preloading them competed with the element that
          // actually is the largest contentful paint.
          loading="lazy"
        />
      ) : (
        entry.diagram === 'rollout' && <PhaseStrip />
      )}

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {entry.status && <Badge status={entry.status} />}
          {number && (
            <span
              className="font-mono text-[length:var(--text-label)] tabular-nums"
              style={{ color: 'var(--text-muted)' }}
            >
              {number}
            </span>
          )}
        </div>

        <h3 className="mt-4 font-display text-[1.25rem] leading-snug font-semibold sm:text-[1.375rem]">
          <Link
            prefetch={false}
            href={entry.href}
            className="transition-opacity hover:opacity-70"
          >
            {entry.navLabel}
          </Link>
        </h3>

        <p
          className="mt-2 text-[length:var(--text-small)]"
          style={{ color: 'var(--text-muted)' }}
        >
          {entry.description}
        </p>

        {entry.chips && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {entry.chips.map((chip) => (
              <li key={chip}>
                <Chip>{chip}</Chip>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-5">
          <Link
            prefetch={false}
            href={entry.href}
            className="inline-flex items-center gap-1.5 text-[length:var(--text-small)] font-medium underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: 'var(--accent-ink)' }}
          >
            Read the case study
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </Card>
  );
}

/**
 * Entries 03 and 04. Same numbering, less weight — a flat card rather than a
 * raised one, and no media, so the featured pair still reads as the featured
 * pair.
 */
export function WorkRow({ entry, number }: { entry: WorkEntry; number: string | null }) {
  return (
    <Card as="li" className="flex flex-col overflow-hidden">
      {/* Compact media: a third the height of a featured card, so the two
          tiers still read as two tiers. Entries without a visual simply skip
          it and the card starts at the badge row. */}
      {entry.visual ? (
        <Image
          src={entry.visual.src}
          alt=""
          width={entry.visual.width}
          height={entry.visual.height}
          className={`h-28 w-full border-b ${
            entry.visual.contain ? 'object-contain p-3' : 'object-cover object-top'
          }`}
          style={{
            borderColor: 'var(--rule)',
            background: entry.visual.contain ? 'var(--surface-sunk)' : undefined,
          }}
          loading="lazy"
        />
      ) : (
        /* An entry with no publishable screenshot still needs the band, or it
           sits half a card lower than its neighbour in the same grid row. The
           blueprint plate is the theme's own neutral surface. */
        <span
          aria-hidden="true"
          className="blueprint block h-28 w-full border-b"
          style={{ borderColor: 'var(--rule)', background: 'var(--surface-sunk)' }}
        />
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {entry.status ? <Badge status={entry.status} /> : <span />}
          {number && (
            <span
              className="font-mono text-[length:var(--text-label)] tabular-nums"
              style={{ color: 'var(--text-muted)' }}
            >
              {number}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-[length:var(--text-h3)] leading-snug font-semibold">
          <Link
            prefetch={false}
            href={entry.href}
            className="transition-opacity hover:opacity-70"
          >
            {entry.navLabel}
          </Link>
        </h3>

        <p
          className="mt-2 flex-1 text-[length:var(--text-small)]"
          style={{ color: 'var(--text-muted)' }}
        >
          {entry.description}
        </p>

        <p className="mt-4">
          <Link
            prefetch={false}
            href={entry.href}
            className="inline-flex items-center gap-1.5 text-[length:var(--text-small)] font-medium underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: 'var(--accent-ink)' }}
          >
            Read more
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </Card>
  );
}
