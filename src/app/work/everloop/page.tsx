import type { Metadata } from 'next';
import { Shell } from '@/components/layout/Shell';
import { Container } from '@/components/layout/Section';
import { Badge, Chip } from '@/components/ui/Badge';
import { BrowserFrame } from '@/components/ui/BrowserFrame';
import { Button } from '@/components/ui/Button';
import { ReleaseFlow } from '@/components/ui/ReleaseFlow';
import { Diagram, FlowChart, SystemMap } from '@/components/ui/Diagram';
import {
  calendarFlow,
  contentDeliveryFlow,
  everloopMap,
  reportFlow,
  topicalQuizFlow,
  writewiseResponsibility,
} from '@/content/diagrams';
import { ecosystem } from '@/content/ecosystem';
import { workNumber } from '@/content/navigation';
import { STATUS_META, type EcosystemPart, type Visual } from '@/types/content';

export const metadata: Metadata = {
  title: `${ecosystem.title} — Case study`,
  description: `${ecosystem.summary} (${STATUS_META[ecosystem.status].label}.)`,
  alternates: { canonical: '/work/everloop/' },
  openGraph: {
    title: ecosystem.title,
    description: ecosystem.summary,
    url: '/work/everloop/',
    type: 'article',
  },
};

const TOC = [
  { id: 'overview', label: 'Overview' },
  ...ecosystem.areas.map((area) => ({ id: area.id, label: area.navLabel })),
];

