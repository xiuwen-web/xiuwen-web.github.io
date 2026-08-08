import Image from 'next/image';
import Link from 'next/link';
import type { WorkEntry } from '@/types/content';
import { Card } from './Card';
import { Badge, Chip } from './Badge';
import { PhaseStrip } from './RolloutDiagram';
import { SurfaceStrip } from './Diagram';

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
    <Card as="article" raised className="relative overflow-hidden">
      {entry.visual ? (
        <Image
          src={entry.visual.src}
          /* Was hardcoded alt="" until 2026-08-05, which quietly discarded the
             description written for every entry in navigation.ts. The images
             are not decorative — the CAdmin sign-in screen and the App Store
             listing are evidence, and a screen reader was getting five blank
             frames where a sighted reader gets proof. */
          alt={entry.visual.alt}
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
        <>
          {entry.diagram === 'rollout' && <PhaseStrip />}
          {entry.diagram === 'surfaces' && <SurfaceStrip />}
        </>
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
          {/*
            The card's one link, stretched over the whole card by the pseudo
            element. It replaced a pair: this title and a separate "Read the
            case study" underneath, both pointing at the same page, which gave
            every card two 23px-tall targets and read as two links to a screen
            reader. Now the target is the card — comfortably past the 44px
            minimum on the phone this is most often read on — and the label
            below is left as an affordance rather than a second destination.
          */}
          <Link
            prefetch={false}
            href={entry.href}
            className="transition-opacity after:absolute after:inset-0 after:content-[''] hover:opacity-70"
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

        <p
          aria-hidden="true"
          className="mt-5 inline-flex items-center gap-1.5 text-[length:var(--text-small)] font-medium underline decoration-1 underline-offset-4"
          style={{ color: 'var(--accent-ink)' }}
        >
          Read the case study
          <span>→</span>
        </p>
      </div>
    </Card>
  );
}

/**
 * The entries that are not featured, as a dense row rather than as a card.
 *
 * They were cards too until 2026-08-08: same shape, same media band, same
 * "Read the case study" line, four of them under the two that matter. The
 * section intro says in words that CAdmin and EverLoop "carry most of what I
 * do", and then the layout said the opposite — six equal rectangles, no
 * hierarchy, and the longest section on the page pushing How I Work below the
 * point most readers reach.
 *
 * A row keeps every entry present, numbered and clickable, at roughly a fifth
 * of the height. The media went with the card: a 112px band cropped from a
 * screenshot was never evidence at that size, and two of the four were
 * carrying a blueprint placeholder because no publishable image existed.
 *
 * One stretched link per row, as on the cards — the whole row is the target.
 */
export function WorkRow({ entry, number }: { entry: WorkEntry; number: string | null }) {
  return (
    /* border-t on the row rather than divide-y on the list: border-color is
       not an inherited property, so divide-y children would have fallen back
       to currentColor and drawn the rules in text colour. */
    <li className="relative border-t" style={{ borderColor: 'var(--rule)' }}>
      <div className="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-baseline sm:gap-4">
        <span
          className="font-mono text-[length:var(--text-label)] tabular-nums sm:pt-[0.15rem]"
          style={{ color: 'var(--text-muted)' }}
        >
          {number}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="font-display text-[length:var(--text-h3)] leading-snug font-semibold">
              <Link
                prefetch={false}
                href={entry.href}
                className="transition-opacity after:absolute after:inset-0 after:content-[''] hover:opacity-70"
              >
                {entry.navLabel}
              </Link>
            </h3>
            {entry.status && <Badge status={entry.status} />}
          </div>

          <p
            className="mt-1.5 text-[length:var(--text-small)] text-pretty"
            style={{ color: 'var(--text-muted)' }}
          >
            {entry.description}
          </p>
        </div>
      </div>
    </li>
  );
}
