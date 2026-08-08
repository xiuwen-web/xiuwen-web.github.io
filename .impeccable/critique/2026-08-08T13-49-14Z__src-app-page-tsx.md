---
target: landing page
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 3
timestamp: 2026-08-08T13-49-14Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence)

Target: `src/app/page.tsx` — landing page. Mode: **Persuade**. Inspected at 1440×900 and 390×844, light and dark, against `PRODUCT.md`.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | `TOC_SCRIPT` returns early on the homepage (no `[data-toc-link]` outside case-study rails), so "Overview" keeps `aria-current="page"` across all 10,834px. Verified in source. |
| 2 | Match System / Real World | 3 | Domain vocabulary is exact; undercut by three mutually contradictory job titles. |
| 3 | User Control and Freedom | 3 | Native `<details>`, Escape closes the drawer, theme persists. No back-to-top on a 12-viewport page. |
| 4 | Consistency and Standards | 3 | "Read the case study" vs "Read more" for the identical action; five disclosure summaries in five different voices. |
| 5 | Error Prevention | 3 | `hasResume` guard, build-time throw for a featured entry with no visual, `rel="noopener"` throughout. |
| 6 | Recognition Rather Than Recall | 3 | The rail's numbered index is strong; it vanishes entirely on mobile. |
| 7 | Flexibility and Efficiency | 2 | Scored, not n/a: the page deliberately builds two speeds (metrics + Live now for the skim, five disclosures for the deep read). The skim track collapses on mobile — proof is below the fold, no jump-to-section. |
| 8 | Aesthetic and Minimalist Design | 3 | Handsome type/label rhythm. Against it: 10,834px on mobile, and two featured images that are decoration presented as evidence. |
| 9 | Error Recovery | 2 | Five external URLs carry the entire credibility argument with no fallback; if a listing is pulled the page still says "Live now". Softest score in the table. |
| 10 | Help and Documentation | 3 | `<Disclosure hint>` documents what is behind each fold — correct pattern. Nothing defines CAdmin or EverLoop before the cards use them as known nouns. |
| **Total** | | **27/40** | **Acceptable — top of the band, one point below Good** |

## Design Specificity Verdict

**LLM assessment: grounded — genuinely, and more than most portfolios ever get. But the specificity lives in the middle third, and the two surfaces that decide the outcome are generic.**

Evidence it is this product: the `HandoffChain` converts "I coordinate delivery" into an inspectable division of labour, stamping `01 MINE` / `04 DEVELOPERS` / `05 QA` and tinting only the tiles that are hers — the design enforces PRODUCT.md's bounded claims visually. `Badge status="3 of 4 phases live"` is a status with its own denominator. `workNumber()` is positional over `workEntries` so the rail and the grid cannot drift. The `--accent` / `--accent-ink` split with measured ratios annotated per ground.

Evidence it is not: the first viewport is a template — portrait, name, role, headline, italic aphorism, support paragraph, two buttons. Swap `profile.ts` and this is a freelance brand strategist's page. The share card asserts a job title the page never claims. The flagship card's image is an illegible login form beside a flat orange block that fights the fixed palette.

**Deterministic scan: 0 findings, exit code 0, across `src/app/page.tsx` and `src/components`.** Assessment B validated this was not a silent no-op by planting known anti-patterns and confirming the detector fired. Caveat B raised itself: the detector's regex mode caught only 1 of 5 planted patterns in `.tsx`, so its coverage there is narrower than in HTML mode — a clean result is real but weaker evidence than a rendered-DOM scan.

**Visual overlays: not available.** The Chrome extension was not connected (3 attempts, same error). No `live-server.mjs` was started and no `detect.js` overlay exists; nothing was fabricated. Measured numbers came from Playwright against the dev server instead.

The detector's silence is itself the finding: it is clean on exactly the class of defect that matters most here, because the page's real problems are claims and hierarchy, not tokens.

## Overall Impression

This is a well-built page with a serious craft floor — clean build, clean lint, every contrast pair passing, focus states intact everywhere, reduced-motion respected in both CSS and JS, a share-preview path that is mechanically perfect. It is also a page that buries its best argument at 55% depth and puts an invented job title on the one asset designed to travel without her.

The single biggest opportunity: **the page was designed before "success is a forward" was known, and it shows.** Nothing here is built for a second reader who arrives from a pasted link.

## What's Working

