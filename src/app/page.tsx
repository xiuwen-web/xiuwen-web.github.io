import { Container, Section } from '@/components/layout/Section';
import { Shell } from '@/components/layout/Shell';
import { FeaturedCard, WorkRow } from '@/components/ui/FeaturedCard';
import { HandoffChain, HandoffSummary } from '@/components/ui/Diagram';
import { TraceChain } from '@/components/ui/TraceChain';
import { workEntries, workNumber } from '@/content/navigation';
import { principles, profile, socialLinks } from '@/content/profile';
import {
  measureBody,
  measureHeading,
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
import {
  journey,
  journeyAlongside,
  journeyClosing,
  journeySubtitle,
  skillGroups,
  technicalExposure,
  toolGroups,
} from '@/content/skills';
import { appLinks, snapshot, snapshotClosing } from '@/content/snapshot';
import { SITE_URL } from '@/content/site';
import { workLog, workLogHeading, workLogIntro } from '@/content/workLog';
import { WorkLog } from '@/components/ui/WorkLog';
import { Button, DocumentIcon } from '@/components/ui/Button';
import { Disclosure } from '@/components/ui/Disclosure';
import { Portrait } from '@/components/ui/Portrait';
import { hasResume, RESUME_ARIA, RESUME_LABEL } from '@/content/resume';
import { MetricRow } from '@/components/ui/Metric';

/**
 * Six sections, fixed by the refinement document (§1):
 *
 *   Hero → Proof metrics → Selected work → How I work → About → Contact
 *
 * Skills, Journey and the delivery log used to be three more top-level
 * sections. None of them was linked from anywhere — not the rail, not the
 * mobile nav, not another page — so each was a section heading, a rule and
 * three sets of vertical padding spent on content a reader arrived at only by
 * scrolling past it. They are all still here, inside the section each belongs
 * to: the log under the work it is evidence for, skills and journey under
 * About, which is the section that is about who I am.
 */
export default function Home() {
  return (
    <Shell active="overview">
      <Hero />
      <Snapshot />
      <Work />
      <Process />
      <About />
      <Principles />
      <Contact />
    </Shell>
  );
}

/* ---------------------------------------------------------------- Hero --- */

function Hero() {
  return (
    <section id="top" className="pt-10 pb-14 sm:pt-24 sm:pb-20">
      {/* The one place a wider measure earns itself: at 640px the headline
          breaks after "I run tuition", mid-phrase. */}
      <Container width="content">
        {/*
          Identity block: portrait, name, positioning — then the headline.
          The portrait and the two lines beside it sit on one row so the whole
          block is ~104px tall and reads as a masthead rather than as a profile
          card. Anything taller starts competing with the headline under it.
        */}
        <div className="mb-6 flex items-center gap-4 sm:gap-5 sm:mb-8">
          <Portrait />
          <div className="min-w-0">
            {/* The full name, here and nowhere else on screen. This is the
                introduction — the one moment a reader is working out who they
                are looking at, and the only place on the page they can match
                what they see against the résumé and the LinkedIn profile. The
                rail and the footer keep the short form; repeating a full name
                in the chrome makes it letterhead. */}
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

        {/*
          Two columns from lg, one below it.

          The right column is the reason: the handoff chain was the best thing
          on this page and it was halfway down it, behind the work grid, where
          a reader deciding in thirty seconds never got to it. The desktop hero
          also had most of its right half empty — the copy runs out well short
          of the container — so the strongest evidence on the site and the
          largest piece of unused space were sitting on the same screen.

          It is desktop-only on purpose. On a phone the same 250px would push
          the app-store links back under the fold, which is the thing the last
          revision was for, and the full chain is a scroll away in How I Work
          on every breakpoint.
        */}
        <div className="lg:flex lg:items-start lg:gap-12">
          <div className="min-w-0 lg:flex-1">
        {/*
          Capped at --text-display rather than the old lg:3.25rem. The headline
          is two sentences now instead of one, and the second is long; at 52px
          it ran to four display lines and pushed the proof back under the fold
          the rewrite was meant to lift it above. Two sizes, not three.
        */}
        <h1 className="font-display text-[1.75rem] leading-[1.13] font-semibold text-balance sm:text-[length:var(--text-display)] sm:leading-[1.15]">
          {profile.heroHeadline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-4 max-w-[35rem] text-pretty sm:mt-5" style={{ color: 'var(--text-muted)' }}>
          {profile.heroSupport}
        </p>

        {/*
          The employment record, promoted 2026-08-08 from a 12px muted footnote
          to a first-class credential row.

          It was previously the smallest, faintest text in the hero — which
          meant the most trust-generating element on the page was styled as an
          apology. It is the opposite: the operations title is the thing that
          makes the delivery half credible, because the requirements hold up
          precisely when the person writing them does the job they describe.

          Location joined the row for a plainer reason. It is the first filter
          on a Singapore search and the one fact nothing above it implies, and
          it previously appeared nowhere until the Contact section ten
          thousand pixels down.

          Still mono, because it is a factual run to be scanned rather than
          read — but the title now carries full text contrast and only the
          scaffolding around it recedes.
        */}
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
          {/*
            New tab rather than the download attribute: a PDF that opens is a
            PDF a recruiter reads now, and download behaviour across browsers
            and mobile is inconsistent enough that it is not worth forcing.
          */}
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

          {/* Fixed width: the tiles are a shape to be read at a glance, and a
              column that stretched with the viewport would turn them into
              seven wide bars with the ownership tag stranded far right. */}
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
            {/* The accessible route to the same content in full — the summary
                above is aria-hidden. Also the honest caption: the two tiles
                that are not mine are the point of showing it. */}
            <a
              href="#process"
              className="mt-3 inline-flex min-h-11 items-center text-[length:var(--text-label)] leading-snug underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: 'var(--accent-ink)' }}
            >
              Two of the seven are someone else&rsquo;s — see how I work
            </a>
          </div>
        </div>

        {/*
          The verifiable anchor. The comment that used to sit here claimed it
          was "above the fold — the fastest proof available", and on a 390x844
          phone it began at y=832, which is to say below it. The claim is now
          true rather than aspirational: the aphorism above is gone, the
          support line is one clause, and these four sit two-up instead of
          stacked, which is ~30px shorter than the single column was.

          Two columns at every breakpoint, not just from `sm`. Stacking the
          note under the label instead of running it alongside is what buys
          the room, and it also separates the two AGrader Teacher listings —
          identical but for their store — into visibly different tiles.
        */}
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
                {/* Block-level and min-h-11: these were 23px tall with a 12px
                    gutter, on the one interaction the whole credibility
                    argument depends on, for a reader holding a phone. */}
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

        {/* The sentence the four figures add up to. Rules off the strip so it
            reads as the conclusion rather than as a fifth, broken statistic. */}
        <div
          className="mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          style={{ borderColor: 'var(--rule)' }}
        >
          <p
            className="max-w-[45rem] text-[length:var(--text-small)] text-pretty"
            style={{ color: 'var(--text-muted)' }}
          >
            {snapshotClosing}
          </p>

          {/*
            Attribution, because this band is the part of the page most likely
            to leave it.

            People do not only forward links, they screenshot — and this strip
            is the most screenshot-shaped thing here: four figures, one line,
            self-contained. Cropped out of the page it was four orphan numbers
            belonging to nobody. Now it says whose they are and where the rest
            is, in the same mono the other factual runs use, quiet enough that
            a reader on the page reads past it.

            Same pair the share card ends on, for the same reason.
          */}
          <p
            className="shrink-0 font-mono text-[length:var(--text-label)] tracking-tight"
            style={{ color: 'var(--text-muted)' }}
          >
            {profile.fullName}
            <span aria-hidden="true"> · </span>
            {SITE_URL.replace(/^https?:\/\//, '')}
          </p>
        </div>
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
      intro="Six bodies of work. CAdmin Migration and the EverLoop Ecosystem carry most of what I do. Each page says what I decided and why, and anything still in progress says so."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {featured.map((entry) => (
          <FeaturedCard key={entry.href} entry={entry} number={workNumber(entry.href)} />
        ))}
      </div>

      {/*
        The other four, as a divided list rather than as four more cards. The
        intro above says CAdmin and EverLoop carry most of the work; until now
        the layout contradicted it by giving all six the same rectangle. Two
        raised cards over a quiet list says the same thing the sentence does.
      */}
      <ul className="mt-10 border-b" style={{ borderColor: 'var(--rule)' }}>
        {rest.map((entry) => (
          <WorkRow key={entry.href} entry={entry} number={workNumber(entry.href)} />
        ))}
      </ul>

      {/*
        The log, behind the five cards it sits behind in reality. It folds:
        the refinement names "detailed delivery logs" as a thing to move into
        an expandable section. The intro stays visible because it carries the
        figures — 25 months, sprints 3 to 14 — and the twelve entries are the
        part nobody reads straight through.
      */}
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
    </Section>
  );
}

/* ------------------------------------------------------------- Process --- */

function Process() {
  return (
    <Section id="process" eyebrow="Process" title="How I work" intro={processIntro} width="content">
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

      <p className="mt-6 max-w-[60ch] text-[length:var(--text-small)]" style={{ color: 'var(--text-muted)' }}>
        {handoffCaption}
      </p>

      {/* The point of the seven steps, stated once, after them. */}
      <p
        className="mt-8 max-w-[45rem] border-l-2 pl-4 text-[length:var(--text-body)] text-pretty"
        style={{ borderColor: 'var(--accent)' }}
      >
        {processPrinciple}
      </p>

      {/*
        Three disclosures, in the order a sceptical reader would want them:
        how I write a requirement, one I wrote, and one followed to a live
        screen. All three are evidence rather than argument, and all three are
        long — the brief asks for a compact "How I Work", so they fold.
        Nothing was cut; a reader who wants the proof opens it, and one who
        does not reaches About several screens sooner.
      */}
      <Disclosure
        className="mt-12"
        summary="See how I write a requirement"
        hint="How a requirement gets written before anyone builds from it."
      >
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
      </Disclosure>

      <Disclosure
        className="mt-4"
        summary="See a requirement I wrote"
        hint="One recreated in full — current behaviour, proposed behaviour, a worked example, business rules and acceptance criteria."
      >
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
      </Disclosure>

      {/* The chain. The specimen above shows what a requirement looks like;
          this follows one of them to a screen that is on this site. */}
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
    </Section>
  );
}

/* --------------------------------------------------------------- About --- */

function About() {
  return (
    <Section id="about" eyebrow="About" title="About">
      {/*
        Restructured 2026-08-08 (PORTFOLIO_ABOUT_PAGE_REVISION.md).

        The order is the argument: what the job is, then what it actually
        consists of, then how it came about, then why the operations half is
        the differentiator rather than the part to look past. Six paragraphs
        used to stand between the reader and the 40/40/20 bar, which is the one
        element that answers "what do you do" without being read.

        Everything here was already on the page. Nothing outside About moved.
      */}
      <p className="font-display text-[1.375rem] leading-snug font-semibold text-balance sm:text-[1.5rem]">
        {profile.aboutLede}
      </p>

      <p className="mt-5 text-pretty" style={{ color: 'var(--text-muted)' }}>
        {profile.aboutSupport}
      </p>

      {/*
        Time allocation — a factual quantity, not a self-rated skill bar.
        Lifted from below the narrative to directly under the opening, because
        it is the fastest answer on the page to what the role is.
      */}
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
              style={{
                width: `${part.value}%`,
                background: 'var(--accent)',
                opacity: 1 - i * 0.3,
              }}
            />
          ))}
        </div>
        {/*
          Stacks on a phone rather than wrapping mid-item. Three labels on one
          flex-wrap row broke as "40% Project &" / "product delivery", which
          reads as four entries rather than three.
        */}
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

      {/*
        The narrative, as named sections rather than as an unbroken run of
        paragraphs. A reader who wants only the differentiator can find it by
        its heading instead of reading to the fourth paragraph to discover it.

        The timeline follows the section it belongs to rather than sitting at
        the bottom of About: "How I got here" states the arc in three sentences
        and the disclosure has the dates for anyone who wants them.
      */}
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

      {/*
        Measurement. Kept in the sunk callout it already had — the brief asks
        for it to stay inside the existing treatment and not to outweigh the
        narrative — and placed after the narrative rather than inside it,
        because it is a standard rather than a story.
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

      {/*
        The close of the narrative. Given room and size rather than a box, a
        rule or a quotation mark — the same treatment the Principles section
        uses for its closing line, so the two read as the same kind of
        statement in the same voice.
      */}
      <div className="mt-14 border-t pt-8" style={{ borderColor: 'var(--rule)' }}>
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

      <Skills />
    </Section>
  );
}

/* -------------------------------------------------------------- Skills --- */

function Skills() {
  return (
    <div id="skills" className="mt-14 scroll-mt-24">
      {/*
        "Capabilities", not "Skills and tools". The tools moved out into their
        own block below: a list that ran Monday.com beside TypeScript beside
        Google Workspace asked the reader to guess how deep each one went, and
        on this page that guess should never be necessary.

        Two columns from `sm`, one below it. The section is at prose width, so
        each column is roughly 280px and the dot-joined runs wrap two or three
        times — short enough to scan, and the same treatment the groups
        already had.
      */}
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

      {/* Tools, grouped by purpose and set quieter than the capabilities
          above — what someone can do matters more than what they have had
          an account for. */}
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

      {/* Stated apart from the tools, and qualified. See skills.ts for why. */}
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

/**
 * Folded as well as moved (brief §2). The route into this work is a fair
 * question and the timeline answers it, but it is the third paragraph of
 * About told again as dates — the reader who wants it will open it.
 *
 * Two groups, each with its own connector run. The break between them is the
 * point: full-time operations started in July 2020, the technology work in
 * 2024, and a single unbroken line invites a reader to collapse the two.
 */
function Journey() {
  // Sits under the "How I got here" heading now, so it is labelled for what is
  // inside it rather than repeating the heading directly above it.
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

        {/* Spans both phases, so it sits across them rather than inside
            either — the overlap is the whole point of including it. */}
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

/**
 * Placed between About and Contact, and deliberately not next to the six
 * method rules in Process. Those are techniques for writing a requirement;
 * these are the beliefs underneath them, and a reader who meets two lists of
 * rules in a row reads neither.
 *
 * The fourth has no body. It is what the other three arrive at, so it is set
 * as a closing line rather than as a fourth item with something to explain.
 */
function Principles() {
  const items = principles.filter((p) => p.body);
  const conclusion = principles.find((p) => !p.body);

  return (
    <Section id="principles" eyebrow="Principles" title="Principles I work by" width="content">
      <ol className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
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
    </Section>
  );
}

/* ------------------------------------------------------------- Contact --- */

/**
 * The last section anyone reads, so it states a direction rather than offering
 * a pleasantry, then puts the four things a recruiter actually needs in one
 * scannable list: how to write, where to check, what to read, and where I am.
 *
 * Location earns its row. It is the first filter on most searches and the one
 * fact a reader cannot infer from anything above it — and it is the only entry
 * here that is not a link, which is why the labels carry the structure rather
 * than the links doing it.
 */
function Contact() {
  const linkedin = socialLinks.find((l) => l.label === 'LinkedIn');

  return (
    <Section id="contact" eyebrow="Contact" title="Contact">
      {/*
        The closing statement, at size.

        Peak-end says a reader keeps the peak and the end. The peak moved into
        the hero; this is the end, and it was a paragraph of body copy above a
        definition list — the page finished on the register of a business card
        after several thousand words of argument. The sentence was always the
        right one. It just was not being said out loud.

        Set in display type like the Principles close, so the two statements
        the page ends on read as the same voice rather than as a heading and
        an afterthought.
      */}
      <p className="max-w-[38rem] font-display text-[1.375rem] leading-snug text-balance sm:text-[1.625rem]">
        {profile.contactLede}
      </p>

      {/* The four facts, demoted beneath it. They are reference, not argument:
          a reader who has decided needs them findable, not persuasive. */}
      <dl className="mt-10 space-y-5 border-t pt-8" style={{ borderColor: 'var(--rule)' }}>
        <ContactRow label="Email">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-11 items-center font-display text-[1.125rem] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70 sm:text-[1.25rem]"
            style={{ color: 'var(--accent-ink)' }}
          >
            {profile.email}
          </a>
        </ContactRow>

        {linkedin && (
          <ContactRow label="LinkedIn">
            <a
              href={linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: 'var(--accent-ink)' }}
            >
              {/* Derived, not typed. This was a hardcoded string and went stale
                  the moment the custom URL changed on 2026-08-05 — the label
                  still advertised a slug LinkedIn had already released. */}
              {linkedin.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
            </a>
          </ContactRow>
        )}

        {/* Second and last placement. The résumé belongs here and in the mobile
            drawer, and nowhere else — a link repeated on every section stops
            reading as an offer and starts reading as a plea. */}
        {hasResume && (
          <ContactRow label="Resume">
            <Button
              href={profile.resumePath}
              variant="secondary"
              external
              ariaLabel={RESUME_ARIA}
            >
              <DocumentIcon />
              {RESUME_LABEL}
            </Button>
          </ContactRow>
        )}

        <ContactRow label="Location">{profile.location}</ContactRow>
      </dl>
    </Section>
  );
}

/**
 * Label left, value right, on one line once there is room for it; stacked on a
 * phone. The label column is fixed so the four values line up — a ragged left
 * edge is what makes a list like this read as links scattered on a page rather
 * than as a record.
 */
function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
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
