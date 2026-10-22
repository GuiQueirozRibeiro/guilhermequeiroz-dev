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
    intro: (total: number, live: number, awards: number) =>
      `${total} projetos reais, do zero à produção${live ? ` — ${live} no ar hoje` : ''}${awards ? `, ${awards} premiado em banca acadêmica` : ''}.`,
    statusAward: 'Premiado',
    statusLive: 'Em produção',
    statusNda: 'Privado · NDA',
    visitSite: 'Visitar site',
  },
  en: {
    intro: (total: number, live: number, awards: number) =>
      `${total} real projects, from zero to production${live ? ` — ${live} live today` : ''}${awards ? `, ${awards} award-winning` : ''}.`,
    statusAward: 'Award-winning',
    statusLive: 'Live in production',
    statusNda: 'Private · NDA',
    visitSite: 'Visit site',
  },
} as const;

/** Pulls a short, plain-language verdict out of the project's outcome copy for the card quote. */
function pullQuote(text: string): string {
  const afterDash = text.includes(' — ') ? text.split(' — ').slice(1).join(' — ') : text;
  const firstSentence = afterDash.split(/(?<=\.)\s/)[0];
  return firstSentence.trim().replace(/\.$/, '');
}

export function Work({ t, lang, onOpenProject }: WorkProps) {
  const s = STRINGS[lang];
  const projects = PROJECTS;
  const liveCount = projects.filter(p => !p.nda && p.links?.length).length;
  const awardCount = projects.filter(p => p.award).length;

  return (
    <Section id="work" eyebrow={t.work.eyebrow}>
      <WorkGlow />

      <div className="mb-14 md:mb-16 max-w-[640px]">
        <SplitTitle as="h2" className="text-[clamp(28px,4vw,52px)] leading-[1.05] tracking-[-0.025em] font-semibold">{t.work.title}</SplitTitle>
        <p className="text-[15px] leading-[1.55] text-ink-2 mt-3">{s.intro(projects.length, liveCount, awardCount)}</p>
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
  s: { statusAward: string; statusLive: string; statusNda: string; visitSite: string };
  onOpenProject: (id: string) => void;
}

function ProjectRow({ project, index, lang, t, s, onOpenProject }: ProjectRowProps) {
  const mirrored = index % 2 === 1;
  const rawUrl = project.links?.[0]?.url;
  const url = rawUrl ? rawUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : `localhost/projects/${project.id}`;
  const quote = pullQuote(project.outcome[lang]);

  const status = project.award
    ? { icon: '🥇', label: s.statusAward }
    : project.nda
      ? { icon: '🔒', label: s.statusNda }
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
            <span style={{ color: project.accent }}>&mdash; </span>
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
                className="btn inline-flex items-center gap-1.5 text-[12.5px] text-ink-2 hover:text-ink transition-colors duration-200"
              >
                <HoverRollLabel>{s.visitSite}</HoverRollLabel>
                <HoverRollIcon icon={<ArrowIcon size={11} />} next={<ArrowIcon size={11} />} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** Slow-drifting ambient glow behind the section, in the same two colors as the project category chips below. */
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

/** Barcode-bar widths (px) for the floating "boleto" card. */
const NDA_BARCODE = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1];

/** Scattered background skyline — one entry per building: horizontal position, size, depth (opacity/blur). */
const NDA_SKYLINE = [
  { left: '2%', width: 30, height: 50, opacity: 0.3, blur: 1 },
  { left: '13%', width: 22, height: 76, opacity: 0.45, blur: 0 },
  { left: '25%', width: 34, height: 38, opacity: 0.25, blur: 1.5 },
  { left: '64%', width: 24, height: 60, opacity: 0.4, blur: 0 },
  { left: '78%', width: 30, height: 42, opacity: 0.26, blur: 1.5 },
  { left: '90%', width: 18, height: 68, opacity: 0.36, blur: 0 },
];

/** A small building silhouette with a couple of flickering lit windows — used for the background skyline. */
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

/** KPI stat-row values — plausible occupancy/delinquency/revenue metrics for a condo ERP. Kept as digits + currency/percent symbols (no words) so they read identically in pt/en without extra copy. */
const NDA_KPIS = [
  { value: '94%', trendUp: true },
  { value: '8%', trendUp: false },
  { value: 'R$128k', trendUp: true },
];

/** Fake "condomínio" table rows: skeleton-label width (%) + an "in good standing" flag driving the status pill's filled-check vs. outlined-alert treatment. */
const NDA_TABLE_ROWS = [
  { width: 54, ok: true },
  { width: 44, ok: false },
  { width: 48, ok: true },
];

/** Relative bar heights (%) for the small standalone chart widget. */
const NDA_CHART_BARS = [42, 68, 54, 82, 62, 92];

/**
 * Stand-in for the NDA condo-ERP project's screenshot: a scattered skyline of
 * condominium buildings (windows flickering like units at night) behind a
 * simulated multi-widget dashboard — nav rail, KPI stat row (occupancy /
 * delinquency / revenue), a "condomínios" table with per-row status pills,
 * and a separate bar-chart widget — plus a floating "boleto" (billing) card,
 * a floating activity/notifications card and a pulsing RLS/RBAC shield on
 * top. Built entirely from CSS (no images, no chart lib) so it never leaks
 * real product UI, while reading unmistakably as a multi-tenant condominium
 * management system actually in use, not a single static screen.
 */
function NDAPlaceholder({ project, label }: { project: Project; label: string }) {
  const accent = project.accent;
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: `linear-gradient(160deg, ${accent}10, var(--bg-3) 70%)` }}>
      <style>{`
        @keyframes nda-window { 0%, 100% { background: var(--bg); opacity: 0.5; } 45%, 65% { background: var(--win-accent); opacity: 1; } }
        @keyframes nda-float { 0%, 100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-6px) rotate(-3deg); } }
        @keyframes nda-shield { 0%, 100% { transform: scale(1); opacity: 0.85; } 50% { transform: scale(1.12); opacity: 1; } }
        @keyframes nda-row-sweep { 0% { transform: translateX(-130%); } 100% { transform: translateX(280%); } }
        @keyframes nda-bar-grow { 0%, 100% { transform: scaleY(0.86); } 50% { transform: scaleY(1); } }
        .nda-window { animation: nda-window 4.5s ease-in-out infinite; }
        .nda-float { animation: nda-float 3.4s ease-in-out infinite; }
        .nda-shield { animation: nda-shield 2.8s ease-in-out infinite; }
        .nda-row-track { position: relative; overflow: hidden; }
        .nda-row-sweep { position: absolute; inset: 0; width: 45%; animation: nda-row-sweep 2.6s ease-in-out infinite; }
        .nda-bar { transform-origin: bottom; animation: nda-bar-grow 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .nda-window, .nda-float, .nda-shield, .nda-row-sweep, .nda-bar { animation: none; }
        }
      `}</style>

      {/* Background: a skyline of managed condominiums, scattered at different depths */}
      {NDA_SKYLINE.map((b, i) => (
        <NDAMiniBuilding key={i} accent={accent} {...b} delay={i * 0.5} />
      ))}

      {/* Foreground: a simulated multi-widget dashboard — nav rail + topbar + KPI row + table/chart split */}
      <div
        className="absolute inset-[8%] rounded-[8px] flex overflow-hidden"
        style={{ background: 'color-mix(in oklab, var(--bg-2) 92%, transparent)', border: `1px solid ${accent}2a`, boxShadow: '0 20px 40px -16px rgba(0,0,0,0.4)' }}
      >
        <div className="w-[16%] flex flex-col items-center gap-2.5 py-2.5 flex-shrink-0" style={{ borderRight: `1px solid ${accent}22` }}>
          <span className="w-3 h-3 rounded-[4px] flex-shrink-0" style={{ background: accent }} />
          {[0, 1, 2, 3].map(i => (
            <span key={i} className="w-2 h-2 rounded-[3px] flex-shrink-0" style={{ background: i === 1 ? accent : 'var(--ink-3)', opacity: i === 1 ? 0.9 : 0.35 }} />
          ))}
        </div>

        <div className="flex-1 min-w-0 flex flex-col p-[7px] gap-[6px]">
          {/* Topbar: page title skeleton + user avatar */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="h-[5px] rounded-full bg-bg-3" style={{ width: '30%' }} />
            <span className="ml-auto w-[13px] h-[13px] rounded-full flex-shrink-0" style={{ background: `${accent}33` }} />
          </div>

          {/* KPI row: occupancy / delinquency / revenue stat cards */}
          <div className="flex gap-[5px] flex-shrink-0">
            {NDA_KPIS.map((kpi, i) => (
              <div key={i} className="flex-1 min-w-0 rounded-[4px] p-[4px] flex flex-col gap-[2px] overflow-hidden" style={{ background: 'var(--bg-3)' }}>
                <div className="flex items-center justify-between">
                  <span className="w-[5px] h-[5px] rounded-[1.5px] flex-shrink-0" style={{ background: accent, opacity: 0.75 }} />
                  <span className="font-mono leading-none flex-shrink-0" style={{ fontSize: 6, color: accent }}>{kpi.trendUp ? '▲' : '▼'}</span>
                </div>
                <span className="font-mono font-semibold leading-none truncate" style={{ fontSize: 9.5, color: 'var(--ink)' }}>{kpi.value}</span>
                <span className="h-[3px] rounded-full" style={{ width: '58%', background: 'var(--ink-3)', opacity: 0.35 }} />
              </div>
            ))}
          </div>

          {/* Table (condomínios + status pill) and a separate bar-chart widget, side by side */}
          <div className="flex flex-1 min-h-0 gap-[6px]">
            <div className="flex-[3] min-w-0 flex flex-col gap-[4px] justify-center">
              {NDA_TABLE_ROWS.map((row, i) => (
                <div key={i} className="nda-row-track flex items-center gap-[5px] rounded-[4px] px-[5px] py-[2.5px]" style={{ background: 'var(--bg-3)' }}>
                  <span className="w-[4px] h-[4px] rounded-full flex-shrink-0" style={{ background: accent, opacity: 0.7 }} />
                  <span className="h-[3.5px] rounded-full" style={{ width: `${row.width}%`, background: 'var(--ink-3)', opacity: 0.5 }} />
                  <span
                    className="ml-auto flex-shrink-0 flex items-center justify-center rounded-[3px] font-mono leading-none"
                    style={{
                      width: 12, height: 9, fontSize: 6.5,
                      background: row.ok ? `color-mix(in oklab, ${accent} 24%, transparent)` : 'transparent',
                      border: row.ok ? 'none' : `1px solid ${accent}55`,
                      color: accent,
                    }}
                  >
                    {row.ok ? '✓' : '!'}
                  </span>
                  <span
                    className="nda-row-sweep"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)`, animationDelay: `${i * 0.3}s` }}
                  />
                </div>
              ))}
            </div>

            <div className="flex-[2] min-w-0 rounded-[4px] flex items-end gap-[3px] p-[5px]" style={{ background: 'var(--bg-3)' }}>
              {NDA_CHART_BARS.map((h, i) => (
                <span
                  key={i}
                  className="nda-bar flex-1 rounded-t-[2px]"
                  style={{
                    height: `${h}%`,
                    background: `color-mix(in oklab, ${accent} ${30 + h * 0.5}%, var(--ink-3))`,
                    animationDelay: `${i * 0.18}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RLS/RBAC shield, pinned to the dashboard's top-right corner */}
      <div
        className="nda-shield absolute w-6 h-6 rounded-full flex items-center justify-center"
        style={{ top: '5%', right: '5%', background: 'var(--bg-2)', border: `1px solid ${accent}55`, color: accent }}
        aria-hidden="true"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9.5 12l1.8 1.8L15 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>

      {/* Floating "boleto" — a condo billing/inadimplência invoice card, overlapping the dashboard's bottom-right corner */}
      <div
        className="nda-float absolute bottom-[10%] right-[4%] w-[70px] rounded-[5px] p-1.5 flex flex-col gap-1.5"
        style={{ background: 'var(--bg-2)', border: `1px solid ${accent}44`, boxShadow: '0 10px 24px -8px rgba(0,0,0,0.35)' }}
        aria-hidden="true"
      >
        <div className="flex items-center justify-between">
          <span className="h-[4px] w-[46%] rounded-full" style={{ background: accent }} />
          <span className="font-mono text-[6.5px] font-semibold" style={{ color: accent }}>R$</span>
        </div>
        <div className="flex items-end gap-[1.5px] h-[12px]">
          {NDA_BARCODE.map((w, i) => (
            <span key={i} style={{ width: `${w}px`, height: '100%', background: 'var(--ink-3)', flexShrink: 0 }} />
          ))}
        </div>
      </div>

      {/* Floating activity/notifications card — a couple of recent events, overlapping the dashboard's top-left corner */}
      <div
        className="nda-float absolute top-[5%] left-[4%] w-[76px] rounded-[5px] p-1.5 flex flex-col gap-[5px]"
        style={{ background: 'var(--bg-2)', border: `1px solid ${accent}44`, boxShadow: '0 10px 24px -8px rgba(0,0,0,0.35)', animationDelay: '1.1s' }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-[5px]">
          <span className="font-mono leading-none flex-shrink-0" style={{ fontSize: 7, color: accent }}>$</span>
          <span className="h-[4px] rounded-full" style={{ width: '75%', background: 'var(--ink-3)', opacity: 0.45 }} />
        </div>
        <div className="flex items-center gap-[5px]">
          <span className="font-mono leading-none flex-shrink-0" style={{ fontSize: 7, color: accent }}>+</span>
          <span className="h-[4px] rounded-full" style={{ width: '58%', background: 'var(--ink-3)', opacity: 0.3 }} />
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
