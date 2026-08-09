import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Container } from '@/components/layout/Section';
import { Shell } from '@/components/layout/Shell';
import { HandoffChain } from '@/components/ui/Diagram';
import { TraceChain } from '@/components/ui/TraceChain';
import { Disclosure } from '@/components/ui/Disclosure';
import { WorkLog } from '@/components/ui/WorkLog';
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
import {
  IslandButton,
  PremiumFeatured,
  PremiumHero,
  PremiumProofBand,
  PremiumShipped,
  PremiumWorkTiles,
} from '../_premium';
import '../taste.css';
import '../premium.css';

/*
 * Geist and Geist Mono, replacing Inter, Sora and IBM Plex Mono.
 *
 * Loaded here rather than in the root layout so the live site and the
 * other variants keep the fonts they shipped with. next/font subsets and
 * self-hosts them exactly as it does the originals, so this costs no
 * extra request and no layout shift.
 *
 * Variable weight on the sans, because the type scale now uses 400, 450,
 * 500, 600 and 700 and shipping five static cuts would cost more than
 * the variable file does.
 */
const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Variant D — Instrument',
  robots: { index: false, follow: false },
};

/**
 * VARIANT D — "Instrument"
 *
 * Variant B's structure, rebuilt in premium materials. B decided what
 * goes on the page; this decides what it is made of.
 *
 * The audit that produced it, in short: one untinted black shadow doing
 * all the elevation work on a cool teal palette; one 8px radius on every
 * container so nothing nests; no texture at all; 32-64px of section
 * padding where the premium floor is 96; Inter as the body face; display
 * type at 44px with default tracking; and reveals that rise 12px in
 * 300ms, which reads as a UI state change rather than as arrival.
 *
 * What changed, in order of how much it is worth:
 *
 *   1. Type      Geist and Geist Mono replace Inter, Sora and Plex Mono.
 *                Hero display goes 44px -> 60px at -0.032em tracking.
 *   2. Elevation Three tinted levels lit from a single source above,
 *                plus a top highlight. Dark mode swaps to rings, because
 *                shadow does not read on a dark ground.
 *   3. Bezels    Every card is a core in a tray, with the inner radius
 *                calculated as outer minus tray padding so the curves
 *                are concentric.
 *   4. Space     Sections go to 80/112px. The page breathes.
 *   5. Texture   A fixed fractal-noise layer at 3.5%.
 *   6. Motion    One weighted curve everywhere, and reveals that resolve
 *                out of a 6px defocus over 900ms.
 *   7. Controls  Island buttons with the arrow in its own well.
 *
 * What it deliberately is NOT: the glass-and-mesh-gradient aesthetic the
 * phrase "high-end agency" usually produces. This page argues that its
 * claims can be checked and its systems can be relied on. Glow would be
 * a designer cosplaying an engineer, and a recruiter reads that in about
 * a second. The reference is a measuring instrument, not a launch page.
 */
export default function VariantD() {
  return (
    /*
     * The font variables and the type defaults have to sit on an element
     * that wraps the rail as well as the content, so the whole frame
     * changes face together. The flex chain from <body> is preserved:
     * body is a column, this is the flexible child, Shell fills it.
     */
    <div
      className={`${geist.variable} ${geistMono.variable} flex min-h-full flex-1 flex-col`}
      style={
        {
          '--font-sans': 'var(--font-geist)',
          '--font-display': 'var(--font-geist)',
          '--font-mono': 'var(--font-geist-mono)',
          fontFamily: 'var(--font-geist)',
          letterSpacing: '-0.006em',
        } as React.CSSProperties
      }
    >
      {/* Fixed, pointer-events-none, above content and below overlays. */}
      <span aria-hidden="true" className="px-grain" />

      <Shell active="overview">
        <PremiumHero />
        <PremiumProofBand />
        <Work />
        <PremiumShipped />
        <Process />
        <About />
        <Principles />
        <Contact />
      </Shell>
    </div>
  );
}

/* --------------------------------------------------------- Headings --- */

/**
 * One heading treatment for the page. The pill eyebrow is used twice in
 * total — once on the shipped strip and once here on Selected work —
 * rather than above every section, which is what made the live page's
 * mono labels read as texture instead of as structure.
 */
function Heading({ title, intro, pill }: { title: string; intro?: string; pill?: string }) {
  return (
    <header>
      {pill && <p className="px-pill mb-5">{pill}</p>}
      <h2 className="px-h2 text-[1.875rem] sm:text-[2.25rem]">{title}</h2>
      {intro && (
        <p
          className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-pretty"
          style={{ color: 'var(--text-muted)' }}
        >
          {intro}
        </p>
      )}
    </header>
  );
}

/* ------------------------------------------------------------- Work --- */

