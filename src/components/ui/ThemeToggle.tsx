/**
 * Server component. No 'use client', no React state, no hydration cost.
 *
 * Behaviour is attached by the small inline script in layout.tsx, which
 * already has to run before paint to resolve the stored theme. Doing the
 * click handling there too means the toggle costs nothing beyond the markup.
 */
export function ThemeToggle({ onRail = false }: { onRail?: boolean } = {}) {
  return (
    <button
      type="button"
      // A data attribute rather than an id: the toggle renders twice — once in
      // the rail, once in the mobile header — and ids must stay unique.
      data-theme-toggle=""
      // The inline script in layout.tsx rewrites this label to name the theme
      // it will switch *to*, which it can only know in the browser. React sees
      // an attribute that changed under it and reports a hydration mismatch;
      // this says the difference is deliberate.
      suppressHydrationWarning
      aria-label="Switch colour theme"
      className="grid h-11 w-11 shrink-0 place-items-center rounded-md transition-colors"
      style={{ color: onRail ? 'var(--rail-muted)' : 'var(--text-muted)' }}
    >
      {/* Both icons ship; CSS shows the one matching the active theme, so the
          control is correct on first paint without any JavaScript running. */}
      <svg
        className="icon-sun h-[18px] w-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        className="icon-moon h-[18px] w-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
