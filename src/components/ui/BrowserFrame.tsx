import Image from 'next/image';
import type { Visual } from '@/types/content';

/**
 * Screenshots sit inside a browser chrome rather than floating as bare
 * rectangles. Two reasons beyond decoration:
 *
 *   - it says "this is a running system", which is the claim the image is
 *     there to support;
 *   - it gives every screenshot the same frame, so five captures taken on
 *     different days at different window sizes stop looking like five
 *     different things.
 *
 * The chrome carries no URL. Every one of these is an internal system, and
 * printing a real internal address in a browser bar would publish something
 * the confidentiality register says stays private (PRD §22). The label is the
 * system's name instead.
 */
export function BrowserFrame({
  visual,
  label,
  priority = false,
}: {
  visual: Visual;
  label?: string;
  priority?: boolean;
}) {
  return (
    <div
      className="overflow-hidden rounded-[var(--radius)] border"
      style={{ borderColor: 'var(--rule)', background: 'var(--surface)' }}
    >
      <div
        className="flex h-8 items-center gap-2 border-b px-3"
        style={{ borderColor: 'var(--rule)', background: 'var(--surface-sunk)' }}
      >
        <span aria-hidden="true" className="flex gap-1.5">
          <Dot />
          <Dot />
          <Dot />
        </span>
        {label && (
          <span
            className="truncate font-mono text-[length:var(--text-label)]"
            style={{ color: 'var(--text-muted)' }}
          >
            {label}
          </span>
        )}
      </div>

      <Image
        src={visual.src}
        alt={visual.alt}
        width={visual.width}
        height={visual.height}
        className="h-auto w-full"
        {...(priority ? { priority: true } : { loading: 'lazy' as const })}
      />
    </div>
  );
}

function Dot() {
  return (
    <span
      className="block h-[7px] w-[7px] rounded-full"
      style={{ background: 'var(--rule)' }}
    />
  );
}
