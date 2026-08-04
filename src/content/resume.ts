import { existsSync } from 'node:fs';
import { profile } from './profile';

/**
 * Whether a résumé is actually published, checked at build time.
 *
 * Server-only — this imports node:fs, so it must never be pulled into a Client
 * Component. It lives apart from profile.ts for exactly that reason: profile
 * is safe to import anywhere, this is not.
 *
 * Every résumé link on the site is gated on this, so the file is the switch.
 * Drop a PDF at public/documents/Xiu-Wen-Resume.pdf and the hero button, the
 * Contact link and the mobile drawer entry all appear on the next build; with
 * no file there is no dead link anywhere.
 *
 * NOT PUBLISHED AS OF 2026-08-04. The résumé on hand is dated February 2023
 * and carries a full residential address, a date and place of birth,
 * nationality and a personal mobile number in its header — every category the
 * brief says must be stripped before publication. It also predates all the
 * work this site is about. A web-safe replacement has to come from Xiu Wen;
 * redacting a PDF by drawing over it leaves the text extractable underneath,
 * which is not a redaction.
 */
export const hasResume = existsSync(`public${profile.resumePath}`);

/** One label, so the hero, Contact and the drawer cannot drift apart. */
export const RESUME_LABEL = 'Download résumé';

/** Names the owner and the format, for a link that leaves the site. */
export const RESUME_ARIA = 'Open Xiu Wen’s résumé PDF in a new tab';
