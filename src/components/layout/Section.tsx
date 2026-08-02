import type { ReactNode } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Three container widths (REDESIGN §3):
 *   prose   — 640px, all body copy
 *   content — 920px, cards and lists
 *   wide    — 1160px, images, diagrams, the snapshot row
 * Nothing is full-bleed.
 */
type Width = 'prose' | 'content' | 'wide';

const MEASURE: Record<Width, string> = {
  prose: 'var(--measure-prose)',
  content: 'var(--measure-content)',
  wide: 'var(--measure-wide)',
};

export function Container({
  width = 'prose',
  className = '',
  children,
}: {
  width?: Width;
  className?: string;
  children: ReactNode;
}) {
  const max = MEASURE[width];
  return (
    <div className={`mx-auto w-full px-6 ${className}`} style={{ maxWidth: max }}>
      {children}
    </div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  width = 'prose',
  bordered = true,
  children,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  width?: Width;
  bordered?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      /* Compact rhythm: 32 mobile / 48 tablet / 64 desktop */
      id={id}
      className={`py-8 sm:py-12 lg:py-16 ${bordered ? 'border-t' : ''}`}
      style={bordered ? { borderColor: 'var(--rule)' } : undefined}
    >
      <Container width={width}>
        {title && (
          <SectionHeading eyebrow={eyebrow ?? title} title={title} lede={intro} />
        )}
        <div className={title ? 'mt-8' : ''}>{children}</div>
      </Container>
    </section>
  );
}
