'use client';

import { BtnPrimary, CarouselImage, BrowserFrame, LazyVideo } from '../ui';
import { PROJECTS } from '../data/projects';
import { useEffect } from 'react';
import Image from 'next/image';
import type { Lang, Translations, Project, GalleryItem, ProjectFonts } from '../types';

const QA = {
  pt: {
    q1: 'O que é isso?',
    q2: 'Qual era o desafio?',
    q3: 'O que eu fiz?',
    q4: 'Deu certo?',
    moreShots: 'Mais telas',
    typography: 'Tipografia',
    builtWith: 'Construído com',
    ndaUrl: '🔒 privado',
  },
  en: {
    q1: 'What is this?',
    q2: 'What was the challenge?',
    q3: 'What did I do?',
    q4: 'Did it work out?',
    moreShots: 'More screens',
    typography: 'Typography',
    builtWith: 'Built with',
    ndaUrl: '🔒 private',
  },
} as const;

function joinList(items: string[], lang: Lang): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  const joiner = lang === 'pt' ? 'e' : 'and';
  return `${items.slice(0, -1).join(', ')} ${joiner} ${items[items.length - 1]}`;
}

interface ProjectPageProps {
  id: string;
  lang: Lang;
  t: Translations;
  onBack: () => void;
  onOpenProject?: (id: string) => void;
}