**The `HandoffChain` — bounded claims rendered as an interface.** Seven nodes, ownership stamped on each, teal where the work is hers and white where it is not. It makes the honest limits of the claim visible rather than stated, which paradoxically makes the other five steps more believable than a bigger claim would be. Its caption — "Two of the seven belong to someone else, and I am still in both… On our board this runs to thirteen columns, and the acceptance one is named after me" — is the best sentence on the site.

**The numbering contract.** `workNumber()` is positional; the rail and the grid both read it; `navigation.ts` throws at build time if a featured entry has no visual. Recall cost is zero and the two systems physically cannot disagree. This is what "an operator who specifies software" looks like when rendered.

**The token system's `-ink` discipline.** Fills and text separated because the supplied brand colours fail AA as text; the dark theme hand-written with the rail dropping *below* the page ground so surfaces separate without shadow. Assessment B recomputed 27 pairs independently and every text pair passes — the CSS comments are accurate to the decimal.

## Priority Issues

### [P0] The share card asserts a job title the page never claims

**What.** `<title>`, `og:title`, `twitter:title`, the OG image alt, and JSON-LD `jobTitle` all read *"Project Manager, Product Operations and Business Systems."* Verified in `src/app/layout.tsx:45` and `:410`. The page's own record line says `Tuition Centre Manager, AGrader Learning Centre`; the rail says `Operations & Product Delivery`; the footer says `Operations and product delivery` in sentence case. Four phrasings, one of them a title she does not hold.

The rendered card (read directly from `public/images/og-card.png`) shows `XIU WEN / Project Manager / Product Operations and Business Systems`, and a strip reading `20 CENTRES · 2 PLATFORMS · 5 USER SURFACES` — every qualifier stripped. On the page, `snapshot.ts` pairs each figure with its scope precisely so "20" cannot be misread as remit. On the card it can be. There is no Singapore and no app-store listing anywhere on it.

**Why it matters.** The card is the only surface most forwarded-link recipients ever see. A recruiter forwards it as "she's a Project Manager"; the hiring manager opens the page and reads "Tuition Centre Manager" 500px in. On a page whose thesis is *verifiable beats impressive*, the first claim a recipient can check is the first one that fails — and once one inflated claim is caught, `3 + 1 developers` and `20 centres` get re-read with suspicion. This also breaches PRODUCT.md's own binding constraint that every claim stays verifiable.

**Fix.** One title everywhere: `Operations & Product Delivery` as positioning, `Tuition Centre Manager, AGrader Learning Centre` as the record. Make `<title>` / `og:title` / JSON-LD read `Chng Xiu Wen — Operations & Product Delivery, Singapore`. Search positioning belongs in `DESCRIPTION`, which is not a claim of title. Redraw the card with the full name, `Operations & Product Delivery · Singapore`, and a strip restored to `4 APP-STORE LISTINGS · 2 INTERNAL PLATFORMS · 20 CENTRES SUPPORTED` — "supported" restores the bound.

**Suggested command:** `/impeccable clarify`

### [P0] The 30-second recruiter gets 2 of their 4 facts, and location is 10,127px away

**What.** PRODUCT.md names title, scope, location and one checkable proof as the skim requirement. Measured at 390×844: title is present but is the smallest, faintest type in the hero (12px mono, `--text-muted`); scope is the phrase "multiple centres" with the figure 20 at y=1,036; **location appears nowhere until `#contact` at y=10,127**; the "Live now" proof list begins at y=832 in an 844px viewport — below the fold once browser chrome is counted. On desktop the rail overflows its own sticky box (scrollHeight 881 vs clientHeight 832 at 900px), so `Singapore` sits below the rail's scroll edge too.

The code comment at `page.tsx:164` — *"The verifiable anchor, above the fold — the fastest proof available"* — is false on the device PRODUCT.md names as primary.

**Why it matters.** For a Singapore screener, location is the first filter and the one fact nothing else implies. Thirty seconds currently ends with the reader holding a headline, an aphorism, and a job title reading "tuition centre" — which is the fact most likely to get her filtered out, delivered most clearly, with none of the evidence that would change the verdict.

**Fix.** Make the first viewport a fact block, not a mood block. Keep portrait, full name, headline. Replace the italic aphorism with a quotable positioning line. Promote the record line to a first-class credential row with location joined: `Tuition Centre Manager · AGrader Learning Centre · Singapore · since July 2020`. Pull two app-store links (not four) up beside the CTAs as an inline proof pair. Cutting `heroSupport` to one clause buys the ~150px.

**Suggested command:** `/impeccable layout`

