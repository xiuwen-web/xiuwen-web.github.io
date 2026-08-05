import type { Metadata } from 'next';
import { IBM_Plex_Mono, Inter, Sora } from 'next/font/google';
import './globals.css';
import { profile, socialLinks } from '@/content/profile';
import { SITE_URL } from '@/content/site';

// Self-hosted and subset by next/font — no CDN request, no layout shift.
const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });

// Sora replaces Fraunces. Fraunces is a warm editorial serif and read as
// "considered writing"; Sora is geometric and even-width and reads as
// "specification". Weights are capped at three — the type scale has no use
// for more.
const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
});

/*
 * Every canonical, Open Graph and JSON-LD URL on the site is built from this.
 * It pointed at wen-portfolio.vercel.app until 2026-08-04 — which is not this
 * site and never was, so every canonical tag was naming a stranger's page.
 * It moved to content/site.ts on 2026-08-05 when robots.txt and the sitemap
 * needed the same value.
 */
/*
 * Title and description carry the search-result positioning, so they name the
 * role a recruiter searches for rather than the internal job title.
 *
 * The full name went in on 2026-08-05. It costs five characters against the
 * ~60 Google renders, so "and Business Systems" now falls past the fold in a
 * search result — worth it, because a recruiter handed "Chng Xiu Wen" and
 * told to look her up previously had no way to arrive here at all. A title
 * that ranks for the wrong name is worse than one that truncates.
 */
const TITLE = `${profile.fullName} — Project Manager, Product Operations and Business Systems`;

const DESCRIPTION =
  'Project manager bridging frontline operations and software delivery across internal platforms, mobile apps and multi-site workflows.';

/*
 * PNG, not the WebP everything else on the site uses. LinkedIn's crawler does
 * not reliably render WebP, and a share card that silently fails is worse than
 * none — so the one asset whose entire job is being fetched by someone else's
 * crawler is in the format every crawler reads.
 *
 * Width and height are declared because LinkedIn and Slack size the preview
 * from them rather than waiting to measure the file.
 */
