import { Container } from './Section';
import { profile } from '@/content/profile';

export function Footer() {
  return (
    <footer className="border-t py-10" style={{ borderColor: 'var(--rule)' }}>
      <Container width="wide">
        <div
          className="flex flex-col gap-2 text-[length:var(--text-small)] sm:flex-row sm:items-center sm:justify-between"
          style={{ color: 'var(--text-muted)' }}
        >
          <span>
            {/*
              profile.role rather than a fourth hand-typed phrasing of it. This
              read "Operations and product delivery" in sentence case while the
              rail, the masthead and the metadata each said it their own way —
              four spellings of one job on one page.
            */}
            {profile.name} — {profile.role}, {profile.location}
          </span>
          <span>© {new Date().getFullYear()} · Built with Next.js</span>
        </div>

        {/*
          Back to top. The homepage runs to roughly 10,800px on a phone, and
          from Contact the only ways back up were a thumb marathon or the
          drawer. A plain anchor, so it works with the script dead.
        */}
        <div className="mt-6 border-t pt-5" style={{ borderColor: 'var(--rule)' }}>
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-2 text-[length:var(--text-small)] font-medium transition-opacity hover:opacity-70"
            style={{ color: 'var(--accent-ink)' }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
            </svg>
            Back to top
          </a>
        </div>
      </Container>
    </footer>
  );
}
