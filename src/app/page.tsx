import { existsSync } from 'node:fs';
import { Container, Section } from '@/components/layout/Section';
import { Shell } from '@/components/layout/Shell';
import { FeaturedCard, WorkRow } from '@/components/ui/FeaturedCard';
import { FlowChart } from '@/components/ui/Diagram';
import { TraceChain } from '@/components/ui/TraceChain';
import { workEntries, workNumber } from '@/content/navigation';
import { profile, socialLinks } from '@/content/profile';
import {
  measureBody,
  measureHeading,
  method,
  methodIntro,
  pipeline,
  pipelineCaption,
  processIntro,
  specimen,
  specimenIntro,
  trace,
  traceIntro,
  traceSubject,
  traceTitle,
} from '@/content/process';
import { journey, skillGroups } from '@/content/skills';
import { appLinks, snapshot } from '@/content/snapshot';
import { workLog, workLogHeading, workLogIntro } from '@/content/workLog';
import { WorkLog } from '@/components/ui/WorkLog';
import { Button } from '@/components/ui/Button';
import { MetricRow } from '@/components/ui/Metric';

/**
 * The résumé PDF does not exist yet, and a download button that 404s is worse
 * than no button. Checked at build time — a static export runs this once, and
 * the button appears on its own the moment the file is dropped into public/.
 */
const hasResume = existsSync(`public${profile.resumePath}`);

export default function Home() {
  return (
    <Shell active="overview">
      <Hero />
      <Snapshot />
      <Work />
      <Process />
      <About />
      <Skills />
      <Journey />
      <Log />
      <Contact />
    </Shell>
  );
}

/* ---------------------------------------------------------------- Hero --- */

