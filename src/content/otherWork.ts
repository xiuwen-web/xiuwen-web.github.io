import type { SupportingCard } from '@/types/content';

/**
 * Other Work — entry 04.
 *
 * Not a dumping ground (SIDEBAR_FLOW_REVISION §04). Three entries, each a
 * distinct system or piece of work that belongs under neither CAdmin nor
 * EverLoop.
 *
 * Data integrity and Nova were full case studies until 2026-08-02. Xiu Wen
 * chose to compress them here rather than keep the pages, having been told the
 * cost: roughly 1,200 words of reasoning evidence, including the clearest
 * operations-to-product analysis on the site. Both entries below are cut from
 * that approved copy — condensed, not rewritten.
 *
 * Exception: the last two paragraphs of `data-integrity` are new (2026-08-02).
 * The GitHub cross-check found multi-outlet record scoping to be the most
 * recurrent engineering theme across all 26 months and every product surface,
 * not a student-list problem (F73, and F56 for the timesheet case). The entry
 * was under-claiming, so the breadth was added. Still no impact claim (F26).
 */
export const otherWork: SupportingCard[] = [
  {
    id: 'nova',
    title: 'Nova — an assistant, and the feature I removed',
    status: 'personal-project',
    body: [
      'A personal AI assistant I built in TypeScript to pull my coordination work — Slack, email, calendar, project boards, notes — into one conversation. It runs continuously and is now used by others on the Operations and Product team.',
      'The part worth reporting is what I took out. Auto-enrichment generated sub-tasks for me, and it was the feature I was most pleased with, and it kept generating: tasks bloated, pages flooded, and my workspace became harder to use than before I automated anything. I could have tuned it — narrower triggers, tighter prompts, a cap. I did not, because the feature saved me a small amount of writing and its failure mode made the system unusable. That is a bad trade at any level of tuning.',
      'What replaced it were limits that apply to everything rather than to that one feature: a hard cap on records created in a rolling window, a confirmation prompt before anything creates more than a handful at once, a weekly check for abnormal growth, and backups. Limits before features, whenever something runs unattended against real data.',
    ],
  },
];
