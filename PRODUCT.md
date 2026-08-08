# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, arriving in sequence, on one page.

**First: Singapore recruiters and talent screeners.** Non-technical, skimming for
roughly thirty seconds, deciding only whether this is worth a call. They need job
title, scope, location and a checkable proof point before they scroll.

**Second: hiring managers for product and operations roles** — product leads, ops
directors, founders. They will read a case study end to end and judge whether the
thinking holds up.

The page must serve a skim and a deep read at the same time, recruiter first.

## Product Purpose

A personal portfolio for Chng Xiu Wen presenting an operations-to-product career
through case studies, so that a reader can establish what she actually did,
verify it independently, and pass her on.

**Success is a forward, not a click.** The visitor is frequently not the
decision-maker. The page succeeds when someone sends it to someone else — which
means it has to be shareable, quotable, and legible to a person who arrives with
no context and only the link.

## Positioning

An operator who specifies the software she herself has to use. She manages
frontline operations at an AGrader tuition centre *and* writes the requirements,
coordinates the developers and QA, and validates the releases for the internal
platforms the twenty-centre chain runs on. Neither half is a side project; the
requirements hold up because the person writing them does the job they describe.

A product manager cannot truthfully claim the operations half. An operations
manager cannot truthfully claim the delivery half.

## Operating Context

- Current role: Tuition Centre Manager, AGrader Learning Centre, since July 2020.
- Systems: CAdmin (internal admin platform) and EverLoop (student/teacher
  platform), plus four shipped app-store listings.
- Delivery team coordinated: three developers and one QA (QA joined February 2026).
- Work moves: problem observed in a centre → requirement written → developer
  build → QA → business validation → release → back into the centre.
- Reading context: a recruiter on a phone, mid-shortlist, with a dozen other tabs
  open; or a hiring manager who was sent the link by that recruiter.

## Capabilities and Constraints

- Static site. Next.js 16 App Router with static export, TypeScript strict,
  Tailwind CSS v4. No CMS, no database, no server runtime — `next build` emits a
  folder of files.
- Content lives in `src/content/` as typed data. `src/types/content.ts` is
  deliberately strict: a case study missing its `decisions` or `lessons` fails
  the build rather than shipping thin.
- Deployed to GitHub Pages at `https://xiuwen-web.github.io`, with a second
  auto-deployed copy at `wen-portfolio.up.railway.app` that canonicalises back.
  Hosting choice between the two is still open.
- A nicer custom domain is wanted but unfunded; nothing chosen.
- Planning documents describing the employer's internal systems are kept out of
  the repository.

**Binding constraints, confirmed:**

1. **No employer-confidential material.** No production system belonging to the
   employer is screenshotted. Screenshots are her own projects with seeded data,
   or imagery the employer has already published.
2. **The job search is discreet.** She is currently employed. The page must not
   read as a resignation notice a colleague could stumble onto. No "open to
   work" banner, no availability countdown, no language that dates the search.
3. **Every claim stays verifiable.** No impact, efficiency or time-saved claim
   appears anywhere (established in-repo as F26). No invented testimonials,
   metrics, endorsements, or client logos. Every figure is paired with the scope
   it covers.

Three claims are deliberately bounded and must stay bounded: she runs operations
at *one* outlet, not all twenty; she *coordinates* delivery rather than managing
a reporting line; she provides *business validation*, which is not sole authority
over a production deploy.

## Brand Commitments

- Name: Chng Xiu Wen (Singapore convention, surname first). Short form "Xiu Wen"
  in chrome; full form where identity must be unambiguous.
- **The Systems Blueprint palette is fixed**: navy ground, systems teal for
  validated states, amber for in-progress. Type trio is fixed too — Sora
  (display), Inter (sans), IBM Plex Mono (mono/labels).
- Voice: present tense, plain, factual. States what was decided and why. Says
  when something is still in progress. One reflective line per section at most —
  the page is a record, not an essay.

## Evidence on Hand

- Four live app-store listings (iOS and Android, AGrader student and teacher
  apps), with release dates — checkable in ten seconds by anyone.
- Six bodies of work with case-study pages, including WriteWise, an AI marking
  prototype she specified, built, deployed and handed over herself.
- A recreated requirement specimen, and one requirement traced from brief to a
  live published screen.
- A delivery log: twelve entries across five systems, sprints 3–14.
- Résumé PDF at `/documents/Xiu-Wen-Resume.pdf`; LinkedIn at
  `linkedin.com/in/chng-xiu-wen/`.
- Portrait photograph.

**Absent, and not to be fabricated:** testimonials, references, named clients,
before/after metrics, efficiency percentages, revenue figures, team-size claims
beyond three developers and one QA.

## Product Principles

1. **Verifiable beats impressive.** A figure a reader can check outranks a
   figure that sounds better. When there is no honest number, say so.
2. **The skim and the deep read are one page.** Anything that only serves the
   thirty-second reader must not obstruct the one who stays; anything that only
   serves the deep reader must not delay the skim.
3. **Built to be forwarded.** Assume the reader arrives from a pasted link with
   no context, and that they may paste it onward. The page must introduce
   itself, and it must be quotable in one line.
4. **Operations is the differentiator, not the apology.** The centre-manager half
   is what makes the product half credible. Never present it as the thing to
   look past.
5. **Discretion is a design constraint.** Confident about the work, silent about
   the search.

## Accessibility & Inclusion

Contrast is verified in both themes: ≥4.5:1 for body text and ≥3:1 for large
text and non-text marks, measured against all three grounds (`--bg`, `--surface`,
`--surface-sunk`) rather than assumed. Two supplied brand colours fail AA as text
and each has a text-safe `-ink` sibling; the supplied value is used only for
fills, borders, dots and diagram strokes. Light and dark themes are both
hand-written rather than inverted.