function Hero() {
  return (
    <section id="top" className="pt-16 pb-14 sm:pt-24 sm:pb-20">
      {/* The one place a wider measure earns itself: at 640px the headline
          breaks after "I run tuition", mid-phrase. */}
      <Container width="content">
        <h1 className="font-display text-[2rem] leading-[1.12] font-semibold text-balance sm:text-[length:var(--text-display)] lg:text-[3.25rem]">
          {profile.heroHeadline.map((line, i) => (
            <span key={line} className={i === 1 ? 'block' : 'block'}>
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-[35rem] text-pretty" style={{ color: 'var(--text-muted)' }}>
          {profile.heroSupport}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="#work" variant="primary">
            See the work
          </Button>
          {hasResume && (
            <Button href={profile.resumePath} variant="secondary" download>
              Download résumé
            </Button>
          )}
        </div>

        {/* The verifiable anchor, above the fold — the fastest proof available */}
        <div className="mt-12">
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              Live now
            </span>
            <span className="h-px flex-1" style={{ background: 'var(--rule)' }} />
          </div>

          <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {appLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex flex-wrap items-baseline gap-x-2 transition-opacity hover:opacity-70"
                >
                  <span
                    className="text-[length:var(--text-small)] font-medium underline decoration-1 underline-offset-4"
                    style={{ color: 'var(--accent-ink)' }}
                  >
                    {link.label}
                  </span>
                  <span className="text-[length:var(--text-label)]" style={{ color: 'var(--text-muted)' }}>
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

/* ------------------------------------------------------------ Snapshot --- */

function Snapshot() {
  return (
    <section
      id="snapshot"
      className="relative border-y"
      style={{ borderColor: 'var(--rule)', background: 'var(--surface)' }}
    >
      {/* Grid under the numbers, nowhere near a paragraph. */}
      <span
        aria-hidden="true"
        className="blueprint blueprint-fade pointer-events-none absolute inset-0 opacity-60"
      />
      <Container width="wide" className="relative py-10 sm:py-12">
        <MetricRow facts={snapshot} />
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- Work --- */

/**
 * The numbered entries, read from the IA in navigation.ts so the numbering here
 * can never drift from the rail's (SIDEBAR_FLOW_REVISION §Project Numbering).
 *
 * 01 and 02 are the two largest bodies of work and get raised cards; the rest
 * are compact. Every entry is numbered, so the hierarchy reads the same in both
 * places even though the cards differ in weight.
 */
function Work() {
  const featured = workEntries.filter((e) => e.featured);
  const rest = workEntries.filter((e) => !e.featured);

  return (
    <Section
      id="work"
      eyebrow="Work"
      title="Selected Work"
      width="content"
      intro="Five bodies of work. Two of them — a live-system migration and the EverLoop platform — carry most of what I do. Each page says what I decided and why, which matters more than the feature list, and anything still in progress says so."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {featured.map((entry) => (
          <FeaturedCard key={entry.href} entry={entry} number={workNumber(entry.href)} />
        ))}
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {rest.map((entry) => (
          <WorkRow key={entry.href} entry={entry} number={workNumber(entry.href)} />
        ))}
      </ul>
    </Section>
  );
}

/* ----------------------------------------------------------- Work log --- */

function Log() {
  return (
    <Section id="log" eyebrow="Log" title={workLogHeading} intro={workLogIntro}>
      <WorkLog groups={workLog} />
    </Section>
  );
}

/* ------------------------------------------------------------- Process --- */

function Process() {
  return (
    <Section id="process" eyebrow="Process" title="How I work" intro={processIntro} width="content">
      <FlowChart steps={pipeline} dense />

      <p className="mt-6 max-w-[45rem] text-[length:var(--text-small)]" style={{ color: 'var(--text-muted)' }}>
        {pipelineCaption}
      </p>

      {/* The method, not a list of artefact nouns (F79) */}
      <div className="mt-14">
        <p className="max-w-[45rem] text-[length:var(--text-small)]" style={{ color: 'var(--text-muted)' }}>
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
      </div>

      {/* A recreated requirement — shows the method rather than asserting it */}
      <div className="mt-16">
        <p className="max-w-[45rem] text-[length:var(--text-small)]" style={{ color: 'var(--text-muted)' }}>
          {specimenIntro}
        </p>

        <article
          className="mt-6 rounded-lg p-6 sm:p-8"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <h3 className="text-[length:var(--text-body)] font-medium">{specimen.title}</h3>
          <p className="mt-2 max-w-[42rem] text-[length:var(--text-small)]" style={{ color: 'var(--text-muted)' }}>
            {specimen.standfirst}
          </p>

          <div className="mt-7 space-y-6">
            {specimen.sections.map((section) => (
              <section key={section.heading}>
                <h4
                  className="text-[length:var(--text-label)] font-medium uppercase tracking-wide"
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
      </div>

      {/* The chain. The specimen above shows what a requirement looks like;
          this follows one of them to a screen that is on this site. */}
      <div className="mt-16">
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
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- About --- */

function About() {
  return (
    <Section id="about" eyebrow="About" title="About">
      <div className="space-y-4">
        {profile.about.map((para) => (
          <p key={para.slice(0, 40)}>{para}</p>
        ))}
      </div>

      {/* Time allocation — a factual quantity, not a self-rated skill bar */}
      <div className="mt-10">
        <div
          className="flex h-2 w-full overflow-hidden rounded-full"
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
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
          {profile.timeSplit.map((part) => (
            <li key={part.label} className="text-[length:var(--text-label)]" style={{ color: 'var(--text-muted)' }}>
              <span className="font-medium" style={{ color: 'var(--text)' }}>
                {part.value}%
              </span>{' '}
              {part.label}
            </li>
          ))}
        </ul>
      </div>

      {/*
        "What I'd measure" stopped being its own homepage section (directive 2).
        The project-specific half now lives inside the two case studies where a
        figure is actually missing; this is the general admission, which had
        nowhere else to go. It belongs in About because it is a statement about
        how I work rather than about any one project.
      */}
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
    </Section>
  );
}

/* -------------------------------------------------------------- Skills --- */

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Skills and tools">
      <div className="grid gap-8 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.heading}>
            <h3
              className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              {group.heading}
            </h3>
            <p className="mt-3 text-[length:var(--text-small)] leading-relaxed">{group.items.join(' · ')}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- Journey --- */

function Journey() {
  return (
    <Section id="journey" eyebrow="Journey" title="How I got here">
      <ol className="relative space-y-7 pl-6">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[3px] w-px"
          style={{ background: 'var(--rule)' }}
        />
        {journey.map((entry) => (
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
            <p className={`mt-1 ${entry.milestone ? 'font-medium' : ''}`}>{entry.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------- Contact --- */

function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Contact">
      <p style={{ color: 'var(--text-muted)' }}>
        The quickest way to reach me is email. Happy to talk about operations, delivery, or
        anything on this page.
      </p>

      <a
        href={`mailto:${profile.email}`}
        className="mt-6 inline-block font-display text-[1.25rem] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70 sm:text-[1.5rem]"
        style={{ color: 'var(--accent-ink)' }}
      >
        {profile.email}
      </a>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {hasResume && (
          <a
            href={profile.resumePath}
            download
            className="inline-flex h-11 items-center rounded-md border px-5 text-[length:var(--text-small)] font-medium"
            style={{ borderColor: 'var(--rule)' }}
          >
            Download résumé (PDF)
          </a>
        )}
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[length:var(--text-small)] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </Section>
  );
}
