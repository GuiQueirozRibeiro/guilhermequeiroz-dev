import type { ReactNode } from 'react';

export type Lang = 'pt' | 'en';
export type Theme = 'dark' | 'light';

// ─── I18N ────────────────────────────────────────────────────────────────────

export interface NavTranslations {
  work: string;
  about: string;
  aboutMe: string;
  highlights: string;
  stack: string;
  services: string;
  contact: string;
}

export interface HeroTranslations {
  role: string;
  availability: string;
  /** Visually-hidden lead-in (name + role) rendered before the visible H1 copy, for SEO/screen readers. */
  seoLead: string;
  headline_a: string;
  headline_b: string;
  headline_c: string;
  sub: string;
  cta_primary: string;
  cta_secondary: string;
  /** Words cycled behind the hero photo (kinetic typography). */
  heroWords: string[];
  experienceLabel: string;
}

export interface MarqueeTranslations {
  label: string;
}

export interface WorkTranslations {
  eyebrow: string;
  title: string;
  viewCase: string;
  back: string;
  role: string;
  year: string;
  stack: string;
  overview: string;
  challenge: string;
  solution: string;
  outcome: string;
  gallery: string;
  nda: string;
  ndaBody: string;
}

export interface AboutFact {
  k: string;
  v: string;
}

export interface AboutTranslations {
  eyebrow: string;
  title: string;
  intro: string;
  p1: string;
  p2: string;
  facts: AboutFact[];
}

export interface StackTranslations {
  eyebrow: string;
  title: string;
  sub: string;
}

export interface ServicesTranslations {
  eyebrow: string;
  title: string;
  sub: string;
}

export interface ContactTranslations {
  eyebrow: string;
  title_a: string;
  title_b: string;
  sub: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  email: string;
  footer: string;
}

export interface TweaksTranslations {
  title: string;
  lang: string;
  theme: string;
}

export interface HighlightsTranslations {
  eyebrow: string;
  title: string;
  sub: string;
  viewProject: string;
}

export interface AboutMeHobby {
  icon: string;
  title: string;
  description: string;
}

export interface AboutMeTranslations {
  eyebrow: string;
  title: string;
  intro: string;
  hobbiesTitle: string;
  hobbies: AboutMeHobby[];
  resumeTitle: string;
  resumeSub: string;
  resumePt: string;
  resumeEn: string;
  back: string;
}

export interface NotFoundTranslations {
  eyebrow: string;
  terminalLine1: string;
  terminalLine2: string;
  title: string;
  sub: string;
  cta: string;
  ctaSecondary: string;
}

export interface Translations {
  nav: NavTranslations;
  hero: HeroTranslations;
  marquee: MarqueeTranslations;
  work: WorkTranslations;
  about: AboutTranslations;
  aboutMe: AboutMeTranslations;
  highlights: HighlightsTranslations;
  stack: StackTranslations;
  services: ServicesTranslations;
  contact: ContactTranslations;
  tweaks: TweaksTranslations;
  notFound: NotFoundTranslations;
}

// ─── Data models ─────────────────────────────────────────────────────────────

export interface LocalizedString {
  pt: string;
  en: string;
}

export interface GalleryItem {
  src: string;
  caption?: LocalizedString;
  mobile?: boolean;
}

export interface ProjectLink {
  url: string;
  label: LocalizedString;
  icon: 'github' | 'external';
}

export interface ProjectFonts {
  display: string;
  body: string;
}

export interface ProjectAward {
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  photos?: string[];
}

export type ProjectCategory = 'enterprise' | 'eximia';

export interface Project {
  id: string;
  name: string;
  type: LocalizedString;
  year: string;
  role: LocalizedString;
  tags: string[];
  /** Determines the project's accent color - see `PROJECT_CATEGORY_ACCENT` in `data/projects.ts`. */
  category: ProjectCategory;
  accent: string;
  tagline: LocalizedString;
  blurb: LocalizedString;
  stackMain: string[];
  stackFull: string[];
  overview: LocalizedString;
  challenge: LocalizedString;
  solution: LocalizedString;
  outcome: LocalizedString;
  cover: string | string[] | null;
  /** Explicit static image (e.g. "/projects/agendai/cover.jpg") for social/search previews. Falls back to the first non-video gallery item, then the site logo. */
  ogImage?: string;
  links?: ProjectLink[];
  nda?: boolean;
  fonts?: ProjectFonts;
  gallery: GalleryItem[];
  award?: ProjectAward;
  leadershipHighlights?: LocalizedString[];
}

export interface Company {
  name: string;
  role: LocalizedString;
  period: string;
}

export interface Service {
  num: string;
  title: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface Highlight {
  id: string;
  icon: string;
  color: string;
  badge: string;
  title: string;
  description: string;
  projectId?: string;
}

export interface StackGroup {
  group: LocalizedString;
  items: string[];
}

export interface Icon {
  label: string;
  color: string;
  svg: ReactNode;
  desc: LocalizedString;
}
