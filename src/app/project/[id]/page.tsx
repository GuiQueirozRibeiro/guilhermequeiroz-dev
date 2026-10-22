import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/data/projects';
import { OG_LOCALE, PERSON, SITE_NAME, SITE_URL, resolveOgImage } from '@/lib/seo';
import { ProjectPageClient } from './project-page-client';

interface ProjectRouteParams {
  id: string;
}

export function generateStaticParams(): ProjectRouteParams[] {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProjectRouteParams>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return { title: 'Guilherme Queiroz Ribeiro - Engenheiro de Software' };
  }

  const title = `${project.name} - Guilherme Queiroz Ribeiro`;
  const description = project.tagline.pt;
  const url = `${SITE_URL}/project/${project.id}`;
  const image = resolveOgImage(project);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE,
      images: [{ url: image.url, alt: project.name }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [{ url: image.url, alt: project.name }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<ProjectRouteParams> }) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.tagline.pt,
    image: resolveOgImage(project),
    dateCreated: project.year,
    url: `${SITE_URL}/project/${project.id}`,
    author: {
      '@type': 'Person',
      name: PERSON.name,
      url: PERSON.url,
    },
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(projectJsonLd)}</script>
      <ProjectPageClient id={id} />
    </>
  );
}