function Work() {
  return (
    <section id="work" className="py-20 sm:py-28">
      <Container width="wide">
        <Heading
          pill="Selected work"
          title="Six bodies of work"
          intro="CAdmin Migration and the EverLoop Ecosystem carry most of what I do. Each page says what I decided and why, and anything still in progress says so."
        />

        <div className="mt-12">
          <PremiumFeatured />
        </div>

        <PremiumWorkTiles />

        <div id="log" className="mt-16 scroll-mt-24">
          <h3 className="text-[length:var(--text-h3)] font-semibold tracking-[-0.018em]">
            {workLogHeading}
          </h3>
          <p
            className="mt-2.5 max-w-[45rem] text-[length:var(--text-small)] leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {workLogIntro}
          </p>
          <Disclosure
            className="mt-6"
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

/* ---------------------------------------------------------- Process --- */

function Process() {
  return (
    <section id="process" className="py-20 sm:py-28">
      <Container width="content">
        <Heading title="How I work" intro={processIntro} />

        <div className="mt-12">
          <HandoffChain steps={handoff} />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_19rem]">
          <p
            className="max-w-[60ch] text-[length:var(--text-small)] leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {handoffCaption}
          </p>

          {/* The principle, in a tray. It is the sentence the seven steps
              exist to earn, and it was a left border on a paragraph. */}
          <div className="px-tray-sm self-start">
            <div className="px-core-sm p-5">
              <p className="text-[1.0625rem] leading-snug text-pretty">{processPrinciple}</p>
            </div>
          </div>
        </div>

        <Disclosure
          className="mt-14"
          summary="See how I write a requirement"
          hint="How a requirement gets written before anyone builds from it."
        >
          <p
            className="max-w-[45rem] text-[length:var(--text-small)] leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {methodIntro}
          </p>
          <ol className="mt-7 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
            {method.map((rule, i) => (
              <li key={rule.heading}>
                <h3 className="text-[length:var(--text-small)] font-medium">
                  <span aria-hidden="true" className="px-nums" style={{ color: 'var(--text-muted)' }}>
                    {String(i + 1).padStart(2, '0')}.{' '}
                  </span>
                  {rule.heading}
                </h3>
                <p
                  className="mt-2 text-[length:var(--text-small)] leading-relaxed"
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
            className="max-w-[45rem] text-[length:var(--text-small)] leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {specimenIntro}
          </p>

          <div className="px-tray mt-7">
            <article className="px-core p-6 sm:p-8">
              <h3 className="text-[1.0625rem] font-medium tracking-[-0.014em]">{specimen.title}</h3>
              <p
                className="mt-2.5 max-w-[42rem] text-[length:var(--text-small)] leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                {specimen.standfirst}
              </p>

              <div className="mt-8 grid gap-7 sm:grid-cols-2">
                {specimen.sections.map((section) => (
                  <section key={section.heading}>
                    <h4
                      className="px-label text-[0.6875rem] font-medium"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {section.heading}
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {section.lines.map((line) => (
                        <li
                          key={line.slice(0, 40)}
                          className="pl-4 text-[length:var(--text-small)] leading-relaxed"
                          style={{
                            borderLeft:
                              '1px solid color-mix(in srgb, var(--text) 14%, transparent)',
                          }}
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              <p
                className="mt-8 max-w-[42rem] text-[length:var(--text-small)] leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                {specimen.footnote}
              </p>
            </article>
          </div>
        </Disclosure>

        <Disclosure
          className="mt-4"
          summary="See one requirement reach a live screen"
          hint="The diagnostic report at four checkable points: the versioned brief, the prototypes, five board items, and two screens published on this site."
        >
          <h3 className="text-[length:var(--text-h3)] font-semibold tracking-[-0.018em]">
            {traceTitle}
          </h3>
          <p
            className="mt-2.5 max-w-[45rem] text-[length:var(--text-small)] leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {traceIntro}
          </p>
          <p className="px-pill mt-5">{traceSubject}</p>
          <TraceChain steps={trace} />
        </Disclosure>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------ About --- */

function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <Container width="content">
        <Heading title="About" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[20rem_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[1.375rem] leading-snug font-semibold tracking-[-0.022em] text-balance">
              {profile.aboutLede}
            </p>

            <div className="px-tray-sm mt-9">
              <div className="px-core-sm p-5">
                <p className="px-label text-[0.625rem]" style={{ color: 'var(--text-muted)' }}>
                  What my role actually looks like
                </p>
                <div
                  className="tv-bar mt-4 flex h-2.5 w-full overflow-hidden rounded-full"
                  style={{ background: 'color-mix(in srgb, var(--text) 8%, transparent)' }}
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
                <ul className="mt-4 flex flex-col gap-y-1.5">
                  {profile.timeSplit.map((part) => (
                    <li
                      key={part.label}
                      className="text-[length:var(--text-label)]"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <span className="px-nums font-medium" style={{ color: 'var(--text)' }}>
                        {part.value}%
                      </span>{' '}
                      {part.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <p
              className="text-[1.0625rem] leading-relaxed text-pretty"
              style={{ color: 'var(--text-muted)' }}
            >
              {profile.aboutSupport}
            </p>

            {profile.aboutSections.map((section) => (
              <div key={section.id} className="mt-12">
                <h3 className="text-[length:var(--text-h3)] font-semibold tracking-[-0.018em]">
                  {section.heading}
                </h3>
                <div className="mt-3.5 space-y-4 leading-relaxed">
                  {section.body.map((para) => (
                    <p key={para.slice(0, 40)} className="text-pretty">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <p className="mt-16 text-[1.5rem] leading-snug font-semibold tracking-[-0.024em] text-balance">
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

        <Skills />
      </Container>
    </section>
  );
}

function Skills() {
  return (
    <div id="skills" className="mt-20 scroll-mt-24">
      <h3 className="text-[length:var(--text-h3)] font-semibold tracking-[-0.018em]">
        Capabilities
      </h3>
      <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <div key={group.heading} className="px-tray-sm">
            <div className="px-core-sm h-full p-5">
              <h4 className="px-label text-[0.625rem]" style={{ color: 'var(--text-muted)' }}>
                {group.heading}
              </h4>
              <p className="mt-3 text-[length:var(--text-small)] leading-relaxed">
                {group.items.join(' · ')}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mt-14 text-[length:var(--text-h3)] font-semibold tracking-[-0.018em]">
        Tools
      </h3>
      <div className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
        {toolGroups.map((group) => (
          <div key={group.heading}>
            <h4 className="px-label text-[0.625rem]" style={{ color: 'var(--text-muted)' }}>
              {group.heading}
            </h4>
            <p className="mt-2.5 text-[length:var(--text-small)] leading-relaxed">
              {group.items.join(' · ')}
            </p>
          </div>
        ))}
      </div>

      <p
        className="mt-10 border-t pt-6 text-[length:var(--text-small)] leading-relaxed"
        style={{ borderColor: 'var(--rule)', color: 'var(--text-muted)' }}
      >
        <span className="px-label text-[0.625rem]" style={{ color: 'var(--text-muted)' }}>
          {technicalExposure.label}
        </span>
        <span aria-hidden="true"> · </span>
        {technicalExposure.items.join(' · ')}
        <span className="mt-1 block">{technicalExposure.note}</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------- Principles --- */

function Principles() {
  const items = principles.filter((p) => p.body);
  const conclusion = principles.find((p) => !p.body);

  return (
    <section id="principles" className="py-20 sm:py-28">
      <Container width="content">
        <Heading title="Principles I work by" />

        <ol className="tv-stagger mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2" data-reveal>
          {items.map((rule, i) => (
            <li key={rule.heading}>
              <span
                className="px-nums font-mono text-[length:var(--text-label)]"
                style={{ color: 'var(--accent-ink)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-[1.0625rem] font-medium tracking-[-0.014em]">
                {rule.heading}
              </h3>
              <p
                className="mt-2.5 text-[length:var(--text-small)] leading-relaxed text-pretty"
                style={{ color: 'var(--text-muted)' }}
              >
                {rule.body}
              </p>
            </li>
          ))}
        </ol>

        {conclusion && (
          <p className="mt-16 text-[1.5rem] leading-snug font-semibold tracking-[-0.024em] text-pretty sm:text-[1.75rem]">
            {conclusion.heading}.
          </p>
        )}
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------- Contact --- */

function Contact() {
  const linkedin = socialLinks.find((l) => l.label === 'LinkedIn');

  return (
    <section id="contact" className="py-20 sm:py-28">
      <Container width="content">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div>
            <p className="px-display text-[2rem] text-balance sm:text-[2.5rem]">
              {profile.contactLede}
            </p>

            <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
              <IslandButton href={`mailto:${profile.email}`} external>
                {profile.email}
              </IslandButton>
              {hasResume && (
                <IslandButton
                  href={profile.resumePath}
                  variant="secondary"
                  external
                  ariaLabel={RESUME_ARIA}
                >
                  {RESUME_LABEL}
                </IslandButton>
              )}
            </div>
          </div>

          <dl className="space-y-6 self-end">
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
            <Row label="Location">{profile.location}</Row>
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t pt-4" style={{ borderColor: 'var(--rule)' }}>
      <dt className="px-label text-[0.625rem]" style={{ color: 'var(--text-muted)' }}>
        {label}
      </dt>
      <dd className="mt-1 min-w-0">{children}</dd>
    </div>
  );
}
