import type { ReactNode } from 'react';
import type { CaseStudy, Visual } from '@/types/content';
import { Container } from '@/components/layout/Section';
import { Badge, Chip } from './Badge';
import { BrowserFrame } from './BrowserFrame';
import { Button } from './Button';
import { RolloutDiagram } from './RolloutDiagram';
import { BeforeAfter, Diagram, FlowChart, SystemMap } from './Diagram';
import {
  cadminBeforeAfter,
  cadminMigrationFlow,
  cadminPilotFlow,
  launchPipeline,
  prioritisationFlow,
  storeListings,
  writewiseFlow,
} from '@/content/diagrams';

/**
 * The full narrative, one per route. Same content as the old homepage
 * disclosure — moved, not rewritten (REDESIGN §2).
 *
 * The homepage now has to sell in seventy words; this page has the reader's
 * consent, so it can take six hundred. Prose stays at 640px throughout, and
 * only figures widen — a caption that runs wider than the paragraph above it
 * reads as a different document.
 */
/**
 * Section ids, in page order. The rail's table of contents and the scroll-spy
 * script both read this, so a section can never appear in the contents without
 * existing on the page.
 */
export function caseStudyToc(study: CaseStudy) {
  const items = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem', label: 'The problem' },
    { id: 'role', label: 'My role' },
    { id: 'constraints', label: 'Constraints' },
    { id: 'decisions', label: 'Key decisions' },
  ];
  if (study.diagram === 'rollout') items.push({ id: 'rollout', label: 'Rollout' });
  if (study.launch) items.push({ id: 'launch', label: 'Launch execution' });
  items.push({ id: 'produced', label: 'Deliverables' });
  items.push({ id: 'outcome', label: 'Outcomes' });
  if (study.measurement) items.push({ id: 'measurement', label: 'Measurement' });
  items.push({ id: 'lessons', label: 'What I’d do differently' });
  return items;
}


