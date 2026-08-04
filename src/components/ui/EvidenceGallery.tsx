'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { AnalyticsEvidence } from '@/types/content';

/**
 * A compact gallery of analytics screenshots, each opening in a lightbox.
 *
 * Built on the native <dialog> with showModal() rather than a hand-rolled
 * overlay. That is an accessibility decision, not a brevity one: showModal
 * gives Escape-to-close, a focus trap, inert background content and the
 * correct dialog semantics from the platform. Every one of those is a thing a
 * div-with-a-role gets subtly wrong, and the brief requires all of them.
 *
 * The images are supporting evidence, never the source of the figures — the
 * cards above carry every number as real text, so this whole component can
 * fail to load and the section still says what it needs to (§17.11).
 */
export function EvidenceGallery({ items }: { items: AnalyticsEvidence[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  // Restores focus to the thumbnail that opened the dialog, which <dialog>
  // does for a click but not for a programmatic close.
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const show = (i: number, el: HTMLButtonElement) => {
    openerRef.current = el;
    setOpen(i);
    dialogRef.current?.showModal();
  };

  const close = useCallback(() => {
    dialogRef.current?.close();
    setOpen(null);
    openerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    // Escape fires <dialog>'s cancel event; mirror it into our own state so
    // the opener still gets focus back.
    const onCancel = (e: Event) => {
      e.preventDefault();
      close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };

    el.addEventListener('cancel', onCancel);
    el.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('cancel', onCancel);
      el.removeEventListener('keydown', onKey);
    };
  }, [close, step]);

  const current = open === null ? null : items[open];

  return (
    <>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.image.src}>
            <figure>
              <button
                type="button"
                onClick={(e) => show(i, e.currentTarget)}
                className="group block w-full overflow-hidden rounded-[var(--radius)] border transition-colors"
                style={{ borderColor: 'var(--rule)', background: 'var(--surface)' }}
                aria-label={`Enlarge: ${item.image.caption}`}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  sizes="(min-width: 640px) 440px, 90vw"
                  className="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.015]"
                />
              </button>
              <figcaption
                className="mt-2 text-[length:var(--text-label)] leading-snug text-pretty"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.image.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Analytics screenshot"
        /* m-auto is load-bearing: the CSS reset zeroes the margin that centres
           a modal <dialog> in its viewport, which parks it in the top-left. */
        className="m-auto max-h-[92dvh] w-[min(64rem,92vw)] rounded-[var(--radius)] p-0 backdrop:bg-black/60"
        style={{ background: 'var(--surface)', color: 'var(--text)' }}
      >
        {current && (
          <div className="flex max-h-[92dvh] flex-col">
            <div
              className="flex items-start justify-between gap-4 border-b px-4 py-3"
              style={{ borderColor: 'var(--rule)' }}
            >
              <p className="min-w-0 text-[length:var(--text-small)] font-medium text-pretty">
                {current.image.caption}
                <span className="mt-0.5 block font-normal" style={{ color: 'var(--text-muted)' }}>
                  Source: {current.source} · {current.period}
                </span>
              </p>
              <button
                type="button"
                onClick={close}
                className="-mr-1 -mt-1 shrink-0 rounded-md px-3 py-2 text-[length:var(--text-small)] font-medium"
                style={{ color: 'var(--accent-ink)' }}
              >
                Close
              </button>
            </div>

            <div className="min-h-0 overflow-auto p-4">
              <Image
                src={current.image.src}
                alt={current.image.alt}
                width={current.image.width}
                height={current.image.height}
                sizes="(min-width: 1024px) 60rem, 92vw"
                className="mx-auto block h-auto w-full rounded-[4px] border"
                style={{ borderColor: 'var(--rule)' }}
              />
            </div>

            {items.length > 1 && (
              <div
                className="flex items-center justify-between border-t px-4 py-2.5"
                style={{ borderColor: 'var(--rule)' }}
              >
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="rounded-md px-2 py-1.5 text-[length:var(--text-small)]"
                  style={{ color: 'var(--accent-ink)' }}
                >
                  <span aria-hidden="true">←</span> Previous
                </button>
                <span
                  className="font-mono text-[length:var(--text-label)] tabular-nums"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {open! + 1} / {items.length}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="rounded-md px-2 py-1.5 text-[length:var(--text-small)]"
                  style={{ color: 'var(--accent-ink)' }}
                >
                  Next <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
