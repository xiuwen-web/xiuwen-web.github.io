import type { ReactNode } from 'react';
import { MobileNav } from './MobileNav';
import { Sidebar, type TocItem } from './Sidebar';
import { Footer } from './Footer';

/**
 * Page frame. Rail from 1024px up, compact header and drawer below it.
 *
 * Both navigations are in the DOM at every size and one is hidden by CSS, so
 * no JavaScript decides which to show. `active` and `toc` are passed rather
 * than read from the router — reading the router would make the rail a Client
 * Component for the sake of one highlighted link.
 */
export function Shell({
  active,
  toc,
  tocTitle,
  backHref,
  backLabel,
  children,
}: {
  active?: string;
  toc?: TocItem[];
  tocTitle?: string;
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1">
      <Sidebar
        active={active}
        toc={toc}
        tocTitle={tocTitle}
        backHref={backHref}
        backLabel={backLabel}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNav active={active} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