export function CaseStudyDetail({
  study,
  index,
  backHref = '/#work',
  backLabel = 'All work',
}: {
  study: CaseStudy;
  index: string | null;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <article>
      <Header study={study} index={index} backHref={backHref} backLabel={backLabel} />

      <div className="space-y-10 pb-16 sm:space-y-12">
        <Block id="overview" label="Overview" paragraphs={study.context} />

        {study.slug === 'cadmin-migration' && (
          <Diagram
            heading="What changed"
            intro="The same system, before and after the rebuild."
            caption="The left column is why it could not stay. The right is what replaced it — and the last line of each is the reason it had to be phased rather than switched over."
          >
            <BeforeAfter data={cadminBeforeAfter} />
          </Diagram>
        )}

        {study.slug === 'writewise' && (
          <Diagram
            heading="What happens to a child's composition"
            intro="Every step a piece of work passes through, and where a person stands in it."
            caption="Two of those steps exist because the system can be wrong. A teacher confirms the transcription against the scan, and the model answer is never sent to the engine — it would pull a child's storyline toward someone else's."
          >
            <FlowChart steps={writewiseFlow} dense />
          </Diagram>
        )}

        {study.slug === 'mobile-launch' && (
          <Diagram
            heading="Why four listings"
            intro="Two apps, two platforms."
            caption="Students and teachers barely overlap, so they got separate apps rather than one that switches by role — which is also why a single launch produced four store listings."
          >
            <SystemMap root="EverLoop mobile" branches={storeListings} />
          </Diagram>
        )}
        <Block id="problem" label="The problem" paragraphs={study.problem} />
        <List id="role" label="My role" items={study.role} />
        <Block id="involved" label="Who was involved" paragraphs={[study.involved]} />
        <List id="constraints" label="Constraints" items={study.constraints} />

        {study.slug === 'cadmin-migration' && (
          <Diagram
            heading="Why phased, not one cutover"
            intro="The constraint drove the shape of the whole project."
            caption="Read top to bottom this is the argument I made: attendance and payroll cannot pause, so the risk had to be taken in order rather than all at once."
          >
            <FlowChart steps={cadminPilotFlow} dense />
          </Diagram>
        )}

        {/* The reason the site exists (PRD §3, O3) — the only accent rail on
            the page, so it is unambiguously the part to read. */}
        <Container>
          <section
            id="decisions"
            className="scroll-mt-24 border-l-2 py-1 pl-5 sm:pl-6"
            style={{ borderColor: 'var(--accent)' }}
          >
            <Label as="h2">What I decided, and why</Label>
            <div className="mt-5 space-y-8">
              {study.decisions.map((decision) => (
                <div key={decision.heading}>
                  <h3 className="font-display text-[length:var(--text-h3)] leading-snug font-semibold">
                    {decision.heading}
                  </h3>
                  <div className="mt-2 space-y-3">
                    {decision.body.map((para) => (
                      <p key={para.slice(0, 40)}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Container>

        {study.slug === 'mobile-launch' && (
          <Diagram
            heading="How the mobile scope was decided"
            intro="Every request was reasonable. That was the problem."
            caption="A phone is not a smaller desktop. The test was not whether a feature was useful but whether it was useful to someone standing between classes."
          >
            <FlowChart steps={prioritisationFlow} dense />
          </Diagram>
        )}

        {/* A vertical timeline gains nothing from extra width, and a diagram
            whose left edge misses the prose column reads as a different page.
            Only photographic figures widen. */}
        {study.diagram === 'rollout' && (
          <Container>
            <section id="rollout" className="scroll-mt-24">
              <Label as="h2">Rollout</Label>
              <div className="mt-4">
                <FlowChart steps={cadminMigrationFlow} dense />
              </div>
              <p
                className="mt-5 max-w-[60ch] text-[length:var(--text-small)]"
                style={{ color: 'var(--text-muted)' }}
              >
                The dated version of the same thing — what actually shipped, and when.
              </p>
              <div className="mt-4">
                <RolloutDiagram />
              </div>
            </section>
          </Container>
        )}

        {study.visual && <Figure visual={study.visual} label={study.navLabel} />}

        {study.launch && (
          <>
            <Container>
              <section id="launch" className="scroll-mt-24">
                <Label as="h2">Launch execution</Label>
                <div className="mt-3 space-y-3">
                  {study.launch.body.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </div>
              </section>
            </Container>
            <Diagram
              heading="From web platform to four listings"
              intro="What the launch actually involved, in order."
              caption="The two steps people forget are the last two. Store review is time you do not control, and the work does not stop at launch — the student app is on version 1.4.0."
            >
              <FlowChart steps={launchPipeline} dense />
            </Diagram>

            {study.launch.visuals?.map((visual) => (
              <Figure key={visual.src} visual={visual} label={study.navLabel} />
            ))}
          </>
        )}

        <Block id="produced" label="Deliverables" paragraphs={[study.produced]} />

        <Container>
          <section id="outcome" className="scroll-mt-24">
            <Label as="h2">Outcomes</Label>
            <div className="mt-3 space-y-3">
              {study.outcome.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>

            {study.outcomeLinks && (
              <ul className="mt-6 space-y-2">
                {study.outcomeLinks.map((link) => (
                  <li key={link.href} className="flex flex-wrap items-baseline gap-x-3">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[length:var(--text-small)] font-medium underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
                      style={{ color: 'var(--accent-ink)' }}
                    >
                      {link.label}
                    </a>
                    {link.note && (
                      <span
                        className="text-[length:var(--text-small)]"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {link.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </Container>

        {study.measurement && (
          <Container>
            <section
              id="measurement"
              className="scroll-mt-24 rounded-[var(--radius)] p-5 sm:p-6"
              style={{ background: 'var(--surface-sunk)' }}
            >
              <Label as="h2">Measurement opportunity</Label>
              <div className="mt-3 space-y-3 text-[length:var(--text-small)]">
                {study.measurement.body.map((para) => (
                  <p key={para.slice(0, 40)} style={{ color: 'var(--text-muted)' }}>
                    {para}
                  </p>
                ))}
              </div>
            </section>
          </Container>
        )}

        <Block id="lessons" label="What I’d do differently" paragraphs={[study.lessons]} />
      </div>
    </article>
  );
}

/* -------------------------------------------------------------- Header --- */

function Header({
  study,
  index,
  backHref,
  backLabel,
}: {
  study: CaseStudy;
  index: string | null;
  backHref: string;
  backLabel: string;
}) {
  return (
    <header
      className="relative border-b pt-8 pb-10 sm:pt-10 sm:pb-12"
      style={{ borderColor: 'var(--rule)' }}
    >
      <span
        aria-hidden="true"
        className="blueprint blueprint-fade pointer-events-none absolute inset-0 opacity-70"
      />
      <Container className="relative">
        <Button href={backHref} variant="quiet">
          <span aria-hidden="true">←</span> {backLabel}
        </Button>

        {index && (
          <p
            className="mt-8 font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            <span aria-hidden="true">[ </span>
            Case study {index}
            <span aria-hidden="true"> ]</span>
          </p>
        )}

        <h1 className="mt-2 font-display text-[length:var(--text-page-title)] leading-[1.15] font-semibold text-balance sm:text-[length:var(--text-display)]">
          {study.title}
        </h1>

        <p className="mt-4 text-pretty" style={{ color: 'var(--text-muted)' }}>
          {study.summary}
        </p>

        <div className="mt-6">
          <Badge status={study.status} />
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {study.chips.map((chip) => (
            <li key={chip}>
              <Chip>{chip}</Chip>
            </li>
          ))}
        </ul>
      </Container>
    </header>
  );
}

/* ------------------------------------------------------------ Fragments --- */

function Label({ as: Tag = 'p', children }: { as?: 'p' | 'h2'; children: ReactNode }) {
  return (
    <Tag
      className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
      style={{ color: 'var(--text-muted)' }}
    >
      {children}
    </Tag>
  );
}

function Block({
  id,
  label,
  paragraphs,
}: {
  id?: string;
  label: string;
  paragraphs: string[];
}) {
  return (
    <Container>
      <section id={id} className="scroll-mt-24">
        <Label as="h2">{label}</Label>
        <div className="mt-3 space-y-3">
          {paragraphs.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>
      </section>
    </Container>
  );
}

function List({ id, label, items }: { id?: string; label: string; items: string[] }) {
  return (
    <Container>
      <section id={id} className="scroll-mt-24">
        <Label as="h2">{label}</Label>
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}

function Figure({ visual, label }: { visual: Visual; label?: string }) {
  return (
    <Container width="content">
      <figure>
        <BrowserFrame visual={visual} label={label} />
        <figcaption
          className="mt-3 max-w-[60ch] text-[length:var(--text-small)]"
          style={{ color: 'var(--text-muted)' }}
        >
          {visual.caption}
        </figcaption>
      </figure>
    </Container>
  );
}
