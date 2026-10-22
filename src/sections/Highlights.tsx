'use client';

import { Reveal, Section, SpotlightCard } from '../ui';
import { SplitTitle } from '../components/SplitTitle';
import { HIGHLIGHTS } from '../data/highlights';
import type { Lang, Translations, Highlight } from '../types';

interface HighlightsProps {
  t: Translations;
  lang: Lang;
  onOpenProject?: (id: string) => void;
}

export function Highlights({ t, lang, onOpenProject }: HighlightsProps) {
  const items = HIGHLIGHTS[lang];

  return (
    <Section id="highlights" eyebrow={t.highlights.eyebrow}>
      <style>{`
        @keyframes plaque-border-chase {
          to { transform: rotate(360deg); }
        }
        .plaque-chase { animation: plaque-border-chase 6s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .plaque-chase { animation: none; }
        }
      `}</style>

      <div className="grid grid-cols-1 gap-4 mb-12 md:grid-cols-2 md:gap-8 items-end">
        <SplitTitle as="h2" className="text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-0.025em] font-semibold">{t.highlights.title}</SplitTitle>
        <p className="text-[15px] leading-[1.55] text-ink-2 max-w-[420px]">{t.highlights.sub}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((highlight, index) => (
          <HighlightPlaque
            key={highlight.id}
            highlight={highlight}
            index={index}
            viewProjectLabel={t.highlights.viewProject}
            onOpenProject={onOpenProject}
          />
        ))}
      </div>
    </Section>
  );
}

interface HighlightPlaqueProps {
  highlight: Highlight;
  index: number;
  viewProjectLabel: string;
  onOpenProject?: (id: string) => void;
}

function HighlightPlaque({ highlight, index, viewProjectLabel, onOpenProject }: HighlightPlaqueProps) {
  const clickable = Boolean(highlight.projectId && onOpenProject);
  const color = highlight.color;

  return (
    <Reveal delay={index * 100}>
      {/* border-chase wrapper: 1px gap reveals a rotating conic gradient as a light running around the edge */}
      <div className="relative h-full rounded-[8px] p-px overflow-hidden" style={{ background: `${color}26` }}>
        <span
          className="plaque-chase absolute -inset-[60%] pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${color} 12deg, transparent 40deg)`,
            animationDelay: `${index * 900}ms`,
          }}
        />

        <SpotlightCard spotlightColor={`${color}33`} className="h-full rounded-[7px]">
          <div
            role={clickable ? 'button' : undefined}
            tabIndex={clickable ? 0 : undefined}
            onClick={clickable ? () => onOpenProject!(highlight.projectId!) : undefined}
            onKeyDown={clickable ? (e) => { if (e.key === 'Enter') onOpenProject!(highlight.projectId!); } : undefined}
            className={`group relative h-full rounded-[7px] p-7 flex flex-col overflow-hidden transition-transform duration-300 ease-[cubic-bezier(.2,.7,.15,1)] hover:-translate-y-1 ${clickable ? 'cursor-pointer' : ''}`}
            style={{ background: `linear-gradient(180deg, var(--bg-2), var(--card))` }}
          >
            {/* corner marks */}
            <span className="absolute top-2 left-2 w-3 h-3 border-t border-l opacity-50" style={{ borderColor: color }} />
            <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r opacity-50" style={{ borderColor: color }} />

            {/* shine sweep on hover */}
            <span
              className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.15,1)] pointer-events-none"
              style={{ background: `linear-gradient(115deg, transparent 40%, ${color}14 50%, transparent 60%)` }}
            />

            <div className="relative w-9 h-9 mb-5 flex-shrink-0" style={{ color }}>
              <HighlightIcon id={highlight.id} />
            </div>

            <h3 className="relative text-[17px] font-semibold tracking-[-0.01em] leading-[1.3] mb-4">{highlight.title}</h3>
            <span className="relative block w-8 h-[2px] mb-4 transition-[width] duration-300 group-hover:w-12" style={{ background: color }} />
            <p className="relative text-[13px] leading-[1.6] text-ink-2">{highlight.description}</p>

            {clickable && (
              <span
                className="relative mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] font-medium"
                style={{ color }}
              >
                {viewProjectLabel}
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        </SpotlightCard>
      </div>
    </Reveal>
  );
}

function HighlightIcon({ id }: { id: string }) {
  const common = { width: 36, height: 36, viewBox: '0 0 36 36', fill: 'none' as const, stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  if (id === 'test-coverage') {
    return (
      <svg {...common}>
        <path d="M18 4l11 4v9c0 7-4.6 12.4-11 15-6.4-2.6-11-8-11-15V8l11-4z" />
        <path d="M13 18l3.5 3.5L23.5 14" />
      </svg>
    );
  }

  if (id === 'founder') {
    return (
      <svg {...common}>
        <path d="M18 4c5 3 8 8.5 8 15l-3.5 5h-9L10 19c0-6.5 3-12 8-15z" />
        <circle cx="18" cy="15" r="2.6" />
        <path d="M13.5 24L10 30l5-1.5M22.5 24L26 30l-5-1.5M18 26v6" />
      </svg>
    );
  }

  if (id === 'mentorship') {
    return (
      <svg {...common}>
        <path d="M4 13L18 7l14 6-14 6-14-6z" />
        <path d="M11 16.5V24c0 2 3 4 7 4s7-2 7-4v-7.5" />
        <path d="M32 13v7" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="18" cy="18" r="13" />
      <path d="M23 13l-3 7-7 3 3-7 7-3z" fill="currentColor" stroke="none" />
      <circle cx="18" cy="18" r="1.4" fill="var(--bg-2)" stroke="none" />
    </svg>
  );
}
