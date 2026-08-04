'use client';

import Image from 'next/image';
import { useState } from 'react';
import { profile } from '@/content/profile';

/**
 * The hero portrait, with the XW monogram as a real fallback.
 *
 * A Client Component for one reason: onError. Nothing in CSS can detect a
 * failed image, and the alternative — letting the browser render broken-image
 * chrome and alt text inside a 104px circle — looks like a bug rather than a
 * fallback. Twenty lines of state buys a portrait that degrades to the same
 * monogram the rail already uses.
 *
 * Sized in CSS but given intrinsic width and height, so the circle reserves
 * its space before the image arrives and the headline below it never moves.
 *
 * Deliberately quiet: 76px on a phone, 104px on desktop, a hairline teal
 * border and one soft shadow. It sits above a 44px headline and must not
 * compete with it — this is an identity marker, not a profile picture.
 */
export function Portrait() {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className="grid size-[76px] shrink-0 place-items-center overflow-hidden rounded-full sm:size-[104px]"
      style={{
        // The recipe the rail monogram uses, with the page-side accent token.
        border: '1px solid color-mix(in srgb, var(--accent) 45%, transparent)',
        boxShadow: 'var(--shadow-raised)',
        background: 'var(--surface)',
      }}
    >
      {failed ? (
        <span
          aria-hidden="true"
          className="font-mono text-[0.875rem] font-medium tracking-[0.02em]"
          style={{ color: 'var(--accent-ink)' }}
        >
          XW
        </span>
      ) : (
        <Image
          src={profile.photoPath}
          alt={profile.photoAlt}
          width={512}
          height={512}
          priority
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      )}
    </span>
  );
}
