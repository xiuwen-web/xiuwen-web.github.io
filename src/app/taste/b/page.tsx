import type { Metadata } from 'next';
import { Container } from '@/components/layout/Section';
import { Shell } from '@/components/layout/Shell';
import { FeaturedCard } from '@/components/ui/FeaturedCard';
import { HandoffChain } from '@/components/ui/Diagram';
import { TraceChain } from '@/components/ui/TraceChain';
import { Disclosure } from '@/components/ui/Disclosure';
import { WorkLog } from '@/components/ui/WorkLog';
import { Button, DocumentIcon } from '@/components/ui/Button';
import { workEntries, workNumber } from '@/content/navigation';
import { principles, profile, socialLinks } from '@/content/profile';
import {
  handoff,
  handoffCaption,
  method,
  methodIntro,
  processIntro,
  processPrinciple,
  specimen,
  specimenIntro,
  trace,
  traceIntro,
  traceSubject,
  traceTitle,
} from '@/content/process';
import { skillGroups, technicalExposure, toolGroups } from '@/content/skills';
import { workLog, workLogHeading, workLogIntro } from '@/content/workLog';
import { hasResume, RESUME_ARIA, RESUME_LABEL } from '@/content/resume';
import { Hero } from '../_hero';
import { PlainHeading, ProofBand, ShippedStrip, WorkTiles } from '../_variant';
import '../taste.css';

export const metadata: Metadata = {
  title: 'Variant B — Contact Sheet',
  robots: { index: false, follow: false },
};

/**
 * VARIANT B — "Contact Sheet"
 *
 * One bet: below the hero, the page has no rhythm and no pictures.
 *
 * Two facts about the live landing page, both measurable rather than matters
 * of taste. First, it contains one image in eight thousand pixels, and that
 * image is a 100px portrait — while nineteen real screenshots of the systems
 * it describes sit in public/images, reachable only by opening a case study.
 * Second, from Selected Work to the footer every section is the same shape:
 * a left-aligned heading over a 640-920px prose column with hairline rules
 * between. Two layout families for seven sections.
 *
 * So this variant does not touch a word of copy or a single claim. It changes
 * what the page looks like while you scroll it:
 *
 *   - the four figures move to a navy band, the page's one tonal break, drawn
 *     from the rail's own palette rather than a new one
 *   - a four-up screenshot strip lands directly under the work grid, so the
 *     systems become visible without a click
 *   - the four non-featured entries become tiles carrying their real media,
 *     instead of four rows of text under a rule
 *   - About runs at content width in two columns rather than one prose column,
 *     so the page changes measure at least once
 *   - the mono eyebrows come off every section heading
 *
 * The risk to weigh: the navy band is a deliberate mid-page theme break, and
 * the screenshot strip costs about 200KB and a screen of height that the
 * evidence in variant A would otherwise have used.
 */
