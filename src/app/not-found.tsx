import { Shell } from '@/components/layout/Shell';
import { Container } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

/**
 * A 404 inside the normal frame, so a wrong address leaves someone looking at
 * the rail with every case study one click away rather than at a bare page.
 *
 * It also fixes a real defect: the skip link in layout.tsx targets #main, and
 * Next's default not-found page has no <main id="main">, so on the 404 the
 * first thing a keyboard user reached went nowhere.
 */
export default function NotFound() {
  return (
    <Shell>
      <Container className="py-20 sm:py-28">
        <p
          className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          <span aria-hidden="true">[ </span>404<span aria-hidden="true"> ]</span>
        </p>

        <h1 className="mt-2 font-display text-[length:var(--text-page-title)] leading-[1.15] font-semibold sm:text-[length:var(--text-display)]">
          That page isn’t here
        </h1>

        <p className="mt-4 max-w-[45ch]" style={{ color: 'var(--text-muted)' }}>
          The address may have changed. Everything is reachable from the work index.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/#work" variant="primary">
            See the work
          </Button>
          <Button href="/#top" variant="secondary">
            Back to the start
          </Button>
        </div>
      </Container>
    </Shell>
  );
}
