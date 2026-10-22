'use client';

import type { CSSProperties } from 'react';
import { Section, Reveal, CarouselImage, BrowserFrame, HoverRollLabel, HoverRollIcon, ArrowIcon } from '../ui';
import { SplitTitle } from '../components/SplitTitle';
import { PROJECTS, PROJECT_CATEGORY_ACCENT } from '../data/projects';
import { GithubActivity } from './GithubActivity';
import type { Lang, Translations, Project } from '../types';

interface WorkProps {
  t: Translations;
  lang: Lang;
  onOpenProject: (id: string) => void;
}

const STRINGS = {
  pt: {
    intro: (total: number) =>
      `${total} produtos e plataformas em produção, com 4 aplicações publicadas na App Store e ecossistemas web corporativos.`,
    statusAward: 'Destaque',
    statusLive: 'Em produção',
    statusNda: 'Privado · NDA',
    visitSite: 'Acessar site',
    appStore: 'Ver na App Store',
  },
  en: {
    intro: (total: number) =>
      `${total} products and platforms in production, featuring 4 published App Store applications and enterprise web ecosystems.`,
    statusAward: 'Featured',
    statusLive: 'Live in production',
    statusNda: 'Private · NDA',
    visitSite: 'Visit site',
    appStore: 'View on App Store',
  },
} as const;

/** Extrai frase curta do resultado do projeto sem travessões. */
function pullQuote(text: string): string {
  const clean = text.replace(/-/g, '-');
  const firstSentence = clean.split(/(?<=\.)\s/)[0];
  return firstSentence.trim().replace(/\.$/, '');
}

export function Work({ t, lang, onOpenProject }: WorkProps) {
  const s = STRINGS[lang];
  const projects = PROJECTS;

  return (
    <Section id="work" eyebrow={t.work.eyebrow}>
      <WorkGlow />

      <div className="mb-14 md:mb-16 max-w-[640px]">
        <SplitTitle as="h2" className="text-[clamp(28px,4vw,52px)] leading-[1.05] tracking-[-0.025em] font-semibold">
          {t.work.title}
        </SplitTitle>
        <p className="text-[15px] leading-[1.55] text-ink-2 mt-3">{s.intro(projects.length)}</p>
      </div>

      <div className="border-t border-line">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            lang={lang}
            t={t}
            s={s}
            onOpenProject={onOpenProject}
          />
        ))}
      </div>

      <GithubActivity lang={lang} />
    </Section>
  );
}

interface ProjectRowProps {
  project: Project;
  index: number;
  lang: Lang;
  t: Translations;
  s: { statusAward: string; statusLive: string; statusNda: string; visitSite: string; appStore: string };
  onOpenProject: (id: string) => void;
}

