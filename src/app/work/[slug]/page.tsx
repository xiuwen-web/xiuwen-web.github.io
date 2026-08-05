import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Shell } from '@/components/layout/Shell';
import { CaseStudyDetail, caseStudyToc } from '@/components/ui/CaseStudyDetail';
import { caseStudies, getCaseStudy } from '@/content/caseStudies';
import { workNumber } from '@/content/navigation';
import { STATUS_META } from '@/types/content';

type Params = { slug: string };

/**
 * Static export: every route is enumerated at build time, so the site stays a
 * folder of files with no server (PRD §25). Adding a case study to
 * caseStudies.ts is enough — the page appears without touching this file.
 */
export function generateStaticParams(): Params[] {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  // The status goes in the description because it is a framing rule, not a
  // detail: a prototype must not read as shipped work in a search result.
  const description = `${study.summary} (${STATUS_META[study.status].label}.)`;

  return {
    title: `${study.title} — Case study`,
    description,
    alternates: { canonical: `/work/${study.slug}/` },
    openGraph: {
      title: study.title,
      description,
      url: `/work/${study.slug}/`,
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  /*
   * WriteWise used to send readers back to the ecosystem rather than the work
   * index, because the ecosystem page was the only way in and the rail would
   * otherwise have given no hint that it sits inside EverLoop.
   *
   * It has its own homepage card and rail entry as of 2026-08-05, so most
   * arrivals now come from the index and a back link to a different case study
   * is disorienting rather than orienting. The EverLoop relationship is stated
   * in the case study text, which is where it belongs.
   *
   * The same change makes workNumber return 04 instead of null, so the eyebrow
   * now carries an index like every other case study.
   */
  return (
    <Shell active={study.slug} toc={caseStudyToc(study)} tocTitle={study.navLabel}>
      <CaseStudyDetail study={study} index={workNumber(`/work/${study.slug}/`)} />
    </Shell>
  );
}
