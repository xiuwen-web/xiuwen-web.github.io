import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Section';
import { Shell } from '@/components/layout/Shell';
import { FeaturedCard } from '@/components/ui/FeaturedCard';
import { HandoffChain } from '@/components/ui/Diagram';
import { Button, DocumentIcon } from '@/components/ui/Button';
import { workEntries, workNumber } from '@/content/navigation';
import { profile, socialLinks } from '@/content/profile';
import { handoff, handoffCaption, processPrinciple } from '@/content/process';
import { hasResume, RESUME_ARIA, RESUME_LABEL } from '@/content/resume';
import { Hero } from '../_hero';
import { PlainHeading, ProofBand, WorkTiles } from '../_variant';

export const metadata: Metadata = {
  title: 'Variant C — One Screen',
  robots: { index: false, follow: false },
};

/**
 * VARIANT C — "One Screen"
 *
 * One bet: the landing page is eight thousand pixels long and it is read in
 * forty seconds.
 *
 * The live page is a complete document. It states a position, proves it with
 * four checkable figures, shows six bodies of work, explains a seven-step
 * process, tells a career story, lists capabilities and tools, sets out four
 * principles and closes on contact details. Everything on it is good, and
 * almost none of it is read, because it is the landing page and a landing page
 * competes with a browser tab rather than with a book.
 *
 * So this variant cuts the landing page to the five things a hiring decision
 * turns on, in the order the decision gets made:
 *
 *   who this is  ->  what is verifiable  ->  what was built  ->  how it is
 *   done  ->  how to get in touch
 *
 * What comes off the landing page: the About narrative in full, the timeline,
 * Capabilities and Tools, the four Principles, the measurement callout, the
 * delivery log and three of the four disclosures. About keeps its position and
 * its 40/40/20 bar, because that answers "what is the job" faster than any
 * paragraph, and links onward.
 *
 * The cost, stated plainly rather than hidden: this variant needs an /about
 * page that does not exist yet, and the "Read the full background" link below
 * is a placeholder pointing at the anchor until it does. Cutting nine thousand
 * pixels of good writing off the front page is only correct if the writing has
 * somewhere else to live.
 */
export default function VariantC() {
  return (
    <Shell active="overview">
      <Hero />
      <ProofBand />
      <Work />
      <Process />
      <About />
      <Contact />
    </Shell>
  );
}

/* ---------------------------------------------------------------- Work --- */