function ProjectRow({ project, index, lang, t, s, onOpenProject }: ProjectRowProps) {
  const mirrored = index % 2 === 1;
  const rawUrl = project.links?.[0]?.url;
  const isAppStore = rawUrl?.includes('apps.apple.com');
  const url = rawUrl ? rawUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : `localhost/projects/${project.id}`;
  const quote = pullQuote(project.outcome[lang]);

  const status = project.award
    ? { icon: '★', label: s.statusAward }
    : project.nda
      ? { icon: '🔒', label: s.statusNda }
      : isAppStore
        ? { icon: '', label: 'App Store' }
        : rawUrl
          ? { icon: '●', label: s.statusLive }
          : null;

  return (
    <Reveal className="border-b border-line last:border-b-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-12 md:py-16">
        <div className={mirrored ? 'md:order-2' : 'md:order-1'}>
          <BrowserFrame url={url} accent={project.accent} aspect="aspect-[16/10]" onOpen={() => onOpenProject(project.id)} openLabel={t.work.viewCase}>
            {project.cover ? (
              <CarouselImage images={project.cover} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <NDAPlaceholder project={project} label={s.statusNda} />
            )}
          </BrowserFrame>
        </div>

        <div className={mirrored ? 'md:order-1' : 'md:order-2'}>
          <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.12em] mb-3" style={{ color: project.accent }}>
            <span>{project.type[lang]}</span>
            <span className="text-ink-3">·</span>
            <span className="text-ink-3">{project.year}</span>
          </div>

          {status && (
            <div
              className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] px-2.5 py-1 rounded-full border mb-4"
              style={{ borderColor: `${project.accent}55`, color: project.accent, background: `color-mix(in oklab, ${project.accent} 10%, transparent)` }}
            >
              <span>{status.icon}</span>
              <span>{status.label}</span>
            </div>
          )}

          <h3 className="text-[26px] md:text-[32px] font-semibold tracking-[-0.015em] leading-[1.15]">{project.name}</h3>
          <div className="font-mono text-[10.5px] text-ink-3 tracking-[0.02em] mt-1.5">{project.tags.join(' · ')}</div>
          <p className="text-[15px] md:text-[16px] text-ink leading-[1.5] mt-3 max-w-[440px]">{project.tagline[lang]}</p>
          <p className="text-[13.5px] text-ink-2 leading-[1.6] mt-3 max-w-[440px]">{project.blurb[lang]}</p>

          <p
            className="text-[13.5px] text-ink-2 leading-[1.6] mt-5 pl-3.5 border-l-2 max-w-[440px]"
            style={{ borderColor: `${project.accent}66` }}
          >
            <span style={{ color: project.accent }}>• </span>
            {quote}.
          </p>

          <div className="flex flex-wrap gap-1.5 mt-5">
            {project.stackMain.map(stackItem => (
              <span
                key={stackItem}
                className="stack-badge font-mono text-[10.5px] py-1 px-2.5 rounded-full border border-line text-ink-3"
                style={{ '--tag-accent': project.accent } as CSSProperties}
              >
                {stackItem}
              </span>
            ))}
          </div>

          <div className="flex items-center flex-wrap gap-4 mt-7">
            <button
              onClick={() => onOpenProject(project.id)}
              className="btn inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] px-4 py-2.5 rounded-full border transition-colors duration-200"
              style={{ borderColor: `${project.accent}66`, color: project.accent, background: `color-mix(in oklab, ${project.accent} 12%, transparent)` }}
            >
              <HoverRollLabel>{t.work.viewCase}</HoverRollLabel>
              <HoverRollIcon icon={<ArrowIcon size={10} />} next={<ArrowIcon size={10} />} />
            </button>
            {rawUrl && (
              <a
                href={rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn inline-flex items-center gap-1.5 text-[12.5px] text-ink-2 hover:text-ink transition-colors duration-200 font-medium"
              >
                <HoverRollLabel>{isAppStore ? s.appStore : s.visitSite}</HoverRollLabel>
                <HoverRollIcon icon={<ArrowIcon size={11} />} next={<ArrowIcon size={11} />} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** Slow-drifting ambient glow behind the section. */
function WorkGlow() {
  return (
    <div className="absolute inset-0 -z-10 overflow-visible" aria-hidden="true">
      <style>{`
        @keyframes work-glow-a {
          0%, 100% { transform: translate(-6%, -8%) scale(1); }
          50% { transform: translate(4%, 6%) scale(1.18); }
        }
        @keyframes work-glow-b {
          0%, 100% { transform: translate(6%, 8%) scale(1); }
          50% { transform: translate(-5%, -4%) scale(1.12); }
        }
        .work-glow-blob { position: absolute; border-radius: 9999px; filter: blur(90px); }
        .work-glow-a { animation: work-glow-a 22s ease-in-out infinite; }
        .work-glow-b { animation: work-glow-b 26s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .work-glow-a, .work-glow-b { animation: none; }
        }
      `}</style>
      <div
        className="work-glow-blob work-glow-a w-[480px] h-[480px] -top-[160px] -left-[120px] opacity-[0.16]"
        style={{ background: PROJECT_CATEGORY_ACCENT.eximia }}
      />
      <div
        className="work-glow-blob work-glow-b w-[440px] h-[440px] -bottom-[140px] -right-[100px] opacity-[0.14]"
        style={{ background: PROJECT_CATEGORY_ACCENT.enterprise }}
      />
    </div>
  );
}

const NDA_BARCODE = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1];

const NDA_SKYLINE = [
  { left: '2%', width: 30, height: 50, opacity: 0.3, blur: 1 },
  { left: '13%', width: 22, height: 76, opacity: 0.45, blur: 0 },
  { left: '25%', width: 34, height: 38, opacity: 0.25, blur: 1.5 },
  { left: '64%', width: 24, height: 60, opacity: 0.4, blur: 0 },
  { left: '78%', width: 30, height: 42, opacity: 0.26, blur: 1.5 },
  { left: '90%', width: 18, height: 68, opacity: 0.36, blur: 0 },
];

function NDAMiniBuilding({ accent, left, width, height, opacity, blur, delay }: { accent: string; left: string; width: number; height: number; opacity: number; blur: number; delay: number }) {
  const rows = Math.max(2, Math.round(height / 16));
  return (
    <div
      className="absolute bottom-0 rounded-t-[3px]"
      style={{ left, width, height, opacity, filter: blur ? `blur(${blur}px)` : undefined, background: 'var(--ink-3)' }}
    >
      <div className="grid grid-cols-2 gap-[3px] p-[3px] w-full h-full">
        {Array.from({ length: rows * 2 }, (_, i) => (
          <span
            key={i}
            className="nda-window rounded-[1px]"
            style={{ '--win-accent': accent, animationDelay: `${(delay + i * 0.35) % 4.5}s` } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}

const NDA_KPIS = [
  { value: '94%', trendUp: true },
  { value: '0.8%', trendUp: false },
  { value: '24+', trendUp: true },
];

const NDA_TABLE_ROWS = [
  { ok: true, width: '78%' },
  { ok: true, width: '62%' },
  { ok: false, width: '84%' },
  { ok: true, width: '70%' },
];

const NDA_CHART_BARS = [42, 68, 55, 84, 62, 91, 74];

function NDAPlaceholder({ project, label }: { project: Project; label: string }) {
  const accent = project.accent;
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center p-6" style={{ background: 'var(--bg-2)' }}>
      <style>{`
        @keyframes nda-flicker {
          0%, 100% { opacity: 0.15; }
          45% { opacity: 0.95; }
          50% { opacity: 0.25; }
          55% { opacity: 0.85; }
        }
        @keyframes nda-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes nda-bar-pulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.68); }
        }
        @keyframes nda-float-card {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .nda-window { animation: nda-flicker 4s infinite ease-in-out; background: var(--win-accent); }
        .nda-bar { animation: nda-bar-pulse 2.4s infinite ease-in-out; transform-origin: bottom; }
        .nda-float { animation: nda-float-card 5s infinite ease-in-out; }
      `}</style>

      {/* Skyline */}
      <div className="absolute inset-x-0 bottom-0 h-[38%] pointer-events-none" aria-hidden="true">
        {NDA_SKYLINE.map((b, i) => (
          <NDAMiniBuilding key={i} accent={accent} left={b.left} width={b.width} height={b.height} opacity={b.opacity} blur={b.blur} delay={i * 0.7} />
        ))}
      </div>

      {/* Dashboard frame */}
      <div
        className="relative z-10 w-full max-w-[360px] aspect-[16/10] rounded-[8px] p-2.5 flex flex-col justify-between shadow-2xl"
        style={{ background: 'var(--bg)', border: `1px solid ${accent}33`, boxShadow: `0 20px 40px -15px ${accent}22` }}
      >
        <div className="flex items-center justify-between pb-2 border-b border-line">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
            <span className="font-mono text-[9px] uppercase tracking-wider text-ink-2 font-semibold">SGP ERP</span>
          </div>
          <span className="font-mono text-[8px] text-ink-3">MULTI-TENANT · RLS</span>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-1.5 my-auto">
          {NDA_KPIS.map((kpi, i) => (
            <div key={i} className="p-1.5 rounded-[4px]" style={{ background: 'var(--bg-2)' }}>
              <div className="font-mono text-[11px] font-bold text-ink">{kpi.value}</div>
              <div className="text-[7.5px] text-ink-3 uppercase font-mono">{i === 0 ? 'Ocupação' : i === 1 ? 'Inadimplência' : 'Telas'}</div>
            </div>
          ))}
        </div>

        {/* Mini Chart */}
        <div className="flex items-end gap-1 h-[32px] pt-1">
          {NDA_CHART_BARS.map((val, i) => (
            <div key={i} className="nda-bar flex-1 rounded-t-[1px]" style={{ height: `${val}%`, background: accent, opacity: 0.75 }} />
          ))}
        </div>

        <div className="pt-1.5 flex justify-between items-center text-[8px] font-mono text-ink-3 border-t border-line">
          <span>24+ MÓDULOS</span>
          <span className="text-emerald-400">ATIVO EM PRODUÇÃO</span>
        </div>
      </div>

      <div className="absolute bottom-3 inset-x-0 flex justify-center">
        <span
          className="font-mono text-[9.5px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border whitespace-nowrap"
          style={{ borderColor: `${accent}66`, color: accent, background: 'color-mix(in oklab, var(--bg) 70%, transparent)' }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
