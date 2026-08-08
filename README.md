# Portfolio — Xiu Wen

Source for my portfolio site: an operations-to-product career story told through
case studies, built as a static site.

**Live:** <https://xiuwen-web.github.io>

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, static export)
- TypeScript, strict
- Tailwind CSS v4
- No CMS, no database, no server runtime — `next build` emits a folder of files

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
npm start       # serve the built out/ folder
npm run lint
```

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm run
lint` and `npm run build` and then publishes `out/` to GitHub Pages. Both are
gates: a lint error or a type error fails the job and nothing is published.

A second copy builds from the same repository at
`wen-portfolio.up.railway.app`. Its canonical tags point back at the Pages
origin in `src/content/site.ts`, so search engines are told which of the two is
authoritative.

## How it is organised

```
src/
  app/         routes — one page, plus /work/[slug] and two standalone pages
  components/  layout and UI primitives
  content/     all copy and data, typed
  types/       content contracts
public/        images and static assets
tools/         source for generated assets — see below
PRODUCT.md     durable product record: who the site is for, and what it may claim
```

Content lives in `src/content/` as typed data rather than MDX or a CMS. The types in
`src/types/content.ts` are deliberately strict — fields like `decisions` and `lessons` are
required, so a case study that omits its reasoning fails the build instead of quietly
shipping.

## Generated assets

`public/images/og-card.png` is the social share card — the surface most people
who receive a forwarded link actually see. It is generated from
`tools/og-card.html` rather than hand-edited, so a correction is a text edit
rather than an archaeology exercise:

```bash
npx serve . -l 4321
# open http://localhost:4321/tools/og-card.html at exactly 1200x630
# screenshot the viewport (not the full page) to public/images/og-card.png
```

It is a PNG rather than WebP on purpose: LinkedIn's crawler does not reliably
render WebP, and a share card that silently fails is worse than none.

## A note on what is not here

The planning documents behind this site — discovery notes, the content brief, the
evidence analysis — are kept out of the repository. They describe my employer's internal
systems and are not mine to publish. The site is built from `src/` alone.

Screenshots are either my own projects showing seeded data, or imagery my employer has
already published. No production system belonging to my employer is screenshotted here.