### [P1] No quotable sentence about her — the forward has nothing to paste

**What.** The page's most quotable line is `heroSubline`: *"The best systems are built close to the people who use them."* It is an aphorism about systems in general and could sit above any consultancy's fold. It occupies prime real estate at 16px italic teal and asserts nothing checkable about her. Meanwhile the sentence that *is* the forward — "I run a tuition centre, and I write the requirements for the platform twenty of them run on" — does not exist anywhere on the page.

**Why it matters.** Success is defined as a forward. Someone forwarding this link has to write the framing sentence themselves, from a page that never supplied one. Most will not, and the ones who do will paraphrase from the metadata — which, per P0, is wrong.

**Fix.** Write the Slack-paste sentence first, then put it in the position `heroSubline` currently occupies. It must name both halves (operations *and* requirements) and carry the one figure that bounds the scope.

**Suggested command:** `/impeccable clarify`

### [P1] The two featured cards lead with an illegible screenshot and a mascot — and the one bespoke visual is unreachable

**What.** Card 01 renders `/images/cadmin-login.webp` — a login form too small to read beside a flat orange field that clashes with the fixed navy/teal palette. Card 02 renders a cartoon owl logo. Neither shows a system, a decision, a rollout or a requirement. Simultaneously `navigation.ts:42` declares `diagram: 'rollout'` on the CAdmin entry, and `FeaturedCard.tsx:24-25` reads `entry.visual ? <Image/> : entry.diagram === 'rollout' && <PhaseStrip/>` — verified: `PhaseStrip` can never render, because that entry has both. The build guard catches the opposite failure (featured with no visual) but not declared-and-ignored.

**Why it matters.** The section intro tells the reader these two cards "carry most of what I do." They are the first images after the fold and the first evidence a forwarded reader meets. A login screen and a mascot are the two least product-specific images available.

**Fix.** Delete `visual` from the `cadmin-migration` entry so `PhaseStrip` renders — a four-phase strip with three filled is a diagram of the badge sitting directly under it, and it is on-palette by construction. For EverLoop, use the `.sysmap` component that already exists in `globals.css` and is unused on this page.

**Suggested command:** `/impeccable polish`

### [P1] No position feedback across 10,834px

**What.** Verified: `TOC_SCRIPT` (`layout.tsx:181`) queries `[data-toc-link]`, which only `Sidebar.tsx:100` emits, and only when a `toc` prop is passed — case-study pages. On the homepage `links.length === 0` and the script returns immediately. So "Overview" keeps its teal bar and `aria-current="page"` for the entire page. No back-to-top, no progress rule; on mobile no map at all. `#log`, `#skills` and `#journey` carry `scroll-mt-24` ids that nothing links to.

**Why it matters.** PRODUCT principle 2 requires the skim and the deep read to coexist. The deep reader has no orientation and the skimmer has no shortcut past `#work`'s 3,031px to the `HandoffChain` — the section that actually converts them.

**Fix.** Emit `data-toc-link` on the four `PRIMARY_NAV` rail items so the existing scroll-spy adopts the homepage; it already handles the "final section never reaches the line" case. On mobile, make the sticky header's centre a live section label. Add a back-to-top anchor to the footer.

**Suggested command:** `/impeccable adapt`

### [P2] 22 interactive elements are under 44px — including the four proof links

**What.** Both assessments measured this independently and agree. The four "Live now" app-store links are **23.1px tall with a 40px vertical pitch** (`page.tsx:179-194`). Also under: all six work-card title links (22.9–25.1px), all six "Read the case study" links (23.1px), the Contact email link (23.1px) and LinkedIn link (20.6px — smallest on the page), and the `Button` component itself at 40px (`Button.tsx:13`, `h-10`). Passing: `ThemeToggle` at exactly 44×44, the mobile Menu button at 85.8×44, and all five `<summary>` elements at 75–148px.

**Why it matters.** PRODUCT.md's reading context is a recruiter on a phone. The one interaction the entire credibility argument depends on is below the 44px minimum and mis-taps into its neighbour.

**Fix.** Give each proof link `min-h-11 py-2` and make `label + note` one block-level target instead of an `inline-flex flex-wrap` baseline run. Bump `Button` from `h-10` to `h-11`.

**Suggested command:** `/impeccable adapt`

## Persona Red Flags

