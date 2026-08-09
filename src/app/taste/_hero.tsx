import { Container } from '@/components/layout/Section';
import { Button, DocumentIcon } from '@/components/ui/Button';
import { HandoffSummary } from '@/components/ui/Diagram';
import { Portrait } from '@/components/ui/Portrait';
import { handoff } from '@/content/process';
import { profile } from '@/content/profile';
import { hasResume, RESUME_ARIA, RESUME_LABEL } from '@/content/resume';
import { appLinks } from '@/content/snapshot';

/**
 * The hero, unchanged from the live page and shared by all three variants.
 *
 * It is held constant on purpose. It is the strongest part of the current
 * design — position stated first, the handoff chain promoted to the one place
 * a thirty-second reader will see it, four checkable store listings above the
 * fold — and holding it fixed is what makes the three variants a comparison of
 * one decision rather than three different pages.
 */
export function Hero() {
  return (
    <section id="top" className="pt-10 pb-14 sm:pt-24 sm:pb-20">
      <Container width="content">
        <div className="mb-6 flex items-center gap-4 sm:mb-8 sm:gap-5">
          <Portrait />
          <div className="min-w-0">
            <p className="font-display text-[1.0625rem] leading-tight font-semibold sm:text-[1.25rem]">
              {profile.fullName}
            </p>
            <p
              className="mt-1 text-[length:var(--text-small)] leading-snug"
              style={{ color: 'var(--text-muted)' }}
            >
              {profile.role}
            </p>
          </div>
        </div>

        <div className="lg:flex lg:items-start lg:gap-12">
          <div className="min-w-0 lg:flex-1">
            <h1 className="font-display text-[1.75rem] leading-[1.13] font-semibold text-balance sm:text-[length:var(--text-display)] sm:leading-[1.15]">
              {profile.heroHeadline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="mt-4 max-w-[35rem] text-pretty sm:mt-5"
              style={{ color: 'var(--text-muted)' }}
            >
              {profile.heroSupport}
            </p>

            <p className="mt-4 font-mono text-[length:var(--text-small)] leading-relaxed tracking-tight sm:mt-5">
              <span className="font-medium">{profile.currentRole.title}</span>
              <span style={{ color: 'var(--text-muted)' }}>
                <span aria-hidden="true"> · </span>
                {profile.currentRole.employer}
                <span aria-hidden="true"> · </span>
                {profile.location}
                <span aria-hidden="true"> · </span>
                since {profile.currentRole.since}
              </span>
            </p>

            <div className="mt-6 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:items-center">
              <Button href="#work" variant="primary">
                View selected work
              </Button>
              {hasResume && (
                <Button
                  href={profile.resumePath}
                  variant="secondary"
                  external
                  ariaLabel={RESUME_ARIA}
                >
                  <DocumentIcon />
                  {RESUME_LABEL}
                </Button>
              )}
            </div>
          </div>

          <div className="hidden lg:block lg:w-[19rem] lg:shrink-0">
            <h2
              className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              How a change moves
            </h2>
            <div className="mt-3">
              <HandoffSummary steps={handoff} />
            </div>
            <a
              href="#process"
              className="mt-3 inline-flex min-h-11 items-center text-[length:var(--text-label)] leading-snug underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: 'var(--accent-ink)' }}
            >
              Two of the seven are someone else&rsquo;s, see how I work
            </a>
          </div>
        </div>

        <div className="mt-7 sm:mt-10">
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              Live now
            </span>
            <span className="h-px flex-1" style={{ background: 'var(--rule)' }} />
          </div>

          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1">
            {appLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 flex-col justify-center py-1 transition-opacity hover:opacity-70"
                >
                  <span
                    className="text-[length:var(--text-small)] font-medium underline decoration-1 underline-offset-4"
                    style={{ color: 'var(--accent-ink)' }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="mt-0.5 text-[length:var(--text-label)]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.note}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