export default function EverLoopPage() {
  return (
    <Shell active="everloop" toc={TOC} tocTitle={ecosystem.navLabel}>
      <article>
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
              Case study {workNumber('/work/everloop/')}
              <span aria-hidden="true"> ]</span>
            </p>

            <h1 className="mt-2 font-display text-[length:var(--text-page-title)] leading-[1.15] font-semibold text-balance sm:text-[length:var(--text-display)]">
              {ecosystem.title}
            </h1>

            <p className="mt-4 text-pretty" style={{ color: 'var(--text-muted)' }}>
              {ecosystem.summary}
            </p>

            <div className="mt-6">
              <Badge status={ecosystem.status} />
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {ecosystem.chips.map((chip) => (
                <li key={chip}>
                  <Chip>{chip}</Chip>
                </li>
              ))}
            </ul>
          </Container>
        </header>

        <div className="space-y-12 pb-16 sm:space-y-14">
          <Container>
            <section id="overview" className="scroll-mt-24">
              <Label>Overview</Label>
              <div className="mt-3 space-y-3">
                {ecosystem.overview.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </section>
          </Container>

          {ecosystem.areas.map((area) => (
            <section key={area.id} id={area.id} className="scroll-mt-24">
              <Container>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-[length:var(--text-h2)] leading-snug font-semibold">
                    {area.heading}
                  </h2>
                  {area.status && <Badge status={area.status} />}
                </div>
                {area.body && (
                  <div className="mt-4 space-y-3">
                    {area.body.map((para) => (
                      <p key={para.slice(0, 40)}>{para}</p>
                    ))}
                  </div>
                )}
                {area.link && (
                  <p className="mt-5">
                    <Button href={area.link.href} variant="quiet">
                      {area.link.label} <span aria-hidden="true">→</span>
                    </Button>
                  </p>
                )}
              </Container>

              {/* One diagram per question, per the plan — never one that tries
                  to explain the whole ecosystem. */}
              {area.id === 'platform' && (
                <>
                  <Diagram
                    heading="Who uses what"
                    intro="One platform, three groups, and the parts each of them touches."
                    caption="Every row here is the same underlying record seen from a different side. That is why one feature is five pieces of work — one per surface — rather than one."
                  >
                    <SystemMap root="EverLoop" branches={everloopMap} />
                  </Diagram>

                  <Container width="content" className="mt-8">
                    <ReleaseFlow />
                  </Container>
                </>
              )}

              {area.id === 'content-access' && (
                <Diagram
                  heading="How a course reaches a student"
                  intro="Set up once, released by rule."
                  caption="Nobody grants access. The tags decide who, and the class start date in CAdmin decides when — which is why a parent logging in early correctly sees an empty list."
                >
                  <FlowChart steps={contentDeliveryFlow} dense />
                </Diagram>
              )}

              {area.id === 'reporting' && (
                <>
                  <Diagram
                    heading="How a report reaches a parent"
                    intro="Five interfaces, one approval gate."
                    caption="The gate is the third step. The AI drafts and the teacher approves, so what a parent opens is a teacher's professional judgement rather than a model's output."
                  >
                    <FlowChart steps={reportFlow} dense />
                  </Diagram>

                  <Diagram
                    heading="How the calendar stays correct"
                    intro="The awkward cases are the whole problem."
                    caption="Merging on the server rather than on the device is what stops web, iOS and Android drifting apart — and lets a rule change ship without an app-store release."
                  >
                    <FlowChart steps={calendarFlow} dense />
                  </Diagram>
                </>
              )}

              {area.id === 'writewise' && (
                <Diagram
                  heading="Who is responsible for what"
                  intro="The AI never has the last word."
                  caption="Handwriting transcription is imperfect and AI marking is confident whether or not it is right. A teacher confirms the text against the original, and approves before a child sees anything."
                >
                  <FlowChart steps={writewiseResponsibility} dense />
                </Diagram>
              )}

              {area.visuals?.map((visual) => <Figure key={visual.src} visual={visual} />)}

              {/* Consolidated areas: one anchor in the rail, but each merged
                  section keeps its own heading and its own status badge. The
                  refinement asked to consolidate navigation, not content. */}
              {area.parts?.map((part) => (
                <div key={part.heading} className="mt-10">
                  <Container>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-[length:var(--text-h3)] leading-snug font-semibold">
                        {part.heading}
                      </h3>
                      {part.status && <Badge status={part.status} />}
                    </div>
                    <div className="mt-3 space-y-3">
                      {part.body.map((para) => (
                        <p key={para.slice(0, 40)}>{para}</p>
                      ))}
                    </div>
                    {part.link && (
                      <p className="mt-5">
                        <Button href={part.link.href} variant="quiet">
                          {part.link.label} <span aria-hidden="true">→</span>
                        </Button>
                      </p>
                    )}
                  </Container>

                  {part.diagram === 'topical-quiz' && (
                    <Diagram
                      heading="Quiz to video to e-Bucks"
                      intro="What happens between getting a question wrong and being paid for it."
                      caption="The reward is deliberately two steps past the quiz. Disabling skip and fast-forward is what stops the last three nodes collapsing into one — without it the gate is a button, not a condition."
                    >
                      <FlowChart steps={topicalQuizFlow} dense />
                    </Diagram>
                  )}

                  {part.rules && (
                    <Container width="content" className="mt-8">
                      <RulesPanel rules={part.rules} />
                    </Container>
                  )}

                  {part.visuals?.map((visual) => <Figure key={visual.src} visual={visual} />)}
                </div>
              ))}
            </section>
          ))}
        </div>
      </article>
    </Shell>
  );
}

/**
 * The rules a feature runs on, as a term list rather than a paragraph.
 *
 * A definition list, not a table: these are four independent conditions, not
 * rows sharing columns, and a table of two columns is a term list that scrolls
 * sideways on a phone.
 */
function RulesPanel({ rules }: { rules: NonNullable<EcosystemPart['rules']> }) {
  return (
    <dl
      className="grid gap-x-8 gap-y-5 rounded-[var(--radius)] p-5 sm:grid-cols-2 sm:p-6"
      style={{ background: 'var(--surface-sunk)' }}
    >
      {rules.map((rule) => (
        <div key={rule.term}>
          <dt
            className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            {rule.term}
          </dt>
          <dd className="mt-1.5 text-[length:var(--text-small)] leading-snug text-pretty">
            {rule.definition}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Figure({ visual }: { visual: Visual }) {
  return (
    <Container width="content" className="mt-6">
      <figure>
        <BrowserFrame visual={visual} label={ecosystem.navLabel} />
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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
      style={{ color: 'var(--text-muted)' }}
    >
      {children}
    </h2>
  );
}