function Work() {
  const featured = workEntries.filter((e) => e.featured);

  return (
    <section
      id="work"
      className="border-t py-10 sm:py-14 lg:py-16"
      style={{ borderColor: 'var(--rule)' }}
    >
      <Container width="wide">
        <PlainHeading
          title="Selected work"
          intro="Six bodies of work. CAdmin Migration and the EverLoop Ecosystem carry most of it. Each page says what I decided and why."
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {featured.map((entry) => (
            <FeaturedCard key={entry.href} entry={entry} number={workNumber(entry.href)} />
          ))}
        </div>

        <WorkTiles />
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------- Process --- */

/**
 * The chain, the caption that bounds it, and the sentence it exists to prove.
 * The six method rules, the specimen and the trace all move to a page of their
 * own; what stays is the diagram, which is the only part of this section a
 * reader can take in without deciding to read.
 */
function Process() {
  return (
    <section
      id="process"
      className="border-t py-10 sm:py-14 lg:py-16"
      style={{ borderColor: 'var(--rule)' }}
    >
      <Container width="content">
        <PlainHeading
          title="How I work with developers"
          intro="Seven steps from a problem in a centre to the change running back in it. Each says who holds the work, and what I am doing at that point."
        />

        <div className="mt-8">
          <HandoffChain steps={handoff} />
        </div>

        <p
          className="mt-6 max-w-[60ch] text-[length:var(--text-small)]"
          style={{ color: 'var(--text-muted)' }}
        >
          {handoffCaption}
        </p>

        <p
          className="mt-8 max-w-[45rem] border-l-2 pl-4 text-[length:var(--text-body)] text-pretty"
          style={{ borderColor: 'var(--accent)' }}
        >
          {processPrinciple}
        </p>

        <p className="mt-8">
          <Link
            href="/#process"
            className="inline-flex min-h-11 items-center gap-1.5 text-[length:var(--text-small)] font-medium underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: 'var(--accent-ink)' }}
          >
            The six rules, a requirement I wrote, and one traced to a live screen
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- About --- */

/**
 * Four elements: the position, the split, the principle it rests on, and the
 * way out to the rest. The three narrative sections, the timeline, the
 * measurement callout and the capability lists are a page, not a panel.
 */
function About() {
  return (
    <section
      id="about"
      className="border-t py-10 sm:py-14 lg:py-16"
      style={{ borderColor: 'var(--rule)' }}
    >
      <Container width="content">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <div className="min-w-0">
            <p className="font-display text-[1.5rem] leading-snug font-semibold text-balance sm:text-[1.75rem]">
              {profile.aboutLede}
            </p>
            <p className="mt-5 max-w-[60ch] text-pretty" style={{ color: 'var(--text-muted)' }}>
              {profile.aboutSupport}
            </p>

            <p className="mt-8 font-display text-[1.25rem] leading-snug text-balance">
              {profile.closingPrinciple.line}
            </p>

            <p className="mt-6">
              <Link
                href="/#about"
                className="inline-flex min-h-11 items-center gap-1.5 text-[length:var(--text-small)] font-medium underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: 'var(--accent-ink)' }}
              >
                How I got here, what I work with, and the principles behind it
                <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>

          <div>
            <h3
              className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              What my role actually looks like
            </h3>
            <div
              className="mt-4 flex h-2 w-full overflow-hidden rounded-full"
              style={{ background: 'var(--surface)' }}
              aria-hidden="true"
            >
              {profile.timeSplit.map((part, i) => (
                <span
                  key={part.label}
                  style={{
                    width: `${part.value}%`,
                    background: 'var(--accent)',
                    opacity: 1 - i * 0.3,
                  }}
                />
              ))}
            </div>
            <ul className="mt-3 flex flex-col gap-y-1">
              {profile.timeSplit.map((part) => (
                <li
                  key={part.label}
                  className="text-[length:var(--text-label)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <span className="font-medium tabular-nums" style={{ color: 'var(--text)' }}>
                    {part.value}%
                  </span>{' '}
                  {part.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------- Contact --- */

function Contact() {
  const linkedin = socialLinks.find((l) => l.label === 'LinkedIn');

  return (
    <section
      id="contact"
      className="border-t py-10 sm:py-14 lg:py-16"
      style={{ borderColor: 'var(--rule)' }}
    >
      <Container width="content">
        <p className="max-w-[38rem] font-display text-[1.5rem] leading-snug text-balance sm:text-[1.875rem]">
          {profile.contactLede}
        </p>

        <dl
          className="mt-10 grid gap-x-10 gap-y-6 border-t pt-8 sm:grid-cols-2"
          style={{ borderColor: 'var(--rule)' }}
        >
          <Row label="Email">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-11 items-center font-display text-[1.125rem] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: 'var(--accent-ink)' }}
            >
              {profile.email}
            </a>
          </Row>

          {linkedin && (
            <Row label="LinkedIn">
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: 'var(--accent-ink)' }}
              >
                {linkedin.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
              </a>
            </Row>
          )}

          {hasResume && (
            <Row label="Resume">
              <Button
                href={profile.resumePath}
                variant="secondary"
                external
                ariaLabel={RESUME_ARIA}
              >
                <DocumentIcon />
                {RESUME_LABEL}
              </Button>
            </Row>
          )}

          <Row label="Location">{profile.location}</Row>
        </dl>
      </Container>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt
        className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </dt>
      <dd className="mt-1 min-w-0">{children}</dd>
    </div>
  );
}
