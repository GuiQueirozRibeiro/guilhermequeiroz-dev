import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/data/projects';
import { SITE_URL } from '@/lib/seo';

// Not the build/request time — Google explicitly advises against stamping
// lastmod with "now" on every crawl, since a date that never reflects real
// content changes trains crawlers to ignore the field. Bumped by hand when
// the project data actually changes.
const LAST_MODIFIED = new Date('2026-08-29');

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${SITE_URL}/project/${project.id}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/sobre`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...projectEntries,
  ];
}
