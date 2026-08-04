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

/**
 * One label, so the hero and Contact cannot drift apart.
 *
 * "View", not "Download": the link opens the PDF in a tab rather than saving
 * it, and a button that says download and then does not is a small lie the
 * reader notices. Unaccented "Resume" is Xiu Wen's own spelling, applied to
 * every résumé string on the site so the two forms do not sit side by side.
 */
export const RESUME_LABEL = 'View Resume';

/** Names the owner, the format and the new tab, which the label cannot. */
export const RESUME_ARIA = 'View Xiu Wen’s resume, PDF, opens in a new tab';
