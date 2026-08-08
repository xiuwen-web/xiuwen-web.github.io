import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ACTIVE_KEY_TO_HREF, PRIMARY_NAV, workEntries, workNumber } from '@/content/navigation';
import { profile, socialLinks } from '@/content/profile';
import { hasResume } from '@/content/resume';
import { Identity, RailHeading, RailLink } from './Sidebar';

/**
 * Below 1024px: a compact header — monogram, name, Menu — over a full-height
 * drawer carrying the same hierarchy as the rail.
 *
 * The drawer is opened by ~20 lines of vanilla JS in layout.tsx rather than by
 * React state, which keeps the site at zero Client Components. It is closed in
 * the markup, so with the script dead the page is still complete; the button
 * simply does nothing rather than trapping anyone behind a menu that will not
 * open.
 *
 * No decorative canvas here — the revision asks for the dots to stay off the
 * mobile drawer, and a full-screen animation behind a menu is worse on a phone
 * anyway.
 */
export function MobileNav({ active }: { active?: string }) {
  const activeHref = active ? ACTIVE_KEY_TO_HREF[active] : undefined;
  /** The scroll-spy is wired to PRIMARY_NAV's hashes, which only exist here. */
  const onHome = active === 'overview';

  return (
    <div className="lg:hidden">
      <header
        className="sticky top-0 z-50 flex h-14 items-center justify-between gap-3 border-b px-4"
        style={{ background: 'var(--rail-bg)', borderColor: 'var(--rail-rule)' }}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Identity compact showRole={!onHome} showMark={!onHome} />

          {/*
            Where you are, on the only chrome a phone reader has. The rail is
            display:none below 1024px, so the numbered index that orients a
            desktop reader does not exist here — and this page runs to about
            10,900px, which is a dozen viewports with no map at all.

            Updated by the scroll-spy in layout.tsx, which is also what marks
            the rail. Rendered with the first section's name rather than empty:
            an empty element that gains a text node on the client is a
            hydration mismatch that suppressHydrationWarning does not cover —
            that flag reconciles differing text, not an element growing its
            first child. Seeded with the true value at scroll 0, it is also
            correct if the script never runs at all.

            Homepage only, because that is the only page whose sections the
            spy is wired to. Elsewhere the header keeps the identity alone.
          */}
          {onHome && (
            <>
              <span
                aria-hidden="true"
                className="h-3 w-px shrink-0"
                style={{ background: 'var(--rail-rule)' }}
              />
              <span
                data-toc-label
                suppressHydrationWarning
                className="min-w-0 truncate font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
                style={{ color: 'var(--rail-muted)' }}
              >
                {PRIMARY_NAV[0].label}
              </span>
            </>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <ThemeToggle onRail />
          <button
            type="button"
            id="drawer-toggle"
            aria-controls="mobile-drawer"
            aria-expanded="false"
            className="flex h-11 items-center gap-2 rounded-[var(--radius)] px-3 text-[length:var(--text-small)] font-medium"
            style={{ color: 'var(--rail-text)' }}
          >
            Menu
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M2 4.5h12M2 8h12M2 11.5h12" />
            </svg>
          </button>
        </div>
      </header>

      <div
        id="mobile-drawer"
        hidden
        className="fixed inset-0 z-40 overflow-y-auto pt-14"
        style={{ background: 'var(--rail-bg)' }}
      >
        <div className="flex min-h-full flex-col px-5 py-6">
          <nav aria-label="Sections">
            <ul className="space-y-px">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <RailLink href={item.href} current={active === item.key}>
                    {item.label}
                  </RailLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Case studies" className="mt-8">
            <RailHeading>Case studies</RailHeading>
            <ul className="mt-2 space-y-px">
              {workEntries.map((entry) => (
                <li key={entry.href}>
                  <RailLink
                    href={entry.href}
                    current={activeHref === entry.href}
                    number={workNumber(entry.href)}
                  >
                    {entry.navLabel}
                  </RailLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8">
            <RailHeading>Connect</RailHeading>
            <ul className="mt-2 space-y-px">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <RailLink href={link.href} external>
                    {link.label}
                  </RailLink>
                </li>
              ))}
              <li>
                <RailLink href={`mailto:${profile.email}`} external>
                  Email
                </RailLink>
              </li>
              {/* The drawer is the only navigation a phone reader has, so the
                  résumé belongs in it. The desktop rail does not get one — the
                  hero button is in view there. */}
              {hasResume && (
                <li>
                  <RailLink href={profile.resumePath} external>
                    Resume (PDF)
                  </RailLink>
                </li>
              )}
            </ul>
          </div>

          <p
            className="mt-auto border-t pt-4 font-mono text-[length:var(--text-label)] tracking-[0.08em] uppercase"
            style={{ color: 'var(--rail-muted)', borderColor: 'var(--rail-rule)' }}
          >
            {profile.location}
          </p>
        </div>
      </div>
    </div>
  );
}
