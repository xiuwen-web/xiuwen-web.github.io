# Portfolio — Xiu Wen

Source for my portfolio site: an operations-to-product career story told through
case studies, built as a static site.

**Live:** not yet deployed

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
npm run lint
```

## How it is organised

```
src/
  app/         routes — one page, plus /work/[slug] and two standalone pages
  components/  layout and UI primitives
  content/     all copy and data, typed
  types/       content contracts
public/        images and static assets
```

Content lives in `src/content/` as typed data rather than MDX or a CMS. The types in
`src/types/content.ts` are deliberately strict — fields like `decisions` and `lessons` are
required, so a case study that omits its reasoning fails the build instead of quietly
shipping.

## A note on what is not here

The planning documents behind this site — discovery notes, the content brief, the
evidence analysis — are kept out of the repository. They describe my employer's internal
systems and are not mine to publish. The site is built from `src/` alone.

Screenshots are either my own projects showing seeded data, or imagery my employer has
already published. No production system belonging to my employer is screenshotted here.
