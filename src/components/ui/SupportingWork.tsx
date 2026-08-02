import type { SupportingCard } from '@/types/content';
import { Container } from '@/components/layout/Section';
import { Badge } from './Badge';
import { BrowserFrame } from './BrowserFrame';

/**
 * The five shorter pieces, in full, on their own page.
 *
 * They were on the homepage and came to about 900 words — more than everything
 * else on it put together once the case-study narratives moved out. Nothing was
 * cut; it moved, the same way the case studies did in Phase 2.
 */
export function SupportingWork({ card }: { card: SupportingCard }) {
  return (
    <article id={card.id} className="scroll-mt-24">
      <Container>
        <Badge status={card.status} />
        <h2 className="mt-3 font-display text-[length:var(--text-h2)] leading-snug font-semibold">
          {card.title}
        </h2>
        <div className="mt-4 space-y-3">
          {card.body.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>
      </Container>

      {card.visuals?.map((visual) => (
        <Container key={visual.src} width="content" className="mt-8">
          <figure>
            <BrowserFrame visual={visual} label={card.title} />
            <figcaption
              className="mt-3 max-w-[60ch] text-[length:var(--text-small)]"
              style={{ color: 'var(--text-muted)' }}
            >
              {visual.caption}
            </figcaption>
          </figure>
        </Container>
      ))}
    </article>
  );
}
