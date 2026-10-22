import type { Project } from '@/types';

export const SITE_URL = 'https://guilhermequeiroz.dev';
export const SITE_NAME = 'Guilherme Queiroz Ribeiro — Portfólio';
// og:locale for the language the server-rendered HTML is actually in (see
// docs/SEO.md, "Limitação conhecida: idioma único no HTML servido" — the
// pt/en toggle is client-side only, so every route crawlers see is pt-BR).
export const OG_LOCALE = 'pt_BR';

// Landscape 1200x630 card (photo + name), generated from the profile photo.
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const CONTACT = {
  email: 'guilherme.q.r@hotmail.com',
  whatsapp: '5561992661000',
  whatsappDisplay: '+55 (61) 99266-1000',
  linkedin: 'https://www.linkedin.com/in/guilherme-queiroz-ribeiro/',
  github: 'https://github.com/GuiQueirozRibeiro',
  githubUser: 'GuiQueirozRibeiro',
};

export const whatsappLink = (text = 'Olá Guilherme, vi seu portfólio!') =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export const PERSON = {
  name: 'Guilherme Queiroz Ribeiro',
  alternateName: ['Guilherme Queiroz', 'Guilherme Ribeiro', 'GuiQueirozRibeiro'],
  jobTitle: [
    'Engenheiro de Software',
    'Engenheiro de Software Mobile',
    'Desenvolvedor React Native',
    'Desenvolvedor Flutter',
    'Desenvolvedor Full Stack',
    'Software Engineer',
  ],
  description: 'Engenheiro de software em Brasília. Apps React Native e Flutter, web em Next.js e APIs em Node.js/TypeScript — do banco de dados à publicação nas lojas. Fundador da Exímia Tech.',
  worksFor: 'Sistema Boss',
  knowsAbout: ['React Native', 'Expo', 'Flutter', 'Next.js', 'TypeScript', 'Node.js', 'Prisma', 'Clean Architecture', 'SaaS multi-tenant', 'Offline-first'],
  url: SITE_URL,
  image: `${SITE_URL}/guilherme-queiroz-engenheiro-de-software.webp`,
  sameAs: [CONTACT.github, CONTACT.linkedin, 'https://www.instagram.com/guilhermequeirozr/'],
};

/** og:image for /sobre — same landscape card as the rest of the site. */
export const SOBRE_OG_IMAGE = {
  url: OG_IMAGE,
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
};

/**
 * Resolves the best available og:image for a project: an explicit `ogImage`,
 * then the first non-video gallery asset, then the site-wide fallback.
 */
export function resolveOgImage(project: Project): string {
  if (project.ogImage) return `${SITE_URL}${project.ogImage}`;

  const staticGalleryItem = project.gallery.find((item) => !item.src.endsWith('.mp4'));
  if (staticGalleryItem) return `${SITE_URL}${staticGalleryItem.src}`;

  return OG_IMAGE;
}
