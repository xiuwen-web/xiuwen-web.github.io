import type { Metadata } from 'next';
import { Container } from '@/components/layout/Section';
import { Shell } from '@/components/layout/Shell';
import { FeaturedCard, WorkRow } from '@/components/ui/FeaturedCard';
import { HandoffChain } from '@/components/ui/Diagram';
import { TraceChain } from '@/components/ui/TraceChain';
import { Disclosure } from '@/components/ui/Disclosure';
import { WorkLog } from '@/components/ui/WorkLog';
import { workEntries, workNumber } from '@/content/navigation';
import { principles, profile, socialLinks } from '@/content/profile';
import {
  handoff,
  handoffCaption,
  measureBody,
  measureHeading,
  method,
  methodIntro,
  processIntro,
  processPrinciple,
  trace,
  traceIntro,
  traceSubject,
  traceTitle,
} from '@/content/process';
import {
  journey,
  journeyAlongside,
  journeyClosing,
  journeySubtitle,
  skillGroups,
  technicalExposure,
  toolGroups,
} from '@/content/skills';
import { workLog, workLogHeading, workLogIntro } from '@/content/workLog';
import { hasResume, RESUME_ARIA, RESUME_LABEL } from '@/content/resume';
import { Button, DocumentIcon } from '@/components/ui/Button';
import { Hero } from '../_hero';
import { PlainHeading, ProofBand, SpecimenPanel } from '../_variant';

export const metadata: Metadata = {
  title: 'Variant A — Proof Sheet',
  robots: { index: false, follow: false },
};

/**
 * VARIANT A — "Proof Sheet"
 *
 * One bet: the page hides its own evidence.
 *
 * The live landing page folds five things into <details>: the delivery log,
 * the six method rules, the recreated requirement, the trace chain and the
 * timeline. Every one of them is the sort of artefact that separates this
 * portfolio from a page of adjectives, and a reader spending forty seconds
 * opens none of them. The page ends up arguing that its claims are checkable
 * while keeping the checkable parts one click away.
 *
 * So this variant unfolds exactly one of them — the requirement specimen —
 * and gives it the middle of How I Work. The log, the method rules and the
 * trace stay folded, because those are reference and this is the demonstration.
 *
 * Two supporting changes, both about the same problem:
 *   - the four verifiable figures get display scale instead of 24px mono
 *   - the mono eyebrow above each section is dropped, so the two labels that
 *     survive mean something again
 *
 * Nothing is cut. Nothing is reworded. Only what is visible without a click.
 */
export default function VariantA() {
  return (
    <Shell active="overview">
      <Hero />
      <ProofBand />
      <Work />
      <Process />
      <About />
      <Principles />
      <Contact />
    </Shell>
  );
}

/* ---------------------------------------------------------------- Work --- */