**Jordan (confused first-timer):** The `h1` names no job, so Jordan scrolls for one and finds three — and resolves the ambiguity the way anyone would, by trusting the smallest, most specific one: "manages a tuition centre." `View selected work` looks like navigation but is a same-page anchor moving 776px with smooth scroll; Jordan clicks and nothing appears to happen. The `LIVE NOW` block never says where the links go, and two entries are byte-identical (`AGrader Teacher` twice) — Jordan reads a duplicate as a bug, not as "same app, two stores." `CAdmin` and `EverLoop` are used as known nouns in the `#work` intro.

**Casey (distracted mobile, one-handed, 3G):** The fold ends at `View Resume`; every proof is below it. Four 23px targets with a 12px gutter under one thumb. `View Resume` opens `target="_blank"` into an iOS PDF viewer with no route back to the portfolio. Refresh mid-flow loses all `<details>` state, so an interrupted Casey returns to a collapsed page and must re-find a summary line three viewports deep. No back-to-top from y=10,127. **3G is handled well** — 7 WebP images totalling ~203KB, all lazy below the portrait, fonts self-hosted with `display: swap`, explicit width/height everywhere so CLS risk is nil.

**Riley (stress tester):** Checks the claim the code makes about itself at `page.tsx:164` and finds "above the fold" is false at 390×844. Cross-checks `<title>` against the page, finds an invented title repeated in JSON-LD — beside a comment reasoning that two titles in one document would be "the kind of thing a structured-data check flags," which made the metadata self-consistent while leaving it inconsistent with the visible page. Two identical accessible link names in the proof list. Opening all five disclosures pushes past ~15,000px with no collapse-all. The rail overflows its own sticky box at 1440×900. `diagram: 'rollout'` declared and unreachable. Dead anchors `#log`, `#skills`, `#journey`. **JS disabled: clean** — theme attribute server-rendered, `<details>` still open, nothing hidden behind `.reveal-ready`. **320px: clean**, no horizontal scroll.

**The Singapore talent screener (project-specific, 30 seconds, phone, mid-shortlist):** 0–4s portrait and name, good. 4–10s a claim, not a role, then an aphorism. 10–16s scope, partial — "multiple centres", no figure. 16–22s title, present but set in the smallest faintest type in the hero, and it is the wrong filter word for the roles she wants. 22–30s two buttons, fold ends. **Verdict: 2 of 4 facts delivered, and the one delivered clearly is the one most likely to get her filtered out.**

## Minor Observations

- `snapshot.ts`'s `3 + 1` renders in 24px mono with default word spacing; the `+` floats and it reads as two numbers before resolving. Set `3+1`.
- The footer's `Operations and product delivery, Singapore` is a fourth phrasing of the role, in sentence case where every other instance is title case.
- Disclosure summaries have no consistent voice: two labels, one noun phrase, one imperative, one fragment.
- The dark theme's rail/page seam is a ~2% luminance step (`--rail-bg: #0a1219` on `--bg: #101c25`); the rail stops reading as chrome. A 1px `--rail-rule` border restores it.
- `--rule` measures 1.19:1 light and 1.47:1 dark. WCAG 1.4.11 exempts decorative dividers, so this is only a real failure where a rule is the sole carrier of meaning — the `Disclosure` border is the case worth checking.
- `layout.tsx:93-95` states the site "has no Client Components and ships no interactive React." `Portrait.tsx:1` is `'use client'` with `useState`. The comment is stale.
- The `WHAT I'D MEASURE` panel is the most intellectually honest thing on the page, and it is at ~50% of `#about`, which is itself at 58% of the page. Almost nobody reaches it.
- `npm run build` and `npm run lint` are both clean; 12/12 static pages, no warnings.

## Questions to Consider

1. **If the only thing that ever travels is the OG card, is the page or the card the product?** The card is currently designed as a summary of the page. What if it were the artefact — app-store listings and location on it — and the page its footnotes?
2. **What is the one sentence someone pastes above the link in Slack?** Write it first, then check whether it exists on the page. It does not.
3. **The `HandoffChain` is the best thing here and it is at 55% depth. What breaks if it becomes the hero?** One graphic answers title, scope and the bounded-claim question at once, and it is unfakeable.
4. **Why six work cards when the intro says two of them carry most of it?** Two cards plus a "four more" expander shortens the skim by ~1,200px and lifts the `HandoffChain` above the mobile 4,000px line.
5. **"Tuition Centre Manager" is treated as a liability to be footnoted. What if it is the headline?** PRODUCT principle 4 says operations is the differentiator, not the apology — but the composition sets the operations title in the smallest type available while the product claim gets 52px display. The design contradicts the principle it was built on.