export default function VariantB() {
  return (
    <Shell active="overview">
      <Hero />
      <ProofBand tone="navy" />
      <Work />
      <ShippedStrip />
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

  return (
    <section
      id="work"
      className="border-t py-10 sm:py-14 lg:py-16"
      style={{ borderColor: 'var(--rule)' }}
    >
      <Container width="wide">
        <PlainHeading
          title="Selected work"
          intro="Six bodies of work. CAdmin Migration and the EverLoop Ecosystem carry most of what I do. Each page says what I decided and why, and anything still in progress says so."
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {featured.map((entry) => (
            <FeaturedCard key={entry.href} entry={entry} number={workNumber(entry.href)} />
          ))}
        </div>

        <WorkTiles />

        <div id="log" className="mt-12 scroll-mt-24">
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

function Process() {
  return (
    <section
      id="process"
      className="border-t py-10 sm:py-14 lg:py-16"
      style={{ borderColor: 'var(--rule)' }}
    >
      <Container width="content">
        <PlainHeading title="How I work" intro={processIntro} />

        <div className="mt-8">
          <HandoffChain steps={handoff} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_18rem]">
          <p
            className="max-w-[60ch] text-[length:var(--text-small)]"
            style={{ color: 'var(--text-muted)' }}
          >
            {handoffCaption}
          </p>
          <p
            className="border-l-2 pl-4 text-[length:var(--text-body)] text-pretty"
            style={{ borderColor: 'var(--accent)' }}
          >
            {processPrinciple}
          </p>
        </div>

        <Disclosure
          className="mt-12"
          summary="See how I write a requirement"
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
          summary="See a requirement I wrote"
          hint="One recreated in full: current behaviour, proposed behaviour, a worked example, business rules and acceptance criteria."
        >
          <p
            className="max-w-[45rem] text-[length:var(--text-small)]"
            style={{ color: 'var(--text-muted)' }}
          >
            {specimenIntro}
          </p>
          <article
            className="mt-6 rounded-lg p-6 sm:p-8"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <h3 className="text-[length:var(--text-body)] font-medium">{specimen.title}</h3>
            <p
              className="mt-2 max-w-[42rem] text-[length:var(--text-small)]"
              style={{ color: 'var(--text-muted)' }}
            >
              {specimen.standfirst}
            </p>
            <div className="mt-7 space-y-6">
              {specimen.sections.map((section) => (
                <section key={section.heading}>
                  <h4
                    className="text-[length:var(--text-label)] font-medium tracking-wide uppercase"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {section.heading}
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {section.lines.map((line) => (
                      <li
                        key={line.slice(0, 40)}
                        className="pl-4 text-[length:var(--text-small)] leading-relaxed"
                        style={{ borderLeft: '1px solid var(--border)' }}
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <p
              className="mt-7 max-w-[42rem] text-[length:var(--text-small)] leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              {specimen.footnote}
            </p>
          </article>
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
 * The one section that changes measure.
 *
 * Everything else on the page below the hero runs at one column width, so a
 * reader scrolling from Selected Work to the footer never sees the page change
 * shape. About is the natural place to break it: the lede and the time split
 * are a summary, the three narrative sections are the long read, and putting
 * the summary in a sticky left column gives the section a spine.
 */
function About() {
  return (
    <section
      id="about"
      className="border-t py-10 sm:py-14 lg:py-16"
      style={{ borderColor: 'var(--rule)' }}
    >
      <Container width="content">
        <PlainHeading title="About" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[20rem_1fr] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-display text-[1.25rem] leading-snug font-semibold text-balance">
              {profile.aboutLede}
            </p>

            <div className="mt-8">
              <h3
                className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
                style={{ color: 'var(--text-muted)' }}
              >
                What my role actually looks like
              </h3>
              {/* tv-bar draws the three segments left to right as the section
                  arrives. It is the one proportion on the page, and a
                  proportion is the one thing worth animating as a quantity:
                  the shape lands before the three labels under it are read. */}
              <div
                className="tv-bar mt-4 flex h-2 w-full overflow-hidden rounded-full"
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

          <div className="min-w-0">
            <p className="text-pretty" style={{ color: 'var(--text-muted)' }}>
              {profile.aboutSupport}
            </p>

            {profile.aboutSections.map((section) => (
              <div key={section.id} className="mt-10">
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
              </div>
            ))}

            <div className="mt-12 border-t pt-8" style={{ borderColor: 'var(--rule)' }}>
              <p className="font-display text-[1.25rem] leading-snug text-balance sm:text-[1.375rem]">
                {profile.closingPrinciple.line}
              </p>
              <p
                className="mt-3 text-[length:var(--text-small)]"
                style={{ color: 'var(--text-muted)' }}
              >
                {profile.closingPrinciple.support}
              </p>
            </div>
          </div>
        </div>

        <Skills />
      </Container>
    </section>
  );
}

function Skills() {
  return (
    <div id="skills" className="mt-14 scroll-mt-24 border-t pt-10" style={{ borderColor: 'var(--rule)' }}>
      <h3 className="font-display text-[length:var(--text-h3)] font-semibold">Capabilities</h3>
      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
      <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
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

/* ---------------------------------------------------------- Principles --- */

function Principles() {
  const items = principles.filter((p) => p.body);
  const conclusion = principles.find((p) => !p.body);

  return (
    <section
      id="principles"
      className="border-t py-10 sm:py-14 lg:py-16"
      style={{ borderColor: 'var(--rule)' }}
    >
      <Container width="content">
        <PlainHeading title="Principles I work by" />
        {/* Two columns, not three. Three items in three equal columns is the
            shape every generated feature row has, and Principles is not what
            this variant is testing. */}
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
            className="mt-10 border-t pt-6 font-display text-[length:var(--text-h2)] text-pretty"
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
      className="border-t py-10 sm:py-14 lg:py-16"
      style={{ borderColor: 'var(--rule)' }}
    >
      <Container width="content">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <p className="font-display text-[1.5rem] leading-snug text-balance sm:text-[1.875rem]">
            {profile.contactLede}
          </p>

          <dl className="space-y-5">
            <Row label="Email">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-11 items-center text-[length:var(--text-body)] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
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
                  className="inline-flex min-h-11 items-center text-[length:var(--text-small)] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
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
        </div>
      </Container>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t pt-3" style={{ borderColor: 'var(--rule)' }}>
      <dt
        className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </dt>
      <dd className="mt-0.5 min-w-0">{children}</dd>
    </div>
  );
}