const OG_IMAGE = {
  url: '/images/og-card.png',
  width: 1200,
  height: 630,
  alt: 'Xiu Wen — Project Manager, Product Operations and Business Systems. I turn operational problems into systems that work.',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: `${profile.name} — Portfolio`,
    locale: 'en_SG',
    type: 'profile',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

/**
 * The site's entire client-side behaviour, in vanilla JS.
 *
 * It must be inline and blocking, or the page paints in the wrong theme first.
 * Since that script has to exist anyway, the toggle handler lives here too —
 * which is why the site has no Client Components and ships no interactive
 * React.
 *
 * The deep-link opener that used to live here is gone. It existed to force a
 * <details> case study open from a #hash, and fought React hydration to do it.
 * Phase 3 gave every case study its own URL, so there is nothing left to open.
 */
const INLINE_SCRIPT = `
(function () {
  var d = document.documentElement;
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    d.dataset.theme = stored || (prefersDark ? 'dark' : 'light');
  } catch (e) {
    d.dataset.theme = 'light';
  }

  function label(list) {
    var text = d.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    for (var i = 0; i < list.length; i++) list[i].setAttribute('aria-label', text);
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Two toggles exist — one in the rail, one in the mobile header. Both work,
    // and both relabel, so whichever is on screen is always correct.
    var all = document.querySelectorAll('[data-theme-toggle]');
    if (!all.length) return;
    label(all);
    for (var i = 0; i < all.length; i++) {
      all[i].addEventListener('click', function () {
        d.dataset.theme = d.dataset.theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('theme', d.dataset.theme); } catch (e) {}
        label(all);
      });
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    // Mobile drawer. Closed in the markup, so a dead script leaves a page that
    // is still complete rather than one trapped behind a menu.
    var btn = document.getElementById('drawer-toggle');
    var drawer = document.getElementById('mobile-drawer');
    if (!btn || !drawer) return;

    function setOpen(open) {
      drawer.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    }

    btn.addEventListener('click', function () {
      setOpen(drawer.hidden);
    });

    // Any navigation closes it, including same-page anchors, which do not
    // unload the document and would otherwise leave the drawer covering the
    // section just jumped to.
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !drawer.hidden) {
        setOpen(false);
        btn.focus();
      }
    });

    // A resize past the breakpoint hides the drawer by CSS; without this the
    // body would stay locked at a width where the menu no longer exists.
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && !drawer.hidden) setOpen(false);
    });
  });
})();
`;

/**
 * Scroll-spy for the case-study table of contents in the rail.
 *
 * A passive scroll listener throttled to one frame. It does no work unless the
 * page has a table of contents, and the loop it runs is over six or seven
 * elements.
 */
const TOC_SCRIPT = `
(function () {
  var links = document.querySelectorAll('[data-toc-link]');
  if (!links.length) return;

  var byId = {};
  var targets = [];
  for (var i = 0; i < links.length; i++) {
    var id = links[i].getAttribute('data-toc-link');
    var el = document.getElementById(id);
    if (!el) continue;
    byId[id] = links[i];
    targets.push(el);
  }
  if (!targets.length) return;

  var current = null;

  function mark(id) {
    if (id === current) return;
    for (var key in byId) {
      var link = byId[key];
      var on = key === id;
      link.style.color = on ? 'var(--rail-text)' : 'var(--rail-muted)';
      link.style.fontWeight = on ? '500' : '400';
      if (on) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
      var bar = link.querySelector('[data-toc-bar]');
      if (bar) bar.style.opacity = on ? '1' : '0';
    }
    current = id;
  }

  // The last section whose top has passed the reading line. An
  // IntersectionObserver band was tried first and highlighted nothing at the
  // top of the page, where the header fills the band and no section is inside
  // it. This always resolves to exactly one section, including at scroll 0 and
  // at the very bottom.
  var LINE = 96;

  function update() {
    var best = targets[0].id;
    for (var i = 0; i < targets.length; i++) {
      if (targets[i].getBoundingClientRect().top <= LINE) best = targets[i].id;
    }
    // The final section is often too short for its top to ever reach the line,
    // so it would never highlight however far you scrolled. At the bottom of
    // the document it wins outright.
    var doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
      best = targets[targets.length - 1].id;
    }
    mark(best);
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      update();
    });
  }

  // Clicking a contents entry marks it immediately and holds that for a beat.
  // Without this, clicking the last short section lands at the foot of the
  // document, where the bottom rule hands the highlight to the final entry —
  // so clicking "Measurement" highlighted "What I'd do differently".
  var held = 0;
  for (var n = 0; n < links.length; n++) {
    links[n].addEventListener('click', function () {
      var id = this.getAttribute('data-toc-link');
      mark(id);
      held = Date.now() + 700;
    });
  }

  window.addEventListener('scroll', function () {
    if (Date.now() < held) return;
    onScroll();
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
`;

/**
 * The rail glow. Two drifting radial gradients in systems teal plus a thin
 * field of mist-teal marks moving upward, on a 260px canvas the height of the
 * viewport.
 *
 * Deferred to the end of the body rather than added to the blocking head
 * script: nothing here affects first paint, and the rail has a solid ground
 * colour underneath, so the page is complete and legible if this never runs.
 *
 * Three things it must do, and does:
 *   - prefers-reduced-motion draws one static frame and stops. No rAF at all.
 *   - a hidden tab stops the loop.
 *   - below 1024px the canvas has no box, so nothing is measured or drawn
 *     until a resize makes it visible.
 */
const RAIL_SCRIPT = `
(function () {
  var c = document.getElementById('rail-glow');
  if (!c || !c.getContext) return;
  var ctx = c.getContext('2d');
  if (!ctx) return;

  var reduce = false;
  try {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}

  var w = 0, h = 0, marks = [], raf = 0, running = false, timer = 0;

  function seed() {
    marks = [];
    // Roughly a third of the previous count, at a third of the opacity. The
    // revision called the old field visual noise, and it was: dots landing on
    // top of link text read as rendering artefacts rather than atmosphere.
    var n = Math.max(6, Math.round(h / 105));
    for (var i = 0; i < n; i++) {
      // Kept out of the middle third, where every label and link sits. Marks
      // hug the outer edges and the gutters instead.
      var edge = Math.random() < 0.5
        ? Math.random() * (w * 0.16)
        : w - Math.random() * (w * 0.16);
      marks.push({
        x: edge,
        y: Math.random() * h,
        r: 0.5 + Math.random() * 0.9,
        v: 0.03 + Math.random() * 0.07,
        a: 0.05 + Math.random() * 0.11
      });
    }
  }

  function measure() {
    var box = c.getBoundingClientRect();
    if (box.width < 1 || box.height < 1) { w = 0; h = 0; return false; }
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = box.width; h = box.height;
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
    return true;
  }

  function glow(x, y, r, a) {
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(47,127,121,' + a + ')');
    g.addColorStop(0.5, 'rgba(47,127,121,' + a * 0.3 + ')');
    g.addColorStop(1, 'rgba(47,127,121,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  function draw(t) {
    if (!w) return;
    var s = t / 1000;
    ctx.clearRect(0, 0, w, h);

    // Radius is a multiple of the rail width, not the height: on a 260px
    // column a viewport-scaled radius washes out to nothing.
    glow(w * 0.5 + Math.sin(s * 0.055) * w * 0.42,
         h * 0.22 + Math.cos(s * 0.041) * h * 0.14, w * 1.45, 0.3);
    glow(w * 0.42 + Math.cos(s * 0.033) * w * 0.4,
         h * 0.74 + Math.sin(s * 0.047) * h * 0.12, w * 1.15, 0.16);

    for (var i = 0; i < marks.length; i++) {
      var m = marks[i];
      if (!reduce) {
        m.y -= m.v;
        if (m.y < -3) {
          m.y = h + 3;
          m.x = Math.random() < 0.5
            ? Math.random() * (w * 0.16)
            : w - Math.random() * (w * 0.16);
        }
      }
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, 6.283);
      ctx.fillStyle = 'rgba(159,203,197,' + m.a + ')';
      ctx.fill();
    }
  }

  function frame(t) { draw(t); raf = requestAnimationFrame(frame); }

  function start() {
    if (running || reduce || !w) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function init() {
    stop();
    if (measure()) { draw(0); start(); }
  }

  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(init, 160);
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  init();
})();
`;

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.fullName,
  /* Both forms, so a search for either resolves to the same person. This is
     the field that connects the site to the LinkedIn profile in sameAs. */
  alternateName: profile.name,
  familyName: 'Chng',
  givenName: 'Xiu Wen',
  /* Matches the <title>. Two different job titles in the same document is the
     kind of thing a structured-data check flags and a reader notices. */
  jobTitle: 'Project Manager, Product Operations and Business Systems',
  image: `${SITE_URL}/images/og-card.png`,
  worksFor: { '@type': 'Organization', name: profile.employer },
  address: { '@type': 'PostalAddress', addressCountry: 'SG' },
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  sameAs: socialLinks.map((l) => l.href),
  knowsAbout: [
    'Business analysis',
    'Product operations',
    'Requirements gathering',
    'Release management',
    'User acceptance testing',
    'Phased rollouts',
    'Stakeholder coordination',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} ${sora.variable} ${plexMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2"
          style={{ background: 'var(--surface)', color: 'var(--text)' }}
        >
          Skip to content
        </a>
        {children}
        <script dangerouslySetInnerHTML={{ __html: RAIL_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: TOC_SCRIPT }} />
      </body>
    </html>
  );
}
