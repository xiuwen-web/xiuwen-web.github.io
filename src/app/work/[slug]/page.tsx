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

  // WriteWise is reached through the ecosystem, so its way back is the
  // ecosystem rather than the work index — otherwise the rail gives no hint
  // that it sits inside EverLoop at all.
  const nested = study.slug === 'writewise';

  return (
    <Shell
      active={study.slug}
      toc={caseStudyToc(study)}
      tocTitle={study.navLabel}
      backHref={nested ? '/work/everloop/#writewise' : '/#work'}
      backLabel={nested ? 'EverLoop Ecosystem' : 'All work'}
    >
      <CaseStudyDetail
        study={study}
        // WriteWise is reached through the ecosystem, so it is not one of the
        // four numbered entries. Its own href is not in the IA array, which is
        // exactly why workNumber returns null and the eyebrow drops the index
        // rather than inventing one.
        index={workNumber(`/work/${study.slug}/`)}
        backHref={nested ? '/work/everloop/#writewise' : '/#work'}
        backLabel={nested ? 'EverLoop Ecosystem' : 'All work'}
      />
    </Shell>
  );
}