export function ProjectPage({ id, lang, t, onBack, onOpenProject }: ProjectPageProps) {
  const project = PROJECTS.find(proj => proj.id === id);
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  if (!project) return null;

  const qa = QA[lang];
  const gallery = project.gallery || [];
  const rawUrl = project.links?.[0]?.url;
  const coverUrl = project.nda && !project.cover
    ? qa.ndaUrl
    : rawUrl
      ? rawUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
      : `localhost/projects/${project.id}`;

  return (
    <div className="min-h-screen pt-[100px] md:pt-[120px]">
      <div className="max-w-[1160px] mx-auto px-5 md:px-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[13.5px] text-ink-2 mb-8 hover:text-ink transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {t.work.back}
        </button>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          <div className="flex flex-col gap-4 md:sticky md:top-[110px] md:self-start">
            <BrowserFrame url={coverUrl} accent={project.accent} aspect="aspect-[16/10]">
              {project.cover ? (
                <CarouselImage images={project.cover} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <NDACoverContent project={project} t={t} />
              )}
            </BrowserFrame>

            {project.award?.photos && project.award.photos.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {project.award.photos.map((src, i) => (
                  <div key={src} className="relative aspect-[4/3] rounded-[10px] overflow-hidden border border-line">
                    <Image
                      src={src}
                      alt={i === 0
                        ? (lang === 'pt' ? 'Equipe e banca avaliadora' : 'Team and evaluation panel')
                        : (lang === 'pt' ? 'Medalha de 1º lugar' : '1st place medal')
                      }
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="min-w-0">
            {project.award && (
              <div
                className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-ink-2 rounded-[10px] px-4 py-3 mb-6"
                style={{ background: 'color-mix(in oklab, #f5c451 8%, var(--card))', border: '1px solid color-mix(in oklab, #f5c451 32%, var(--line))' }}
              >
                <span className="flex-shrink-0">🥇</span>
                <span><b className="text-ink font-semibold">{project.award.title[lang]}</b> - {project.award.description[lang]}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-3">
              <span className="font-mono text-[11px] tracking-[0.1em] uppercase" style={{ color: project.accent }}>
                {project.type[lang]}
              </span>
              <span className="text-ink-3 text-[12px]">· {project.role[lang]} · {project.year}</span>
              {project.nda && (
                <span
                  className="font-mono text-[9.5px] py-[3px] px-[9px] rounded-full border tracking-[0.12em] uppercase"
                  style={{ borderColor: `${project.accent}88`, color: project.accent }}
                >NDA</span>
              )}
            </div>

            <h1 className="text-[clamp(30px,4.4vw,46px)] leading-[1.15] tracking-[-0.02em] font-semibold mb-5">
              {project.name}
            </h1>

            {project.links && project.links.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-9">
                {project.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line text-sm font-medium transition-[border-color,background] hover:border-ink-2 hover:bg-bg-2"
                  >
                    {link.icon === 'github' ? (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    )}
                    {link.label[lang]}
                  </a>
                ))}
              </div>
            )}

            <QABlock question={qa.q1}>
              <p>{project.overview[lang]}</p>
            </QABlock>

            <QABlock question={qa.q2}>
              <p>{project.challenge[lang]}</p>
            </QABlock>

            <QABlock question={qa.q3}>
              <p>{project.solution[lang]}</p>
              {project.leadershipHighlights && project.leadershipHighlights.length > 0 && (
                <div className="flex flex-col gap-2.5 mt-4">
                  {project.leadershipHighlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[14px] text-ink-2 leading-[1.55]">
                      <span style={{ color: project.accent }} className="flex-shrink-0 mt-[3px]">✓</span>
                      <span>{item[lang]}</span>
                    </div>
                  ))}
                </div>
              )}
            </QABlock>

            <QABlock question={qa.q4} last>
              <p>{project.outcome[lang]}</p>
            </QABlock>

            {project.nda && <NDANote project={project} t={t} />}

            <div className="text-[13.5px] text-ink-3 leading-[1.6] pt-6 border-t border-line">
              {qa.builtWith} {joinList(project.stackFull, lang)}.
            </div>

            {project.fonts && (
              <div className="flex items-center gap-2.5 mt-4 text-[12px] text-ink-3">
                <span>{qa.typography}:</span>
                <span className="text-ink-2" style={{ fontFamily: resolveProjectFontFamily(project.fonts.display) }}>{describeFont(project.fonts)}</span>
              </div>
            )}
          </div>
        </div>

        {gallery.length > 1 && (
          <div className="mt-16 mb-4">
            <div className="text-[13px] font-semibold text-ink-3 mb-5">- {qa.moreShots}</div>
            <GalleryGrid items={gallery.slice(1)} accent={project.accent} lang={lang} />
          </div>
        )}

        <div className="mt-16">
          <NextProject current={project} lang={lang} onOpenProject={onOpenProject} />
        </div>

        <div className="py-10 pb-24 text-center border-t border-line">
          <BtnPrimary onClick={(e) => { e.preventDefault(); onBack(); }} href="#">{t.work.back}</BtnPrimary>
        </div>
      </div>
    </div>
  );
}

interface QABlockProps {
  question: string;
  last?: boolean;
  children: React.ReactNode;
}

function QABlock({ question, last, children }: QABlockProps) {
  return (
    <div className={last ? 'mb-8' : 'mb-8'}>
      <div className="text-[13px] font-semibold text-ink-3 mb-2.5">- {question}</div>
      <div className="text-[16px] leading-[1.75] text-ink-2 max-w-[62ch] flex flex-col gap-1">
        {children}
      </div>
    </div>
  );
}

interface GalleryGridProps {
  items: GalleryItem[];
  accent: string;
  lang: Lang;
}

export function GalleryGrid({ items, accent, lang }: GalleryGridProps) {
  const desktopItems = items.filter(item => !item.mobile);
  const mobileItems = items.filter(item => item.mobile);

  return (
    <div className="flex flex-col gap-7">
      {desktopItems.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {desktopItems.map((galleryItem, index) => (
            <figure
              key={galleryItem.src}
              className={`aspect-[16/10] rounded-xl overflow-hidden relative border border-line bg-bg-3 m-0 flex items-center justify-center ${desktopItems.length === 1 || (desktopItems.length === 3 && index === 0) ? 'md:col-span-2' : 'md:col-span-1'}`}
            >
              {galleryItem.src.endsWith('.mp4') ? (
                <LazyVideo
                  src={galleryItem.src}
                  className="max-w-full max-h-full w-full h-full object-contain transition-transform duration-[600ms] ease-[cubic-bezier(.2,.7,.15,1)] hover:scale-[1.02]"
                />
              ) : (
                <Image
                  src={galleryItem.src}
                  alt={galleryItem.caption ? galleryItem.caption[lang] : ''}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain transition-transform duration-[600ms] ease-[cubic-bezier(.2,.7,.15,1)] hover:scale-[1.02]"
                />
              )}
              {galleryItem.caption && (
                <figcaption className="absolute bottom-3 left-3 right-3 font-mono text-[10.5px] text-ink py-1.5 px-2.5 rounded-lg bg-[color-mix(in_oklab,var(--bg)_80%,transparent)] backdrop-blur-[8px] tracking-[0.04em] leading-[1.4]">
                  {galleryItem.caption[lang]}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
      {mobileItems.length > 0 && (
        <div
          className="py-6 grid grid-cols-1 gap-5 justify-items-center md:justify-center"
          style={{ gridTemplateColumns: `repeat(${Math.min(mobileItems.length, 3)}, minmax(0, 280px))` }}
        >
          {mobileItems.map((galleryItem) => (
            <figure key={galleryItem.src} className="relative m-0 flex flex-col gap-3 items-center">
              <div
                className="w-full p-4 rounded-[14px] border border-line flex items-center justify-center"
                style={{ background: `linear-gradient(160deg, ${accent}10, var(--bg-3))` }}
              >
                {galleryItem.src.endsWith('.mp4') ? (
                  <LazyVideo
                    src={galleryItem.src}
                    className="max-w-full block [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.35))]"
                    style={{ maxHeight: 440, width: 'auto', height: 'auto' }}
                  />
                ) : (
                  <Image
                    src={galleryItem.src}
                    alt={galleryItem.caption ? galleryItem.caption[lang] : ''}
                    width={878}
                    height={1784}
                    className="max-w-full block [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.35))]"
                    style={{ maxHeight: 440, width: 'auto', height: 'auto' }}
                  />
                )}
              </div>
              {galleryItem.caption && (
                <figcaption className="font-mono text-[10.5px] text-ink-3 tracking-[0.04em] leading-[1.45] text-center max-w-[260px]">
                  {galleryItem.caption[lang]}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

interface NDACoverContentProps {
  project: Project;
  t: Translations;
}

function NDACoverContent({ project, t }: NDACoverContentProps) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-8"
      style={{ background: `radial-gradient(circle at 30% 30%, ${project.accent}22, transparent 55%), radial-gradient(circle at 80% 70%, ${project.accent}18, transparent 50%)` }}
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
        }}
      />
      <div className="relative text-center max-w-[380px]">
        <div
          className="inline-flex items-center gap-2 py-[5px] px-3 rounded-full border font-mono text-[10.5px] tracking-[0.14em] uppercase mb-4"
          style={{ border: `1px solid ${project.accent}`, color: project.accent }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
          NDA
        </div>
        <div className="text-[18px] leading-[1.3] tracking-[-0.01em] font-semibold mb-2">{t.work.nda}</div>
        <p className="text-[12.5px] leading-[1.5] text-ink-2">{t.work.ndaBody}</p>
      </div>
    </div>
  );
}

interface NDANoteProps {
  project: Project;
  t: Translations;
}

export function NDANote({ project, t }: NDANoteProps) {
  return (
    <div
      className="p-5 rounded-[14px] mb-8 flex items-start gap-3.5"
      style={{
        border: `1px dashed ${project.accent}66`,
        background: `color-mix(in oklab, ${project.accent} 6%, var(--card))`,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={project.accent} strokeWidth="2" className="flex-shrink-0 mt-0.5">
        <rect x="4" y="11" width="16" height="10" rx="2"/>
        <path d="M8 11V7a4 4 0 018 0v4"/>
      </svg>
      <div className="text-sm leading-[1.6] text-ink-2">{t.work.ndaBody}</div>
    </div>
  );
}

interface NextProjectProps {
  current: Project;
  lang: Lang;
  onOpenProject?: (id: string) => void;
}

export function NextProject({ current, lang, onOpenProject }: NextProjectProps) {
  const projects = PROJECTS;
  const currentIndex = projects.findIndex(proj => proj.id === current.id);
  const next = projects[(currentIndex + 1) % projects.length];
  return (
    <a
      href={`/project/${next.id}`}
      onClick={(e) => {
        if (onOpenProject) {
          e.preventDefault();
          onOpenProject(next.id);
          window.scrollTo(0, 0);
        }
      }}
      className="block py-8 px-5 md:py-12 md:px-8 rounded-2xl border border-line hover:border-[var(--next-accent-border)] relative overflow-hidden mb-12 transition-[border-color,transform] duration-[300ms,400ms] ease-[ease,cubic-bezier(.2,.7,.15,1)] hover:-translate-y-0.5"
      style={{
        '--next-accent-border': `${next.accent}88`,
        background: `linear-gradient(110deg, ${next.accent}15, var(--card))`,
      } as React.CSSProperties}
    >
      <div className="font-mono text-[10.5px] text-ink-3 tracking-[0.14em] uppercase mb-3">
        {lang === 'pt' ? 'Próximo projeto' : 'Next project'}
      </div>
      <div className="flex justify-between items-center gap-6">
        <div>
          <div className="text-[24px] md:text-[36px] font-semibold tracking-[-0.02em] leading-[1.1]">{next.name}</div>
          <div className="text-sm text-ink-2 mt-1.5">{next.tagline[lang]}</div>
        </div>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={next.accent} strokeWidth="1.5">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </a>
  );
}

export function describeFont(fonts: ProjectFonts): string {
  if (!fonts) return '';
  const displayFont = (fonts.display || '').replace(/['"]/g, '').split(',')[0].trim();
  const bodyFont = (fonts.body || '').replace(/['"]/g, '').split(',')[0].trim();
  return displayFont === bodyFont ? displayFont : `${displayFont} + ${bodyFont}`;
}

// Project fonts are self-hosted (via next/font in this route's layout.tsx, or
// globally for Archivo/DM Sans/Fraunces) instead of a linked Google Fonts
// stylesheet - this maps each project's literal family name to its CSS
// variable so the sample text below actually renders in that font.
const PROJECT_FONT_VARS: Record<string, string> = {
  Poppins: 'var(--font-poppins)',
  Inter: 'var(--font-inter)',
  Michroma: 'var(--font-michroma)',
  Archivo: 'var(--font-archivo)',
};

function resolveProjectFontFamily(raw: string): string {
  const name = raw.replace(/['"]/g, '').split(',')[0].trim();
  const cssVar = PROJECT_FONT_VARS[name];
  return cssVar ? `${cssVar}, sans-serif` : raw;
}
