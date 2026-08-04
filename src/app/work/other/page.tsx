import type { Metadata } from 'next';
import { Shell } from '@/components/layout/Shell';
import { Container } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { SupportingWork } from '@/components/ui/SupportingWork';
import { workNumber } from '@/content/navigation';
import { otherWork } from '@/content/otherWork';

const LEDE =
  'What belongs under none of the systems above — a personal AI assistant I built to pull my coordination work into one place, and then removed the feature I was most pleased with.';

export const metadata: Metadata = {
  title: 'Product Experiments — Nova',
  description: LEDE,
  alternates: { canonical: '/work/other/' },
};

const TOC = otherWork.map((card) => ({ id: card.id, label: card.title.split(' — ')[0] }));

export default function OtherWorkPage() {
  return (
    <Shell active="other" toc={TOC} tocTitle="Product Experiments">
      <header
        className="relative border-b pt-8 pb-10 sm:pt-10 sm:pb-12"
        style={{ borderColor: 'var(--rule)' }}
      >
        <span
          aria-hidden="true"
          className="blueprint blueprint-fade pointer-events-none absolute inset-0 opacity-70"
        />
        <Container className="relative">
          <Button href="/#work" variant="quiet">
            <span aria-hidden="true">←</span> All work
          </Button>

          <p
            className="mt-8 font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            <span aria-hidden="true">[ </span>
            Case study {workNumber('/work/other/')}
            <span aria-hidden="true"> ]</span>
          </p>

          <h1 className="mt-2 font-display text-[length:var(--text-page-title)] leading-[1.15] font-semibold text-balance sm:text-[length:var(--text-display)]">
            Product Experiments
          </h1>

          <p className="mt-4 text-pretty" style={{ color: 'var(--text-muted)' }}>
            {LEDE}
          </p>
        </Container>
      </header>

      <div className="space-y-14 py-12 sm:space-y-16">
        {otherWork.map((card) => (
          <SupportingWork key={card.id} card={card} />
        ))}
      </div>
    </Shell>
  );
}