function Work() {
  const featured = workEntries.filter((e) => e.featured);
  const rest = workEntries.filter((e) => !e.featured);

  return (
    <section id="work" className="border-t py-8 sm:py-12 lg:py-16" style={{ borderColor: 'var(--rule)' }}>
      <Container width="content">
        <PlainHeading
          title="Selected work"
          intro="Six bodies of work. CAdmin Migration and the EverLoop Ecosystem carry most of what I do. Each page says what I decided and why, and anything still in progress says so."
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {featured.map((entry) => (
            <FeaturedCard key={entry.href} entry={entry} number={workNumber(entry.href)} />
          ))}
        </div>

        <ul className="mt-10 border-b" style={{ borderColor: 'var(--rule)' }}>
          {rest.map((entry) => (
            <WorkRow key={entry.href} entry={entry} number={workNumber(entry.href)} />
          ))}
        </ul>

        <div id="log" className="mt-14 scroll-mt-24">
          <h3 className="font-display text-[length:var(--text-h3)] font-semibold">
            {workLogHeading}
          </h3>
          <p
            className="mt-2 max-w-[45rem] text-[length:var(--text-small)]"
            style={{ color: 'var(--text-muted)' }}
          >
            {workLogIntro}
          </p>
          <Disclosure
            className="mt-5"
            summary="See the delivery log"
            hint="Twelve entries across five systems."
          >
            <WorkLog groups={workLog} />
          </Disclosure>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------- Process --- */

/**
 * The section the variant is really about.
 *
 * Order: the chain (what happens), the principle (why), the specimen (proof).
 * The specimen used to be third of three disclosures; it is now the only thing
 * in this section that is not a summary of itself.
 */
function Process() {
  return (
    <section
      id="process"
      className="border-t py-8 sm:py-12 lg:py-16"
      style={{ borderColor: 'var(--rule)' }}
    >
      <Container width="content">
        <PlainHeading title="How I work" intro={processIntro} />

        <div className="mt-8">
          <h3 className="font-display text-[length:var(--text-h3)] font-semibold">
            How I work with developers
          </h3>
          <p
            className="mt-2 max-w-[60ch] text-[length:var(--text-small)]"
            style={{ color: 'var(--text-muted)' }}
          >
            Seven steps from a problem in a centre to the change running back in it. Each says who
            holds the work, and what I am doing at that point.
          </p>

          <div className="mt-5">
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
        </div>

        {/* Out of the disclosure and onto the page. */}
        <div className="mt-14">
          <SpecimenPanel />
        </div>

        {/* The two that stay folded: reference for a reader who is already
            convinced, not the demonstration itself. */}
        <Disclosure
          className="mt-12"
          summary="See the six rules behind it"
          hint="How a requirement gets written before anyone builds from it."
        >
          <p
            className="max-w-[45rem] text-[length:var(--text-small)]"
            style={{ color: 'var(--text-muted)' }}
          >
            {methodIntro}
          </p>
          <ol className="mt-6 grid grid-cols-1 gap-x-12 gap-y-7 sm:grid-cols-2">
            {method.map((rule, i) => (
              <li key={rule.heading}>
                <h3 className="text-[length:var(--text-small)] font-medium">
                  <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
                    {String(i + 1).padStart(2, '0')}.{' '}
                  </span>
                  {rule.heading}
                </h3>
                <p
                  className="mt-1.5 text-[length:var(--text-small)] leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {rule.body}
                </p>
              </li>
            ))}
          </ol>
        </Disclosure>

        <Disclosure
          className="mt-4"
          summary="See one requirement reach a live screen"
          hint="The diagnostic report at four checkable points: the versioned brief, the prototypes, five board items, and two screens published on this site."
        >
          <h3 className="font-display text-[length:var(--text-h3)] font-semibold">{traceTitle}</h3>
          <p
            className="mt-2 max-w-[45rem] text-[length:var(--text-small)]"
            style={{ color: 'var(--text-muted)' }}
          >
            {traceIntro}
          </p>
          <p
            className="mt-4 font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
            style={{ color: 'var(--accent-ink)' }}
          >
            <span aria-hidden="true">[ </span>
            {traceSubject}
            <span aria-hidden="true"> ]</span>
          </p>
          <TraceChain steps={trace} />
        </Disclosure>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- About --- */

/**
 * Unchanged from the live page apart from the eyebrow, and deliberately so:
 * this variant is a single-variable test of what happens when the evidence is
 * on the page instead of behind it.
 */
function About() {
  return (
    <section
      id="about"
      className="border-t py-8 sm:py-12 lg:py-16"
      style={{ borderColor: 'var(--rule)' }}
    >
      <Container width="prose">
      <PlainHeading title="About" />
      <p className="mt-8 font-display text-[1.375rem] leading-snug font-semibold text-balance sm:text-[1.5rem]">
        {profile.aboutLede}
      </p>

      <p className="mt-5 text-pretty" style={{ color: 'var(--text-muted)' }}>
        {profile.aboutSupport}
      </p>

      <div className="mt-10">
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
              style={{ width: `${part.value}%`, background: 'var(--accent)', opacity: 1 - i * 0.3 }}
            />
          ))}
        </div>
        <ul className="mt-3 flex flex-col gap-y-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
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

      {profile.aboutSections.map((section) => (
        <div key={section.id} className="mt-12">
          <h3 className="font-display text-[length:var(--text-h3)] font-semibold">
            {section.heading}
          </h3>
          <div className="mt-3 space-y-4">
            {section.body.map((para) => (
              <p key={para.slice(0, 40)} className="text-pretty">
                {para}
              </p>
            ))}
          </div>
          {section.id === 'how-i-got-here' && <Journey />}
        </div>
      ))}

      {/* The measurement callout, unchanged and in the same sunk panel. */}
      <div
        className="mt-12 rounded-[var(--radius)] p-5 sm:p-6"
        style={{ background: 'var(--surface-sunk)' }}
      >
        <h3
          className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          {measureHeading}
        </h3>
        <div className="mt-3 space-y-3 text-[length:var(--text-small)]">
          {measureBody.map((para) => (
            <p key={para.slice(0, 40)} style={{ color: 'var(--text-muted)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-14 border-t pt-8" style={{ borderColor: 'var(--rule)' }}>
        <p className="font-display text-[1.25rem] leading-snug text-balance sm:text-[1.375rem]">
          {profile.closingPrinciple.line}
        </p>
        <p className="mt-3 text-[length:var(--text-small)]" style={{ color: 'var(--text-muted)' }}>
          {profile.closingPrinciple.support}
        </p>
      </div>

      <Skills />
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------- Skills --- */

function Skills() {
  return (
    <div id="skills" className="mt-14 scroll-mt-24">
      <h3 className="font-display text-[length:var(--text-h3)] font-semibold">Capabilities</h3>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.heading}>
            <h4
              className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              {group.heading}
            </h4>
            <p className="mt-3 text-[length:var(--text-small)] leading-relaxed">
              {group.items.join(' · ')}
            </p>
          </div>
        ))}
      </div>

      <h3 className="mt-12 font-display text-[length:var(--text-h3)] font-semibold">Tools</h3>
      <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {toolGroups.map((group) => (
          <div key={group.heading}>
            <h4
              className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              {group.heading}
            </h4>
            <p className="mt-2 text-[length:var(--text-small)] leading-relaxed">
              {group.items.join(' · ')}
            </p>
          </div>
        ))}
      </div>

      <p
        className="mt-8 border-t pt-5 text-[length:var(--text-small)]"
        style={{ borderColor: 'var(--rule)', color: 'var(--text-muted)' }}
      >
        <span
          className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          {technicalExposure.label}
        </span>
        <span aria-hidden="true"> · </span>
        {technicalExposure.items.join(' · ')}
        <span className="mt-1 block">{technicalExposure.note}</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------- Journey --- */

function Journey() {
  return (
    <Disclosure className="mt-6" summary="See the timeline" hint={journeySubtitle}>
      <div id="journey" className="scroll-mt-24 space-y-9">
        {journey.map((phase) => (
          <section key={phase.label}>
            <h4
              className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
              style={{ color: 'var(--accent-ink)' }}
            >
              {phase.label}
            </h4>

            <ol className="relative mt-4 space-y-7 pl-6">
              <span
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-[3px] w-px"
                style={{ background: 'var(--rule)' }}
              />
              {phase.entries.map((entry) => (
                <li key={`${entry.year}-${entry.body.slice(0, 20)}`} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.5rem] -left-6 h-[7px] w-[7px] rounded-full"
                    style={{
                      background: entry.milestone ? 'var(--accent)' : 'var(--bg)',
                      border: `1.5px solid ${entry.milestone ? 'var(--accent)' : 'var(--rule)'}`,
                    }}
                  />
                  <span
                    className="font-mono text-[length:var(--text-label)] tabular-nums"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {entry.year}
                  </span>
                  <p className={`mt-1 text-pretty ${entry.milestone ? 'font-medium' : ''}`}>
                    {entry.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        ))}

        <p
          className="border-t pt-6 text-[length:var(--text-small)] text-pretty"
          style={{ borderColor: 'var(--rule)' }}
        >
          {journeyAlongside}
        </p>

        <p
          className="text-[length:var(--text-small)] text-pretty"
          style={{ color: 'var(--text-muted)' }}
        >
          {journeyClosing}
        </p>
      </div>
    </Disclosure>
  );
}

/* ---------------------------------------------------------- Principles --- */

function Principles() {
  const items = principles.filter((p) => p.body);
  const conclusion = principles.find((p) => !p.body);

  return (
    <section
      id="principles"
      className="border-t py-8 sm:py-12 lg:py-16"
      style={{ borderColor: 'var(--rule)' }}
    >
      <Container width="content">
        <PlainHeading title="Principles I work by" />
        <ol className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {items.map((rule, i) => (
            <li key={rule.heading}>
              <h3 className="text-[length:var(--text-body)] font-medium">
                <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
                  {String(i + 1).padStart(2, '0')}.{' '}
                </span>
                {rule.heading}
              </h3>
              <p
                className="mt-2 text-[length:var(--text-small)] leading-relaxed text-pretty"
                style={{ color: 'var(--text-muted)' }}
              >
                {rule.body}
              </p>
            </li>
          ))}
        </ol>

        {conclusion && (
          <p
            className="mt-10 border-t pt-6 font-display text-[length:var(--text-h3)] text-pretty"
            style={{ borderColor: 'var(--rule)' }}
          >
            {conclusion.heading}.
          </p>
        )}
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
      className="border-t py-8 sm:py-12 lg:py-16"
      style={{ borderColor: 'var(--rule)' }}
    >
      <Container width="prose">
      <PlainHeading title="Contact" />
      <p className="mt-8 max-w-[38rem] font-display text-[1.375rem] leading-snug text-balance sm:text-[1.625rem]">
        {profile.contactLede}
      </p>

      <dl className="mt-10 space-y-5 border-t pt-8" style={{ borderColor: 'var(--rule)' }}>
        <Row label="Email">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-11 items-center font-display text-[1.125rem] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70 sm:text-[1.25rem]"
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
            <Button href={profile.resumePath} variant="secondary" external ariaLabel={RESUME_ARIA}>
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
    <div className="sm:flex sm:items-baseline sm:gap-6">
      <dt
        className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase sm:w-24 sm:shrink-0"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </dt>
      <dd className="mt-1 min-w-0 sm:mt-0">{children}</dd>
    </div>
  );
}
